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


for(let i=0; i<len-1; i++){
    let firstCC= firstC[1].cloneNode(true);
    countdownList.appendChild(firstCC);
}

let dateObjArr = [];
let countDownArr = [];
for(let i=0; i<dateStrArr.length; i++){
    dateObjArr.push(new Date(dateStrArr[i][0]));
}

let nowDate = new Date();
class CountDown {
    constructor(e,i){
        this.seconds = e.getSeconds();
        this.minutes = e.getMinutes();
        this.hours = e.getHours();
        this.dates = e.getDate();
        this.months = e.getMonth();
        this.years = e.getFullYear();
        this.leap = false;
        this.monthDate = 31;
        this.times = new Array(7);
        this.monthToDate();
        this.index = i;
        
        this.init();
    }
    init(){
        this.times[0] = this.seconds - nowDate.getSeconds();
        this.times[1] = this.minutes - nowDate.getMinutes();
        this.times[2] = this.hours - nowDate.getHours();
        this.times[3] = this.dates - nowDate.getDate();
        this.times[4] = 0;
        this.times[5] = this.months - nowDate.getMonth();
        this.times[6] = this.years - nowDate.getFullYear();

        if(this.times[0]<0){
            this.times[1]--;
            this.times[0]+=60;
        }
        if(this.times[1]<0){
            this.times[2]--;
            this.times[1]+=60;
        }
        if(this.times[2]<0){
            this.times[3]--;
            this.times[2]+=24;
        }
        if(this.times[3]<0){
            this.times[5]--;
            this.times[3]+=this.monthDate;
        }
        this.times[4]=Math.floor(this.times[3]/7);
        this.times[3]-=this.times[4]*7;
        if(this.times[3]<0){
            this.times[4]--;
            this.times[3]+=7;
        }
        if(this.times[5]<0){
            this.times[6]--;
            this.times[5]+=12;
        }
    }
    monthToDate(){
        if(this.years%4 === 0 && (this.years%400 === 0 || this.years%100 !== 0)){
            this.leap = true;
        }
        if(this.months+1 === 2){
            if(this.leap){
                this.monthDate = 29;
            }else{
                this.monthDate = 28;
            }
        }else if (this.months+1 === 4 || this.months+1 === 6 || this.months+1 === 9 || this.months+1 === 11 ){
            this.monthDate = 30;
        }
    }
    countDown(e){
        let levelNum = 7 - level;
        let counter = countdownList.children[this.index].querySelector(".counter");
        if(level<=5){
            if(this.times[0]>0){
                this.times[0]--;
            }else{
                if(this.times[1]>0){
                    this.times[1]--;
                }else{
                    if(level === 5){
                        this.times[1]--;
                    }else{
                        this.init();
                    }
                }
                this.times[0]+=59;
            }
                
                if(level>0){
                    for(let j=0; j<level; j++){
                        counter.children[j].firstChild.innerHTML = '';
                    }
                }
                //problems:
                for(let j =level; j<7; j++){
                    if(j===level && level>0){
                        if(level===1){
                            counter.children[j].firstChild.textContent = this.times[5]+this.times[6]*12;
                        }else if(level===2){
                            counter.children[j].firstChild.textContent = this.times[4]+Math.floor((this.times[5]*30+this.times[6]*12*30)/7);
                            this.times[3] = (this.dates - nowDate.getDate() + this.times[5]*30+this.times[6]*12*30)%7;
                        }else if(level===3){
                            counter.children[j].firstChild.textContent = this.times[3] + this.times[4]*7+ this.times[5]*30+this.times[6]*12*30;
                        }else if(level===4){
                            counter.children[j].firstChild.textContent = this.times[2] + (this.times[3] + this.times[4]*7+ this.times[5]*30+this.times[6]*12*30)*24;
                        }else if(level===5){
                            counter.children[j].firstChild.textContent = this.times[1] + (this.times[2] + (this.times[3] + this.times[4]*7+ this.times[5]*30+this.times[6]*12*30)*24)*60;
                        }
                        
                    }else{
                        if(this.times[6-j]<10){
                            counter.children[j].firstChild.textContent = '0' + this.times[6-j];
                        }else{
                            counter.children[j].firstChild.textContent = this.times[6-j];
                        }
                    }
                }

        }else if(level === 6){
            counter.children[6].firstChild.textContent = Math.floor((dateObjArr[this.index].getTime() - Date.now())/1000);
            for(let j=0; j<6; j++){
                counter.children[j].firstChild.innerHTML = '';
            }
        }
        
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
        //parseInt((dateObjArr[i].getTime() - Date.now())/1000);
}


setInterval(function(){
    counterNum++;
    if(counterNum%2 ===0){
        
        nowDate = new Date();
        for(let i=0; i<dateStrArr.length; i++){
            countDownArr[i].countDown(nowDate);
                //parseInt((dateObjArr[i].getTime() - Date.now())/1000);
        }
    }

},500);


for(let i=0;i<7;i++){
    tab[0].children[i].addEventListener("click",function(){
        level = i;
        for(let i=0; i<dateStrArr.length; i++){
            countDownArr[i].init();
            countDownArr[i].countDown(nowDate);
                //parseInt((dateObjArr[i].getTime() - Date.now())/1000);
        }
    });
}