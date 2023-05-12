// fade in effect
window.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('fade-in');
  });
  
  window.addEventListener('unload', function (event) {
    document.body.classList.remove('fade-in');
});


// youtube bg  
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-background', {
      width: '100%',
      height: '100%',
      videoId: '0fDJXmqdN-A',
      playerVars: {
        'autoplay': 1,
        'controls': 0,
        'autohide': 1,
        'wmode': 'opaque',
        'showinfo': 0,
        'loop': 1,
        'mute': 1,
        'modestbranding': 1,
        'iv_load_policy': 3,
        'disablekb': 1,
        'enablejsapi': 1,
        'rel': 0, // Add this line to disable related videos and remove the video title
        //'playlist': '0fDJXmqdN-A' // This will make the video loop
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  

  function onPlayerReady(event) {
    event.target.playVideo();
    updateVideoSize();
    window.addEventListener('resize', updateVideoSize);
  }

  function onPlayerStateChange(event) {
    updateVideoSize();
  }


  function updateVideoSize() {
    var videoRatio = 16 / 9; // The default aspect ratio for YouTube videos is 16:9
    var windowWidth = window.outerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var width, height;
  
    if (windowRatio > videoRatio) {
      width = windowWidth;
      height = windowHeight; // Set the height to the screen height size
    } else {
      width = windowHeight * videoRatio;
      height = windowHeight; // Set the height to the screen height size
    }
  
    player.setSize(width, height);
  }
  
  function setDivToScreenSize() {
    const fullScreenDiv = document.getElementById('video-background');
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    fullScreenDiv.style.width = screenWidth + 'px';
    fullScreenDiv.style.height = screenHeight + 'px';
    const fullScreenDivOV = document.getElementById('overlay');
    fullScreenDivOV.style.width = screenWidth + 'px';
    fullScreenDivOV.style.height = screenHeight + 'px';
}

setDivToScreenSize();

// OSS projects loader
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines.shift().split(',');
  return lines.map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
          obj[header] = values[index];
          return obj;
      }, {});
  });
}
async function fetchCSV(url) {
  const response = await fetch(url);
  const csv = await response.text();
  return parseCSV(csv);
}
function createCarouselItem(projects, isActive) {
  const projectCards = projects.map(project => `
      <div class="col-md-4">
          <a href="${project.link}" target="_blank" class="project-link">
              <img src="${project.img}" alt="${project.title}" class="img-fluid">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
          </a>
      </div>
  `).join('');
  return `
      <div class="carousel-item${isActive ? ' active' : ''}">
          <div class="row equal-height">
              ${projectCards}
          </div>
      </div>
  `;
}
function createCarouselIndicator(index, isActive) {
  return `
      <button type="button" data-bs-target="#projectsCarousel" data-bs-slide-to="${index}"${isActive ? ' class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
  `;
}
async function loadProjects() {
  const projects = await fetchCSV('oss_projects.csv');
  const chunkSize = 3;
  const content = [];
  const indicators = [];
  for (let i = 0; i < projects.length; i += chunkSize) {
      const projectsChunk = projects.slice(i, i + chunkSize);
      content.push(createCarouselItem(projectsChunk, i === 0));
      indicators.push(createCarouselIndicator(i / chunkSize, i === 0));
  }
  document.getElementById('carousel-content').innerHTML = content.join('');
  document.getElementById('carousel-indicators').innerHTML = indicators.join('');
}
// Load projects when the document is ready
$(document).ready(() => {
  loadProjects();
});