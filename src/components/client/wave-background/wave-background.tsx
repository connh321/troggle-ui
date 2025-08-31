'use client';
import { useEffect, useRef } from 'react';

/**
 * Animated wave background with stars, planets, and a moon.
 * Renders into a full-screen canvas.
 */
const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Colors
    const darkColor = '#1a1b2c';
    const mainColor = '#2e2a4f';
    const waveAccentColor = '#b291ff';
    const starColors = ['#ffffff', '#d6c7ff', '#a88cff'];

    // Animation state
    let t = 0;
    let particles: Particle[] = [];

    /** Particle definition */
    type Particle = {
      x: number;
      y: number;
      size: number;
      dx: number;
      dy: number;
      opacity: number;
      opacitySpeed: number;
      color: string;
    };

    /** Create stars/particles */
    const createParticles = () => {
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.8 + 0.2,
        opacitySpeed: Math.random() * 0.02 + 0.01,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      }));
    };

    /** Draw a small star as a pixel */
    const drawPixelStar = (
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
    ) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fillRect(x, y, size, size);
      ctx.globalAlpha = 1;
    };

    /** Draw the moon */
    const drawMoon = () => {
      const moonX = width * 0.725;
      const moonY = height * 0.15;
      const moonRadius = 60;

      const gradient = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.1,
        moonX,
        moonY,
        moonRadius,
      );
      gradient.addColorStop(0, '#f5f3ff');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    /** Draw planets */
    const drawPlanets = () => {
      // Planet 1 - left
      ctx.fillStyle = '#ff9999';
      ctx.beginPath();
      ctx.arc(width * 0.1, height * 0.3, 30, 0, Math.PI * 2);
      ctx.fill();

      // Planet 2 - right
      const planetX = width * 0.9;
      const planetY = height * 0.7;
      const planetRadius = 40;

      ctx.fillStyle = '#99ccff';
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
      ctx.fill();

      // Ring
      ctx.strokeStyle = '#88bbff50';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(
        planetX,
        planetY,
        planetRadius * 1.5,
        planetRadius * 0.4,
        Math.PI / 4,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    };

    /** Draw waves */
    const drawWaves = () => {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
        const y =
          Math.sin(x * 0.01 + t / 70) * 45 +
          Math.cos(x * 0.005 + t / 45) * 25 +
          height / 2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const waveGrad = ctx.createLinearGradient(0, height / 2, 0, height);
      waveGrad.addColorStop(0, waveAccentColor + '30');
      waveGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = waveGrad;
      ctx.fill();
    };

    /** Draw background gradient */
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, darkColor);
      gradient.addColorStop(1, mainColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    /** Draw the frame */
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      drawBackground();
      drawWaves();

      // Stars
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        p.opacity += p.opacitySpeed;
        if (p.opacity > 1 || p.opacity < 0.2) p.opacitySpeed *= -1;

        drawPixelStar(p.x, p.y, p.size, p.color, p.opacity);
      });

      drawMoon();
      drawPlanets();

      t++;
      requestAnimationFrame(draw);
    };

    /** Resize handler */
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    createParticles();
    draw();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default WaveBackground;
