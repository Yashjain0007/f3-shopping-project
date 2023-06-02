function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
}

document.getElementById("signup-form").addEventListener("submit", signup);
let user = [] || JSON.parse(localStorage.getItem("user"));

function signup(event) {
  event.preventDefault();

  let firstName = document.getElementById("first-Name").value;
  let lastName = document.getElementById("last-Name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (
    firstName == "" ||
    lastName == "" ||
    email == "" ||
    password == "" ||
    confirmPassword != password
  ) {
    alert("Fill details correctly!");
  } else {
    if (!validateEmail(email)) {
      alert("Invalid Email");
    } else {
      for (let i = 0; i < user.length; i++) {
        if (user[i].email == email) {
          alert("Email is already registered");
          return;
        }
      }
      let userDetails = {
        id: user.length,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      user.push(userDetails);

      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);

      // window.location.href = "../login/index.html";
      alert("SignUp Successful");
    }
  }
  // clear();
}

// function clear() {
//   document.getElementById("first-name").innerText = "";
//   document.getElementById("last-name").value = "";
//   document.getElementById("email").value = "";
//   document.getElementById("password").value = "";
//   document.getElementById("confirmPassword").value = "";
// }
