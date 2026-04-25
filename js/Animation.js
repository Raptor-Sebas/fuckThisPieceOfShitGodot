const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const SPRITE_W = 32;
const SPRITE_H = 32;

class SpriteAnimator {
    constructor(img, frames, fps = 6) {
        this.img = img;
        this.frames = frames;
        this.fps = fps;
        this.index = 0;
        this.acc = 0;
    }

    update(dt) {
        this.acc += dt;
        if (this.acc >= 1 / this.fps) {
            this.acc = 0;
            this.index = (this.index + 1) % this.frames.length;
        }
    }

    draw(ctx, x, y) {
        const f = this.frames[this.index];
        ctx.drawImage(
            this.img,
            f.sx, f.sy, SPRITE_W, SPRITE_H,
            x, y, SPRITE_W, SPRITE_H
        );
    }
}

const img = new Image();
img.src = 'fhero.png';

let idleAnim;
let lastTime = 0;

img.onload = () => {
    const idleFrames = [
        { sx: 0 * SPRITE_W, sy: 0 * SPRITE_H },
        { sx: 1 * SPRITE_W, sy: 0 * SPRITE_H },
        { sx: 2 * SPRITE_W, sy: 0 * SPRITE_H },
        { sx: 3 * SPRITE_W, sy: 0 * SPRITE_H },
    ];

    idleAnim = new SpriteAnimator(img, idleFrames, 6);
    requestAnimationFrame(loop);
};

function loop(ts) {
    const dt = (ts - lastTime) / 1000;
    lastTime = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (idleAnim) {
        idleAnim.update(dt);
        idleAnim.draw(ctx, canvas.width / 2 - SPRITE_W / 2, canvas.height / 2 - SPRITE_H / 2);
    }

    requestAnimationFrame(loop);
}
