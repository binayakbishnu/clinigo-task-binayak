import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Wrapper from './Wrapper';
import Dashboard from './Pages/Home/Dashboard';
import About from './Pages/Home/About';
import AboutMe from './Pages/Other/AboutMe';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Wrapper />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
          </Route>

          <Route path='/aboutme' element={<AboutMe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
