import React, { useState } from 'react';
import './App.css';
import PDFReader from './components/PDFReader';

function App() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  return (
    <div className="App">
      {!pdfFile ? (
        <div className="upload-container">
          <div className="upload-box">
            <h1>📚 PDF Reader</h1>
            <p>Upload your PDF book to start reading</p>
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
          </div>
        </div>
      ) : (
        <PDFReader pdfFile={pdfFile} onClose={() => setPdfFile(null)} />
      )}
    </div>
  );
}

export default App;
