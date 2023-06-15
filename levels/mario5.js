
const canvas = document.querySelector('canvas') // Get the canvas element from the HTML document
const c = canvas.getContext('2d') // Get the 2D rendering context for the canvas

canvas.width = 1024 // Set the width of the canvas
canvas.height = 576 // Set the height of the canvas

let gravity = 2 // Define the gravity value
let canJump = true // Flag to check if the player can jump

const marioImage = new Image() // Create a new Image object for the player character
marioImage.src = 'images/mario_animationTEMP2.png' // Set the source of the player character image

class Player {
    constructor() {
        this.speed = 15 // Define the player's movement speed
        this.position = {
            x: 100, // Initial X-coordinate of the player
            y: 100 // Initial Y-coordinate of the player
        }
        this.velocity = {
            x: 0, // Initial velocity in the X-direction
            y: 1 // Initial velocity in the Y-direction
        }
        this.width = 35 // Width of the player character
        this.height = 50 // Height of the player character
    }

    draw() {
        const frameWidth = 80; // Width of each frame in the sprite sheet
        const frameHeight = 180; // Height of each frame in the sprite sheet
        const frameX = 5; // X-coordinate of the desired frame in the sprite sheet
        const frameY = 5; // Y-coordinate of the desired frame in the sprite sheet

        c.drawImage(
            marioImage, // Image source
            frameX, // X-coordinate of the desired frame in the sprite sheet
            frameY, // Y-coordinate of the desired frame in the sprite sheet
            frameWidth, // Width of the frame in the sprite sheet
            frameHeight, // Height of the frame in the sprite sheet
            this.position.x, // X-coordinate of the player's position on the canvas
            this.position.y, // Y-coordinate of the player's position on the canvas
            this.width, // Width of the player character on the canvas
            this.height // Height of the player character on the canvas
        );
    }

    update() {
        this.position.y += this.velocity.y // Update the Y-coordinate of the player's position
        this.position.x += this.velocity.x // Update the X-coordinate of the player's position
        this.draw() // Draw the player character on the canvas

        if (this.position.y + this.height <= canvas.height) {
            this.velocity.y += gravity; // Apply gravity if the player is not on the ground
            // this.position.y = canvas.height - this.height; // Set the position exactly on the ground
        } else {
            // this.velocity.y = 0; // Reset the vertical velocity to zero
        }
    }
}

class Goomba {
    constructor({ x, y, image, width = 80, height = 80 }) {
        this.speed = -2 // Define the Goomba's movement speed
        this.position = {
            x, // X-coordinate of the Goomba's position
            y // Y-coordinate of the Goomba's position
        };
        this.velocity = {
            x: -2, // Initial velocity in the X-direction
            y: 0 // Initial velocity in the Y-direction
        };
        this.image = new Image(); // Create a new Image object for the Goomba
        this.image.src = image; // Set the source of the Goomba's image
        this.width = width; // Width of the Goomba
        this.height = height; // Height of the Goomba
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height); // Draw the Goomba on the canvas
    }

    update() {
        this.position.x += this.velocity.x; // Update the X-coordinate of the Goomba's position
        this.draw(); // Draw the updated Goomba on the canvas
    }
}

class Barrier {
    constructor() {
        this.position = {
            x: 0 // X-coordinate of the barrier's position
        }
        this.velocity = {
            x: 0 // Velocity in the X-direction
        }
    }

    update() {
        this.position.x += this.velocity.x; // Update the X-coordinate of the barrier's position
    }
}

class Platform {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x, // X-coordinate of the platform's position
            y // Y-coordinate of the platform's position
        }
        this.image = new Image() // Create a new Image object for the platform
        this.image.src = image // Set the source of the platform's image
        this.width = width // Width of the platform
        this.height = height // Height of the platform
        this.velocity = {
            x: 0 // Velocity in the X-direction (initially 0)
        }
        this.image.onload = () => {
            // Optional: If width and height are not provided, use the image's natural dimensions
            if (!width) {
                this.width = this.image.naturalWidth;
            }
            if (!height) {
                this.height = this.image.naturalHeight;
            }
        }

        // this.width = image.width
        // this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height) // Draw the platform on the canvas
    }
    
    update() {
        this.position.x += this.velocity.x // Update the X-coordinate of the platform's position
        this.draw() // Draw the updated platform on the canvas
    }
}

