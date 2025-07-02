const path = require("path");
const os = require("os");

const { ipcRenderer, webUtils } = require("electron");

const { getPathForFile } = webUtils;

const form = document.getElementById("image-form");
const slider = document.getElementById("slider");

document.getElementById("output-path").innerHTML = path.join(
  os.homedir(),
  "compressedImages"
);

//on submit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const img = document.getElementById("img");
  let resImg = img.files[0];
  console.log(resImg);

  const imgPath = getPathForFile(resImg);
  console.log({ imgPath });

  const quality = slider.value;
  ipcRenderer.send("image:minimize", { quality, imgPath });
});
