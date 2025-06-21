from fastapi import APIRouter
from handlers.pdf_handlers import PDFHandler

pdf_router = APIRouter(prefix="/pdf", tags=["PDF"])


@pdf_router.post("/generate_markdown")
def generate_markdown(topic: str):
    """
    Endpoint to generate markdown from PDF content.
    """
    # Placeholder for actual markdown generation logic
    print(topic)
    download_link=PDFHandler.generate_markdwon(topic)
    return {"message": "Markdown generation started",
            "download": download_link}


@pdf_router.post("/generate_roadmap")
def generate_roadmap(subject: str):
    """
    Endpoint to generate a roadmap in JSON format.
    """
    return PDFHandler.generate_roadmap_json(subject)