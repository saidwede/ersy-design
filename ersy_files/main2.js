

// window.onpopstate = function() {
//     setTimeout(() => {
//         navigateTo(window.location.pathname);
//     }, 1000); 
// }
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


}
function closeSearch(){
    $('.search__body').addClass('hidden');
    setTimeout(() => {
        $('.search__content').addClass('hidden');
    }, 60);
    setTimeout(() => {
        $('.search__content').css('display', 'none');
    }, 400);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      playNextVideo();
    }
}
function playNextVideo(){
    var videoTag = document.querySelector("[data-play-list='"+currentPlayList+"'] [data-video-id='"+currentVideo+"']");
    var next = videoTag.nextElementSibling;
    if(next && next.hasAttribute('data-video-id')){
        currentVideo = next.getAttribute('data-video-id');
        player.loadVideoById(currentVideo);
        onVideoLaunch();
    }
}
function playPreviousVideo(){
    var videoTag = document.querySelector("[data-play-list='"+currentPlayList+"'] [data-video-id='"+currentVideo+"']");
    var next = videoTag.previousElementSibling;
    if(next){
        currentVideo = next.getAttribute('data-video-id');
        player.loadVideoById(currentVideo);
        onVideoLaunch();
    }
}
function loadVideo(videoId, playList){
    //closeEmbed();
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if(vw < 650){
        container2 = document.getElementById("player-container2"); 
        container2.style.width = "90vw";
        container2.style.height = "54vw";
    }
    document.getElementById("player-container").style.display = "block";
    currentVideo = videoId;
    currentPlayList = playList;
    player.loadVideoById(videoId);
    onVideoLaunch();
    // playingCategory = vCategory;
}
function stopVideo(){
    document.getElementById("player-container").style.display = "none";
    player.pauseVideo();

    var allPlayerStatus = document.querySelectorAll(".video__playing");
    allPlayerStatus.forEach(element => {
        element.style.display = "none";
    });
    // var allVideosNames = document.querySelectorAll(".t-grid a, .t-list a");
    // allVideosNames.forEach(element => {
    //     element.style.color = "#0a58ca";
    // });
}
function onVideoLaunch(){
    // var videoTitle = document.querySelector(".v-"+currentVideo+" .video-name").innerText;
    // document.getElementById("played-video-title").innerText = videoTitle;
    // var allPlayerStatus = document.querySelectorAll(".playing-state");
    // allPlayerStatus.forEach(element => {
    //     element.style.display = "none";
    // });
    // var allVideosNames = document.querySelectorAll(".t-grid a, .t-list a");
    // allVideosNames.forEach(element => {
    //     console.log("Found equivalent!");
    //     element.style.color = "#0a58ca";
    // });
    // var playingVideosStates = document.querySelectorAll(".v-"+currentVideo+" .playing-state");
    // playingVideosStates.forEach(element => {
    //     element.style.display = "flex";
    // });
    // var playingVideosNames = document.querySelectorAll(".v-"+currentVideo+" a");
    // playingVideosNames.forEach(element => {
    //     element.style.color = "#888888";
    // });
    //increaseOdometer();
    isVideoHearted();
    removeFromNotifications();

    var allPlayerStatus = document.querySelectorAll(".video__playing");
    allPlayerStatus.forEach(element => {
        element.style.display = "none";
    });
    var allPlayingVideos = document.querySelectorAll("[data-video-id='"+currentVideo+"'] .video__playing");
    allPlayingVideos.forEach(element => {
        element.style.display = "flex";
    });
}
function increaseOdometer(){
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/api/odometer', false);
    xhttp.send();
    var count = document.getElementById("odometer").innerText;
    document.getElementById("odometer").innerText = parseInt(count)+1;
}
function isVideoHearted(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',currentVideo);
    xhttp.open('POST', '/api/is-video-hearted', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                document.getElementById("heartIcon").style.color = "#ff0000";
            }else{
                console.log(responce.target.response);
                document.getElementById("heartIcon").style.color = "#bbbbbb";
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function heartVideo(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',currentVideo);
    xhttp.open('POST', '/api/heart-video', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                document.getElementById("heartIcon").style.color = "#ff0000";
            }else if(responce.target.response == "removed"){
                console.log(responce.target.response);
                document.getElementById("heartIcon").style.color = "#bbbbbb";
            }else if(responce.target.response == "login"){
                minimize();
                showSignIn();
                //modalEmailVerify();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function heartVideo2(videoId){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',videoId);
    xhttp.open('POST', '/api/heart-video', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                var videos = document.querySelectorAll(".v-"+videoId+" .video-heart");
                videos.forEach(element => {
                    element.style.color = "#ff0000";
                });
            }else if(responce.target.response == "removed"){
                var videos = document.querySelectorAll(".v-"+videoId+" .video-heart");
                videos.forEach(element => {
                    element.style.color = "#ffffff80";
                });
            }else if(responce.target.response == "login"){
                window.location.href = "/login";
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function removeFromNotifications(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('video-id',currentVideo);
    xhttp.open('POST', '/api/remove-from-notifcations', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            getUserButton();
        }
    }
    xhttp.send(params);
}
function subscribe(artistid){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('artist_id', artistid);
    xhttp.open('POST', '/subscribe', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "subscribed"){
                //console.log(responce.target.response);
                document.getElementById('subscribe-btn').innerText = "Followed";
                document.getElementById('subscribe-btn-sm').innerText = "Followed";
            }else if(responce.target.response == "unsubscribed"){
                //console.log(responce.target.response);
                document.getElementById('subscribe-btn').innerText = "Follow";
                document.getElementById('subscribe-btn-sm').innerText = "Follow";
            }else{
                showSignIn();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}

function minimize(){
    container1 = document.getElementById("player-container");
    container2 = document.getElementById("player-container2"); 
    container1.style.width = "320px";
    container1.style.height = "180px";  
    container1.style.bottom = "20px";
    container1.style.right = "20px";
    container2.style.width = "100%";
    container2.style.height = "100%";
    document.getElementById("zoom").style.display = "inline-block";
    document.getElementById("minimize").style.display = "none";
    document.getElementById("played-video-title").style.display = "block";
}
function zoom(){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    container1 = document.getElementById("player-container");
    container2 = document.getElementById("player-container2"); 
    container1.style.width = "100vw";
    container1.style.height = "100vh";  
    container1.style.bottom = "0px";
    container1.style.right = "0px";
    if(vw < 650){ 
        container2.style.width = "90vw";
        container2.style.height = "54vw";
    }else{
        container2.style.width = "640px";
        container2.style.height = "360px";
    }
    document.getElementById("zoom").style.display = "none";
    document.getElementById("minimize").style.display = "inline-block";
    document.getElementById("played-video-title").style.display = "none";
}

function setSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/admin/set-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                location.reload();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setPoolSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-pools-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                refreshPool();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setAlbumSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-album-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                refreshPool();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setHeadingSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/admin/set-heading-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                location.reload();
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setTabSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/admin/set-tab-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                navigateTo(location.href);
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setArtistSortingMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-artist-sorting-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                navigateTo(location.href);
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}
function setArtistViewMode(mode){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('mode', mode);
    xhttp.open('POST', '/api/set-artist-view-mode', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                console.log(responce.target.response);
                navigateTo(location.href);
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
}

function signin(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('email', document.getElementById("signin-email").value);
    params.append('password', document.getElementById("signin-password").value);
    xhttp.open('POST', '/api/signin', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                hideModal()
                setTimeout(() => {
                    $('.modal').addClass('is-hidden')
                    setTimeout(() => {
                        $('.modal').css(cssDisplayNone)
                    }, 230);
                }, 260);
                getUserButton();
                navigateTo(location.href);
            }else if(responce.target.response == "wrong"){
                $('#signin-fail .message').html('Oops! Wrong email or password.');
                $('#signin-fail').show();
            }else {
                $('#signin-fail .message').html('Oops! Something went wrong while submitting the form.');
                $('#signin-fail').show();
            }
        }
    }
    xhttp.send(params);
    return false;
}
function signup(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('email', document.getElementById("signup-email").value);
    params.append('password', document.getElementById("signup-password").value);
    params.append('phone', document.getElementById("signup-phone").value);
    params.append('username', document.getElementById("signup-username").value);
    xhttp.open('POST', '/api/signup', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                hideModal()
                setTimeout(() => {
                    $('.modal').addClass('is-hidden')
                    setTimeout(() => {
                        $('.modal').css(cssDisplayNone)
                    }, 230);
                }, 260);
                getUserButton();
            }else if(responce.target.response == "email"){
                $('#signup-fail .message').html('Email already used!');
                $('#signup-fail').show();
            }else if(responce.target.response == "username"){
                $('#signup-fail .message').html('Username already used!');
                $('#signup-fail').show();
            }else {
                $('#signup-fail .message').html('Oops! Something went wrong while submitting the form.');
                $('#signin-fail').show();
            }
        }
    }
    xhttp.send(params);
    return false;
}

function searchArtist2() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('artistSearchInput2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("artistSearchList");
    li = ul.getElementsByTagName('a');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "flex";
      } else {
        li[i].style.display = "none";
      }
    }
}
function openFirstArtist(){
    ul = document.getElementById("artistSearchList");
    li = ul.getElementsByTagName('a');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++){
        if(li[i].style.display != "none"){
            navigateTo(li[i].getAttribute("data-link"));
            return false;
        }
    }
    return true;
}

