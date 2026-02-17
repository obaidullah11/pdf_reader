import React from 'react';
import './App.css';
import PDFReader from './components/PDFReader';

function App() {
  // Load PDF from public folder
  // Using simplified filename without spaces for better compatibility
  const pdfFile = `${process.env.PUBLIC_URL}/book.pdf`;

  return (
    <div className="App">
      <PDFReader pdfFile={pdfFile} />
    </div>
  );
}

export default App;
