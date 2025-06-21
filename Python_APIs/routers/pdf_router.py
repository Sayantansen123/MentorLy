from fastapi import APIRouter, File, UploadFile
from handlers.pdf_handlers import PDFHandler, PDFSummary
from handlers.text_extract import extract
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


@pdf_router.post("/generate_summary")
async def generate_summary(topic:str,pdf_file: UploadFile = File(...)):
    """
    Endpoint to generate a roadmap in JSON format.
    """
    pdf = await pdf_file.read()
    with open(f"uploads/{pdf_file.filename}", "wb") as f:
        f.write(pdf)
    text=extract(f"uploads/{pdf_file.filename}")
    return PDFSummary.generate_summary_markdown(text=text,file=f"uploads/{pdf_file.filename}")