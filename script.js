const audio = new Audio("songs/song1.mp3");

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  alert("Next song logic here");
}

function prevSong() {
  alert("Previous song logic here");
}
