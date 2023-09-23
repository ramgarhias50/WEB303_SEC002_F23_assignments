/*
	WEB 303 Assignment 1 - jQuery
	Gursimran Singh Assi
*/

$(document).ready(function () {
  $("#yearly-salary,#percent").on("keyup", function () {
    var yearly = $("#yearly-salary").val();
    var percent = $("#percent").val();
    var spending = ((yearly * percent) / 100).toFixed(2);
    $("#amount").text("$" + spending);
  });
});
