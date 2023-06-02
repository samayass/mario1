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

  <script>
    document.getElementById('spawnButton').addEventListener('click', function() {
      var coin = document.createElement('div');
      var sound = new Audio('/sounds/coin.mp3');
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
