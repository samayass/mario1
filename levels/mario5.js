
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 2
class Player {
    constructor() {
        this.speed = 15
        this.position = {
            x: 100, 
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
         
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if (this.position.y + this.height <= canvas.height) {
            this.velocity.y += gravity; // Apply gravity if the block is not on the ground
            // this.position.y = canvas.height - this.height; // Set the position exactly on the ground
            
        } 
        else {
            // this.velocity.y = 0; // Reset the vertical velocity to zero
        }
        
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


const image = new Image()
//image.src = 'images/BrickBlock.png'

let player = new Player()
let hills = []
let platforms = []
let floors = []

function init() {

    player = new Player()
    platforms = [
        new Platform( {
            x: 50, 
            y: 300,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ), 
        new Platform( {
            x: 130, 
            y: 250,
            image: 'images/BrickBlock.png',
            width: 80,
            height: 80
        } ),
        new Platform( {
            x: 880, 
            y: 300,
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
        platform.draw()
    }
    )
    floors.forEach(floor => {
        floor.draw()
    }
    )
    
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed
    }
    else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x  -= player.speed
            })
            floors.forEach(floor => {
                floor.position.x  -= player.speed
            })
            hills.forEach(hill => {
                hill.position.x  -= player.speed * .66
            })
        }
        else if (keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x  += player.speed
            })
            floors.forEach(floor => {
                floor.position.x  += player.speed
            })
            hills.forEach(hill => {
                hill.position.x  += player.speed * .66
            })
        }
    }

    console.log(scrollOffset)

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
            player.position.x + player.width + player.velocity.x >= platform.position.x + 10
            &&
            player.position.y + player.height >= platform.position.y
            &&
            player.position.y <= platform.position.y + platform.height) {
            player.velocity.x = 0
        }
        //from right
        if (player.position.x >= platform.position.x + platform.width - 10
            && 
            player.position.x + player.velocity.x <= platform.position.x + platform.width - 10
            &&
            player.position.y + player.height >= platform.position.y
            &&
            player.position.y <= platform.position.y + platform.height) {
            player.velocity.x = 0
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

    // win condition
    if (scrollOffset >= 2000) {
        console.log('you win')
    }

    // lose condition
    if (player.position.y > canvas.height) {
        console.log("you lose");
        init()
    }

}

init()
animate()

window.addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
        break
        case 83:
            console.log('down')
        break 
        case 68:
            console.log('right')
            keys.right.pressed = true
        break 
        case 87:
            console.log('up')
            player.velocity.y -= 30
        break 
    }

}) 

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
        break
        case 83:
            console.log('down')
        break 
        case 68:
            console.log('right')
            keys.right.pressed = false
        break 
        case 87:
            console.log('up')
        break 
    }
}) 