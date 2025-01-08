// function getRandomPastelColor() {
//     // Generate a random color with a restricted range to avoid bright colors
//     const red = Math.floor(150 + Math.random() * 100);   // 150-250 range for softer red
//     const green = Math.floor(150 + Math.random() * 100); // 150-250 range for softer green
//     const blue = Math.floor(150 + Math.random() * 100);  // 150-250 range for softer blue
//     return `rgb(${red}, ${green}, ${blue})`;
// }

// function setRandomGradient() {
//     // Get two random pastel colors
//     const color1 = getRandomPastelColor();
//     const color2 = getRandomPastelColor();

//     // Apply a linear gradient background to the element with the class "gradient-background"
//     document.querySelector('.right').style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
// }

// // Change the gradient every 10 seconds for a very subtle transition
// setInterval(setRandomGradient, 2000);

// // Set initial gradient on page load
// setRandomGradient();

console.log("get started with JavaScript")

// on click to any playlist from left side the subsong will appear

// console.log(document.querySelector(".most").children[0].children)
// Select the '.most' container and all 'li' elements within it
// Select elements
const mostContainer = document.querySelector('.most');
const songsListContainer = document.querySelector('.songs_list');
const listItems = mostContainer.querySelectorAll('li');
const rightContainer = document.querySelector(".card2_wrap")
const listRightCard = rightContainer.querySelectorAll("li")
const featureContainer = document.querySelector(".feature_song")
const Right_Container = document.querySelector(".right")

// console.log(listItems[0])
const homeButton = document.querySelector('#home_btn');

function showSongsList() {
  mostContainer.style.display = 'none';
  songsListContainer.style.display = 'flex';
}

function showMostContainer() {
  songsListContainer.style.display = 'none';
  mostContainer.style.display = 'flex';
  featureContainer.style.display = 'none';
  Right_Container.style.display = 'flex';
  document.querySelector('.search_SONG_Container').style.display = "none"
  Right_Container.style.display = 'flex';


}

listItems.forEach(li => {
  li.addEventListener('click', showSongsList);
});
homeButton.addEventListener('click', showMostContainer);

// numbering funcation below

// Select all 'li' elements within '.songs_list'
const listItems1 = document.querySelectorAll('.songs_list ul li');

listItems1.forEach((item, index) => {
  const numberElement = item.querySelector('.song_number');
  numberElement.textContent = index + 1; // Set the text to the current index + 1
});


