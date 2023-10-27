/*
    Assignment 05
*/

$(document).ready(function () {
  // your code here
  class ContentItem {
    constructor(id, name, description, category) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.category = category;
    }
    updateCotentItem(id, name, description, category) {
      if (id === this.id) {
        if (name !== null) {
          this.name = name;
        }
        if (description !== null) {
          this.description = description;
        }
        if (category !== null) {
          this.category = category;
        }
      }
    }
    toString() {
      return `<div id="content-item-${this.id}">
      <h2>${this.name}</h2>
      <p>${this.description}</p>
      <div>${this.category}</div>
    </div>`;
    }
  }
  const contentItems = [
    new ContentItem(
      0,
      "The Legend of Zelda: Breath of the Wild",
      "An action-adventure game for the Nintendo Switch.",
      "Action-Adventure"
    ),
    new ContentItem(
      1,
      "Minecraft",
      "A sandbox game that allows you to build and explore in a blocky world.",
      "Sandbox"
    ),
    new ContentItem(
      2,
      "Red Dead Redemption 2",
      "An open-world western action-adventure game.",
      "Action-Adventure"
    ),
    new ContentItem(
      3,
      "FIFA 22",
      "A popular soccer simulation video game.",
      "Sports"
    ),
    new ContentItem(
      4,
      "The Witcher 3: Wild Hunt",
      "A role-playing game with a rich fantasy world.",
      "RPG"
    ),
  ];
  $("#content-item-list").css({
    border: "1px solid #000",
    width: "300px",
    padding: "10px",
    margin: "10px auto",
  });
  const contentList = $("#content-item-list");

  contentItems.forEach((item) => {
    const contentHTML = item.toString();
    contentList.append(contentHTML);
  });
  $('#updateSuccess').click(function () {

    contentItems[0].updateCotentItem(0, "GTA V", null, "Action");

    contentList.empty();
    contentItems.forEach((item) => {
      const contentHTML = item.toString();
      contentList.append(contentHTML);
    });
  });

  $('#updateFail').click(function () {

    contentItems[1].updateCotentItem(1, null, "This should not work", null);

    contentList.empty();
    contentItems.forEach((item) => {
      const contentHTML = item.toString();
      contentList.append(contentHTML);
    });
  });
});
