//    1 - Grab the input
function getInput() {
    var input = document.querySelector("input").value;
    return input;
}

document.querySelector(".js-go").addEventListener('click', function () {
    setUpURL(getInput());
    loadGif();
})

document.querySelector(".js-userinput").addEventListener('keyup', function (event) {
    if (event.which === 13) {
        setUpURL(getInput());
        loadGif();
    }
})

//   2 - Do the data stuff with api
var url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
var urlStart = "http://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=dc6zaTOxFJmzC";

function setUpURL(input) {

    while (input.includes(' ')) {
        input = input.replace(' ', '+');
    }

    url = urlStart + input + apiKey;
}

// AJAX Request
var GiphyAJAXCall = new XMLHttpRequest();

function loadGif() {
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();
}


GiphyAJAXCall.addEventListener('load', function (e) {

    var data = e.target.response;
    pushToDOM(data);

});


//   3 - Display the gifs

function pushToDOM(input) {

    removePreviousGifs();

    var response = JSON.parse(input);

    var imageUrls = response.data;

    var container = document.querySelector(".js-container");

    imageUrls.forEach(function (image) {

        var src = image.images.fixed_height.url;

        container.innerHTML += "<div class=\"container-image\"> <img src=\"" + src + "\"> </div>";

    });
}

function removePreviousGifs() {
    var container = document.querySelector(".js-container");
    container.innerHTML = "";
}


