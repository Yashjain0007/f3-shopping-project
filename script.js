// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

// for give direvtion to btns.
document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "./login/index.html";
});

document.getElementById("signupBtn").addEventListener("click", () => {
  window.location.href = "./signup/index.html";
});

document.getElementById("profile").addEventListener("click", () => {
  alert("Login First");
});
