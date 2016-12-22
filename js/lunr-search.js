(function() {

  function slugify(text)
  {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
  }

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var s = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        var authors = item.author.split(', ');
        var categories = item.category.split(', ');
        var methodologies = item.methodology.split(', ');
        var objectives = item.objective.split(', ');
        var types = item.type.split(', ');

        s += '<div class="result-item" style="display: inline-block; margin-left: -4px; overflow: hidden;">';
        s += '<a href="' + item.url + '"><h3 class="result-item__name" >' + item.title + '</h3></a><p class="result-item__authors">';
        for (var j in authors) {
          s += '<a href="../by/author.html?query=' + authors[j].replace(' ', '+') + '">' + authors[j] + '</a> ';
        }

        s += '</p><div class="result-item__taxonomy result-item__taxonomy--category"><span class="result-item__taxonomy__key">Category</span>';
        for (var j in categories) {
          s += '<span class="result-item__taxonomy__value"><a href="../categories/' + slugify(categories[j]) + '" class="result-item__tag">' + categories[j] + '</a></span>';
        }
        s += '</div>';

        s += '<div class="result-item__taxonomy result-item__taxonomy--methodology"><span class="result-item__taxonomy__key">Methodology</span>';
        for (var j in methodologies) {
          s += '<span class="result-item__taxonomy__value"><a href="../methodologies/' + slugify(methodologies[j]) + '" class="result-item__tag">' + methodologies[j] + '</a></span>';
        }
        s += '</div>';

        s += '<div class="result-item__taxonomy result-item__taxonomy--objective"><span class="result-item__taxonomy__key">Objective</span>';
        for (var j in objectives) {
          s += '<span class="result-item__taxonomy__value"><a href="../objectives/' + slugify(objectives[j]) + '" class="result-item__tag">' + objectives[j] + '</a></span>';
        }
        s += '</div>';

        s += '<div class="result-item__taxonomy result-item__taxonomy--type"><span class="result-item__taxonomy__key">Type</span>';
        for (var j in types) {
          s += '<span class="result-item__taxonomy__value"><a href="../types/' + slugify(types[j]) + '" class="result-item__tag">' + types[j] + '</a></span>';
        }
        s += '</div>';

        s += '</div>';
      }

      searchResults.innerHTML = s;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    if (document.getElementById('search-box')) {
      document.getElementById('search-box').setAttribute("value", searchTerm);
    }
    if (document.getElementById('search-title')) {
      document.getElementById('search-title').innerHTML = searchTerm;
    }

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm);
      displaySearchResults(results, window.store);
    }
  }
})();