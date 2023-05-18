---
title: Yoshi in Motion OOP 
comments: true
layout: default
description: Use JavaScript without external libararies to animate Yoshi moving across screen, OOP style.
permalink: /yoshi
image: /images/yoshi.png
categories: []
tags: [javascript]
---

{% include home.html %}

{% assign sprite_file = site.baseurl | append: page.image %}  <!--- Liquid concatentation --->
{% assign hash = site.data.yoshi_metadata %}  <!--- Liquid list variable created from file containing mario metatdata for sprite --->
{% assign pixels = 256 %} <!--- Liquid integer assignment --->

<!--- HTML for page contains <p> tag named "mario" and class properties for a "sprite"  -->
<p id="yoshi" class="sprite"></p>
  

<!--- Embedded Cascading Style Sheet (CSS) rules, defines how HTML elements look --->
<style>
  /* CSS style rules for the elements id and class above...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /* background position of sprite element */
  #yoshi {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}} * -1px);
  }
</style>

<!--- Embedded executable code--->
<script>
  ////////// convert yml hash to javascript key value objects /////////

  var yoshi_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  yoshi_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// animation control object /////////

  class Yoshi {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.yoshiElement = document.getElementById("yoshi"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.yoshiElement.style.position = "absolute";
    }

    animateRight(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.yoshiElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.yoshiElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

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
        this.yoshiElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.yoshiElement.style.left = `${this.positionX}px`;

        this.positionX -= speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    animateU(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.yoshiElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.yoshiElement.style.left = `${this.positionX}px`;

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

  const yoshi = new Yoshi(yoshi_metadata);

  ////////// event control /////////

  var rightspd = 0;
  var leftspd = 0;
  var direction = "none";

  window.addEventListener("keydown", (event) => {
    if (event.key === "d") {
      event.preventDefault();
      direction = "right";
      if (event.repeat) {
        yoshi.startCheering();
      } else {
        if (yoshi.currentSpeed === 0 && leftspd == 0) {
          yoshi.startWalkingRight();
          leftspd = 0;
          rightspd = 1;
        } else if (yoshi.currentSpeed === 3 && rightspd == 1) {
          yoshi.startRunningRight();
          rightspd = 0;
        }
      }
    } 
    
    if (event.key === "a") {
      event.preventDefault();
      direction = "left";
      if (event.repeat) {
        yoshi.startCheering();
      } else {
        if (yoshi.currentSpeed === 0 && rightspd == 0) {
          yoshi.startWalkingLeft();
          rightspd = 0;
          leftspd = 1;
        } else if (yoshi.currentSpeed === 3 && leftspd == 1) {
          yoshi.startRunningLeft();
          leftspd = 0;
        }
      }
    } 

    if (event.key === "d") {
      event.preventDefault();
      rightspd = 0;
      leftspd = 0;
      if (event.repeat) {
        yoshi.stopAnimate();
      } else if (direction == "right"){
        yoshi.startPuffing();
      } else if (direction == "left"){
        yoshi.startPuffingLeft();
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
        yoshi.startCheering();
      } else {
        if (yoshi.currentSpeed === 0 && leftspd == 0) {
          yoshi.startWalkingRight();
          leftspd = 0;
          rightspd = 1;
        } else if (yoshi.currentSpeed === 3 && rightspd == 1) {
          yoshi.startRunningRight();
          rightspd = 0;
        }
      }
    }
    
    if (event.touches[0].clientX < window.innerWidth / 2) {
      event.preventDefault();
      direction = "left";
      if (event.repeat) {
        yoshi.startCheering();
      } else {
        if (yoshi.currentSpeed === 0 && rightspd == 0) {
          yoshi.startWalkingLeft();
          rightspd = 0;
          leftspd = 1;
        } else if (yoshi.currentSpeed === 3 && leftspd == 1) {
          yoshi.startRunningLeft();
          leftspd = 0;
        }
      }
    }

    if (event.touches[0].clientY < window.innerHeight / 2) {
      event.preventDefault();
      rightspd = 0;
      leftspd = 0;
      if (event.repeat) {
        yoshi.stopAnimate();
      } else if (direction == "right"){
        yoshi.startPuffing();
      } else if (direction == "left"){
        yoshi.startPuffingLeft();
      }
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    yoshi.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     yoshi.stopAnimate();
     rightspd = 0;
     leftspd = 0;
     direction = "none";
     yoshi.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    yoshi.startResting();
  });

</script>

