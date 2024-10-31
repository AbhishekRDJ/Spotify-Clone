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
const songsData = [
    {
      title: "Kalank Title Track",
      playlist: "Liked Songs",
      filePath: "songs/liked_Songs/Kalank Title Track - Lyrical  Alia Bhatt , Varun Dhawan  Arijit Singh  Pritam Amitabh.mp3"
    },
    {
      title: "Song Title 2",
      playlist: "Liked Songs",
      filePath: "path/to/song2.mp3"
    }
  ];
  
  
  // Create an audio player to reuse for playing songs
  let currentAudio = new Audio();
  
  // Function to populate the songs list
  function populateSongsList() {
    const songsListUl = document.querySelector('.songs_list ul');
    songsListUl.innerHTML = ''; // Clear existing content
  
    songsData.forEach((song, index) => {
      const li = document.createElement('li');
      li.classList.add('song_card');
      
      // Populate the list item with song information
      li.innerHTML = `
        <div class="number"><h3 class="song_number">${index + 1}</h3></div>
        <div class="song_title">
          <div class="card_title">
            <p>${song.title}</p>
            <div class="playlist_name"><p>${song.playlist}</p></div>
          </div>
          <div class="sub_btn">
            <div class="subplay"><i class="fa-regular fa-circle-play"></i></div>
            <div class="subpause"><i class="fa-solid fa-pause"></i></div>
          </div>
        </div>
      `;
  
      // Attach click event to play the song when this song_card is clicked
      li.addEventListener('click', () => {
        playSong(song.filePath);
      });
  
      songsListUl.appendChild(li);
    });
  }
  
  // Function to play a song
  function playSong(filePath) {
    if (currentAudio.src !== filePath) {
      currentAudio.src = filePath; // Set the song file
    }
    
    currentAudio.play(); // Play the song
  }
  
  // Function to handle switching views
  function showSongsList() {
    populateSongsList();
    document.querySelector('.most').style.display = 'none';
    document.querySelector('.songs_list').style.display = 'flex';
  }
  
  // Event listener to show the songs list when any .most ul li is clicked
  document.querySelectorAll('.most ul li').forEach(li => {
    li.addEventListener('click', showSongsList);
  });
  