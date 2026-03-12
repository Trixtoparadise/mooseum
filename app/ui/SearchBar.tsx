"use client";
import * as React from 'react';
import ClearIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PopupState, { bindPopper, bindFocus } from 'material-ui-popup-state';
import { Box, Fade, IconButton, InputBase, Paper, Popper  } from '@mui/material';

interface SearchableItem {
    name: string;
    [key: string]: any;
}

type PropType<T extends SearchableItem> = {
    searchItem: string;
    searchList?: T[];
}

export default function SearchBar<T extends SearchableItem>(props: PropType<T>) {
    const { searchItem, searchList } = props;
    const [value, setValue] = React.useState<string>("");
    
    return (
        <PopupState variant='popper' popupId='demo-popup-popper'>
            {(popupState) => (
                <div>
                    <Paper
                        component="form"
                        className='px-1! flex! items-center! w-80! bg-primary/20!'
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
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => { 
                            return (
                                <Fade {...TransitionProps} timeout={300}>
                                    <Paper className='w-80! max-h-80 overflow-y-scroll mt-3 bg-primary/20! '>
                                        {searchList?.map((item, index) => {
                                            const film = item.name;

                                            if (!value || value.trim().length < 1) {
                                                    return (
                                                        <Box 
                                                            key={index}
                                                            className='my-0.5! px-4! hover:bg-primary/20 transition-all duration-200 items-center!'
                                                            onClick={() => setValue(item.name)}
                                                            {...bindPopper(popupState)}
                                                        >
                                                            <p className='select-none py-2.5 text-shade!'>
                                                                {film}
                                                            </p>
                                                        </Box>
                                                    )
                                            }

                                            const indx = film.toLowerCase().indexOf(value.toLowerCase());
                                            const length = value.length;
                                            let leftText = film.substring(0, indx);
                                            let keyWord = film.substring(indx, indx + length);
                                            let rightText = film.substring(indx + length);

                                            if (indx < 0) {
                                                return null;
                                            } else {
                                                return (
                                                    <Box 
                                                        key={index}
                                                        className='my-0.5! px-4! hover:bg-primary/20 transition-all duration-200'
                                                        onClick={() => setValue(item.title)}
                                                        {...bindPopper(popupState)}
                                                    >
                                                        <p key={index} className='select-none py-2.5 text-shade!'>
                                                            {leftText + keyWord + rightText}
                                                        </p>
                                                    </Box>
                                                )
                                            }
                                        })}
                                    </Paper>
                                </Fade>
                            )
                        }}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
}