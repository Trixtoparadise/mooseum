"use client"
import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import { ArrowLeft, ArrowRight, Close } from '@mui/icons-material';

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
    const [direction, setDirection] = React.useState(0);
    const [index, setIndex] = React.useState<number>(initialIndex);

    React.useEffect(() => {
        setIndex(initialIndex);
    }, [initialIndex]);

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1 === data.length ? 0 : prev + 1));
    }

    const handlePrev = () => {
        setDirection(-1)
        setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    }

    const handlers: SwipeableHandlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        }, 
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    }

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
                    direction="column"
                    justifyContent="space-between"
                    className='w-full! h-full! px-2! md:px-5! pointer-events-auto!' 
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className='p-4!'
                    >
                        <MobileStepper
                            variant='progress'
                            steps={5}
                            position='static'
                            activeStep={index}
                            sx={{
                                width: '100%',
                                    '& .MuiLinearProgress-root': { 
                                        backgroundColor: 'rgb(255 255 255 / 0.1) !important',
                                        height: '4px !important',
                                },
                                    '& .MuiLinearProgress-bar': { 
                                        backgroundColor: '#FFFFFF !important',
                                }
                            }}
                            className='grow! bg-transparent! max-w-150!'
                            nextButton={<div className='hidden!'/>}
                            backButton={<div className='hidden!'/>}
                        />
                        <IconButton 
                            onClick={onClose} 
                            className="mx-0! sm:mx-8! text-secondary! hover:bg-white/10! z-30! pointer-events-auto!"
                        >
                            <Close className="text-[1.5rem]! md:text-[2rem]! lg:text-[3rem]!" /> 
                        </IconButton>
                    </Stack>
                    <Stack 
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className='w-full! h-full! -mt-25! px-2! md:px-5! pointer-events-auto!'
                        gap={{ sm: 2, md: 3, lg: 4 }}
                    >
                        <IconButton 
                            onClick={handlePrev} 
                            className='hidden! md:flex! text-secondary! hover:bg-white/10! pointer-events-auto!'
                        >
                            <ArrowLeft className='text-[2rem]! md:text-[3rem]! lg:text-[6rem]!' />
                        </IconButton>
                        <Box 
                            {...handlers} 
                            mt={4} 
                            className="w-full! md:w-[80%] lg:w-[55%]! max-h-[87vh] overflow-y-auto! border-none! px-6! py-10! rounded-lg! shadow-2xl! shadow-black/50! ring-2! ring-white/10!"
                        >
                            <AnimatePresence
                                initial={false}
                                custom={direction}
                                mode='wait'
                            >
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className='w-full h-full'
                                >
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
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                        <IconButton 
                            onClick={handleNext} 
                            className='hidden! md:flex! text-secondary! hover:bg-white/10! pointer-events-auto!'
                        >
                            <ArrowRight className='text-[2rem]! md:text-[3rem]! lg:text-[6rem]!' />
                        </IconButton>
                    </Stack>
                </Stack>
            </Modal>
        </div>
    )
}