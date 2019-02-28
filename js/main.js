$(document).on("click", "#submit", () => {
  console.log("submit has been clicked");
  let longURL = $("#longURL").val();
  console.log("longURL is: ", longURL);
  $("#longURL").val(" ");
});
