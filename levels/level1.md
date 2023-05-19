---
layout: default
description: Use JavaScript without external libraries to animate Yoshi moving across screen, OOP style.
image: /images/level1.png
categories: []
tags: [javascript]
---

<div id="level1" style="width: 900px; height: 252px; background-image: url('images/level1.png');"></div>
<div id="yoshi5" style="width: 29px; height: 30px; background-image: url('images/yoshi.png'); "></div>


<style>
    #yoshi5 {
        position: absolute;
        top: 658px;
        left: 670px;
        width: 200px;
        height: 200px;
        z-index: 1; /* Adjust the z-index to control the stacking order */
    }

    #level1 {
        position: absolute;
        top: 450px;
        left: 400px;
        width: 200px;
        height: 200px;
        z-index: 1; /* Adjust the z-index to control the stacking order */
    }
</style>

<script>

    const spriteWidth = 1; // Width of each frame in pixels
    const spriteHeight = 252; // Height of each frame in pixels
    const numFrames = 10000; // Total number of frames in the sprite sheet

    let currentFrame = 0; // Variable to track the current frame index

    function updateFrame() {
        // Increment the frame index
        currentFrame = (currentFrame + 1) % numFrames;
        
        // Calculate the position of the current frame in the sprite sheet
        const xPos = currentFrame * spriteWidth;
        
        // Display the frame by adjusting the background position
        const spriteElement = document.getElementById('level1');
        spriteElement.style.backgroundPosition = `-${xPos}px 0`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate
    setInterval(updateFrame, 10); // 100ms = 10 frames per second

    
  // Start the animation by calling updateFrame with the corresponding interval time
  
    const spriteWidth5 = 28; // Width of each frame in pixels
    const spriteHeight5 = 35; // Height of each frame in pixels
    const numFrames5 = 4; // Total number of frames in the sprite sheet

    let currentFrame5 = 0; // Variable to track the current frame index

    function updateFrame5() {
        // Increment the frame index
        currentFrame5 = (currentFrame5 + 1) % numFrames5;
    
        // Calculate the position of the current frame in the sprite sheet
        const xPos5 = currentFrame5 * spriteWidth5 + 29;

        // Display the frame by adjusting the background position
        const spriteElement5 = document.getElementById('yoshi5');
        spriteElement5.style.backgroundPosition = `-${xPos5}px -120px`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate
    setInterval(updateFrame5, 200); // 100ms = 10 frames per second

</script>