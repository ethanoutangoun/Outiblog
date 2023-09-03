
import BlogList from './BlogList';
import useFetch from './useFetch';


const Home = ({ user, isAuthenticated, isLoading }) => {

    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs'
   
    const { data: blogs, isPending, error } = useFetch(blogUrl)   

    

    return ( 
        <div className="home">
            {!isLoading && !isAuthenticated &&  
                <div className="auth-message">
                 <p>Sign in to post your own blog!</p>
                </div>}
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && <BlogList blogs = {blogs} title = {"All Blogs"}/>}

        </div>
     );
}
 
export default Home;