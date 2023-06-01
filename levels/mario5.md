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
<canvas style="top: 500px; left: 0%"></canvas>
<br>

<script src = "mario5.js"></script>