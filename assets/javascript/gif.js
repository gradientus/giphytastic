//array of pre-set buttons
var buttonArray = [
  "Zeus",
  "Hera",
  "Poseidon",
  "Demeter",
  "Athena",
  "Apollo",
  "Artemis",
  "Ares",
  "Aphrodite",
  "Hephaestus",
  "Hermes",
  "Hestia",
  "Dionysus",
  "Hades"
];

//to make the pre-picked topics render as buttons
function renderbuttons() {
  $("#buttons").empty();
  for (var i = 0; i < buttonArray.length; i++) {
    $("#buttons").append(
      `<button type="button" class="btn btn-primary topic" data-value="${i}">${
        buttonArray[i]
      }</button>`
    );
  }
}

//to fetch images, assign values, then display the images
function displayImages(index) {
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=JzubCXWkSrfanIsUN38CVmpc6ihcHZiu&q=${
    buttonArray[index]
  }&limit=12&offset=0`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i <= 10; i++) {
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var rating = response.data[i].rating;

      var imageRatingPlace = $("<div>");
      $(imageRatingPlace).attr("id", "iRP");

      var para = $("<p>");
      para.text("Rating: " + rating);

      var images = $("<img>");
      $(images).addClass("images");
      $(images).attr("src", still);
      $(images).attr("state", "still");
      $(images).attr("animatedSRC", animated);
      $(images).attr("stillSRC", still);
      $(images).attr("rating", rating);

      $("#iRP").append(para);
      $("#iRP").append(images);
      $("#displayArea").prepend(imageRatingPlace);
    }
  });
}

//to be able to tell which button was click on
$(document).on("click", ".topic", function() {
  var index = $(this).attr("data-value");
  displayImages(index);
});

//to allow the user to add topics, then render that topic
$(document).on("click", "#addtopic", function(event) {
  event.preventDefault();
  var topicinfo = $("#topic")
    .val()
    .trim();
  if (topicinfo === "") {
    alert("Please enter a search word or term.");
  } else {
    buttonArray.push(topicinfo);
    renderbuttons();
  }
});

//call to render the buttons (pre-made or otherwise)
renderbuttons();

//TODO: Add the ability to click a gif and have is become still or animated, opposite of whatever state it is in currently

$(document).on("click", ".images", function() {
  let still = $(this).attr("stillSRC");
  let animated = $(this).attr("animatedSRC");
  let state = $(this).attr("state");
  let rating = $(this).attr("rating");

  if (state === "still") {
    $(this).attr("src", animated);
    $(this).attr("state", "animated");
  } else {
    $(this).attr("src", still);
    $(this).attr("state", "still");
  }
});
