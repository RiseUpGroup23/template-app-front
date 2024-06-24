import { useConfig } from '../../context/AdminContext';
import TarjetaServicio from './Servicios/tarjetaServicio';

const Step0 = () => {
    const SeriviciosData = [
        { servicio: 'Corte solo', imagen: 'https://s3-alpha-sig.figma.com/img/18eb/386d/376a3305927f1857173f888f99671046?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UFeTpgyWLhkk1UoW6gMs8a1Uz8dGoULlPOitTl-s73K3vmPAb~MyFsUUTgcRrJS4Luu2rgQcoagNHFfAac7VlYUgc9goO0gRM6dIJfd26Gpft2GhSZ4zWJfvMbRnTcIObkjhCjx5DF8b9Caq69VWCZUcyE8n92A8kKRV8qTlSCRL7tgh5f0YefxtlGq~-18WLmPXfb8DAobJGvQvBm4L0p-Bl3u2HvzIwQSQNzG4DbvezGCzsVCAnu79korB4530OZvduKs6-LnXIaWsqaVAc6uair10o6u0jLS7cDy4oTHNdS0mSkk4~VLVtmBiOYNODa73yBECiVHlOasR6M-4xQ__' },
        { servicio: 'Corte y barba', imagen: 'https://s3-alpha-sig.figma.com/img/daa1/11a3/59d29e30fcf355b6a7595cbf008f8625?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C053IMYERNjeuGVrGt18HZJ8rf9w2wZLuuW-5Y766wRxF3evQFgEHQroQW87BjIt4um0q2GU8HyBtuH0VUwtS6R-wkAOAO4J8ZNf2yRwaEqyXg050mj38O9DtDderkOi1qXsu4H6wD2FPpT32w4gsdw3kaXqH0C0ms8prqXF01A2iztCdlHyY5bJt1NayiUE3s~SsgNyHReL1tyJpWM9Zl355e3iCeTSJkQVI9uzMUMxaf2NOlTqg3-V~l1KHIi4rOhteiLcvBRc0tvgSfBLvzd8SFOZ7a8JKWjsjuD1d1pAWZavD6ky8p4Y~LQsQFSWNRhfDzFWktP1UFEZ2JIPCA__' },
        { servicio: 'Corte y tintura', imagen: 'https://s3-alpha-sig.figma.com/img/017d/3bb3/c711c506aaab4d502ab61349090b509e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DYm~wETvHGDiDoTytN3RYUCTf5uEWhih2UboP9UF29I4bjlL8ayJ8Xg3VyZRZfXg0Xl2A03RGEQG8PDoZRzS-q-KhvursaENbeFyYX5VAz2mJBXsDD1PrkxYjDQcIljwNYOqLDthuM1QzZp2ms22iTugwsJ-8Llss50Z1Su7Yy9-4~TMoaiQ7REuT7JRtDtt4~7AVEK3vXAWxuG-bJS~63pPiCEUJdcF2Y8BW35Je8UUYcPELNsfz53~iAgutXnYLGgNPswfJ6nJe0sNgxGPr45sv7PGNAW43JpmPIyg~oJZaV0Rxv6ki8nnnrVs9AmYyexdu4fSi74Q-25v8WVIeQ__' },
    ]
    const { config } = useConfig()
    if (!config) return <></>

    return (
        <div>
            <div className="appointTitle" style={{ color: `${config.customization.primary.text}` }}>
                Elegí que <span>servicio necesitas</span>
            </div>
            <div className="containerPeluqueros">
                {SeriviciosData.map((card, index) => (
                    <TarjetaServicio key={index}  imagen={card.imagen} servicio={card.servicio} />
                ))}
            </div>
        </div>
    )
}

export default Step0;