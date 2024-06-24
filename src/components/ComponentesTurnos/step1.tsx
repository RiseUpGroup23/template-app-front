import { useConfig } from '../../context/AdminContext';
import TarjetaPeluquero from './Peluqueros/tarjetaPeluquero';

const Step1 = () => {
    const PeluquerosData = [
        { nombre: 'Juan Martinez', tipo: "Estilista", imagen: 'https://s3-alpha-sig.figma.com/img/a086/198a/a683644c0ec6b9424fbe015bc32abbcf?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cb8JulZf38dn41ST4dXzpDzm9zxeKRSV2TJzEuTAszByEZ6qMY6bW79RS9mr34TISDCplkfytiTs07mzZOeekWjt5b72H0elS6sgoo0UMFiPfladiS1J28vbGfhWwJ4rAvo41~1b34x8KfZgFxhEtKs2tRVVHeyZQPXDWliyYxlMZwdB0g0AF-e5iL-SwZr6rtmEAs83X6Eetto7vaAscKom~eaI4QYrlaxjyGO9rUibmA7YcfuSyWjbpVICEmPLLJIj0x4TYLt1t1g9oCfkzfuk4apC7NNikg~t4yojvLYlVazODTuldcy1lpc3mYaiM49ERcUJbYBBw8Gsjr3dDQ__' },
        { nombre: 'Ricardo Herrera', tipo: "Peluquero / Barbero", imagen: 'https://s3-alpha-sig.figma.com/img/a086/198a/a683644c0ec6b9424fbe015bc32abbcf?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cb8JulZf38dn41ST4dXzpDzm9zxeKRSV2TJzEuTAszByEZ6qMY6bW79RS9mr34TISDCplkfytiTs07mzZOeekWjt5b72H0elS6sgoo0UMFiPfladiS1J28vbGfhWwJ4rAvo41~1b34x8KfZgFxhEtKs2tRVVHeyZQPXDWliyYxlMZwdB0g0AF-e5iL-SwZr6rtmEAs83X6Eetto7vaAscKom~eaI4QYrlaxjyGO9rUibmA7YcfuSyWjbpVICEmPLLJIj0x4TYLt1t1g9oCfkzfuk4apC7NNikg~t4yojvLYlVazODTuldcy1lpc3mYaiM49ERcUJbYBBw8Gsjr3dDQ__' },
        { nombre: 'María Morales', tipo: "Estilista / Peluquera", imagen: 'https://s3-alpha-sig.figma.com/img/a086/198a/a683644c0ec6b9424fbe015bc32abbcf?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cb8JulZf38dn41ST4dXzpDzm9zxeKRSV2TJzEuTAszByEZ6qMY6bW79RS9mr34TISDCplkfytiTs07mzZOeekWjt5b72H0elS6sgoo0UMFiPfladiS1J28vbGfhWwJ4rAvo41~1b34x8KfZgFxhEtKs2tRVVHeyZQPXDWliyYxlMZwdB0g0AF-e5iL-SwZr6rtmEAs83X6Eetto7vaAscKom~eaI4QYrlaxjyGO9rUibmA7YcfuSyWjbpVICEmPLLJIj0x4TYLt1t1g9oCfkzfuk4apC7NNikg~t4yojvLYlVazODTuldcy1lpc3mYaiM49ERcUJbYBBw8Gsjr3dDQ__' },
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

export default Step1;