---
title: Mario Game with Background and Coins
comments: true
layout: default
description: Animating Mario games with starts of interacting objects
permalink: /mario4
image: /levels/images/mario_animation.png
image2: /images/coin.png
categories: []
tags: [javascript]
---

{% include home.html %}

{% assign sprite_file = site.baseurl | append: page.image %}  <!--- Liquid concatentation --->
{% assign hash = site.data.mario_metadata %}  <!--- Liquid list variable created from file containing mario metadata for sprite --->
{% assign pixels = 256 %} <!--- Liquid integer assignment --->

{% assign sprite_file1 = site.baseurl | append: page.image2 %}  <!--- Liquid concatentation --->
{% assign hash1 = site.data.coin_metadata %}  <!--- Liquid list variable created from file containing mario metadata for sprite --->
{% assign pixels1 = 200 %} <!--- Liquid integer assignment --->

{% assign sprite_file1 = site.baseurl | append: page.image2 %}  <!--- Liquid concatentation --->
{% assign hash2 = site.data.coin_metadata %}  <!--- Liquid list variable created from file containing mario metadata for sprite --->
{% assign pixels1 = 200 %} <!--- Liquid integer assignment --->


<p><!--- Liquid concatentation --->
  <!--- Liquid list variable created from file containing mario metatdata for sprite --->
 <!--- Liquid integer assignment ---></p>

<!--- HTML for page contains <p> tag named "mario" and class properties for a "sprite"  -->
<p id="mario" class="sprite"></p>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<p id="coin" class="sprite1"></p>

<!--- Embedded Cascading Style Sheet (CSS) rules, defines how HTML elements look --->
<style>
  /* CSS style rules for the elements id and class above...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-repeat: no-repeat;
    z-index: 99999;
  }

  .sprite1 {
    height: {{pixels}}px;
    width: {{pixels1}}px;
    background-repeat: no-repeat;
  }

  .sprite2 {
    height: {{pixels}}px;
    width: {{pixels1}}px;
    background-repeat: no-repeat;
  }

  /* background position of sprite element */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}} * -1px);
    background-image: url('{{sprite_file}}');
  }

  /* background position of sprite element */
  #coin {
    background-image: url('{{sprite_file1}}');
    background-position: calc({{animations[0].col}} * {{pixels1}} * -1px) calc({{animations[0].row}} * {{pixels1}} * -1px);
  }

</style>

