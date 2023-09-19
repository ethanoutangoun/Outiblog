
import BlogList from './BlogList';
import useFetch from '../useFetch';
import { useState, useEffect } from 'react';

const Home = ({ user, isAuthenticated, isLoading }) => {

    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs'
   
    const { data: blogs, isPending, error } = useFetch(blogUrl)   
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Function to update the screen width state
    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        // Add a listener to window resize events
        window.addEventListener('resize', updateScreenWidth);

        // Clean up the event listener when the component unmounts
        return () => {
        window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    
    

    return ( 
        <div className="home">
            {!isLoading && !isAuthenticated &&  
                <div className="auth-message">
                 <p>Sign in to post your own blog!</p>
                </div>}
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && <BlogList blogs = {blogs} title = {"All Blogs"}/>}
        



            {screenWidth < 100 && <div>Hello</div> /*Sample code to show how to use state to render different components based on screen size*/}

        </div>
     );
}
 
export default Home;