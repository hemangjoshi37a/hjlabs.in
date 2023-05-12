

///createBreadcrumb
function createBreadcrumb() {
  const url = window.location.pathname;
  const pathParts = url.split('/').filter(part => part !== '');
  const breadcrumb = document.getElementById('breadcrumb');
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';

  const homeListItem = document.createElement('li');
  homeListItem.classList.add('breadcrumb-item');
  homeListItem.appendChild(homeLink);
  breadcrumb.appendChild(homeListItem);
  let currentPath = '';
  pathParts.forEach((part, index) => {
    currentPath += '/' + part;
    const link = document.createElement('a');
    link.href = currentPath;

    const listItem = document.createElement('li');
    listItem.classList.add('breadcrumb-item');
    if (index === pathParts.length - 1) {
      // Make the last part of the breadcrumb not clickable and style it differently
      link.removeAttribute('href');
      listItem.classList.add('active');
      listItem.setAttribute('aria-current', 'page');
    }
    link.textContent = part.charAt(0).toUpperCase() + part.slice(1);
    listItem.appendChild(link);
    breadcrumb.appendChild(listItem);
  });
}
createBreadcrumb();



//nav.html
document.addEventListener('DOMContentLoaded', function () {
  const navbarElement = document.getElementById('navbar')
  if (navbarElement) {
    fetch('./../nav.html')
      .then((response) => {
        if (response.ok) {
          return response.text()
        } else {
          throw new Error('Failed to load navbar: ' + response.status)
        }
      })
      .then((html) => {
        navbarElement.innerHTML = html
      })
      .catch((error) => {
        console.error('Error loading navbar:', error)
      })
  }
})

//footer.html
document.addEventListener('DOMContentLoaded', function () {
  const navbarElement = document.getElementById('footer')
  if (navbarElement) {
    fetch('./../footer.html')
      .then((response) => {
        if (response.ok) {
          return response.text()
        } else {
          throw new Error('Failed to load footer: ' + response.status)
        }
      })
      .then((html) => {
        navbarElement.innerHTML = html
      })
      .catch((error) => {
        console.error('Error loading footer:', error)
      })
  }
})


// fade in effect
window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('fade-in');
});

window.addEventListener('unload', function (event) {
  document.body.classList.remove('fade-in');
});


// Load CSV file and generate industry cards
Papa.parse("industries.csv", {
  download: true,
  header: true,
  complete: function (results) {
    let industries = results.data;
    let container = document.getElementById("industries-container");

    industries.forEach(industry => {
      let card = `
          <div class="col-md-4 industry-item">
            <a href="./${industry['name']}">
              <img src="./pics/${industry['image_file_path']}" alt="${industry['name']}" class="img-fluid">
              <h3 class="industry-title">${industry['name']}</h3>
              <p class="industry-description">${industry['description']}</p>
            </a>
          </div>
          `;
      container.innerHTML += card;
    });
  }
});