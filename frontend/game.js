document.addEventListener('DOMContentLoaded', () => {
    // Game

    const width = 10;
    const height = 20;
    const grid = document.querySelector('.grid');
    let currentPos = 4;
    let block = Array.from(grid.querySelectorAll('div'));
    let timerId = null;

    // upcoming display
    const upcomingGrid = document.querySelector('.upcomingGrid');
    let upcomingSquares = Array.from(upcomingGrid.querySelectorAll('div'));
    // points displays
    let scoreDisplay = document.querySelector('.score');
    let linesDisplay = document.querySelector('.lines');
    let score = 0;
    let lines = 0;
    let currentIndex = 0;

    // start button
    const startBtn = document.querySelector('button');

    //  eventListeners
    // prevent defaults
    window.addEventListener("keydown", (e) => {
        // space and arrow keys
        if(['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', ' '].indexOf(e.key) > -1) {
            e.preventDefault();
        }
    });
    // controls
    const controls = (e) => {
        if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 38) {
            e.preventDefault();
            rotate();
        } else if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 40) {
            e.preventDefault();
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
        freezeTet();
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

    // freeze tetronimo
    const freezeTet = () => {
        if (current.some(index => block[currentPos + index + width].classList.contains('block3')
        || block[currentPos + index + width].classList.contains('block2'))) {
            current.forEach(index => block[index + currentPos].classList.add('block2'))

            randomTet = nextRandom;
            nextRandom = Math.floor(Math.random()*tetArray.length);
            current = tetArray[randomTet][currentRot];
            currentPos = 4;
            addScore();
            gameOver();
            drawTet();
            upDisplay();
            
        }
    };

    // Start game
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            drawTet();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*tetArray.length);
            upDisplay();
        }
    });

    // game over
    const gameOver = () => {
        if (current.some(index => block[currentPos + index].classList.contains('block2'))) {
            scoreDisplay.innerHTML = 'Game Over';
            clearInterval(timerId);
        }
    };

    const addScore = () => {
        for(currentIndex = 0; currentIndex < 199; currentIndex += width) {
            const row = [
                currentIndex, currentIndex+1, currentIndex+2, currentIndex+3, currentIndex+4,
                currentIndex+5, currentIndex+6, currentIndex+7, currentIndex+8, currentIndex+9,
            ]
            if (row.every(index => block[index].classList.contains('block2'))) {
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    block[index].classList.remove('block2') || block[index].classList.remove('block');
                })
                // splice array
                const blocksRemoved = block.splice(currentIndex, width);
                block = blocksRemoved.concat(block);
                block.forEach(cell => grid.appendChild(cell));
            }
        }
    }
})




