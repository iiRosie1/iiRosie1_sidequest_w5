class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 3;

    this.sparkles = [];
    this.sparkleTimer = 0;

    
  }

  triggerSparkle() {
    this.sparkleTimer = 60; // frames of sparkle
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
  
    // Player glow
    noStroke();
    fill(200, 240, 255, pulse);
    ellipse(this.x, this.y, 20);
  
    fill(200, 240, 255, 60);
    ellipse(this.x, this.y, 40);
  
    // Sparkle effect
    if (this.sparkleTimer > 0) {
      this.sparkleTimer--;
  
      for (let i = 0; i < 5; i++) {
        this.sparkles.push({
          x: this.x,
          y: this.y,
          vx: random(-2, 2),
          vy: random(-2, 2),
          life: 30
        });
      }
    }
  
    // Update sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      let sp = this.sparkles[i];
  
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life--;
  
      fill(255, 255, 255, sp.life * 8);
      ellipse(sp.x, sp.y, 4);
  
      if (sp.life <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  }
}
