const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let gravity = 1.5;

class Player {
    constructor() {
        this.position = {
            x: 100,   // Initial x position of the player
            y: 100    // Initial y position of the player
        }
        this.velocity = {
            x: 0,     // Initial x velocity of the player
            y: 0      // Initial y velocity of the player
        }
        this.width = 40;    // Width of the player
        this.height = 60;   // Height of the player

        this.image = image8;   // Image of the player
        this.frames = 0;       // Counter for animation frames
        this.sprites = {
            stand: {
                right: image8   // Sprite for standing position facing right
            },
            run: {
                right: image6   // Sprite for running position facing right
            }
        }

        this.currentSprite = this.sprites.stand.right;   // Current sprite of the player
    }

    draw() {
        c.drawImage(this.currentSprite, 
            25 * this.frames, 
            0,
            24, 
            42,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height);
    }

    update() {
        this.frames++;
        if (this.frames > 8) {
            this.frames = 0;
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        };
        this.image = image;

        this.width = 540;    // Width of the platform
        this.height = 160;   // Height of the platform
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

class BlockObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        };
        this.image = image;

        this.width = 158;    // Width of the block object
        this.height = 79;    // Height of the block object
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

class Tube {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x,
            y
        };
        this.image = new Image();
        this.image.src = image;
        this.width = width;
        this.height = height;
        this.velocity = {
            x: 0
        };
        this.image.onload = () => {
            // Optional: If width and height are not provided, use the image's natural dimensions
            if (!width) {
                this.width = this.image.naturalWidth;
            }
            if (!height) {
                this.height = this.image.naturalHeight;
            }
        }
    }

// Draws the current image of the player at its position
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

// Updates the player's position and draws it
    update() {
        this.position.x += this.velocity.x
        this.draw()
    }
}

// GenericObject class
class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    };

    this.image = image;
    this.width = 760;
    this.height = 82;
  }

    // Draws the image of the generic object at its position
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// Creating images for various objects
let image = new Image();
image.src = './images/platform.png';
console.log(image);

let image1 = new Image();
image1.src = './images/background.png';

let image2 = new Image();
image2.src = './images/hills2.png';

let image3 = new Image();
image3.src = './images/box.png';

let image4 = new Image();
image4.src = './images/mariopipe.png';

let image5 = new Image();
image5.src = './images/spriteRunLeft.png';

let image6 = new Image();
image6.src = './images/spriteRunRight.png';

let image7 = new Image();
image7.src = './images/spriteStandLeft.png';

let image8 = new Image();
image8.src = './images/spriteStandRight.png';

let image9 = new Image();
image9.src = './images/coin_static.png';

let player = new Player();

let blockObjects = [
  new BlockObject({
    x: 500,
    y: 100,
    image: image3
  }),
  new BlockObject({
    x: 800,
    y: 200,
    image: image3
  }),
  new BlockObject({
    x: 1200,
    y: 300,
    image: image3
  }),
  new BlockObject({
    x: 1700,
    y: 200,
    image: image3
  }),

  new BlockObject({
    x: 2800,
    y: 300,
    image: image3
  }),
  new BlockObject({
    x: 2000, y: 100, image:image3
    }),
]


  // Creating platform objects with specific positions and the same image
let platforms = [
    new Platform({
        x: 0, y: 450, image 
    }), 
    new Platform({
        x: 540, y: 450, image
    }),
    new Platform({
        x: 540*2, y: 450, image
    }),
    new Platform({
        x: 540*3 + 100, y: 450, image
    }),
    new Platform({
        x: 540*4, y: 450, image
    }),
    new Platform({
        x: 540*5+500, y: 450, image
    }),
    new Platform({
        x: 540*6 + 200, y: 450, image
    }),
    new Platform({
        x: 540*7, y: 450, image
    }),
    new Platform({
        x: 540*8, y: 450, image
    }),
    new Platform({
        x: 540*9 +100, y: 450, image
    }),
    new Platform({
        x: 540*10 +100, y: 450, image
    }),
    


]

  // Creating generic objects with specific positions and images
let genericObjects = [
    new GenericObject({
        x:0, y:0, image: image1
    }),
    new GenericObject({
        x:0, y:180, image: image2
    }),
    new GenericObject({
        x:754, y:180, image: image2
    }),
    new GenericObject({
        x:754*2, y:180, image: image2
    }),
    new GenericObject({
        x:754*3, y:180, image: image2
    }),
    new GenericObject({
        x:754*4, y:180, image: image2
    }),

]


  // Creating tube objects with specific positions, image, width, and height
let tubes = [
    new Tube( {
        x: 5500, 
        y: 265,
        image: 'images/tubeM.png',
        width: 175,
        height: 200
    } )]

let keys = {
    right: {
        pressed:false
    },
    left: {
        pressed:false
    }
}

let scrollOffset = 0

function init()
  // Reinitializing images and objects

