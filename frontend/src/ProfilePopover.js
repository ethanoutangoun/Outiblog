import * as React from 'react';
import Popover from '@mui/material/Popover';
import LogoutButton from './LogoutButton';


export default function ProfilePopover({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <h3>{user.name}</h3>
        <p>@ { user.nickname }</p>
        <LogoutButton />
       </div>
       
      </Popover>
    </div>
  );
}
