import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { toast } from "react-toastify";
import {
    User,
    Users,
    Video,
    VideoOff,
    Mic,
    MicOff,

} from "lucide-react";

const APP_ID = "c124727e52f64c5cbce2f776c925b475";
const TOKEN = null;
const UID = Math.floor(Math.random() * 10000);

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const ClassroomVideo = () => {
    const audienceChannel = new BroadcastChannel("audienceChannel");
    const navigate = useNavigate();
    const { channelName } = useParams();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "audience";
    const [screenTrack, setScreenTrack] = useState(null);
    const localVideoRef = useRef(null);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [localVideoTrack, setLocalVideoTrack] = useState(null);
    const [streamStopped, setStreamStopped] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingStream, setRecordingStream] = useState(null);
    const [audience, setAudience] = useState([]);

    useEffect(() => {
        const init = async () => {
            await client.setClientRole(role);
            await client.join(APP_ID, channelName, TOKEN, UID);

            if (role === "host") {
                const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
                setLocalAudioTrack(micTrack);
                setLocalVideoTrack(camTrack);
                camTrack.play(localVideoRef.current);
                await client.publish([micTrack, camTrack]);

                const mediaStream = new MediaStream([
                    camTrack.getMediaStreamTrack(),
                    micTrack.getMediaStreamTrack(),
                ]);
                const recorder = new MediaRecorder(mediaStream);
                recorder.start();

                setRecordingStream(mediaStream);
                setMediaRecorder(recorder);
            }

            if (role === "audience") {
                const user = JSON.parse(localStorage.getItem("user"));
                const userName = `${user.firstname} ${user.lastname}`;
                toast.success(`${userName} joined`);

                // Broadcast to host
                audienceChannel.postMessage({ type: "join", name: userName });

                // Store locally too (optional)
                setAudience((prev) => {
                    if (!prev.includes(userName)) {
                        return [...prev, userName];
                    }
                    return prev;
                });
            }

            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") setRemoteUsers((prev) => [...prev, user]);
                if (mediaType === "audio") user.audioTrack?.play();
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "video") {
                    setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
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

    useEffect(() => {
  const handleAudienceJoin = (e) => {
    if (e.data.type === "join") {
      setAudience((prev) => {
        if (!prev.includes(e.data.name)) {
          return [...prev, e.data.name];
        }
        return prev;
      });
    }
  };

  audienceChannel.addEventListener("message", handleAudienceJoin);

  return () => {
    audienceChannel.removeEventListener("message", handleAudienceJoin);
  };
}, []);

    const toggleScreenShare = async () => {
        try {
            if (!screenTrack) {
                // Start screen sharing
                const screen = await AgoraRTC.createScreenVideoTrack();

                if (localVideoTrack) {
                    await client.unpublish(localVideoTrack);
                    localVideoTrack.stop();
                    setLocalVideoTrack(null);
                }

                await client.publish(screen);
                setScreenTrack(screen);

                // Replace preview with screen share
                screen.play(localVideoRef.current);
            } else {
                // Stop screen sharing
                await client.unpublish(screenTrack);
                screenTrack.stop();
                setScreenTrack(null);

                // Restore camera
                const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
                setLocalAudioTrack(micTrack);
                setLocalVideoTrack(camTrack);

                camTrack.play(localVideoRef.current);
                await client.publish([micTrack, camTrack]);
            }
        } catch (err) {
            console.error("Screen sharing failed:", err);
            toast.error("Failed to toggle screen sharing.");
        }
    };


    useEffect(() => {
        remoteUsers.forEach((user) => {
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
                localVideoTrack.stop();
                localVideoTrack.close();
                setLocalVideoTrack(null);
            }

            if (mediaRecorder) {
                mediaRecorder.stop();
                setMediaRecorder(null);
            }

            if (recordingStream) {
                recordingStream.getTracks().forEach((track) => track.stop());
                setRecordingStream(null);
            }

            setStreamStopped(true);
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error("Failed to stop stream:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-700">
                    Room: <span className="text-black">{channelName}</span>{" "}
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded ml-2">
                        ({role})
                    </span>
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{audience.length + 1} Joined</span>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
                {role === "host" && (
                    <div className="overflow-hidden">
                        <h4 className="text-lg font-semibold mb-2 text-gray-700">
                            🎥 Your Video
                        </h4>
                        <div
                            ref={localVideoRef}
                            className="w-full h-[400px] bg-black rounded-xl border border-gray-300"
                        />
                    </div>
                )}

                {remoteUsers.map((user) => (
                    <div key={user.uid} >
                        <h4 className="text-lg font-semibold mb-2 text-gray-700">
                            👤 User: {user.uid}
                        </h4>
                        <div
                            id={`remote-video-${user.uid}`}
                            className="w-full h-[400px] bg-black rounded-xl border border-gray-300"
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-4 mt-6 mb-6">
                {role === "host" && (
                    <button
                        onClick={toggleScreenShare}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {screenTrack ? "Stop Sharing Screen" : "Share Screen"}
                    </button>)}

                <button
                    onClick={stopStream}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Stop Stream
                </button>
            </div>

            {/* Audience List */}
            {audience.length > 0 && (
                <div className="mb-10">
                    <h4 className="text-md font-semibold mb-2 text-gray-600">
                        👥 Audience Joined:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {audience.map((name, idx) => (
                            <div
                                key={idx}
                                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            

            {streamStopped && (
                <p className="mt-4 text-green-600 font-medium">
                    ✅ Stream stopped successfully.
                </p>
            )}
        </div>
    );
};

export default ClassroomVideo;
