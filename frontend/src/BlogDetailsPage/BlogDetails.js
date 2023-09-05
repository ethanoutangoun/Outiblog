import useFetch from '../useFetch'
import Comments from "./Comments";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DeleteBlogModal from "./DeleteBlogModal";
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';


const BlogDetails = ({ user, isAuthenticated, loginWithRedirect }) => {
    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs/'    
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(blogUrl + id);
    const history = useHistory();
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState();
    const [initialBody, setInitialBody] = useState();
    const [updatedBlog, setUpdatedBlog] = useState(blog)

    var blogDate;
    if (blog && blog.date){

        blogDate = new Date(blog.date)
        blogDate = (format(blogDate,"MMMM dd, yyyy"))
    }
    
    useEffect(() => {
        // Update the component with the latest comments whenever the 'blog' prop changes
        setUpdatedBlog(blog);
      }, [blog]);



    //Handle Delete button
    const handleDelete = () =>{
        fetch(blogUrl + id, {
            method: 'DELETE'
        }).then(() => {
           
            history.push('/')
        })
    }


    const handleEdit = () =>{
        setIsEditing(!isEditing)
        setInitialBody(blog.body)
        setBody(blog.body)
    }

    const handleSubmit = () => {
        const updatedData = {
        ...updatedBlog
        };

        //set updated data to contain new body
        updatedData.body = body;

        fetch(blogUrl + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
            })
            .then(() => {
          
            // Update the state with the new comments to trigger a re-render
            setUpdatedBlog(updatedData);
            setIsEditing(false);
            setInitialBody();
            setBody();
            console.log(updatedData)
            
            })
            .catch((error) => {
            console.error("Error:", error);
            });

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

                        <div className="modify-blog-buttons">
                        {user && (blog.author === user.nickname) && <EditIcon onClick={handleEdit} style={{'cursor': 'pointer'}}/>}
                        {user && (blog.author === user.nickname) && <DeleteBlogModal handleClick = {handleDelete}/>}
                        </div>
                        
                     
                    </div>
                    <div className="blog-details-body">
                        <p>Written by {blog.author}</p>
                        <p style={{ color:'rgb(198, 198, 198)' }}>{blogDate}</p>

                        
                        {!isEditing ? <div>{updatedBlog && updatedBlog.body}</div> : <textarea className='edit-blog-textarea' value={body} onChange={(e)=> setBody(e.target.value)}></textarea>}
                        {isEditing && 
                        <div style={{
                            'display': 'flex',
                            'gap' : '10px',
                            'marginTop' : '3px'
                        }}>

                            <button onClick={()=> {setIsEditing(false)}}>Cancel</button>
                            {initialBody === body ? <button style={{backgroundColor : 'lightgray'}} disabled>Save</button> : <button onClick={handleSubmit}>Save</button>}
                        </div>}   
                        
                    </div>
                    
                   

                </article>
                
                {<Comments blog={blog} id={id} user = {user} isAuthenticated= {isAuthenticated} loginWithRedirect = {loginWithRedirect}/>}
                </div>
            )}
           
        </div>
     );
}
 
export default BlogDetails