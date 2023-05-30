---
title: Mario Game (test1)
comments: true
layout: default
description: Animating Mario games with starts of interacting objects
permalink: /game1
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

<!--- HTML for page contains <p> tag named "mario" and class properties for a "sprite"  -->
<p id="mario" class="sprite"></p>
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

  ////////// animation control object /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 40; //animation time interval
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
      this.animateRight(this.obj["Walk"], 3);
    }

    startWalkingLeft() {
      this.stopAnimate();
      this.animateLeft(this.obj["WalkL"], 3);
    }

    startRunningRight() {
      this.stopAnimate();
      this.animateRight(this.obj["Run1"], 6);
    }

    startRunningLeft() {
      this.stopAnimate();
      this.animateLeft(this.obj["Run1L"], 6);
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
          mario.startWalkingRight();
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
          mario.startWalkingLeft();
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
        } else if (mario.currentSpeed === 3 && rightspd == 1) {
          mario.startRunningRight();
          rightspd = 0;
        }
      }
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
        } else if (mario.currentSpeed === 3 && leftspd == 1) {
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
  window.addEventListener("focus", () => {
     mario.stopAnimate();
     rightspd = 0;
     leftspd = 0;
     direction = "none";
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    const sprite1 = document.querySelector(".sprite1");
    sprite.style.transform = `scale(${0.2 * scale})`;
    sprite1.style.transform = `scale(${0.1 * scale})`;
    mario.startResting();
    coin.startAnimate();
  });
  

</script>

