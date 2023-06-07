---
title: Mario Coin Animate
comments: true
layout: default
description: Animating Mario games with starts of interacting objects
permalink: /js
image: /levels/images/mario_animation.png
image2: /images/coin.png
categories: []
tags: [javascript]
---

{% include home.html %}

<br>

<head>
  <title>Sprite Animation</title>
  <style>
    .coin {
      width: 200px; /* how wide one frame of the sprite is */
      height: 250px; /* how tall sprite is */
      position: absolute;
      background: url(/images/coin.png) 0 0;
    }
  </style>
</head>
<body>
  <h1>Sprite Animation</h1>

  <button id="spawnButton">Spawn Coin</button>
  <audio src="/sounds/coin.mp3" id="my-audio"></audio>

  <script>
    document.getElementById('spawnButton').addEventListener('click', function() {
      var coin = document.createElement('div');
      var sound = new Audio('../sounds/coin.mp3')
      coin.classList.add('coin');

      // Generate random position on the page
      var posX = Math.random() * (window.innerWidth - 50); // gen y pos
      var posY = Math.random() * (window.innerHeight - 50); // gen x pos

      coin.style.left = posX + 'px';
      coin.style.top = posY + 'px';

      document.body.appendChild(coin);
      sound.play();

      var frameIndex = 0;
      var frameWidth = 200; // increment between the frames using this
      var numFrames = 12;
      var interval = 100; // Time between each frame (in milliseconds)
      

      var animationInterval = setInterval(function() {
        coin.style.backgroundPositionX = -frameIndex * frameWidth + 'px'; // moves the sprite sheet to the right by incrementing the image by how long each frame is in pixels
        frameIndex++; // increment

        if (frameIndex >= numFrames) {
          clearInterval(animationInterval);
          document.body.removeChild(coin);
        }
      }, interval);
    });
  </script>
</body>
<!-- 
<head>
  <title>User Input Form</title>
</head>
<body>
  <h1>User Input Form</h1>

  <form id="userForm">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>

    <label for="hours">Hours:</label>
    <input type="number" id="hours" name="hours" required><br>

    <label for="work">Work:</label>
    <input type="text" id="work" name="work" required><br>

    <input type="submit" value="Submit">
  </form>

  <h2>Submitted Data</h2>

  <table id="dataTable" border="1">
    <tr>
      <th>Name</th>
      <th>Hours</th>
      <th>Work</th>
    </tr>
  </table>

  <script>
    var submittedData = []; // store data locally (NOT DATABASE)

    // adds data to table
    function addDataToTable(data) {
      var table = document.getElementById('dataTable');
      var row = table.insertRow();

      var nameCell = row.insertCell();
      nameCell.innerHTML = data.name;

      var hoursCell = row.insertCell();
      hoursCell.innerHTML = data.hours;

      var workCell = row.insertCell();
      workCell.innerHTML = data.work;
    }

    // updates
    function updateTable() {
      var table = document.getElementById('dataTable');
      table.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Work</th>
        </tr>
      `;

      submittedData.forEach(function(data) {
        addDataToTable(data);
      });
    }

    // on click, submits the form and creates a new row
    document.getElementById('userForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting

      // getter
      var name = document.getElementById('name').value;
      var hours = document.getElementById('hours').value;
      var work = document.getElementById('work').value;

      // setter
      var formData = {
        name: name,
        hours: hours,
        work: work
      };

      // pushes data to table
      submittedData.push(formData);

      // adds to the table
      addDataToTable(formData);

      // makes form submittable again
      document.getElementById('userForm').reset();
    });

    // Initially populate the table with existing data (if any)
updateTable();
  </script>
</body> -->
