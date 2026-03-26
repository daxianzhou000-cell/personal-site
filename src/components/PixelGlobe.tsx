import React, { useEffect, useRef } from 'react';

export default function PixelGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 128; // Pixel resolution
    canvas.width = size;
    canvas.height = size;

    let time = 0;
    let animId: number;

    const noise = (x: number, y: number, z: number) => {
      const n1 = Math.sin(x * 2.5) * Math.cos(y * 2.5) + Math.sin(z * 2.5);
      const n2 = Math.sin(x * 5) * Math.cos(y * 5) + Math.sin(z * 5);
      return n1 + n2 * 0.5;
    };

    // Personality tags
    const tags = [
      { text: "好奇心", lat: 0.2, lon: 0, color: "#FFE600" },
      { text: "创造力", lat: -0.3, lon: Math.PI / 2, color: "#FF00FF" },
      { text: "同理心", lat: 0.5, lon: Math.PI, color: "#00E5FF" },
      { text: "逻辑控", lat: -0.1, lon: Math.PI * 1.5, color: "#00FF00" },
      { text: "有趣灵魂", lat: 0.4, lon: Math.PI / 4, color: "#9900FF" },
      { text: "细节控", lat: -0.4, lon: Math.PI * 1.2, color: "#FF2A2A" },
      { text: "脑洞大开", lat: 0.1, lon: Math.PI * 0.8, color: "#FF00FF" },
    ];

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, size, size);

      const radius = size / 2 - 2;
      const cx = size / 2;
      const cy = size / 2;

      const lx = -0.6;
      const ly = -0.4;
      const lz = 0.6;

      // 1. Draw Globe
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = x - cx;
          const dy = y - cy;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= radius) {
            const dz = Math.sqrt(radius * radius - dx * dx - dy * dy);
            
            const nx = dx / radius;
            const ny = dy / radius;
            const nz = dz / radius;

            const tilt = 0.41;
            const nxTilt = nx * Math.cos(tilt) - ny * Math.sin(tilt);
            const nyTilt = nx * Math.sin(tilt) + ny * Math.cos(tilt);
            const nzTilt = nz;

            const rx = nxTilt * Math.cos(time) - nzTilt * Math.sin(time);
            const rz = nxTilt * Math.sin(time) + nzTilt * Math.cos(time);
            const ry = nyTilt;

            const n = noise(rx, ry, rz);
            const isLand = n > 0.15;

            const dot = nx * lx + ny * ly + nz * lz;
            const isDither = (x + y) % 2 === 0;

            let color = '';

            if (isLand) {
              if (dot < -0.1) color = '#9900FF'; 
              else if (dot < 0.2 && isDither) color = '#9900FF'; 
              else color = '#FF00FF'; 
            } else {
              if (dot < -0.1) color = '#005588'; 
              else if (dot < 0.2 && isDither) color = '#005588'; 
              else color = '#00E5FF'; 
            }

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // 2. Draw Tags
      ctx.font = 'bold 8px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      tags.forEach(tag => {
        // Calculate 3D position based on lat/lon and current time (rotation)
        const currentLon = tag.lon + time * 0.8; // slightly slower rotation for tags
        
        // Convert spherical to cartesian
        const x3d = Math.cos(tag.lat) * Math.sin(currentLon);
        const y3d = Math.sin(tag.lat);
        const z3d = Math.cos(tag.lat) * Math.cos(currentLon);

        // Apply tilt
        const tilt = 0.41;
        const xTilt = x3d * Math.cos(-tilt) - y3d * Math.sin(-tilt);
        const yTilt = x3d * Math.sin(-tilt) + y3d * Math.cos(-tilt);
        const zTilt = z3d;

        // Only draw if it's on the front half of the globe
        if (zTilt > -0.2) {
          // Project to 2D
          const px = cx + xTilt * (radius + 12); // Orbit slightly higher above surface
          const py = cy + yTilt * (radius + 12);

          // Calculate scale and opacity based on z-depth
          const scale = 0.6 + (zTilt + 1) * 0.6; // 0.6 to 1.8
          const opacity = Math.min(1, (zTilt + 0.2) * 2.5);

          ctx.save();
          ctx.translate(px, py);
          ctx.scale(scale, scale);
          
          // Draw background pill with the tag's color
          const textWidth = ctx.measureText(tag.text).width;
          
          // Shadow for the pill
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          // Convert hex to rgba for opacity
          const hex = tag.color.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          
          // Draw pill
          ctx.beginPath();
          ctx.roundRect(-textWidth/2 - 3, -5, textWidth + 6, 10, 3);
          ctx.fill();
          
          // Draw border
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Reset shadow for text
          ctx.shadowColor = 'transparent';
          
          // Draw text
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          if (tag.color === '#FFE600' || tag.color === '#00E5FF' || tag.color === '#00FF00') {
             ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`; // dark text for light backgrounds
          }
          ctx.fillText(tag.text, 0, 0);
          
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-contain"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
