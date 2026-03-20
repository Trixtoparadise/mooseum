"use client";
import Link from 'next/link';
import * as React from 'react';
import ClearIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PopupState, { bindPopper, bindFocus } from 'material-ui-popup-state';
import { Backdrop, Box, Fade, IconButton, InputBase, Paper, Popper, Typography } from '@mui/material';

interface SearchableItem {
    name: string;
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

    const filteredList = React.useMemo(() => {
        const list = searchList ?? [];
        const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name));

        if (!value.trim()) return sorted;

        return sorted.filter(item => 
            item.name.toLowerCase().includes(value.toLowerCase())
        );
    }, [searchList, value]);

    const groupedList = React.useMemo(() => {
        return filteredList.reduce((acc, item) => {
            const char = item.name.charAt(0).toUpperCase();
            if (!acc[char]) acc[char] = [];
            acc[char].push(item);
            return acc;
        }, {} as Record<string, T[]>);
    }, [filteredList]);
    console.log(Object.entries(groupedList))

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
                        className='relative! z-1300! px-1! flex! items-center! sm:w-80! w-full! bg-searchBg!'
                        sx={{ position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 2 }}
                    >
                        <SearchIcon className='m-2! text-shade!' aria-label="search" />
                        <InputBase
                            value={value}
                            {...bindFocus(popupState)}
                            onChange={(e) => ( setValue(e.currentTarget.value))}
                            className='flex-1! ml-0.5! text-shade! font-mono!'
                            placeholder={`Search ${searchItem}`}
                            inputProps={{ 'aria-label': `search ${searchItem}` }}
                        />
                        <IconButton 
                            type="button" 
                            className='p-2! text-shade!' 
                            aria-label="clear" 
                            onClick={() => setValue("")}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Paper>
                    <Popper 
                        {...bindPopper(popupState)} 
                        transition style={{ zIndex: 1300 }} 
                        className='sm:w-80! w-full!'
                    >
                        {({ TransitionProps }) => ( 
                                <Fade {...TransitionProps} timeout={300}>
                                    <Paper className='relative! max-h-78 overflow-y-scroll mt-3 sm:mx-0 mx-4 bg-searchBg!'>
                                        {Object.entries(groupedList).map(([letter, items]) => (
                                          <Box key={letter}>
                                            <Typography className='px-4! py-1! text-xl! font-bold! font-sans! small bg-primary! text-secondary! uppercase sticky top-0 z-10'>
                                                {letter}
                                            </Typography>

                                            {items.map((item, index) => {
                                                const artist = item.name;
                                                const indx = artist.toLowerCase().indexOf(value.toLowerCase());
                                                const length = value.length;
                                                
                                                const leftText = artist.substring(0, indx);
                                                const keyWord = artist.substring(indx, indx + length);
                                                const rightText = artist.substring(indx + length);

                                                return (
                                                    <Link key={index} href={`/${searchItem}s/${item.id}`}>
                                                        <Box 
                                                            key={`${letter}-${index}`}
                                                            className='cursor-pointer! my-0.5! px-4! hover:bg-primary/20 transition-all duration-200'
                                                            onClick={() => {
                                                                setValue(item.name);
                                                                popupState.close();
                                                            }} 
                                                        >
                                                            <p className='select-none py-2.5 text-shade!'>
                                                                {indx >= 0 && value ? (
                                                                    <>
                                                                        {leftText}
                                                                        <span className="font-bold text-primary">{keyWord}</span>
                                                                        {rightText}
                                                                    </>
                                                                ) : artist}
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
                </div>
            )}
        </PopupState>
    );
}