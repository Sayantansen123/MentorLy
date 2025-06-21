from google import genai
import os
import dotenv
from spire.doc import Document, FileFormat
from handlers.upload import upload
from handlers.download import download

dotenv.load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


class PDFHandler:
    @staticmethod
    def generate_markdwon(topic: str):
        # 📝 The topic you want notes on
        prompt = f"""You are a helpful teaching assistant. Generate AI-powered notes on the topic "{topic}" with the following structure:
        - Title
        - Introduction
        - Subheadings with detailed explanations
        - Two relevant images (give image URLs)
        - Interesting fact
        Format the response using Markdown with bullet points, blockquotes, and image embeds.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )

        # 🧾 Save the result to a markdown file
        with open(f"{topic.replace(' ', '_').lower()}_notes.md", "w", encoding="utf-8") as f:
            f.write(response.text)
        filename = f"{topic.replace(' ', '_').lower()}_notes.md"
        filepath = os.getenv("PDF_FILE_PATH")
        filepath = os.path.join(filepath, filename)
        return PDFHandler.generate_pdf(filepath, topic)

    @staticmethod
    def generate_pdf(filepath: str, topic: str):
        document = Document()
        document.LoadFromFile(filepath)
        pdf_name = topic+"Topdf.pdf"
        document.SaveToFile(pdf_name, FileFormat.PDF)
        pdf_filepath=os.getenv("PDF_FILE_PATH")
        pdf_filepath = os.path.join(pdf_filepath, "ToPdf.pdf")
        document.Dispose()
        return upload(pdf_filepath,"ToPdf.pdf")
