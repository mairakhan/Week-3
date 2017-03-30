function setup() {
    createCanvas(500, 500);
}

function draw() {
    noStroke();
    colorMode(HSB, 100);

    //Using nested loops (loop within a loop) to draw a 2D grid of 50x50 squares where each square's dimension is 10x10 pixels.
    //A single run of the inner loop (from j=0 to j=49) will draw a single column of 50 squares.
    //Since we need to draw 50 such columns to complete our 50x50 grid, we run the inner loop inside an outer loop.
    //So, each of the 50 iterations (from i=0 to i=49) of the outer loop will draw a single column of 50 squares.

    //Here's how the values of i and j will change as the nested loops execute:
    //  i=0, j=0
    //  i=0, j=1
    //  i=0, j=2
    //  .
    //  .
    //  i=0, j=49
    //  i=1, j=0
    //  i=1, j=1
    //  i=1, j=2
    //  .
    //  .
    //  i=1, j=49
    //  i=2, j=0
    //  .
    //  .
    //  .
    //  .
    //  i=49, j=49

    //Outer loop: runs from i=0 to i=49
    for (var i = 0; i < 50; i++) {
        //Inner loop: runs from j=0 to j=49
        for (var j = 0; j < 50; j++) {
            //Following lines of code will draw a single 10x10 pixels square.

            //The square's fill color is specified as Hue, Saturation, and Brightness values.
            //Brightness is a constant value 100 whereas Hue and Saturation are calculated 
            //  using the current values of loop variables i and j, thus giving each square a different color.
            fill(i * 2, j * 2, 100); //Hue, Saturation, Brightness
            
            //Using rect() function to draw the square
            rect(i * 10, j * 10, 10, 10); //Square's x position, y position, width, and height
        }
    }
}