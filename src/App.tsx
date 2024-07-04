import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import Turnos from './views/Turnos/Turnos';
import Admin from './views/Admin/Admin';
import Error from './views/Error/Error';
import Reprogramar from './views/Turnos/Reprogramar';
import ReproDet from './views/Turnos/ReproDet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/reservar' element={<Turnos />} />
        <Route path='/reprogramar/' element={<Reprogramar />} />
        <Route path='/reprogramar/:id' element={<ReproDet />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
