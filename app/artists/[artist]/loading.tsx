import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';

export default function Loading() {
    return (
        <Suspense>
            <Stack className="flex-1 sm:justify-start mt-6! sm:my-10! mx-4 sm:mx-19">
                <Skeleton variant="text" width={270} height={80} className="sm:mb-7! bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                
                <Stack className='flex! flex-col! md:flex-row! items-stretch! gap-3! sm:gap-6!'>
                    <Stack spacing={10} className='w-full! md:w-1/3! lg:w-1/4!'>
                        <Skeleton 
                            width="100%" 
                            height="auto" 
                            variant='rounded' 
                            animation="wave"
                            className='aspect-square! sm:aspect-auto! sm:h-full! bg-primary-light/10! dark:bg-primary-dark/35!' 
                        />
                    </Stack>
                    <Stack className="bg-primary/5! dark:bg-primary-dark/20! rounded-md! w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 p-10!">
                        <Stack spacing={4} direction={{ xs: 'column', md: 'row'}} className='py-5!'>
                            <Stack direction="column" className="flex grow" spacing={1.5}>
                                <Skeleton variant="rounded" width="50%" height={30} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                                <Skeleton variant="rounded" width="80%" height={30} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                            </Stack>
                            <Stack direction="column" className="flex grow" spacing={1.5}>
                                <Skeleton variant="rounded" width="50%" height={30} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                                <Skeleton variant="rounded" width="80%" height={30} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                            </Stack>
                        </Stack>
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="50%" height={30} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="80%" height={30} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="50%" height={30} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="80%" height={30} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="50%" height={30} className="bg-primary-light/20 dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="100%" height={180} className="bg-primary-light/20 dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                    </Stack>
                </Stack>

                <Skeleton variant="text" width={270} height={80} className=" mt-12! mb-7! bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                <Stack className='grid! xs:grid-cols-1! sm:grid-cols-2! md:grid-cols-3! gap-4 w-full! max-w-full! sm:max-w-6xl!' >
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={180} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave"/>
                    ))}
                </Stack>
            </Stack>
        </Suspense>
    )
}