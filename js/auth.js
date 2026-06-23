function registerUser() {

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

if(
name==="" ||
email==="" ||
password==="")
{
alert("Fill all fields");
return;
}

let users =
JSON.parse(localStorage.getItem("users"))
|| [];

users.push({
name,
email,
password
});

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Registration Successful");

window.location.href="login.html";

}

function loginUser() {

let email =
document.getElementById("loginEmail").value;

let password =
document.getElementById("loginPassword").value;

let users =
JSON.parse(localStorage.getItem("users"))
|| [];

let found =
users.find(user =>
user.email===email &&
user.password===password
);

if(found){

localStorage.setItem(
"loggedInUser",
JSON.stringify(found)
);

alert("Login Successful");

window.location.href="profile.html";

}
else{

alert("Invalid Credentials");

}

}

function logout(){

localStorage.removeItem(
"loggedInUser"
);

window.location.href="login.html";

}