{
    image = new Image()
    image.src = './images/platform.png'
    console.log(image)
    
    image1 = new Image()
    image1.src = './images/background.png'
    
    image2 = new Image()
    image2.src = './images/hills2.png'
    
    image3 = new Image()
    image3.src = './images/box.png'
    
    image4 = new Image()
    image4.src = './images/mariopipe.png'

    let image5 = new Image();
    image5.src = './images/goomba.png';
    

    player = new Player()
  
 
    blockObjects = [
        new BlockObject({
            x: 500, y: 100, image:image3
        }),
        new BlockObject({
            x: 800, y: 200, image:image3
        }),
        new BlockObject({
            x: 1200, y: 300, image:image3
        }),
        new BlockObject({
            x: 1700,
            y: 200,
            image: image3
          }),
        
          new BlockObject({
            x: 2800,
            y: 300,
            image: image3
          }),
          new BlockObject({
            x: 2000, y: 100, image:image3
            }),
    ]


    
    platforms = [
        new Platform({
            x: 0, y: 450, image 
        }), 
        new Platform({
            x: 540, y: 450, image
        }),
        new Platform({
            x: 540*2, y: 450, image
        }),
        new Platform({
            x: 540*3 + 100, y: 450, image
        }),
        new Platform({
            x: 540*4, y: 450, image
        }),
        new Platform({
            x: 540*5+500, y: 450, image
        }),
        new Platform({
            x: 540*6 + 200, y: 450, image
        }),
        new Platform({
            x: 540*7, y: 450, image
        }),
        new Platform({
            x: 540*8, y: 450, image
        }),
        new Platform({
            x: 540*9 +100, y: 450, image
        }),
        new Platform({
            x: 540*10 +100, y: 450, image
        }),
        
    
    
    
    ]


    genericObjects = [
        new GenericObject({
            x:0, y:0, image: image1
        }),
        new GenericObject({
            x:0, y:180, image: image2
        }),
        new GenericObject({
            x:754, y:180, image: image2
        }),
        new GenericObject({
            x:754*2, y:180, image: image2
        }),
        new GenericObject({
            x:754*3, y:180, image: image2
        }),
        new GenericObject({
            x:754*4, y:180, image: image2
        }),
        
    
    ]

    tubes = [
        new Tube( {
            x: 5500, 
            y: 265,
            image: 'images/tubeM.png',
            width: 175,
            height: 200
        } )]
    
    
  // Initialize keys object
    keys = {
        right: {
            pressed:false
        },
        left: {
            pressed:false
        }
    }
      // Initialize scrollOffset
    scrollOffset = 0
}


function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
        // Clear the canvas
    c.clearRect(0,0, canvas.width, canvas.height)

        // Draw the generic objects
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

        // Draw the block objects

    blockObjects.forEach(blockObject => {
        blockObject.draw()
    })

        // Draw the platform objects

    platforms.forEach(platform => {
        platform.draw()
    })

        // Update and draw the player
    player.update()

        // Update and draw the tubes
    tubes.forEach(tube => {
        tube.update()
    })

        // Handle key presses and scroll the screen
    if (keys.right.pressed && player.position.x < 400) {
            // Move player and stop tubes when pressing right
        player.velocity.x = 15
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
    } 
    else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x>0) {
            // Move player and stop tubes when pressing left
        player.velocity.x = -15;
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
    } 
    else  {
            // Stop player and tubes when no keys are pressed
        player.velocity.x = 0
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })

            // Scroll the screen to the right
        if (keys.right.pressed) {
            scrollOffset +=5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -=2;
            })
            blockObjects.forEach(blockObject => {
                blockObject.position.x -=5;
            })
            tubes.forEach(tube => {
                //tube.position.x  -= player.speed
                tube.velocity.x -=5
            })
        
        }
                // Scroll the screen to the left
            else if (keys.left.pressed && scrollOffset >0) {
                scrollOffset -=5
                platforms.forEach(platform => {
                    platform.position.x +=5;
                })
                genericObjects.forEach(genericObject => {
                    genericObject.position.x +=2;
                })
                blockObjects.forEach(blockObject => {
                    blockObject.position.x +=5;
                })
                tubes.forEach(tube => {
                    tube.velocity.x +=5
                })
          

            }
    }

// Check for collisions between the player and each platform
platforms.forEach(platform => {
    // Check if the bottom of the player is above or at the same level as the top of the platform
    if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y
    ) {
        // Check if the player's horizontal range intersects with the platform's horizontal range
        if (
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            // Stop the player's vertical velocity to prevent falling through the platform
            player.velocity.y = 0;
        }
    }
});

