# Overview

This project provides an accessible learning tool designed to support students with visual impairments—specifically those who use screen readers such as JAWS—when studying software development. Traditional coding tutorial videos present a significant barrier to accessibility, as critical on-screen information is visual-only. This tool addresses that gap.

The system allows a student to pause a coding tutorial video and automatically generate screen-reader-friendly text derived from the paused frame using OCR [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition). Code, UI elements, and on-screen actions are converted into text that can be read aloud by assistive technology.

# Contribution Guidelines.

See the [Contributions Guide](./CONTRIBUTIONS.md) for how to get involved.

# Pre-requisites
To successfully build and run the project, ensure that you have the following installed.
- Tesseract executable 
  - Windows - https://github.com/tesseract-ocr/tesseract/releases/download/5.5.0/tesseract-ocr-w64-setup-5.5.0.20241111.exe 
- NodeJS
  - https://nodejs.org/en/download


## Installation Backend

TODO:

> expand upon installation instructions (Windows Linux (and separately) TAFE machines with their installation restrictions)

```bash
cd backend
python -m venv .venv
#make sure you've c'd into the backend/ folder otherwise, append backend on front of the following command
source .venv/Scripts/activate
pip install uv #if you dont have uv, you can check with uv --version
uv sync
uv run fastapi dev preliminary/simple_api.py
```

## Installation Front End (react)

With the backend running, open another terminal. In this second terminal, run the following commands.
```bash
    cd frontend
    npm install
    npm run dev
```

## Running the application
Now that you have 2 terminals running, one for the backend, and the other for the frontend,
in the terminal running the frontend, click on the link for the local host (eg 
http://localhost:5173/) and it will open up a tab in your default browser (eg Google Chrome)


# Windows Installation Instructions
## Installation Backend
Ensure that you have the pre-requisites highlighted above before commencing. 
The Windows installer for Tesseract can be found at https://github.com/tesseract-ocr/tesseract/releases/download/5.5.0/tesseract-ocr-w64-setup-5.5.0.20241111.exe 
and NodeJS at https://nodejs.org/dist/v24.11.1/node-v24.11.1-x64.msi

Open up a terminal, and run the following commands.

```bash
cd backend
python -m venv .venv
#make sure you've c'd into the backend/ folder otherwise, append backend on front of the following command
source .venv/Scripts/activate
pip install uv #if you dont have uv, you can check with uv --version
uv sync
uv run fastapi dev preliminary/simple_api.py
```
Once you see [INFO] Application startup complete, move on to the next step.

## Installation Front End (react)

With the backend running, open another terminal. In this second terminal, run the following commands.
```bash
    cd frontend
    npm install
    npm run dev
```
You will know it is successful when you see 

Vite v7.2.1 ready in xx ms

  ➜  Local:   http://localhost:5173/

  ➜  Network: use --host to expose

  ➜  press h + enter to show help


## Running the application
Now that you have 2 terminals running, one for the backend, and the other for the frontend,
in the terminal running the frontend, click on the link for the local host (eg 
http://localhost:5173/) and it will open up a tab in your default browser (eg Google Chrome)



# Common Errors
- When you are trying to build the frontend and run into an issue where npm command not found, check to
see that NodeJS has been installed.
- When trying to build the backend, and one of the last outputs is Tessaract not found, check to see
that it has been installed (see install links) at the same location as highlighted in library_basics.py.
Issues with Tesseract can also be seen when trying to run the OCR in the application.