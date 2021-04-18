/* ------ JavaScript - Game 5 - Sprite Animation ------ */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Load Images.
const images = {};
images.player = new Image();
images.player.src = 'cuphead.png'; // character.png
// Make Sprites move in different directions.
const characterActions = ['up', 'top right', 'right', 'down right', 'down'];
const numberOfCharacters = 20;
const characters = [];

class Character {
    constructor(){
        this.width = 103.0625; // cuphead.png = 103.0625 | character.png = 40 
        this.height = 113.125; // cuphead.png = 113.125 | character.png = 43.875
        this.frameX = 1;
        this.x = Math.random() * canvas.width - this.width;
        this.y = Math.random() * canvas.height - this.height;
        this.speed = (Math.random() * 2) + 6;
        this.minFrame = 0;
        this.action = characterActions[Math.floor(Math.random() * characterActions.length)];
        if (this.action === 'up') {
            this.frameY = 0; 
            this.minFrame = 4;
            this.maxFrame = 15;
        } 
        else if (this.action === 'top right') {
            this.frameY = 1;
            this.minFrame = 4;
            this.maxFrame = 14;
        } 
        else if (this.action === 'right') {
            this.frameY = 3;
            this.minFrame = 3;
            this.maxFrame = 13;
        } 
        else if (this.action === 'down right') {
            this.frameY = 4;
            this.minFrame = 4;
            this.maxFrame = 15;
        } 
        else if (this.action === 'down') {
            this.frameY = 6;
            this.minFrame = 0;
            this.maxFrame = 12;
        } 
    }
    draw(){
        drawSprite(images.player, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);
        // Animate Sprite
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
    }
    update(){
        if (this.action === 'up') {
            if (this.y < 0 - (this.height * 5)) {
                this.y = canvas.height + this.height;
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 6;
            } 
            else {
                this.y -= this.speed;
            } 
        } 
        else if (this.action === 'top right') {
            if (this.y < 0 - this.height && this.x > canvas.width + this.width) {
                this.y = canvas.height + this.height;
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 6;
            } else {
                this.y -= this.speed;
                this.x += this.speed;
            }
        } 
        else if (this.action === 'right') {
            if (this.x > canvas.width + (this.width * 5)) {
                this.x = 0 - this.width;
                this.y = Math.random() * canvas.height;
                this.speed = (Math.random() * 2) + 6;
            } else {
                this.x += this.speed;
            }
        } 
        else if (this.action === 'down right') {
            if (this.y > canvas.height + this.height && this.x > this.width + canvas.width) {
                this.y = 0 - this.height;
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 6;
            } else {
                this.y += this.speed;
                this.x += this.speed;
            }
        }  
        else if (this.action === 'down') {
            if (this.y > canvas.height + (this.height * 5)) {
                this.y = 0 - this.height;
                this.x = Math.random() * canvas.width;
                this.speed = (Math.random() * 2) + 6;
            } else {
                this.y += this.speed;
            }
        } 
    }
}
for (i = 0; i < numberOfCharacters; i++){
    characters.push(new Character());
}


// Draw the Sprites, s = source image, d = destination on canvas, this is the longest of the 3 drawImage methods.
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
// Animation Loop.
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (i = 0; i < characterActions.length; i++){
        characters[i].draw();
        characters[i].update();
    }

}

window.onload = setInterval(animate, 1000/13); // Frames per second. This animation should be played on two's around 12 frames per second.
// Resize window.
window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})