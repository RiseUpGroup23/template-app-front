import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import hexToRgb from '../../modules/hexToRgb';
import { useConfig } from "../../context/AdminContext";
import CreateAppointment from '../../components/ComponentesTurnos/CreateAppointment';
import Overlay from './Overlay';

const Turnos = () => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <Overlay image={`${config.customization.background.backgroundTurno}`}>
            <Header />
            <CreateAppointment />
            <Footer />
        </Overlay>
    )
}

export default Turnos;
