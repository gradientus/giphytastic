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
  }&limit=10&offset=0&lang=en`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < 10; i++) {
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var rating = response.data[i].rating;
      var title = response.data[i].title;

      var images = $("<img>");
      $(images).addClass("images");
      $(images).attr("src", still);
      $(images).attr("state", "still");
      $(images).attr("activesrc", animated);
      $(images).attr("rating", rating);
      $(images).attr("title", title);
      $(images).attr("data-img", i);
      $("#displayArea").prepend(images);
      console.log(response);
    }
  });
}

//to be able to tell which button was click on
$(document).on("click", ".topic", function() {
  var index = $(this).attr("data-value");
  //$("#displayArea").empty();
  displayImages(index);
  console.log("index: " + index);
});

//to allow the user to add topics, then render that topic
$(document).on("click", "#addtopic", function(event) {
  event.preventDefault();
  var topicinfo = $("#topic")
    .val()
    .trim();
  if (topicinfo === "") {
    alert("Please enter text.");
  } else {
    buttonArray.push(topicinfo);
    renderbuttons();
  }
});

//call to render the buttons (pre-made or otherwise)
renderbuttons();

//TODO: Put the images inside another div so that we can put the title and rating in there comfortably.  Give the title and rating divs.
//TODO: List the Title of the Picture and the rating
//TODO: Need to do something with the image data attributes
//TODO: Add the ability to click a gif and have is become still or animated, opposite of whatever state it is in currently

$(document).on("click", ".images", function() {
  var imgIndex = $(this).attr("data-img");
  console.log(imgIndex);
  console.log(this);
  console.log(this.animated);
  //make the rating, title, animated attributes so you can swap them around
});
