"use client"
import * as React from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

    const onDotButtonClick = React.useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
            if (onButtonClick) onButtonClick(emblaApi)
        }, 
        [emblaApi, onButtonClick]
    )

    const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps((prevSnaps) => {
            const nextSnaps = emblaApi.scrollSnapList()
            if (JSON.stringify(prevSnaps) === JSON.stringify(nextSnaps)) {
                return prevSnaps;
            }
            return nextSnaps;
        });
    }, [])

    const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    React.useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)

        emblaApi
            .on('reInit', onInit)
            .on('reInit', onSelect)
            .on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

type PropType = React.ComponentPropsWithRef<'button'>

export const DotButton = (props: PropType) => {
    const { children, ...restProps } = props

    return (
        <button type='button' {...restProps}>
            {children}
        </button>
    )
} 