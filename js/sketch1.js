//Global variables
var nervousBall = [];
var blackWhole;

function setup(){
    createCanvas(800,800);
    colorMode(HSB, 360, 100, 100, 100);
    for (var i = 0; i < 30; i++) {
        nervousBall.push(new Jitter())  //Making a loop of objects, pushing 30 balls into the jitter class
    }
    //nervousBall = new Jitter(); (This line creates single the object)


    blackWhole = createVector(400,400);
}

//Making a class containing rules for the object
function Jitter(){
    //Properties
    this.position =createVector(random(0,width), random(0,height));
   // this.x = random(0, width);
   // this.y = random(0, height);
    this.diameter = 50;
    this.speed = random(2, 10);
    this.fill = random(0, 360);
    this.panic = false;
    this.direction = createVector(random(-3,3), (-3,3));

    //Functions
    this.display = function(){
        if (this.panic == false){
            this.diameter = 20;
            }
        else {
            this.diameter = 80
        }

        ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
        fill(this.fill, 100, 100);
    }

    this.update = function() {
        this.position = this.position.add(this.direction);
        if (this.position.x > width){
            this.position.x = 0;
        }
         if (this.position.x < 0){
            this.position.x = width;
        }
         if (this.position.y > height){
            this.position.y = 0;
        }
          if (this.position.y < 0){
            this.position.y = height;
        }
        //this.position.x = this.position.x + random (-this.speed, this.speed);
        //this.position.y = this.position.y + random (-this.speed, this.speed);
        // this.speed = this.speed + random (2, 10);
       // this.fillcolor = this.fillcolor + random(0, 360);
    }

    this.calculateDistance = function(){
        var distance = this.position.dist(blackWhole);
        if (distance < 100){
            this.panic = true;
        }
        else{
            this.panic = false;
        }
    }
}


function draw(){
    //background(100);
    fill(0,100,100,10);
    rect(0,0,width,height);
    for (var i = 0; i < 30; i++) {
    nervousBall[i].display();
    nervousBall[i].update();
    nervousBall[i].calculateDistance();
}
    fill(0)
    ellipse(blackWhole.x, blackWhole.y, 100, 100);
}