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
// setInterval(setRandomGradient, 10000);

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
// console.log(listItems[0])
const homeButton = document.querySelector('#home_btn');

// Function to show songs list and hide most container
function showSongsList() {
  mostContainer.style.display = 'none';
  songsListContainer.style.display = 'flex';
}

// Function to show most container and hide songs list
function showMostContainer() {
  songsListContainer.style.display = 'none';
  mostContainer.style.display = 'flex';
}

// Attach click event listeners
listItems.forEach(li => {
  li.addEventListener('click', showSongsList);
});
homeButton.addEventListener('click', showMostContainer);

// numbering funcation below

// Select all 'li' elements within '.songs_list'
const listItems1 = document.querySelectorAll('.songs_list ul li');

// Iterate over each 'li' and set the number
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
      filePath: "songs\Arijit_Singh\ANIMAL_ SATRANGA(Song) Ranbir Kapoor,Rashmika_Sandeep V_Arijit,Shreyas P,Siddharth-Garima _Bhushan K [ ezmp3.cc ].mp3"
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
      filePath: "songs\Arijit_Singh\Apna Bana Le - Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya [ ezmp3.cc ].mp3"
    },
    {
      title: "Sajni (Song)_ Arijit Singh ",
      playlist: "Liked Songs",
      singer: "Arijit Singh",
      filePath: "songs\Arijit_Singh\Sajni (Song)_ Arijit Singh, Ram Sampath  Laapataa Ladies   Aamir Khan Productions.mp3"
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
      filePath: "songs/sonu_nigam\Ajay-Atul - Abhi Mujh Mein Kahin Best Lyric_Agneepath_Priyanka Chopra,Hrithik_Sonu Nigam [ ezmp3.cc ].mp3"
    },
    {
      title: "BESABRIYAAN",
      playlist: "Liked Songs",
      singer: "Armaan Malik",
      filePath: "songs\sonu_nigam\Kal Ho Naa Ho Full Video - Title Track_Shah Rukh Khan,Saif Ali,Preity_Sonu Nigam_Karan J [ ezmp3.cc ].mp3"
    },
    {
      title: "Chal Wahan Jaate Hain",
      playlist: "Liked Songs",
      singer: "Arijit Singh",
      filePath: "songs\sonu_nigam\LYRICAL_ Main Agar Kahoon _ Om Shanti Om _ Shahrukh Khan,Deepika Padukone _ Sonu Nigam,Shreya Ghosal [ ezmp3.cc ].mp3"
    },
    {
      title: "Dil Meri Na Sune Lyrical",
      playlist: "Liked Songs",
      singer: "Arijit Singh",
      filePath: "songs\sonu_nigam\Tumse Milke Dilka Jo Haal [Full Song] _ Main Hoon Na _ Shahrukh Khan [ ezmp3.cc ].mp3"
    },
    {
      title: "Mohe Rang Do Laal",
      playlist: "Liked Songs",
      singer: "Arijit Singh",
      filePath: "songs\sonu_nigam\संदेशे आते है (4K) - Sandese Aate Hai Full 4K Video Song _ Border _ बॉर्डर - सनी देओल [ ezmp3.cc ].mp3"
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

  
  // Create an audio player to reuse for playing songs
 
  
  let currentAudio = new Audio();
  let currentlyPlayingIndex = null;
  
  // Elements for the footer music player
  const musicPlayer = document.querySelector('.music-player');
  const songTitleElement = musicPlayer.querySelector('.song-details .title');
  const artistElement = musicPlayer.querySelector('.song-details .artist');
  const progressBar = musicPlayer.querySelector('.progress-bar .progress');
  const startTime = musicPlayer.querySelector('.progress-bar-container .time:first-child');
  const endTime = musicPlayer.querySelector('.progress-bar-container .time:last-child');
  const playPauseBtn = musicPlayer.querySelector('#playing');
  const pauseBtn = musicPlayer.querySelector('#pause');
  
  // Function to populate the songs list
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
  
  // Function to play a song
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
    subpauseBtn.style.display = 'flex';
  
    updateFooterPlayer(song);
  
    currentAudio.addEventListener('timeupdate', updateProgressBar);
  }
  
  // Update footer player with current song details
  function updateFooterPlayer(song) {
    songTitleElement.textContent = song.title;
    artistElement.textContent = song.singer;
    playPauseBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
    startTime.textContent = formatTime(0);
    progressBar.style.width = '0%';
  }
  
  // Format time in MM:SS
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  
  // Function to pause the song
  function pauseSong(subplayBtn, subpauseBtn) {
    currentAudio.pause();
    currentlyPlayingIndex = null;
    subplayBtn.style.display = 'flex';
    subpauseBtn.style.display = 'none';
    playPauseBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
  }
  
  // Function to reset all play/pause buttons
  function resetPlayPauseButtons() {
    document.querySelectorAll('.subplay').forEach(btn => btn.style.display = 'flex');
    document.querySelectorAll('.subpause').forEach(btn => btn.style.display = 'none');
  }
  
  // Update the progress bar as the song plays
  function updateProgressBar() {
    const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    startTime.textContent = formatTime(currentAudio.currentTime);
  }
  
  // Event listener for footer play/pause toggle
  playPauseBtn.addEventListener('click', () => {
    if (currentAudio.paused) {
      currentAudio.play();
      playPauseBtn.style.display = 'none';
      pauseBtn.style.display = 'flex';
    } else {
      currentAudio.pause();
      playPauseBtn.style.display = 'flex';
      pauseBtn.style.display = 'none';
    }
  });
  
  // Initial call to populate the list

  listItems[0].addEventListener("click", ()=>{

    populateSongsList(LikedSongsData);
  })
  listItems[1].addEventListener("click", ()=>{

    populateSongsList(sandeepMaheshwari);
  })
  listItems[2].addEventListener("click", ()=>{

    populateSongsList(Arijit_singh);
  })
  listItems[3].addEventListener("click", ()=>{

    populateSongsList(Arijit_topTrack);
  })
  listItems[4].addEventListener("click", ()=>{

    populateSongsList(Sonu_Nigam);
  })
  listItems[5].addEventListener("click", ()=>{

    populateSongsList(LikedSongsData);
  })
  