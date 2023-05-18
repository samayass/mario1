---
title: Yoshi in Motion OOP 
comments: true
layout: default
description: Use JavaScript without external libararies to animate Yoshi moving across screen, OOP style.
permalink: /yoshi2
image: /images/yoshi.png
categories: []
tags: [javascript]
---

<div id="yoshi1" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi2" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi3" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi4" style="width: 29px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi5" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi6" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi7" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>
<div id="yoshi8" style="width: 27px; height: 30px; background-image: url('images/yoshi.png');"></div>

<script>

    const spriteWidth = 25; // Width of each frame in pixels
    const spriteHeight = 35; // Height of each frame in pixels
    const numFrames = 5; // Total number of frames in the sprite sheet

    let currentFrame = 0; // Variable to track the current frame index

    function updateFrame() {
        // Increment the frame index
        currentFrame = (currentFrame + 1) % numFrames;
        
        // Calculate the position of the current frame in the sprite sheet
        const xPos = currentFrame * spriteWidth;
    
        // Display the frame by adjusting the background position
        const spriteElement = document.getElementById('yoshi1');
        spriteElement.style.backgroundPosition = `-${xPos}px 0`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate
    setInterval(updateFrame, 150); // 100ms = 10 frames per second

    const spriteWidth2 = 25; // Width of each frame in pixels
    const spriteHeight2 = 35; // Height of each frame in pixels
    const numFrames2 = 4; // Total number of frames in the sprite sheet

    let currentFrame2 = 0; // Variable to track the current frame index

    function updateFrame2() {
        // Increment the frame index
        currentFrame2 = (currentFrame2 + 1) % numFrames2;
    
        // Calculate the position of the current frame in the sprite sheet
        const xPos2 = currentFrame2 * spriteWidth2;
    
        // Display the frame by adjusting the background position
        const spriteElement2 = document.getElementById('yoshi2');
        spriteElement2.style.backgroundPosition = `-${xPos2}px -30px`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate
    setInterval(updateFrame2, 300); // 100ms = 10 frames per second

    const spriteWidth3 = 26; // Width of each frame in pixels
    const spriteHeight3 = 35; // Height of each frame in pixels
    const numFrames3 = 4; // Total number of frames in the sprite sheet

    let currentFrame3 = 0; // Variable to track the current frame index

    function updateFrame3() {
    // Increment the frame index
    currentFrame3 = (currentFrame3 + 1) % numFrames3;
  
    // Calculate the position of the current frame in the sprite sheet
    const xPos3 = currentFrame3 * spriteWidth3;
  
    // Display the frame by adjusting the background position
    const spriteElement3 = document.getElementById('yoshi3');
    spriteElement3.style.backgroundPosition = `-${xPos3}px -60px`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate
    setInterval(updateFrame3, 200); // 100ms = 10 frames per second

    const spriteWidth4 = 28; // Width of each frame in pixels
    const spriteHeight4 = 35; // Height of each frame in pixels
    const numFrames4 = 4; // Total number of frames in the sprite sheet

    let currentFrame4 = 0; // Variable to track the current frame index

    function updateFrame4() {
    // Increment the frame index
    currentFrame4 = (currentFrame4 + 1) % numFrames4;
  
    // Calculate the position of the current frame in the sprite sheet
    const xPos4 = currentFrame4 * spriteWidth4;
  
    // Display the frame by adjusting the background position
    const spriteElement4 = document.getElementById('yoshi4');
    spriteElement4.style.backgroundPosition = `-${xPos4}px -90px`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate
    setInterval(updateFrame4, 300); // 100ms = 10 frames per second

</script>