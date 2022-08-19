$('input').keydown(function() {
    $('#signin-fail').hide();
    $('#signup-fail').hide();
} );
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var currentVideo = "";
var currentPlayList = "";
var user = null

document.onkeydown = function(event) {
    if (event.key === "Escape") {
        stopVideo();
        //closeEmbed();
        closeSearch();
    }
};

getUserButton();