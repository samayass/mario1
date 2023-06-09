---
layout: default
description: Use JavaScript without external libraries to animate Yoshi moving across screen, OOP style.
image: /images/level1.png
categories: []
tags: [javascript]
---

<div id="level1" style="width: 900px; height: 252px; background-image: url('images/level1.png');"></div>
<div id="yoshi5" style="width: 29px; height: 30px; background-image: url('images/yoshi.png'); "></div>
<div id="block">
    <img src="images/mario_block.png" alt="My Image">
</div>

<style>
    #yoshi5 {
        position: absolute;
        top: 658px;
        left: 620px;
        width: 200px;
        height: 200px;
        z-index: 1; /* Adjust the z-index to control the stacking order */
        transition: top 1.5s ease;
    }

    #level1 {
        position: absolute;
        top: 450px;
        left: 400px;
        width: 200px;
        height: 200px;
        z-index: 1; /* Adjust the z-index to control the stacking order */
    }
    #block {
        position: absolute;
        top: 650px;
        left: 900px;
        width: 17px;
        height: 17px;
        z-index: 1; /* Adjust the z-index to control the stacking order */
    }

    #block img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
</style>

<script>

    const spriteWidth = 1; // Width of each frame in pixels
    const spriteHeight = 252; // Height of each frame in pixels
    const numFrames = 10000; // Total number of frames in the sprite sheet

    let currentFrame = 0; // Variable to track the current frame index

    function updateFrame() {
        // Increment the frame index
        
        currentFrame = (currentFrame + 5) % numFrames;
        
        // Calculate the position of the current frame in the sprite sheet
        const xPos = currentFrame * spriteWidth;
        
        // Display the frame by adjusting the background position
        const spriteElement = document.getElementById('level1');
        spriteElement.style.backgroundPosition = `-${xPos}px 0`;
    }

    // Call the updateFrame function repeatedly at a desired frame rate

    // setInterval(updateFrame, 10); // 100ms = 10 frames per second
    
    
  // Start the animation by calling updateFrame with the corresponding interval time
  
    const spriteWidth5 = 28; // Width of each frame in pixels
    const spriteHeight5 = 35; // Height of each frame in pixels
    const numFrames5 = 4; // Total number of frames in the sprite sheet

    const blockElement = document.getElementById('block');
    let blockLeft = 900;
    const blockStepSize = 5;

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
    
    const imageElement = document.getElementById('yoshi5');
    let currentTop = 658;
    let currentLeft = 620;
    const stepSize = 5; // Adjust the step size according to your desired movement speed
    

    function jump() {
        const jumpHeight = 75; // Adjust the jump height as desired
        const jumpDuration = 400; // Adjust the jump duration as desired

        imageElement.style.transition = `transform ${jumpDuration}ms`;
        imageElement.style.transform = `translateY(-${jumpHeight}px)`;

        setTimeout(() => {
            imageElement.style.transform = 'translateY(0)';
            setTimeout(() => {
                imageElement.style.transition = '';
            }, jumpDuration);
        }, jumpDuration);
    }

    function areElementsColliding(yoshi5, block) {
        const rect1 = yoshi5.getBoundingClientRect();
        const rect2 = block.getBoundingClientRect();

        return (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        );
    }

    const yoshi5 = document.getElementById('yoshi5');
    const block = document.getElementById('block');

    function handleCollision() {
        // Code to be executed when elements collide
        yoshi5.style.top = '625px';
    }

    function checkCollision() {
            if (areElementsColliding(yoshi5, block)) {
                // Start the timeout and store the timeout ID
                const timeoutId = setTimeout(jump, 0); // Replace `myFunction` with your actual function and adjust the timeout duration as needed

                // Stop the function midway by clearing the timeout
                clearTimeout(timeoutId);

                handleCollision();
            }
    }

    // Call the checkCollision function repeatedly to detect collisions
    setInterval(checkCollision, 100); // Adjust the interval as needed

    function handleKeyPress(event) {
    if (event.key === ' ') {
        jump();
    } else if (event.key === 'ArrowLeft') {
        blockLeft += blockStepSize;
        currentLeft -= stepSize;
    } else if (event.key === 'ArrowRight') {
        updateFrame();
        blockLeft -= blockStepSize;
        
        currentLeft += stepSize;
    }

    blockElement.style.transition = 'left 0.3s';
    blockElement.style.left = blockLeft + 'px';
    imageElement.style.transition = 'left 0.1s'; // Set the transition duration and properties
    imageElement.style.top = currentTop + 'px';
    imageElement.style.left = currentLeft + 'px';
    }

    document.addEventListener('keydown', handleKeyPress);
    

</script>