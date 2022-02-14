import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import InternshipsPage from '../InternshipsPage/InternshipsPage';
import HomePage from '../HomePage/HomePage';
import StudentPortfolio from '../StudentPortfolio/StudentPortfolio';
import EditSkill from '../EditSkill/EditSkill';
import StudentsTable from '../StudentsPage/StudentsPage';
import EditInternship from '../EditInternship/EditInternship';
import AdminPage from '../AdminPage/AdminPage';
import SelectedProfilePage from '../SelectedProfilePage/SelectedProfilePage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_PROFILE' });
    dispatch({ type: 'FETCH_ANNOUNCEMENTS' });
    dispatch({ type: 'FETCH_PORTFOLIO' });
    dispatch({ type: 'FETCH_FAVORITE_PROJECT' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows portfolio page
            exact
            path="/portfolio"
          >
            <StudentPortfolio />
          </ProtectedRoute>

          {/* Internships page */}
          <ProtectedRoute
            exact
            path="/internships"
          >
            <InternshipsPage />
          </ProtectedRoute>

        {/*Students page*/}
        <ProtectedRoute
            exact
            path="/students"
          >
            <StudentsTable />
        </ProtectedRoute>

        {/*Specific student's profile page (non-user)*/}
        <ProtectedRoute
            exact
            path="/user/:id"
          >
            <SelectedProfilePage />
        </ProtectedRoute>

          {/* Admin page */}
          <ProtectedRoute
            exact
            path="/admin"
          >
            {user.access_level == 3 ?
              <AdminPage />
            :
              <div className='container'>
                <h1>404</h1>
              </div>
            }
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/editskill/:id"
          >
            <EditSkill />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/editinternship/:id"
          >
            <EditInternship />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
              <HomePage />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
