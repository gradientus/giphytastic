var buttonArray = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Neptune",
  "Uranus",
  "Pluto",
  "UFO"
];

function renderbuttons() {
  $("#buttons").empty();
  for (var i = 0; i < buttonArray.length; i++) {
    $("#buttons").append(
      `<button type="button" class="btn btn-primary topic" data-value="${i}">${
        buttonArray[i]
      }</button>`
    );
  }

  $(document).on("click", ".topic", function() {
    var index = $(this).attr("data-value");
    displayImages(index);
  });
}

function displayImages(i) {
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=JzubCXWkSrfanIsUN38CVmpc6ihcHZiu&q=${
    buttonArray[i]
  }&limit=25&offset=0&rating=G&lang=en`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var animated = response.data[0].images.downsized_large.url;
    var still = response.data[0].images.downsized_still.url;
    var rating = response.data[0].rating;
    $("#displayArea").append(`<img src="${animated}" class="images">`);

    // loop the data
    // loop what info I need from the object
    // render images

    // include you will need to url for theimages because on clinck you will need to be able to swtich
  });
}

$(document).on("click", "#addtopic", function(event) {
  event.preventDefault();
  var topicinfo = $("#topic")
    .val()
    .trim();
  console.log(topicinfo);
  buttonArray.push(topicinfo);
  renderbuttons();
});

renderbuttons();
