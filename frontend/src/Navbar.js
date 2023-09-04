import { Link, useLocation } from 'react-router-dom'
import ProfilePopover from './ProfilePopover';
import Skeleton from '@mui/material/Skeleton';
import LoginButton from './LoginButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Navbar = ({ user, isAuthenticated, isLoading }) => {

    const history = useHistory();
    const location = useLocation();

    return ( 
        <nav className="navbar">
            <h1 className="title-icon" onClick={()=> history.push('/')}>Outiblog</h1>
            
            
            <div className="links">
                <Link to="/" draggable={false} className={location.pathname === '/' ? 'active-link' : ''}>Home</Link>
                {/* isAuthenticated && <Link to="/friends" draggable={false}>Friends</Link>*/}
                { isAuthenticated && <Link to="/create" draggable={false} className={location.pathname === '/create' ? 'active-link' : ''}>New Blog</Link>}
                
                

                
            </div>

            <div className="auth-buttons">
                {!isLoading && !isAuthenticated && <LoginButton/>}
                

            </div>
            
                    
         
                { isLoading && 
                    <div className="profile-container">
                        <Skeleton className="profile-picture" variant="circular" width={30} height={30} draggable={false}/>
                    </div>
                }
                

                {isAuthenticated && <ProfilePopover user= {user} />}
                
           

          

            
        </nav>
     );
}
 
export default Navbar;