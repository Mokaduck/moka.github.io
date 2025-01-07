const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light"),
    sidebarCloseToggle = document.querySelector(".sidebarClose"),
    sidebarOpen = document.querySelector(".sidebarOpen");

let getMode = localStorage.getItem("mode");
    if(getMode && getMode === "dark-mode"){
    body.classList.add("dark");
}

modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active"),
        body.classList.toggle("dark")
    if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});

sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

body.addEventListener("click", e => {
    let clickedElm = e.target;
    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
});

// search-input
function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const fruits = document.querySelectorAll('#fruits li');
    const resultsDiv = document.getElementById('results');
    let results = '';

    fruits.forEach(fruit => {
        if (fruit.textContent.toLowerCase().includes(query)) {
            results += fruit.outerHTML;
        }
    });

    if (results) {
        resultsDiv.innerHTML = '<p>Results:</p><ul>' + results + '</ul>';
        resultsDiv.style.display = 'block';
    } else {
        resultsDiv.innerHTML = '';
        resultsDiv.style.display = 'none';
    }
}

// audio
document.querySelectorAll('.audio-container').forEach(container => {
    const audioElement = container.querySelector('.audio');
    const playBtn = container.querySelector('.play-btn');
    const stopBtn = container.querySelector('.stop-btn');
    const muteBtn = container.querySelector('.mute-btn');
    const volumeSlider = container.querySelector('.volume-slider');
    const currentTimeElement = container.querySelector('.current-time');
    const audioSrc = container.dataset.src;

    const audioTrack = WaveSurfer.create({
        container: audioElement,
        waveColor: "#2d88ea",
        progressColor: "#464646",
        height: 70,
        barWidth: 0,
    });

    audioTrack.load(audioSrc);

    playBtn.addEventListener("click", () => {
        audioTrack.playPause();

        if (audioTrack.isPlaying()) {
            playBtn.classList.add("playing");
        } else {
            playBtn.classList.remove("playing");
        }
    });

    stopBtn.addEventListener("click", () => {
        audioTrack.stop();
        playBtn.classList.remove("playing");
        updateTimeDisplay(0); // Reset time display when stopped
    });

    volumeSlider.addEventListener("input", () => {
        changeVolume(volumeSlider.value);
    });

    const changeVolume = (volume) => {
        if (volume == 0) {
            muteBtn.classList.add("muted");
        } else {
            muteBtn.classList.remove("muted");
        }

        audioTrack.setVolume(volume);
    };

    muteBtn.addEventListener("click", () => {
        if (muteBtn.classList.contains("muted")) {
            muteBtn.classList.remove("muted");
            audioTrack.setVolume(0.5);
            volumeSlider.value = 0.5;
        } else {
            audioTrack.setVolume(0);
            muteBtn.classList.add("muted");
            volumeSlider.value = 0;
        }
    });

    const updateTimeDisplay = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        currentTimeElement.textContent = formattedTime;
    };

    // Update the time display every second
    audioTrack.on('audioprocess', () => {
        updateTimeDisplay(audioTrack.getCurrentTime());
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var audioContainers = document.querySelectorAll('.audio-container');
    
    audioContainers.forEach(function(container) {
        var trackNameElement = container.querySelector('.track-name');
        var originalTrackName = trackNameElement.textContent;
        
        if (originalTrackName.length > 26) {
            trackNameElement.textContent = originalTrackName.substring(0, 26) + '...';
        }
    });
});