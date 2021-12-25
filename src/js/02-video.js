import Player from "@vimeo/player";
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Vimeo.Player(iframeRef);
iframeRef.addEventListener('play', onVideoStart);
player.on('play', throttle(function () {
   
        player.getCurrentTime().then(function (time) {
            console.log('title', time);
            localStorage.setItem('current-time', JSON.stringify(time))
        });

    }) ,1000);

const toStart = JSON.parse(localStorage.getItem('current-time'));
// console.log(toStart);
if (toStart) {
    player.setCurrentTime(toStart)
};

function onVideoStart(toStart) {
    console.log(toStart);
        }
