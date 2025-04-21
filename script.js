const upload = document.getElementById('upload');
const originalImg = document.getElementById('originalImg');
const compressedImg = document.getElementById('compressedImg');
const compressBtn = document.getElementById('compressBtn');
const downloadLink = document.getElementById('downloadLink');
let originalImageFile;

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    originalImageFile = file;
    originalImg.src = URL.createObjectURL(file);
  }
});

compressBtn.addEventListener('click', () => {
  if (!originalImageFile) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        const compressedURL = URL.createObjectURL(blob);
        compressedImg.src = compressedURL;

        downloadLink.href = compressedURL;
        downloadLink.download = `compressed-${originalImageFile.name}`;
        downloadLink.style.display = 'inline-block';
        downloadLink.innerText = 'Download Compressed Image';
      },
      'image/jpeg',
      0.6 // Compression level
    );
  };

  img.src = URL.createObjectURL(originalImageFile);
});
