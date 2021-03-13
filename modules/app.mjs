import { config } from './config.mjs'
import { ls } from './storage.mjs'




/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Throw error if date is not set
        if (!settings.date) {
            return;
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset))

            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // calculate dates
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                // fix dates so that it will show two digets
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording
            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';

            // set to DOM
            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };

        // start
        var interval = setInterval(countdown, 300);
    };

})(jQuery);

let toTop = document.getElementsByClassName('link-to-top')[0]


function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments,
    later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    },
    callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow){
      func.apply(context, args);
    }
  }
}

window.addEventListener('scroll', debounce(function(evt){


   let top = window.pageYOffset || document.scrollTop;
   if(top === NaN || !top){
     toTop.classList.add('hidden');
   } else if(toTop.classList.contains('hidden')){
     toTop.classList.remove('hidden');
   }
   top = null;
   return;
}, 250))






particlesJS('particle', {
    'particles': {
      'number': {
        'value': 300,
        'density': {
          'enable': true,
          'value_area': 1800
        }
      },
      'color': {
        'value': '#ddd'
      },
      'shape': {
        'type': '',
        'random': true,
        'stroke': {
          'width': 0,
          'color': 'red'
        },
        'polygon': {
          'nb_sides': 6
        }
      },
      'opacity': {
        'value': 0.5,
        'random': true,
        'anim': {
          'enable': false,
          'speed': 1,
          'opacity_min': 0.1,
          'sync': false
        }
      },
      'size': {
        'value': 80,
        'random': true,
        'anim': {
          'enable': true,
          'speed_min': .2,
          'size_min': 2,
          'sync': false
        }
      },
      'line_linked': {
        'enable': true,
        'distance': 200,
        'color': '#ddd',
        'opacity': .3,
        'width': .6
      },
      'move': {
        'enable': true,
        'speed_min': 6,
        'direction': 'none',
        'random': true,
        'straight': false,
        'out_mode': 'out',
        'bounce': false,
        'attract': {
          'enable': false,
          'rotateX': 1200,
          'rotateY': 1200
        }
      }
    },
    'interactivity': {
      'detect_on': 'canvas',
      'events': {
        'onhover': {
          'enable': false,
          'mode': 'grab'
        },
        'onclick': {
          'enable': false,
          'mode': 'push'
        },
        'resize': true
      },
      'modes': {
        'grab': {
          'distance': 400,
          'line_linked': {
            'opacity': 1
          }
        },
        'repulse': {
          'distance': 200,
          'duration': 0.4
        },
        'push': {
          'particles_nb': 4
        },
        'remove': {
          'particles_nb': 2
        }
      }
    },
    'retina_detect': true
  });



function postData(data, dest, cb){

  fetch(config.fetchurl +'api/'+ dest, {
    method: 'POST',
    mode: 'cors',
    headers: config.headers,
    body: data
  })
  .then(function(res){

    if(res.status > 199 && res.status < 300){
      return res.json().then(function(data){
        cb(false, data);
      });
    }

    throw res.status
  })
  .catch(function(err){
    cb(err)
  });

}

function is_email(email){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
   return true;
  }
  return false;
}

//beta/subscribe
function addSubscribe(x){

  let ele = document.getElementById(x +'-inp'),
  dest = document.getElementById(x +'-result'),
  val = ele.value;

    if(val && !ls.get(x)){

      grecaptcha.ready(function() {
        grecaptcha.execute(config.recaptcha, {action: 'submit'}).then(function(token) {

            postData(JSON.stringify({email: val, sel: x, tk: token}), 'subscribe',function(err,res){
              if(err || res.code > 200){
                dest.classList.remove('lime');
                dest.classList.add('red');
                if(res.code > 200){
                  return dest.textContent = res.msg;
                }
                return dest.textContent = 'failed to post data';
              }

              ls.set(x, 1);
              console.log(x +' success')
              dest.classList.remove('red');
              dest.classList.add('lime');
              return dest.textContent = res.msg;
            })

        });
      });


  } else {

    dest.classList.remove('lime');
    dest.classList.add('red');

    if(ls.get(x)){
      return dest.textContent = 'email already subscribed'
    }
    return dest.textContent = 'invalid data'
  }

}


$(document).ready(function(){

  if(location.href === 'https://www.ioassistant.com/'){
    var countdown = $(".countdown");
    var data_finish_date = countdown.attr("data-finish-date");
    var data_UTC = countdown.attr("data-UTC");
    var data_finish_message = countdown.attr("data-finish-message");

    countdown.downCount({
        date: config.downCount.finish,
        offset: data_UTC
    }, function(){
        alert(data_finish_message);
    });

    let beta = document.getElementById('beta-btn'),
    news = document.getElementById('news-btn');

    beta.onclick = function(){
      addSubscribe('beta');
    }

    news.onclick = function(){
      addSubscribe('news');
    }
  } else if(location.pathname === '/api/subscription'){

    function subscription(){
      let obj = {},
      txtlg = document.getElementById('txt-lg'),
      txtsm = document.getElementById('txt-sm'),
      txtbtn = document.getElementById('txt-btn');

      location.search.slice(1).split('&').forEach(function(x){
        x = x.split('=');
        if(x[0] === 'sel'){
          x[1] = JSON.parse(x[1])
        }
        obj[x[0]] = x[1];
      });

      if(typeof obj.sel === 'boolean' && obj.type && obj.id){

        postData(JSON.stringify({email: obj.id, sel: obj.sel, type: obj.type}), 'confirm', function(err,res){
          txtbtn.classList.remove('hidden');
          if(err || res.code > 200){
            txtlg.textContent = 'ERROR';
            if(res.code > 200){
              return txtsm.textContent = res.msg;
            }

            txtsm.textContent = 'failed to post data';
            return;
          }

          txtlg.textContent = 'DONE';
          return txtsm.textContent = res.msg;
        })

      }
    }

    subscription()
  }

});

void function init() {
  //google analytics
  if(config.google.active){
    window.dataLayer = window.dataLayer || [];
    function gtag(){
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', config.google.analytics);
  }

  //tawkto
  if(config.tawk.active){
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    let s1=document.createElement("script");
    s1.defer=true;
    s1.src= [config.tawk.url,config.tawk.api].join('/');
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    document.body.append(s1);
  }
}();