import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface ExhibitionData {
  id: string;
  title: string;
  description: string;
  sections: Sections[];
}

interface Sections {
  sectionTitle: string;
  sectionDescription: string;
  artworks: Artworks[];
}

interface Artworks {
  artworkTitle: string;
  artworkDescription: string;
  imageUrl: string;
}

export async function generateStaticParams() {
    const res =  await fetch('https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/exhibitions/');
    const exhibitions: ExhibitionData[] = await res.json();

    return exhibitions.map((exhibition) => ({
        exhibition: exhibition.id
    }));
}

export default async function ExhibitionPage({
    params
}: {
    params: Promise<{ exhibition: string}>
}) {
    const { exhibition } = await params;
    const [exhibitionRes] = await Promise.all([
        fetch(`https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/exhibitions/${exhibition}`)
    ])

    const exhibitionData: ExhibitionData = await exhibitionRes.json();

    return (
        <Box className='mx-6! sm:mx-18! w-full! max-w-full! sm:max-w-7xl!'>
            <Typography className='font-mono! font-extralight! text-[2rem]! sm:text-5xl! uppercase text-center! sm:text-start! text-primary-light! dark:text-primary-dark! mt-5! sm:mt-15! mb-8!'>
                {exhibitionData.title}
            </Typography>
            {exhibitionData.sections.map((item, index) => {
                return (
                    <Box 
                        key={index} 
                        className="w-full!"
                    >
                        <Typography className='font-sans! text-[2rem]! sm:text-5xl! text-center! sm:text-start! text-primary-light! dark:text-primary-dark! mb-5!'>
                            {item.sectionDescription}
                        </Typography>                        
                        <Box>
                            <Masonry columns={{ xs: 1, md: 2, lg: 3}} spacing={{xs: 0, md: 2}} sequential>
                                {item.artworks.map((artwork) => {
                                    return (
                                        <Box 
                                            className="mb-4!"
                                            key={artwork.artworkTitle}
                                        >
                                             <img
                                                loading="lazy"
                                                alt={artwork.artworkTitle}
                                                className='rounded-t-md!'
                                                src={`${artwork.imageUrl}?w=500&auto=format`}
                                            />
                                            <Paper className='bg-primary-light/10! dark:bg-primary-dark/10! p-4 font-light! text-[1rem] text-center text-primary-light! dark:text-primary-dark! rounded-b-md!'>
                                                {artwork.artworkDescription}
                                            </Paper>
                                        </Box>
                                    )
                                })}
                            </Masonry>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}