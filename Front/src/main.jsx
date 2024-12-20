import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'

import Equipes from './Pages/Equipes/Equipes.jsx';
import Noticias from './Pages/Noticias/Noticias.jsx';
import Suporte from './Pages/Suporte/Suporte.jsx';
import Projetos from './Pages/Projetos/Projetos.jsx';
import ErrorPage from './Pages/Error/Error2.jsx';
import SaibaMais from './Pages/Projetos/SaibaMais/SaibaMais.jsx';
import Membros from './Pages/Equipes/Membros.jsx';
import Login from './Pages/Login/Login.jsx';
import Signup from './Pages/Signup/Signup.jsx';
import CreateProject from './Pages/ManagePage/ManageProjects/CreateProject/CreateProject.jsx'
import ManagePage from './Pages/ManagePage/ManagePage.jsx';
import EditProject from './Pages/ManagePage/ManageProjects/EditProject/EditProject.jsx'
import CreateNews from './Pages/ManagePage/ManageNews/CreateNews/CreateNews.jsx';
import EditNews from './Pages/ManagePage/ManageNews/EditNews/EditNews.jsx';
import CreateDiscentePage from './Pages/ManagePage/ManageDiscentes/CreateDiscente/CreateDiscentePage.jsx';
import CreateDocentePage from './Pages/ManagePage/ManageDocente/CreateDocente/CreateDocentePage.jsx';
import EditDiscentePage from './Pages/ManagePage/ManageDiscentes/EditDiscente/EditDiscentePage.jsx';
import EditDocentePage from './Pages/ManagePage/ManageDocente/EditDocente/EditDocentePage.jsx';
import Relatorios from './Pages/ManagePage/Relatorios/Relatorios.jsx';


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
  {
    path: "/projetos/:id",
    element: <SaibaMais/>,
  },
  {
    path: "/membros/:id",
    element: <Membros/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/manage",
    element: <ManagePage/>
  },
  {
    path: "/manage/create-project",
    element: <CreateProject/>,
  },
  {
    path: "/manage/edit-project/:id",  
    element: <EditProject/>,
  },
  {
    path: "/manage/create-news",
    element: <CreateNews/>,
  },
  {
    path: "/manage/edit-news/:id",
    element: <EditNews/>,
  },
  {
    path: "/manage/create-discente",
    element: <CreateDiscentePage/>,
  },
  {
    path: "/manage/edit-discentes/:id",  
    element: <EditDiscentePage/>,
  },
  {
    path: "/manage/create-docente",
    element: <CreateDocentePage/>,
  },
  {
    path: "/manage/edit-docente/:id",  
    element: <EditDocentePage/>,
  },
  {
    path: "/manage/relatorios",  
    element: <Relatorios/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
