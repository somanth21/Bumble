# Bumble

**Bumble** is an advanced desktop voice assistant
It combines **voice control, intelligent automation, AI integration, and real-time screen analysis** to deliver a powerful personal assistant experience.  

The core codebase is organized under the `bee` folder.

---

## 🚀 Features

### 🎤 Voice Control
- Customizable hotwords: *"bumble"*, *"jarvis"*, *"bumblebee"*, *"computer"*
- Natural language speech recognition
- Text-to-speech with configurable voices

### 💻 Application & System Control
- Launch desktop applications via voice or text
- Open websites and online platforms
- System automation and command execution
- External application launcher support
- Database-driven command storage

### 📱 Communication
- WhatsApp messaging, voice calls & video calls
- Android device control (via **ADB**)
- Automated phone calls & SMS
- Contact management through CSV import

### 🤖 AI & Intelligence
- **Google Gemini AI** for contextual responses
- **HugChat chatbot** integration
- Multi-backend AI support: *KoboldCPP* & *Ollama*
- Real-time screen analysis with computer vision

### 🖥️ Screen Analysis & Monitoring
- Continuous screen capture & analysis
- Customizable regions for focus areas
- Transparent visual overlay
- Alerts for defined screen conditions
- History stored in database
- Export analysis as **JSON/CSV**
- Timer-based scheduled analysis

### 🌐 Web Interface
- Modern **HTML/CSS/JavaScript** frontend
- Real-time backend ↔ frontend communication
- Responsive design with smooth animations
- Visual representation of voice commands

### 📂 Database & Storage
- **SQLite** for contacts, commands & history
- Import/export support for contacts & data
- Command & analysis history tracking

### ⚡ Advanced Capabilities
- Multi-threaded execution for responsiveness
- Configurable AI backend switching
- Screenshot management & region-based capture
- Smart alert notifications

### 🔐 Face Authentication

---

## 📥 Installation

1. Clone the repository:

   https://github.com/somanth21/Bumble.git

   cd \Bumble\Bee

3. Navigate to the project:
4. 
   cd bumble
   
5. Install dependencies:

   pip install -r requirements.txt

6. Run the assistant:

   cd bee
   python main.py


## 🛠️ Usage

* Activate with hotwords (*bumble*, *jarvis*, *bumblebee*, *computer*).
* Example commands:

  * **Applications**: "Open Chrome"
  * **Web**: "Play \[song] on YouTube"
  * **Messaging**: "Send message to \[contact]"
  * **Analysis**: "What do you see?"
  * **Overlay**: "Launch screen overlay" or "click on the lens button"
* Press **ESC** anytime to interrupt.
* Use the **web interface** for visual controls.

---

## 🎙️ Command Categories

* **Application Control** → "Open \[app name]"
* **Web Navigation** → "Open \[website]"
* **Communication** → "Send message to \[contact]", "Call \[contact]"
* **Screen Analysis** → "Analyze screen", "What do you see?"
* **System Control** → Shutdown, restart, utilities, etc.

---

## ⚙️ Configuration

* **Hotwords**: Adjustable in voice recognition settings
* **AI Backends**: Switch between *KoboldCPP* or *Ollama*
* **Database**: Import contacts & commands via CSV
* **Screen Analysis**: Configure regions & prompts

---

## 📌 Requirements

* Python **3.10.0**   -> pipe is used
* Windows OS (ADB required for Android features)
* Microphone & speakers
* Optional: *KoboldCPP* or *Ollama* for advanced AI
