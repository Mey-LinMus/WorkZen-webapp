import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { SelectionProvider } from './Components/Contexts/SelectionContext';

const root = createRoot(document.getElementById('root')); 

root.render(
  <React.StrictMode>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </React.StrictMode>
);

