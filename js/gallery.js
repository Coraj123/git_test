let currentDisplayedPhoto = null;
let descriptionNode = null;

const imageUrls = [
  "./photos/Jeantaud_1898_tn.jpg",
  "./photos/gardner-serpollet-oeuf-de-pacques_1902_tn.jpg",
  "./photos/fred-marriott-stanley-steamer-1906_tn.jpg",
  "./photos/Golden_Arrow_1929_tn.jpg",
  "./photos/Blue-Bird-CN7_1964_tn.jpg",
  "./photos/Thrust-SSC-2_1997_tn.jpg",
];

const matchingimgUrls = [
  "./photos/Jeantaud_1898.jpg",
  "./photos/gardner-serpollet-oeuf-de-pacques_1902.jpg",
  "./photos/fred-marriott-stanley-steamer-1906.jpg",
  "./photos/Golden_Arrow_1929.jpg",
  "./photos/Blue-Bird-CN7_1964.jpg",
  "./photos/Thrust-SSC-2_1997.jpg",
];

const flexContainer = document.createElement("div");

flexContainer.style.display = "flex";
flexContainer.style.flexDirection = "column";
flexContainer.style.justifyContent = "center";
flexContainer.style.alignItems = "center";
flexContainer.style.gap = "20px";
flexContainer.style.padding = "20px";

function mouseEventHandling(img) {
  img.addEventListener("mouseenter", () => {
    img.style.border = "4px solid red";
  });

  img.addEventListener("mouseleave", () => {
    img.style.border = "2px solid black";
  });
}

function removeThumbnailSuffix(url) {
  return url.replace("_tn.jpg", ".jpg");
}

function getImageFilenameWithoutThumbnail(url) {
  return removeThumbnailSuffix(url).split("/").pop();
}

function formatDescription(filename) {
  return filename
    .replace(".jpg", "")
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function clickEventHandling(img) {
  img.addEventListener("click", () => {
    const clickedOriginalURL = getImageFilenameWithoutThumbnail(img.src);

    matchingimgUrls.forEach((url) => {
      const fullName = url.split("/").pop();

      if (clickedOriginalURL === fullName) {
        if (currentDisplayedPhoto && descriptionNode) {
          currentDisplayedPhoto.remove();
          currentDisplayedPhoto = null;
          descriptionNode.remove();
          descriptionNode = null;
        }

        const imgMatch = document.createElement("img");
        imgMatch.src = url;
        imgMatch.style.width = "500px";
        imgMatch.style.marginTop = "10px";
        imgMatch.style.border = "2px solid black";
        flexContainer.appendChild(imgMatch);

        currentDisplayedPhoto = imgMatch;
        const description = document.createElement("p");
        descriptionNode = description;
        descriptionNode.textContent = formatDescription(fullName);
        flexContainer.appendChild(descriptionNode);

        const instruction = document.querySelector("#instruction");
        if (instruction) instruction.remove();
      }
    });
  });
}

const childFlex = document.createElement("div");
flexContainer.appendChild(childFlex);

// Create and append images
imageUrls.forEach((url) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Flex image";
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "8px";
  img.style.border = "2px solid black";
  childFlex.appendChild(img);
  mouseEventHandling(img);
  clickEventHandling(img);
});

document.body.appendChild(flexContainer);
const p = document.createElement("p");
p.id = "instruction";
p.textContent = "Please select an image!";
p.style.border = "2px solid black";
flexContainer.appendChild(p);

flexContainer.appendChild(p);
