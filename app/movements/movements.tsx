"use client";
import Link from 'next/link';
import * as React from 'react';
import Icon from '@mui/material/Icon';
import SearchBar  from "../ui/SearchBar";
import Skeleton from '@mui/material/Skeleton';
import { ButtonBase, Stack } from "@mui/material";

type Movement = {
    id: string;
    name: string;
    period: string;
    origin: string;
    description: string;
    characteristics: string[];
    notableArtistsId: string[];
}

export default function Movements () {
    const [isLoading, setIsLoading] = React.useState(true);
    const [movements, setMovements] = React.useState<Movement[]>([]);

    const groupedArtworks = React.useMemo(() => {
        if (!movements) return {};

        return [...movements]
            .sort((a, b) => a.name.localeCompare(b.name))
            .reduce((acc, movement) => {
                const char = movement.name.charAt(0).toUpperCase();
                if (!acc[char]) acc[char] = [];
                acc[char].push(movement);
                return acc;
            }, {} as Record<string, typeof movements>)
    }, [movements]);

    React.useEffect(() => {
        async function getMovements () {
            const headersList = {
                "Accept": "*/*"
            }

            try {
                const response = await fetch("https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/movements", { 
                    method: "GET",
                    headers: headersList
                });

                let data = await response.text();
                setMovements(JSON.parse(data));
                setIsLoading(false)
            } catch (e) {
                console.error(e);
            }
        }

        getMovements();
    }, []);
    
    return (
        <div className="flex-1 sm:justify-start mt-6 sm:my-10 mx-4 sm:mx-19">
            <div className='sm:mb-15 mb-8 justify-center'>
                <SearchBar 
                    searchItem="movement" 
                    searchList={movements}
                />
            </div>
            <div className='sm:max-h-full max-h-[78vh] sm:overflow-y-hidden overflow-y-scroll'>
                {isLoading ? (
                    <div className="space-y-12">
                        {[1, 2, 3, 4, 5].map((section) => (
                            <div key={section} className='w-full max-w-full sm:max-w-6xl'>
                                <Skeleton variant="text" width={40} height={60} className="mb-4 bg-primary-light/10! dark:bg-primary-dark/50!" />
                                
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-5'>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton key={index} variant="rectangular" width="100%" height={60} className="rounded-md! bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    Object.entries(groupedArtworks).map(([letter, items], groupIndex) => (
                        <div key={letter} className="mb-8 w-full max-w-full sm:max-w-6xl">
                            <div className="top-0 z-10 py-2 mb-4">
                                <span className="text-4xl font-bold font-sans text-primary-light dark:text-primary-dark">{letter}</span>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-5'>
                                {items.map((item, index) => {
                                    return (
                                        <Stack key={index} className="bg-primary-light/90 dark:bg-primary-alternate/90 hover:bg-shade-light/90! dark:hover:bg-secondary-alternate! rounded-md min-w-50">
                                            <ButtonBase 
                                                sx={{
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}    
                                                className="flex grow py-2.5! px-6! overflow-hidden text-secondary-light! dark:text-secondary-alternate! sm:text-[1rem] dark:hover:text-primary-alternate!"
                                            >
                                                <Link href={`/movements/${item.id}#top`} prefetch>
                                                    <Stack 
                                                        direction='row' 
                                                        gap={1}
                                                        sx={{
                                                            justifyContent: "flex-start",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                    <Icon>
                                                        {
                                                            movementIconNames[
                                                                groupIndex == 0 ? 
                                                                    index + groupIndex : 
                                                                    Object.entries(groupedArtworks)
                                                                        .map((keyValuePair) => keyValuePair[1].length)
                                                                        .slice(0,groupIndex)
                                                                        .reduce((total, value) => total + value) + index
                                                            ]
                                                        }
                                                    </Icon>
                                                    <Stack className="text-start!">
                                                        <p className='flex px-4 rounded-md text-md items-center' key={index}>
                                                            {item.name}
                                                        </p>
                                                    </Stack>
                                                    </Stack>
                                                </Link>
                                            </ButtonBase>
                                        </Stack>
                                    )
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

const movementIconNames = [
  "format_paint",
  "category",
  "nature",
  "flare",
  "campaign",
  "mosque",
  "public",
  "view_in_ar",
  "architecture",
  "psychology",
  "change_history",
  "light_mode",
  "accessibility",
  "wallpaper",
  "healing",
  "grid_view",
  "account_tree",
  "microscope",
  "shopping_cart",
  "palette",
  "masks",
  "foundation",
  "photo_camera",
  "landscape",
  "groups",
  "square",
  "wb_twilight",
  "visibility",
  "texture"
];


