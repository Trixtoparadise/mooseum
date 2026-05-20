import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';

export default function Loading() {
    return (
        <Suspense>
            <Stack className="flex-1 sm:justify-start mt-6! sm:my-10! mx-4 sm:mx-19">
                <Skeleton variant="text" width={270} height={60} className="flex! mx-auto! sm:mx-0! sm:mb-7! bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                
                <Stack className='flex! flex-col! md:flex-row! items-stretch! gap-3! sm:gap-6! mb-10! w-full lg:w-2/3 '>
                    <Stack className="bg-primary/5! dark:bg-primary-dark/20! rounded-md! w-full lg:w-2/3 p-10!">
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="20%" height={20} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="50%" height={20} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="20%" height={20} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="50%" height={20} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="20%" height={20} className="bg-primary-light/20! dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="50%" height={20} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                        <Stack spacing={1.5} className='py-5'>
                            <Skeleton variant="rounded" width="20%" height={20} className="bg-primary-light/20 dark:bg-primary-dark/50!" animation="wave" />
                            <Skeleton variant="rounded" width="100%" height={100} className="bg-primary-light/20 dark:bg-primary-dark/35!" animation="wave" />
                        </Stack>
                    </Stack>
                </Stack>

                <Stack className='grid! xs:grid-cols-1! sm:grid-cols-2! gap-4 w-full! max-w-full! sm:max-w-6xl!' >
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={180} className="bg-primary-light/10! dark:bg-primary-dark/35!" animation="wave"/>
                    ))}
                </Stack>
            </Stack>
        </Suspense>
    )
}