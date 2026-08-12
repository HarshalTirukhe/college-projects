let students = [];

function addStudent() {
  // Get values from input fields

  let name = document.getElementById("name").value;

  let physics = Number(document.getElementById("physics").value);

  let chemistry = Number(document.getElementById("chemistry").value);

  let maths = Number(document.getElementById("maths").value);

  // Check whether all fields are filled

  if (
    name === "" ||
    document.getElementById("physics").value === "" ||
    document.getElementById("chemistry").value === "" ||
    document.getElementById("maths").value === ""
  ) {
    alert("Please enter all details");

    return;
  }

  // Calculate total marks

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

  // Add student to array

  students.push(student);

  // Display students

  displayStudents();

  // Clear input fields

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
