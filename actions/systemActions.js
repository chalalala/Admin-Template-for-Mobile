import axios from 'axios'; 

export function getData(file){
   axios.get('https://chalalala.github.io/The2000th-API/',file)
   .then(response => {
      return response.data
   })
   .catch(function (error) {
       console.log(error);
   })
 }