/**
 * Created by justinhu on 19/10/2017.
 */
let tab = document.getElementsByClassName("tab");
let countdownList = document.getElementById("countdown-list");
let len = dateStrArr.length;
let firstC = countdownList.childNodes;
let level = 0;
let counterNum = 0;
let levelC=0;
let minuteC;
let levelArr;

for(let i=0; i<len-1; i++){
    let firstCC= firstC[1].cloneNode(true);
    countdownList.appendChild(firstCC);
}

let dateObjArr = [];
let countDownArr = [];
for(let i=0; i<dateStrArr.length; i++){
    dateObjArr.push(new Date(dateStrArr[i][0]));
}

let monthDates = [31,28,31,30,31,30,31,31,30,31,30,31]


let nowDate = new Date();
class CountDown {
    constructor(e,i){
        this.seconds = e.getSeconds();
        this.minutes = e.getMinutes();
        this.hours = e.getHours();
        this.dates = e.getDate();
        this.months = e.getMonth();
        this.years = e.getFullYear();

        this.leap = this.years%4 === 0 && (this.years%400 === 0 || this.years%100 !== 0);
        this.monthDate = monthDates[this.months];

        this.times = [
            {name:'secondChange',numberCounter:1},
            {name:'minuteChange',numberCounter:60},
            {name:'hourChange',numberCounter:60},
            {name:'dateChange',numberCounter:24},
            {name:'weekChange',numberCounter:7},
            {name:'monthChange',numberCounter:0},
            {name:'yearChange',numberCounter:12}
        ];
        this.index = i;
        this.counter = countdownList.children[this.index].querySelector(".counter");
        this.init();

    }

    init(){
        this.times[0].value = this.seconds - nowDate.getSeconds();
        this.times[1].value = this.minutes - nowDate.getMinutes();
        this.times[2].value = this.hours - nowDate.getHours();
        this.times[3].value = this.dates - nowDate.getDate();
        this.times[4].value = 0;
        this.times[5].value = this.months - nowDate.getMonth();
        this.times[6].value = this.years - nowDate.getFullYear();
        if(this.times[0].value<0){
            this.times[1].value--;
            this.times[0].value+=60;
        }
        if(this.times[1].value<0){
            this.times[2].value--;
            this.times[1].value+=60;
        }
        if(this.times[2].value<0){
            this.times[3].value--;
            this.times[2].value+=24;
        }
        if(this.times[3].value<0){
            this.times[5].value--;
            this.times[3].value+=this.monthDate;
        }

        this.times[4].value=Math.floor(this.times[3].value/7);
        this.times[3].value-=this.times[4].value*7;

        if(this.times[3].value<0){
            this.times[4].value--;
            this.times[3].value+=7;
        }
        if(this.times[5].value<0){
            this.times[6].value--;
            this.times[5].value+=12;
        }

        this.levelArr = this.getLevelArr(level);
        this.showNumInHtml(this.counter,this.levelArr);
    }

    countDown(e){
        if(this.times[0].value>0){
            this.times[0].value--;
            this.levelArr[6-level]--;
        }else{
            if(this.times[1].value>0){
                this.times[1].value--;
                this.levelArr[5-level]--;
            }else{
                if(level === 5){
                    this.times[1].value--;
                    this.levelArr[5-level]--;
                }else{
                    this.init();
                }
            }
            this.times[0].value+=59;
            this.levelArr[6-level]+=59;
        }
        this.showNumInHtml(this.counter,this.levelArr);
    }

    showNumInHtml(counter,levelArr){
        if(level>0){
            for(let j=0; j<level; j++){
                counter.children[j].firstChild.textContent = '';
            }
        }
        for(let j = level; j<7; j++){
            if(levelArr[j-level]<10){
                counter.children[j].firstChild.textContent = '0'+levelArr[j-level];
            }else{
                counter.children[j].firstChild.textContent = levelArr[j-level];
            }
        }
    }


