
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let gravity = 2
let hasJumped = true

const marioImage = new Image()
marioImage.src = '/levels/images/mario_animation.png'

class Player {
    constructor() {
        this.speed = 12
        this.position = {
            x: 100, 
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 70
        this.height = 80
         
    }

    draw() {
        const frameWidth = 165;  // Width of each frame in the sprite sheet
        const frameHeight = 250; // Height of each frame in the sprite sheet
        const frameX = 5;  // X-coordinate of the desired frame in the sprite sheet
        const frameY = 5; // Y-coordinate of the desired frame in the sprite sheet

        c.drawImage(marioImage, frameX, frameY, frameWidth, frameHeight, this.position.x, this.position.y, this.width, this.height);
    }


    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.draw()
       
        
        if (this.position.y + this.height <= canvas.height) {
            this.velocity.y += gravity; // Apply gravity if the block is not on the ground
            // this.position.y = canvas.height - this.height; // Set the position exactly on the ground
            
        } 
        else {
            // this.velocity.y = 0; // Reset the vertical velocity to zero
        }
        
    }
}
class Barrier {
    constructor() {
        this.position = {
            x: 0
        }
        this.velocity = {
            x: 0
        }
    }
    update() {
        this.position.x += this.velocity.x
    }
}

class Platform {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x,
            y
        }
        this.image = new Image()
        this.image.src = image
        this.width = width
        this.height = height
        this.velocity = {
            x: 0
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
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.position.x += this.velocity.x
        this.draw()
    }
}

