"use client";
import * as React from 'react';
import SearchBar  from "../ui/SearchBar";
import ImageMasonry from '../ui/Masonry';
import Skeleton from '@mui/material/Skeleton';

type Artwork = {
    id: string;
    title: string;
    year: number;
    description: string;
    location: string;
    artistId: string;
    movementId: string;
    imageUrl: string;
}

export default function Artists () {
    const [artworks, setArtworks] = React.useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const groupedArtworks = React.useMemo(() => {
        if (!artworks) return {};

        return [...artworks]
            .sort((a, b) => a.title.localeCompare(b.title))
            .reduce((acc, artwork) => {
                const char = artwork.title.charAt(0).toUpperCase();
                if (!acc[char]) acc[char] = [];
                acc[char].push(artwork);
                return acc;
            }, {} as Record<string, typeof artworks>)
    }, [artworks]);

    React.useEffect(() => {
        async function getArtworks () {
            const headersList = {
                "Accept": "*/*"
            }

            try {
                const response = await fetch("https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/artworks", { 
                    method: "GET",
                    headers: headersList
                });

                let data = await response.text();
                setArtworks(JSON.parse(data));
                setIsLoading(false)
            } catch (e) {
                console.error(e);
            }
        }

        getArtworks();
    }, []);
    
    return (
        <div className="flex-1 sm:justify-start mt-6 sm:my-10 mx-4 sm:mx-19">
            <div className='sm:mb-15 mb-8 justify-center'>
                <SearchBar 
                    searchItem="artwork" 
                    searchList={artworks}
                />
            </div>
            <div className='sm:max-h-full max-h-[78vh] sm:overflow-y-hidden overflow-y-scroll'>
                {isLoading ? (
                    <div className="space-y-12">
                        {[1, 2, 3, 4, 5].map((section) => (
                            <div key={section} className='w-full max-w-full sm:max-w-6xl'>
                                <Skeleton variant="text" width={40} height={60} className="mb-4 bg-primary-light/10! dark:bg-primary-dark/50!" />
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-5'>
                                    {Array.from({ length: 13 }).map((_, index) => (
                                        <Skeleton key={index} variant="rectangular" width="100%" height={320} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    Object.entries(groupedArtworks).map(([letter, items]) => (
                        <div key={letter} className="mb-8">
                            <div className="top-0 z-10 py-2 mb-4">
                                <span className="text-4xl font-bold font-sans text-primary-light dark:text-primary-dark">{letter}</span>
                            </div>

                            <ImageMasonry 
                                data={items}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}