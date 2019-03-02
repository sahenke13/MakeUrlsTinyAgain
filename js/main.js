const userdb = "./models/users";

$(document).ready(() => {
  let userId = $("#formDiv").attr("data");

  $.ajax("/m/user/" + userId, {
    type: "get"
  }).then(data => {
    console.log("data is: ", data);

    for (let i in data) {
      let tableRow = $("<tr>");
      let tableData1 = $("<td>");
      let tableData2 = $("<td>");
      let tableData3 = $("<td>");
      let tinyURL = $("<a>");
      tinyURL.attr("href", data[i].shortURL);
      tinyURL.text(data[i].shortURL);

      let orgURL = data[i].longURL;

      let count = data[i].count;

      let orgURLData = tableData1.append(orgURL);
      let tinyURLData = tableData2.append(tinyURL);
      let countData = tableData3.append(count);

      tableRow.append(orgURLData);
      tableRow.append(tinyURLData);
      tableRow.append(countData);

      $("#dynamicTable").append(tableRow);
      console.log("dynamic data: ", orgURL, tinyURL, count);
    }
  });
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

//On Click function for Signing Up a new User
$(document).on("click", "#signup", e => {
  e.preventDefault();
  let userName = $("#userName").val();
  let password = $("#password").val();
  let confPassword = $("#confirmPassword").val();
  if (
    password === confPassword &&
    $("#userName")
      .get(0)
      .checkValidity()
  ) {
    //make ajax post to create new User in DB.

    $.ajax("/m/user", {
      type: "POST",
      url: "/m/user",
      data: { email: userName, password: password }
    });
    window.location = "/login";
  } else {
    alert(
      "Please check that your email is valid and that your passwords match"
    );
  }
});

// need to get signin information
$(document).on("click", "#logIn", e => {
  e.preventDefault();
  let userName = $("#logInUser").val();
  let password = $("#logInPassword").val();

  $.ajax("/m/user/", {
    type: "get"
  }).then(data => {
    //this is working, now need to check if password and email match if so, make currentUser, and reroute to shortURLs, if not send up alert and clear from.
    let curUser = data.find(el => {
      console.log("userName: ", el.email);
      return el.email === userName;
    });
    console.log("curUser: ", curUser);
  });
  console.log("UserName is " + userName + "password is " + password);
});
