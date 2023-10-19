/*
Author: Zach Manson

This file is not my code.
*/

var user_id;
var played_today;

/**
 * Checks if user_id exists already, creates one if not
 */
function checkUserCookie() {
  user_id = localStorage.getItem("user_id");
  if (user_id !== null) {
    console.log("Welcome back! Your user_id is: " + user_id);
  } else {
    createUserID();
  }
}

function checkTodaySubmission() {
  let today = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  console.log(today)
  console.log(localStorage.getItem("last_game"))
  if (localStorage.getItem("last_game") == today)
  {
    played_today = true;
  }
  else 
  {
    played_today = false;
  }
}

/**
 * Generates a random UUID and stores it in webstorage
 */
function createUserID() {
  let uuid = Date.now().toString() + Math.random().toString(); //self.crypto.randomUUID();// crypto only works with SSL
  saveUserID(uuid);
}

function saveUserID(uuid) {
  if (uuid.match(/^\d+\.\d+$/)) {
    localStorage["user_id"] = uuid;
    console.log("Generated new user_id: " + localStorage["user_id"]);
    user_id = localStorage["user_id"];
  }
}

function changeID() {
  let newID = window.prompt("Enter new ID", "");
  if (newID) {
    saveUserID(newID);
  }
}

/**
 * On document load, looks to call checkUserCookie() function to check to see if
 * user_id exists
 */
document.addEventListener("DOMContentLoaded", () => {
  checkUserCookie();
  checkTodaySubmission();
  let leaderboardbutton = document.getElementById("leaderboard-button");
  leaderboardbutton.onclick = () => {
    location.href = "/leaderboard/" + user_id;
  };
});


