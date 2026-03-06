'use client';
import * as React from 'react';
import EmblaCarousel from './ui/carousel/EmblaCarousel';
import { Button, Stack } from '@mui/material';
import { EmblaOptionsType } from 'embla-carousel';

export default function Page() {
  const images : string[] = [
    "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1772443386/Impression_Sunrise_ryao7n.jpg",
    "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1772443385/Bedroom_in_Arles_dbv1wu.jpg",
    "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1772443389/Constellations_series_zruyoe.jpg",
    "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1772527132/Sunflower_Quilting_Bee_at_Arles_twbyvs.jpg",
    "https://res.cloudinary.com/dzzwjwhfl/image/upload/v1772443412/The_Artist_s_Garden_at_Eragny_ooirg6.jpg"
  ]

  const OPTIONS: EmblaOptionsType = { loop: true }

  return (
    <>
      <div className='hidden sm:flex gap-x-20 items-center justify-center mx-10 mt-25'>
        <div className='max-w-md -mt-10'>
          <h1 className=' text-center align-middle font-sans font-bold text-[5.15rem]! text-primary text-base/16! mb-8'>
            EXPLORE THE REALM OF INTERESTING IMAGINATIONS
          </h1>
          <p className='text-justify align-middle font-mono text-[0.9rem] mb-10 text-primary font-light'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <div className='flex justify-center my-10'>
            <Stack spacing={4} direction="row">
              <Button 
                variant='contained'
                className='bg-primary! font-sans! text-[1.5rem]! text-base/8! px-12! py-3!'
              >
                A TRIP DOWN<br/>MEMORY LANE
              </Button>
              <Button 
                variant='contained'
                className='bg-primary! font-sans! text-[1.5rem]! text-base/8! px-10! py-3!'
              >
                CHECK OUT SOME<br/>EXHIBITIONS
              </Button>
            </Stack>
          </div>
        </div>
        <div>
          <EmblaCarousel 
            slides={images} 
            options={OPTIONS}
            width={500}
            height={500}
            carouselHeight={30} 
          />
        </div>
      </div>
      <div className='sm:hidden justify-center mx-6 mt-25'>
        <div className='max-w-md -mt-17'>
          <h1 className=' text-center align-middle font-sans font-bold text-[3rem]! text-primary text-base/12! mb-6'>
            EXPLORE THE REALM OF INTERESTING IMAGINATIONS
          </h1>
          <p className='text-justify align-middle font-mono text-[1rem] mb-8 text-primary font-light'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div className='my-2'>
          <EmblaCarousel 
            slides={images} 
            options={OPTIONS} 
            width={360}
            height={360}
            carouselHeight={20}
          />
        </div>
        <div className='flex justify-center mt-3 mb-5'>
          <Stack spacing={4} direction="row">
            <Button 
              variant='contained'
              className='bg-primary! font-sans! text-[1.3rem]! text-base/8! px-6! py-3!'
            >
              A TRIP DOWN MEMORY LANE
            </Button>
            <Button 
              variant='contained'
              className='bg-primary! font-sans! text-[1.3rem]! text-base/8! px-6! py-3!'
            >
              CHECK OUT SOME EXHIBITIONS
            </Button>
          </Stack>
        </div>
      </div>
    </>
  )
}