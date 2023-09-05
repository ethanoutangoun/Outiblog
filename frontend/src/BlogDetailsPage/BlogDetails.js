
import useFetch from '../useFetch'
import Comments from "./Comments";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DeleteBlogModal from "./DeleteBlogModal";
import { format } from 'date-fns';

const BlogDetails = ({ user, isAuthenticated, loginWithRedirect }) => {

   
    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs/'    
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(blogUrl + id);
    const history = useHistory();//to redirect once delelted

    var blogDate;
    if (blog && blog.date){

        blogDate = new Date(blog.date)
        blogDate = (format(blogDate,"MMMM dd, yyyy"))
    }
    


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
                        <p style={{ color:'rgb(198, 198, 198)' }}>{blogDate}</p>

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