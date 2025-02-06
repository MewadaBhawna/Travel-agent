import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './src/Home';
import Input from './src/Input';
import Output from './src/Output';
import Layout from './src/Layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
