$(document).ready(() => {
  console.log("this is js file for shortUrl");
  //   $.ajax("/m/user/" + userId, {
  //     type: "get"
  //   }).then(data => {
  //     console.log("data is: ", data);
  //     for (let i in data) {
  //       let tableRow = $("<tr>");
  //       let tableData1 = $("<td>");
  //       let tableData2 = $("<td>");
  //       let tableData3 = $("<td>");
  //       let tinyURL = $("<a>");
  //       tinyURL.attr("href", data[i].shortURL);
  //       tinyURL.text(data[i].shortURL);
  //       let orgURL = data[i].longURL;
  //       let count = data[i].count;
  //       let orgURLData = tableData1.append(orgURL);
  //       let tinyURLData = tableData2.append(tinyURL);
  //       let countData = tableData3.append(count);
  //       tableRow.append(orgURLData);
  //       tableRow.append(tinyURLData);
  //       tableRow.append(countData);
  //       $("#dynamicTable").append(tableRow);
  //       console.log("dynamic data: ", orgURL, tinyURL, count);
  //     }
  //   });
});
$(document).on("click", "#submit", () => {
  if (
    $("#longURL")
      .get(0)
      .checkValidity()
  ) {
    let longURL = $("#longURL").val();
    let userID = $("#formDiv").attr("data");
    console.log("userID: ", userID);
    console.log("longURL is: ", longURL);

    $.ajax("/m", {
      type: "POST",
      url: "/m",
      data: { longURL: longURL, count: 0, user: userID }
    }).then(data => {
      console.log(data);
    });

    $("#longURL").val(" ");
  } else {
    alert("Invalid URL, please try again.");
    $("#longURL").val(" ");
    location.reload(true);
  }

  $("#longURL").val(" ");
  location.reload(true);
});
