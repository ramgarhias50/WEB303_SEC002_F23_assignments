$(document).ready(function () {
  countries.forEach((element) => {
    var option = `<option value=${element.code}>${element.name}</option>`;
    $("#country").append(option);
  });

  formValidate();
});

function formValidate() {
  var username = $("#username").val();
  var country = $("#country").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  var termsCheckbox = $("#termsCheckbox").prop("checked");

  if (
    password.length >= 12 &&
    password == confirmPassword &&
    username &&
    termsCheckbox &&
    country != ""
  ) {
    $("#submitButton").removeAttr("disabled");
  }
  $("#submitButton").on("click", function (e) {
    e.preventDefault();
    let msg = `Welcome ${username}! The country code you selected is ${country}`;
    $("#welcomeMessage").text(msg);
    $("#welcomeMessage").css("display", "block");
  });
}
