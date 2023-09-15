import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import { v4 as uuidv4 } from 'uuid';

const NewUser = ({ user, isAuthenticated, isLoading }) => {

    const history = useHistory();
    
    //if anonymous user tries to access this page, route them back to home
    if (!isLoading && !isAuthenticated){
        history.push('/')
    }

    const uniqueId = user && user.sub

    //Step 2: Check if user exist in db, if so redirect them to home page

    //Attempt to grab data
    
    const userUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/users/' + uniqueId

    if (uniqueId != null){
        fetch(userUrl, {
            method: 'GET',
        }).then(res => {
               
            if(!res.ok){
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        }).then(data => {
            console.log(data)
        })}
            
    
 

    return
    // let uploaded = false
    // //if doesnt exist, populate database
    // if (user && !isPending && error && !uploaded){
    //     if (user){
    //     fetch('https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/users', {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json"},
    //     body: JSON.stringify({
    //         "user_id":  user.sub,
    //         "username" : user.nickname,
    //         "user_picture" : user.picture
    //     })
    //     }).then(()=>{
    //         //do something else here before routing to main
    //         uploaded = true;
    //         console.log('wow')
    //         history.push('/');
    // })
    // }
        
    // }

    
    

   

    

    return ( 
    <div>
        <h1>Loading</h1>

    </div> );
}
 
export default NewUser;