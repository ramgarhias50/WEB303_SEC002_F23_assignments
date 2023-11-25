$(document).ready(function () {
  $.ajax({
    url: "js/data.json",
    dataType: "json",
    success: function (data) {
      populateTable(data);

      $("#searchInput").on("keyup", function () {
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

    updateFilterButtons(tableBody.find("tr"));
  }

  function highlightRows(searchTerm) {
    var rows = $("#charactersTable tbody tr");
    rows.removeClass("highlight");

    rows
      .filter(function () {
        return $(this).text().toUpperCase().includes(searchTerm.toUpperCase());
      })
      .addClass("highlight");
  }

  function toggleFilter(startChar, endChar) {
    var rows = $("#charactersTable tbody tr");
    var filteredRows = rows.filter(function () {
      var lastName = $(this).find("td:eq(1)").text().toUpperCase();
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
  var compare = {
    name: function (a, b) {
      a = a.replace(/^the /i, "");
      b = b.replace(/^the /i, "");
      return a.localeCompare(b);
    },
    age: function (a, b) {
      return a - b;
    },
  };
  $("#charactersTable").each(function () {
    var $table = $(this);
    var $tbody = $table.find("tbody");
    var $controls = $table.find("th");
    var rows = $tbody.find("tr").toArray();
console.log(rows);
    $controls.on("click", function () {
      var $header = $(this);
      var order = $header.data("sort");
      var column;

      //If selected item has ascending or descending class, reverse contents
      if ($header.is(".ascending") || $header.is(".descending")) {
        $header.toggleClass("ascending descending");

        $tbody.append(rows.reverse());
      } else {
        $header.addClass("ascending");
        //Remove asc or desc from all other headers
        $header.siblings().removeClass("ascending descending");

        if (compare.hasOwnProperty(order)) {
          column = $controls.index(this);
          rows.sort(function (a, b) {
            a = $(a).find("td").eq(column).text();
            b = $(b).find("td").eq(column).text();
            console.log("a: ", a, "   b: ", b);
            return compare[order](a, b);
          });
          $tbody.append(rows);
        }
      }
    });
  });
});
