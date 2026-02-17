import React from 'react';
import './App.css';
import PDFReader from './components/PDFReader';

function App() {
  // Load PDF from public folder
  const pdfFile = '/UIA, February 2026.pdf';

  return (
    <div className="App">
      <PDFReader pdfFile={pdfFile} />
    </div>
  );
}

export default App;
