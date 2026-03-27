"use client";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';

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

    return (
        <Box className="w-full max-w-6xl">
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4} sequential>
                {data.map((item, index) => (
                    <div key={index}>
                        <Paper className='bg-primary/10! p-4 text-center text-primary! rounded-b-none!'>{item.title}</Paper>
                        <img
                            srcSet={`${item.imageUrl}?w=162&auto=format&dpr=2 2x`}
                            src={`${item.imageUrl}?w=162&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{
                                borderBottomLeftRadius: 4,
                                borderBottomRightRadius: 4,
                                display: 'block',
                                width: '100%',
                            }}
                        />
                    </div>
                ))}
            </Masonry>
        </Box>
    )
}