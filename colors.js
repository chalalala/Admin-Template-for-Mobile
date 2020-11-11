const dict_colors = {
   "VTBLUE": "#007DDD",
   "VTGREEN": "#17ADB0",
   "DGREEN": "#1b6372",
   "LGREEN": "#15ab92",
   "GREY": "#bbbfca",
   "BLACK": "#222831",
}

export default function colors(name){
   return dict_colors[name];
}