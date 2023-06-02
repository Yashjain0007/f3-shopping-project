// Write your script here

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const saveInfo = document.getElementById("saveInfo");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const logoutBtn = document.getElementById("logoutBtn");

const currentUser = JSON.parse(localStorage.getItem("current"));
console.log(currentUser);
let allUsers = JSON.parse(localStorage.getItem("user"));
console.log(allUsers);

firstName.value = currentUser.firstName;
lastName.value = currentUser.lastName;

saveInfo.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("test");
  currentUser.firstName = firstName.value;
  currentUser.lastName = lastName.value;
  localStorage.setItem("userDetails", JSON.stringify(currentUser));
  allUsers.forEach((item) => {
    if (currentUser.email == item.email) {
      item.firstName = firstName.value;
      item.lastName = lastName.value;
      console.log("test2");
    }
  });
  localStorage.setItem("user", JSON.stringify(allUsers));
});

changePasswordBtn.addEventListener("click", (event) => {
  console.log("hello");
  if (oldPassword.value != currentUser.password) {
    alert("Password Incorrect");
  }

  if (newPassword.value != confirmPassword.value) {
    alert("Passwords are not matching");
  } else if (newPassword.value == "") {
    alert("Password Cannot be empty");
  } else if (
    newPassword.value != "" &&
    newPassword.value == confirmPassword.value &&
    oldPassword.value == currentUser.password
  ) {
    currentUser.password = newPassword.value;
    localStorage.setItem("userDetails", JSON.stringify(currentUser));
    allUsers.forEach((item) => {
      item.password = newPassword.value;
    });
    localStorage.setItem("user", JSON.stringify(allUsers));
    alert("Success");
  }
});

logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.setItem("current", JSON.stringify({}));
  window.location.href = "../index.html";
  return;
});
