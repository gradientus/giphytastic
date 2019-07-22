//TODO:
//create an AJAX call to the giphy API to make sure it is working
//have it go to console.log

//TODO:
//Create an array of strings, things that interest me.
//10 buttons?
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
    console.log("Click");
    var index = $(this).attr("data-value");
    console.log(index, buttonArray[index]);
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
    console.log(response);

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
