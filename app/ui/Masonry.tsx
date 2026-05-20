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
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{xs: 0, sm: 2, md: 3}} sequential>
                {data.map((item, index) => (
                    <div 
                        key={index}
                        className='my-4! cursor-pointer' 
                         onClick={() => handleOpen(index)}
                    >
                        <img
                            loading="lazy"
                            alt={item.title}
                            className='rounded-t-md! block w-full'
                            src={`${item.imageUrl}?w=500&auto=format`}
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