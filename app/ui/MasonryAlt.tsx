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
    data: ArtworkData[],
    characteristics: string[],
}

export default function MasonryAlt(props: PropType) {
    const { data, characteristics } = props;
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [toggleModal, setToggleModal] = React.useState(false)

    const handleOpen = (index: number) => {
        setCurrentIndex(index);
        setToggleModal(true);
    }

    return (
        <Box className="w-full">
            <Masonry columns={{ xs: 1, md: 2 }} spacing={{xs: 0, md: 2}}>
                {data.map((item, index) => (
                    <Box
                        key={index}
                        className='mb-4! cursor-pointer' 
                        onClick={() => handleOpen(index)}
                    >
                        <img
                            loading="lazy"
                            alt="background-image"
                            className='rounded-t-md!'
                            src={`${item.imageUrl}?w=500&auto=format`}
                        />
                        <Paper className='bg-primary-light/10! dark:bg-primary-dark/10! p-4 font-light! text-[1rem] text-center text-primary-light! dark:text-primary-dark! rounded-b-md!'>
                            {characteristics[index]}
                        </Paper>
                    </Box>
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