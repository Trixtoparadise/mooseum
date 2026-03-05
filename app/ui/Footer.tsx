import Link  from 'next/link';
import { Public } from '@mui/icons-material';

export default function Footer () {
    return (
        <footer className="bg-primary bg-pixel-grid py-2">
            <h6 className="text-[0.7rem] sm:text-[0.9rem] text-secondary text-center font-mono">
                Public Domain <Public className='h-4! w-4!'/> 2026 Mooseum. Built by <Link href='https://github.com/Trixtoparadise' className='font-custom text-pink-200'>Trixtoparadise</Link>.
            </h6>
        </footer>
    )
}