class Coin {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x, // X-coordinate of the coin's position
            y // Y-coordinate of the coin's position
        }
        this.image = new Image() // Create a new Image object for the coin
        this.image.src = image // Set the source of the coin's image
        this.width = width // Width of the coin
        this.height = height // Height of the coin
        this.frames = 0 // Number of frames
        this.beat = new Audio('/sounds/coin.mp3'); // Sound effect for the coin
        this.velocity = {
            x: 0 // Velocity in the X-direction (initially 0)
        }
        this.image.onload = () => {
            // Optional: If width and height are not provided, use the image's natural dimensions
            if (!width) {
                this.width = this.image.naturalWidth;
            }
            if (!height) {
                this.height = this.image.naturalHeight;
            }
        }

        // this.width = image.width
        // this.height = image.height
    }

    draw() {
        c.drawImage(this.image, 25*this.frames, 0, 25, 42, this.position.x, this.position.y, this.width, this.height) // Draw the coin on the canvas
        
    }
    
    update() {
        this.position.x += this.velocity.x // Update the X-coordinate of the coin's position
        this.draw() // Draw the updated coin on the canvas
    }
}


class Floor {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x, // X-coordinate of the floor's position
            y // Y-coordinate of the floor's position
        }
        this.image = new Image() // Create a new Image object for the floor
        this.image.src = image // Set the source of the floor's image
        this.width = width // Width of the floor
        this.height = height // Height of the floor
        this.image.onload = () => {
            // Optional: If width and height are not provided, use the image's natural dimensions
            if (!width) {
                this.width = this.image.naturalWidth;
            }
            if (!height) {
                this.height = this.image.naturalHeight;
            }
        }

        // this.width = image.width
        // this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height) // Draw the floor on the canvas
    }
}

class Lava {
    constructor ( { x, y, image, width, height }){
        this.position = {
            x, // X-coordinate of the lava's position
            y // Y-coordinate of the lava's position
        }
        this.image = new Image() // Create a new Image object for the lava
        this.image.src = image // Set the source of the lava's image
        this.width = width // Width of the lava
        this.height = height // Height of the lava
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height) // Draw the lava on the canvas
    }
    
    update() {
        // this.position.x += this.velocity.x // Optional: Update the X-coordinate of the lava's position
        this.draw() // Draw the updated lava on the canvas
    }
}

class Hill {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x, // X-coordinate of the hill's position
            y // Y-coordinate of the hill's position
        }
        this.image = new Image() // Create a new Image object for the hill
        this.image.src = image // Set the source of the hill's image
        this.width = width // Width of the hill
        this.height = height // Height of the hill
        this.image.onload = () => {
            // Optional: If width and height are not provided, use the image's natural dimensions
            if (!width) {
                this.width = this.image.naturalWidth;
            }
            if (!height) {
                this.height = this.image.naturalHeight;
            }
        }

        // this.width = image.width
        // this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height) // Draw the hill on the canvas
    }
}

class Tube {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x, // X-coordinate of the tube's position
            y // Y-coordinate of the tube's position
        }
        this.image = new Image() // Create a new Image object for the tube
        this.image.src = image // Set the source of the tube's image
        this.width = width // Width of the tube
        this.height = height // Height of the tube
        this.velocity = {
            x: 0 // Velocity in the X-direction (initially 0)
        }
        this.image.onload = () => {
            // Optional: If width and height are not provided, use the image's natural dimensions
            if (!width) {
                this.width = this.image.naturalWidth;
            }
            if (!height) {
                this.height = this.image.naturalHeight;
            }
        }

        // this.width = image.width
        // this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height) // Draw the tube on the canvas
    }
    
    update() {
        this.position.x += this.velocity.x // Update the X-coordinate of the tube's position
        this.draw() // Draw the updated tube on the canvas
    }
}

let player = new Player() // Create a new Player object
let hills = [] // Array to store hill objects
let platforms = [] // Array to store platform objects
let coins = [] // Array to store coin objects
let floors = [] // Array to store floor objects
let tubes = [] // Array to store tube objects
let barrier = new Barrier() // Create a new Barrier object
let goombas = [] // Array to store Goomba objects
let lavas = [] // Array to store lava objects

