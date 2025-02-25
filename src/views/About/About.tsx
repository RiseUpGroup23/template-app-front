import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Overlay from "../Turnos/Overlay";
import Footer from "../../components/Footer/Footer";
import { useConfig } from "../../context/AdminContext";
import "./about.css";
import Markdown from "react-markdown";

const About = () => {
    const { config } = useConfig();
    const [tabs, setTabs] = useState<any[]>([]);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        setTabs(config?.about?.items ?? []);
    }, [config]);

    return (
        <Overlay image={`${config?.customization.background.backgroundTurno}`}>
            <Header />
            <div className="aboutContainer">
                <div className="appointTitle" style={{ color: `${config?.customization.primary.text}`, textAlign: "center" }}>
                    Nosotros
                </div>
                {tabs?.length && <div className="aboutSection" style={{ background: `${config?.customization.primary.color}` }}>
                    <div className="aboutTabs">
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                style={{
                                    background: `${selected === index ? config?.customization.primary.text : "transparent"}`,
                                    color: `${selected === index ? config?.customization.primary.color : config?.customization.primary.text}`,
                                    border: `1px solid ${selected === index ? config?.customization.primary.color : config?.customization.primary.text}`
                                }}
                                className={`aboutTabItem ${selected === index ? 'active' : ''}`}
                                onClick={() => setSelected(index)}
                            >
                                {tab.title}
                            </div>
                        ))}
                    </div>
                    <div className="tabContent">
                        {tabs[selected] && <Markdown>
                            {tabs[selected].content}
                        </Markdown>}
                        <img src={tabs[selected]?.image} alt={tabs[selected]?.title} />
                    </div>
                </div>}
            </div>
            <Footer />
        </Overlay>
    );
};

export default About;