function navigateTo(url, isArtistPage = false){
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    $('#page_content').load(url+"?type=ajax", function (responce){
        //console.log(responce);
        if(responce == "reload"){
            location.reload();
        }else{
            window.history.pushState("", "", url);
            document.title = "Ersy.com | "+document.getElementById("loaded-page-title").getAttribute("data-title");
            window.scrollTo(0, 0);
        }
    });
    if(isArtistPage && width < 768){
        document.querySelector(".mob-rs__open").style.display = "block";
    }else{
        document.querySelector(".mob-rs__open").style.display = "none";
    }
    closeSearch();
    
    return false;
}
function updateCurrentPage(){
    $('#page_content').load(location.href+"?type=ajax", function (responce){
        if(responce == "reload"){
            location.reload();
        }else{
            //window.history.pushState("", "", url);
            document.title = "Ersy.com | "+document.getElementById("loaded-page-title").getAttribute("data-title");
        }
    });
}
function openTab(artist,tab){
    $('.rs-content').hide();
    // $('.rs-content.similar').hide();
    // $('.rs-content.albums').hide();
    // $('.rs-content.movies').hide();
    // $('.rs-content.feed').hide();
    // $('.rs-content.auto-pulled').hide();
    // $('.rs-content.music-videos').hide();
    // $('.rs-content.discography').hide();
    // $('.rs-content.audios').hide();
    // $('.rs-content.interviews').hide();
    // $('.rs-content.articles').hide();
    // $('.rs-content.gallery').hide();
    // $('.rs-content.removed').hide();
    $('.rs-content.'+tab).show();

    $('.btn-tab').removeClass('active');
    // $('.btn-tab.similar').removeClass('active');
    // $('.btn-tab.albums').removeClass('active');
    // $('.btn-tab.movies').removeClass('active');
    // $('.btn-tab.feed').removeClass('active');
    // $('.btn-tab.auto-pulled').removeClass('active');
    // $('.btn-tab.music-videos').removeClass('active');
    // $('.btn-tab.discography').removeClass('active');
    // $('.btn-tab.audios').removeClass('active');
    // $('.btn-tab.interviews').removeClass('active');
    // $('.btn-tab.articles').removeClass('active');
    // $('.btn-tab.gallery').removeClass('active');
    // $('.btn-tab.removed').removeClass('active');
    $('.btn-tab.'+tab).addClass('active');

    $('.mob__switch-category.similar').removeClass('active');
    $('.mob__switch-category.albums').removeClass('active');
    $('.mob__switch-category.movies').removeClass('active');
    $('.mob__switch-category.feed').removeClass('active');
    $('.mob__switch-category.auto-pulled').removeClass('active');
    $('.mob__switch-category.music-videos').removeClass('active');
    $('.mob__switch-category.discography').removeClass('active');
    $('.mob__switch-category.audios').removeClass('active');
    $('.mob__switch-category.interviews').removeClass('active');
    $('.mob__switch-category.articles').removeClass('active');
    $('.mob__switch-category.gallery').removeClass('active');
    $('.mob__switch-category.removed').removeClass('active');
    $('.mob__switch-category.'+tab).addClass('active');

    window.history.pushState("", "","/artists/"+artist+"/"+tab);
    if(tab == "music-videos" || tab == "audios" || tab == "interviews" || tab == "discography"){
        $('.additional-to-video').css("display", "flex");
    }else{
        $('.additional-to-video').css("display", "none");  
    }
    if(tab == "feed"){
        loadFeed();
    }
    if(vCategory == "feed"){
        updateCurrentPage();
    }
    vCategory = tab;
    $(".search-field").val("");
    $(".video-element").css("display", "block");
}
function searchArtistVideos(tab){
    // Declare variables
    var input, filter, li, i, txtValue;
    input = document.getElementById(tab+'-search-input');console.log(tab+'-search-input');
    filter = input.value.toUpperCase();
    li = document.querySelectorAll('.'+tab+' .video-element');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].getAttribute("data-video-name");
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "block";
      } else {
        li[i].style.display = "none";
      }
    }
}
function refreshPool(url=""){
    var pool_url = location.href;
    if(url != ""){
        pool_url = url;
    }
    $('#page_content').load(pool_url+"?type=ajax",{
        search: $("#pool-video-search").val(),
        gender: $("#pool-gender").val(),
        label: $("#pool-label").val(),
        group_type: $("#pool-group_type").val(),
        age_category: $("#pool-age_category").val(),
    }, function (responce, status, xhr){
        if (status == "error") {
            console.log(xhr.status);
            console.log(xhr.statusText);
            console.log(responce);
          }
        if(responce == "reload"){
            location.reload();
        }else{
            if(url != ""){
                window.history.pushState("", "", url);
            }
            
            document.title = "Ersy.com | "+document.getElementById("loaded-page-title").getAttribute("data-title");
            window.scrollTo(0, 0);
        }
    });
    return false;
}
function updatePersonalInfos(){
    var xhttp = new XMLHttpRequest();
    var params = new FormData();
    params.append('first-name',document.getElementById('first-name').value);
    params.append('last-name',document.getElementById('last-name').value);
    params.append('email',document.getElementById('email-address').value);
    params.append('phone',document.getElementById('my-phone').value);
    xhttp.open('POST', '/api/update-personal-infos', true);
    xhttp.onreadystatechange = (responce) => {
        if(responce.target.readyState == 4 && responce.target.status == 200){
            if(responce.target.response == "ok"){
                getUserButton();
                alert("Personal informations updated!");
            }
        }else{
            console.log(responce.target.response);
        }
    }
    xhttp.send(params);
    return false;
}
function updatePassword(){
    var new_password = document.getElementById('new-password').value;
    var confirm_password = document.getElementById('confirm-password').value;
    if(new_password.length < 6){
        alert("Password too short");
    }else if(new_password != confirm_password){
        alert("password are different");
    }else{
        var xhttp = new XMLHttpRequest();
        var params = new FormData();
        params.append('password',new_password);
        xhttp.open('POST', '/api/update-password', true);
        xhttp.onreadystatechange = (responce) => {
            if(responce.target.readyState == 4 && responce.target.status == 200){
                if(responce.target.response == "ok"){
                    alert("Password updated!");
                }
            }else{
                console.log(responce.target.response);
            }
        }
        xhttp.send(params);
    }
    return false;
}
function getUserButton(){
    $('#login-header').load("/get-user-button");
}
function reloadHits(){
    $('#hits-videos')
    .load(
        "/get-hits-videos",
        {
            pop:document.getElementById("check-pop").checked,
            rock:document.getElementById("check-rock").checked,
            rhytm:document.getElementById("check-rhytm").checked,
            soul:document.getElementById("check-soul").checked,
            hip_hop:document.getElementById("check-hip_hop").checked,
            reggae:document.getElementById("check-reggae").checked,
            contry:document.getElementById("check-contry").checked,
            folk:document.getElementById("check-folk").checked,
            jazz:document.getElementById("check-jazz").checked,
            eastern:document.getElementById("check-eastern").checked,
            disco:document.getElementById("check-disco").checked,
            classical:document.getElementById("check-classical").checked,
            electronic:document.getElementById("check-electronic").checked,
            children:document.getElementById("check-children").checked,
            vocal:document.getElementById("check-vocal").checked,
            christian:document.getElementById("check-christian").checked,
            ska:document.getElementById("check-ska").checked,
            traditional:document.getElementById("check-traditional").checked
        },
        function (response){
            //console.log(response);
        }
    );
}
function reloadExplore(){ 
    $('#explore-artists')
    .load(
        "/get-explore-artists",
        {
            pop:document.getElementById("check-pop").checked,
            rock:document.getElementById("check-rock").checked,
            rhytm:document.getElementById("check-rhytm").checked,
            soul:document.getElementById("check-soul").checked,
            hip_hop:document.getElementById("check-hip_hop").checked,
            reggae:document.getElementById("check-reggae").checked,
            contry:document.getElementById("check-contry").checked,
            folk:document.getElementById("check-folk").checked,
            jazz:document.getElementById("check-jazz").checked,
            eastern:document.getElementById("check-eastern").checked,
            disco:document.getElementById("check-disco").checked,
            classical:document.getElementById("check-classical").checked,
            electronic:document.getElementById("check-electronic").checked,
            children:document.getElementById("check-children").checked,
            vocal:document.getElementById("check-vocal").checked,
            christian:document.getElementById("check-christian").checked,
            ska:document.getElementById("check-ska").checked,
            traditional:document.getElementById("check-traditional").checked
        },
        function (response){
            //console.log(response);
        }
    );
}
function resetFilters(){
    document.getElementById("check-pop").checked = false;
    document.getElementById("check-rock").checked = false;
    document.getElementById("check-rhytm").checked = false;
    document.getElementById("check-soul").checked = false;
    document.getElementById("check-hip_hop").checked = false;
    document.getElementById("check-reggae").checked = false;
    document.getElementById("check-contry").checked = false;
    document.getElementById("check-folk").checked = false;
    document.getElementById("check-jazz").checked = false;
    document.getElementById("check-eastern").checked = false;
    document.getElementById("check-disco").checked = false;
    document.getElementById("check-classical").checked = false;
    document.getElementById("check-electronic").checked = false;
    document.getElementById("check-children").checked = false;
    document.getElementById("check-vocal").checked = false;
    document.getElementById("check-christian").checked = false;
    document.getElementById("check-ska").checked = false;
    document.getElementById("check-traditional").checked = false;
}