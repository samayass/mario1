---
title: Mario Game
comments: true
layout: default
description: Animating Mario games with starts of interacting objects
permalink: /levels/mario5
image: /levels/images/mario_animation.png
image2: /images/coin.png
categories: []
tags: [javascript]
---

{% include home.html %}

<style>
    canvas {
        margin: 0;
        background-color: #c0fdfb;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 65vh
    }
    .sprite {
        position: relative;
        top: 315px;
        z-index: 2;
        height: 256px;
        width: 256px;
        background-image: url('images/mario_animation.png');
        background-repeat: no-repeat;
    }

    <div id="mario" class="sprite"></div>

  /* background position of sprite element */
  #mario {
    background-position: -256px -256px; /* Replace with appropriate values */
    transition: top 1.5s ease;
  }
</style>
<br>
<h1>Mario and Luigi Game</h1>
<h2>Use WASD to control the character</h2>
<h3>Watch out for the Goombas and don't fall in the holes or lava! Have Fun!</h3>
<canvas style="top: 500px; left: 0%"></canvas>

<br>

<script src = "mario5.js"></script>