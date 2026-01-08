const songs = [
  { title: "Song One", artist: "Artist A", src: "songs/song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "songs/song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "songs/song3.mp3" }
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songList = document.getElementById("songList");

function loadSong(index) {
  currentSong = index;
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  playPause(true);
  updateActive();
}

function playPause(forcePlay=false) {
  if (audio.paused || forcePlay) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextSong);

function setVolume(value) {
  audio.volume = value;
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

/* Playlist UI */
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.onclick = () => loadSong(index);
  songList.appendChild(li);
});

function updateActive() {
  document.querySelectorAll(".playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === currentSong);
  });
}

loadSong(0);
