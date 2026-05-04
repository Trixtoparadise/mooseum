"use client";
import Link from 'next/link';
import * as React from 'react';
import Image from "next/image";
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PopupState, { bindPopper, bindFocus } from 'material-ui-popup-state';
import { Backdrop, Box, Fade, IconButton, InputBase, Paper, Popper, Stack, Typography } from '@mui/material';

interface SearchableItem {
    id: string;
    [key: string]: any;
}

type PropType<T extends SearchableItem> = {
    searchItem: string;
    searchList?: T[];
}

export default function SearchBar<T extends SearchableItem>(props: PropType<T>) {
    const { searchItem, searchList } = props;
    const [value, setValue] = React.useState<string>("");
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [toggleModal, setToggleModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<T | null>(null);

    const filteredList = React.useMemo(() => {
        const list = searchList ?? [];
        
        const sorted = [...list].sort((a, b) => {
            if (a.name?.length > 0) {
                return a.name.localeCompare(b.name)
            } else {
                return a.title?.localeCompare(b.title);
            }
        });

        if (!value.trim()) return sorted;

        return sorted.filter(item => {
            if (item.name?.length > 0) {
                return item.name?.toLowerCase().includes(value.toLowerCase())
            } else {
                return item.title?.toLowerCase().includes(value.toLowerCase())
            }
        });
    }, [searchList, value]);

    const groupedList = React.useMemo(() => {
        return filteredList.reduce((acc, item) => {
            const char = item.name?.length > 0 ? item.name?.charAt(0).toUpperCase() : item.title?.charAt(0).toUpperCase();
            if (!acc[char]) acc[char] = [];
            acc[char].push(item);
            return acc;
        }, {} as Record<string, T[]>);
    }, [filteredList]);

    return (
        <PopupState variant='popper' popupId='demo-popup-popper'>
            {(popupState) => (
                <div>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={popupState.isOpen}
                        onClick={popupState.close}
                    />
                    <Paper
                        component="form"
                        className='relative! z-1300! px-1! flex! items-center! sm:w-80! w-full! bg-searchBg-light! dark:bg-searchBg-dark!'
                        sx={{ position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 2 }}
                    >
                        <SearchIcon 
                            aria-label="search" 
                            className='m-2! text-shade-light! dark:text-shade-dark!' 
                        />
                        <InputBase
                            value={value}
                            {...bindFocus(popupState)}
                            placeholder={`Search ${searchItem}`}
                            onChange={(e) => (setValue(e.currentTarget.value))}
                            inputProps={{'aria-label': `search ${searchItem}`}}
                            className='flex-1! ml-0.5! text-shade-light! dark:text-shade-dark! font-mono!'
                        />
                        <IconButton 
                            type="button" 
                            aria-label="clear" 
                            onClick={() => setValue("")}
                            className='p-2! text-shade-light! dark:text-shade-dark!' 
                        >
                            <ClearIcon />
                        </IconButton>
                    </Paper>
                    <Popper 
                        {...bindPopper(popupState)} 
                        className='sm:w-80! w-full!'
                        transition style={{ zIndex: 1300 }} 
                    >
                        {({ TransitionProps }) => ( 
                            <Fade {...TransitionProps} timeout={300}>
                                <Paper className='relative! max-h-78 overflow-y-scroll mt-3 sm:mx-0 mx-4 bg-searchBg-light! dark:bg-searchBg-dark!'>
                                    {Object.entries(groupedList).map(([letter, items]) => (
                                        <Box key={letter}>
                                            <Typography className='px-4! py-1! text-xl! font-bold! font-sans! small bg-primary-light! dark:bg-primary-alternate! text-secondary-light! dark:text-secondary-alternate! uppercase sticky top-0 z-10'>
                                                {letter}
                                            </Typography>

                                            {items.map((item, index) => {
                                                const itemName : string = item.name?.length > 0 ? item?.name : item?.title;
                                                const indx : number = itemName?.toLowerCase().indexOf(value.toLowerCase());
                                                const length = value.length;
                                                
                                                const leftText : string = itemName?.substring(0, indx);
                                                const keyWord : string = itemName?.substring(indx, indx + length);
                                                const rightText : string = itemName?.substring(indx + length);
            
                                                return (
                                                    <Link key={index} href={item.name?.length > 0 ? `/${searchItem}s/${item.id}` : '#'}>
                                                        <Box 
                                                            key={`${letter}-${index}`}
                                                            className='cursor-pointer! my-0.5! px-4! hover:bg-primary-light/20 dark:hover:bg-primary-alternate/15! transition-all duration-200'
                                                            onClick={() => {
                                                                if (item.title?.length > 0) {
                                                                    setSelectedItem(item);
                                                                }
                                                                popupState.close();
                                                            }} 
                                                        >
                                                            <p className='select-none py-2.5 text-shade-light/80! dark:text-shade-dark/80!'>
                                                                {indx >= 0 && value ? (
                                                                    <>
                                                                        {leftText}
                                                                        <span className="font-extrabold text-shade-light! dark:text-shade-dark!">{keyWord}</span>
                                                                        {rightText}
                                                                    </>
                                                                ) : itemName}
                                                            </p>
                                                        </Box>
                                                    </Link>
                                                );
                                            })}
                                        </Box>  
                                    ))}
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                    <Modal
                        open={Boolean(selectedItem)}
                        onClose={() => setSelectedItem(null)}
                        className='bg-black/90! flex! items-center! justify-center!'
                    >
                        {selectedItem ? (
                            <Stack
                                direction="column"
                                justifyContent="space-between"
                                className='w-full! h-full! px-2! md:px-5! pointer-events-auto!' 
                            >
                                <IconButton 
                                    onClick={() => setSelectedItem(null)} 
                                    className="text-secondary-light! hover:bg-white/10! z-30! w-15! h-15! my-2! pointer-events-auto! mx-auto!"
                                >
                                    <Close className="text-[1.5rem]! md:text-[2rem]! lg:text-[3rem]!" /> 
                                </IconButton>
                                <Stack 
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    className='w-full! h-full! -mt-10! sm:-mt-15! px-2! md:px-5! pointer-events-auto!'
                                    gap={{ sm: 2, md: 3, lg: 4 }}
                                >
                                    <Box 
                                        mt={4} 
                                        className="w-full! md:w-[80%] lg:w-[55%]! max-h-[87vh] overflow-y-auto! border-none! rounded-lg! shadow-2xl! shadow-black/50! ring-2! ring-white/10! mx-auto!"
                                    >
                                            <Stack 
                                                direction="column" 
                                                className='w-full! h-full!'
                                                justifyContent="space-between" 
                                            >
                                                <div className='w-full overflow-y-auto grow scrollbar-hide'>
                                                    <Image
                                                        src={selectedItem.imageUrl}
                                                        alt={selectedItem.id}
                                                        width={1200}
                                                        height={800}
                                                        className='rounded-md w-full h-auto object-cover select-none! pointer-events-none!'
                                                    />
                                                </div>
                                                <Stack className='w-full sticky! bottom-0! bg-black/40! backdrop-blur-md! p-6! border-t! border-white/10! z-20 mt-auto!'>
                                                    <div className='max-w-full'>
                                                        <p className='text-secondary-light/80 text-[1.1rem] font-medium mt-1 mb-4'>{selectedItem.title} ({selectedItem.year})</p>
                                                        <p className='text-secondary-light/80 text-[1rem] font-light mt-1 leading-relaxed text-justify mb-4 max-w-full xl:max-w-3/4'>
                                                            {selectedItem.description}
                                                        </p>
                                                        <p className='text-secondary-light/80 text-[1rem] font-extralight mt-1 leading-relaxed italic'>
                                                            {selectedItem.location}
                                                        </p>
                                                    </div>
                                                </Stack>
                                            </Stack>
                                    </Box>
                                </Stack>
                            </Stack>
                        ) : (
                            <div />
                        )}
                    </Modal>
                </div>
            )}
        </PopupState>
    );
}