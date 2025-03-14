import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';


import App from './App.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import CharactersPage from './pages/CharactersPage.jsx';
import SpecificCharacterPage from './pages/SpecificCharacterPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';


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
        path: "/characters",
        element: <CharactersPage purpose={ 'main' }/>,
        children: [
          {
            path: ":name",
            element: <CharactersPage purpose={ 'search' }/>
          }
        ]
      },
      {
        path: "/character/:id",
        element: <SpecificCharacterPage />
      },
      {
        path: "/favorite-characters",
        element: <FavoritesPage />
      },
      // {
      //   path: "/results/:name",
      //   element: <CharactersPage purpose={ `https://rickandmortyapi.com/api/character` }/>
      // },
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