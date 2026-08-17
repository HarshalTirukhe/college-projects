let students = [];

function addStudent() {
  // Get input elements
  let nameInput = document.getElementById("name");
  let physicsInput = document.getElementById("physics");
  let chemistryInput = document.getElementById("chemistry");
  let mathsInput = document.getElementById("maths");

  // Get values
  let name = nameInput.value.trim();
  let physics = Number(physicsInput.value);
  let chemistry = Number(chemistryInput.value);
  let maths = Number(mathsInput.value);

  // Check whether all fields are filled
  if (
    name === "" ||
    physicsInput.value === "" ||
    chemistryInput.value === "" ||
    mathsInput.value === ""
  ) {
    alert("Please enter all details");
    return;
  }

  // Check whether name already exists
  let nameExists = students.some(function (student) {
    return student.name.toLowerCase() === name.toLowerCase();
  });

  if (nameExists) {
    alert("Student name already exists");
    return;
  }

  // Check whether marks are between 0 and 100
  if (
    physics < 0 ||
    physics > 100 ||
    chemistry < 0 ||
    chemistry > 100 ||
    maths < 0 ||
    maths > 100
  ) {
    alert("Marks must be between 0 and 100");

    clearMarkInputs();

    return;
  }

  // Calculate total
  let total = physics + chemistry + maths;

  // Calculate percentage
  let percentage = (total / 300) * 100;

  // Create student object
  let student = {
    name: name,
    physics: physics,
    chemistry: chemistry,
    maths: maths,
    total: total,
    percentage: percentage,
  };

  // Add student
  students.push(student);

  // Display students
  displayStudents();

  // Clear inputs
  clearInputs();
}

function clearMarkInputs() {
  document.getElementById("physics").value = "";
  document.getElementById("chemistry").value = "";
  document.getElementById("maths").value = "";
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("physics").value = "";
  document.getElementById("chemistry").value = "";
  document.getElementById("maths").value = "";
}

function displayStudents() {
  let table = document.getElementById("studentTable");

  table.innerHTML = "";

  // Add students to table

  students.forEach(function (student) {
    let row = document.createElement("tr");

    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.physics}</td>
            <td>${student.chemistry}</td>
            <td>${student.maths}</td>
            <td>${student.total}</td>
            <td>${student.percentage.toFixed(2)}%</td>
        `;

    table.appendChild(row);
  });

  // Find topper

  let topper = students[0];

  for (let i = 1; i < students.length; i++) {
    if (students[i].percentage > topper.percentage) {
      topper = students[i];
    }
  }

  // Display topper

  document.getElementById("topper").innerHTML =
    "Topper: " + topper.name + " - " + topper.percentage.toFixed(2) + "%";
}
