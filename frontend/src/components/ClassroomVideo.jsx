import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Play,
  BookOpen,
  Trophy,
  FileText,
  BarChart,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Share,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  Eye,
  User,
} from "lucide-react"


const APP_ID = "c124727e52f64c5cbce2f776c925b475";
const TOKEN = null; // Set token if using one
const UID = Math.floor(Math.random() * 10000);

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const ClassroomVideo = () => {
    const navigate = useNavigate();
    const { channelName } = useParams();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "audience"; // default to audience
    const localVideoRef = useRef(null);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [localVideoTrack, setLocalVideoTrack] = useState(null);
    const [streamStopped, setStreamStopped] = useState(false);
    const [error, setError] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingStream, setRecordingStream] = useState(null);
    const [audience, setAudience] = useState([]);

    


    useEffect(() => {
        const init = async () => {
            await client.setClientRole(role); // host or audience

            await client.join(APP_ID, channelName, TOKEN, UID);

            if (role === "host") {
                const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

                setLocalAudioTrack(micTrack);
                setLocalVideoTrack(camTrack);

                camTrack.play(localVideoRef.current);
                await client.publish([micTrack, camTrack]);

                // Start recording
                const mediaStream = new MediaStream([
                    camTrack.getMediaStreamTrack(),
                    micTrack.getMediaStreamTrack(),
                ]);
                setRecordingStream(mediaStream);

                const recorder = new MediaRecorder(mediaStream);
                recorder.start();
                setMediaRecorder(recorder);
            }

            if (role === "audience") {
                const userName = `${JSON.parse(localStorage.getItem('user')).firstname}  ${JSON.parse(localStorage.getItem('user')).lastname}`
                toast.success(`${userName} joined`)
                setAudience(prev => {
                    if (!prev.includes(userName)) {
                        return [...prev, userName];
                    }
                    return prev;
                });

            }

            // Listen for remote user events
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setRemoteUsers(prev => [...prev, user]);
                }
                if (mediaType === "audio") {
                    user.audioTrack?.play();
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "video") {
                    setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
                }
            });
        };

        init();

        return () => {
            client.leave();
            localAudioTrack?.close();
            localVideoTrack?.close();
        };
    }, [channelName, role]);

    // Play remote video tracks
    useEffect(() => {
        remoteUsers.forEach(user => {
            user.videoTrack?.play(`remote-video-${user.uid}`);
        });
    }, [remoteUsers]);

    const stopStream = async () => {
        try {
            if (localAudioTrack) {
                await client.unpublish(localAudioTrack);
                localAudioTrack.stop();
                localAudioTrack.close();
                setLocalAudioTrack(null);
            }

            if (localVideoTrack) {
                await client.unpublish(localVideoTrack);
                localVideoTrack.stop(); // stops playback
                localVideoTrack.close(); // releases camera
                setLocalVideoTrack(null);
            }

            if (mediaRecorder) {
                mediaRecorder.stop();
                setMediaRecorder(null);
            }

            if (recordingStream) {
                recordingStream.getTracks().forEach(track => track.stop());
                setRecordingStream(null);
            }

            setStreamStopped(true);
            navigate("/")
            window.location.reload()
        } catch (err) {
            console.error("Failed to stop stream:", err);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Room: {channelName} ({role})</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Show local video only for host */}
                {role === "host" && (
                    <div>
                        <h4 className="font-semibold">Your Video</h4>
                        <div
                            ref={localVideoRef}
                            className="w-full h-[500px] bg-black rounded-lg overflow-hidden"
                        ></div>
                    </div>
                )}

                {/* Remote Users */}
                {remoteUsers.map(user => (
                    <div key={user.uid}>
                        <h4 className="font-semibold">User: {user.uid}</h4>
                        <div
                            id={`remote-video-${user.uid}`}
                            className="w-full h-[500px] bg-black rounded-lg overflow-hidden"
                        ></div>
                    </div>
                ))}
            </div>
            {role === "host" && !streamStopped && (
                <div className="mt-6">
                    <button
                        onClick={stopStream}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Stop Stream
                    </button>
                </div>
            )}

            {streamStopped && (
                <p className="mt-4 text-gray-600">✅ Stream stopped successfully.</p>
            )}
        </div>

    );
};

export default ClassroomVideo;
