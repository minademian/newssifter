import 'the-new-css-reset/css/reset.css';
import './styles.scss';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '@newssifter/services/i18n.browser.service';
import { AdminDataPage } from './AdminData';
import { AppPage } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/data" element={<AdminDataPage />} />
        <Route path="*" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
