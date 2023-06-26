$(document).ready(function() {
  // Add active class to the clicked nav-link
  $(".nav-link").click(function() {
    // Remove active class from all nav-links
    $(".nav-link").removeClass("active");
    // Add active class to the clicked nav-link
    $(this).addClass("active");
  });
});

$(document).ready(function () {
  // Handle navigation item click
  $('.navbar-nav .nav-link').click(function (e) {
    e.preventDefault();

    // Get the target section from data attribute
    var targetSection = $(this).data('section');

    // Hide all sections
    $('.section').hide();

    // Show the target section
    $('#' + targetSection).show();
  });

  $(document).ready(function () {
    // Open Add Student Modal
    $("#add-student-button").click(function () {
      $("#addStudentModal").modal("show");
    });

    // Open Add Course Modal
    $("#add-course-button").click(function () {
      $("#addCourseModal").modal("show");
    });
  });

  // Delete student by ID
  $('#table_body').on('click', '.btn-danger', function () {
    var row = $(this).closest('tr');
    var studentId = row.data('id');

    $.ajax({
      url: 'http://localhost:3000/students/' + studentId,
      type: 'DELETE',
      success: function (result) {
        row.remove();
        // console.log('Student deleted successfully');
        alert('Student deleted successfully');
      },
      error: function (error) {
        console.error('Failed to delete student:', error);
      }
    });
  });

  // Delete course by ID
  $('#course_table_body').on('click', '.btn-danger', function () {
    var row = $(this).closest('tr');
    var courseId = row.data('id');

    $.ajax({
      url: 'http://localhost:3000/courses/' + courseId,
      type: 'DELETE',
      success: function (result) {
        row.remove();
        console.log('Course deleted successfully');
        alert('Course deleted successfully');
      },
      error: function (error) {
        console.error('Failed to delete course:', error);
      }
    });
  });

  // Fetch and display student data
  fetch('http://localhost:3000/students')
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      let tableData = "";
      objectData.forEach((values) => {
        tableData += `
          <tr data-id="${values._id}">
            <td>${values.name}</td>
            <td>${values.email}</td>
            <td>${values.password}</td>
            <td>${values.contact}</td>
            <td>${new Date(values.date_of_admission).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</td>
            <td>
              <button class="btn btn-primary">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>`;
      });
      $('#table_body').html(tableData);
    });

  // Fetch and display course data
  fetch('http://localhost:3000/courses')
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      let courseData = "";
      objectData.forEach((values) => {
        courseData += `
          <tr data-id="${values._id}">
            <td>${values.name}</td>
            <td>${values.teacher_name}</td>
            <td>
              <button class="btn btn-primary">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>`;
      });
      $('#course_table_body').html(courseData);
    });
});

// for adding students via API to Database
document.getElementById('saveStudentButton').addEventListener('click', function () {
  // Get form data
  const name = document.getElementById('studentName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const contact = document.getElementById('contactNumber').value;
  const dateOfAdmission = document.getElementById('dateOfAdmission').value;

  // Create student object
  const student = {
    name: name,
    email: email,
    password: password,
    contact: contact,
    date_of_admission: dateOfAdmission,
  };

  // Send POST request to the API endpoint
  fetch('http://localhost:3000/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add student');
      }
    })
    .then(function (data) {
      console.log('Student added successfully');
      // Perform any additional actions or display success message
      $('#addStudentModal').modal('hide');

      fetch('http://localhost:3000/students')
        .then((data) => {
          return data.json();
        })
        .then((objectData) => {
          let tableData = "";
          objectData.forEach((values) => {
            tableData += `
          <tr data-id="${values._id}">
            <td>${values.name}</td>
            <td>${values.email}</td>
            <td>${values.password}</td>
            <td>${values.contact}</td>
            <td>${new Date(values.date_of_admission).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</td>
            <td>
              <button class="btn btn-primary">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>`;
          });
          $('#table_body').html(tableData);
        });
    })
    .catch(function (error) {
      console.error('Error adding student:', error);
      // Handle the error or display error message
    });
});

// for adding Courses via API to Database
document.getElementById('saveCourseButton').addEventListener('click', function() {
  // Get form data
  const name = document.getElementById('courseName').value;
  const teacher = document.getElementById('teacherName').value;

  // Create course object
  const course = {
    name: name,
    teacher_name: teacher
  };

  // Send POST request to the API endpoint
  fetch('http://localhost:3000/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add course');
      }
    })
    .then(function(data) {
      console.log('Course added successfully');
      // Perform any additional actions or display success message
      $('#addCourseModal').modal('hide');

      fetch('http://localhost:3000/courses')
        .then((data) => {
          console.log("fetching..")
          return data.json();
          
        })
        .then((objectData) => {
          console.log(objectData)

          let tableData = "";
          objectData.forEach((values) => {
            tableData += `
              <tr data-id="${values._id}">
                <td>${values.name}</td>
                <td>${values.teacher_name}</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-danger">Delete</button>
                </td>
              </tr>`;
          });
          $('#course_table_body').html(tableData);
        });
    })
    .catch(function(error) {
      console.error('Error adding course:', error);
      // Handle the error or display error message
    });
});

