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


document.addEventListener('DOMContentLoaded', function () {
    fetch('../../footer.html')
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
      fetch('faq.html')
        .then(response => {
          if (response.status === 200 || response.status === 0) {
            return response.text();
          }
          throw new Error('Failed to load faq.html');
        })
        .then(html => {
          document.getElementById('faq-placeholder').innerHTML = html;
        })
        .catch(error => {
          console.error('Error fetching footer:', error);
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




const exampleText = "Just had an amazing consultation with NLP Sentiment Analysis experts!";
const tweettypingSpeed = 50;
const newstypingSpeed = 30;

function typeText(element, text, index) {
  if (index < text.length) {
    element.append(text[index]);
    setTimeout(() => typeText(element, text, index + 1), tweettypingSpeed);
  } else {
    displaySentimentResult();
  }
}

function displaySentimentResult() {
  const sentimentResult = {
    sentiment: "Positive",
    emoji: "😊"
  };
  setTimeout(() => {
    $(".right-arrow").css("opacity", "1");
    $(".sentiment-result").css("opacity", "1").text(`${sentimentResult.sentiment} ${sentimentResult.emoji}`);
  }, 500);
}

$(document).ready(function () {
  const typedTextElement = $(".typed-text");
  typeText(typedTextElement, exampleText, 0);
});

const newsExampleText = "The successful landing of the spaceship on Pluto has generated positive sentiment across the globe, showcasing the importance of sentiment analysis in understanding public opinion.";

function typeNewsText(element, text, index) {
  if (index < text.length) {
    element.append(text[index]);
    setTimeout(() => typeNewsText(element, text, index + 1), newstypingSpeed);
  } else {
    displayNewsSentimentResult();
  }
}

function displayNewsSentimentResult() {
  const sentimentResultNews = {
    sentiment: "Positive",
    emoji: "😊"
  };
  $(".right-arrow-news").css("opacity", "1");
  $(".sentiment-result-news").css("opacity", "1").text(`${sentimentResultNews.sentiment} ${sentimentResultNews.emoji}`);
}

$(document).ready(function () {
  const typedNewsTextElement = $(".typed-news");
  typeNewsText(typedNewsTextElement, newsExampleText, 0);
});

// Typing animation for the product review
const typedReview = [
  "I just received this product, and I'm absolutely amazed by its performance!",
  "The build quality is fantastic, and it works like a charm.",
  "I would highly recommend this to anyone in need of such a product."
];
let reviewIndex = 0;
let reviewCharIndex = 0;

function typeReview() {
  if (reviewCharIndex < typedReview[reviewIndex].length) {
    document.querySelector('.typed-review').textContent += typedReview[reviewIndex].charAt(reviewCharIndex);
    reviewCharIndex++;
    setTimeout(typeReview, 50);
  } else if (reviewIndex < typedReview.length - 1) {
    setTimeout(() => {
      document.querySelector('.typed-review').textContent = "";
      reviewCharIndex = 0;
      reviewIndex++;
      typeReview();
    }, 100);
  } else {
    // Display sentiment result after the last review is typed
    setTimeout(() => {
      document.querySelector('.sentiment-result-review').textContent = 'Positive';
    }, 50);
  }
}

typeReview();


// fade in effect
window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('fade-in');
});

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  document.body.classList.remove('fade-in');
});
