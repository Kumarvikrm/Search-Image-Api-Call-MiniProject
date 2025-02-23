const searchFormEl = document.getElementById("searchForm");
const searchInputEl = document.getElementById("searchInput");
const searchResultEl = document.getElementById("searchResult");
const showMoreBtnEl = document.getElementById("showMoreBtn");

let accessKey = "wSqJxOsOdyFm6aMrhPYcIiU5sTSXUHf-Dh5dv8iF9t8";
let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=6`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    const data = await response.json();

    if(page === 1){
      searchResultEl.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);

      searchResultEl.appendChild(imageLink);
    });
    showMoreBtnEl.style.display = "block";
  } catch (error) {
    console.error(error.message);
  }
}

searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtnEl.addEventListener("click", () => {
  page++;
  searchImages();
});
