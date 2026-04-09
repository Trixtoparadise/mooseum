import Link from 'next/link';
import { Avatar, ButtonBase, Stack } from "@mui/material";

type PropType = {
    id: string;
    name: string;
    nationality: string;
    years: string;
    imageUrl: string;
}

export default function ArtistAvatar(props : PropType) {
    const { id, name, nationality, years, imageUrl } = props;

    return (
        <Stack className="bg-primary/90 hover:bg-shade/90 rounded-md min-w-50">
            <ButtonBase 
                className="flex grow py-2.5! px-6! overflow-hidden"
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}    
            >
                <Link href={`/artists/${id}#top`} prefetch>
                    <Stack 
                        direction='row' 
                        gap={1}
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                    <Avatar 
                        alt={name}
                        src={imageUrl}
                        className="sm:w-13.5! w-11! sm:h-13.5! h-11! border-2! border-shade!"
                    />
                    <Stack className="text-start!">
                        <p className="font-semibold font-mono text-secondary sm:text-[1rem] text-[0.85rem]">{name}</p>
                        <p className="font-light font-mono text-secondary sm:text-[0.8rem] text-[0.7rem]">{nationality}. {years}.</p>
                    </Stack>
                    </Stack>
                </Link>
            </ButtonBase>
        </Stack>
    )
}