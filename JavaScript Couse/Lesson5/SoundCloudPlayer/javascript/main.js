// Search



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
        console.log(tracks);
    });
}

SoundCloudAPI.getTrack("Kanye");

// Display the cards



// add to playlist and play


