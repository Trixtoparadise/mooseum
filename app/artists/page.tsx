"use client"
import * as React from 'react';
import ArtistAvatar from '../ui/Avatar';
import SearchBar  from "../ui/SearchBar";
import { Skeleton, Box, Stack } from '@mui/material';

interface Artist {
  id: string;
  name: string;
  years: string;
  nationality: string;
  biography: string;
  movementIds: string[];
  imageUrl: string;
}

export default function Artists () {
    const [artists, setArtists] = React.useState<Artist[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function getArtists () {
            const headersList = {
                "Accept": "*/*"
            }

            try {
                const response = await fetch("https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/artists", { 
                    method: "GET",
                    headers: headersList
                });

                let data = await response.text();
                setArtists(JSON.parse(data));
                setIsLoading(false)
            } catch (e) {
                console.error(e);
            }
        }

        getArtists();
    }, []);
    
    return (
        <div className="flex-1 sm:justify-start mt-6 sm:my-10 mx-4 sm:mx-19">
            <div className='sm:mb-15 mb-8 justify-center'>
                <SearchBar 
                    searchItem="artist" 
                    searchList={artists}
                />
            </div>
            <div className='grid sm:max-h-full max-h-[78vh] sm:overflow-y-hidden overflow-y-scroll grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-5'>
                {isLoading
                    ? Array.from({ length:57 }).map((_, index) => (
                        <Skeleton key={index} variant='rounded' className='bg-primary/20!' animation='wave'>
                            <ArtistAvatar
                                name="John Doe"
                                years="c. 0000-present"
                                nationality="South African"
                                imageUrl=""
                            />
                        </Skeleton>
                      ))
                    : artists.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => {
                        return (
                            <ArtistAvatar
                                key={index}
                                name={item.name}
                                years={item.years}
                                nationality={item.nationality}
                                imageUrl={item.imageUrl}
                            />
                        )
                })}
            </div>
        </div>
    )
}