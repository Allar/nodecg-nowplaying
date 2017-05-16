'use strict';

var request = require('request');

module.exports = function (nodecg) 
{
    var lastfm_uri = `http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${nodecg.bundleConfig.lastfm_user}&api_key=${nodecg.bundleConfig.lastfm_api_key}&limit=1&format=json`

    var ArtistName = nodecg.Replicant('ArtistName', {defaultValue: 'Unknown'});
    var TrackName = nodecg.Replicant('TrackName', {defaultValue: 'Unknown'});
    var AlbumArt = nodecg.Replicant('AlbumArt', {defaultValue: '#'});

    var updateInfo = function() 
    {
        request(lastfm_uri, function(err, res, body) 
        {
            if (!err && res.statusCode == 200) 
            {
                var data = JSON.parse(body);

                try {
                    if (data !== null && 
                    data.hasOwnProperty("recenttracks") &&
                    data.recenttracks.hasOwnProperty("track") && 
                    data.recenttracks.track.length > 0 && 
                    data.recenttracks.track[0].hasOwnProperty("artist") &&
                    data.recenttracks.track[0].hasOwnProperty("name"))
                    {
                        var currentArtistName = data.recenttracks.track[0].artist['#text'];
                        var currentTrackName = data.recenttracks.track[0].name;
                        var currentAlbumArt = data.recenttracks.track[0].image[1]['#text'];

                        if (currentArtistName !== ArtistName || TrackName !== TrackName)
                        {
                            ArtistName.value = currentArtistName;
                            TrackName.value = currentTrackName;
                            if (currentAlbumArt == "")
                            {
                                currentAlbumArt = "https://placeholdit.imgix.net/~text?txtsize=33&txt=?&w=64&h=64";
                            }
                            AlbumArt.value = currentAlbumArt;
                        }
                        return;
                    }
                }
                catch(e)
                {
                    return;
                }
                
            }
            else
            {
                return console.error("Could not get Last.FM data");
            }
            
        });
    }

    setInterval(updateInfo, 5000);
};