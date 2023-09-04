import * as React from 'react';
import Popover from '@mui/material/Popover';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfilePopover({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();
  const { logout } = useAuth0();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className='profile-container'>
      <img  onClick={handleClick} className="profile-picture" src={user.picture} width={30} height={30} alt="" draggable={false}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <div className="popover-content">
        <div className="popover-intro">
          <h3>{user.name}</h3>
          <p>@{user.nickname }</p>
        </div>
        
        <div className='popover-other'>
          <div className="profile-button" onClick={()=>{
            history.push('/profile');
            handleClose();
        }}>
            <PersonOutlineIcon />
            <p>Profile</p>
          </div>
          
        </div>

        <div className="profile-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <LogoutIcon/>
          <p>Logout</p>

        </div>
        
       </div>
       
      </Popover>
    </div>
  );
}
