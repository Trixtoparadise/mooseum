"use client"
import * as React from 'react';
import SearchBar  from "../ui/SearchBar"

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
            } catch (e) {
                console.error(e);
            }
        }

        getArtists();
    }, [])
    
    return (
        <div className="my-10 mx-19">
            <SearchBar 
                searchItem="artist" 
                searchList={artists}
            />
        </div>
    )
}