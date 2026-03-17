"use client";
import * as React from 'react';
import ClearIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PopupState, { bindPopper, bindFocus } from 'material-ui-popup-state';
import { Backdrop, Box, Fade, IconButton, InputBase, Paper, Popper } from '@mui/material';

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
                        {({ TransitionProps }) => { 
                            return (
                                <Fade {...TransitionProps} timeout={300}>
                                    <Paper className='relative! max-h-80 overflow-y-scroll mt-3 sm:mx-0 mx-4 bg-searchBg!'>
                                        {searchList?.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => {
                                            const artist = item.name;

                                            if (!value || value.trim().length < 1) {
                                                    return (
                                                        <Box 
                                                            key={index}
                                                            className='cursor-pointer! my-0.5! px-4! hover:bg-primary/20 transition-all duration-200 items-center!'
                                                            onClick={() => {
                                                                setValue(item.name);
                                                                popupState.close();
                                                            }} 
                                                        >
                                                            <p className='select-none py-2.5 text-shade!'>
                                                                {artist}
                                                            </p>
                                                        </Box>
                                                    )
                                            }

                                            const indx = artist.toLowerCase().indexOf(value.toLowerCase());
                                            const length = value.length;
                                            let leftText = artist.substring(0, indx);
                                            let keyWord = artist.substring(indx, indx + length);
                                            let rightText = artist.substring(indx + length);

                                            if (indx < 0) {
                                                return null;
                                            } else {
                                                return (
                                                    <Box 
                                                        key={index}
                                                        className='cursor-pointer! my-0.5! px-4! hover:bg-primary/20 transition-all duration-200'
                                                        onClick={() => {
                                                            setValue(item.name);
                                                            popupState.close();
                                                        }} 
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