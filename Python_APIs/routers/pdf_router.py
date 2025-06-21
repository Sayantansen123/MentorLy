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
    PDFHandler.generate_markdwon(topic)
    return {"message": "Markdown generation started",
            "filename": f"{topic.replace(' ', '_').lower()}_notes.md"}