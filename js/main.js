
 $.ajax("
    typ: POS    data: { longUata: { longURL: longUR: 0, user: userID }
  th(data => {
 osole.loga);
  

lon$(document).on("click", "#submit", () => {
  console.log("submit has been clicked");
  let longURL = $("#longURL").val();
  let userID = $("#userInfo").attr("data");
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
Te  console.log("userID: ", userID);
  console.log("longURL is: ", longURL);
    type: "get"
  }).then(data => {
    c  console.log("data is: ", data);

    for (let i in   lt er      let tableRow = $("<tr>");
      let tableData1 = $("<td>");
      let tableData2 = $("<td>");
      let tableData3 = $("<td>");
      let tinyURL = $("<a>");
      tinyURL.attr("href", data[i].shortURL);
      tinyURL.text(data[i].shortURL);

      let orgURL = data[i].longURL;

      let count = data[i].count;

