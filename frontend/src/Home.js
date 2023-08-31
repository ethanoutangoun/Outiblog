
import BlogList from './BlogList';
import useFetch from './useFetch';


const Home = () => {

    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs'
   
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