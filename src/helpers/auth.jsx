 
 const getAuth = () => {
     const userData = {
         id_user: localStorage.getItem('id_user'),
         username: localStorage.getItem('username'),
         token: localStorage.getItem('token'),
         role: localStorage.getItem('role'),
     }
     
     return userData
 }

 export default getAuth
