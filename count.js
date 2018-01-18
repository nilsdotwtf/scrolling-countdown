var outtime = 1000;

var countDownDate = new Date(datum).getTime();

var meldung = document.getElementById('online');
var now = new Date().getTime();
var timer = document.getElementById('timer');
var hourclass = document.getElementById('hours-group');
var daysclass = document.getElementsByClassName('days-group');
var timer = document.getElementsByClassName('timer--clock');
var seperator = document.getElementById('seperator1');
var unit = document.getElementsByClassName('time-unit');
    
var distance = countDownDate - now;

    var days = Math.floor((distance / (1000 * 60 * 60 * 24)));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours < 1 || hours == 0 ) {
        //timer.style.width = '350px';
        hourclass.style.display = 'none';
        seperator.style.display = 'none';
        unit[1].style.display = 'none';
        timer[0].style.width = '700px';
    }

    if (days < 1 || days == 0 ) {
      //timer.style.width = '350px';
      daysclass[0].style.display = 'none';
      seperator.style.display = 'none';
      unit[0].style.display= 'none';
      timer[0].style.width = '500px';
    }

    days = ('0'+ days).slice(-2);
    hours = ('0'+ hours).slice(-2);
    minutes = ('0'+ minutes).slice(-2);
    seconds = ('0'+ seconds).slice(-2);

    var filterTime = days + ":" + hours + ":" + minutes + ":" + seconds;

    var clock = document.getElementById('timer-clock');

    if (distance < 0) {
        clock = document.getElementById('timer-clock');
        clock.style.display = 'none';
        meldung.style.display = 'block';
        stopTimer();
    }

    if (distance < -1) {
        clock = document.getElementById('timer-clock');
        clock.style.display = 'none';
        meldung.style.display = 'block';
        stopTimer();
    }

function refresh () {
  window.location.reload(true);
}

function stopTimer () {
  clearTimeout(outtime);
}

TweenLite.defaultEase = Expo.easeOut;

initTimer(filterTime.toString());
var reloadBtn = document.querySelector('.reload');
var timerEl = document.querySelector('.timer');

function initTimer (t) {
   
   var self = this,
      timerEl = document.querySelector('.timer'),
      daysGroupEL = timerEl.querySelector('.days-group'),
      hoursGroupEL = timerEl.querySelector('.hours-group'),
      minutesGroupEl = timerEl.querySelector('.minutes-group'),
      secondsGroupEl = timerEl.querySelector('.seconds-group'),

      daysGroup = {
        firstNum: daysGroupEL.querySelector('.first'),
        secondNum: daysGroupEL.querySelector('.second')
       },

      hoursGroup = {
        firstNum: hoursGroupEL.querySelector('.first'),
        secondNum: hoursGroupEL.querySelector('.second')
       },

      minutesGroup = {
        firstNum: minutesGroupEl.querySelector('.first'),
        secondNum: minutesGroupEl.querySelector('.second')
       },

       secondsGroup = {
          firstNum: secondsGroupEl.querySelector('.first'),
          secondNum: secondsGroupEl.querySelector('.second')
       };

   var time = {
      dys: t.split(':')[0],
      hrs: t.split(':')[1],
      min: t.split(':')[2],
      sec: t.split(':')[3]
   };
   

   var timeNumbers;

   function updateTimer() {

      var timestr;
      var date = new Date();

      //date.days(time.dys);
      date.setHours(time.hrs);
      date.setMinutes(time.min);
      date.setSeconds(time.sec);

      var newDate = new Date(date.valueOf() - 1000);
      var temp = newDate.toTimeString().split(" ");
      var tempsplit = temp[0].split(':');

      time.dys = days;
      time.hrs = tempsplit[0];
      time.min = tempsplit[1];
      time.sec = tempsplit[2];

      timestr = time.dys + time.hrs + time.min + time.sec;
      timeNumbers = timestr.split('');
      updateTimerDisplay(timeNumbers);

      /*if(timestr === '000000') {
        countdownFinished();
      }*/

      if(timestr != '000000') {
        setTimeout(updateTimer, 1000);
      }

    setInterval(function() {
      if (timestr == '000001') {
        clock.style.display = 'none';
        meldung.style.display = 'block';
      }

      if (time.hrs < 1 || time.hrs == 0 ) {
        //timer.style.width = '350px';
        hourclass.style.display = 'none';
        seperator.style.display = 'none';
      }

      if (time.hrs > 1 || time.hrs == 1) {
        //hourclass.style.margin = '0 0 0 70px';
      }
    }, 1000)

   }

   function updateTimerDisplay(arr) {
      animateNum(daysGroup.firstNum, arr[0]);
      animateNum(daysGroup.secondNum, arr[1]);
      animateNum(hoursGroup.firstNum, arr[2]);
      animateNum(hoursGroup.secondNum, arr[3]);
      animateNum(minutesGroup.firstNum, arr[4]);
      animateNum(minutesGroup.secondNum, arr[5]);
      animateNum(secondsGroup.firstNum, arr[6]);
      animateNum(secondsGroup.secondNum, arr[7]);
   }

   function animateNum (group, arrayValue) {

      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
         y: - group.querySelector('.num-' + arrayValue).offsetTop
      });

   }
   
   setTimeout(updateTimer, outtime);

}