function init() {

    player = new Player() // Create a new Player object
    barrier = new Barrier() // Create a new Barrier object
    platforms = [
        new Platform( { // Create new Platform objects and add them to the platforms array
            x: 560, 
            y: 300,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 640, 
            y: 300,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 720, 
            y: 300,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 1400, 
            y: 340,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ), 
        new Platform( {
            x: 1570, 
            y: 220,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 1780, 
            y: 140,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 1780, 
            y: 200,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 1780, 
            y: 280,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 1780, 
            y: 340,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 1780, 
            y: 420,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 2080, 
            y: 40,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 2160, 
            y: 120,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 2240, 
            y: 200,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 2550, 
            y: 280,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 2630, 
            y: 280,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 2710, 
            y: 280,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 3050, 
            y: 200,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 3130, 
            y: 280,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 3210, 
            y: 200,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 3290, 
            y: 200,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } )]
    coins = [
        new Coin({ // Create new Coin objects and add them to the coins array
            x: 50, 
            y: 50,
            image: 'images/coin.png',
            width: 300,
            height: 150
        }),
    ]
    floors = [
        new Floor( { // Create new Floor objects and add them to the floors array
            x: 0, 
            y: 500,
            image: 'images/flooring2.png',
            width: 1050,
            height: 80
        } ),
        new Floor( {
            x: 1250, 
            y: 500,
            image: 'images/flooring2.png',
            width: 1050,
            height: 80
        } ), 
        new Floor( {
            x: 2500, 
            y: 500,
            image: 'images/flooring2.png',
            width: 1050,
            height: 80
        } )]
    hills = [
        new Hill( { // Create new Hill objects and add them to the hills array
            x: -1024, 
            y: 0,
            image: 'images/hills.png',
            width: 1024,
            height: 576
        } ),
        new Hill( {
            x: 0, 
            y: 0,
            image: 'images/hills.png',
            width: 1024,
            height: 576
        } ),
        new Hill( {
            x: 1024, 
            y: 0,
            image: 'images/hills.png',
            width: 1024,
            height: 576
        } ),
        new Hill( {
            x: 2048, 
            y: 0,
            image: 'images/hills.png',
            width: 1024,
            height: 576
        } )]
    tubes = [
        new Tube( { // Create new Tube objects and add them to the tubes array
            x: 3350, 
            y: 317,
            image: 'images/tube.png',
            width: 175,
            height: 200
        } )]
    goombas = [
        new Goomba( { // Create new Goomba objects and add them to the goombas array
            x: 800,
            y: 420,
            image: 'images/goomba2.png',
            width: 80,
            height: 80
        } ),
        new Goomba( {
            x: 900,
            y: 420,
            image: 'images/goomba2.png',
            width: 80,
            height: 80
        } ),
        new Goomba( {
            x: 3300,
            y: 420,
            image: 'images/goomba2.png',
            width: 80,
            height: 80
        } )]
    lavas = [
        new Lava( { // Create new Lava objects and add them to the lavas array
            x: 1050,
            y: 460,
            image: 'images/lava.gif',
            width: 200,
            height: 120
        }),
        new Lava( {
            x: 2300,
            y: 460,
            image: 'images/lava.gif',
            width: 200,
            height: 120
        }),
        new Lava( {
            x: 3550,
            y: 460,
            image: 'images/lava.gif',
            width: 1000,
            height: 120
        })  
    ]

}

const keys = {
    right: {
        pressed: false // Flag to track whether the right key is pressed
    }, 
    left: {
        pressed: false // Flag to track whether the left key is pressed
    },
}

function animate() {
    // This function is the main animation loop that runs repeatedly to update the game state and render the game on the canvas.

    requestAnimationFrame(animate); // Request the next animation frame

    c.fillStyle = 'cornflowerblue';
    c.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas by filling it with the specified color

    // Draw hills on the canvas
    hills.forEach(hill => {
        hill.draw();
    });

    // Update and render platforms
    platforms.forEach(platform => {
        platform.update();
    });

    // Update and render coins
    coins.forEach(coin => {
        coin.update();
    });

    // Draw floors on the canvas
    floors.forEach(floor => {
        floor.draw();
    });

    // Update the player
    player.update();

    // Update and render tubes
    tubes.forEach(tube => {
        tube.update();
    });

    // Update and render the barrier
    barrier.update();

    // Update and render goombas
    goombas.forEach(goomba => {
        goomba.update();
    });

    // Update and render lavas
    lavas.forEach(lava => {
        lava.update();
    });

    // Check if the player has landed on the ground
    if (player.velocity.y == 0) {
        // hasJumped = true;
    }

    // Handle player movement based on keyboard input

    if (keys.right.pressed && player.position.x < 400) {
        // Move player to the right
        player.velocity.x = player.speed;

        // Stop the movement of platforms, tubes, and goombas
        platforms.forEach(platform => {
            platform.velocity.x = 0;
        });

        tubes.forEach(tube => {
            tube.velocity.x = 0;
        });

        barrier.velocity.x = -player.speed;

        goombas.forEach(goomba => {
            if (goomba.speed == 2) {
                goomba.velocity.x = 2;
            } else if (goomba.speed == -2) {
                goomba.velocity.x = -2;
            }
        });
    } else if (keys.left.pressed && player.position.x > 100) {
        // Move player to the left
        player.velocity.x = -player.speed;

        // Stop the movement of platforms, tubes, and goombas
        platforms.forEach(platform => {
            platform.velocity.x = 0;
        });

        tubes.forEach(tube => {
            tube.velocity.x = 0;
        });

        barrier.velocity.x = player.speed;

        goombas.forEach(goomba => {
            if (goomba.speed == 2) {
                goomba.velocity.x = 2;
            } else if (goomba.speed == -2) {
                goomba.velocity.x = -2;
            }
        });
    } else {
        // Stop player movement
        player.velocity.x = 0;

        // Stop the movement of platforms, tubes, and goombas
        tubes.forEach(tube => {
            tube.velocity.x = 0;
        });

        platforms.forEach(platform => {
            platform.velocity.x = 0;
        });

        barrier.velocity.x = 0;

        goombas.forEach(goomba => {
            if (goomba.speed == 2) {
                goomba.velocity.x = 2;
            } else if (goomba.speed == -2) {
                goomba.velocity.x = -2;
            }
        });

        if (keys.right.pressed && !keys.left.pressed) {
            // Move platforms, floors, hills, tubes, barrier, goombas, and lavas to the left
            platforms.forEach(platform => {
                platform.velocity.x = -player.speed;  // Set the velocity of the platform to move left at the player's speed
            });
            floors.forEach(floor => {
                floor.position.x -= player.speed;  // Move the floor to the left by subtracting the player's speed from its x position
            });
            hills.forEach(hill => {
                hill.position.x -= player.speed * .66;  // Move the hill to the left at a slower speed than the player's speed
            });
            tubes.forEach(tube => {
                tube.velocity.x = -player.speed;  // Set the velocity of the tube to move left at the player's speed
            });
            barrier.velocity.x = -player.speed;  // Set the velocity of the barrier to move left at the player's speed
            goombas.forEach(goomba => {
                goomba.velocity.x = -player.speed + goomba.speed;  // Set the velocity of the goomba to move left at the player's speed plus its own speed
            });
            lavas.forEach(lava => {
                lava.position.x -= player.speed;  // Move the lava to the left by subtracting the player's speed from its x position
            });
        } else if (keys.left.pressed && !keys.right.pressed) {
            // Move platforms, floors, hills, tubes, barrier, goombas, and lavas to the right
            platforms.forEach(platform => {
                platform.velocity.x = player.speed;  // Set the velocity of the platform to move right at the player's speed
            });
            floors.forEach(floor => {
                floor.position.x += player.speed;  // Move the floor to the right by adding the player's speed to its x position
            });
            hills.forEach(hill => {
                hill.position.x += player.speed;  // Move the hill to the right at the player's speed
            });
            tubes.forEach(tube => {
                tube.velocity.x = player.speed;  // Set the velocity of the tube to move right at the player's speed
            });
            barrier.velocity.x = player.speed;  // Set the velocity of the barrier to move right at the player's speed
            goombas.forEach(goomba => {
                goomba.velocity.x = player.speed + goomba.speed;  // Set the velocity of the goomba to move right at the player's speed plus its own speed
            });
            lavas.forEach(lava => {
                lava.position.x += player.speed;  // Move the lava to the right by adding the player's speed to its x position
            });
        }        
    }

    // Platform collision detection
    platforms.forEach(platform => {
        // Collision detection from the top
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0; // Stop the player's vertical velocity
        }
        // Collision detection from the bottom
        if (player.position.y >= platform.position.y + platform.height &&
            player.position.y + player.velocity.y <= platform.position.y + platform.height &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0; // Stop the player's vertical velocity
        }
        // Collision detection from the left
        if (player.position.x + player.width <= platform.position.x + 10 &&
            player.position.x + player.width + player.velocity.x >= platform.position.x + platform.velocity.x + 10 &&
            player.position.y + player.height >= platform.position.y &&
            player.position.y <= platform.position.y + platform.height) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
            player.position.x = platform.position.x - 5 - player.width; // Adjust player's position to the left of the platform
        }
        // Collision detection from the right
        if (player.position.x >= platform.position.x + platform.width - 10 &&
            player.position.x + player.velocity.x <= platform.position.x + platform.width + platform.velocity.x - 10 &&
            player.position.y + player.height >= platform.position.y &&
            player.position.y <= platform.position.y + platform.height) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
            player.position.x = platform.position.x + platform.width + 5; // Adjust player's position to the right of the platform
        }
        // Goomba collision detection from the right
        goombas.forEach(goomba => {
            if (goomba.position.x >= platform.position.x + platform.width - 10 &&
                goomba.position.x + goomba.velocity.x <= platform.position.x + platform.width + platform.velocity.x - 10 &&
                goomba.position.y + goomba.height >= platform.position.y &&
                goomba.position.y <= platform.position.y + platform.height) {
                goomba.velocity.x = 2; // Set goomba's horizontal velocity to move to the right
                goomba.speed = 2; // Set goomba's speed to a positive value
            }
        });
        // Goomba collision detection from the left
        goombas.forEach(goomba => {
            if (goomba.position.x + goomba.width <= platform.position.x + 10 &&
                goomba.position.x + goomba.width + goomba.velocity.x >= platform.position.x + platform.velocity.x + 10 &&
                goomba.position.y + goomba.height >= platform.position.y &&
                goomba.position.y <= platform.position.y + platform.height) {
                goomba.velocity.x = -2; // Set goomba's horizontal velocity to move to the left
                goomba.speed = -2; // Set goomba's speed to a negative value
            }
        });
    });

    // Tube collision detection
    tubes.forEach(tube => {
        // Collision detection from the left
        if (player.position.x + player.width <= tube.position.x + 45 &&
            player.position.x + player.width + player.velocity.x >= tube.position.x + tube.velocity.x + 45 &&
            player.position.y + player.height >= tube.position.y &&
            player.position.y <= tube.position.y + tube.height) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
            player.position.x = tube.position.x + 30 - player.width; // Adjust player's position to the left of the tube
            console.log(tube.position.x + "left");
        }
        // Goomba collision detection from the left
        goombas.forEach(goomba => {
            if (goomba.position.x + goomba.width <= tube.position.x + 45 &&
                goomba.position.x + goomba.width + goomba.velocity.x >= tube.position.x + tube.velocity.x + 45 &&
                goomba.position.y + goomba.height >= tube.position.y &&
                goomba.position.y <= tube.position.y + tube.height) {
                goomba.velocity.x = -2; // Set goomba's horizontal velocity to move to the left
                goomba.speed = -2; // Set goomba's speed to a negative value
            }
        });
        // Collision detection from the right
        if (player.position.x >= tube.position.x + tube.width - 45 &&
            player.position.x + player.velocity.x <= tube.position.x + tube.width + tube.velocity.x - 45 &&
            player.position.y + player.height >= tube.position.y &&
            player.position.y <= tube.position.y + tube.height) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
            player.position.x = tube.position.x + tube.width - 30; // Adjust player's position to the right of the tube
            console.log(tube.position.x + tube.width + "right");
        }
        // Collision detection from the top
        if (player.position.y + player.height <= tube.position.y + 18 &&
            player.position.y + player.height + player.velocity.y >= tube.position.y + 18 &&
            player.position.x + player.width >= tube.position.x + 45 &&
            player.position.x <= tube.position.x + tube.width - 45) {
            player.velocity.y = 0; // Stop the player's vertical velocity
            if (player.position.x >= tube.position.x + 45 &&
                player.position.x + player.width <= tube.position.x + tube.width - 45) {
                gravity = 0.01; // Set a small gravity value
                player.velocity.y = 0.0001; // Set a small positive velocity to make the player fall slowly
                player.position.y = tube.position.y + 18 - player.height; // Adjust the player's position to be exactly on top of the tube
            }
        }
        // Check if player has fallen down far enough
        if (player.position.y >= tube.position.y + 18 ||
            player.position.x + player.width <= tube.position.x ||
            player.position.x >= tube.position.x + tube.width ||
            player.position.y + player.height <= tube.position.y) {
            gravity = 2; // Reset gravity to 2
        }
        // Collision detection from inside the tube on the left
        if (player.position.x >= tube.position.x + 45 &&
            player.position.x + player.velocity.x <= tube.position.x + tube.velocity.x + 45 &&
            player.position.y + player.height >= tube.position.y &&
            player.position.y <= tube.position.y + tube.height) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
            player.position.x = tube.position.x + tube.velocity.x + 45; // Adjust player's position to the left inside the tube
        }
        // Collision detection from inside the tube on the right
        if (player.position.x + player.width <= tube.position.x + tube.width - 45 &&
            player.position.x + player.width + player.velocity.x >= tube.position.x + tube.width + tube.velocity.x - 45 &&
            player.position.y + player.height >= tube.position.y &&
            player.position.y <= tube.position.y + tube.height) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
            player.position.x = tube.position.x + tube.width + tube.velocity.x - 45 - player.width; // Adjust player's position to the right inside the tube
        }
    });

    
    // Goomba collision detection

    //from left
    goombas.forEach(goomba => {
        if (player.position.x + player.width <= goomba.position.x &&
            player.position.x + player.width + player.velocity.x > goomba.position.x + goomba.velocity.x &&
            player.position.y <= goomba.position.y + goomba.height &&
            player.position.y + player.height >= goomba.position.y) {
                init() // Reset the game
                console.log("you lose!")
            }
    

        //from right
    
        if (player.position.x >= goomba.position.x + goomba.width &&
            player.position.x + player.velocity.x < goomba.position.x + goomba.width + goomba.velocity.x &&
            player.position.y <= goomba.position.y + goomba.height &&
            player.position.y + player.height >= goomba.position.y) {
                init() // Reset the game
                console.log("you lose!")
            }
    
    })
    //from top
    for (i = 0; i < goombas.length; i++) {
        if (player.position.y + player.height <= goombas[i].position.y
            && 
            player.position.y + player.height + player.velocity.y >= goombas[i].position.y
            &&
            player.position.x + player.width >= goombas[i].position.x
            &&
            player.position.x <= goombas[i].position.x + goombas[i].width) {
                player.velocity.y = -30; // Set a large negative velocity to make the player jump
                goombas[i].position.y += 1000; // Move the goomba off the screen
        } 
    }
       

    // Floor collision detection
    floors.forEach(floor => {
        if (player.position.y + player.height <= floor.position.y &&
            player.position.y + player.height + player.velocity.y >= floor.position.y &&
            player.position.x + player.width >= floor.position.x &&
            player.position.x <= floor.position.x + floor.width) {
            player.velocity.y = 0; // Stop the player's vertical velocity
            player.position.y = floor.position.y - player.height; // Adjust player's position to be exactly on top of the floor
        }
    });

    //stop player from going off screen to the left 
    if (player.position.x >= barrier.position.x &&
        player.position.x + player.velocity.x < barrier.position.x) {
            player.velocity.x = 0; // Stop the player's horizontal velocity
        }

    // lose condition
    if (player.position.y > canvas.height) {
        console.log("you lose");
        init() // Reset the game

    }
    //win condition
    tubes.forEach(tube => {
        if (
        player.position.x >= tube.position.x + 45 &&
        player.position.x + player.width <= tube.position.x + tube.width - 45 &&
        player.position.y + player.height == (tube.position.y + tube.height - 17)
        ) { 
            tube.position.y += .01 // move tube slightly down. This prevents the condition from being true. 
            console.log("you've won!")
            //window.alert("you've won!")
            if (window.location.href == "http://127.0.0.1:4000/levels/mario5") {// local host
                window.location.href = "http://127.0.0.1:4000/background1"
            }
            if (window.location.href == "https://samayass.github.io/mario1/levels/mario5") { // deployed site
                window.location.href = "https://samayass.github.io/mario1/background1"
            }
        }
    })
    

}

init()
animate()
console.log("im ANIMATING HERE")

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            // Left arrow key pressed
            //console.log('left')
            keys.left.pressed = true; // Set the left key as pressed
            break;
        case 83:
            // Down arrow key pressed
            //console.log('down')
            break;
        case 68:
            // Right arrow key pressed
            //console.log('right')
            keys.right.pressed = true; // Set the right key as pressed
            break;
        case 87:
            if (canJump) {
                // Up arrow key pressed and canJump is true
                //console.log('up')
                player.velocity.y -= 30; // Reduce the player's vertical velocity to make it jump
                canJump = false; // Set canJump to false to prevent multiple jumps in quick succession
                setTimeout("canJump = true", 300); // Set a timeout to reset canJump after 300 milliseconds
            }
            break;
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            // Left arrow key released
            //console.log('left')
            keys.left.pressed = false; // Set the left key as released
            break;
        case 83:
            // Down arrow key released
            //console.log('down')
            break;
        case 68:
            // Right arrow key released
            //console.log('right')
            keys.right.pressed = false; // Set the right key as released
            break;
        case 87:
            // Up arrow key released
            //console.log('up')
            break;
    }
});
