# Overview
This project provides an accessible learning tool designed to support students with visual impairments—specifically those who use screen readers such as JAWS—when studying software development. Traditional coding tutorial videos present a significant barrier to accessibility, as critical on-screen information is visual-only. This tool addresses that gap.

The system allows a student to pause a coding tutorial video and automatically generate screen-reader-friendly text derived from the paused frame using OCR [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition). Code, UI elements, and on-screen actions are converted into text that can be read aloud by assistive technology.

# Contribution Guidelines. 
See the [Contributions Guide](./CONTRIBUTIONS.md) for how to get involved.
TODO: 
> expand upon installation instructions (Windows Linux (and separately) TAFE machines with their installation restrictions)

# Installation Backend
```bash
python -m venv .venv
#make sure you've c'd into the backend/ folder otherwise, append backend on front of the following command
source .venv/Scripts/activate
pip install uv #if you dont have uv, you can check with uv --version
uv sync
uv run fastapi dev preliminary/simple_api.py

# TODO: pytesseract install, requires binaries
```

# Installation Front End (react)

```bash
    npm install
    npm run dev
```
