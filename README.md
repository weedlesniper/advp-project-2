# Overview

Include a brief overview of the project, include:

- How do you deploy and run the project?
- What are its core dependencies?
- Who is it for and why?

```bash
python -m venv .venv
#make sure you've c'd into the backend/ folder otherwise, append backend on front of the following command
source .venv/Scripts/activate
pip install uv #if you dont have uv, you can check with uv --version
uv sync
uv run fastapi dev preliminary/simple_api.py


```

# Front end (react)

```bash
    npm install
    npm run dev
```

pytesseract install
