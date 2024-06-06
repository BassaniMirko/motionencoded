const density = "Ñ@#W$9876543210?!abc;:+=-,._       ";

let video;
let asciiDiv;
let can;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(68 * 2, 48 * 2);
  asciiDiv = createDiv();
  can = createGraphics(68, 24);
}

function draw() {
  can.push();
  can.translate(can.width, 0);  // Move the origin point to the right edge
  can.scale(-1, 1);             // Flip the canvas horizontally
  can.image(video, 0, 0, can.width, can.height);
  can.pop();
  can.loadPixels();

  const d = 2;

  let asciiImage = '';
  for (let j = 0; j < can.height * d; j++) {
    for (let i = 0; i < can.width * d; i++) {
      const pixelIndex = (i + j * can.width * d) * 4;
      const r = can.pixels[pixelIndex + 0];
      // const g = can.pixels[pixelIndex + 1];
      // const b = can.pixels[pixelIndex + 2];
      // const avg = (r + g + b) / 3;
      const avg = r;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") {
        asciiImage += '<span style="color: rgb(255,255,255);">&nbsp;</span>'; // Change the glyph color to white
      } else {
        asciiImage += '<span style="color: rgb(255,255,255);">' + c + '</span>'; // Change the glyph color to white
      }
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
