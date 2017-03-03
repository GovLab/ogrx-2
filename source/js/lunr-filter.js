$(function() {

  var idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('author');
    this.field('category');
    this.field('content');
  });

  for (var key in window.store) {
    idx.add({
      'id': key,
      'title': window.store[key].title,
      'author': window.store[key].author,
      'category': window.store[key].category,
      'content': window.store[key].content
    });
  }

  var filterLunr = function() {
    searchTerm = $('#lunr-filter').val();

    var results = idx.search(searchTerm);
    var s = '';

    $( document ).trigger( 'filter:removeClassesContaining', [ 'f-search-' ] );
    for (var r in results) {
        // if (r == 0) {
        //   $( document ).trigger( 'filter:add', [ '.f-search-' + results[r].ref ] );
        // } else {
        //   $( document ).trigger( 'filter:addOR', [ '.f-search-' + results[r].ref ] );
        // }
        s += '.f-search-' + results[r].ref + ( parseInt(r)+1 == results.length ? '' : ',' );
    }


      $( document ).trigger( 'filter:add', [ s ] );

      $( document ).trigger( 'filter:update' );
    };

    $('#search-button').click(filterLunr);

    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        filterLunr();
      }
    });

  });