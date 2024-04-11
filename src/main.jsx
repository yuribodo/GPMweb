import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import ErrorPage from './Error/Error-page.jsx';
import Equipes from './Components/Equipes/Equipes.jsx';
import Noticias from './Components/Noticias/Noticias.jsx';
import Suporte from './Components/Suporte/Suporte.jsx';
import Projetos from './Components/Projetos/Projetos.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/equipes",
    element: <Equipes/>,
  },
  {
    path: "/noticias",
    element: <Noticias/>,
  },
  {
    path: "/projetos",
    element: <Projetos/>,
  },
  {
    path: "/suporte",
    element: <Suporte/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
