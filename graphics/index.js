'use strict';
var Visible = nodecg.Replicant('Visible', {defaultValue: true});
var ArtistName = nodecg.Replicant('ArtistName', {defaultValue: 'Unknown'});
var TrackName = nodecg.Replicant('TrackName', {defaultValue: 'Unknown'});
var AlbumArt = nodecg.Replicant('AlbumArt', {defaultValue: 'Unknown'});

Visible.on('change', function(newValue, oldValue) {
    if (newValue) {
        $('body').show();
    } else {
        $('body').hide();
    }
});

ArtistName.on('change', function(newValue, oldValue) {
    $('.ArtistNameText').text(newValue);
    if (newValue.length >= 12)
    {
        $('.ArtistName.still').hide();
        $('.ArtistName.long').show();

        $('.ArtistName .marquee').marquee({
            duration: 15000,
            gap: 50,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            startVisible: true
        });
    }
    else
    {
        $('.ArtistName.still').show();
        $('.ArtistName.long').hide();
    }
});

TrackName.on('change', function(newValue, oldValue) {
    $('.TrackNameText').text(newValue);
    if (newValue.length >= 12)
    {
        $('.TrackName.still').hide();
        $('.TrackName.long').show();
        $('.TrackName .marquee').marquee({
            duration: 15000,
            gap: 50,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            startVisible: true
        });
    }
    else
    {
        $('.TrackName.still').show();
        $('.TrackName.long').hide();
    }
});

AlbumArt.on('change', function(newValue, oldValue) {
    $('#Album').attr('src', newValue);
});