// Search

function getInput() {
    var input = document.querySelector(".js-search").value;
    return input;
}

document.querySelector(".js-submit").addEventListener('click', function () {
    SoundCloudAPI.getTrack(getInput());
})

document.querySelector(".js-search").addEventListener('keyup', function (event) {
    if (event.which === 13) {
        SoundCloudAPI.getTrack(getInput());
    }
})

// Query Soundcloud API

var SoundCloudAPI = {};

SoundCloudAPI.init = function () {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function (inputValue) {
    SC.get('/tracks', {
        q: inputValue
    }).then(function (tracks) {
        SoundCloudAPI.renderTacks(tracks);
    });
}



// Display the cards
SoundCloudAPI.renderTacks = function (tracks) {
    var searchResults = document.querySelector(".js-search-results");
    searchResults.innerHTML = "";
    tracks.forEach(track => {
        //card div
        var card = document.createElement('div');
        card.classList.add("card");

        //img div
        var imageDiv = document.createElement('div');
        imageDiv.classList.add("image");

        var image_img = document.createElement('img');
        image_img.classList.add("image_img");
        track.artwork_url = track.artwork_url.replace("large", "t500x500");
        image_img.src = track.artwork_url || "http://http://lorempixel.com/100/100/abstract/";

        imageDiv.appendChild(image_img);

        //content
        var content = document.createElement('div');
        content.classList.add("content");

        var header = document.createElement('div');
        header.classList.add("header");
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">"' + track.title + '"</a>';

        var button = document.createElement('div');
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        button.addEventListener('click', function () {
            SoundCloudAPI.getEmbed(track.permalink_url);
        })

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = "Add to playlist";

        content.appendChild(header);

        button.appendChild(icon);
        button.appendChild(buttonText);

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        searchResults.appendChild(card);

    });

}
// add to playlist and play

SoundCloudAPI.getEmbed = function (trackURL) {
    SC.oEmbed(trackURL, {
        auto_play: true
    }).then(function (embed) {
        console.log('oEmbed response: ', embed);
        var sidebar = document.querySelector(".js-playlist");

        var box = document.createElement('div');
        box.innerHTML = embed.html;

        sidebar.insertBefore(box, sidebar.firstChild);

        localStorage.setItem("sidebar", sidebar.innerHTML);
    });
}

var sidebar = document.querySelector(".js-playlist");
sidebar.innerHTML = localStorage.getItem("sidebar");

