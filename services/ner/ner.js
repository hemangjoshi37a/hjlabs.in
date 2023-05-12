const textData =
  'John Doe, a software engineer living in New York, NY, has a new job offer. Contact him at john@example.com. His colleague, Jane Smith, is working on a project in San Francisco, CA. Their manager, Robert Brown, is based in London, UK. You can reach Jane at jane@example.org and Robert at robert@example.net'

const entities = [
  { start: 0, end: 8, label: 'PERSON', color: 'bg-warning' },
  { start: 40, end: 48, label: 'LOCATION', color: 'bg-success' },
  { start: 50, end: 52, label: 'STATE', color: 'bg-info' },
  { start: 90, end: 106, label: 'EMAIL', color: 'bg-danger' },
  { start: 123, end: 133, label: 'PERSON', color: 'bg-warning' },
  { start: 162, end: 175, label: 'LOCATION', color: 'bg-success' },
  { start: 177, end: 179, label: 'STATE', color: 'bg-info' },
  { start: 196, end: 208, label: 'PERSON', color: 'bg-warning' },
  { start: 222, end: 228, label: 'LOCATION', color: 'bg-success' },
  { start: 230, end: 232, label: 'COUNTRY', color: 'bg-primary' },
  { start: 256, end: 273, label: 'EMAIL', color: 'bg-danger' },
  { start: 287, end: 307, label: 'EMAIL', color: 'bg-danger' },
]

let finalHTML = ''
let previousEnd = 0

for (const entity of entities) {
  const beforeEntity = textData.slice(previousEnd, entity.start)
  const entityText = `<mark class="${entity.color}">${textData.slice(
    entity.start,
    entity.end,
  )}</mark>`
  const label = `<span class="badge badge-pill ${entity.color} ml-1">${entity.label}</span>`
  finalHTML += beforeEntity + entityText + label
  previousEnd = entity.end
}

finalHTML += textData.slice(previousEnd)

const typingAnimation = (element, text, index) => {
  if (index < text.length) {
    element.innerHTML = text.substring(0, index + 1)
    setTimeout(() => typingAnimation(element, text, index + 1), 20)
  } else {
    element.innerHTML = text
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const textContainer = document.getElementById('text-container')
  textContainer.innerHTML = '<span class="typing-text"></span>'
  typingAnimation(textContainer, finalHTML, 0)
})

document.addEventListener('DOMContentLoaded', function () {
  fetch('./../../footer.html')
    .then((response) => {
      if (response.status === 200 || response.status === 0) {
        return response.text()
      }
      throw new Error('Failed to load footer.html')
    })
    .then((html) => {
      document.getElementById('footer-placeholder').innerHTML = html
    })
    .catch((error) => {
      console.error('Error fetching footer:', error)
    })
})

window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('fade-in')
})

window.addEventListener('beforeunload', function (event) {
  event.preventDefault()
  document.body.classList.remove('fade-in')
})



document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
      header.addEventListener("mouseover", function () {
          this.querySelector(".accordion-button.collapsed").click();
      });

      header.addEventListener("mouseout", function () {
          this.querySelector(".accordion-button:not(.collapsed)").click();
      });
  });
});

// // github profile 
// const fetchGitHubProfile = async (username) => {
//     const response = await fetch(`https://api.github.com/users/${username}`);
//     const data = await response.json();
//     const profileHTML = `
//         <div class="card-body text-center">
//             <img src="${data.avatar_url}" alt="GitHub Profile Picture" class="rounded-circle img-thumbnail mb-3" style="width: 150px; height: 150px;">
//             <h4 class="card-title mb-2">${data.name} (@${data.login})</h4>
//             <p class="card-text profile-text">Followers: ${data.followers}</p>
//             <p class="card-text profile-text">Following: ${data.following}</p>
//             <p class="card-text profile-text">Public Repositories: ${data.public_repos}</p>
//             <a href="${data.html_url}" class="btn btn-primary btn-sm" target="_blank">View GitHub Profile</a>
//         </div>
//     `;
//     document.getElementById('github-profile').innerHTML = profileHTML;
// }
// fetchGitHubProfile('hemangjoshi37a');

// Faq loader
document.addEventListener('DOMContentLoaded', function () {
    const targetElement = document.getElementById('faq_placeholdere');
  
    fetch('ner_faq.html')
      .then((response) => response.text())
      .then((html) => {
        targetElement.innerHTML = html;
      })
      .catch((error) => {
        console.warn('Error importing HTML file:', error);
      });
  });
  


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