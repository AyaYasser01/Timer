let select = document.querySelectorAll("select");
let currentTime = document.querySelector("h1");
let setAlarmBtn = document.querySelector("button");
let content = document.querySelector(".content");

let alarmTime , isAlarmSet = false;
let ringtone = new Audio("/احلي نغمة منبه عالية _ نغمات منبه للاستيقاظ _  رنات منبه (128 kbps).mp3");

for (let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    select[0].firstElementChild.insertAdjacentHTML("afterend",option)
}

for (let i = 59; i > 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    select[1].firstElementChild.insertAdjacentHTML("afterend",option)
}

for (let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    select[2].firstElementChild.insertAdjacentHTML("afterend",option)
}

setInterval (() => {
    // getting hour , mins , secs
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    // if hour value is 0 , set this value to 12 
    h = h == 0 ? h = 12 : h;
    
    // adding 0 before hr , min ,sec if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`

    if(alarmTime == `${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop = true
    }

},1000);

function setAlerm(){

    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerHTML = "Set Alarm";
        // return isAlarmSet value to false
        return isAlarmSet = false;
    }

    // getting hour, minute,ampm select tag value
    let time = `${select[0].value}:${select[1].value} ${select[2].value}`
    if(time.includes("Hour") ||time.includes("Minute") || time.includes("AM/PM")){
        return alert("please, select a valid time to set Alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerHTML = "Clear Alarm";


}

setAlarmBtn.addEventListener("click",setAlerm);