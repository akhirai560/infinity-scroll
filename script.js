const count = 10;
const apiKey = "fAvqtguOdnfLrGWBQckSrz-O3hEVAGgEf23ogx1GPc0";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photos = [];
let noOfImagesLoaded = 0;
let totalImages = 0;
let ready = false;

function imageLoaded() {
  noOfImagesLoaded++;
  if (noOfImagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    console.log("ready ==", ready);
  }
}

// create elements for links photos and add to DOM
function displayPhotos() {
  noOfImagesLoaded = 0;
  totalImages = photos.length;
  console.log("total images", totalImages);
  photos.forEach((photo) => {
    // create <a> to link to unsplash</a>
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create image for photo

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    img.addEventListener("load", () => imageLoaded());

    //push img inside anchor tag

    item.appendChild(img);

    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photos = await response.json();

    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

//check to see if scrolling near bottom of page,load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
