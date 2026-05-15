import React, { useEffect, useRef } from 'react';

const LavaLampBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let lava0;
    let animationFrameId;

    const screen = {
      width: 0,
      height: 0,
      resize: function () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        canvas.width = this.width;
        canvas.height = this.height;
        if (lava0) {
          lava0.width = this.width;
          lava0.height = this.height;
          lava0.wh = Math.min(this.width, this.height);
          lava0.sx = Math.floor(this.width / lava0.step);
          lava0.sy = Math.floor(this.height / lava0.step);
          // Re-init grid on resize to prevent index out of bounds
          lava0.initGrid();
        }
      }
    };

    // Point constructor
    const Point = function(x, y) {
      this.x = x;
      this.y = y;
      this.magnitude = x * x + y * y;
      this.computed = 0;
      this.force = 0;
    };

    Point.prototype.add = function(p) {
      return new Point(this.x + p.x, this.y + p.y);
    };

    // Ball constructor
    const Ball = function(parent) {
      const min = 0.1;
      const max = 1.5;
      this.vel = new Point(
        (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25), 
        (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
      );
      this.pos = new Point(
        parent.width * 0.2 + Math.random() * parent.width * 0.6,
        parent.height * 0.2 + Math.random() * parent.height * 0.6
      );
      this.size = (parent.wh / 15) + (Math.random() * (max - min) + min) * (parent.wh / 15);
      this.width = parent.width;
      this.height = parent.height;
    };

    Ball.prototype.move = function() {
      if (this.pos.x >= this.width - this.size) {
        if (this.vel.x > 0) this.vel.x = -this.vel.x;
        this.pos.x = this.width - this.size;
      } else if (this.pos.x <= this.size) {
        if (this.vel.x < 0) this.vel.x = -this.vel.x;
        this.pos.x = this.size;
      }

      if (this.pos.y >= this.height - this.size) {
        if (this.vel.y > 0) this.vel.y = -this.vel.y;
        this.pos.y = this.height - this.size;
      } else if (this.pos.y <= this.size) {
        if (this.vel.y < 0) this.vel.y = -this.vel.y;
        this.pos.y = this.size;
      }

      this.pos = this.pos.add(this.vel);
    };

    // LavaLamp constructor
    const LavaLamp = function(width, height, numBalls, c0, c1) {
      this.step = 5;
      this.width = width;
      this.height = height;
      this.wh = Math.min(width, height);
      this.sx = Math.floor(this.width / this.step);
      this.sy = Math.floor(this.height / this.step);
      this.paint = false;
      this.c0 = c0;
      this.c1 = c1;
      this.metaFill = this.createRadialGradient(width, height, width, c0, c1);
      this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
      this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
      this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
      this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
      this.grid = [];
      this.balls = [];
      this.iter = 0;
      this.sign = 1;

      this.initGrid();

      for (var k = 0; k < numBalls; k++) {
        this.balls[k] = new Ball(this);
      }
    };

    LavaLamp.prototype.initGrid = function() {
      this.sx = Math.floor(this.width / this.step);
      this.sy = Math.floor(this.height / this.step);
      this.grid = [];
      for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
        this.grid[i] = new Point(
          (i % (this.sx + 2)) * this.step, 
          (Math.floor(i / (this.sx + 2))) * this.step
        );
      }
      this.metaFill = this.createRadialGradient(this.width, this.height, this.width, this.c0, this.c1);
    };

    LavaLamp.prototype.createRadialGradient = function(w, h, r, c0, c1) {
      const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, r);
      gradient.addColorStop(0, c0);
      gradient.addColorStop(1, c1);
      return gradient;
    };

    LavaLamp.prototype.computeForce = function(x, y, idx) {
      var force;
      var id = idx || x + y * (this.sx + 2);

      if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
        force = 0.6 * this.sign;
      } else {
        force = 0;
        var cell = this.grid[id];
        var i = 0;
        var ball;
        while (ball = this.balls[i++]) {
          force += ball.size * ball.size / (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y + ball.pos.magnitude + cell.magnitude);
        }
        force *= this.sign;
      }
      if (this.grid[id]) this.grid[id].force = force;
      return force;
    };

    LavaLamp.prototype.marchingSquares = function(next) {
      var x = next[0];
      var y = next[1];
      var pdir = next[2];
      var id = x + y * (this.sx + 2);
      if (!this.grid[id] || this.grid[id].computed === this.iter) {
        return false;
      }
      var dir, mscase = 0;

      for (var i = 0; i < 4; i++) {
        var idn = (x + this.ix[i + 12]) + (y + this.ix[i + 16]) * (this.sx + 2);
        if (!this.grid[idn]) continue;
        var force = this.grid[idn].force;
        if ((force > 0 && this.sign < 0) || (force < 0 && this.sign > 0) || !force) {
          force = this.computeForce(x + this.ix[i + 12], y + this.ix[i + 16], idn);
        }
        if (Math.abs(force) > 1) mscase += Math.pow(2, i);
      }

      if (mscase === 15) {
        return [x, y - 1, false];
      } else {
        if (mscase === 5) dir = (pdir === 2) ? 3 : 1;
        else if (mscase === 10) dir = (pdir === 3) ? 0 : 2;
        else {
          dir = this.mscases[mscase];
          this.grid[id].computed = this.iter;
        }

        const g1 = this.grid[(x + this.plx[4 * dir + 2]) + (y + this.ply[4 * dir + 2]) * (this.sx + 2)];
        const g2 = this.grid[(x + this.plx[4 * dir + 3]) + (y + this.ply[4 * dir + 3]) * (this.sx + 2)];
        
        if (!g1 || !g2) return false;

        var ix = this.step / (
          Math.abs(Math.abs(g1.force) - 1) /
          Math.abs(Math.abs(g2.force) - 1) + 1
        );

        ctx.lineTo(
          this.grid[(x + this.plx[4 * dir]) + (y + this.ply[4 * dir]) * (this.sx + 2)].x + this.ix[dir] * ix,
          this.grid[(x + this.plx[4 * dir + 1]) + (y + this.ply[4 * dir + 1]) * (this.sx + 2)].y + this.ix[dir + 4] * ix
        );
        this.paint = true;
        return [x + this.ix[dir + 4], y + this.ix[dir + 8], dir];
      }
    };

    LavaLamp.prototype.renderMetaballs = function() {
      var i = 0, ball;
      while (ball = this.balls[i++]) ball.move();
      this.iter++;
      this.sign = -this.sign;
      this.paint = false;
      ctx.fillStyle = this.metaFill;
      ctx.beginPath();
      i = 0;
      while (ball = this.balls[i++]) {
        var next = [Math.round(ball.pos.x / this.step), Math.round(ball.pos.y / this.step), false];
        do {
          next = this.marchingSquares(next);
        } while (next);
        if (this.paint) {
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          this.paint = false;
        }
      }
    };

    const run = () => {
      animationFrameId = requestAnimationFrame(run);
      ctx.clearRect(0, 0, screen.width, screen.height);
      if (lava0) lava0.renderMetaballs();
    };

    screen.resize();
    // Premium Colors: Soft Gold to Ivory tones
    // c0: inner color, c1: outer color for radial gradient
    lava0 = new LavaLamp(screen.width, screen.height, 6, "#C4A55A", "#A0522D");

    window.addEventListener('resize', () => screen.resize());
    run();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', () => screen.resize());
    };
  }, []);

  return (
    <div className="lavalamp-wrapper">
      <canvas id="lavalamp-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default LavaLampBackground;
