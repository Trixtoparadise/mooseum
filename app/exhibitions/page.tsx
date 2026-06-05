"use client"
import * as React from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExhibitionButton from "../ui/ExhibitionButton";

interface Exhibition {
  id: string;
  title: string;
  description: string;
  sections: Sections[];
}

interface Sections {
  sectionString: string;
  sectionDescription: string;
  artworks: Artworks[];
}

interface Artworks {
  artworkTitle: string;
  artworkDescription: string;
  imageUrl: string;
}

export default function Exhibitions () {
    const [isLoading, setIsLoading] = React.useState(true);
    const [exhibitions, setExhibitions] = React.useState<Exhibition[]>([]);
    
    React.useEffect(() => {
        const GetExhibitions = async() => {
            const headersList = {
                "Accept": "*/*"
            }

            try {
                const response = await fetch("https://mooseum-gvb0g8gehsbde0fk.southafricanorth-01.azurewebsites.net/api/exhibitions/", { 
                    method: "GET",
                    headers: headersList
                });

                const data = await response.text();
                setExhibitions(JSON.parse(data));
                setIsLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        GetExhibitions();
    }, [])
    
    return (
        <div>
            {isLoading ? 
                (
                    <p>Loading...</p>
                ) :
                (
                    <Stack 
                        className="mx-4! sm:mx-18! my-5! sm:my-10!"
                    >
                        <Typography className="font-mono! font-extralight! sm:text-[2.3rem]! text-[2rem]! text-center! sm:text-start! mb-4! sm:mb-8!">Exhibitions</Typography>
                        <Stack>
                            <Box>
                                <ExhibitionButton 
                                    title={exhibitions[0].title}
                                    id={exhibitions[0].id}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                )
            }
        </div>
    )
}