class Floor {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x,
            y
        }
        this.image = new Image()
        this.image.src = image
        this.width = width
        this.height = height
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
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Hill {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x,
            y
        }
        this.image = new Image()
        this.image.src = image
        this.width = width
        this.height = height
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
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}
class Tube {
    constructor( { x, y, image, width, height } ) {
        this.position = {
            x,
            y
        }
        this.image = new Image()
        this.image.src = image
        this.width = width
        this.height = height
        this.velocity = {
            x: 0
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
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.position.x += this.velocity.x
        this.draw()
    }
}


const image = new Image()
//image.src = 'images/BrickBlock.png'

let player = new Player()
let hills = []
let platforms = []
let floors = []
let tubes = []
let barrier = new Barrier()

function init() {

    player = new Player()
    barrier = new Barrier()
    platforms = [
        new Platform( {
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
        } )]
    floors = [
        new Floor( {
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
        new Hill( {
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
        new Tube( {
            x: 3350, 
            y: 317,
            image: 'images/tube.png',
            width: 175,
            height: 200
        } )]

}

const keys = {
    right: {
        pressed: false
    }, 
    left: {
        pressed: false
    },
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'cornflowerblue'
    c.fillRect(0, 0, canvas.width, canvas.height)
    hills.forEach(hill => {
        hill.draw()
    })
    platforms.forEach(platform => {
        platform.update()
    }
    )
    floors.forEach(floor => {
        floor.draw()
    }
    )
    player.update()

    tubes.forEach(tube => {
        tube.update()
    })
    barrier.update()
    
    // if (player.velocity.y == 0) {
    //     hasJumped = true
    // }


    // console.log('Tube');
    // console.log(tubes[0].position.x + 45);
    
    // console.log('Player');
    // console.log(player.position.x + player.width);
    // console.log(player.velocity.x);

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
        platforms.forEach(platform => {
            platform.velocity.x = 0
        })
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
        barrier.velocity.x = -player.speed
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed
        platforms.forEach(platform => {
            platform.velocity.x = 0
        })
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
        barrier.velocity.x = player.speed
    }
    else {
        player.velocity.x = 0
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
        platforms.forEach(platform => {
            platform.velocity.x = 0
        })
        barrier.velocity.x = 0

        if (keys.right.pressed && !keys.left.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.velocity.x = -player.speed
            })
            floors.forEach(floor => {
                floor.position.x  -= player.speed
            })
            hills.forEach(hill => {
                hill.position.x  -= player.speed * .66
            })
            tubes.forEach(tube => {
                //tube.position.x  -= player.speed
                tube.velocity.x = -player.speed
            })
            barrier.velocity.x = -player.speed
        }
        else if (keys.left.pressed && !keys.right.pressed) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.velocity.x = player.speed
            })
            floors.forEach(floor => {
                floor.position.x  += player.speed
            })
            hills.forEach(hill => {
                hill.position.x  += player.speed
            })
            tubes.forEach(tube => {
                tube.velocity.x = player.speed
            })
            barrier.velocity.x = player.speed
        }
    }

    //console.log(scrollOffset)

    //platform collision detection
    platforms.forEach(platform => {
        //from top
        if (player.position.y + player.height <= platform.position.y 
            && 
            player.position.y + player.height + player.velocity.y >= platform.position.y
            &&
            player.position.x + player.width >= platform.position.x
            &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
        //from bottom
        if (player.position.y >= platform.position.y + platform.height 
            && 
            player.position.y + player.velocity.y <= platform.position.y + platform.height
            &&
            player.position.x + player.width >= platform.position.x
            &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
        //from left
        if (player.position.x + player.width <= platform.position.x + 10 // the '+ 10' is an arbitrary value to fix the hitbox
            && 
            player.position.x + player.width + player.velocity.x >= platform.position.x + platform.velocity.x + 10
            &&
            player.position.y + player.height >= platform.position.y
            &&
            player.position.y <= platform.position.y + platform.height) {
            player.velocity.x = 0
            player.position.x = platform.position.x - 5 - player.width
        }
        //from right
        if (player.position.x >= platform.position.x + platform.width - 10
            && 
            player.position.x + player.velocity.x <= platform.position.x + platform.width + platform.velocity.x - 10
            &&
            player.position.y + player.height >= platform.position.y
            &&
            player.position.y <= platform.position.y + platform.height) {
            player.velocity.x = 0
            player.position.x = platform.position.x + platform.width + 5
        }

    })
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

    // Floor collision detection
    floors.forEach(floor => {
        if (player.position.y + player.height <= floor.position.y 
            && 
            player.position.y + player.height + player.velocity.y >= floor.position.y
            &&
            player.position.x + player.width >= floor.position.x
            &&
            player.position.x <= floor.position.x + floor.width) {
            player.velocity.y = 0
            player.position.y = floor.position.y - player.height;
        }
    })

    //stop player from going off screen to the left 
    if (player.position.x >= barrier.position.x &&
        player.position.x + player.velocity.x < barrier.position.x) {
            player.velocity.x = 0;
        }
        console.log(barrier.position.x)
        console.log(player.position.x)

    // lose condition
    if (player.position.y > canvas.height) {
        console.log("you lose");
        init()
    }
    //win condition
    tubes.forEach(tube => {
        if (
        player.position.x >= tube.position.x + 45 &&
        player.position.x + player.width <= tube.position.x + tube.width - 45 &&
        player.position.y + player.height == (tube.position.y + tube.height - 17)
        ) { 
            tube.position.y += .01
            console.log("you've won!")
            //window.alert("you've won!")
            if (window.location.href == "http://127.0.0.1:4000/levels/mario5") {
                window.location.href = "http://127.0.0.1:4000/background1"
            }
            if (window.location.href == "https://samayass.github.io/mario1/levels/mario5") {
                window.location.href = "https://samayass.github.io/mario1/background1"
            }
            
            
        }
    })
    

}

init()
animate()
console.log("im ANIMATING HERE")

window.addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            //console.log('left')
            keys.left.pressed = true
        break
        case 83:
            //console.log('down')
        break 
        case 68:
            //console.log('right')
            keys.right.pressed = true
        break 
        case 87:
            if (hasJumped) {
                //console.log('up')
                player.velocity.y -= 30
                hasJumped = false
                setTimeout("hasJumped = true", 500);
            }
        break 
    }

}) 

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            //console.log('left')
            keys.left.pressed = false
        break
        case 83:
            //console.log('down')
        break 
        case 68:
            //console.log('right')
            keys.right.pressed = false
        break 
        case 87:
            //console.log('up')
        break 
    }
}) 