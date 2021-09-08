function footer() {
  const footer = document.createElement('footer');
  footer.id = "main-footer";

  const p = document.createElement('p');
  p.textContent = "Made with ❤️ by ArthurMTS";

  footer.append(p);
  
  return footer;
}

module.exports = footer;