const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let gravity = 2;

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
        this.width = 40
        this.height = 60

        this.image = image8
        this.frames = 0;
        this.sprites = {
            stand: {
                right: image8
            },
            run: {
                right: image6
            }
        }

        this.speed = 15

        this.currentSprite = this.sprites.stand.right
    }
    draw() {
        c.drawImage(this.currentSprite, 
            25*this.frames, 
            0,
            24, 
            42,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
    }
    update() {
        this.frames ++
        if (this.frames > 8) 
        this.frames = 0;
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        
    }
}


class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    };
    this.image = image;

    this.width = 540;
    this.height = 160;
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

    this.width = 158;
    this.height = 79;
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
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

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
        x: 540*5+200, y: 450, image
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
            x: 540*3 + 100, y: 450, image
        }),
        new Platform({
            x: 540*4, y: 450, image
        }),
        new Platform({
            x: 540*5+200, y: 450, image
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
    tubes.forEach(tube => {
        tube.update()
    })
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
    } 
    else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x>0) {
        player.velocity.x = -player.speed
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })
    } 
    else  {
        player.velocity.x = 0
        tubes.forEach(tube => {
            tube.velocity.x = 0
        })

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -=2;
            })
            blockObjects.forEach(blockObject => {
                blockObject.position.x -=player.speed;
            })
            tubes.forEach(tube => {
                //tube.position.x  -= player.speed
                tube.velocity.x -=player.speed
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
                tubes.forEach(tube => {
                    tube.velocity.x += player.speed
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
            player.currentSprite = player.sprites.run.right

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