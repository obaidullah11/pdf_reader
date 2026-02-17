import React, { useState } from 'react';
import './App.css';
import PDFReader from './components/PDFReader';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setLoading(true);
      try {
        // Convert file to ArrayBuffer to prevent detachment issues
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfFile(url);
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF file. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleClose = () => {
    // Clean up the blob URL to free memory
    if (pdfFile) {
      URL.revokeObjectURL(pdfFile);
    }
    setPdfFile(null);
  };

  return (
    <div className="App">
      {!pdfFile ? (
        <div className="upload-container">
          <div className="upload-box">
            <h1>📚 PDF Reader</h1>
            <p>Upload your PDF book to start reading</p>
            {loading ? (
              <div className="loading-upload">
                <div className="spinner"></div>
                <p>Loading PDF...</p>
              </div>
            ) : (
              <>
                <label htmlFor="file-upload" className="upload-button">
                  Choose PDF File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <PDFReader pdfFile={pdfFile} onClose={handleClose} />
      )}
    </div>
  );
}

export default App;
