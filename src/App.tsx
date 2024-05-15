import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import Turnos from './views/Turnos/Turnos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/reservar' element={<Turnos/>} />
      </Routes>
    </Router>
  );
}

export default App;
