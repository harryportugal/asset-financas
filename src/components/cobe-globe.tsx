"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function CobeGlobe({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		let globe: ReturnType<typeof createGlobe> | null = null;
		let rafId = 0;
		let phi = 0;

		const init = () => {
			const side = canvas.offsetWidth;
			if (side === 0 || globe) {
				return;
			}

			const dpr = Math.min(window.devicePixelRatio || 1, 2);

			globe = createGlobe(canvas, {
				devicePixelRatio: dpr,
				width: side * dpr,
				height: side * dpr,
				phi: 0,
				theta: 0.3,
				dark: 0, // Light mode globe
				diffuse: 1.2,
				mapSamples: 6000,
				mapBrightness: 6,
				baseColor: [0.95, 0.95, 0.95],
				markerColor: [0.0, 0.17, 0.54], // Asset's primary navy blue #002b8a -> [0.0, 0.17, 0.54]
				glowColor: [1, 1, 1],
				markers: [
					{ location: [-23.5505, -46.6333], size: 0.08 }, // São Paulo, Brazil
					{ location: [40.7128, -74.006], size: 0.05 },   // New York
					{ location: [51.5074, -0.1278], size: 0.05 },   // London
					{ location: [35.6762, 139.6503], size: 0.05 },  // Tokyo
				],
			});

			const loop = () => {
				globe?.update({ phi });
				phi += 0.005; // Slightly slower, more premium rotation
				rafId = requestAnimationFrame(loop);
			};
			loop();
		};

		let ro: ResizeObserver | null = null;

		if (canvas.offsetWidth > 0) {
			init();
		} else {
			ro = new ResizeObserver((entries) => {
				if (
					entries[0]?.contentRect.width &&
					entries[0]?.contentRect.width > 0
				) {
					ro?.disconnect();
					ro = null;
					init();
				}
			});
			ro.observe(canvas);
		}

		return () => {
			ro?.disconnect();
			cancelAnimationFrame(rafId);
			globe?.destroy();
		};
	}, []);

	return (
		<canvas
			className={className}
			ref={canvasRef}
			style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: 1 }}
		/>
	);
}