//tube collision detection
tubes.forEach(tube => {
        
    //from left
    if (player.position.x + player.width <= tube.position.x + 45// the '+ 10' is an arbitrary value to fix the hitbox
        && 
        player.position.x + player.width + player.velocity.x >= tube.position.x + tube.velocity.x + 45
        &&
        player.position.y + player.height >= tube.position.y
        &&
        player.position.y <= tube.position.y + tube.height) {
        player.velocity.x = 0
        player.position.x = tube.position.x + 30 - player.width
        console.log(tube.position.x + "left")
    }
    //from right
    if (player.position.x >= tube.position.x + tube.width - 45
        && 
        player.position.x + player.velocity.x <= tube.position.x + tube.width + tube.velocity.x - 45
        &&
        player.position.y + player.height >= tube.position.y
        &&
        player.position.y <= tube.position.y + tube.height) {
        player.velocity.x = 0
        player.position.x = tube.position.x + tube.width - 30
        console.log(tube.position.x + tube.width + "right")
    }
   //from top
    if (player.position.y + player.height <= tube.position.y + 18
        && 
        player.position.y + player.height + player.velocity.y >= tube.position.y + 18
        &&
        player.position.x + player.width >= tube.position.x + 45
        &&
        player.position.x <= tube.position.x + tube.width - 45) {
        player.velocity.y = 0
        if (player.position.x >= tube.position.x + 45
            &&
            player.position.x + player.width <= tube.position.x + tube.width - 45) {
                gravity = 0.01;
                player.velocity.y = 0.0001; // Set a small positive velocity to make the player fall slowly
                player.position.y = tube.position.y + 18 - player.height; // Adjust the player's position to be exactly on top of the tube
            }
    } 
    // Check if player has fallen down far enough
    if (player.position.y >= tube.position.y + 18
        ||
        player.position.x + player.width <= tube.position.x
        ||
        player.position.x >= tube.position.x + tube.width
        ||
        player.position.y + player.height <= tube.position.y) {
        gravity = 2; // Reset gravity to 2
    }
    //from inside left
    if (player.position.x >= tube.position.x + 45
        && 
        player.position.x + player.velocity.x <= tube.position.x + tube.velocity.x + 45
        &&
        player.position.y + player.height >= tube.position.y
        &&
        player.position.y <= tube.position.y + tube.height) {
        player.velocity.x = 0
        player.position.x = tube.position.x + tube.velocity.x + 45
    }
    //from inside right
    if (player.position.x + player.width <= tube.position.x + tube.width - 45
        && 
        player.position.x + player.width + player.velocity.x >= tube.position.x + tube.width + tube.velocity.x - 45
        &&
        player.position.y + player.height >= tube.position.y
        &&
        player.position.y <= tube.position.y + tube.height) {
        player.velocity.x = 0
        player.position.x = tube.position.x + tube.width + tube.velocity.x - 45 - player.width
    }

})


// Check if the scroll offset is greater than 2000
if (scrollOffset > 2000) {
    console.log('You win!');
}

// Check if the player has fallen below the canvas
if (player.position.y > canvas.height) {
    init(); // Reset the game
}

// Check for collisions between the player and each block object
blockObjects.forEach(blockObject => {
    // Check if the player's vertical range intersects with the block object's vertical range
    if (
        player.position.y + player.height >= blockObject.position.y && // Check if player is below or at the same level as the block object
        player.position.y <= blockObject.position.y + blockObject.height && // Check if player is above or at the same level as the bottom of the block object
        player.position.x + player.width >= blockObject.position.x && // Check if player's right side is to the right or at the same level as the left side of the block object
        player.position.x <= blockObject.position.x + blockObject.width // Check if player's left side is to the left or at the same level as the right side of the block object
    ) {
        player.velocity.y = 0;
        player.position.y = blockObject.position.y - player.height; // Reset player's position to be just above the block object
    }
});

  //change level condition
tubes.forEach(tube => {
    if (
    player.position.x >= tube.position.x + 45 &&
    player.position.x + player.width <= tube.position.x + tube.width - 45 &&
    player.position.y + player.height >= tube.position.y + tube.height - 17
    ) { 
        tube.position.y += 2
        if (window.location.href == "http://127.0.0.1:4000/background1") {
            window.location.href = "http://127.0.0.1:4000/levels/mario5"
        }
        if (window.location.href == "https://samayass.github.io/mario1/background1") {
            window.location.href = "https://samayass.github.io/mario1/levels/mario5"
        }
        console.log("i'm outta here!!")
        
    }
})
 
}


animate()


// Add event listener for keydown events
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true; // Set the 'left' key as pressed
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = true; // Set the 'right' key as pressed
            player.currentSprite = player.sprites.run.right; // Update the player's current sprite to the running right sprite
            break;
        case 87:
            console.log('up');
            player.velocity.y -= 20; // Apply an upward velocity to the player
            break;
    }
});

// Add event listener for keyup events
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false; // Set the 'left' key as released
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = false; // Set the 'right' key as released
            break;
        case 87:
            console.log('up');
            player.velocity.y -= 10; // Apply a decreased upward velocity to the player
            break;
    }
});
