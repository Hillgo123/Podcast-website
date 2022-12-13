const audio = document.querySelector('.audio');
const play_pause_btn = document.querySelector('.play_pause_btn');

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

const forward_btn = document.querySelector('.forward_btn');
const backward_btn = document.querySelector('.backward_btn');


forward_btn.addEventListener('click', function () {
    audio.currentTime += 10;
});

backward_btn.addEventListener('click', function () {
    audio.currentTime -= 10;
});

document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) { // Left arrow key
        audio.currentTime -= 10;
    } else if (e.keyCode == 39) { // Right arrow key
        audio.currentTime += 10;
    }

    if (e.keyCode === 32) {
        if (audio.paused) {
            audio.play();
            play_pause_btn.innerHTML = '&#9612;&#9612;';
        } else {
            audio.pause();
            play_pause_btn.innerHTML = '&#9654;';
        }
    }
});


time_bar.addEventListener('click', function (e) {
    const width = time_bar.offsetWidth;
    const percent = (e.offsetX / width) * 100;

    audio.currentTime = (percent / 100) * audio.duration;
});


const time_display = document.querySelector('.time_display');
let is_dragging = false;


time_bar.addEventListener('mousemove', function (e) {
    const width = time_bar.offsetWidth;
    const percent = (e.offsetX / width) * 100;

    const minutes = Math.floor((percent / 100) * audio.duration / 60);
    const seconds = Math.floor((percent / 100) * audio.duration - minutes * 60);
    time_display.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    if (is_dragging) {
        const width = time_bar.offsetWidth;
        const percent = (e.offsetX / width) * 100;

        audio.currentTime = (percent / 100) * audio.duration;
    }
});

time_bar.addEventListener('mouseup', function () {
    is_dragging = false;
});

time_bar.addEventListener('mouseout', function () {
    time_display.innerHTML = '&nbsp;';
});

time_bar.addEventListener('mousein', function () {
    time_display.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
});

