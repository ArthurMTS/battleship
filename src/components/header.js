function header(root) {
  const header = document.createElement('header');
  header.id = 'main-header';

  const title = document.createElement('h1');
  title.textContent = "Battleship";
  title.id = 'title';

  const list = document.createElement('nav');
  list.id = "nav";

  const github = document.createElement('li');
  const githubLink = document.createElement('a');
  githubLink.textContent = "My Github";
  githubLink.href = 'https://github.com/ArthurMTS';
  githubLink.target = "_blank";
  github.append(githubLink);

  const source = document.createElement('li');
  const sourceLink = document.createElement('a');
  sourceLink.textContent = "Source code";
  sourceLink.href = 'https://github.com/ArthurMTS/battleship';
  sourceLink.target = "_blank";
  source.append(sourceLink);

  list.append(github, source);
  header.append(title, list);

  root.append(header);
}

module.exports = header;