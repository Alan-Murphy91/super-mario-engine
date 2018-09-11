
setup = () => {
    createCanvas(960,600);
}

draw = () => {
    topDetect = 0;
    bottomDetect = 0;
    leftDetect = 0;
    rightDetect = 0;
    clear();
    background(200);
    for(let x=0; x<blocks.length; x++) {
        //only draw whats on the screen
         if(blocks[x].x < 960 && blocks[x].x > -40) {
            blocks[x].show();
            blocks[x].detectMario();
            blocks[x].detectEnemy();
            blocks[x].showCentre();
            blocks[x].showLanding();
            blocks[x].fixBug();
            blocks[x].fixBug2();
            blocks[x].fixBug3();
        }
        if(enemies[x]) {
            if(enemies[x].x < 960 && enemies[x].x > -40) {
                enemies[x].show();
                enemies[x].randomMove();
                enemies[x].detectMario();
                enemies[x].topDetect();
            }
        }
        if(mario.isJumping) {
            blocks[x].marioContact = false;
        }
    }

    // ----------a lot of loops :(    ---need to make this more efficient. initial loop needs
    //to finish to see if a block detects hit. use binary search?

    if((keyIsDown(RIGHT_ARROW) && leftDetect == 0 && !mario.isAnimating) || ((stopRightOne || stopRightTwo || stopRightThree || stopRightFour) && !mario.isAnimating && leftDetect == 0)) {
        if(currentPos < 0) {
            mario.x += 5;
            currentPos += 5;
        } else {
        //mapOffset += 5;
        if(blocksRightOne) {
            mapOffset += 1;
        }
        else if(blocksRightTwo) {
            mapOffset += 2;
        }
        else if(blocksRightThree) {
            mapOffset += 3;
        }
        else if(blocksRightFour) {
            mapOffset += 4;
        }
        else if(stopRightOne) {
            mapOffset += 1;
        }
        else if(stopRightTwo) {
            mapOffset += 2;
        }
        else if(stopRightThree) {
            mapOffset += 3;
        }
        else if(stopRightFour) {
            mapOffset += 4;
        }
        }

        for(let x=0; x<blocks.length; x++) {
                if(currentPos == 0) {
                    blocks[x].goLeft(x);
                }
                if(enemies[x]) {
                    if(currentPos == 0) {
                        enemies[x].goLeft();
                    }
                }
        }
    }
    if((keyIsDown(LEFT_ARROW) && rightDetect == 0 && !mario.isAnimating) || ((marioStopLOne || marioStopLTwo || marioStopLThree || marioStopLFour) && !mario.isAnimating && leftDetect == 0)) {
        if(currentPos > -440) {
            if(marioLeftOne) {
                //console.log('1');
                mapOffset -= 1;
                currentPos -= 1;
                marioLeftOneN += 1;
                mario.x -=1;
                if(marioLeftOneN >= 10){
                    marioLeftTwo = true;
                    marioLeftOne = false;
                    marioLeftOneN = 0;
                }
            }
            else if(marioLeftTwo) {
                //console.log('2');
                mapOffset -= 2;
                currentPos -= 2;
                marioLeftTwoN += 1;
                mario.x -=2;
                if(marioLeftTwoN >= 10){
                    marioLeftThree = true;
                    marioLeftTwo = false;
                    marioLeftTwoN = 0;
                }
            }
            else if(marioLeftThree) {
                //console.log('3');
                mapOffset -= 3;
                currentPos -= 3;
                marioLeftThreeN += 1;
                mario.x -=3;
                if(marioLeftThreeN >= 10){
                    marioLeftFour = true;
                    marioLeftThree = false;
                    marioLeftThreeN = 0;
                }
            }
            else if(marioLeftFour) {
                //console.log('4');
                mapOffset -= 4;
                currentPos -= 4;
                marioLeftFourN += 1;
                mario.x -=4;
                if(marioLeftFourN >= 10){
                    marioLeftSprint = true;
                    marioLeftFour = false;
                    marioLeftFourN = 0;
                }
            }
            else if(marioLeftSprint) {
                //console.log('5');
                mario.x -=5;
            }
            else if(marioStopLOne) {
                console.log('aa');
                marioStopLOneN += 1;
                mario.x -=1;
                if(marioStopLOneN >= 5){
                    marioStopLOne = false;
                    marioStopLOneN = 0;
                    marioLeftOneN = 0;
                }
            }
            else if(marioStopLTwo) {
                console.log('bb');
                marioStopLTwoN += 1;
                mario.x -=2;
                if(marioStopLTwoN >= 5){
                    marioStopLOne = true;
                    marioStopLTwo = false;
                    marioStopLTwoN = 0;
                    marioLeftTwoN = 0;
                }
            }
            else if(marioStopLThree) {
                console.log('cc');
                marioStopLThreeN += 1;
                mario.x -=3;
                if(marioStopLThreeN >= 5){
                    marioStopLTwo = true;
                    marioStopLThree = false;
                    marioStopLThreeN = 0;
                    marioLeftThreeN = 0;
                }
            }
            else if(marioStopLFour) {
                console.log('dd');
                marioStopLFourN += 1;
                mario.x -=4;
                if(marioStopLFourN >= 5){
                    marioStopLThree = true;
                    marioStopLFour = false;
                    marioStopLFourN = 0;
                    marioLeftFourN = 0;
                }
            }
        }
    }
    if(topDetect > 0 && !mario.isAnimating) {
        mario.isFalling = false;
    } else if(bottomDetect > 0) {
        mario.isJumping = false;
        mario.isFalling = true;
    } else {
        if(!mario.isJumping) {
            mario.isFalling = true;
        }
    }

    mario.show();
    mario.showCentre();

    // ------  jumping  ------- //
    if(mario.isJumping) {
        if(jumpDistance <= 0) {
            mario.isJumping = false;
            mario.isFalling = true;
        }
        jumpDistance -=5;
        mario.y -=5;
    }
    // ------  falling  ------- //
    if(mario.isFalling) {
        mario.y +=5;
    }

    // ----- reset ----- //
    if(mario.y > 640) {
        noLoop();
        clear();
        background(200);
        for(let x=0; x<blocks.length; x++) {
            blocks[x].x += mapOffset;
            blocks[x].show();
            blocks[x].showCentre();
            blocks[x].booped = false;
            if(enemies[x]) {
                enemies[x].x = enemies[x].originX;
                enemies[x].y = enemies[x].originY;
                enemies[x].steps = 100;
                enemies[x].show();
                enemies[x].fainted = false;
            }
        }
        mapOffset = 0;
        mario.x = 11*blockSize;
        mario.y = 12*blockSize;
        mario.isJumping = false;
        mario.isFalling = false;
        mario.isAnimating = false;
        mario.show();
        mario.showCentre();
        setTimeout(() => {
            loop();
        },50)
    }
}

