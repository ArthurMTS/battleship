function footer(root) {
  const footer = document.createElement('footer');
  footer.id = "main-footer";

  const p = document.createElement('p');
  p.textContent = "Made with ❤️ by ArthurMTS";

  footer.append(p);
  root.append(footer);
}

module.exports = footer;