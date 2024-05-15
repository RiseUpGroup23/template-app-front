import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import hexToRgb from '../../modules/hexToRgb';
import { useConfig } from "../../context/AdminContext";
import CrearTurno from '../../components/ComponentesTurnos/CrearTurno';

const Turnos = () => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div className="appContainer" style={{ background: `linear-gradient(90deg, ${hexToRgb(config.customization.secondary.text, .5)} 31%, ${hexToRgb(config.customization.secondary.text, .0)} 100%), url(${config.customization.background.backgroundTurno}) lightgray 50% / cover no-repeat` }}>
            <Header/>
            <CrearTurno/>
            <Footer/>
        </div>
    )
}

export default Turnos;