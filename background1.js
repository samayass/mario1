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

        this.width = 540
        this.height = 160
        
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class BlockObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image

        this.width = 158
        this.height = 79
        
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
image2.src = './images/hills2.png'

let image3 = new Image()
image3.src = './images/box.png'



let player = new Player()

let blockObjects = [
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
        x: 1800, y: 100, image:image3
    }),
]

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
        x: 540*5, y: 450, image
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


]


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
    image2.src = './images/hills2.png'
    
    image3 = new Image()
    image3.src = './images/box.png'


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
            x: 1800, y: 100, image:image3
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
            x: 540*3 +100 , y: 450, image
        }),
        new Platform({
            x: 540*4, y: 450, image
        }),
        new Platform({
            x: 540*5, y: 450, image
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
    
    
    keys = {
        right: {
            pressed:false
        },
        left: {
            pressed:false
        }
    }
    
    scrollOffset = 0
}



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.clearRect(0,0, canvas.width, canvas.height)
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    blockObjects.forEach(blockObject => {
        blockObject.draw()
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
                genericObject.position.x -=2;
            })
            blockObjects.forEach(blockObject => {
                blockObject.position.x -=5;
            })

    
        }
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
blockObjects.forEach(blockObject => {
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
            player.velocity.y -= 10
            break
    }
}) 