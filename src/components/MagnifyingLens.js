import React, { useEffect, useRef, useState } from 'react';
import './MagnifyingLens.css';

const MagnifyingLens = ({ pageRef, position, scale }) => {
  const lensRef = useRef(null);
  const [lensSize] = useState(150);
  const magnificationFactor = 2.5;

  useEffect(() => {
    if (!pageRef.current || !lensRef.current) return;

    const canvas = pageRef.current.querySelector('canvas');
    if (!canvas) return;

    const lensCanvas = lensRef.current;
    const lensCtx = lensCanvas.getContext('2d');

    // Set lens canvas size
    lensCanvas.width = lensSize;
    lensCanvas.height = lensSize;

    // Calculate source position on the original canvas
    const sourceX = position.x * (canvas.width / canvas.offsetWidth);
    const sourceY = position.y * (canvas.height / canvas.offsetHeight);

    // Calculate source dimensions
    const sourceWidth = lensSize / magnificationFactor;
    const sourceHeight = lensSize / magnificationFactor;

    // Clear the lens
    lensCtx.clearRect(0, 0, lensSize, lensSize);

    // Draw magnified portion
    try {
      lensCtx.drawImage(
        canvas,
        sourceX - sourceWidth / 2,
        sourceY - sourceHeight / 2,
        sourceWidth,
        sourceHeight,
        0,
        0,
        lensSize,
        lensSize
      );
    } catch (error) {
      // Handle edge cases where source is outside canvas bounds
      console.error('Magnifier drawing error:', error);
    }

    // Draw circular border
    lensCtx.strokeStyle = '#667eea';
    lensCtx.lineWidth = 4;
    lensCtx.beginPath();
    lensCtx.arc(lensSize / 2, lensSize / 2, lensSize / 2 - 2, 0, Math.PI * 2);
    lensCtx.stroke();
  }, [position, scale, lensSize, pageRef]);

  return (
    <div
      className="magnifying-lens"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${lensSize}px`,
        height: `${lensSize}px`,
      }}
    >
      <canvas ref={lensRef} className="lens-canvas" />
      <div className="lens-crosshair">
        <div className="crosshair-h"></div>
        <div className="crosshair-v"></div>
      </div>
    </div>
  );
};

export default MagnifyingLens;
