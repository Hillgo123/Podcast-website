const audio = document.querySelector('.audio');
const play_pause_btn = document.querySelector('.play_pause_btn');
const mute_unmute_btn = document.querySelector('.mute_unmute_btn');

const time_bar = document.querySelector('.time_bar');
const progress = document.createElement('div');
progress.classList.add('progress');
time_bar.appendChild(progress);


const time = document.querySelector('.time');

audio.addEventListener('timeupdate', function () {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime - minutes * 60);
    time.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
});

play_pause_btn.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();

        play_pause_btn.innerHTML = '&#9612;&#9612;';
    } else {
        audio.pause();
        play_pause_btn.innerHTML = '&#9654;';
    }
});

mute_unmute_btn.addEventListener('click', function () {
    if (audio.muted) {
        audio.muted = false;
        mute_unmute_btn.innerHTML = 'Mute';
    } else {
        audio.muted = true;
        mute_unmute_btn.innerHTML = '<img src="img/volume-mute.png" alt="">';
    }
});

const forward_btn = document.querySelector('.forward_btn');
const backward_btn = document.querySelector('.backward_btn');


forward_btn.addEventListener('click', function () {
    audio.currentTime += 10;
});

backward_btn.addEventListener('click', function () {
    audio.currentTime -= 10;
});

time_bar.addEventListener('click', function (e) {
    const width = time_bar.offsetWidth;
    const percent = (e.offsetX / width) * 100;

    audio.currentTime = (percent / 100) * audio.duration;
});

const timeDisplay = document.querySelector('.time_display');

time_bar.addEventListener('mousemove', function (e) {
    const width = time_bar.offsetWidth;
    const percent = (e.offsetX / width) * 100;

    const minutes = Math.floor((percent / 100) * audio.duration / 60);
    const seconds = Math.floor((percent / 100) * audio.duration - minutes * 60);
    timeDisplay.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
});