// Array holding song data
const LikedSongsData = [
  {
    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"
  },
  {
    title: "BESABRIYAAN",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/liked_Songs/BESABRIYAAN Full Video Song  M. S. DHONI - THE UNTOLD STORY  Sushant Singh Rajput.mp3"
  },
  {
    title: "Chal Wahan Jaate Hain",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Chal Wahan Jaate Hain Full Song with LYRICS - Arijit Singh  Tiger Shroff, Kriti Sanon  T-Series.mp3"
  },
  {
    title: "Dil Meri Na Sune Lyrical",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Dil Meri Na Sune Lyrical - Genius  Utkarsh Sharma, Ishita  Atif Aslam  Himesh Reshammiya.mp3"
  },
  {
    title: "Mohe Rang Do Laal",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Mohe Rang Do Laal (Official Video Song)  Bajirao Mastani  Ranveer Singh & Deepika Padukone.mp3"
  },
  {
    title: "Tere Pyaar Mein",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Tere Pyaar Mein (Song) Tu Jhoothi Main Makkaar Ranbir, Shraddha Pritam Arijit, Nikhita  Amitabh.mp3"
  },
  {
    title: "The Humma Song",
    playlist: "Liked Songs",
    singer: "jubin nautiyal",
    filePath: "songs/liked_Songs/The Humma Song  OK Jaanu  Shraddha Kapoor  Aditya Roy Kapur  @ARRahman, Badshah, Tanishk.mp3"
  },
  {
    title: "WAJAH TUM HO ",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/liked_Songs/WAJAH TUM HO Full Video Song  HATE STORY 3 Songs  Zareen Khan, Karan Singh Grover  T-Series.mp3"
  },
  {
    title: "Song Title 2",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "path/to/song2.mp3"
  }
  // Add more songs as needed
];
const sandeepMaheshwari = [
  {
    title: "BE FEARLESS - Motivational Video",
    playlist: "sandeepMaheshwari",
    singer: "sandeep Maheshwari",
    filePath: "songs/sandeepMaheshwari/BE FEARLESS - Motivational Video By Sandeep Maheshwari.mp3"
  },
  {
    title: "MORNING MOTIVATIONAL VIDEO",
    playlist: "sandeepMaheshwari",
    singer: "sandeep Maheshwari",
    filePath: "songs/sandeepMaheshwari/MORNING MOTIVATIONAL VIDEO - Sandeep Maheshwari  DAILY MORNING AFFIRMATIONS Hindi.mp3"
  },
  {
    title: "POWERFUL MOTIVATIONAL VIDEO By Sandeep Maheshwari",
    playlist: "sandeepMaheshwari",
    singer: "sandeep Maheshwari",
    filePath: "songs/sandeepMaheshwari/POWERFUL MOTIVATIONAL VIDEO By Sandeep Maheshwari  Best Motivational Quotes.mp3"
  }

  // Add more songs as needed
];
const Arijit_singh = [
  {
    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"
  },
  {
    title: "ANIMAL_ SATRANGA(Song)",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/Arijit_Singh/ANIMAL_ SATRANGA(Song) Ranbir Kapoor,Rashmika_Sandeep V_Arijit,Shreyas P,Siddharth-Garima _Bhushan K [ ezmp3.cc ].mp3"
  },
  {
    title: "Chal Wahan Jaate Hain",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Chal Wahan Jaate Hain Full Song with LYRICS - Arijit Singh  Tiger Shroff, Kriti Sanon  T-Series.mp3"
  },
  {
    title: "Dil Meri Na Sune Lyrical",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Dil Meri Na Sune Lyrical - Genius  Utkarsh Sharma, Ishita  Atif Aslam  Himesh Reshammiya.mp3"
  },
  {
    title: "Mohe Rang Do Laal",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Mohe Rang Do Laal (Official Video Song)  Bajirao Mastani  Ranveer Singh & Deepika Padukone.mp3"
  },
  {
    title: "Tere Pyaar Mein",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Tere Pyaar Mein (Song) Tu Jhoothi Main Makkaar Ranbir, Shraddha Pritam Arijit, Nikhita  Amitabh.mp3"
  },
  {
    title: "Apna Bana Le",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/Arijit_Singh/Apna Bana Le - Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya [ ezmp3.cc ].mp3"
  },
  {
    title: "Sajni (Song)_ Arijit Singh ",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/Arijit_Singh/Sajni (Song)_ Arijit Singh, Ram Sampath  Laapataa Ladies   Aamir Khan Productions.mp3"
  },
  {
    title: "Song Title 2",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "path/to/song2.mp3"
  }
  // Add more songs as needed
];
const Arijit_topTrack = [
  {
    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"
  },
  {
    title: "BESABRIYAAN",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/liked_Songs/BESABRIYAAN Full Video Song  M. S. DHONI - THE UNTOLD STORY  Sushant Singh Rajput.mp3"
  },
  {
    title: "Chal Wahan Jaate Hain",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Chal Wahan Jaate Hain Full Song with LYRICS - Arijit Singh  Tiger Shroff, Kriti Sanon  T-Series.mp3"
  },
  {
    title: "Dil Meri Na Sune Lyrical",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Dil Meri Na Sune Lyrical - Genius  Utkarsh Sharma, Ishita  Atif Aslam  Himesh Reshammiya.mp3"
  },
  {
    title: "Mohe Rang Do Laal",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Mohe Rang Do Laal (Official Video Song)  Bajirao Mastani  Ranveer Singh & Deepika Padukone.mp3"
  },
  {
    title: "Tere Pyaar Mein",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Tere Pyaar Mein (Song) Tu Jhoothi Main Makkaar Ranbir, Shraddha Pritam Arijit, Nikhita  Amitabh.mp3"
  },
  {
    title: "The Humma Song",
    playlist: "Liked Songs",
    singer: "jubin nautiyal",
    filePath: "songs/liked_Songs/The Humma Song  OK Jaanu  Shraddha Kapoor  Aditya Roy Kapur  @ARRahman, Badshah, Tanishk.mp3"
  },
  {
    title: "WAJAH TUM HO ",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/liked_Songs/WAJAH TUM HO Full Video Song  HATE STORY 3 Songs  Zareen Khan, Karan Singh Grover  T-Series.mp3"
  },
  {
    title: "Song Title 2",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "path/to/song2.mp3"
  }
  // Add more songs as needed
];
const Sonu_Nigam = [
  {
    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/sonu_nigam/Ajay-Atul - Abhi Mujh Mein Kahin Best Lyric_Agneepath_Priyanka Chopra,Hrithik_Sonu Nigam [ ezmp3.cc ].mp3"
  },
  {
    title: "BESABRIYAAN",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/sonu_nigam/Kal Ho Naa Ho Full Video - Title Track_Shah Rukh Khan,Saif Ali,Preity_Sonu Nigam_Karan J [ ezmp3.cc ].mp3"
  },
  {
    title: "Chal Wahan Jaate Hain",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/sonu_nigam/LYRICAL_ Main Agar Kahoon _ Om Shanti Om _ Shahrukh Khan,Deepika Padukone _ Sonu Nigam,Shreya Ghosal [ ezmp3.cc ].mp3"
  },
  {
    title: "Dil Meri Na Sune Lyrical",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/sonu_nigam/Tumse Milke Dilka Jo Haal [Full Song] _ Main Hoon Na _ Shahrukh Khan [ ezmp3.cc ].mp3"
  },
  {
    title: "Mohe Rang Do Laal",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/sonu_nigam/संदेशे आते है (4K) - Sandese Aate Hai Full 4K Video Song _ Border _ बॉर्डर - सनी देओल [ ezmp3.cc ].mp3"
  },
  {
    title: "Tere Pyaar Mein",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Tere Pyaar Mein (Song) Tu Jhoothi Main Makkaar Ranbir, Shraddha Pritam Arijit, Nikhita  Amitabh.mp3"
  },
  {
    title: "The Humma Song",
    playlist: "Liked Songs",
    singer: "jubin nautiyal",
    filePath: "songs/liked_Songs/The Humma Song  OK Jaanu  Shraddha Kapoor  Aditya Roy Kapur  @ARRahman, Badshah, Tanishk.mp3"
  },
  {
    title: "WAJAH TUM HO ",
    playlist: "Liked Songs",
    singer: "Armaan Malik",
    filePath: "songs/liked_Songs/WAJAH TUM HO Full Video Song  HATE STORY 3 Songs  Zareen Khan, Karan Singh Grover  T-Series.mp3"
  },
  {
    title: "Song Title 2",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "path/to/song2.mp3"
  },
  {
    title: "Mere Dholna 3.0",
    playlist: "Liked Songs",
    singer: "Sonu Nigam",
    filePath: "songs/sonu_nigam/BB3_ Mere Dholna 3.0 (Full Audio) (Sonu Nigam Version) Kartik,Sonu,Vidya,Madhuri,Amaal,Pritam,Sameer [ ezmp3.cc ].mp3"
  }
  // Add more songs as needed
];



