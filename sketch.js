let inc = 0.1;
let scale = 10;
let cols, rows;

let zoff = 0;

let fr;

let particles = [];
let flowField;

function setup() {
  createCanvas(1280, 720);
  cols = floor(width / scale);
  rows = floor(height / scale);

  fr = createP('');

  flowField = new Array(cols * rows);

  for (let i = 0; i < 10000; i++){
    particles[i] = new Particle();
  }
  background(255);
}



function draw() {

  let yoff = 0;
  for(let y = 0; y < rows; y++){
    let xoff = 0;
    for(let x = 0; x < cols; x++){
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += inc;
      // stroke(0, 50);
      // strokeWeight(1);
      // push();
      // translate(x * scale, y  * scale);
      // rotate(v.heading());
      // line(0, 0, scale, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0001;
  }

  for(let i = 0; i < particles.length; i++){
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  

  fr.html(floor(frameRate()));
}
