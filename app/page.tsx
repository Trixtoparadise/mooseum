'use client';
import Link from 'next/link';
import Carousel from './ui/carousel/Carousel';
import { Button, Stack } from '@mui/material';
import { EmblaOptionsType } from 'embla-carousel';

export default function Page() {
  const images : string[] = [
    'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1773121437/Taxi_45th_broadway_yxqxp1.webp',
    'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1773058390/A_Friend_in_Need_1903_C.M.Coolidge_ni4mh1.jpg',
    'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1773058390/WouldYouTradeTomorrowForOneMoreYesterday_s7qjl5.webp',
    'https://res.cloudinary.com/dzzwjwhfl/image/upload/v1773058389/morons_babpeb.jpg',
  ]

  const OPTIONS: EmblaOptionsType = { loop: true }

  return (
    <div className='flex grow justify-center'>
      <div className='hidden sm:flex gap-x-10 md:gap-x-20 items-center sm:justify-center mx-10 mt-25 mb-10'>
        <div className='md:max-w-md -mt-10'>
          <h1 className=' text-center align-middle font-sans font-bold text-[4rem]! md:text-[5.15rem]!  text-primary text-base/14 md:text-base/16! mb-8'>
            EXPLORE THE REALM OF INTERESTING IMAGINATIONS
          </h1>
          <p className='text-center align-middle font-mono md:text-[0.9rem] mb-5 text-primary font-light'>
            Read about your favourite artist, discover new artworks and educate your self about
            movements spanning almost a millenium.
          </p>
          <div className='flex justify-center my-10'>
            <Stack spacing={4} direction="row">
              <Button 
                variant='contained'
                className='bg-primary! font-sans! text-[1.4rem]! md:text-[1.5rem]! text-base/8! md:text-base/8! px-8! md:px-12! py-3!'
              >
                <Link href="/timeline">
                  A TRIP DOWN<br/>MEMORY LANE
                </Link>
              </Button>
              <Button 
                variant='contained'
                className='bg-primary! font-sans! text-[1.4rem]! md:text-[1.5rem]! text-base/8! md:text-base/8! px-5! md:px-10! py-3!'
              >
                CHECK OUT SOME<br/>EXHIBITIONS
              </Button>
            </Stack>
          </div>
        </div>
        <div className='min-w-3xs'>
          <Carousel 
            slides={images} 
            options={OPTIONS}
          />
        </div>
      </div>
      <div className='sm:hidden justify-center mx-6 mt-25 mb-10'>
        <div className='-mt-17'>
          <h1 className=' text-center align-middle font-sans font-bold text-[3rem]! text-primary text-base/12! mb-6'>
            EXPLORE THE REALM OF INTERESTING IMAGINATIONS
          </h1>
          <p className='text-center align-middle font-mono text-[1rem] mb-8 text-primary font-light'>
            Read about your favourite artists, discover new artworks and 
            educate your self about movements spanning almost a millenium.
          </p>
        </div>
        <div className='my-2'>
          <Carousel 
            slides={images} 
            options={OPTIONS} 
          />
        </div>
        <div className='flex justify-center mt-3'>
          <Stack spacing={4} direction="row">
            <Button 
              variant='contained'
              className='bg-primary! font-sans! text-[1.3rem]! text-base/8! px-6! py-3!'
            >
              <Link href="/timeline">
                A TRIP DOWN MEMORY LANE
              </Link>
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
    </div>
  )
}