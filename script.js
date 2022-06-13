// // هنا تم تعريف الدالة كما هو مطلوب وجلعتها تطبع في الديف تعت العرض
function renderClock() {
    // هنا جبنا الوقت وخزناه في متغيرات
    const currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var zone = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
        hours = hours % 12;
    }
    // هنا عشان يطبع
    var currentTime = document.getElementById("current-time");
    const timeString = getTimeString({ hours, minutes, seconds, zone });
    checkAlarm(timeString);
    currentTime.innerHTML = timeString;

}
// هنا استخدمنا الدالة الجاهزة عشان يضل يحدث الوقت كما هو مطلوب
setInterval(renderClock, 1000);
var alarmString = null;
// تخزين العناصر الصوت في متغير
const alarmAudio = document.getElementById("alarm-audio");
const createAlarm = document.querySelector(".create-alarm");
const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("clear-alarm");
const alarmTextContainer = document.getElementById("alarm-text");
const alarmText = (time) => `Alarm set at time ${time}`;
// انشاء زر المنبه
const handleSubmit = (event) => {
    event.preventDefault();
    const { hour, sec, min, zone } = document.forms[0];
    alarmString = getTimeString({
        hours: hour.value,
        seconds: sec.value,
        minutes: min.value,
        zone: zone.value
    });
    // اعادة تعيين منبه
    document.forms[0].reset();
    // اخفاء المنبه
    createAlarm.style.display = "none";
    // عرض المنبه النشط
    activeAlarm.style.display = "block";
    alarmTextContainer.innerHTML = alarmText(alarmString);
};
const handleClear = () => {
    alarmString = "";
    activeAlarm.style.display = "none";
    createAlarm.style.display = "block";
};
//مسح المنبه
clearAlarm.addEventListener("click", handleClear);
document.forms[0].addEventListener("submit", handleSubmit);
// التحقق من التنبيه
const checkAlarm = (timeString) => {
    if (alarmString === timeString) {
        alarmAudio.play();
    }
};
const getTimeString = ({ hours, minutes, seconds, zone }) => {
    if (minutes / 10 < 1) {
        minutes = "0" + minutes;
    }
    if (seconds / 10 < 1) {
        seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds} ${zone}`;
};
