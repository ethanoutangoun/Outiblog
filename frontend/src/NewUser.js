import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";

const NewUser = ({ user, isAuthenticated, isLoading }) => {

    const history = useHistory();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false);


    //if anonymous user tries to access this page, route them back to home
    if (!isLoading && !isAuthenticated){
        history.push('/')
    }

    const uniqueId = user && user.sub

 
    const userUrl = 'https://radiant-gorge-79799-b57d03ac0ddd.herokuapp.com/api/users/' + uniqueId
    
    //useEffect to only run once when component mounts
    useEffect(() => {
        if (uniqueId != null) {
          console.log(uniqueId);
          fetch(userUrl, {
            method: 'GET',
          })
            .then(res => {

              if (res.ok){
                
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
                        
                        
                        
                    }) 
              }
              
              return res.json();
            })
            .then(data => {
              console.log(data);
            });
        }
      }, [uniqueId, userUrl]);
            
    
      if (isRegistered){
        history.push('/')
      }

  
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
        {isRegistered && <h1>Registered</h1>}
        {isFirstTime && <h1>First Time</h1>}




    </div> );
}
 
export default NewUser;