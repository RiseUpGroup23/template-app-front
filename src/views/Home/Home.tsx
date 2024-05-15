
import ReactMarkdown from 'react-markdown';
import { useConfig } from '../../context/AdminContext';
import Header from '../../components/Header/Header';
import "./Home.css"
import Footer from '../../components/Footer/Footer';
import hexToRgb from '../../modules/hexToRgb';

const Home = () => {
    const { config } = useConfig()
    if (!config) return <></>
    return (
        <div className="appContainer" style={{ background: `linear-gradient(90deg, ${hexToRgb(config.customization.secondary.text, .5)} 31%, ${hexToRgb(config.customization.secondary.text, .0)} 100%), url(${config.customization.background.backgroundImage}) lightgray 50% / cover no-repeat` }}>
            <Header />
            <div className="titleContainer" style={{ color: `${config.customization.primary.text}` }}>
                <ReactMarkdown>{config?.presentationTitle}</ReactMarkdown>
            </div>
            <div className="infoContainer">
                <div className="circleContainer" style={{ background: `${config.customization.primary.color}` }}>
                    Holaaaa
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home