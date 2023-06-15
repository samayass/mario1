
<style>
    canvas {
        margin:0;
        display: flex;
        align-items: center;
        justify-content:center;
        height: 20vh;
        border: 1px solid black;
    }
</style>
<canvas></canvas>

<script>
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1700;
canvas.height = 576;
let gravity = 1.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: canvas.height - 100
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.width = 60;
    this.height = 60;
    this.color = 'red';
    this.jumping = false; // Track if the player is jumping
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    // Boundary checks
    if (this.position.y + this.height >= canvas.height) {
      this.position.y = canvas.height - this.height;
      this.velocity.y = 0;
      this.jumping = false; // Allow jumping when player is on the ground
    } else if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocity.y = 0;
    }
    else {
        this.velocity.y += gravity;
    }
    if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
      this.velocity.x = 0;
    } else if (this.position.x <= 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    }
    this.draw();
  }
  jump() {
    if (!this.jumping) {
      this.velocity.y = -20; // Adjust the jump velocity as needed
      this.jumping = true;
    }
  }
}
let player = new Player();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}
animate();
function handleKeyDown(event) {
  const speed = 10;
  if (event.key === 'ArrowUp') {
    player.jump(); // Call the jump method instead of directly setting velocity
  } else if (event.key === 'ArrowDown') {
    player.velocity.y = speed;
  } else if (event.key === 'ArrowLeft') {
    player.velocity.x = -speed;
  } else if (event.key === 'ArrowRight') {
    player.velocity.x = speed;
  }
}
function handleKeyUp(event) {
  if (
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight'
  ) {
    player.velocity.x = 0;
  }
}
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

</script>