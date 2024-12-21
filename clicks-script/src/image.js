import html2canvas from "html2canvas";

export const captureImage = async () => {
  const image = await html2canvas(document.body).then(function (canvas) {
    let img = canvas.toDataURL("image/png");

    let screenshotImage = new Image();
    screenshotImage.src = img;

    return img;
  });

  return image;
};
