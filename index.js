const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");

function getUserInput() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the GitHub username of the Developer you're searching for:",
        name: "username"
      },
      {
        type: "list",
        message: "Pick a color",
        name: "color",
        choices: [
          "green",
          "blue",
          "pink",
          "red"
        ]
      }
    ])
};

function init() {
  // this is where the inquirer answers are recorded
  getUserInput().then(userInput => {
    // only sending the username into the getGtiHubUserInfo function
    getGitHubUserInfo(userInput.username, userInput.color)

  })
};

function getGitHubUserInfo(username, color) {
  const queryUrl = `https://api.github.com/users/${username}`;

  axios.get(queryUrl).then(result => {

    var data = {
      apiResults: result,
      color: color
    }

    let userData = generateHTML(data)

    fs.writeFile("devProfile.html", userData, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Success!");

    })
  })
};

init();

