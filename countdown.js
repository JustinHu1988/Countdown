/**
 * Created by justinhu on 19/10/2017.
 */
let dateObjArr = [];
let countDown = [];
for(let i=0; i<dateStrArr.length; i++){
    dateObjArr.push(new Date(dateStrArr[i][0]));
}

let nowDate = new Date();
class CountDown {
    constructor(e){
        this.seconds = e.getSeconds();
        this.minutes = e.getMinutes();
        this.hours = e.getHours();
        this.dates = e.getDate();
        this.months = e.getMonth();
        this.years = e.getFullYear();

        this.init();
    }
    init(){
        this.seconds -= nowDate.getSeconds();
        this.minutes -= nowDate.getMinutes();
        this.hours -= nowDate.getHours();
        this.dates  -= nowDate.getDate();
        this.months -= nowDate.getMonth();
        this.years -= nowDate.getFullYear();

        if(this.seconds<0){
            this.minutes--;
            this.seconds+=60;
        }
        if(this.minutes<0){
            this.hours--;
            this.minutes+=60;
        }
        if(this.hours<0){
            this.dates--;
            this.hours+=24;
        }
        if(this.dates<0){
            this.months--;
            this.dates+=30;  //problems
        }
        if(this.months<0){
            this.years--;
            this.months+=12;
        }
    }
}





function getTime(){

    for(let i=0; i<dateStrArr.length; i++){
        countDown[i] = new CountDown(dateObjArr[i]);
            //parseInt((dateObjArr[i].getTime() - Date.now())/1000);
    }
    console.log(Date.now());
    return countDown;
}
getTime();
setInterval(function(){
    //document.getElementById("countdown").innerHTML = getTime();
},1000);

console.log(countDown);



