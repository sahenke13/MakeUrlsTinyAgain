$(document).ready(() => {
  let userId = $("#formDiv").attr("data");

  $.ajax("/m/user/" + userId, {
    type: "get"
  }).then(data => {
    console.log(data);
  });
});

$(document).on("click", "#submit", () => {
  console.log("submit has been clicked");
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
});