<!--- Embedded executable code--->
<script>
  ////////// convert yml hash to javascript key value objects /////////

    // Example code to change the slider speed dynamically
  const sliderElement = document.querySelector('.slider');

  function changeSliderSpeed(speed) {
    document.documentElement.style.setProperty('--slider-speed', speed);
  }

  // Call the changeSliderSpeed function with the desired speed value (e.g., '3s', '10s', etc.)
  changeSliderSpeed('3s');

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  var coin_metadata = {}; //key, value object
  {% for key in hash1 %}  
  
  var key = "{{key | first}}"  //key
  var values1 = {} //values object
  values1["row"] = {{key.row}}
  values1["col"] = {{key.col}}
  values1["frames"] = {{key.frames}}
  coin_metadata[key] = values1; //key with values added

  {% endfor %}

   var coin_metadata2 = {}; //key, value object
  {% for key in hash2 %}  
  
  var key = "{{key | first}}"  //key
  var values1 = {} //values object
  values1["row"] = {{key.row}}
  values1["col"] = {{key.col}}
  values1["frames"] = {{key.frames}}
  coin_metadata2[key] = values1; //key with values added

  {% endfor %}

  ////////// animation control object /////////
  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.positionY = 0;  // current position of sprite in Y direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = 256; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 25; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }


    jump() {
      const jumpHeight = 130;  
      const jumpDuration = 350;  
      const groundLevel = 315; 

      this.marioElement.style.transition = `top ${jumpDuration}ms ease`;
      this.marioElement.style.top = `${groundLevel - jumpHeight}px`;

      setTimeout(() => {
        this.marioElement.style.top = `${groundLevel}px`;
      }, jumpDuration);
    }


    animateRight(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;
        if (((this.positionX + (this.pixels/2) - 75) >= (coin.positionX)) && (this.positionX <= coin.positionX)){
          coin.disappear();
        }

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    animateLeft(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX -= speed;
        frame = (frame + 1) % obj.frames;
        if (((this.positionX + (this.pixels/2) - 75) >= (coin.positionX)) && (this.positionX <= coin.positionX)){
          coin.disappear();
        }

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    animateUp(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX -= speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalkingRight() {
      this.stopAnimate();
      this.animateRight(this.obj["Walk"], 5);
    }

    startWalkingLeft() {
      this.stopAnimate();
      this.animateLeft(this.obj["WalkL"], 5);
    }

    startRunningRight() {
      this.stopAnimate();
      this.animateRight(this.obj["Run1"], 10);
    }

    startRunningLeft() {
      this.stopAnimate();
      this.animateLeft(this.obj["Run1L"], 10);
    }

    startPuffing() {
      this.stopAnimate();
      this.animateRight(this.obj["Puff"], 0);
    }

    startPuffingLeft() {
      this.stopAnimate();
      this.animateLeft(this.obj["PuffL"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animateRight(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animateRight(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animateRight(this.obj["Rest"], 0);
    }

    startRestingLeft() {
      this.stopAnimate();
      this.animateRight(this.obj["RestL"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  class Coin {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 100;  // current position of sprite in X direction
      this.positionY = -50;
      this.currentSpeed = 0;
      this.coinElement = document.getElementById("coin"); //HTML element of sprite
      this.pixels = {{pixels1}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.coinElement.style.position = "absolute";
      this.beat = new Audio('/sounds/coin.mp3');
    }

    animate(obj, speed) {
      let frame1 = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame1 + obj.col) * this.pixels;
        this.coinElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.coinElement.style.left = `${this.positionX}px`;
        this.coinElement.style.bottom = `${this.positionY}px`;

        frame1 = (frame1 + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startAnimate() {
      this.stopAnimate();
      this.animate(this.obj["Animate"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }

    coinJump(){
      if(this.positionY <= 0){
        // Play the beat
        this.beat.play();
        this.interval = 10;
        this.positionY += 5;
      }
    }

    disappear(){
      setInterval(this.coinJump(), 10);
      if(this.positionY >= -5){
        this.stopAnimate();
        document.getElementById('coin').style.display = 'none';
      }
    }
  }

  const mario = new Mario(mario_metadata);
  const coin = new Coin(coin_metadata);
  const coin2 = new Coin(coin_metadata);
  const coin3 = new Coin(coin_metadata);

  ////////// event control /////////

  var rightspd = 0;
  var leftspd = 0;
  var direction = "none";

  window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
      event.preventDefault();
      direction = "right";
      if (event.repeat) {
        if (mario.currentSpeed === 3 && rightspd == 1) {
          mario.startRunningRight();
          rightspd = 0;
        }
      } else {
        if (mario.currentSpeed === 0 && leftspd == 0) {
          mario.startRunningRight();
          leftspd = 0;
          rightspd = 1;
        }
      }
    } 
    
    if (event.key === "a") {
      event.preventDefault();
      direction = "left";
      if (event.repeat) {
        if (mario.currentSpeed === 3 && leftspd == 1) {
          mario.startRunningLeft();
          leftspd = 0;
        }
      } else {
        if (mario.currentSpeed === 0 && rightspd == 0) {
          mario.startRunningLeft();
          rightspd = 0;
          leftspd = 1;
        }
      }
    } 

    if (event.key === " ") {
      event.preventDefault();
      mario.jump();
    }

    if (event.key === "s") {
      event.preventDefault();
      rightspd = 0;
      leftspd = 0;
      if (event.repeat) {
        mario.startFlipping();
      } else if (direction == "right"){
        mario.startPuffing();
      } else if (direction == "left"){
        mario.startPuffingLeft();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      event.preventDefault();
      direction = "right";
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0 && leftspd == 0) {
          mario.startWalkingRight();
          leftspd = 0;
          rightspd = 1;
        } else if (mario.currentSpeed === 5 && rightspd == 1) {
          mario.startRunningRight();
          rightspd = 0;
        }
      }
    }

    if (event.touches[0].clientY < window.innerHeight / 2) {
      event.preventDefault();
      mario.jump();
    }
    
    if (event.touches[0].clientX < window.innerWidth / 2) {
      event.preventDefault();
      direction = "left";
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0 && rightspd == 0) {
          mario.startWalkingLeft();
          rightspd = 0;
          leftspd = 1;
        } else if (mario.currentSpeed === 5 && leftspd == 1) {
          mario.startRunningLeft();
          leftspd = 0;
        }
      }
    }

    if (event.touches[0].clientY < window.innerHeight / 2) {
      event.preventDefault();
      rightspd = 0;
      leftspd = 0;
      if (event.repeat) {
        mario.stopAnimate();
      } else if (direction == "right"){
        mario.startPuffing();
      } else if (direction == "left"){
        mario.startPuffingLeft();
      }
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  /*
  window.addEventListener("focus", () => {
     mario.stopAnimate();
     rightspd = 0;
     leftspd = 0;
     direction = "none";
     mario.startFlipping();
  });
  */

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    const sprite1 = document.querySelector(".sprite1");
    const sprite2 = document.querySelector(".sprite2");
    sprite.style.transform = `scale(${0.2 * scale})`;
    sprite1.style.transform = `scale(${0.1 * scale})`;
    mario.startResting();
    coin.startAnimate();
    coin2.startAnimate();
    coin3.startAnimate();
  });

</script>







<!-- # layout: default
# permalink: /cars/
# title: 
# search_exclude: false
# toc: false
# categories: [] -->


<html>
<body>


<!-- <img src="images/Bricks.png" alt="bricks" width="500" height="333"> -->
<!-- The image has scrolling behavior to left -->
<!-- <marquee  behavior="scroll" direction="right">        
     
        <img 
        
        src="images/Bricks.png" 
        alt="bricks2">
</marquee> -->
<!-- <img 
        id = "bush1"
        src="images/Bush.png"
        alt="bush1">          -->

</body>
</html>


<html>
<head>
    <style>
    {

      :root {
        --slider-speed: 5s; /* Default speed, adjust as needed */
      }

      .slider {
        overflow: hidden; /* Ensures the image is contained within the slider */
      }

      .slider img {
        width: 100%; /* Adjust the width as needed */
        height: auto; /* Adjust the height as needed */
        position: relative;
        animation: slide var(--slider-speed) linear infinite; /* Use CSS variable for animation duration */
      }

      @keyframes slide {
        0% {
          left: 0;
        }
        100% {
          left: calc(100% - 100px); /* Adjust the sliding distance as needed */
        }
      }
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        }
        /* :root{
        --color-car-body:#f06043;
        --color-bg-1:#e4ffff;
        } */
        html{
        height: 100%;
        }
        body{
        background-image: linear-gradient(to top,#1faa31 30%,#4e4ce6 20%);
        overflow: hidden;
        }
        #animate {
        width: 50px;
        height: 50px;
        position: absolute;
        background-color: red;
        }

        #bricks3 {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 800px;
            height: 200px;
        }
        #bricks4 {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 800px;
            height: 200px;
        }
        #bush1 {
          position: absolute;
          bottom: 210px;
          left: 500px;
          width: 152px;
          height: 121px:
        } 


        .cloud{
        position: absolute;
        top: var(--top);
        left: 0;
        width: 20vmin;
        height: 13vmin;
        border-radius: 10vmin 10vmin 0 6vmin;
        background-color: #b5edf9;
        -webkit-animation: cloud 5s var(--delay) linear infinite backwards;
        animation: cloud 5s var(--delay) linear infinite backwards;
        }
        .cloud::after {
        content: "";
        position: absolute;
        width: 20vmin;
        height: 12vmin;
        bottom: 0;
        border-radius: 6rem 10rem 1rem 0;
        -webkit-transform: translateX(9vmin);
        transform: translateX(9vmin);
        background-color: #b5edf9;
        }
        .cloud::before {
        content: "";
        position: absolute;
        width: 15vmin;
        height: 8vmin;
        bottom: 8vmin;
        border-radius: 20vmin 20vmin 0 0;
        -webkit-transform: translateX(6vmin);
        transform: translateX(6vmin);
        background-color: #b5edf9;
        }
        @keyframes cloud {
        0%{
        transform: translateX(100vw);
        }
        100%{
        transform: translateX(-100vw);
        }
        }
        @keyframes run {
        0%{
        transform: rotate(0deg);
        }
        100%{
        transform: rotate(360deg);
        }
        }
        @keyframes bush1 {
        0%{
        transform: translateX(100vw);
        }
        100%{
        transform: translateX(-100vw);
        }
        }
    
    </style>
</head>
<body>
        <div class="cloud" style="--delay:3s;--top70%"></div>
        <div class="cloud" style="--delay:5s;--top:80%"></div>
        <div class="cloud" style="--delay:5.5s;--top:60%"></div>
        <div class="bricks" style="--delay:5.5s;--top:100%"></div>
        <!-- <div class="bush1" style="--delay:5.5s;--top:10vmin"></div> -->
        <!-- <div class="bricks" img src="images/Bricks.png" alt="bricks" width="500" height="333" style="--delay:0.0s;--top:10vmin"></div> -->
    </body>
</html>

<footer>

</footer>