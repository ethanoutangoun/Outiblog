import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function CommentPopover({ handleDelete, handleEdit, user, cuser, isAuthenticated }) {
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

            <div className="popover-action" onClick={()=>{
              handleEdit() 
              handleClose()}}>
              
              <EditOutlinedIcon />
              <button>Edit</button>
            </div>
            
            <div className="popover-action"  onClick={
              ()=>{handleDelete()
                  handleClose()}}>
              <DeleteForeverOutlinedIcon/>
              <button>Delete</button>
            </div>
            
        </div>: 
        <div className='popover-container'>
          <div className="popover-action"  onClick ={handleClose}>
            <FlagOutlinedIcon />
            <button>Report</button>
          </div>
          
       
        </div>
        }
      </Popover>
    </div>
  );
}
