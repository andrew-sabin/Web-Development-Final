// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Exercise Scheduler</h1>
            <h2>Manage your routines for a weekly basis</h2>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage exercise={exercise} setExercise={setExercise} />
            </Route>

            <Route path="/add-exercise">
              <CreatePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditPage exerciseToEdit={exercise}/>
            </Route>
          </main>

          <footer>
            <p>Copyright &copy;Andrew Sabin 2022 <br/>
            Background Image &copy; 2018 Luis Reyes</p>
          </footer>

      </Router>
    </>
  );
}

export default App;