const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width =  document.body.clientWidth;
// canvas.height = document.body.clientHeight;

canvas.width =  1024
canvas.height = 576

const gravity = 1.5;

class Player {
    constructor() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x:0,
            y:0
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
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}



class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image

        this.width = 761
        this.height = 83
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image1
        this.width = 760
        this.height = 82
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const image = new Image()
image.src = './images/platform.png'
console.log(image)

const image1 = new Image()
image1.src = './images/background.png'

const image2 = new Image()
image2.src = './images/hills.png'


const player = new Player()
const platforms = [new Platform({
    x: 0, y: 500, image 
}), new Platform({
    x: 761, y: 500, image
}),
]

const genericObjects = [
    new GenericObject({
        x:0, y:0, image1
    })
]

const keys = {
    right: {
        pressed:false
    },
    left: {
        pressed:false
    }
}



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.clearRect(0,0, canvas.width, canvas.height)
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } 
    else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } 
    else  {
        player.velocity.x = 0
        if (keys.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        }
            else if (keys.left.pressed) {
                platforms.forEach(platform => {
                    platform.position.x +=5;
                })
            }
    }

//platform collisions
platforms.forEach(platform => {
    if(player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x
        && player.position.x <= platform.position.x + platform.width) 
        {
        player.velocity.y = 0;
    }
})

}

animate()

addEventListener('keydown', ({keyCode}) => {
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
            player.velocity.y -= 20
            break
    }

}) 

addEventListener('keyup', ({keyCode}) => {
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
            player.velocity.y -= 20
            break
    }
}) 