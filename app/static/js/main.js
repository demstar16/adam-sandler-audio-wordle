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
    ['https://www.youtube.com/embed/7I2-14y6-jMenablejsapi=1', 'The Waterboy'],
    ['https://www.youtube.com/embed/JjJSk9tmduAenablejsapi=1', 'The Waterboy'],
    ['https://www.youtube.com/embed/0J0F3hqZZyEenablejsapi=1', 'The Longest Yard'],
    ['https://www.youtube.com/embed/yRp_Qx3CjR0enablejsapi=1', 'The Longest Yard'],
    ['https://www.youtube.com/embed/pc_TH7-HfYIenablejsapi=1', 'The Longest Yard'],
    ['https://www.youtube.com/embed/qmzxR0zfIN0enablejsapi=1', 'I Now Pronounce You Chuck & Larry'],
    ['https://www.youtube.com/embed/pIgTnfJEfr0enablejsapi=1', 'I Now Pronounce You Chuck & Larry'],
    ['https://www.youtube.com/embed/_Y8lpIzstdUenablejsapi=1', 'I Now Pronounce You Chuck & Larry'],
    ['https://www.youtube.com/embed/RX09g003p5cenablejsapi=1', 'Little Nicky'],
    ['https://www.youtube.com/embed/Bq-Bas9zeNMenablejsapi=1', 'Jack and Jill'],
    ['https://www.youtube.com/embed/fcH0Uxyu1KMenablejsapi=1', 'Jack and Jill'],
    ['https://www.youtube.com/embed/zbXT6NPKWgwenablejsapi=1', 'Bedtime Stories'],
    ['https://www.youtube.com/embed/c6xQI6sddX0enablejsapi=1', 'That`s My Boy'],
    ['https://www.youtube.com/embed/6t-ljfykXzMenablejsapi=1', 'That`s My Boy'],
    ['https://www.youtube.com/embed/_-ea8diZ5M8enablejsapi=1', 'That`s My Boy'],
    ['https://www.youtube.com/embed/ykBG9mW1yC4enablejsapi=1', 'That`s My Boy'],
    ['https://www.youtube.com/embed/xrT1QYVVD8kenablejsapi=1', 'Blended'],
    ['https://www.youtube.com/embed/6OutSzM_eC8enablejsapi=1', 'Blended'],
    ['https://www.youtube.com/embed/S__SZwFn0Rwenablejsapi=1', '50 First Dates'],
    
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
    `Hubie Halloween`,
    'The Waterboy',
    'The Longest Yard',
    'I Now Pronounce You Chuck & Larry',
    'Little Nicky',
    'Jack and Jill',
    'Pixels',
    'Bedtime Stories',
    'That`s My Boy',
    'Blended'
];

let indexDiv = document.getElementById('index');
let index = indexDiv.getAttribute("index");
console.log(index)
let guesses = 0;
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
    let date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
    guesses += 1;
    // audio for button click
    let sound = document.getElementById('myAudio');

    // get the index of the selected option
    let selectedIndex = dropdown.selectedIndex;
    // get a selected option and text value using the text property
    let selectedValue = dropdown.options[selectedIndex].text;
    
    let result = document.getElementById('result');
    result.innerHTML = null;
    let p = document.createElement('p');
    let text;

    console.log(played_today)
    if (played_today) 
    {
        sound.src = "static/audio/done.mp3";
        text = "You're done for the day... come back tomorrow"
    }
    else if (selectedValue == audioData[index][1]) 
    {
        if (guesses == 1)
        {
            points = 100;
        }
        else if ( guesses == 2)
        {
            points = 50;
        }
        else if (guesses == 3)
        {
            points = 25;
        }
        sound.src = "static/audio/win.mp3";
        text = '<p>You`re RIGHT! Gotta respect that!<br>You earned <b>' + points + '</b> points.</p>';
        localStorage.setItem("last_game", date);
        sendStats(points);
    }
    else
    {
        if (guesses == 3) 
        {
            sound.src = "static/audio/loss.mp3";
            text = '<p>That`s GAMEOVER for today</p>';
            localStorage.setItem("last_game", date);
            sendStats(points);
        }
        else 
        {
            sound.src = "static/audio/try-again.mp3";
            text = '<p>Try Again Pal</p>';
        }
    }
    p.innerHTML = text;
    result.appendChild(p);
    player.pauseVideo();
    sound.load();
    sound.play();
}

function sendStats(points) {
    gameover = true;
    let request = new XMLHttpRequest();
    request.open(
        "GET",
        "/api/submitstats?user_id=" +
        user_id +
        "&points=" +
        points
        );
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                console.log(JSON.parse(request.response));
            } else {
                console.log("Error: " + request.status + " " + request.statusText);
            }
        };
    }
    
    function setUsername() {
    let username = prompt("Type your new username: ")
    if (username != null || username != "") {        
        let request = new XMLHttpRequest();
        request.open(
            "GET",
            "/api/setusername?user_id=" +
            user_id +
            "&username=" +
            username
        );
        request.send();
        request.onload = () => {
          if (request.status === 200) {
            console.log(JSON.parse(request.response));
          } else {
            console.log("Error: " + request.status + " " + request.statusText);
          }
        }; 
    }
  }

function checkSubmissions(){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(
          "GET",
          "/api/checksubmissions?user_id=" + user_id
        );
        request.send();
        request.onload = () => {
          if (request.status === 200) {
            console.log(request.response);
            if (request.response == 'True') {
              resolve(true); // Resolve the Promise with true
            } else {
              resolve(false); // Resolve the Promise with false
            }
          } else {
            console.error("Error: " + request.status + " " + request.statusText);
            reject("Error: " + request.status + " " + request.statusText); // Reject the Promise in case of an error
          }
        };
      });
    }