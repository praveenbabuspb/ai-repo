# AI Quiz Bot

A lightweight, browser-based quiz generator powered by TensorFlow.js and a pre-trained language model. The app generates quiz questions with multiple-choice options based on user input.

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features
- Generates quiz questions dynamically based on user input.
- Provides 4 multiple-choice options (one correct answer).
- Runs entirely in the browser using TensorFlow.js.

---

## Prerequisites
Before running or deploying the app, ensure you have the following:
- A GitHub account.
- Basic knowledge of Git and GitHub Pages.
- Node.js installed (optional, for local testing).

---

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/praveenbabuspb/ai-repo.git
cd ai-repo
```

### Step 2: Add Model Files
1. Download a pre-trained TensorFlow.js model (e.g., TinyLlama, DistilGPT-2).
2. Convert the model to TensorFlow.js format if necessary:
   ```bash
   tensorflowjs_converter --input_format=tf_saved_model ./pretrained_model ./web_model
   ```
3. Place the generated files (`model.json` and `.bin`) in the `assets/model/` folder:
   ```
   ai-repo/
   ├── assets/
   │   ├── model/
   │   │   ├── model.json
   │   │   ├── group1-shard1ofX.bin
   ```

### Step 3: Commit and Push Changes
```bash
git add .
git commit -m "Add TensorFlow.js model files"
git push origin main
```

---

## Usage

### Running Locally (Optional)
1. Install a local server tool like `serve`:
   ```bash
   npm install -g serve
   ```
2. Serve the app:
   ```bash
   serve .
   ```
3. Open the app in your browser at `http://localhost:3000`.

### Using the App
1. Enter a topic (e.g., "quadratic equations") in the input field.
2. Click the "Generate Quiz" button.
3. The app will display a quiz question with 4 options and the correct answer.

---

## Troubleshooting

### 1. Model Not Loading (404 Error)
- Ensure the `model.json` and `.bin` files are in the `assets/model/` folder.
- Verify the file paths in `main.js` match the repository structure:
  ```javascript
  const model = await tf.loadLayersModel('./assets/model/model.json');
  ```

### 2. CORS Policy Errors
- Host the model files on the same GitHub Pages domain as the app.
- Use relative paths instead of absolute URLs:
  ```javascript
  const model = await tf.loadLayersModel('./assets/model/model.json');
  ```

### 3. Large File Size
- Optimize the model size using quantization:
  ```bash
  tensorflowjs_converter --quantization_bytes=1 --input_format=tf_saved_model ./pretrained_model ./web_model_quantized
  ```

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- Thanks to the TensorFlow.js team for providing tools to run machine learning models in the browser.
- Special thanks to the open-source community for sharing pre-trained models and datasets.

---
