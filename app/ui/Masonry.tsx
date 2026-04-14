"use client";
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
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{xs: 0, sm: 3, md: 4}} sequential>
                {data.map((item, index) => (
                    <div 
                        key={index}
                        className='my-4! cursor-pointer' 
                         onClick={() => handleOpen(index)}
                    >
                        <Paper className='bg-primary/10! p-4 text-center text-primary! rounded-b-none!'>{item.title}</Paper>
                        <img
                            loading="lazy"
                            alt={item.title}
                            className='rounded-b-4 block w-full'
                            src={`${item.imageUrl}?w=500&auto=format`}
                        />
                    </div>
                ))}
            </Masonry>
            <ImageModal 
                data={data} 
                open={toggleModal}
                initialIndex={currentIndex}
                onClose={() => setToggleModal(false)}
            />
        </Box>
    )
}