keyPressed = () => {
    if(keyCode == 32) {
        if(!mario.isFalling && !mario.isJumping){
            mario.isJumping = true;
            jumpDistance = 200;
        }
    }
}

keyReleased = () => {
    if(keyCode == 39) {
        if(blocksRightOne && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            stopRightOne = true;
            blocksRightOne = false;
            //console.log('a');
        }
        else if(blocksRightTwo && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            stopRightTwo = true;
            blocksRightTwo = false;
            //console.log('b');
        }
        else if(blocksRightThree && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            stopRightThree = true;
            blocksRightThree = false;
            //console.log('c');
        }
        else if(blocksRightFour && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            stopRightFour = true;
            blocksRightFour = false;
            //console.log('e');
        }
        else if(sprint && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            stopRightFour = true;
            sprint = false;
            //console.log('e');
        }
    }
    if(keyCode == 37) {
        if(marioLeftOne && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            marioStopLOne = true;
            marioLeftOne = false;
            console.log('a');
        }
        else if(marioLeftTwo && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            marioStopLTwo = true;
            marioLeftTwo = false;
            console.log('b');
        }
        else if(marioLeftThree && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            marioStopLThree = true;
            marioLeftThree = false;
            console.log('c');
        }
        else if(marioLeftFour && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            marioStopLFour = true;
            marioLeftFour = false;
            console.log('e');
        }
        else if(marioLeftSprint && leftDetect == 0 && rightDetect == 0 && !mario.isAnimating) {
            marioStopLFour = true;
            marioLeftSprint = false;
            console.log('e');
        }
    }
}
  
