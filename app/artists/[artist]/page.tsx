import Image from 'next/image';
import ImageMasonry from '@/app/ui/Masonry';

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
        <div className='mx-6 sm:mx-18'>
            <h1 className='font-sans font-bold text-[2.7rem] sm:text-5xl text-primary mt-5 sm:mt-15 mb-4 sm:mb-10'>
                About artist:
            </h1>
            <div className=' flex flex-col md:flex-row items-stretch gap-6'>
                <div className='w-full md:w-1/3 lg:w-1/4 shrink-0 '>
                    <Image
                        src={artistData.imageUrl}
                        alt={artistData.name}
                        width={600}
                        height={400}
                        className='rounded-md h-full object-cover'
                    />
                </div>

                <div className='flex-1 flex flex-col gap-2 p-4 max-w-full sm:max-w-full md:max-w-3/4 lg:max-w-2/3 xl:max-w-1/2 2xl:max-w-1/3 bg-primary/10 rounded-md'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mx-0 sm:mx-4'>
                        <p className='px-4 py-1 sm:py-3 text-primary rounded-sm overflow-hidden'>
                            <strong className='block truncate font-sans text-[2rem] sm:text-4xl md:text-3xl lg:text-4xl font-bold -line-'>Name:</strong><br/>
                            <span className="block wrap-break-word text-md sm:text-lg md:text-md lg:text-lg font-light -mt-6">
                                {artistData.name}
                            </span>
                        </p>
                        <p className='px-4 py-1 sm:py-3 text-primary rounded-sm overflow-hidden'>
                            <strong className="block truncate font-sans text-[2rem] sm:text-4xl md:text-3xl lg:text-4xl font-bold ">Nationality:</strong><br/> 
                            <span className="block wrap-break-word text-md sm:text-lg md:text-md lg:text-lg font-light -mt-6">
                                {artistData.nationality}
                            </span>
                        </p>

                    </div>
                    <p className='px-4 py-1 sm:py-3 mx-0 sm:mx-4 text-primary rounded-sm text-md sm:text-lg md:text-md lg:text-lg font-light'>
                        <strong className='font-sans text-[2rem] sm:text-4xl md:text-3xl lg:text-4xl font-bold'>Movements:</strong><br/>{movements.map((item) => item.name).join(", ")}
                    </p>
                    <p className='px-4 py-1 sm:py-3 mx-0 sm:mx-4 text-primary rounded-sm text-md sm:text-lg md:text-md lg:text-lg font-light'>
                        <strong className='font-sans text-[2rem] sm:text-4xl md:text-3xl lg:text-4xl font-bold'>Years:</strong><br/> {artistData.years}
                    </p>
                    <p className='px-4 py-1 sm:py-3 mx-0 sm:mx-4 text-primary rounded-sm'>
                        <strong className='font-sans text-[2rem] sm:text-4xl md:text-3xl lg:text-4xl'>Biography:</strong><br/> 
                        <span className='text-md sm:text-lg md:text-md lg:text-lg font-light leading-relaxed'>{artistData.biography}</span>
                    </p>
                </div>
            </div>
            <h1 className='font-sans font-bold text-[2.5rem] sm:text-5xl text-primary mt-5 sm:mt-15 mb-4 sm:mb-10'>
                Famous Artworks:
            </h1>
            <ImageMasonry 
                data={artworksData}
            />
        </div>
    )
}