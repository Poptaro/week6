import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';


import App from './App.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import CharactersPage from './pages/CharactersPage.jsx';
import SpecificCharacterPage from './pages/SpecificCharacterPage.jsx';


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />, 
    children: [
      {
        index: true,
        element: <HomePage />
      },
      { 
        path: "/about", 
        element: <AboutPage /> 
      },
      {
        path: "/characters/:page",
        element: <CharactersPage />
      },
      {
        path: "/character/:id",
        element: <SpecificCharacterPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ] 
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);