"use client";
import * as React from 'react';
import Link  from 'next/link';
import { useRef } from 'react';
import { Menu, LightMode, Palette, Man, ViewTimeline} from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';



export default function Navbar () {
    const menuDetailsRef = useRef<HTMLDetailsElement>(null);
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

    const handleLinkClick = () => {
        if (menuDetailsRef.current)
            menuDetailsRef.current.removeAttribute('open');
    }
    
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
                            backgroundColor: '#360185'
                        }
                    }
                }}
                onClose={toggleDrawer(false)}
            >
                <Box className="w-70!" role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {routes.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton className='bg-shade! my-0.5!'>
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
        <header className='mb-0 px-3! sm:px-15! font-sans'>
            <nav className='flex items-center justify-between gap-4 w-full'>
                <Link 
                    href="/" 
                    onClick={handleLinkClick}
                    className='hidden sm:flex text-[2.5rem] text-text-onDark hover:text-gray-200 transition-colors duration-200 -mt-2! py-3! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80 font-heading'
                >
                    MOOSEUM
                </Link>

                 <div className='hidden sm:flex sm:items-center sm:ml-auto'>
                    <ul className='flex flex-wrap items-center gap-6' aria-label='Primary navigation'>
                        {routes.map((item) => {
                            return (
                                <li key={item.name}>
                                    <Link href={item.path} 
                                        className='text-[1.6rem] text-text-onDark/85 hover:text-gray-200 transition-colors duration-200 py-1 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80 font-heading'
                                    >
                                        {item.name}
                                    </Link>
                                </li>        
                            )
                        })}
                        <li>
                            <IconButton 
                                onClick={toggleDrawer(true)}
                                className='hidden sm:flex! hover:text-gray-200 transition-colors duration-200 mt-2! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80 font-heading' 
                            >
                                <LightMode className='h-6! w-6! text-secondary '/>
                            </IconButton>
                        </li> 
                    </ul>
                </div>

                <IconButton 
                    onClick={toggleDrawer(true)}
                    className='sm:hidden! hover:text-gray-200 transition-colors duration-200 -m-2.5! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80 font-heading' 
                >
                    <Menu className='h-9.5! w-9.5! text-secondary' />
                </IconButton>

                <MobileDrawer />
                
                <Link 
                    href="/" 
                    onClick={handleLinkClick}
                    className='sm:hidden text-[2.3rem] text-text-onDark hover:text-gray-200 transition-colors duration-200 -mt-2! py-3! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80 font-heading'
                >
                    MOOSEUM
                </Link>
                
                <IconButton 
                    onClick={toggleDrawer(true)}
                    className='sm:hidden! hover:text-gray-200 transition-colors duration-200 -m-2.5! focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-accent/80 font-heading' 
                >
                    <LightMode className='h-8! w-8! text-secondary '/>
                </IconButton>
            </nav>
        </header>
    )
}