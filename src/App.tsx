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
import News from './views/News/News';
import { useConfig } from './context/AdminContext';
import titleToLink from './modules/titleToLink';
import Article from './views/Article/Article';

function App() {
  const { config } = useConfig()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/reservar' element={<Turnos />} />
        <Route path='/editar-turno/:reproId' element={<Turnos />} />
        <Route path='/reprogramar/' element={<Reprogramar />} />
        <Route path='/reprogramar/:id' element={<ReproDet />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/error' element={<Error />} />
        <Route path='/reserva-confirmada' element={<TurnoConfirmado />} />
        <Route path='/reserva-error' element={<TurnoRechazado />} />
        <Route path='/novedades' element={<News />} />
        {config?.articles?.items?.map((item) => (
          <Route path={`/novedades/${titleToLink(item.title)}`} element={<Article article={item} />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
