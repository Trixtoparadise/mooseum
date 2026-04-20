"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
    {
        id: 1,
        title: 'Ecclesiastical and Devotional (The Divine Commission)',
        description: 'Historically, the Church was the primary architect of visual culture. These works were commissioned as instruments of liturgy and "Biblia Pauperum" (the Bible of the poor), designed to bridge the gap between the mundane and the eternal. They functioned as pedagogical tools for theological instruction and as conduits for spiritual meditation.',
    },
    {
        id: 2,
        title: 'Royal and State Propaganda (The Art of Power)',
        description: "Commissioned by absolute monarchs and governing bodies, these works served as visual manifestations of political legitimacy. They were intended to solidify the ruler's authority, celebrate military victory, or define a cohesive national identity for the citizenry.",
    },
    {
        id: 3,
        title: 'The Mercantile and Private Market (The Rise of Personal Taste)',
        description: "With the expansion of the urban middle class, art transitioned from public monument to domestic commodity. These works were created for private homes and commercial galleries, focusing on the nuanced experiences of the individual and the aesthetic pleasure of the natural world."
    },
    ,
    {
        id: 4,
        title: ' Institutional and Global Contemporary (Critical and Conceptual)',
        description: 'Works in this category are often produced for the academic and professional museum circuit. Their intent is to explore the limits of formal theory, interrogate the historical canon, and act as a catalyst for discourse on global identity and social justice.'
    }
]

export default function Artworks () {
    const [selectedCard, setSelectedCard] = React.useState(0)
    
    return (
        <div className='mx-80! my-20!'>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(400px, 100%), 1fr))',
                    gap: 2,
                }}
            >
                {cards.map((card, index) => (
                    <Card key={card?.id}>
                        <CardActionArea
                            onClick={() => setSelectedCard(index)}
                            data-active={selectedCard === index ? '' : undefined}
                            sx={{ 
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selelectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{ height: '100%' }} className='dark:bg-primary-alternate!'>
                                <Typography variant='h5' component="div" className='font-mono! text-5xl! text-primary-light! dark:text-primary-dark!'>
                                    {card?.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </div>
    )
}