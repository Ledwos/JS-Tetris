document.addEventListener('DOMContentLoaded', () => {
    // Game

    const width = 10;
    const height = 20;
    const grid = document.querySelector('.grid');
    let currentPos = 4;
    let block = Array.from(grid.querySelectorAll('div'));

    // upcoming display
    const upcomingGrid = document.querySelector('.upcomingGrid');
    let upcomingSquares = Array.from(upcomingGrid.querySelectorAll('div'));

    //  eventListeners
    const controls = (e) => {
        if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    };
    
    document.addEventListener('keyup', controls);

    // Tetrominoes 
    const lTet = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]
    
      const zTet = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
      const tTet = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTet = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTet = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]

    const tetArray = [lTet, zTet, tTet, oTet, iTet];

    // random select tetromino
    let randomTet = Math.floor(Math.random()*tetArray.length);
    let currentRot = 0;
    let current = tetArray[randomTet][currentRot];

    // tetronimo motion... tetronimotion :p
    const moveDown = () => {
        undrawTet();
        currentPos = currentPos += width;
        drawTet();
        // freeze();
    }

    const moveRight = () => {
        undrawTet();
        const atRightEdge = current.some(index => (currentPos + index) % width === width - 1)
        if (!atRightEdge) currentPos += 1
        if (current.some(index => block[currentPos + index].classList.contains('block2'))) {
            currentPos -= 1;
        };
        drawTet();
    }

    const moveLeft = () => {
        undrawTet();
        const atLeftEdge = current.some(index => (currentPos + index) % width === 0)
        if(!atLeftEdge) currentPos -= 1;
        if(current.some(index => block[currentPos + index].classList.contains('block2'))) {
            currentPos += 1;
        };
        drawTet();
    }

    // rotate tetronimo
    const rotate = () => {
        undrawTet();
        currentRot ++;
        if (currentRot === current.length) {
            currentRot = 0;
        }
        current = tetArray[randomTet][currentRot];
        drawTet();
    }
    
    // draw tetronimo
    const drawTet = () => {
        current.forEach( index => {
            block[currentPos + index].classList.add('block');
        })
    }

    // undraw tetronimo
    const undrawTet = () => {
        current.forEach(index => {
            block[currentPos + index].classList.remove('block');
        })
    }
    
    // test connection:
    let test = 'true';
    
    let connectStr = document.querySelector('#connectStr');
    connectStr.innerHTML = test;

    drawTet();

    // show upcoming tetronimo
    const upWidth = 4;
    const upIndex = 0;
    const upHeight = 4;
    
    // upcoming shape array
    let upTetArray = [
        [1, upWidth+1, upWidth*2+1, 2],
        [0,upWidth,upWidth+1,upWidth*2+1],
        [1,upWidth,upWidth+1,upWidth+2],
        [0,1,upWidth,upWidth+1],
        [1,upWidth+1,upWidth*2+1,upWidth*3+1],
    ]

    // random shape
    let nextRandom = 0;

    // display upcoming shape in grid
    const upDisplay = () => {
        upcomingSquares.forEach(square => {
            square.classList.remove('block');
        });
        upTetArray[nextRandom].forEach( index => {
            upcomingSquares[upIndex + index].classList.add('block');
        })
    };

    upDisplay();
})




