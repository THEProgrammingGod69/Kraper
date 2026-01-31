'use client';

import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Hydra Colors
        const colors = ['#8176AF', '#C0B7E8', '#7064a3'];

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const particleCount = Math.min(Math.floor(width * 0.1), 100); // Responsive count
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Connect particles
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(192, 183, 232, ${0.15 - distance / 1000})`; // Hydra Lavender low opacity
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-hydra-bg overflow-hidden">
            {/* Radial Gradient Base */}
            <div className="absolute inset-0 bg-hydra-radial opacity-80" />

            <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-60" />

            {/* Simulated Vector Lines (CSS Gradients) */}
            <div className="vector-bg absolute top-[10%] left-0 w-full h-[200px] bg-gradient-to-r from-transparent via-hydra-purple/10 to-transparent skew-y-6 blur-3xl rounded-full" />
            <div className="vector-bg absolute bottom-[20%] right-0 w-2/3 h-[300px] bg-gradient-to-l from-hydra-lavender/5 to-transparent -skew-y-12 blur-[100px] rounded-full" />
        </div>
    );
};

export default Background;
