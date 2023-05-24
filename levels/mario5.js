
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 2
class Player {
    constructor() {
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
        
        if (this.position.y + this.height >= canvas.height) {
            this.position.y = canvas.height - this.height; // Set the position exactly on the ground
            this.velocity.y = 0; // Reset the vertical velocity to zero
        } else {
            this.velocity.y += gravity; // Apply gravity if the block is not on the ground
        }
        
    }
}

class Platform {
    constructor( { x, y } ) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [new Platform( {x: 200, y: 400} ), new Platform( {x: 300, y: 600} )]

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
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    }
    else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x  -= 5
            })
        }
        else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x  += 5
            })
        }
    }

    console.log(scrollOffset)

    //platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y 
            && 
            player.position.y + player.height + player.velocity.y >= platform.position.y
            &&
            player.position.x + player.width >= platform.position.x
            &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    if (scrollOffset >= 200) {
        console.log('you win')
    }
}

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