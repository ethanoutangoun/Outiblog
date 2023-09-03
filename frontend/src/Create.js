import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom'


const Create = ({user, isAuthenticated, isLoading, loginWithRedirect}) => {

    const blogUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/blogs'

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    //redirect to login if not signed in
    if (!isLoading && !isAuthenticated){
        loginWithRedirect()
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author:user.nickname };

        setIsPending(true);
        
        fetch(blogUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added')
            
            


            setIsPending(false);
            history.push('/')
        })

        
    }

 
    return ( 
        isAuthenticated ? (<div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type = "text" 
                    required
                    value ={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    

                <label>Blog body:</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e)=> setBody(e.target.value)}>
                </textarea>

               
                { !isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
          


                
                <Link className="secret" to="/iloveu">Hello</Link>
              
            </form>
        </div>):
        (<p>Loading</p>)
     );
}
 
export default Create;