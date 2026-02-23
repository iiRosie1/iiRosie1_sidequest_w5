class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    // --- World size ---
    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;
    this.bg = json.world?.bg ?? [10, 10, 30];

    // --- Camera tuning ---
    this.camLerp = json.camera?.lerp ?? 0.05;

    // --- Hidden glowing symbols (dream memories) ---
    this.symbols = [];

    for (let i = 0; i < 12; i++) {
      this.symbols.push({
        x: random(200, this.w - 200),
        y: random(200, this.h - 200),
        discovered: false
      });
    }

    // --- Far star layer (tiny, distant stars) ---
    this.starsFar = [];

    for (let i = 0; i < 200; i++) {
      this.starsFar.push({
        x: random(this.w),
        y: random(this.h),
        size: random(1, 2)
      });
    }

    // --- Near star layer (brighter stars) ---
    this.starsNear = [];

    for (let i = 0; i < 100; i++) {
      this.starsNear.push({
        x: random(this.w),
        y: random(this.h),
        size: random(2, 4)
      });
    }
  }

  drawBackground() {
    // Deep space gradient
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(
        color(10, 10, 30),
        color(30, 0, 60),
        inter
      );
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawWorld() {

    // --- FAR STAR FIELD (slow parallax) ---
    noStroke();
    fill(255, 255, 255, 120);
    for (let s of this.starsFar) {
      ellipse(s.x, s.y, s.size);
    }
  
    // --- NEAR STAR FIELD (brighter) ---
    fill(255, 255, 255, 200);
    for (let s of this.starsNear) {
      ellipse(s.x, s.y, s.size);
    }
  
    // --- Nebula clouds ---
    for (let i = 0; i < 6; i++) {
      let nx = noise(i * 100);
      let ny = noise(i * 200);
  
      fill(120, 80, 200, 30);
      ellipse(
        nx * this.w,
        ny * this.h,
        500,
        400
      );
    }
  
    // --- Dream symbols (glowing stars) ---
    for (let s of this.symbols) {
      if (!s.discovered) {
        let pulse = 60 + sin(frameCount * 0.05) * 40;
  
        fill(180, 220, 255, 200);
        ellipse(s.x, s.y, 6);
  
        fill(180, 220, 255, pulse);
        ellipse(s.x, s.y, 20);
      }
    }
  }

  drawHUD(player, camX, camY) {
    noStroke();
    fill(255);
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
