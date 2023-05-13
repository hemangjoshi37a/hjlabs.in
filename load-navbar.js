// navbar loader
document.addEventListener("DOMContentLoaded", function () {
  const navbarElement = document.getElementById("navbar");
  if (navbarElement) {
    fetch("nav.html")
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

// footer loader
document.addEventListener('DOMContentLoaded', function () {
  fetch('footer.html')
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




//ratings
document.addEventListener('DOMContentLoaded', function () {
  fetch('ratings.html')
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


//services
document.addEventListener('DOMContentLoaded', function () {
  fetch('services.html')
    .then(response => {
      if (response.status === 200 || response.status === 0) {
        return response.text();
      }
      throw new Error('Failed to load footer.html');
    })
    .then(html => {
      document.getElementById('services-placeholder').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching footer:', error);
    });
});



//try our apps
document.addEventListener('DOMContentLoaded', function () {
  fetch('tryapp.html')
    .then(response => {
      if (response.status === 200 || response.status === 0) {
        return response.text();
      }
      throw new Error('Failed to load footer.html');
    })
    .then(html => {
      document.getElementById('tryapp-placeholder').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching footer:', error);
    });
});




// load industries
// Parse the CSV file and generate the industries section
$(document).ready(function () {
  Papa.parse('./industries/industries.csv', {
    download: true,
    header: true,
    complete: function (results) {
      let industriesHtml = '<section id="industries" class="container"><h2 class="spacing">Industries</h2><div class="row">';
      let counter = 0;

      results.data.forEach(function (industry) {
        if (counter < 6) { // Display only 6 industries on the home page
          industriesHtml += `
              <div class="col-md-4">
                <div class="industry-item">
                  <a href="/industries/${industry['name']}">
                    <img src="./industries/pics/${industry.image_file_path}" alt="${industry.name}" class="img-fluid">
                    <h3>${industry.name}</h3>
                    <p>${industry.description}</p>
                  </a>
                </div>
              </div>
            `;
          counter++;
        }
      });

      industriesHtml += '</div>';
      industriesHtml += `<div class="text-center mt-3"><a href="/industries" class="btn btn-primary">Show More</a></div>`;
      industriesHtml += '</section>';

      $('#industries-placeholder').html(industriesHtml);
    }
  });
});
