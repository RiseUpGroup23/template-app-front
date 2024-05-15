import { useConfig } from "../../context/AdminContext";

interface TurnosHeaderProps {
    text1: string;
    text2: string;
}

const TurnosHeader: React.FC<TurnosHeaderProps> = ({
    text1,
    text2,
  }) => {
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            {/* <div className="appointImgShadow"></div> */}
            <span className="Text" style={{ color: `${config.customization.primary.text}` }}>
                {text1} <span>{text2}</span>
            </span>
        </div>
    )
}

export default TurnosHeader;