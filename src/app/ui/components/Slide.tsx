import { Image } from '@heroui/react'
import SwiperTitle from './SwiperTitle'

export function Slide({ slide }: { slide: any }) {
    return (
        < >
            <Image className='lg:h-[27rem] h-[25.5rem]' src={slide.image} alt={`slide ${slide.title}`} />
            <SwiperTitle text={slide.title} />
        </>
    )
}