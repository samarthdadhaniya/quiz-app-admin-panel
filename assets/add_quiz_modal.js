document.getElementById("addQuestionButton").addEventListener("click", function() {
    var questionsContainer = document.getElementById("questionsContainer");
  
    // Create new question element
    var newQuestion = document.createElement("div");
    newQuestion.className = "question-input mb-3";
    
    // Get the current number of questions
    var questionNumber = document.getElementsByClassName("question-input").length + 1;
    
    newQuestion.innerHTML = `
      <label class="form-label">Question ${questionNumber}</label>
      <input type="text" class="form-control" name="question-${questionNumber}">
      <div class="options-container">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="option-${questionNumber}" required>
          <input type="text" class="form-control option-input" name="option-${questionNumber}" required>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="option-${questionNumber}" required>
          <input type="text" class="form-control option-input" name="option-${questionNumber}" required>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="option-${questionNumber}" required>
          <input type="text" class="form-control option-input" name="option-${questionNumber}" required>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="option-${questionNumber}" required>
          <input type="text" class="form-control option-input" name="option-${questionNumber}" required>
        </div>
      </div>
    `;
  
    // Append new question to the container
    questionsContainer.appendChild(newQuestion);
  });
  
  document.getElementById("submitQuizBtn").addEventListener("click", function() {
    var form = document.getElementById("addQuizForm");
    var formData = new FormData(form);
  
    // Get form data
    var questions = [];
    for (var pair of formData.entries()) {
      var name = pair[0];
      var value = pair[1];
      if (name.startsWith("question")) {
        questions.push({
          question: value,
          options: []
        });
      } else if (name.startsWith("option")) {
        var questionIndex = parseInt(name.split("-")[1]) - 1;
        questions[questionIndex].options.push(value);
      }
    }
  
    // Display the submitted quiz data (for testing purposes)
    console.log("Submitted Quiz Data:");
    console.log(questions);
  });
  