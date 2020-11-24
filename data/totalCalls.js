export const totalCalls = {
   labels: [1,5,10,15,20,25,30],
   datasets: [
     {
       data: [4768035, 5541299, 4533163, 4067035, 4639045, 8164684],
       color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
       strokeWidth: 2
     }
   ],
   legend: ["No. of calls"]
 }; 