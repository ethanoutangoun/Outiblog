import { Link } from 'react-router-dom'
import ProfilePopover from './ProfilePopover';
import Skeleton from '@mui/material/Skeleton';
import LoginButton from './LoginButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Navbar = ({ user, isAuthenticated, isLoading }) => {

    const history = useHistory();


    return ( 
        <nav className="navbar">
            <h1 className="title-icon" onClick={()=> history.push('/')}>Outiblog</h1>
            
            
            <div className="links">
                <Link to="/" draggable={false}>Home</Link>
                {/* isAuthenticated && <Link to="/friends" draggable={false}>Friends</Link>*/}
                { isAuthenticated && <Link to="/create" draggable={false}>New Blog</Link>}
                
                

                
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