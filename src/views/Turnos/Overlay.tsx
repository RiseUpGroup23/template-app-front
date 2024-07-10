import { ReactNode } from "react"
import { useConfig } from "../../context/AdminContext";
import hexToRgb from "../../modules/hexToRgb";

interface Props {
    children: ReactNode,
    image: string;
}

const Overlay = ({ children, image }: Props) => {
    const { config } = useConfig()
    if (!config) return (<></>)
    return (
        <div
            className="appContainer"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: '50%',
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                className="overlay"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: `${hexToRgb(config.customization.secondary.text, .6)}`,
                    backdropFilter: 'blur(4px)',
                }}
            ></div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Overlay