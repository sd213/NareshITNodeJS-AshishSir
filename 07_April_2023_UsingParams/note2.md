# Different way of pass data from one route to another route with frontend part

## Passing data from one route to another is a common requirement in both backend and frontend development. Below are several ways to achieve this, with examples for both the backend (using Node.js/Express) and frontend (using React)

### Backend: Passing Data Between Routes in Node.js/Express

1. **Using URL Parameters (Route Params)**
   - You can pass data through the URL as parameters.
   - Example:

     ```javascript
     const express = require('express');
     const app = express();

     app.get('/user/:id', (req, res) => {
         const userId = req.params.id;
         // Pass data to another route
         res.redirect(`/profile/${userId}`);
     });

     app.get('/profile/:id', (req, res) => {
         const userId = req.params.id;
         res.send(`User Profile for ID: ${userId}`);
     });

     app.listen(3000);
     ```

2. **Using Query Parameters**
   - Data can be passed through query strings in the URL.
   - Example:

     ```javascript
     app.get('/search', (req, res) => {
         const { query } = req.query;
         // Redirect with query parameters
         res.redirect(`/results?query=${query}`);
     });

     app.get('/results', (req, res) => {
         const query = req.query.query;
         res.send(`Search results for: ${query}`);
     });
     ```

3. **Using POST Requests and Redirects**
   - Data can be passed using a POST request and then processed in another route.
   - Example:

     ```javascript
     app.post('/submit', (req, res) => {
         const data = req.body;
         // Pass data using POST and redirect
         res.redirect(307, `/process?name=${data.name}`);
     });

     app.post('/process', (req, res) => {
         const name = req.query.name;
         res.send(`Processed data for: ${name}`);
     });
     ```

   - Note: Use `307` status to preserve the method (POST) during the redirect.

4. **Using Sessions or Cookies**
   - Data can be stored in a session or cookie and accessed in another route.
   - Example:

     ```javascript
     const session = require('express-session');
     app.use(session({ secret: 'secret-key', saveUninitialized: true, resave: false }));

     app.get('/login', (req, res) => {
         req.session.user = { id: 1, name: 'John' };
         res.redirect('/dashboard');
     });

     app.get('/dashboard', (req, res) => {
         const user = req.session.user;
         res.send(`Welcome, ${user.name}`);
     });
     ```

5. **Using Middleware**
   - Middleware can be used to process data and pass it to the next route.
   - Example:

     ```javascript
     app.use('/profile/:id', (req, res, next) => {
         req.user = { id: req.params.id, name: 'John' };
         next();
     });

     app.get('/profile/:id', (req, res) => {
         res.send(`User Profile for ${req.user.name}`);
     });
     ```

### Frontend: Passing Data Between Routes in React

1. **Using URL Parameters**
   - React Router allows passing parameters directly in the URL.
   - Example:

     ```javascript
     import React from 'react';
     import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';

     function User() {
         const { id } = useParams();
         return <div>User ID: {id}</div>;
     }

     function App() {
         return (
             <Router>
                 <Link to="/user/123">Go to User 123</Link>
                 <Route path="/user/:id" component={User} />
             </Router>
         );
     }

     export default App;
     ```

2. **Using Query Parameters**
   - You can pass query parameters and access them in the component.
   - Example:

     ```javascript
     import React from 'react';
     import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';

     function useQuery() {
         return new URLSearchParams(useLocation().search);
     }

     function Results() {
         let query = useQuery();
         return <div>Search Query: {query.get('query')}</div>;
     }

     function App() {
         return (
             <Router>
                 <Link to="/results?query=react">Search React</Link>
                 <Route path="/results" component={Results} />
             </Router>
         );
     }

     export default App;
     ```

3. **Using State (React Router `useNavigate`)**
   - React Router allows passing state when navigating between routes.
   - Example:

     ```javascript
     import React from 'react';
     import { BrowserRouter as Router, Route, Link, useLocation, useNavigate } from 'react-router-dom';

     function Home() {
         const navigate = useNavigate();
         return (
             <button onClick={() => navigate('/about', { state: { fromHome: true } })}>
                 Go to About
             </button>
         );
     }

     function About() {
         const location = useLocation();
         return <div>{location.state?.fromHome ? 'Came from Home' : 'Not from Home'}</div>;
     }

     function App() {
         return (
             <Router>
                 <Route path="/" element={<Home />} />
                 <Route path="/about" element={<About />} />
             </Router>
         );
     }

     export default App;
     ```

4. **Using Context API**
   - The Context API allows sharing data across components without passing props manually.
   - Example:

     ```javascript
     import React, { createContext, useContext } from 'react';
     import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

     const UserContext = createContext();

     function Home() {
         return (
             <UserContext.Provider value={{ id: 123, name: 'John' }}>
                 <Link to="/profile">Go to Profile</Link>
             </UserContext.Provider>
         );
     }

     function Profile() {
         const user = useContext(UserContext);
         return <div>Profile of {user.name}</div>;
     }

     function App() {
         return (
             <Router>
                 <Route path="/" element={<Home />} />
                 <Route path="/profile" element={<Profile />} />
             </Router>
         );
     }

     export default App;
     ```

5. **Using Local Storage or Session Storage**
   - Data can be stored in `localStorage` or `sessionStorage` and accessed across different routes.
   - Example:

     ```javascript
     import React from 'react';
     import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

     function Home() {
         const saveData = () => {
             localStorage.setItem('user', JSON.stringify({ id: 123, name: 'John' }));
         };

         return <button onClick={saveData}>Save and Go to Profile</button>;
     }

     function Profile() {
         const user = JSON.parse(localStorage.getItem('user'));
         return <div>Profile of {user.name}</div>;
     }

     function App() {
         return (
             <Router>
                 <Route path="/" element={<Home />} />
                 <Route path="/profile" element={<Profile />} />
             </Router>
         );
     }

     export default App;
     ```

### Summary

- **Backend (Node.js/Express)**:
  - URL Parameters
  - Query Parameters
  - POST Requests and Redirects
  - Sessions or Cookies
  - Middleware

- **Frontend (React)**:
  - URL Parameters
  - Query Parameters
  - State with `useNavigate`
  - Context API
  - Local Storage or Session Storage

Each method has its appropriate use cases depending on the requirements of your application.
