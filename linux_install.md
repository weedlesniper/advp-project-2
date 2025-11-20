# Linux Installation Instructions

As on windows, successfully building and running the project requires
the installation of Tesseract and NodeJS.

## Install Tesseract:

### Debian/Ubuntu

Tesseract can easily be installed on Debian based Distros such as
Ubuntu or Mint using apt: 
```bash
sudo apt update
sudo apt install tesseract-ocr
tesseract --version # verify installation
```
### RPM-Based Distros

For RPM-based distros such as Fedora, use the DNF package manager. 
```bash
sudo dnf install tesseract
tesseract --version # verify installation
```

### Arch/Arch-Based Distros 

On Arch and Arch-based distros such as Manjaro, Tesseract is a part of the 
community repository:
```bash
sudo pacman -S tesseract 
tesseract -version # verify installation
```
## Install NodeJS

### Debian

NodeJS can be installed with apt:
```bash
sudo apt update
sudo apt install nodejs
node -version # verify Node.js installed
npm --version # verify npm installed 
```

### RPM-Based Distros

For RPM-based distros such as Fedora, use DNF package manager:
```bash
sudo dnf install nodejs
node -version # verify Node.js install
npm --version # verify npm installed
```

### Arch/Arch-Based Distros

For Arch and Arch-based distros like Manjaro, use Pacman:
```bash
sudo pacman -S nodejs
node -version # verify Node.js install
npm --version # verify npm installed
```

## Backend installation

With the prerequisites installed, move on to installing the backend. These steps should work across all distributions. 

First navigate to the backend folder within the repository:
```bash
cd /yourprojectdirectory/backend
```
Then run commands:

```bash
python3 -m venv .venv
source .venv/bin/activate 
```
Note: 
Some Linux systems (e.g. Mint) use a custom shell that might hide the (.venv) prefix.
To confirm the virtual environment is active even when there is no prefix, try commands:
```bash
echo $VIRTUAL_ENV
# should point to projectlocation/backend/.venv
which python
# should point to projectlocation/backend.venv/bin/python
```
Once the environment is activated, continue with:
```bash
pip install uv # or check if uv installed with uv --version
uv sync
uv run fastapi dev preliminary/simple_api.py
```

Once you see [INFO] Application startup complete, move on to the next step.

## FrontEnd Installation (react)

Keep the backend running and open a new terminal. 
In the new terminal, run the following commands:
```bash
cd frontend
npm install
npm run dev
```
Note: if you receive an error saying you are using a mismatched version of Node.js,
use commands:
```bash
# (in the /frontend directory)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
source ~/.bashrc
nvm install 22 
nvm use 22
node -v #check it's been installed
```
Restart the terminal, then run the npm install and run dev commands again.

If successful, you'll see:

Vite v7.2.1 ready in xx ms

➜ Local: http://localhost:5173/

➜ Network: use --host to expose

➜ press h + enter to show help

Now we have two terminals running - one for the backend, and one for the frontend.
In your frontend terminal, clicking on the local host link will open the program in your 
browser. 