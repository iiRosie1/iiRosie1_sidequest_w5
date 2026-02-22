class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;
    this.bg = json.world?.bg ?? [235, 235, 235];
    this.gridStep = json.world?.gridStep ?? 160;

    this.obstacles = json.obstacles ?? [];

    // NEW: camera tuning knob from JSON (data-driven)
    this.camLerp = json.camera?.lerp ?? 0.12;

    this.mistDots = [];

    for (let i = 0; i < 120; i++) {
      this.mistDots.push({
        x: random(this.w),
        y: random(this.h),
        size: random(2, 6),
        speed: random(0.1, 0.4)
      });
    }

    this.symbols = [];

    for (let i = 0; i < 12; i++) {
      this.symbols.push({
        x: random(200, this.w - 200),
        y: random(200, this.h - 200),
        discovered: false
      });
    }
  }

  drawBackground() {
    background(220);
  }

  drawWorld() {
    noStroke();
    fill(this.bg[0], this.bg[1], this.bg[2]);
    rect(0, 0, this.w, this.h);
  
    // Soft grid (fainter than before)
    stroke(240);
    for (let x = 0; x <= this.w; x += this.gridStep)
      line(x, 0, x, this.h);
    for (let y = 0; y <= this.h; y += this.gridStep)
      line(0, y, this.w, y);
  
    // Floating mist particles
    noStroke();
    fill(255, 255, 255, 40);
  
    for (let dot of this.mistDots) {
      dot.y += dot.speed;
  
      if (dot.y > this.h) {
        dot.y = 0;
        dot.x = random(this.w);
      }
  
      ellipse(dot.x, dot.y, dot.size);
    }
  
    // Obstacles (make softer)
    fill(180, 200, 220, 160);
    for (const o of this.obstacles)
      rect(o.x, o.y, o.w, o.h, o.r ?? 0);
  
    // Hidden symbols
    for (let s of this.symbols) {
      if (!s.discovered) {
        fill(255, 220, 120, 180);
        ellipse(s.x, s.y, 8);
  
        fill(255, 220, 120, 60 + sin(frameCount * 0.05) * 40);
        ellipse(s.x, s.y, 20);
      }
    }
  }

  drawHUD(player, camX, camY) {
    noStroke();
    fill(20);
    text("Week 5 Sidequest", 12, 20);
    text(
      "camLerp(JSON): " +
        this.camLerp +
        "  Player: " +
        (player.x | 0) +
        "," +
        (player.y | 0) +
        "  Cam: " +
        (camX | 0) +
        "," +
        (camY | 0),
      12,
      40,
    );
  }
}
