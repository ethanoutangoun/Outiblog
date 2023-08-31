
import BlogList from './BlogList';
import useFetch from './useFetch';


const Home = () => {

    const blogUrl = 'http://localhost:5000/api/blogs/'
   
    const { data: blogs, isPending, error } = useFetch(blogUrl)   

    

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && <BlogList blogs = {blogs} title = {"All Blogs"}/>}

        </div>
     );
}
 
export default Home;