import { Suspense } from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
    return (
        <Suspense>
            <Stack className="flex-1! sm:justify-start mt-6! sm:my-15! mx-4 sm:mx-19 w-full! max-w-full! sm:max-w-7xl!">
                <Skeleton 
                    animation="wave" 
                    variant="rounded" 
                    className="flex! h-45! md:h-25! lg:h-37.5! w-[90%]! sm:w-[80%] mx-auto! sm:mx-0! mb-5! sm:mb-10! bg-primary-light/8! dark:bg-primary-dark/20!" 
                />
                
                <Skeleton 
                    animation="wave" 
                    variant="rounded" 
                    className="flex! h-20! md:h-15! lg:h-27.5! w-[95%]! sm:w-[80%] mx-auto! sm:mx-0! mb-5! sm:mb-10! bg-primary-light/8! dark:bg-primary-dark/20!" 
                />

                <Stack className='grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-4 w-full! max-w-full! sm:max-w-6xl!' >
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={480} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave"/>
                    ))}
                </Stack>

                <Skeleton 
                    animation="wave" 
                    variant="rounded" 
                    className="flex! h-20! md:h-15! lg:h-27.5! w-[95%]! sm:w-[80%] mx-auto! sm:mx-0! mb-5! sm:mb-10! bg-primary-light/8! dark:bg-primary-dark/20!" 
                />

                <Stack className='grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-4 w-full! max-w-full! sm:max-w-6xl!' >
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={480} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave"/>
                    ))}
                </Stack>

                <Skeleton 
                    animation="wave" 
                    variant="rounded" 
                    className="flex! h-20! md:h-15! lg:h-27.5! w-[95%]! sm:w-[80%] mx-auto! sm:mx-0! mb-5! sm:mb-10! bg-primary-light/8! dark:bg-primary-dark/20!" 
                />

                <Stack className='grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-4 w-full! max-w-full! sm:max-w-6xl!' >
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={480} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave"/>
                    ))}
                </Stack>
            </Stack>
        </Suspense>
    )
}