// WEB303 Assignment 2
var el = $("#content");
$(document).ready(function () {
  function loadcontent(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        el.fadeOut(300, function () {
          el.html(xhr.responseText);
          //el.innerHTML = xhr.responseText;
          el.fadeIn(300);
        });
      }
    };
    xhr.send();
  }
  $("#convert").on("click", function (e) {
    e.preventDefault();
    loadcontent("convert.html");
  });
  $("#prospect").on("click", function (e) {
    e.preventDefault();
    loadcontent("prospect.html");
  });

  $("#retain").on("click", function (e) {
    e.preventDefault();
    loadcontent("retain.html");
  });
});
