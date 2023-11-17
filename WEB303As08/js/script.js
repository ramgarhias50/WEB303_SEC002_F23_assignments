$(document).ready(function () {
  $.ajax({
    url: "js/data.json",
    contentType: "json",
    success: function (data) {
      populateTable(data);
      $("#searchInput").on("input", function () {
        highlightRows($(this).val());
      });

      $("#filterAM").on("click", function () {
        toggleFilter("A", "M");
      });

      $("#filterNZ").on("click", function () {
        toggleFilter("N", "Z");
      });
    },
  });

  function populateTable(characters) {
    var tableBody = $("#charactersTable tbody");
    tableBody.empty();

    $.each(characters, function (index, character) {
      var row = $("<tr>");
      row.append($("<td>").text(character.first_name));
      row.append($("<td>").text(character.last_name));
      row.append($("<td>").text(character.age));
      row.append($("<td>").text(character.occupation));
      row.append($("<td>").text(character.hometown));

      tableBody.append(row);
    });
  }

  function highlightRows(searchTerm) {
    var rows = $("#charactersTable tbody tr");
    rows.removeClass("highlight");

    rows.filter(':contains("' + searchTerm + '")').addClass("highlight");
  }

  function toggleFilter(startChar, endChar) {
    var rows = $("#charactersTable tbody tr");
    var filteredRows = rows.filter(function () {
      var lastName = $(this).find("td:eq(1)").text().toUpperCase(); // Convert to uppercase for case-insensitive comparison
      return lastName >= startChar && lastName <= endChar;
    });

    rows.hide();
    filteredRows.show();

    updateFilterButtons(filteredRows);
  }

  function updateFilterButtons(filteredRows) {
    var countAM = filteredRows.filter(function () {
      var lastName = $(this).find("td:eq(1)").text().toUpperCase();
      return lastName >= "A" && lastName <= "M";
    }).length;

    var countNZ = filteredRows.filter(function () {
      var lastName = $(this).find("td:eq(1)").text().toUpperCase();
      return lastName >= "N" && lastName <= "Z";
    }).length;

    $("#filterAM").text("A - M (" + countAM + ")");
    $("#filterNZ").text("N - Z (" + countNZ + ")");
  }
});
