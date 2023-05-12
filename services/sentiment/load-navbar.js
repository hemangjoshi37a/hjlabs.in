document.addEventListener("DOMContentLoaded", function () {
  const navbarElement = document.getElementById("navbar");
  if (navbarElement) {
    fetch("../../nav.html")
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


// packages
document.addEventListener('DOMContentLoaded', function () {
  fetch('./../../packages.html')
    .then((response) => {
      if (response.status === 200 || response.status === 0) {
        return response.text()
      }
      throw new Error('Failed to load footer.html')
    })
    .then((html) => {
      document.getElementById('packages').innerHTML = html
    })
    .catch((error) => {
      console.error('Error fetching footer:', error)
    })
})

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