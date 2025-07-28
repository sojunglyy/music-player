import { songs } from "../data.js";

const songList = songs;
const audio = document.querySelector("#audio");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const songSlider = document.querySelector(".song-slider");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const backwardBtn = document.querySelector(".backward-btn");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");

let i = 0;
let currentSong = songList[i];

//setup music
const setUpMusic = (currentSong) => {
  //set audio
  audio.src = currentSong.path;

  //display song
  songName.innerHTML = currentSong.name;
  artistName.innerHTML = currentSong.artist;
  disk.style.backgroundImage = `url(${currentSong.cover})`;

  //set slider
  currentTime.innerHTML = "00:00";
  songSlider.value = 0;
  setTimeout(() => {
    const duration = audio.duration;
    songDuration.innerHTML = formatTime(duration);
    songSlider.max = duration;
  }, 300);

  //play music automatically
  if (!playBtn.className.includes("pause")) {
    audio.play();
    setInterval(moveSlider, 500);
  }
};

//format time
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (min < 10) {
    min = `0${min}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

//play/pause music
const playMusic = () => {
  if (playBtn.className.includes("pause")) {
    audio.play();
    setInterval(moveSlider, 500);
  } else {
    audio.pause();
  }
  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
};

//move slider while playing
const moveSlider = () => {
  const timeStamp = audio.currentTime;
  songSlider.value = timeStamp;
  currentTime.innerHTML = formatTime(timeStamp);
  //forward to the next song
  if (timeStamp == songSlider.max) {
    playNextSong();
  }
};

//set the new value on slider
const handleSliderChange = (e) => {
  audio.currentTime = songSlider.value;
  setInterval(moveSlider, 500);
};

//forward
const playNextSong = () => {
  if (i >= songList.length - 1) {
    i = 0;
  } else {
    i++;
  }
  autoPlay();
  setUpMusic(songList[i]);
};

//backward
const playPrevSong = () => {
  if (i === 0) {
    i = songList.length - 1;
  } else {
    i--;
  }
  autoPlay();
  setUpMusic(songList[i]);
};

//auto play when the new song is set
const autoPlay = () => {
  if (playBtn.className.includes("pause")) {
    playBtn.classList.remove("pause");
  }

  if (!disk.className.includes("play")) {
    disk.classList.add("play");
  }
};

//event listeners
playBtn.addEventListener("click", playMusic);
forwardBtn.addEventListener("click", playNextSong);
backwardBtn.addEventListener("click", playPrevSong);
songSlider.addEventListener("change", handleSliderChange);

setUpMusic(currentSong);
