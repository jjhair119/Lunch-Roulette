import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootRouter from "./routers/RootRouter.tsx";
import {BrowserRouter} from "react-router";

import "./index.css";
import "./font.css";

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <RootRouter/>
      </BrowserRouter>
  </StrictMode>,
)
