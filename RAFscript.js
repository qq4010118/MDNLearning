const spinner = document.querySelector('div');
let rotateCount = 0;
let startTime = null;
let rAF;
let bodyDOM = document.querySelector('body');
let spin = false;

function draw(timestamp) {
    spin = true;
    
    if (!startTime) {
       startTime = timestamp;
    }
     
    rotateCount = (timestamp - startTime)/2;

    if (rotateCount > 359) {
       rotateCount %= 360;
    }
    spinner.style.transform = `rotate(${rotateCount}deg)`;
    rAF = requestAnimationFrame(draw);
    
    
}

function stop(){
    spin = false;
    cancelAnimationFrame(rAF);
}

bodyDOM.addEventListener('click', () => {
    if(!spin){
       draw();
    } else{
       stop();
    }
});