let currentAudio = new Audio();
let currentlyPlayingIndex = null;

const musicPlayer = document.querySelector('.music-player');
const songTitleElement = musicPlayer.querySelector('.song-details .title');
const artistElement = musicPlayer.querySelector('.song-details .artist');
const progressBarContainer = musicPlayer.querySelector('.progress-bar-container');

const progressBar = musicPlayer.querySelector('.progress-bar .progress');
const startTime = musicPlayer.querySelector('.progress-bar-container .time:first-child');
const endTime = musicPlayer.querySelector('.progress-bar-container .time:last-child');
const playPauseBtn = musicPlayer.querySelector('#playing');
const pauseBtn = musicPlayer.querySelector('#pause');

function populateSongsList(data_playlist) {
  const songsListUl = document.querySelector('.songs_list ul');
  songsListUl.innerHTML = '';

  data_playlist.forEach((song, index) => {
    const li = document.createElement('li');
    li.classList.add('song_card');

    li.innerHTML = `
        <div class="number"><h3 class="song_number">${index + 1}</h3></div>
        <div class="song_title">
          <div class="card_title">
            <p>${song.title}</p>
            <div class="playlist_name"><p>${song.playlist}</p></div>
          </div>
          <div class="sub_btn">
            <div class="subplay" style="display: flex;"><i class="fa-regular fa-circle-play"></i></div>
            <div class="subpause" style="display: none;"><i class="fa-solid fa-pause"></i></div>
          </div>
        </div>
      `;

    const subplayBtn = li.querySelector('.subplay');
    const subpauseBtn = li.querySelector('.subpause');

    li.addEventListener('click', (e) => {
      if (!e.target.closest('.subpause')) {
        playSong(song, index, subplayBtn, subpauseBtn);
      }
    });

    subpauseBtn.addEventListener('click', () => {
      pauseSong(subplayBtn, subpauseBtn);
    });

    songsListUl.appendChild(li);
  });
}

