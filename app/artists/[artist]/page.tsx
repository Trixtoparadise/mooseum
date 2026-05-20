import Image from 'next/image';
import Box from '@mui/material/Box';
import ImageMasonry from '@/app/ui/Masonry';
import Typography from '@mui/material/Typography';

interface ArtistData {
  id: string;
  name: string;
  years: string;
  nationality: string;
  biography: string;
  movementIds: string[];
  imageUrl: string;
}

interface MovementData {
  id: string;
  name: string;
  period: string;
  origin: string;
  description: string;
  characteristics: string[];
  notableArtistsId: string[];
}

interface ArtworkData {
  id: string;
  title: string;
  year: number;
  description: string;
  location: string;
  artistId: string;
  movementId: string;
  imageUrl: string;
}

export async function generateStaticParams() {
    const res =  await fetch('https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/artists/');
    const artists: ArtistData[] = await res.json();

    return artists.map((artist) => ({
        artist: artist.id
    }));
}

export default async function ArtistPage({
    params
}: {
    params: Promise<{ artist: string}>
}) {
    const { artist } = await params;

    const [artistRes, artworksRes] = await Promise.all([
        fetch(`https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/artists/${artist}`),
        fetch(`https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/artworks/ByArtist/${artist}`)
    ])

    const artistData: ArtistData = await artistRes.json();
    const artworksData: ArtworkData[] = await artworksRes.json();

    const movements: MovementData[] = await Promise.all(
        artistData.movementIds.map(id =>
            fetch(`https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/movements/${id}`)    
            .then(res => res.json())
        )
    );

    return (
        <Box className='mx-6! sm:mx-18!'>
            <Typography className='font-mono! font-extralight! text-[2rem]! sm:text-4xl! text-center! sm:text-start! text-primary-light! dark:text-primary-dark! mt-5! sm:mt-15! mb-4! sm:mb-10!'>
                 {artistData.name}
            </Typography>
            <Box className='flex! flex-col! md:flex-row! items-stretch! gap-6! mb-5! sm:mb-10!'>
                <Box className='w-full! md:w-1/3! lg:w-1/4! shrink-0!'>
                    <Image
                        src={artistData.imageUrl}
                        alt={artistData.name}
                        width={600}
                        height={400}
                        className='rounded-md! h-full! object-cover!'
                    />
                </Box>

                <Box className='flex-1! flex! flex-col! gap-2! p-4! max-w-full! sm:max-w-full! md:max-w-3/4! lg:max-w-2/3! xl:max-w-1/2! 2xl:max-w-1/3! bg-primary-light/10! dark:bg-primary-dark/10! rounded-md!'>
                    <Typography className='font-mono! px-4! pb-1! sm:px-0! sm:pb-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                        <strong className='font-sans! text-[2rem]! sm:text-4xl/12!'>Nationality</strong><br/>{artistData.nationality}
                    </Typography>
                    <Typography className='font-mono! px-4! pb-1! sm:px-0! sm:pb-3 sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                        <strong className='font-sans! text-[2rem]! sm:text-4xl/12!'>Movements</strong><br/>{movements.map((item) => item.name).join(", ")}
                    </Typography>
                    <Typography className='font-mono! px-4! py-1! sm:px-0! sm:py-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                        <strong className='font-sans! text-[2rem]! sm:text-4xl/12!'>Years</strong><br/> {artistData.years}
                    </Typography>
                    <Typography className='font-mono! px-4! pb-2! sm:px-0! sm:pb-3! sm:mx-4! text-primary-light! dark:text-primary-dark! text-[1rem]! sm:text-md! font-extralight!'>
                        <strong className='font-sans! text-[2rem]! sm:text-4xl/13!'>Biography</strong><br/> {artistData.biography}
                    </Typography>
                </Box>
            </Box>

            <Typography className='font-mono! font-extralight! text-[2rem]! sm:text-4xl! text-center! sm:text-start! text-primary-light! dark:text-primary-dark! mt-5! sm:mt-15! mb-4! sm:mb-10!'>
                Famous Artworks
            </Typography>

            <ImageMasonry 
                data={artworksData}
            />
        </Box>
    )
}