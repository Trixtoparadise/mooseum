"use client"
import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import { ArrowLeft, ArrowRight, Close  } from '@mui/icons-material';

interface ArtworkData {
  id: string;
  title: string;
  year: number;
  description: string;
  location: string;
  artistId: string;
  movementId: string;
  imageUrl: string;
}

type PropType = {
    data: ArtworkData[],
    open: boolean;
    onClose: () => void;
    initialIndex: number;
}

export default function BasicModal(props: PropType) {
    const { data, open, onClose, initialIndex } = props;
    const [index, setIndex] = React.useState<number>(initialIndex);

    React.useEffect(() => {
        setIndex(initialIndex);
    }, [initialIndex]);

    const handleNext = () => setIndex((prev) => (prev + 1 === data.length ? 0 : prev + 1));
    const handlePrev = () => setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));

    const handlers: SwipeableHandlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    const currentItem = data[index];
    if (!currentItem) return null;

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                className='bg-black/90! flex! items-center! justify-center!'
            >
                <Stack 
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    className='w-full! h-full! px-2! md:px-5! pointer-events-auto!'
                    gap={{ sm: 2, md: 3, lg: 4 }}
                >
                    <IconButton 
                        onClick={onClose} 
                        className="absolute! top-1.5! right-0! sm:top-4! sm:right-0! mx-0! sm:mx-8! text-secondary! hover:bg-white/10! z-30! pointer-events-auto!"
                    >
                        <Close className="text-[1.5rem]! md:text-[2rem]! lg:text-[3rem]!" /> 
                    </IconButton>
                    <IconButton onClick={handlePrev} className='hidden! md:flex! text-secondary! hover:bg-white/10! pointer-events-auto!'>
                        <ArrowLeft className='text-[2rem]! md:text-[3rem]! lg:text-[6rem]!' />
                    </IconButton>
                    <Box {...handlers} mt={4} className="w-full! md:w-[80%] lg:w-[55%]! max-h-[90vh] overflow-y-auto! border-none! px-6! py-10! rounded-lg! shadow-2xl! shadow-black/50! ring-2! ring-white/10!">
                        <Stack 
                            spacing={2}
                            className='flex! items-center! w-full! h-full!' 
                            direction="column" 
                        >
                            <div className='w-full'>
                                <Image
                                    src={currentItem.imageUrl}
                                    alt={currentItem.title}
                                    width={1200}
                                    height={800}
                                    className='rounded-md w-full h-auto object-cover select-none! pointer-events-none!'
                                />
                            </div>
                            <Stack className='flex! w-full'>
                                <div className='max-w-full'>
                                    <p className='text-secondary/80 text-[1.1rem] font-medium mt-1 mb-4'>{currentItem.title} ({currentItem.year})</p>
                                    <p className='text-secondary/80 text-[1rem] font-light mt-1 leading-relaxed text-justify mb-4 max-w-full xl:max-w-3/4'>
                                        {currentItem.description}
                                    </p>
                                    <p className='text-secondary/80 text-[1rem] font-extralight mt-1 leading-relaxed italic'>
                                        {currentItem.location}
                                    </p>
                                </div>
                            </Stack>
                        </Stack>
                    </Box>
                    <IconButton onClick={handlePrev} className='hidden! md:flex! text-secondary! hover:bg-white/10! pointer-events-auto!'>
                        <ArrowRight className='text-[2rem]! md:text-[3rem]! lg:text-[6rem]!' />
                    </IconButton>
                </Stack>
            </Modal>
        </div>
    )
}