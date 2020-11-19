const pauza = document.querySelector('#pauza');
let cas;
let interval;

function computeTime() {
    stop();
    cas = 600;
    if (document.location.hash) {
        const match = document.location.hash.match(/(\d+):(\d+)/);
        if (match) {
            cas = Number(match[1])*60+Number(match[2]);
        }
    }
    drawTime();
}

function drawTime() {
    const minuty = Math.floor(cas / 60);
    let sekundy = cas % 60;
    if (sekundy < 10) {
        sekundy = '0' + sekundy;
    }
    pauza.textContent = `${minuty}:${sekundy}`
}

function tick() {
    cas--;
    if (cas >= 0) {
        drawTime();
    } else {
        stop();
    }
}

function start() {
    drawTime()
    interval = window.setInterval(tick, 1000);
    document.documentElement.requestFullscreen();
}

function stop() {
    window.clearInterval(interval);
    interval = null;
}

function toggle() {
    if (interval) {
        stop();
    } else {
        start();
    }
}

computeTime();
window.addEventListener('hashchange', computeTime);
document.querySelector('.pauza').addEventListener('click', toggle);
