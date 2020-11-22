export const history_calls = {
   labels: ["1","5","10","15","20","25","30"],
   datasets: [
     {
       data: [200, 450, 280, 800, 994, 435 ,985],
       color: (opacity = 1) => `rgb(73, 178, 123, ${opacity})`,
       strokeWidth: 2
     }
   ],
   legend: ["No. of calls"]
 }; 