// Edit student data
$('#table_body').on('click', '.btn-primary', function() {
  var row = $(this).closest('tr');
  var studentId = row.data('id');

  // Retrieve student data from the table row
  var name = row.find('td:eq(0)').text();
  var email = row.find('td:eq(1)').text();
  var password = row.find('td:eq(2)').text();
  var contact = row.find('td:eq(3)').text();
  var dateOfAdmission = row.find('td:eq(4)').text();

  // Populate modal fields with student data
  $('#editStudentId').val(studentId);
  $('#editStudentName').val(name);
  $('#editEmail').val(email);
  $('#editPassword').val(password);
  $('#editContactNumber').val(contact);
  $('#editDateOfAdmission').val(dateOfAdmission);

  // Show the edit student modal
  $('#editStudentModal').modal('show');
});

// Update student data
$('#saveEditStudentButton').click(function() {
  // Get form data from the modal
  var studentId = $('#editStudentId').val();
  var name = $('#editStudentName').val();
  var email = $('#editEmail').val();
  var password = $('#editPassword').val();
  var contact = $('#editContactNumber').val();
  var dateOfAdmission = $('#editDateOfAdmission').val();

  // Create student object with updated data
  var updatedStudent = {
    name: name,
    email: email,
    password: password,
    contact: contact,
    date_of_admission: dateOfAdmission
  };

  // Send PUT request to update the student data
  fetch('http://localhost:3000/students/' + studentId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedStudent)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update student');
      }
    })
    .then(function(data) {
      console.log('Student updated successfully');
      // Perform any additional actions or display success message
      $('#editStudentModal').modal('hide');

      fetch('http://localhost:3000/students')
        .then(function(response) {
          return response.json();
        })
        .then(function(objectData) {
          let tableData = "";
          objectData.forEach(function(values) {
            tableData += `
              <tr data-id="${values._id}">
                <td>${values.name}</td>
                <td>${values.email}</td>
                <td>${values.password}</td>
                <td>${values.contact}</td>
                <td>${new Date(values.date_of_admission).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-danger">Delete</button>
                </td>
              </tr>`;
          });
          $('#table_body').html(tableData);
        });
    })
    .catch(function(error) {
      console.error('Error updating student:', error);
      // Handle the error or display error message
    });
});

// Edit course data
$('#course_table_body').on('click', '.btn-primary', function() {
  var row = $(this).closest('tr');
  var courseId = row.data('id');

  // Retrieve course data from the table row
  var courseName = row.find('td:eq(0)').text();
  var teacherName = row.find('td:eq(1)').text();

  // Populate modal fields with course data
  $('#editCourseId').val(courseId);
  $('#editCourseName').val(courseName);
  $('#editTeacherName').val(teacherName);

  // Show the edit course modal
  $('#editCourseModal').modal('show');
});

// Update course data
$('#saveEditCourseButton').click(function() {
  // Get form data from the modal
  var courseId = $('#editCourseId').val();
  var courseName = $('#editCourseName').val();
  var teacherName = $('#editTeacherName').val();

  // Create course object with updated data
  var updatedCourse = {
    name: courseName,
    teacher_name: teacherName
  };

  // Send PUT request to update the course data
  fetch('http://localhost:3000/courses/' + courseId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCourse)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update course');
      }
    })
    .then(function(data) {
      console.log('Course updated successfully');
      // Perform any additional actions or display success message
      $('#editCourseModal').modal('hide');

      fetch('http://localhost:3000/courses')
        .then(function(response) {
          return response.json();
        })
        .then(function(objectData) {
          let tableData = "";
          objectData.forEach(function(values) {
            tableData += `
              <tr data-id="${values._id}">
                <td>${values.name}</td>
                <td>${values.teacher_name}</td>
                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button class="btn btn-danger">Delete</button>
                </td>
              </tr>`;
          });
          $('#course_table_body').html(tableData);
        });
    })
    .catch(function(error) {
      console.error('Error updating course:', error);
      // Handle the error or display error message
    });
});


$(document).ready(function() {
  // Add Quiz button click event
  $("#add-quiz-button").click(function() {
    // Load modal content from add_quiz_modal.html file
    $("#modalContainer").load("add_quiz_modal.html", function() {
      // Show the modal
      $("#addQuizModal").modal("show");
    });
  });
});