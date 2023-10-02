const imageFileInput = document.querySelector("#imageFileInput");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const canvas = document.querySelector("#meme");

let image;

imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  //<img>
  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener("load", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  }, { once: true });
});

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fixedFontSize = 30;
  const yOffset = height / 25;
  
  
  //update canvas background
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0);

  //prepare text
  ctx.strokeStyle = "black";
  
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = fixedFontSize + "px cursive";
  // Scale the font size if the text is too long
  let fontSize = fixedFontSize;
  const maxTextWidth = width * 0.8; // Maximum allowed text width

  // Calculate the font size needed to fit the text within the available space
  while (ctx.measureText(topText).width > maxTextWidth || ctx.measureText(bottomText).width > maxTextWidth) {
    fontSize--;
    ctx.font = `${fontSize}px Arial`;
  }


  //add top text
  ctx.font = `${fontSize}px cursive`;
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  //add BOTTOM text
  ctx.font = `${fontSize}px cursive`;
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}

function downloadMeme(canvas) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "meme.png";
  link.click();
}

const downloadButton = document.querySelector("#downloadButton");
downloadButton.addEventListener("click", () => {
  downloadMeme(canvas);
});
