import axios from 'axios'; 

// export const signIn = (email, pwd) => {
//    axios.post('http://192.168.1.3:5000/api/user/signin',{email: email, password: pwd})
//    .then(response => {
//        console.log(response.data);
//    })
//    .catch(function (error) {
//        console.log(error);
//    })
// }

const signUp = async (name, email, password) => {
   try {
      let res = await axios.post('http://192.168.1.3:5000/api/user/signup',
         {name: name,email: email, password: password})
   }
   catch(error){
      console.log(error);
   }
 }