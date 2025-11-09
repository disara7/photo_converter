# 🖼️ HEIC Converter — Free & Fast HEIC to JPEG/PNG Converter

Easily convert your `.HEIC` images (from iPhones or iPads) to `.JPEG` or `.PNG` format **for free**, directly on your computer — no paid apps or online converters needed.  
Built with **Node.js**, **Express**, and **heic-convert**.

---

## 🚀 Features

- 🔄 Batch converts all `.heic` images in a folder
- 💎 Preserves full image quality
- ⚡ Logs live conversion progress
- 🧭 Supports both **JPEG** and **PNG** formats
- 🆓 100% free — no "HEVC Video Extension" or third-party apps required
- 🖥️ Works locally on Windows, macOS, or Linux

---

## ⚙️ Installation

1. **Clone this repository**
   `git clone https://github.com/<your-username>/heic-converter.git
   cd heic-converter`

2. **Install dependencies**

`npm install`

Ensure your package.json includes

`{
  "type": "module"
}`

3. **Create folders**

`mkdir uploads converted`

4. **Add .heic images**
Place your .heic files in the uploads folder.

---

## ▶️ Usage
Start the server:

`node server.js`

You’ll see:

`🚀 HEIC Converter Server running on http://localhost:5000
📁 Place your .heic files inside the 'uploads' folder.`

Then open your browser and visit:

`http://localhost:5000/convert`

or convert to PNG:

`http://localhost:5000/convert?format=png`

Your converted files will appear in the converted folder.

---

## 🧩 Example Output
<img width="1494" height="971" alt="Screenshot 2025-11-09 141429" src="https://github.com/user-attachments/assets/5571da10-b79b-4179-b98d-dde8b1f078a6" />

---

## 🧠 How It Works
The app uses the heic-convert library to decode Apple’s HEIC format and re-encode it as JPEG or PNG.
The Express.js server exposes a single /convert endpoint that scans the uploads folder, converts each file, and writes the output to converted.

---

## 🧰 Tech Stack
<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>heic-convert</li>
<li>CORS</li>
</ul>

---

## 🧩 Optional Enhancements
You can extend this project to:
🕵️‍♂️ Watch the uploads folder and auto-convert new files (chokidar)
💾 Skip already converted images
🗃️ Add an upload API for drag-and-drop conversion
🌐 Deploy on a small VPS for online conversion
