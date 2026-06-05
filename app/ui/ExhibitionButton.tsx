"Use client"
import Link from 'next/link';
import Paper from "@mui/material/Paper";
import Background from '@/public/images/exhibition background.svg'
import Typography from "@mui/material/Typography";

type PropType = {
    id: string;
    title: string;
}

export default function ExhibitionButton (props: PropType) {
    const { id, title } = props;
    
    return (
        <Link
            prefetch
            href={`/exhibitions/${id}#top`}
        >
            <Paper className="cursor-pointer! bg-primary-light/90! dark:bg-primary-alternate/90! hover:bg-shade-light/90! dark:hover:bg-secondary-alternate! text-secondary-light! dark:text-secondary-alternate! dark:hover:text-primary-alternate! w-full! h-full! sm:w-100! sm:h-120! rounded-md!">
                <div>
                    <Background className="w-full! h-full! rounded-md!" />
                </div>
                <Typography
                    className="font-mono! font-light! mx-5! my-4! text-center!" 
                >
                    {title}
                </Typography>
            </Paper>
        </Link>
    ) 
}