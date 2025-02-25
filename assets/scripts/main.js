async function loadModel() {
  const model = await tf.loadLayersModel('https://praveenbabuspb.github.io/ai-repo/assets/model/model.json');
  return model;
}

async function generateQuiz() {
  // Get the user's input topic
  const topic = document.getElementById('topic-input').value;

  if (!topic) {
      alert("Please enter a topic!");
      return;
  }

  const model = await loadModel();

  // Craft a prompt for the model
  const prompt = `
    Generate a quiz question about ${topic}. Provide 4 options (A, B, C, D) and indicate the correct answer.

    Example:
    Topic: Quadratic equations
    Output:
    Question: What are the roots of x^2 - 5x + 6 = 0?
    Options: A) 2 and 3, B) 1 and 4, C) 0 and 5, D) -2 and -3
    Answer: A) 2 and 3
  `;

  // Tokenize the input prompt
  const inputTensor = tf.tensor([prompt.split('').map(char => char.charCodeAt(0))]);

  // Generate response
  const outputTensor = model.predict(inputTensor);
  const response = String.fromCharCode(...outputTensor.dataSync());

  // Parse response into question, options, and answer
  const lines = response.split('\n').map(line => line.trim());
  const question = lines.find(line => line.startsWith("Question:")).replace("Question:", "").trim();
  const options = lines.find(line => line.startsWith("Options:")).replace("Options:", "").split(',').map(option => option.trim());
  const answer = lines.find(line => line.startsWith("Answer:")).replace("Answer:", "").trim();

  // Render the quiz
  renderQuiz(question, options, answer);
}

function renderQuiz(question, options, answer) {
  const quizContainer = document.getElementById('quiz-container');

  // Clear previous content
  quizContainer.innerHTML = '';

  // Add the question
  const questionElement = document.createElement('h3');
  questionElement.textContent = question;
  quizContainer.appendChild(questionElement);

  // Add the options
  options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.textContent = option;
      quizContainer.appendChild(optionElement);
  });

  // Add the correct answer with the new class
  const answerElement = document.createElement('div'); // Changed from <p> to <div> for consistency
  answerElement.className = 'answer'; // Use the CSS class instead of inline styling
  answerElement.textContent = `Correct Answer: ${answer}`;
  quizContainer.appendChild(answerElement);
}