    getLevelArr(level){
        let years = this.years-nowDate.getFullYear();

        // Get days
        let days = (years-1)*365;
        for(let i=0;i<=years; i++){
            if(i===0 && this.months<1){
            }else if(i===years&&nowDate.getMonth()>1){

            }else{
                if((this.years-i)%4 === 0){
                    days+=1;
                    console.log(days);
                }
            }
        }
        for(let i=0; i<this.months; i++){
            days+=monthDates[i];
        }
        if(nowDate.getDate()<this.dates || (nowDate.getDate()===this.dates && nowDate.getHours()<this.hours) || (
                nowDate.getDate()===this.dates && nowDate.getHours()===this.hours && nowDate.getMinutes() < this.minutes
            ) || (nowDate.getDate()===this.dates && nowDate.getHours()===this.hours && nowDate.getMinutes() === this.minutes && nowDate.getSeconds() <=this.seconds)){
            for(let i=nowDate.getMonth(); i<12; i++){

                days+=monthDates[i];

            }
        }else{
            for(let i=nowDate.getMonth()+1; i<12; i++){
                days+=monthDates[i];
            }
        }
        days += this.times[4].value*7;
        days += this.times[3].value; // this is all days

        // output time data Array
        let timeArr = [];

        if(level===0){ //年份
            timeArr.push(this.times[6].value);
            timeArr.push(this.times[5].value);
            timeArr.push(this.times[4].value);
            timeArr.push(this.times[3].value);
            timeArr.push(this.times[2].value);
            timeArr.push(this.times[1].value);
            timeArr.push(this.times[0].value);
        }else if(level===1){ //月份
            timeArr.push(this.times[6].value*12+this.times[5].value);
            timeArr.push(this.times[4].value);
            timeArr.push(this.times[3].value);
            timeArr.push(this.times[2].value);
            timeArr.push(this.times[1].value);
            timeArr.push(this.times[0].value);
        }else if(level ===2){ //周
            timeArr.push(Math.floor(days/7));
            timeArr.push(days%7);
            timeArr.push(this.times[2].value);
            timeArr.push(this.times[1].value);
            timeArr.push(this.times[0].value);
        }else if(level === 3){ //天
            timeArr.push(days);
            timeArr.push(this.times[2].value);
            timeArr.push(this.times[1].value);
            timeArr.push(this.times[0].value);
        }else if(level === 4){ //小时
            timeArr.push(this.times[2].value+days*24);
            timeArr.push(this.times[1].value);
            timeArr.push(this.times[0].value);
        }else if(level === 5){ //分钟
            timeArr.push(this.times[1].value+(this.times[2].value+days*24)*60);
            timeArr.push(this.times[0].value);
        }else if(level === 6){
            timeArr.push(this.times[0].value + (this.times[1].value+(this.times[2].value+days*24)*60)*60);
            //timeArr.push(Math.floor((dateObjArr[this.index].getTime() - Date.now())/1000));
        }
        return timeArr;
    }
}

function getTime(){
    for(let i=0; i<dateStrArr.length; i++){
        countDownArr[i] = new CountDown(dateObjArr[i],i);
    }
    return countDownArr;
}
getTime();

for(let i=0; i<dateStrArr.length; i++){
    countDownArr[i].countDown(nowDate);
}

setInterval(function(){
    nowDate = new Date();
    for(let i=0; i<dateStrArr.length; i++){
        countDownArr[i].countDown(nowDate);
    }
},1000);



for(let i=0;i<7;i++){
    tab[0].children[i].addEventListener("click",function(){
        level = i;
        for(let i=0;i<7;i++){
            tab[0].children[i].className = "";
        }
        this.className = 'active';

        for(let i=0; i<dateStrArr.length; i++){
            countDownArr[i].init();
            countDownArr[i].countDown(nowDate);
                //parseInt((dateObjArr[i].getTime() - Date.now())/1000);
        }
    });
}