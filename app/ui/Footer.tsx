import Link  from 'next/link';
import { Public } from '@mui/icons-material';

export default function Footer () {
    return (
        <footer className="bg-primary-light dark:bg-primary-alternate medium py-2">
            <h6 className="text-[0.7rem] sm:text-[0.9rem] text-secondary-light dark:text-secondary-alternate text-center font-mono">
                Public Domain <Public className='h-4! w-4!'/> 2026 Mooseum. Built by <Link href='https://github.com/Trixtoparadise' className='font-custom text-pink-200'>Trixtoparadise</Link>.
            </h6>
        </footer>
    )
}