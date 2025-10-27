import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import './theme.css'

// Radix
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme appearance="dark" 
      style={{
          backgroundColor: "#3D342F", 
          minHeight: "100vh",
        }}>
        <div>
          <App />
        </div>       
      </Theme>
    </BrowserRouter>
  </React.StrictMode>,
)
