import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './routes';
import './index.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      {router}
    </Router>
  );
}

export default App;
