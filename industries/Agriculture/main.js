function createCard(useCase, description, imagePath) {
    return `
    <div class="col">
        <div class="card h-100">
            <img src="${imagePath}" class="card-img-top" alt="${useCase}">
            <div class="card-body">
                <h5 class="card-title">${useCase}</h5>
                <p class="card-text">${description}</p>
            </div>
        </div>
    </div>`;
}

function generateCards(data) {
    const container = document.getElementById("usecases-container");

    data.forEach(item => {
        const card = createCard(item.usecase, item.description, item["image-file-path"]);
        container.insertAdjacentHTML("beforeend", card);
    });
}

fetch("usecase.csv")
    .then(response => response.text())
    .then(csvData => Papa.parse(csvData, { header: true, skipEmptyLines: true }))
    .then(result => generateCards(result.data))
    .catch(error => console.error("Error loading CSV data:", error));


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
        // Replace %20 with a space using decodeURIComponent()
        link.textContent = decodeURIComponent(part.charAt(0).toUpperCase() + part.slice(1));
        listItem.appendChild(link);
        breadcrumb.appendChild(listItem);
    });
}
createBreadcrumb();


//nav.html
document.addEventListener('DOMContentLoaded', function () {
    const navbarElement = document.getElementById('navbar')
    if (navbarElement) {
        fetch('./../../nav.html')
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
        fetch('./../../footer.html')
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

/////////// FAQ GENERATION
// Function to parse CSV data
function parseCSV(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }

    return result;
}

// Function to generate the accordion items
function generateAccordionItems(faqs) {
    const accordion = document.getElementById("faqAccordion");

    faqs.forEach((faq, index) => {
        const itemId = `collapse${index + 1}`;
        const headingId = `heading${index + 1}`;

        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        const accordionHeader = document.createElement("h2");
        accordionHeader.className = "accordion-header";
        accordionHeader.id = headingId;

        const accordionButton = document.createElement("button");
        accordionButton.className = "accordion-button collapsed";
        accordionButton.type = "button";
        accordionButton.dataset.bsToggle = "collapse";
        accordionButton.dataset.bsTarget = `#${itemId}`;
        accordionButton.setAttribute("aria-expanded", "false");
        accordionButton.setAttribute("aria-controls", itemId);
        accordionButton.innerText = faq.question;

        const accordionCollapse = document.createElement("div");
        accordionCollapse.id = itemId;
        accordionCollapse.className = "accordion-collapse collapse";
        accordionCollapse.setAttribute("aria-labelledby", headingId);
        accordionCollapse.dataset.bsParent = "#faqAccordion";

        const accordionBody = document.createElement("div");
        accordionBody.className = "accordion-body";
        accordionBody.innerText = faq.answer;

        accordionCollapse.appendChild(accordionBody);
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionCollapse);
        accordion.appendChild(accordionItem);
    });
}

// Fetch the CSV file and generate accordion items
fetch("faq.csv")
    .then((response) => response.text())
    .then((csv) => {
        const faqs = parseCSV(csv);
        generateAccordionItems(faqs);
    })
    .catch((error) => {
        console.error("Error fetching FAQ CSV:", error);
    });
