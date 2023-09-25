import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { set } from "date-fns";

const Profile = ({ user, isAuthenticated, isLoading }) => {

    const history = useHistory();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [userBlogs, setUserBlogs] = useState(false);
    const [isPending, setIsPending] = useState(true);
    
  
    const uniqueId = user && user.sub
    const userUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/users/' + uniqueId
    const blogCount = userBlogs && userBlogs.length
    
    //useEffect to only run once when component mounts
    useEffect(() => {
        if (uniqueId != null) {
       
          fetch(userUrl, {
            method: 'GET',
          })
            .then(res => {

              if (res.ok){
                setIsPending(false);
                setIsRegistered(true);
              }

                //if user doesnt exist, create new user
              if (!res.ok) {
                fetch('https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/users', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        "user_id":  user.sub,
                        "username" : user.nickname,
                        "user_picture" : user.picture
                    })
                    }).then(()=>{
                        //do something else here before routing to main
                        setIsFirstTime(true);
                        setIsPending(false);
                        setIsRegistered(true);
                        
                        
                        
                    }) 
              }
              
              return res.json();
            })
            .then(data => {
              setUserBlogs(data.user_blogs);
         
              
            });
        }
      }, [uniqueId]);


      

    return ( 
        
       (isRegistered) && (
        //Render profile page if user is authenticated
        <div>


            <div className="userprofile-container">
                <div className="username-container">
                  <h3>{user.nickname}</h3>
                  {blogCount === 1 ? <p>{blogCount} blog</p> : <p>{blogCount} blogs</p>}
                </div>
                
                <p>Email: {user.email}</p>
                <p>Unique ID: {user.sub}</p>
            </div>
            







            <div>
                <h2>My Blogs</h2>
                {userBlogs && userBlogs.map((blog) => (
                  
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                      <h2>{blog.name}</h2>
                    </Link>

                    
                </div>)
                
                )}
                {blogCount === 0 && <p>You have no blogs yet!</p>}
                
            </div>
            
            
            
        </div>)

        //Render new user page if user is not authenticated
        || (!isRegistered && !isAuthenticated) && (
            <div>
                <h2>Looks like you're new here!</h2>
                <p>Click <Link to='/newuser'>here</Link> to return to the homepage!</p>
            </div>
        )

        //Render loading page if user is not authenticated
        || (!isRegistered && isPending) && (
            <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rectangular" width='100%' height={60} />
                <Skeleton variant="rounded" width='100%' height={60} />
            </Stack>
        )

        

        

        
     );
}
 
export default Profile;