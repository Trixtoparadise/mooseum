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
        <Stack className="bg-primary-light/90 dark:bg-primary-alternate/90 hover:bg-shade-light/90! dark:hover:bg-secondary-alternate! hover:bg-shade rounded-md min-w-50">
            <ButtonBase 
                className="flex grow py-2.5! px-6! overflow-hidden text-secondary-light! dark:text-secondary-alternate! sm:text-[1rem] dark:hover:text-primary-alternate!"
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
                        className="sm:w-13.5! w-11! sm:h-13.5! h-11! border-2! border-shade! dark:border-shade!"
                    />
                    <Stack className="text-start!">
                        <p className="font-semibold font-mono text-[0.85rem]">{name}</p>
                        <p className="font-light font-mono">{nationality}. {years}.</p>
                    </Stack>
                    </Stack>
                </Link>
            </ButtonBase>
        </Stack>
    )
}