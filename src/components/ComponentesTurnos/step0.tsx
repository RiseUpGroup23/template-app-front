// Elegir peluquero
import { useConfig } from '../../context/AdminContext';
import TarjetaPeluquero from './Peluqueros/tarjetaPeluquero';

const Step0 = () => {
    const PeluquerosData = [
        { nombre: 'Juan Martinez', tipo: "Estilista", imagen: 'https://s3-alpha-sig.figma.com/img/8d9e/e91f/8f374a7290fa7583b5b37253cbe3c95d?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FfjE79rOyg3OP1MfOczcsSiw1OTHTocviBKiU59ocbO1ayRzTyXLuiVZTcMrcLH6efsYaGxHQc5z3hvVma27pDXwFimHnEbJmBuAK-Kc1JNTeZRGKQ9HJEAoU78~pRXdoQ9~0L9xuJdX55S-X-kUF5~mmDKzTmJVefoOKVjtjjNe3olSwZ9LKNdW92YZqLiYue~F5VUJkB0dVD1Uy~qxUPpB9O40FW76usdEbNvC8QrBnzg~DN-zo7F-TEApk9CNIqT-kSZB-QW3sU4vYIWKcdOHD5suAfHR5tkggpc0IzU3ZAregcy3ZqbZKFDKRMaKQa33Gp4ydaAAlAg-5xohxg__' },
        { nombre: 'Ricardo Herrera', tipo: "Peluquero / Barbero", imagen: 'https://s3-alpha-sig.figma.com/img/8d9e/e91f/8f374a7290fa7583b5b37253cbe3c95d?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FfjE79rOyg3OP1MfOczcsSiw1OTHTocviBKiU59ocbO1ayRzTyXLuiVZTcMrcLH6efsYaGxHQc5z3hvVma27pDXwFimHnEbJmBuAK-Kc1JNTeZRGKQ9HJEAoU78~pRXdoQ9~0L9xuJdX55S-X-kUF5~mmDKzTmJVefoOKVjtjjNe3olSwZ9LKNdW92YZqLiYue~F5VUJkB0dVD1Uy~qxUPpB9O40FW76usdEbNvC8QrBnzg~DN-zo7F-TEApk9CNIqT-kSZB-QW3sU4vYIWKcdOHD5suAfHR5tkggpc0IzU3ZAregcy3ZqbZKFDKRMaKQa33Gp4ydaAAlAg-5xohxg__' },
        { nombre: 'María Morales', tipo: "Estilista / Peluquera", imagen: 'https://s3-alpha-sig.figma.com/img/8d9e/e91f/8f374a7290fa7583b5b37253cbe3c95d?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FfjE79rOyg3OP1MfOczcsSiw1OTHTocviBKiU59ocbO1ayRzTyXLuiVZTcMrcLH6efsYaGxHQc5z3hvVma27pDXwFimHnEbJmBuAK-Kc1JNTeZRGKQ9HJEAoU78~pRXdoQ9~0L9xuJdX55S-X-kUF5~mmDKzTmJVefoOKVjtjjNe3olSwZ9LKNdW92YZqLiYue~F5VUJkB0dVD1Uy~qxUPpB9O40FW76usdEbNvC8QrBnzg~DN-zo7F-TEApk9CNIqT-kSZB-QW3sU4vYIWKcdOHD5suAfHR5tkggpc0IzU3ZAregcy3ZqbZKFDKRMaKQa33Gp4ydaAAlAg-5xohxg__' },
    ]
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí a tu <span>peluquero/a</span>
            </div>
            <div className="containerPeluqueros">
                {PeluquerosData.map((card, index) => (
                    <TarjetaPeluquero key={index} nombre={card.nombre} imagen={card.imagen} tipo={card.tipo} />
                ))}
            </div>
        </div>
    )
}

export default Step0;