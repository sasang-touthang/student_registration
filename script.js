// function to load data
function readAll() {
  var tableData = document.querySelector(".data_table");

  var object = localStorage.getItem("object");
  if (object) {
    var objectdata = JSON.parse(object);
    var element = "";

    objectdata.map(
      (record) =>
        (element += `<tr>
        <td>${record.student_name}</td>
        <td>${record.student_id}</td>
        <td>${record.contact}</td>
        <td>${record.email}</td>
        <td><button onclick={edit(${record.student_id})}>Edit</button>
        <button onclick={del(${record.student_id})} >Delete</button>
        </td>
      </tr>`)
    );

    tableData.innerHTML = element;
  } else {
    localStorage.setItem("object", "[]");
  }
}

// function to register student
function create() {
  let student_name = document.querySelector(".student_name").value;
  let student_id = document.querySelector(".student_id").value;
  let contact = document.querySelector(".contact").value;
  let email = document.querySelector(".email").value;

  let newObj = {
    student_id: student_id,
    student_name: student_name,
    contact: contact,
    email: email,
  };

  const data = JSON.parse(localStorage.getItem("object"));
  data.push(newObj);
  localStorage.setItem("object", JSON.stringify(data));
  readAll();
}

// function to edit student detail
function edit(id) {
  let uname = document.querySelector(".uname");
  let uid = document.querySelector(".uid");
  uid.style.display = "none";
  let ucontact = document.querySelector(".ucontact");
  let uemail = document.querySelector(".uemail");

  let data = JSON.parse(localStorage.getItem("object"));

  let student = data.find((student) => {
    return student.student_id == id;
  });

  uname.value = student.student_name;
  uid.value = student.student_id;
  ucontact.value = student.contact;
  uemail.value = student.email;

  let updateForm = document.querySelector(".update");
  let entryFrom = document.querySelector(".entry");
  entryFrom.style.display = "none";
  updateForm.style.display = "block";
}

// function to update student details
function update() {
  let uname = document.querySelector(".uname");
  let uid = document.querySelector(".uid");
  let ucontact = document.querySelector(".ucontact");
  let uemail = document.querySelector(".uemail");

  let data = JSON.parse(localStorage.getItem("object"));
  let newData = data.map((student) => {
    if (student.student_id === uid.value) {
      return {
        student_id: uid.value,
        student_name: uname.value,
        contact: ucontact.value,
        email: uemail.value,
      };
    } else {
      return student;
    }
  });
  localStorage.setItem("object", JSON.stringify(newData));

  let entryForm = document.querySelector(".entry");
  let updateForm = document.querySelector(".update");

  updateForm.style.display = "none";
  entryForm.style.display = "block";

  readAll();
}

// function to delete student
function del(id) {
  let data = JSON.parse(localStorage.getItem("object"));

  let student = data.filter((student) => {
    return student.student_id != id;
  });

  localStorage.setItem("object", JSON.stringify(student));
  readAll();
}
