import { Link } from 'react-router-dom'
import useFetch from './useFetch';
import ProfilePopover from './ProfilePopover';
import Skeleton from '@mui/material/Skeleton';
import LoginButton from './LoginButton';



const Navbar = ({ user, isAuthenticated, isLoading }) => {

    


    return ( 
        <nav className="navbar">
            <h1>Outiblog</h1>
            
            
            <div className="links">
                <Link to="/" draggable={false}>Home</Link>
                {/* isAuthenticated && <Link to="/friends" draggable={false} disabled>Friends</Link>*/}
                { isAuthenticated && <Link to="/create" draggable={false} disabled>New Blog</Link>}
                
                

                
            </div>

            <div className="auth-buttons">
                {!isLoading && !isAuthenticated && <LoginButton/>}
                

            </div>
            
                    
            <div>
                { isLoading && 
                    <div className="profile-container">
                        <Skeleton className="profile-picture" variant="circular" width={30} height={30} draggable={false}/>
                    </div>
                }
                

                {isAuthenticated && <ProfilePopover user= {user} />}
                
            </div>

          

            
        </nav>
     );
}
 
export default Navbar;