import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import Turnos from './views/Turnos/Turnos';
import Admin from './views/Admin/Admin';
import Error from './views/Error/Error';
import Reprogramar from './views/Turnos/Reprogramar';
import ReproDet from './views/Turnos/ReproDet';
import TurnoConfirmado from './views/TurnoConfirmado-Rechazado/Confirmado';
import TurnoRechazado from './views/TurnoConfirmado-Rechazado/Rechazado';

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
        <Route path='/turno-confirmado' element={<TurnoConfirmado />} />
        <Route path='/turno-rechazado' element={<TurnoRechazado />} />
      </Routes>
    </Router>
  );
}

export default App;
