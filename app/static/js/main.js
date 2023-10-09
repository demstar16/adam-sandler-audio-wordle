audioData = [
    ['https://www.youtube.com/embed/SXIqrkwtD-U?enablejsapi=1', 'Mr Deeds'],
    ['https://www.youtube.com/embed/Nfrk2UdEOcQ?enablejsapi=1', 'The Wedding Singer'],
    ['https://www.youtube.com/embed/oNCiH8DOmhI?enablejsapi=1', '50 First Dates'],
    ['https://www.youtube.com/embed/WeDHZWS5uMo?enablejsapi=1', 'Anger Management'],
    ['https://www.youtube.com/embed/NdGB1rnPcR0?enablejsapi=1', `Don't Mess with the Zohan`],
    [`https://www.youtube.com/embed/af1gSplQfPU?enablejsapi=1`, 'Grown Ups 2'],
    ['https://www.youtube.com/embed/dVFDYCPO19A?enablejsapi=1', 'Click'],
    ['https://www.youtube.com/embed/3LAnmnS0-9g?enablejsapi=1', 'Happy Gilmore'],
    ['https://www.youtube.com/embed/OOwpXT0J-yA?enablejsapi=1', 'Happy Gilmore'],
    ['https://www.youtube.com/embed/DBbDoc0ystk?enablejsapi=1', 'Hubie Halloween'],
    ['https://www.youtube.com/embed/es3FstgZng8?enablejsapi=1', 'Grown Ups'],
    ['https://www.youtube.com/embed/GHZSYBkKec4?enablejsapi=1', 'Grown Ups'],
    ['https://www.youtube.com/embed/MV4zHRnIUpU?enablejsapi=1', 'Anger Management'],
    ['https://www.youtube.com/embed/LqXS0XYHB-Y?enablejsapi=1', 'The Wedding Singer'],
];

movies = [
    `Don't Mess with the Zohan`,
    `50 First Dates`,
    `Anger Management`,
    `Mr Deeds`,
    `The Wedding Singer`,
    `Grown Ups`,
    `Grown Ups 2`,
    `Click`,
    `Happy Gilmore`,
    `Hubie Halloween`
];

let rawIndex = Math.random() * (audioData.length - 1); // Random number between 0 - (Length of Array - 1)
let index = Math.floor(rawIndex);
let guesses = 0;
let gameover = false;
let points = 0;
// global variable for the player
var player;

let guessAudio = document.getElementById('youtube-container');
let iframe = document.createElement('iframe');
iframe.id = 'video';
iframe.style.display = 'none';
iframe.frameborder = 0;
iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
iframe.allowfullscreen = true;
iframe.src = audioData[index][0];
guessAudio.appendChild(iframe)

// Populate the dropdown menu for all the movies
let dropdown = document.getElementById('dropdown');

movies.forEach(function(item){
    let option = document.createElement('option');
    option.innerText = item;
    dropdown.appendChild(option);
})

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    player = new YT.Player('video', {
        events: {
            // call this function when player is ready to use
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // bind events
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        player.playVideo();
    });

    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function() {
        player.pauseVideo();
    });
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function submit() 
{
    
    guesses += 1;
    
    // get the index of the selected option
    let selectedIndex = dropdown.selectedIndex;
    // get a selected option and text value using the text property
    let selectedValue = dropdown.options[selectedIndex].text;
    
    let result = document.getElementById('result');
    result.innerHTML = null;
    let p = document.createElement('p');
    let text;

    if (gameover) 
    {
        text = "You're done for the day... come back tomorrow"
    }
    else if (selectedValue == audioData[index][1]) 
    {
        gameover = true;
        if (guesses == 1)
        {
            points = 1000;
        }
        else if ( guesses == 2)
        {
            points = 500;
        }
        else if (guesses == 3)
        {
            points = 250;
        }
        console.log(points)
        text = '<p>You`re RIGHT! Gotta respect that!<br>You earned <b>' + points + '</b> points.</p>';
    }
    else
    {
        if (guesses == 3) 
        {
            gameover = true;
            text = '<p>That`s GAMEOVER for today</p>';
        }
        else 
        {
            text = '<p>Try Again Pal</p>';
        }
    }
    p.innerHTML = text;
    result.appendChild(p);
    player.pauseVideo();
}