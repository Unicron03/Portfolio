"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface FlickeringGridProps {
    squareSize?: number;
    gridGap?: number;
    flickerChance?: number;
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    
    maxOpacity?: number;
}

export const FlickeringGrid = ({
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = "rgb(0, 0, 0)",
    width,
    height,
    className,
    maxOpacity = 0.3,
}: FlickeringGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewRef = useRef(false);
    const isTabVisibleRef = useRef(true);
    const prefersReducedMotionRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    
    const memoizedColor = useMemo(() => {
        const toRGBA = (color: string) => {
            if (typeof window === "undefined") {
                return "rgba(0, 0, 0,";
            }
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                return "rgba(255, 0, 0,";
            }
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
            return `rgba(${r}, ${g}, ${b},`;
        };
        return toRGBA(color);
    }, [color]);
    
    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement, width: number, height: number) => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const cols = Math.floor(width / (squareSize + gridGap));
            const rows = Math.floor(height / (squareSize + gridGap));
            
            const squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity;
            }
            
            return { cols, rows, squares, dpr };
        },
        [squareSize, gridGap, maxOpacity],
    );
    
    const updateSquares = useCallback(
        (squares: Float32Array, deltaTime: number) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * deltaTime) {
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        },
        [flickerChance, maxOpacity],
    );
    
    const drawGrid = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            cols: number,
            rows: number,
            squares: Float32Array,
            dpr: number,
        ) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, width, height);
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[i * rows + j];
                    ctx.fillStyle = `${memoizedColor}${opacity})`;
                    ctx.fillRect(
                        i * (squareSize + gridGap) * dpr,
                        j * (squareSize + gridGap) * dpr,
                        squareSize * dpr,
                        squareSize * dpr,
                    );
                }
            }
        },
        [memoizedColor, squareSize, gridGap],
    );
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!(canvas && container)) {
            return;
        }
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        
        let gridParams: ReturnType<typeof setupCanvas>;
        const targetFrameTime = 1000 / 30;
        let lastFrameTime = 0;
        
        const updateCanvasSize = () => {
            const newWidth = width ?? container.clientWidth;
            const newHeight = height ?? container.clientHeight;
            if (newWidth <= 0 || newHeight <= 0) {
                return;
            }
            gridParams = setupCanvas(canvas, newWidth, newHeight);
        };
        
        updateCanvasSize();
        
        const canAnimate = () =>
            isInViewRef.current && isTabVisibleRef.current && !prefersReducedMotionRef.current;

        const animate = (time: number) => {
            if (!canAnimate()) {
                animationFrameRef.current = null;
                return;
            }
            
            if (time - lastFrameTime < targetFrameTime) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = (time - lastFrameTime) / 1000;
            lastFrameTime = time;
            
            updateSquares(gridParams.squares, deltaTime);
            drawGrid(
                ctx,
                canvas.width,
                canvas.height,
                gridParams.cols,
                gridParams.rows,
                gridParams.squares,
                gridParams.dpr,
            );
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (animationFrameRef.current !== null || !canAnimate()) {
                return;
            }
            lastFrameTime = performance.now();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const stopAnimation = () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
        
        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });
        
        resizeObserver.observe(container);
        
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                isInViewRef.current = entry.isIntersecting;
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0 },
        );
        
        intersectionObserver.observe(canvas);

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleMotionPreference = () => {
            prefersReducedMotionRef.current = mediaQuery.matches;
            if (prefersReducedMotionRef.current) {
                stopAnimation();
            } else {
                startAnimation();
            }
        };

        const handleVisibilityChange = () => {
            isTabVisibleRef.current = !document.hidden;
            if (isTabVisibleRef.current) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        handleMotionPreference();
        handleVisibilityChange();

        mediaQuery.addEventListener("change", handleMotionPreference);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        
        startAnimation();
        
        return () => {
            stopAnimation();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            mediaQuery.removeEventListener("change", handleMotionPreference);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [setupCanvas, updateSquares, drawGrid, width, height]);
    
    return (
        <div ref={containerRef} className={cn("w-full h-full", className)}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none"
            />
        </div>
    );
};

export default FlickeringGrid;
