function header() {
  const header = document.createElement('header');
  header.id = 'main-header';

  const title = document.createElement('h1');
  title.textContent = 'Battleship';
  title.id = 'title';
  title.addEventListener('click', () => location.reload());

  const nav = document.createElement('nav');
  nav.id = 'nav';

  const list = document.createElement('ul');

  const github = document.createElement('li');
  const githubLink = document.createElement('a');
  githubLink.textContent = 'My Github';
  githubLink.href = 'https://github.com/ArthurMTS';
  githubLink.target = '_blank';
  github.append(githubLink);

  const source = document.createElement('li');
  const sourceLink = document.createElement('a');
  sourceLink.textContent = 'Source Code';
  sourceLink.href = 'https://github.com/ArthurMTS/battleship';
  sourceLink.target = '_blank';
  source.append(sourceLink);

  list.append(github, source);
  nav.append(list);
  header.append(title, nav);

  return header;
}

module.exports = header;