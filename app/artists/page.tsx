"use client"
import * as React from 'react';
import ArtistAvatar from '../ui/Avatar';
import SearchBar  from "../ui/SearchBar";
import { Skeleton } from '@mui/material';

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

    const groupedArtists = React.useMemo(() => {
        if (!artists) return {};

        return [...artists]
            .sort((a, b) => a.name.localeCompare(b.name))
            .reduce((acc, artist) => {
                const char = artist.name.charAt(0).toUpperCase();
                if (!acc[char]) acc[char] = [];
                acc[char].push(artist);
                return acc;
            }, {} as Record<string, typeof artists>)
    }, [artists]);

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
            <div className='sm:max-h-full max-h-[78vh] sm:overflow-y-hidden overflow-y-scroll'>
                {isLoading ? (
                    <div className="space-y-12">
                        {[1, 2, 3, 4, 5].map((section) => (
                            <div key={section}>
                                <Skeleton variant="text" width={40} height={60} className="mb-4 bg-primary/10!" />
                                
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-5'>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg border bg-primary/5! border-primary/5">
                                            <Skeleton variant="circular" width={50} height={50} className="bg-primary/20!" animation="wave" />
                                            
                                            <div className="flex-1">
                                                <Skeleton variant="text" width="80%" height={20} className="bg-primary/20!" animation="wave" />
                                                <Skeleton variant="text" width="50%" height={15} className="bg-primary/10!" animation="wave" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    Object.entries(groupedArtists).map(([letter, items]) => (
                        <div key={letter} className="mb-8">
                            <div className="top-0 z-10 py-2 mb-4">
                                <span className="text-4xl font-bold font-sans text-primary-light dark:text-primary-dark">{letter}</span>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-5'>
                                {items.map((item) => (
                                    <ArtistAvatar
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        years={item.years}
                                        nationality={item.nationality}
                                        imageUrl={item.imageUrl}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}