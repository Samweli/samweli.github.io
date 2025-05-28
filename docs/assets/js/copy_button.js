document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre > code").forEach(codeBlock => {
    const button = document.createElement("button");
    const svg = `<img src="/assets/icons/copy_icon.svg" alt="Copy" class="copy-icon" />`;
    const copied =  `<img src="/assets/icons/tick.svg" alt="Copy" class="copy-icon" />`;

    button.innerHTML = svg;

    button.className = "copy-code-button";
    button.title = 'Copy to clipboard'

    const pre = codeBlock.parentNode;
    pre.style.position = "relative";
    pre.appendChild(button);

    button.addEventListener("click", () => {
      const text = codeBlock.innerText;
      navigator.clipboard.writeText(text).then(() => {
        button.innerHTML = copied;
        setTimeout(() => (button.innerHTML = svg), 2000);
      });
    });
  });
});
