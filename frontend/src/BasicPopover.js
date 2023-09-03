
import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"

export default function BasicPopover({ handleDelete, handleEdit, user, cuser, isAuthenticated }) {
  const [anchorEl, setAnchorEl] = useState(null);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  




  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <MoreVertIcon className='expand-icon' onClick={handleClick} />
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

        {isAuthenticated && (user.nickname === cuser) ?
        <div className='popover-container'>
            <button onClick={()=>{
              handleEdit() 
              handleClose()}}>Edit</button>
            <button onClick={
              ()=>{handleDelete()
                  handleClose()}}>Delete</button>
        </div>: 
        <div className='popover-container'>
          <button onClick ={handleClose}>Report</button>
       
        </div>
        }
      </Popover>
    </div>
  );
}
