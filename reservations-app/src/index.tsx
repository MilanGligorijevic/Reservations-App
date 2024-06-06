import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './view/pages/Home';
import SingleLocal from './view/pages/SingleLocal';
import SignIn from './view/pages/SignIn';
import { LocalsContextProvider } from './context/localsContext';
import ErrorPage from './view/pages/ErrorPage';
import SignUp from './view/pages/SignUp';
import ReservationPage from './view/pages/ReservationPage';
import { UserContextProvider } from './context/userContext';
import { FavoriteLocalsContextProvider } from './context/favoriteLocalsContext';
import UserProfile from './view/pages/UserProfile';
import { UserReservationsContextProvider } from './context/usersReservationsContext';
import AddLocalPage from './view/pages/AddLocalPage';
import LocalsAndGeomap from './view/pages/LocalsAndGeomap';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signIn",
        element: <SignIn />
      },
      {
        path: "/singleLocal/:localId",
        element: <SingleLocal />
      },
      {
        path: "/signUp",
        element: <SignUp />
      },
      {
        path: "/reservation/:localId/:localName/:guestsNumber/:reservationDate/:reservationTime",
        element: <ReservationPage />
      },
      {
        path: "/userProfile",
        element: <UserProfile />
      },
      {
        path: "/addLocal",
        element: <AddLocalPage />
      },
      {
        path: "/localsGeomap",
        element: <LocalsAndGeomap />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <UserContextProvider>
    <FavoriteLocalsContextProvider>
      <UserReservationsContextProvider>
        <LocalsContextProvider>
          <RouterProvider router={router} />
        </LocalsContextProvider>
      </UserReservationsContextProvider>
    </FavoriteLocalsContextProvider>
  </UserContextProvider>
);