function playSong(song, index, subplayBtn, subpauseBtn) {
  if (currentlyPlayingIndex !== null && currentlyPlayingIndex !== index) {
    currentAudio.pause();
    resetPlayPauseButtons();
  }

  if (currentAudio.src !== song.filePath) {
    currentAudio.src = song.filePath;
    currentAudio.addEventListener('loadedmetadata', () => {
      endTime.textContent = formatTime(currentAudio.duration);
    });
  }

  currentAudio.play();

  currentlyPlayingIndex = index;

  subplayBtn.style.display = 'none';
  console.log(subplayBtn)
  subpauseBtn.style.display = 'flex';

  updateFooterPlayer(song);

  currentAudio.addEventListener('timeupdate', updateProgressBar);
}
function playSong2(song) {


  if (currentAudio.src !== song.filePath) {
    currentAudio.src = song.filePath;
    currentAudio.addEventListener('loadedmetadata', () => {
      endTime.textContent = formatTime(currentAudio.duration);


    });
  }

  currentAudio.play();


  updateFooterPlayer(song);

  currentAudio.addEventListener('timeupdate', updateProgressBar);
}

function updateFooterPlayer(song) {
  songTitleElement.textContent = song.title;
  artistElement.textContent = song.singer;
  playPauseBtn.style.display = 'flex';
  pauseBtn.style.display = 'none';
  startTime.textContent = formatTime(0);
  progressBar.style.width = '0%';
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function pauseSong(subplayBtn, subpauseBtn) {
  currentAudio.pause();
  currentlyPlayingIndex = null;
  subplayBtn.style.display = 'flex';
  subpauseBtn.style.display = 'none';
  playPauseBtn.style.display = 'none';
  pauseBtn.style.display = 'flex';
}

function resetPlayPauseButtons() {
  document.querySelectorAll('.subplay').forEach(btn => btn.style.display = 'flex');
  document.querySelectorAll('.subpause').forEach(btn => btn.style.display = 'none');
}

function updateProgressBar() {
  const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  startTime.textContent = formatTime(currentAudio.currentTime);
}

// playPauseBtn.addEventListener('click', () => {
//   if (currentAudio.paused) {
//     currentAudio.play();
//     playPauseBtn.style.display = 'none';
//     pauseBtn.style.display = 'flex';
//   } else {
//     currentAudio.pause();
//     playPauseBtn.style.display = 'flex';
//     pauseBtn.style.display = 'none';
//   }
// });
playPauseBtn.addEventListener('click', () => {
  if (currentAudio.paused) {
    currentAudio.play();
    playPauseBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
  } else {
    currentAudio.pause();
    playPauseBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
  }
});
pauseBtn.addEventListener('click', () => {
  if (currentAudio.paused) {
    currentAudio.play();
    playPauseBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
  } else {
    currentAudio.pause();
    playPauseBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
  }
});

progressBarContainer.addEventListener('click', (e) => {
  const barWidth = progressBarContainer.offsetWidth - 50;
  const clickX = e.offsetX;
  const progressPercent = clickX / barWidth;

  if (currentAudio.duration) {
    currentAudio.currentTime = progressPercent * currentAudio.duration;
  }
  updateProgressBar();
});



// Initial call to populate the list

listItems[0].addEventListener("click", () => {

  populateSongsList(LikedSongsData);
})
listItems[1].addEventListener("click", () => {

  populateSongsList(sandeepMaheshwari);
})
listItems[2].addEventListener("click", () => {

  populateSongsList(Arijit_singh);
})
listItems[3].addEventListener("click", () => {

  populateSongsList(Arijit_topTrack);
})
listItems[4].addEventListener("click", () => {

  populateSongsList(Sonu_Nigam);
})


// starting the logic of click on  can card2 and playing its song
// console.log(listRightCard)

// listRightCard[0].addEventListener("click", ()=>{
//   song={
//     title: "Kalank Title Track",
//     playlist: "Liked Songs",
//     singer: "Arijit Singh",
//     filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"
//   } 
//   playSong2(song);
// })

// new logic
const right_listed_song = [
  {

    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"

  },
  {
    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"


  },
  {
    title: "Tujhe Kitna Chahne Lage",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/Arijit_Singh/LYRICAL_ Tujhe Kitna Chahne Lage  Kabir Singh  Mithoon Feat. Arijit Singh  Shahid Kapoor, Kiara A.mp3"

  },
  {
    title: "Mere Dholna 3.0",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/BB3_ Mere Dholna 3.0 (Full Audio) (Sonu Nigam Version) Kartik,Sonu,Vidya,Madhuri,Amaal,Pritam,Sameer [ ezmp3.cc ].mp3"

  },
  {
    title: "Tujhe Kitna Chahne Lage",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/Arijit_Singh/LYRICAL_ Tujhe Kitna Chahne Lage  Kabir Singh  Mithoon Feat. Arijit Singh  Shahid Kapoor, Kiara A.mp3"

  },
  {
    title: "Sajni (Song)_ Arijit Singh",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Sajni (Song)_ Arijit Singh, Ram Sampath  Laapataa Ladies   Aamir Khan Productions.mp3"

  },
  {
    title: "Kalank Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"


  },
  {
    title: "Vande Mataram",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Vande Mataram Full Video _ Disney's ABCD 2 _ Varun Dhawan & Shraddha Kapoor _ Daler Mehndi _ Badshah [ ezmp3.cc ].mp3"

  },
  {
    title: "Tere Sang Yaara",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Tere Sang Yaara - Full Video _ Rustom _ Akshay Kumar & Ileana D'cruz _ Arko ft. Atif Aslam _ Manoj M [ ezmp3.cc ].mp3"

  },
  {

    title: "Badtameez Dil Full Song ",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Badtameez Dil Full Song HD Yeh Jawaani Hai Deewani _ PRITAM _ Ranbir Kapoor, Deepika Padukone [ ezmp3.cc ].mp3"
  },
  {
    title: "Badtameez Dil Full Song",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Badtameez Dil Full Song HD Yeh Jawaani Hai Deewani _ PRITAM _ Ranbir Kapoor, Deepika Padukone [ ezmp3.cc ].mp3"

  },
  {
    title: "Arijit Singh LIVE",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Arijit Singh LIVE at  GIMA Awards 2017 [ ezmp3.cc ].mp3"

  },
  {
    title: "Bhool Bhulaiyaa 3",
    playlist: "Liked Songs",
    singer: "Diljit",
    filePath: "songs/right_listed_song/Bhool Bhulaiyaa 3 - Title Track _ Kartik A _ Pitbull, Diljit, Neeraj S, Tanishk, Pritam _ Bhushan K [ ezmp3.cc ].mp3"

  },
  {
    title: "gini - Sukoon",
    playlist: "Liked Songs",
    singer: "gini",
    filePath: "songs/right_listed_song/gini - Sukoon _ Official Music Video [ ezmp3.cc ].mp3"

  },
  {
    title: "Hamari Adhuri Kahani Title Track",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/Hamari Adhuri Kahani Title Track Full Video - Emraan Hashmi,Vidya Balan_Arijit Singh [ ezmp3.cc ].mp3"

  },
  {
    title: "ANIMAL_ SATRANGA",
    playlist: "Liked Songs",
    singer: "Arijit Singh",
    filePath: "songs/right_listed_song/ANIMAL_ SATRANGA(Song) Ranbir Kapoor,Rashmika_Sandeep V_Arijit,Shreyas P,Siddharth-Garima _Bhushan K [ ezmp3.cc ].mp3"

  },
  {
    title: "Ghar Se Nikalte Hi Song",
    playlist: "Liked Songs",
    singer: "Arman Malik",
    filePath: "songs/right_listed_song/Ghar Se Nikalte Hi Song _ Amaal Mallik Feat. Armaan Malik _ Bhushan Kumar _ Angel [ ezmp3.cc ].mp3"

  }
]
function getRandomSong(songsArray) {
  const randomIndex = Math.floor(Math.random() * songsArray.length);

  return songsArray[randomIndex];
}
const feature_song = document.querySelector('.feature_song')
const right_side = document.querySelector('.right')
const feature_song_img = document.querySelector('.feature_song_img img')
const feature_song_info = document.querySelector('.feature_song_title h1')


listRightCard.forEach((song2, index2) => {
  console.log(song2)
  console.log(index2)
  song2.addEventListener("click", () => {


    if (index2 == 0 || index2 == 1 || index2 == 4 || index2 == 10) {
      const playing_song = song2;
      console.log(playing_song)
      const randomSong = getRandomSong(Arijit_singh);
      console.log(randomSong)
      playSong2(randomSong);


      //catchPlayingSong




      // make display none

      right_side.style.display = 'none'
      feature_song.style.display = "flex"
      setCustomGradient()
      // make img fetch and assign

      const get_img = playing_song.querySelector(".image-container img");
      const imgUrl = get_img.src;
      feature_song_img.src = imgUrl
      // make title fetch and assign

      const get_title = playing_song.querySelector(".description");
      const descriptionContent = get_title.textContent.trim();

      const featureSongTitle = document.querySelector(".feature_song_title h1");
      featureSongTitle.textContent = descriptionContent;
      catchPlayingSong(randomSong, song2)

    }

    else {
      const playing_song = song2;
      console.log(playing_song)
      const randomSong = right_listed_song[index2]
      playSong2(randomSong);
      right_side.style.display = 'none'
      feature_song.style.display = "flex"
      setCustomGradient()

      // make img fetch and assign

      const get_img = playing_song.querySelector(".image-container img");
      const imgUrl = get_img.src;
      feature_song_img.src = imgUrl
      // make title fetch and assign

      const get_title = playing_song.querySelector(".description");
      const descriptionContent = get_title.textContent.trim();

      const featureSongTitle = document.querySelector(".feature_song_title h1");
      featureSongTitle.textContent = descriptionContent;
      document.querySelector('.feature_song_list').style.display = "none"
      catchPlayingSong(randomSong, song2)

    }
  })
})


// add the logic of the footer music sound intensity increse or decrese 




const volumeSlider = document.querySelector('.volume-slider');
const volumeBar = volumeSlider.querySelector('.volume');
const muteButton = document.querySelector('.settings button:first-child'); // Mute button
let isMuted = false;
let previousVolume = 0.5;

currentAudio.volume = 0.5;
volumeBar.style.width = `${currentAudio.volume * 100}%`;

volumeSlider.addEventListener('click', (event) => {
  const rect = volumeSlider.getBoundingClientRect();
  const clickedPosition = event.clientX - rect.left;
  const newVolume = Math.min(Math.max(clickedPosition / rect.width, 0), 1);
  currentAudio.volume = newVolume;
  volumeBar.style.width = `${newVolume * 100}%`;
});

muteButton.addEventListener('click', () => {
  if (isMuted) {
    currentAudio.volume = previousVolume;
    muteButton.textContent = '🔊';
  } else {
    previousVolume = currentAudio.volume;
    currentAudio.volume = 0;
    muteButton.textContent = '🔈';
  }
  volumeBar.style.width = `${currentAudio.volume * 100}%`;
  isMuted = !isMuted;
});

currentAudio.addEventListener('volumechange', () => {
  volumeBar.style.width = `${currentAudio.volume * 100}%`;
  if (currentAudio.volume === 0) {
    muteButton.textContent = '🔈';
  } else {
    muteButton.textContent = '🔊';
    isMuted = false;
  }
});

//   color to feature song

// Function to generate random pastel colors
function getRandomPastelColor() {
  // Generate soft pastel colors with higher base values (150-250)
  const red = Math.floor(150 + Math.random() * 100);   // 150-250 range
  const green = Math.floor(150 + Math.random() * 100); // 150-250 range
  const blue = Math.floor(150 + Math.random() * 100);  // 150-250 range
  return `rgb(${red}, ${green}, ${blue})`;
}

// Function to create a gradient with a bright top and dark bottom
function setCustomGradient() {
  // Generate a bright pastel color for the top
  const brightColor = getRandomPastelColor();

  // Generate a darker color for the bottom by reducing the intensity
  const darkColor = `rgb(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)})`;

  // Apply the gradient to the element
  document.querySelector('.feature_song').style.background = `linear-gradient(to bottom, ${darkColor} 10%, ${brightColor} 90%)`;
}


// add the playing animation

var animation = lottie.loadAnimation({
  container: document.getElementById('lottie-container'), // the container element
  renderer: 'svg', // the rendering method (svg, canvas, or html)
  loop: true,      // whether the animation should loop
  autoplay: true,  // whether the animation should start automatically
  path: 'animation/Animation - 1733655375256.json', // the path to your JSON animation file
});

// select the playing song in feature section

function catchPlayingSong(PlayingSong, SongIMG) {
  const getClass = document.querySelector(".recent_playing_song")
  const PlayingSongTitle = getClass.querySelector(".title")
  let PlayingSongIMG = getClass.querySelector(".details img")
  const PlayingSongArtist = getClass.querySelector(".artist")
  const PlayingSongSource = getClass.querySelector(".Source")

  console.log(PlayingSong.title)


  PlayingSongTitle.textContent = PlayingSong.title
  PlayingSongArtist.textContent = SongIMG.querySelector(".description").textContent;
  PlayingSongSource.textContent = PlayingSong.singer
  PlayingSongIMG.src = SongIMG.querySelector(".image-container img").src;

}


// working on the serach section of clone

// import { searchSong } from './spotifyAPI.js';

// function displayResults(tracks) {
//   const tracksTable = document.getElementById('tracksTable');
//   tracksTable.innerHTML = ''; // Clear previous results

//   tracks.forEach((track, index) => {
//     const row = document.createElement('tr');

//     row.innerHTML = `
//       <td>${index + 1}</td>
//       <td>
//         <div class="track-title-container">
//           <img src="${track.album.images[0]?.url}" alt="${track.name}" class="album-art" />
//           <div>
//             <h4>${track.name}</h4>
//             <p>${track.artists.map(artist => artist.name).join(', ')}</p>
//           </div>
//         </div>
//       </td>
//       <td>${track.album.name}</td>
//       <td>${new Date(track.added_at).toLocaleDateString()}</td>
//       <td>${convertMsToMinutesSeconds(track.duration_ms)}</td>
//     `;

//     tracksTable.appendChild(row);

//     // Add click event to play the song (if preview URL is available)
//     row.addEventListener('click', () => {
//       if (track.preview_url) {
//         const audio = new Audio(track.preview_url);
//         audio.play();
//       } else {
//         alert('Preview not available for this track.');
//       }
//     });
//   });
// }

// // Convert duration from milliseconds to mm:ss format
// function convertMsToMinutesSeconds(ms) {
//   const minutes = Math.floor(ms / 60000);
//   const seconds = ((ms % 60000) / 1000).toFixed(0);
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

// // Add event listener to search button
// document.getElementById('searchButton').addEventListener('click', async () => {


//   const query = document.getElementById('input').value;
//   if (query) {
//     document.querySelector(".right").style.display = "none";
//     document.querySelector(".search_SONG_Container").style.display = "flex";
//     const tracks = await searchSong(query);
//     console.log(tracks)
//     displayResults(tracks);
//   }
// });


import { searchYouTube } from './Fetch_Youtube_music.js';
// Initialize Audio object

async function getAudioStream(videoId) {
  const audioUrl = `http://localhost:5500/audio?url=https://www.youtube.com/watch?v=${videoId}`;
  console.log(audioUrl);


  currentAudio.pause(); // Pause current audio if playing
  currentAudio.src = ""; // Clear current source
  document.querySelector(".right").style.display = "none";
  document.querySelector(".search_SONG_Container").style.display = "flex";
  //     

  currentAudio.src = audioUrl; // Set new audio source from backend
  currentAudio.load(); // Load the new audio source
  currentAudio.play(); // Start playing the audio

}

document.getElementById('input').addEventListener('keypress', async (event) => {
  // Check if the pressed key is 'Enter' (key code 13)
  if (event.key === 'Enter') {
    const query = document.getElementById('input').value; // Get song title from input field
    const videoResponse = await searchYouTube(query); // Search YouTube using video title
    console.log(videoResponse);

    if (videoResponse) {
      const videoId = videoResponse.id.videoId;
      const songTitle = videoResponse.snippet.title;

      console.log(songTitle);
      console.log(videoResponse.snippet.thumbnails.high.url)
      document.querySelector('.feature_song_img img').src = `${videoResponse.snippet.thumbnails.high.url}`;
      document.querySelector('.details img').src = `${videoResponse.snippet.thumbnails.high.url}`;
      document.getElementById('songTitle').textContent = songTitle;
      document.querySelector('.title').textContent = songTitle;
      console.log(videoId); 
      getAudioStream(videoId);
    } else {
      alert('No video found for the given song title.');
    }
  }
});
