"use client";
import * as React from 'react';
import Link  from 'next/link';
import { Menu, LightMode, Palette, Man, ViewTimeline} from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';



export default function Navbar () {
    const [open, setOpen] = React.useState(false);

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
                            backgroundColor: '#360185',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23f5f5f5' fill-opacity='0.085'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");`
                        }
                    }
                }}
                onClose={toggleDrawer(false)}
            >
                <Box className="w-70!" role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {routes.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton className='bg-shade! rounded-sm! my-1! mx-1.5!'>
                                    <ListItemIcon className='text-secondary!'>
                                        {item.name == "ARTISTS" ? <Man /> : item.name == "ARTWORKS" ? <Palette /> : <ViewTimeline />}
                                    </ListItemIcon>
                                    <Link className='text-secondary text-[1.5rem] font-sans' href={item.path}>{item.name}</Link>
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
                    className='hidden sm:flex text-[2.5rem] text-text-onDark hover:text-gray-200 transition-colors duration-200 -mt-2! py-3! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80'
                >
                    MOOSEUM
                </Link>

                 <div className='hidden sm:flex sm:items-center sm:ml-auto'>
                    <ul className='flex flex-wrap items-center gap-6' aria-label='Primary navigation'>
                        {routes.map((item) => {
                            return (
                                <li key={item.name}>
                                    <Link href={item.path} 
                                        className='text-[1.6rem] text-text-onDark/85 hover:text-gray-200 transition-colors duration-200 py-1 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80'
                                    >
                                        {item.name}
                                    </Link>
                                </li>        
                            )
                        })}
                        <li>
                            <IconButton 
                                onClick={toggleDrawer(true)}
                                className='hidden sm:flex! hover:text-gray-200 transition-colors duration-200 mt-2! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80' 
                            >
                                <LightMode className='h-6! w-6! text-secondary '/>
                            </IconButton>
                        </li> 
                    </ul>
                </div>

                <IconButton 
                    onClick={toggleDrawer(true)}
                    className='sm:hidden! -m-2.5!' 
                >
                    <Menu className='h-9.5! w-9.5! text-secondary' />
                </IconButton>

                <MobileDrawer />
                
                <Link 
                    href="/" 
                    className='sm:hidden text-[2.3rem] -mt-2! py-3!'
                >
                    MOOSEUM
                </Link>
                
                <IconButton 
                    onClick={toggleDrawer(true)}
                    className='sm:hidden! -m-2.5!' 
                >
                    <LightMode className='h-8! w-8! text-secondary '/>
                </IconButton>
            </nav>
        </header>
    )
}