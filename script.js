// script.js
const correctAnswers = {
    q1: 'B',
    q2: 'B',
    q3: 'C',  // Updated answer for the 3rd question
    q4: 'A',
    q5: 'D',
    q6: 'A',
    q7: 'C',
    q8: 'C',
    q9: 'B',
    q10: 'A'
};

function submitQuiz() {
    let score = 0;
    let unansweredQuestions = [];
    const form = document.getElementById('quizForm');
    const result = document.getElementById('result');
    const errorMessage = document.querySelector('.error-message');
    errorMessage ? errorMessage.remove() : null; // Clear any previous error message

    // Loop through all questions and check answers
    for (let question in correctAnswers) {
        const selectedAnswer = form.querySelector(`input[name=${question}]:checked`);
        const questionDiv = form.querySelector(`div.question:nth-child(${Object.keys(correctAnswers).indexOf(question) + 1})`);

        if (!selectedAnswer) {
            unansweredQuestions.push(question);  // Track unanswered questions
        }
    }

    // If there are unanswered questions, show error message and prevent form submission
    if (unansweredQuestions.length > 0) {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-message');
        errorMsg.textContent = 'Please answer all questions before submitting!';
        form.appendChild(errorMsg);
        return; // Prevent further code execution if there are unanswered questions
    }

    // Now, process the answers and highlight correct/incorrect answers
    for (let question in correctAnswers) {
        const selectedAnswer = form.querySelector(`input[name=${question}]:checked`);
        const questionDiv = form.querySelector(`div.question:nth-child(${Object.keys(correctAnswers).indexOf(question) + 1})`);

        if (selectedAnswer) {
            if (selectedAnswer.value === correctAnswers[question]) {
                score++;
                questionDiv.querySelector(`input[value="${selectedAnswer.value}"]`).parentElement.style.backgroundColor = '#4CAF50'; // Green for correct
            } else {
                questionDiv.querySelector(`input[value="${selectedAnswer.value}"]`).parentElement.style.backgroundColor = '#f44336'; // Red for wrong
                questionDiv.querySelector(`input[value="${correctAnswers[question]}"]`).parentElement.style.backgroundColor = '#4CAF50'; // Green for correct
            }
        }
    }

    // Display result if all questions are answered
    result.style.display = 'block'; // Show the result
    result.textContent = `You scored ${score} out of 10 questions correctly!`;

    // Provide feedback based on score
    if (score === 10) {
        result.style.color = 'green';
    } else if (score >= 7) {
        result.style.color = 'orange';
    } else {
        result.style.color = 'red';
    }

    // Disable further submissions
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('restartBtn').style.display = 'block'; // Show the restart button
}

function restartQuiz() {
    // Reset form and styles
    const form = document.getElementById('quizForm');
    const result = document.getElementById('result');

    form.reset();
    result.style.display = 'none';

    // Reset all question backgrounds
    const questions = form.querySelectorAll('.question');
    questions.forEach(question => {
        const labels = question.querySelectorAll('label');
        labels.forEach(label => {
            label.style.backgroundColor = '#e8f0fe'; // Reset to default color
        });
    });

    // Enable the submit button again
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('restartBtn').style.display = 'none'; // Hide restart button
}