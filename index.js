document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.search-box');
  const input = form.querySelector('input[type="search"]');
  const resultCount = document.querySelector('header p');
  const resultContainer = document.querySelector('.results');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = input.value;
    if (searchTerm) {
      searchWiki(searchTerm);
    }
  });
  function searchWiki(searchTerm) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${encodeURIComponent(
      searchTerm,
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayData(data.query.search);
      })
      .catch((error) => alert('Error : ' + error));
  }
  function displayData(results) {
    resultContainer.innerHTML = '';
    resultCount.textContent = `Result: ${results.length}`;
    results.forEach((result) => {
      const resultElement = document.createElement('div');
      resultElement.className = 'result';
      resultElement.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://en.wikipedia.org/?curid=${result.pageid}" target='_blank'>Read more</a>
        `;
      resultContainer.appendChild(resultElement);
    });
  }
});
