function setup() {
    createCanvas(600, 600);
    noLoop();
}

function draw() {
    noStroke();

    //Outer loop
    for (var i = 0; i < 20; i++) {
        //Inner loop
        for (var j = 0; j < 20; j++) {
            var x = (i * 30) + 15;
            var y = (j * 30) + 15;

            //Calculate an 'intensity' value based on the circle's distance from current mouse position.
            //This intensity value will be used to set the size and fill color of the circle.

            var distanceFromMouse;
            var intensity = 1;

            //Calculating distance from mouse pointer using the dist() function.
            //Since distance can come out to be a negative value, using abs() function to get the absolute value.
            distanceFromMouse = abs(dist(x, y, mouseX, mouseY));
            
            //848 is the maximum distance that a circle could be from the mouse pointer on a 600x600 canvas. (Pythagoras theorem)
            intensity = distanceFromMouse / 848;


            //Clear previous drawing by drawing a white circle
            fill(255, 255, 255);
            ellipse(x, y, 30, 30);

            //Finally, draw the circle
            //The circle's fill color and size is based on the intensity value.
            var gray = 255 * intensity;
            fill(gray, gray, gray);
            ellipse(x, y, 30 * intensity, 30 * intensity); //Circle's x position, y position, width, and height
        }
    }
}

function mouseMoved() {
    redraw();
}