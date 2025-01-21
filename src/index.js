import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectsMain from './pages/ProjectsMain';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Genres from './pages/Genres';
import Ages from './pages/Ages';
import AddProject from './addComponents/AddProject';
import AddProject1 from './addComponents/AddProject1';
import AddProject2 from './addComponents/AddProject2';
import AddProject3 from './addComponents/AddProject3';
import EditVideo from './edit/EditVideo';
import EditCover from './edit/EditCover';
import MovieDetails from './pages/MovieDetails';
import EditProject from './edit/EditProject';
import EditInformation from './edit/EditInformation';
import Modal from './addComponents/Modal';
import AuthPage from './pages/AuthPage';
import Projects from './pages/Projects';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Убедитесь, что пути правильные и соответствуют вашему проекту
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Projects",
    element: <Projects />,
  },
  {
    path: "/Main",
    element: <ProjectsMain />,
  },
  {
    path: "/Categories",
    element: <Categories />,
  },
  {
    path: "/Users",
    element: <Users />,
  },
  {
    path: "/Roles",
    element: <Roles />,
  },
  {
    path: "/Genres",
    element: <Genres />,
  },
  {
    path: "/Ages",
    element: <Ages />,
  },
  {
    path: "/AddProject",
    element: <AddProject />,
  },
  {
    path: "/AddProject1",
    element: <AddProject1 />,
  },
  {
    path: "/AddProject2",
    element: <AddProject2 />,
  },
  {
    path: "/AddProject3",
    element: <AddProject3 />,
  },
  {
    path: "/EditProject/:id",
    element: <EditProject />,
  },
  {
    path: "/EditVideo/:id",
    element: <EditVideo />,
  },
  {
    path: "/EditCover/:id",
    element: <EditCover />,
  },
  {
    path: "/MovieDetails/:id",
    element: <MovieDetails />,
  },
  {
    path: "/Modal",
    element: <Modal />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
