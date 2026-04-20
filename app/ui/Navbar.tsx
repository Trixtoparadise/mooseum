"use client";
import Link  from 'next/link';
import * as React from 'react';
import { useTheme } from 'next-themes';
import { Contrast, Menu, LightMode, DarkMode, Palette, Man, ViewTimeline} from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';

export default function Navbar () {
    const [open, setOpen] = React.useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (mounted && !theme) {
            const systemTheme =
            resolvedTheme || 
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");
        
            setTheme(systemTheme);            
        }
    }, [mounted, theme, resolvedTheme, setTheme]);

    interface Route {
        path: string,
        name: string
    }
    
    const routes: Route[] = [
        { path: "/artists", name: "ARTISTS" },
        { path: "/artworks", name: "ARTWORKS" },
        { path: "/movements", name: "MOVEMENTS" },
    ];
    
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const MobileDrawer = () => {
        return(
            <Drawer 
                open={open}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: theme == 'light' ? '#360185' : '#2E0462',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23f5f5f5' fill-opacity='0.085'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");`
                        }
                    }
                }}
                className='relative! z-1300!'
                onClose={toggleDrawer(false)}
                sx={{ position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 2 }}
            >
                <Box className="w-70!" role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {routes.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton className='bg-shade-light! dark:bg-shade-dark! rounded-sm! my-1! mx-1.5!'>
                                    <ListItemIcon className='text-secondary! dark:text-secondary-light/90!'>
                                        {item.name == "ARTISTS" ? <Man /> : item.name == "ARTWORKS" ? <Palette /> : <ViewTimeline />}
                                    </ListItemIcon>
                                    <Link className='text-secondary dark:text-secondary-light/90! text-[1.5rem] font-sans -ml-4!' href={item.path} prefetch>{item.name}</Link>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>                
                </Box>
            </Drawer>
        )
    }


    return (
        <header className='mb-0 px-3! sm:px-18! font-sans'>
            <nav className='flex items-center justify-between w-full'>
                <Link 
                    href="/" 
                    className='hidden sm:flex text-[2.5rem] text-secondary-light! dark:text-secondary-alternate! hover:text-gray-200 dark:hover:text-gray-50 transition-colors duration-200 -mt-2! py-3! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80'
                >
                    MOOSEUM
                </Link>

                 <div className='hidden sm:flex sm:items-center sm:ml-auto'>
                    <ul className='flex flex-wrap items-center gap-6' aria-label='Primary navigation'>
                        {routes.map((item) => {
                            return (
                                <li key={item.name}>
                                    <Link 
                                        prefetch
                                        href={item.path} 
                                        className='text-[1.6rem] text-secondary-light! dark:text-secondary-alternate! hover:text-gray-200 dark:hover:text-gray-50 transition-colors duration-200 py-1 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80'
                                    >
                                        {item.name}
                                    </Link>
                                </li>        
                            )
                        })}
                        <li>
                            
                           <IconButton 
                                onClick={() => theme == 'light' ? setTheme('dark') : setTheme('light')}
                                className='hidden! sm:flex! mt-2!' 
                            >
                                {mounted ? 
                                    theme == 'light' ?
                                        <LightMode className={`h-6! w-6! text-secondary-light! dark:text-secondary-alternate! hover:text-gray-200 transition-colors duration-200 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80`} /> :
                                        <DarkMode className={`h-6! w-6! text-secondary-light! dark:text-secondary-alternate! hover:text-gray-200 transition-colors duration-200 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80`} />
                                    :
                                    <Contrast className={`h-6! w-6! text-secondary-light! dark:text-secondary-alternate! hover:text-gray-200 transition-colors duration-200 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80`} />
                                }
                            </IconButton> 
                        </li> 
                    </ul>
                </div>

                <IconButton 
                    onClick={toggleDrawer(true)}
                    className='sm:hidden! -m-2.5!' 
                >
                    <Menu className='h-9.5! w-9.5! text-secondary-light! dark:text-secondary-alternate!' />
                </IconButton>

                <MobileDrawer />
                
                <Link 
                    href="/" 
                    className='sm:hidden text-[2.3rem] text-secondary-light! dark:text-secondary-alternate! -mt-2! py-3!'
                >
                    MOOSEUM
                </Link>
                <IconButton 
                    onClick={() => theme == 'light' ? setTheme('dark') : setTheme('light')}
                    className='flex! sm:hidden! -m-2.5!' 
                >
                    {mounted ?
                        theme == 'light' ?
                            <LightMode className='h-8! w-8! text-secondary-light! dark:text-secondary-alternate!' /> :
                            <DarkMode className='h-7! w-7! text-secondary-light! dark:text-secondary-alternate!' />
                        :
                        <Contrast className='h-8! w-8! text-secondary-light! dark:text-secondary-alternate!' />
                    }
                </IconButton>
            </nav>
        </header>
    )
}