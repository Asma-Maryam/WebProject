import axios from 'axios'
export const register = newUser=>
{
    return axios.
    post('http://localhost:3000/api/register', 

    {
        name:newUser.name,
        email:newUser.email,
        password:newUser.password,
    }
    
    ).then((res) => 
                {
                  localStorage.setItem('name', res.data.message.name);
                  localStorage.setItem('email', res.data.message.email);
                }).catch((e) => {
                   console.log(e);
                    //handle your errors
                });
}


export const login = user=>
{
    return axios.
    post('http://localhost:3000/api/signin', 

    {
        email:user.UserEmail,
        password:user.UserPassword,
    }
    
    ).then((res) => 
                {
                  localStorage.setItem('name', res.data.message.name);
                  localStorage.setItem('email', res.data.message.email);
                  
                }).catch((e) => {
                   console.log(e);
                    //handle your errors
                });
}