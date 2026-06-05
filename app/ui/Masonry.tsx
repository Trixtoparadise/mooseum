"use client";
import Image from 'next/image';
import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import ImageModal from '@/app/ui/ImageModal';

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
    data: ArtworkData[]
}

export default function ImageMasonry(props: PropType) {
    const { data } = props;
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [toggleModal, setToggleModal] = React.useState(false)

    const handleOpen = (index: number) => {
        setCurrentIndex(index);
        setToggleModal(true);
    }

    return (
        <Box className="w-full max-w-full sm:max-w-6xl">
            <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={{sm: 0, md: 2, lg: 3}}>
                {data.map((item, index) => (
                    <div 
                        key={index}
                        className='my-4! cursor-pointer' 
                         onClick={() => handleOpen(index)}
                    >
                        <Image
                            width={500}
                            height={500}
                            alt={item.title}
                            src={item.imageUrl}
                            loading="lazy"
                            className='rounded-t-md! block w-full'
                        />
                        <Paper className='rounded-b-md! bg-primary-light/10! dark:bg-primary-dark/10! p-4 font-light! text-center text-primary-light! dark:text-primary-dark!'>
                            {item.title}
                        </Paper>
                    </div>
                ))}
            </Masonry>
            <ImageModal 
                data={data}
                steps={data.length} 
                open={toggleModal}
                initialIndex={currentIndex}
                onClose={() => setToggleModal(false)}
            />
        </Box>
    )
}