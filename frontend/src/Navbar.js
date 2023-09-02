import { Link } from 'react-router-dom'
import useFetch from './useFetch';
import ProfilePopover from './ProfilePopover';
import Skeleton from '@mui/material/Skeleton';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {

    
  
    const userUrl = 'https://my-json-server.typicode.com/ethanoutangoun/outiblog-jsonserver/user';
    //const { data, isPending, error } = useFetch(userUrl)   
    const { user, isAuthenticated, isLoading } = useAuth0();

    

    return ( 
        <nav className="navbar">
            <h1>Outiblog</h1>
            
            
            <div className="links">
                <Link to="/" draggable={false}>Home</Link>
                <Link 
                
                    to="/create" 
                    draggable={false}
                    >
                            New Blog</Link>
                

                
            </div>

            <div className="auth-buttons">
                {!isAuthenticated && <LoginButton/>}
                

            </div>
            
                    
            <div>
                { isLoading && 
                    <div className="profile-container">
                        <Skeleton className="profile-picture" variant="circular" width={30} height={30} draggable={false}/>
                    </div>
                }
                

                {isAuthenticated && <ProfilePopover data= {user} />}
                
            </div>

            
        </nav>
     );
}
 
export default Navbar;