export function getImageData(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export function copyTextToClipboard(text) {
  const input = document.createElement('input');

  // Input text and append to body
  input.value = text;
  document.body.appendChild(input);

  // Select the text field
  input.select();
  input.setSelectionRange(0, 99999); // For mobile devices

  // Copy
  let copied;

  try {
    document.execCommand('copy');
    copied = true;
  } catch (err) {
    console.error(err);
    copied = false;
  }

  // Remove from body
  document.body.removeChild(input);

  return copied;
}
