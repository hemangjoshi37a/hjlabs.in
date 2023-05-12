document.addEventListener("DOMContentLoaded", function () {
  const navbarElement = document.getElementById("navbar");
  if (navbarElement) {
    fetch("./../../nav.html")
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to load navbar: " + response.status);
        }
      })
      .then(html => {
        navbarElement.innerHTML = html;
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
      });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  fetch('./../../footer.html')
    .then(response => {
      if (response.status === 200 || response.status === 0) {
        return response.text();
      }
      throw new Error('Failed to load footer.html');
    })
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching footer:', error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  fetch('./../../packages.html') 
    .then(response => {
      if (response.status === 200 || response.status === 0) {
        return response.text();
      }
      throw new Error('Failed to load footer.html');
    })
    .then(html => {
      document.getElementById('packages').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching footer:', error);
    });
});

//ratings
document.addEventListener('DOMContentLoaded', function () {
  fetch('./../../ratings.html') 
    .then(response => {
      if (response.status === 200 || response.status === 0) {
        return response.text();
      }
      throw new Error('Failed to load footer.html');
    })
    .then(html => {
      document.getElementById('ratings').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching footer:', error);
    });
});


// Fetch the structured data from the external JSON file
fetch('structured-data.json')
  .then(response => response.json())
  .then(data => {
    // Create a new script element for the JSON-LD data
    const scriptElem = document.createElement('script');
    scriptElem.type = 'application/ld+json';
    scriptElem.text = JSON.stringify(data);

    // Add the script element to the head of the document
    document.head.appendChild(scriptElem);
  })
  .catch(error => console.error('Error fetching structured data:', error));
