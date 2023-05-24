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

        this.image = image
        this.width = 760
        this.height = 82
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

let image = new Image()
image.src = './images/platform.png'
console.log(image)

let image1 = new Image()
image1.src = './images/background.png'

let image2 = new Image()
image2.src = './images/hills.png'


let player = new Player()
let platforms = [
    new Platform({
        x: -1, 
        y: 500,
        image: image 
    }), 
    new Platform({
        x: 758 ,
        y: 500, 
        image: image
    }),
    new Platform({
        x: 1622,
        y: 500, 
        image: image
    }),
    new Platform({
        x: 2483,
        y: 500, 
        image: image
    }),
    new Platform({
        x: 4783,
        y: 500, 
        image: image
    })
]

let genericObjects = [
    new GenericObject({
        x:0, y:0, image: image1
    }),
    new GenericObject({
        x:0, y:0, image: image2
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

let scrollOffset = 0

function init()
{
    image = new Image()
    image.src = './images/platform.png'
    console.log(image)
    
    image1 = new Image()
    image1.src = './images/background.png'
    
    image2 = new Image()
    image2.src = './images/hills.png'
    
    
    player = new Player()
    platforms = [
        new Platform({
            x: -1, 
            y: 500,
            image: image 
        }), 
        new Platform({
            x: 758 ,
            y: 500, 
            image: image
        }),
        new Platform({
            x: 1622,
            y: 500, 
            image: image
        })
    ]
    
    genericObjects = [
        new GenericObject({
            x:0, y:0, image: image1
        }),
        new GenericObject({
            x:0, y:0, image: image2
        })
    ]

    
    scrollOffset = 0
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
    else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x>0) {
        player.velocity.x = -5;
    } 
    else  {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset +=5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -=3;
            })
        }
            else if (keys.left.pressed && scrollOffset >0) {
                scrollOffset -=5
                platforms.forEach(platform => {
                    platform.position.x +=5;
                })
                genericObjects.forEach(genericObject => {
                    genericObject.position.x +=3;
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

if (scrollOffset >2000){
    console.log('You win!')
}

if(player.position.y > canvas.height) {
    init()

}

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