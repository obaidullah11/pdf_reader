import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFReader.css';
import MagnifyingLens from './MagnifyingLens';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFReader = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  // Handle PDF load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Page navigation
  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  // Zoom controls
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  // Touch gestures for mobile
  useEffect(() => {
    let startDistance = 0;
    let startScale = scale;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        startDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        startScale = scale;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const newScale = (distance / startDistance) * startScale;
        setScale(Math.max(0.5, Math.min(3.0, newScale)));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [scale]);

  // Mouse move for magnifier
  const handleMouseMove = (e) => {
    if (showMagnifier && pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      setMagnifierPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevPage();
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages]);

  return (
    <div className="pdf-reader">
      {/* Header */}
      <div className="pdf-header">
        <div className="page-info">
          Page {pageNumber} of {numPages}
        </div>
        <div className="header-controls">
          <button
            className="magnifier-toggle"
            onClick={() => setShowMagnifier(!showMagnifier)}
            title="Toggle Magnifying Lens"
          >
            🔍
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div
        className="pdf-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <div className="pdf-wrapper">
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="error">
                <p>Failed to load PDF. Please try again.</p>
              </div>
            }
          >
            <div ref={pageRef}>
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </div>
          </Document>

          {showMagnifier && pageRef.current && (
            <MagnifyingLens
              pageRef={pageRef}
              position={magnifierPosition}
              scale={scale}
            />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="pdf-controls">
        {/* Navigation */}
        <div className="control-group">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="control-button"
            title="Previous Page (←)"
          >
            ◀
          </button>
          <input
            type="number"
            min="1"
            max={numPages}
            value={pageNumber}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= numPages) {
                setPageNumber(page);
              }
            }}
            className="page-input"
          />
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="control-button"
            title="Next Page (→)"
          >
            ▶
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="control-group">
          <button onClick={zoomOut} className="control-button" title="Zoom Out (-)">
            −
          </button>
          <span className="zoom-level">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="control-button" title="Zoom In (+)">
            +
          </button>
          <button onClick={resetZoom} className="control-button" title="Reset Zoom (0)">
            ⟲
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFReader;
