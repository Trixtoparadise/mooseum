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
    data: ArtworkData[],
    characteristics: string[],
}

export default function MasonryAlt(props: PropType) {
    const { data, characteristics } = props;
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [toggleModal, setToggleModal] = React.useState(false)
    const modifiedData = data.map(item => {
        const modifiedTitle = item.artistId.split("-").slice(1).join(" ");
        
        return {
        ...item,
        title: `${item.title} by ${modifiedTitle.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase())}`
    }});


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
                        <Image
                            width={500}
                            height={500}
                            src={item.imageUrl}
                            loading="lazy"
                            alt="background-image"
                            className='rounded-t-md!'
                        />
                        <Paper className='bg-primary-light/10! dark:bg-primary-dark/10! p-4 font-light! text-[1rem] text-center text-primary-light! dark:text-primary-dark! rounded-b-md!'>
                            {characteristics[index]}
                        </Paper>
                    </Box>
                ))}
            </Masonry>
            <ImageModal 
                data={modifiedData}
                steps={data.length} 
                open={toggleModal}
                initialIndex={currentIndex}
                onClose={() => setToggleModal(false)}
            />
        </Box>
    )
}

