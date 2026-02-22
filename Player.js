class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 3;
  }

  updateInput() {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    const len = max(1, abs(dx) + abs(dy));
    this.x += (dx / len) * this.s;
    this.y += (dy / len) * this.s;
  }

  draw() {
    let pulse = 150 + sin(frameCount * 0.08) * 80;
  
    noStroke();
    fill(200, 240, 255, pulse);
    ellipse(this.x, this.y, 20);
  
    fill(200, 240, 255, 60);
    ellipse(this.x, this.y, 40);
  }
}
