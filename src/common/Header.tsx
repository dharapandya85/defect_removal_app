import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/images/logo.svg';

const Header = () => {
    
    

    return (
        <div className="fs-header">
            <div className="logo">
                <img className="img" width="30" alt="solutions" src={logo}/>
                {('title')}
            </div>
            <div className="user text-right">
                <div>
                    <Button
                    //starticon={}
                    className="csp-color-white"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    //onClick={handleClick}
                    >

                    </Button>
                    <Menu id="simple-menu" >
                        return(
                            <MenuItem
                           // key={index}
                           // value={element.value}
                            className="csp-fontSize-14"
                            onClick={()=>{

                            }}>
                                {/* {element.name} */}
                            </MenuItem>
                        );
                    </Menu>
                </div>
                <div className="csp-fontsize-14 csp-margin-top-7">
                        <NotificationsIcon/>
                </div>
            </div>
            
        </div>
    );
};

export default Header;
