export const history_calls = {
   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
   datasets: [
     {
       data: [200, 450, 280, 800, 994, 435 ,985 ,100 , 489, 789, 356, 675],
       color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
       strokeWidth: 2
     }
   ],
   legend: ["No. of calls"]
 }; 