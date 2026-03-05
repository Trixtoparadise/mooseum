"use client"
import * as React from 'react';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useColor } from 'color-thief-react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';

type PropType = {
    slides: string[]
    options?: EmblaOptionsType
}

const EmblaCarousel = (props: PropType) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000})]);

    const bgColors = slides.map((URL, index) => {
        return useColor(URL, 'hex', {
            crossOrigin: 'anonymous',
            quality: 10
        });
    })

    const onNavButtonClick = React.useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return
        
        autoplay.stop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(
        emblaApi,
        onNavButtonClick
    )

    React.useEffect(() => {
        if (!emblaApi) return
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return
        
        emblaApi.reInit();
        autoplay.play();
    }, [emblaApi])

    return (
        <section className='max-w-xl mx-auto [--slide-height:30rem] [--slide-spacing:1rem] [--slide-size:100%]'>
            <div className='overflow-hidden rounded-md' ref={emblaRef}>
                <div className='flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing)*-1)]'>
                    {slides.map((URL, index) => {
                        const { data, loading, error } = bgColors[index];

                        if (!loading) {
                            return (
                                <div className='flex-[0_0_var(--slide-size)] min-w-0 pl-(--slide-spacing)' key={index}>
                                    <div style={{ backgroundColor: data }} className='flex items-center justify-center rounded-md h-(--slide-height)'>
                                        <Image 
                                            src={URL}
                                            width={500}
                                            height={500}
                                            alt='carousel_picture'
                                            className='rounded-sm'
                                        />
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <Skeleton 
                                    className='flex-[0_0_var(--slide-size)]! min-w-0 pl-(--slide-spacing)! bg-purple-200!'
                                    variant="rounded" 
                                    animation="wave"
                                    key={index}
                                >
                                    <div style={{ backgroundColor: data }} className='flex items-center justify-center h-(--slide-height)'>
                                        <Image 
                                            src={URL}
                                            width={500}
                                            height={500}
                                            alt='carousel_picture'
                                            className='rounded-sm'
                                        />
                                    </div>
                                </Skeleton>
                            )
                        }
                    })}
                </div>
            </div>

            <div className='flex justify-center gap-[1.4rem] mt-1'>
                <div className='flex flex-wrap justify-center items-center'>
                    {scrollSnaps.map((_, index) => (
                        <DotButton 
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`
                                relative flex h-[2.6rem] w-[2.6rem] cursor-pointer items-center justify-center 
                                rounded-full border-0 bg-transparent p-0 touch-manipulation appearance-none
                                before:absolute before:flex before:h-[1.1rem] before:w-[1.1rem] before:items-center before:rounded-full before: before:bg-gray-300 before:content-['']
                                after:absolute after:flex after:h-[1.1rem] after:w-[1.1rem] after:items-center after:rounded-full after: after:bg-primary after:content-[''] after:transition-opacity after:duration-200
                                ${index === selectedIndex ? 'after:opacity-100' : 'after:opacity-0'}
                            `}
                        />
                    ))}
                </div>
            </div>
        </section>
    )

}

export default EmblaCarousel