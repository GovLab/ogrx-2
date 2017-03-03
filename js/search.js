$(function() {
    var index, papers, scopes, scopedIndices = {}, resultSnippet;

    var deepTokenize = function (obj) {
        if (!arguments.length || obj == null || obj == undefined) return [];
        if (Array.isArray(obj)) {
            var m = obj.map(function (t) { return lunr.utils.asString(t).toLowerCase(); });
            var result = [];
            for (var i in m) {
                if (lunr.tokenizer.seperator.test(m[i])) {
                    var _split = m[i].split(lunr.tokenizer.seperator);
                    for (var s in _split) {
                        result.push(_split[s]);
                    }
                } else {
                    result.push(m[i]);
                }
            }
            return result;
        }
        return obj.toString().trim().toLowerCase().split(lunr.tokenizer.seperator);
    }

    lunr.tokenizer.registerFunction(deepTokenize, 'deepTokenize');

    var slug = function (t) {
        return t ? t.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        : false ;
    }

    // returns value of key param from location.search, or false
    var getSearch = function(param) {
        var q = location.search.substr(1),
        result = '';

        q.split('&').forEach(function(part) {
            var item = part.split('=');

            if (item[0] == param) {
                result = decodeURIComponent(item[1]);

                if (result.slice(-1) == '/') {
                    result = result.slice(0, -1);
                }
            }
        });
        return result;
    };

    var getx = function (arr, prop, needle) {
        for (var i in arr) {
            if (arr[i][prop] === needle) {
                return arr[i];
            }
        }
    };

    var mapResults = function (fromHaystack, toHaystack, mapFrom, mapTo) {
        var results = [];
        for (var i in fromHaystack) {
            results.push(getx(toHaystack, mapTo, fromHaystack[i][mapFrom]));
        }
        return results;
    }

    // get data //////////////////////////////

    $.get( 'js/searchindex.json', function( d ) {
        index = lunr.Index.load(d.index);
        papers = d.papers;

        $.get( 'rendered_result_item.html', function( d ) {
            resultSnippet = d;

            // after loading the index, grab the search string, if present
            // and inject into the search field and run the search
            var s = getSearch('s').replace('+', ' ');
            if (s) {
                $('#lunr-search').val(s);
                $('#lunr-search').trigger('search:execute');
            }
        })
        .fail(function() {
            console.log ( 'Could not get _rendered_result_item.html!' );
        });

    })
    .fail(function() {
        console.log ( 'Could not get searchindex.json!' );
    });

    $.get( 'js/scopes.json', function( d ) {
        scopes = d;

        for (var s in scopes) {
            scopes[s].display_name &&
            getIndex(slug(scopes[s].display_name));
        }
    })
    .fail(function() {
        console.log ('Could not get available scopes!');
    });

    var getIndex = function (name) {
        $.get( 'js/searchindex-' + name + '.json', function( d ) {
            scopedIndices[name] = lunr.Index.load(d.index);
        })
        .fail(function() {
            console.log('Could not $.get scoped index : ' + name);
        });
    }

    //////////////////////////////////////////

    var search = function (e) {
        var mapping = mapResults(index.search($(this).val()), papers, 'ref', 'id'), resultsHTML = '';


        $( '.b-lunr-results' ).empty();

        for (var m in mapping) {
            // inject the result snippet with the mapped data
            var $snippet = $(resultSnippet);
            var _html;

            $snippet.find('.e-result-name').html(
                '<a href="' +
                mapping[m].id + '-' + slug(mapping[m].title)
                + '.html" title="' +
                mapping[m].title
                + '">' + mapping[m].title
                + '</a>'
                );

            _html = '';
            for (var i in mapping[m].authors) {
                _html +=
                '<a class="e-author-link" href="' +
                mapping[m].id + '-' + slug(mapping[m].title)
                + '.html">' +
                mapping[m].authors[i]
                + '</a>' +
                (i < mapping[m].authors.length-1 ? ', ' : '')
                ;
            }

            $snippet.find('.e-result-authors').html(_html);

            _html = '<span class="e-key">Category</span>';
            for (var i in mapping[m].taxonomy.category) {
                _html +=
                '<span class="e-tag m-' +
                slug(mapping[m].taxonomy.category[i])
                + '">' +
                mapping[m].taxonomy.category[i]
                + '</span> '
                ;
            }

            $snippet.find('.e-result-taxonomy.m-category').html(_html);

            _html = '<span class="e-key">Methodology</span>';
            for (var i in mapping[m].taxonomy.methodology) {
                _html +=
                '<span class="e-tag m-' +
                slug(mapping[m].taxonomy.methodology[i])
                + '">' +
                mapping[m].taxonomy.methodology[i]
                + '</span> '
                ;
            }

            $snippet.find('.e-result-taxonomy.m-methodology').html(_html);

            _html = '<span class="e-key">Objective</span>';
            for (var i in mapping[m].taxonomy.objective) {
                _html +=
                '<span class="e-tag m-' +
                slug(mapping[m].taxonomy.objective[i])
                + '">' +
                mapping[m].taxonomy.objective[i]
                + '</span> '
                ;
            }

            $snippet.find('.e-result-taxonomy.m-objective').html(_html);

            $snippet.find('.m-type').html(
                '<span class="e-key">Type</span><span class="e-tag">' +
                mapping[m].type
                + '</span>'
                );

            _html = '<span class="e-key">Region</span>';
            for (var i in mapping[m].region) {
                _html +=
                '<span class="e-tag m-' +
                slug(mapping[m].region[i])
                + '">' +
                mapping[m].region[i]
                + '</span> '
                ;
            }

            $snippet.find('.m-region').html(_html);

            _html = '<span class="e-key">Sector</span>';
            for (var i in mapping[m].sector) {
                _html +=
                '<span class="e-tag m-' +
                slug(mapping[m].sector[i])
                + '">' +
                mapping[m].sector[i]
                + '</span> '
                ;
            }

            $snippet.find('.m-sector').html(_html);

            _html = '<span class="e-key">Tools</span>';
            for (var i in mapping[m].tools) {
                _html +=
                '<span class="e-tag m-' +
                slug(mapping[m].tools[i])
                + '">' +
                mapping[m].tools[i]
                + '</span> '
                ;
            }

            $snippet.find('.m-tools').html(_html);

            $snippet.find('.m-closed-access').remove();

            if (mapping[m].access.toLowerCase() === 'closed') {
                $snippet.find('.e-result-extras').append('<i class="material-icons m-closed-access" title="Closed Access">lock_outline</i>')
            }

           var rhtml = $snippet.wrap('<a href="' + mapping[m].id + '-' + slug(mapping[m].title) + '.html" ></a>').parent();
           // resultsHTML += rhtml.prop('outerHTML');
           $( '.b-lunr-results' ).append(rhtml);
       }

       // $( '.b-lunr-results' ).html(resultsHTML);
       $('.e-search-trigger').val('search');
   };

   var filter = function (e) {
        // $( '.b-lunr-results' ).text( JSON.stringify(index.search($('#lunr-search').val())) );

        var results,
        limit = 50;

        if ($(this).attr('data-category') && $(this).attr('data-category') !== 'false') {
            results = scopedIndices[$(this).attr('data-category')].search($(this).val());
        } else {
            results = index.search($(this).val());
        }

        // console.log ($(this).attr('data-category'), $(this).val(), results, scopedIndices[$(this).attr('data-category')]);

        if (results.length > limit) {
            results = results.slice(0, limit);
        }

        $( document ).trigger( 'filter:removeClassesContaining', [ 'f-search-' ] );

        for (var r in results) {
            if (r == 0) {
                $( document ).trigger( 'filter:add', [ '.f-search-' + results[r].ref ] );
            } else {
                $( document ).trigger( 'filter:addOR', [ '.f-search-' + results[r].ref ] );
            }
        }

        $( document ).trigger( 'filter:update' );
        $('.e-search-trigger').val('search');
    }

    var debouncedSearch = _.debounce(search, 300, false);
    var debouncedFilter = _.debounce(filter, 500, false);

    $('#lunr-search').keyup(function () {
        $('.e-search-trigger').val('more_horiz');
    });
    $('#lunr-search').keyup(debouncedSearch);
    $('#lunr-search').on('search:execute', debouncedSearch);
    // $('#lunr-filter').keyup(function () {
    //     $('.e-search-trigger').val('more_horiz');
    // });
    // $('#lunr-filter').keyup(debouncedFilter);

    // prevent enter key from submitting form
    $('.lunr-form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

});