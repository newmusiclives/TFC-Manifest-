import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './routes';
import './index.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      {router}
    </Router>
  );
}

export default App;
