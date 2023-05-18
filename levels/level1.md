---
layout: default
description: Use JavaScript without external libararies to animate Yoshi moving across screen, OOP style.
image: /images/level1.png
categories: []
tags: [javascript]
---

<div id="level1" style="width: 450px; height: 252px; background-image: url('images/level1.png');"></div>

<script>

    const spriteWidth = 450; // Width of each frame in pixels
    const spriteHeight = 252; // Height of each frame in pixels
    const numFrames = 2; // Total number of frames in the sprite sheet

    let currentFrame = 0; // Variable to track the current frame index
    let intervalId;

    function updateFrame() {
        // Increment the frame index
        currentFrame = (currentFrame + 1) % numFrames;
        
        // Calculate the position of the current frame in the sprite sheet
        const xPos = currentFrame * spriteWidth;
    
        // Display the frame by adjusting the background position
        const spriteElement = document.getElementById('level1');
        spriteElement.style.backgroundPosition = `-${xPos}px 0`;
    }

    function handleKeyPress(event) {

    if (event.key === 'ArrowDown') {
        clearInterval(intervalId);
    }
    else { 
        let intervalTime;
        if (event.key === 'ArrowRight') {
            
            intervalTime = 150; // 200ms = 5 frames per second
        }
        clearInterval(intervalId);
        intervalId = setInterval(updateFrame, intervalTime);
    }

    
  // Start the animation by calling updateFrame with the corresponding interval time
  
}

</script>