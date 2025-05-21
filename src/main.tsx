import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RootRouter from "./routers/RootRouter.tsx";
import {BrowserRouter} from "react-router";

import "./index.css";
import "./font.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <RootRouter/>
      </BrowserRouter>
  </StrictMode>,
)
