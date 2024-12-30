import React, { useRef, useEffect } from 'react';

const MouseTrail = () => {
            const canvasRef = useRef(null);
            let particles = []; // Array untuk partikel

            useEffect(() => {
                        const canvas = canvasRef.current;
                        const ctx = canvas.getContext('2d');

                        // Sesuaikan ukuran canvas
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;

                        // Resize canvas saat layar berubah ukuran
                        const handleResize = () => {
                                    canvas.width = window.innerWidth;
                                    canvas.height = window.innerHeight;
                        };

                        window.addEventListener('resize', handleResize);

                        // Fungsi membuat partikel
                        function createParticle(x, y) {
                                    particles.push({
                                                x: x,
                                                y: y,
                                                size: Math.random() * 8 + 2, // Ukuran partikel
                                                life: Math.random() * 60 + 60, // Umur partikel
                                                alpha: 1, // Transparansi
                                                color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Warna acak
                                    });
                        }

                        // Fungsi menggambar partikel
                        function drawParticles() {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                                    particles.forEach((p, index) => {
                                                ctx.beginPath();
                                                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                                                ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
                                                ctx.fill();

                                                // Update partikel
                                                p.size *= 0.96; // Mengecil seiring waktu
                                                p.alpha -= 0.02;
                                                p.life--;

                                                // Hapus partikel yang sudah mati
                                                if (p.life <= 0 || p.alpha <= 0) {
                                                            particles.splice(index, 1);
                                                }
                                    });
                        }

                        // Fungsi utama animasi
                        function animate() {
                                    drawParticles();
                                    requestAnimationFrame(animate);
                        }

                        // Event listener untuk menangkap pergerakan mouse
                        window.addEventListener('mousemove', (e) => {
                                    createParticle(e.clientX, e.clientY);
                        });

                        // Fungsi konversi warna HEX ke RGB
                        const hexToRgb = (hex) => {
                                    const result = /^hsl\((\d+),\s*100%,\s*(\d+)%\)$/.exec(hex);
                                    return result
                                                ? `${parseInt(result[1])}, ${parseInt(result[2])}, 50`
                                                : '255, 223, 0';
                        };

                        animate();

                        return () => {
                                    window.removeEventListener('resize', handleResize);
                        };
            }, []);

            return (
                        <canvas
                                    ref={canvasRef}
                                    className="fixed top-0 left-0 pointer-events-none z-50"
                        ></canvas>
            );
};

export default MouseTrail;
