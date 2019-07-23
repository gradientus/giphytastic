//array of pre-set buttons
var buttonArray = [
  "Rain",
  "Snow",
  "Tornado",
  "Hurricane",
  "Dust Devil",
  "Water Spout",
  "Sleet",
  "Blizzard",
  "Drought",
  "Hail",
  "Lightning",
  "Sunny",
  "Typhoon"
];

//to make the topics render as buttons
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

//to fetch then display the images
function displayImages(i) {
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=JzubCXWkSrfanIsUN38CVmpc6ihcHZiu&q=${
    buttonArray[i]
  }&limit=25&offset=0&rating=G&lang=en`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < 10; i++) {
      var animated = response.data[i].images.downsized_large.url;
      var still = response.data[i].images.downsized_still.url;
      var rating = response.data[i].rating;
      $("#displayArea").append(`<img src="${animated}" class="images">`);
    }
  });
}

//to be able to tell which button was click on
$(document).on("click", ".topic", function() {
  var index = $(this).attr("data-value");
  displayImages(index);
});

//to allow the user to add topics
$(document).on("click", "#addtopic", function(event) {
  event.preventDefault();
  var topicinfo = $("#topic")
    .val()
    .trim();
  console.log(topicinfo);
  buttonArray.push(topicinfo);
  renderbuttons();
});

//call to render the buttons (pre-made or otherwise)
renderbuttons();

//TODO: Add the ability to click a gif and have is become still or animated, opposite of whatever state it is in currently
