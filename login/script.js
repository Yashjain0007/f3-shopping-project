const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");

loginButton.addEventListener("click", loginCheck);
// const loginBtn = document.getElementById("loginBtn");

// loginBtn.addEventListener("click", loginCheck);

function loginCheck(event) {
  event.preventDefault();

  const Username = JSON.parse(localStorage.getItem("user"));
  if (!Username) {
    alert("No user found. Sign up First!");
    return;
  }
  for (let i = 0; i < Username.length; i++) {
    if (
      Username[i].email == email.value &&
      Username[i].password == password.value
    ) {
      let current = Username[i];

      localStorage.setItem("current", JSON.stringify(current));
      window.location.href = "../shop/index.html";
      console.log(current);
      return;
    }
  }
  alert("Email or Password not matched");
}
