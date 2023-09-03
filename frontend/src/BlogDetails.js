
import useFetch from './useFetch'
import Comments from "./Comments";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DeleteBlogModal from "./DeleteBlogModal";


const BlogDetails = ({ user, isAuthenticated, loginWithRedirect }) => {

    //blog url
    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs/'
    

    //id is from the specified route
    
    const { id } = useParams();
    //const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const { data: blog, error, isPending } = useFetch(blogUrl + id);
    const history = useHistory();//to redirect once delelted

 


    //Handle Delete button
    const handleClick = () =>{
        fetch(blogUrl + id, {
            method: 'DELETE'
        }).then(() => {
           
            history.push('/')
        })
    }

   

    return ( 
        <div>
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { blog &&(
                <div>
                <article className="blog-details">
                    <div className="blog-details-head">
                        <h2>{ blog.title }</h2>
                        {/*<DeleteBlogModal handleClick = {handleClick}/>*/}


                        {user && (blog.author === user.nickname) && <DeleteBlogModal handleClick = {handleClick}/>}
                     
                    </div>
                    <div className="blog-details-body">
                        
                        <p>Written by {blog.author}</p>
                        <div>{blog.body}</div>   
                        
                    </div>
                    
                   

                </article>
                
                {<Comments blog={blog} id={id} user = {user} isAuthenticated= {isAuthenticated} loginWithRedirect = {loginWithRedirect}/>}
                </div>
            )}
           
        </div>
     );
}
 
export default BlogDetails