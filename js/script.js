const inputField = document.getElementById('search-box');
const searchForm = document.getElementById('search-form');
const imagesBox = document.getElementById('search-result');
const showMoreButton = document.getElementById('show-more-button');
let page = 1;
let keyWord = '';

async function searchImage() {
    keyWord = inputField.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=oQconQBjrsxcrwyeaYYYCbB8ncaE8bEt4Ud_bbGBZ9w&per_page=12`;
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);
    const results = data.results;
    if (page === 1) {
        imagesBox.innerHTML = '';
    }
    results.forEach(result => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(image);
        imagesBox.appendChild(imageLink);        
    });
    showMoreButton.style.display = 'block';
}

searchForm.addEventListener('submit', (element) => {
    element.preventDefault();
    page = 1;
    searchImage();
});

showMoreButton.addEventListener('click', (element) => {
    page += 1;
    searchImage();
});