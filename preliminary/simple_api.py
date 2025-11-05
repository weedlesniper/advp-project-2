"""Provides a simple API for your basic OCR client

Drive the API to complete "interprocess communication"

Requirements
"""
from fastapi import FastAPI, HTTPException
from fastapi import Response
from pydantic import BaseModel
from pathlib import Path
from library_basics import CodingVideo


app = FastAPI()

HERE = Path(__file__).resolve().parent          # .../preliminary
ROOT = HERE.parent                               # repo root
RESOURCES = ROOT / "resources"  #location where our video are stored

# We'll create a lightweight "database" for our videos
# You can add uploads later (not required for assessment)
# For now, we will just hardcode our samples
VIDEOS: dict[str, Path] = {
    "demo": RESOURCES / "oop.mp4",   
    "demo2": RESOURCES / "oop2.mp4"               # .../resources/oop.mp4
}

class VideoMetaData(BaseModel):
    fps: float
    frame_count: int
    duration_seconds: float
    _links: dict | None = None

@app.get("/video")
def list_videos():
    """List all available videos with HATEOAS-style links."""
    return {
        "count": len(VIDEOS),
        "videos": [
            {
                "id": vid,
                "path": str(path), # Not standard for debug only
                "_links": {
                    "self": f"/video/{vid}",
                    "frame_example": f"/video/{vid}/frame/1.0"
                }
            }
            for vid, path in VIDEOS.items()
        ]
    }

def _open_vid_or_404(vid: str) -> CodingVideo:
    """initialises coding video object so we can access its metadata using the class"""
    path = VIDEOS.get(vid)
    if not path or not path.is_file():
        raise HTTPException(status_code=404, detail="Video not found")
    try:
        return CodingVideo(path)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Could not open video {e}")

def _meta(video: CodingVideo) -> VideoMetaData:
    return VideoMetaData(
            fps=video.fps,
            frame_count=video.frame_count,
            duration_seconds=video.duration
    )


#endpoint returns video metadata as json
@app.get("/video/{vid}", response_model=VideoMetaData)
def video(vid: str):
    video = _open_vid_or_404(vid)
    try:
            meta = _meta(video)
            meta._links = {
                "self": f"/video/{vid}",
                "frames": f"/video/{vid}/frame/{{seconds}}"
            }
            return meta
    finally:
        video.capture.release()

# endpoint returns bytes, which might not output in terminal properly.
# visit http://127.0.0.1:8000/video/demo/frame/1.0 in browser to test

@app.get("/video/{vid}/frame/{t}", response_class=Response)
def video_frame(vid: str, t: float):
    try:
        video = _open_vid_or_404(vid)
        return Response(content=video.get_image_as_bytes(t), media_type="image/png")
    finally:
      video.capture.release()

# TODO: add enpoint to get ocr e.g. /video/{vid}/frame/{t}/ocr
