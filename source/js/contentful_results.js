var contentfulClient = contentful.createClient({
  accessToken: '0fc4b56fae09e39a5cf7f383a3b35514f594e7a0b0b8c56c2421d771dacfc4e2',
  space: 'ufh1mvj7xl16'
});

var PAPER_CONTENT_TYPE_ID = 'paper';
var LIST_CONTENT_TYPE_ID = 'list';
var BLOG_CONTENT_TYPE_ID = 'blogpost';

var dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

var slugify = function(text) { return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, ''); }
var safeslug = function(text) { return text.toString().toLowerCase().replace(/-/g, '%%').replace(/\s+/g, '-'); }
var deslugify = function(text) { return text.toString().replace(/[\-]/g, ' ').replace('%%', '-'); }
var getLastInitial = function(text) { return text.toString().replace(/^.*\s+/, '').substring(0, 1); }
var getLastName = function(text) { return text.toString().replace(/^.*\s+/, ''); }

var results = function (item, basepath) {
    if (typeof basepath === "undefined") { basepath = ''; }
    if (item.fields.organization === undefined) { item.fields.organization = []; }
    if (item.fields.objectiveCategory === undefined) { item.fields.objectiveCategory = []; }
    if (item.fields.methodology === undefined) { item.fields.methodology = []; }
    if (item.fields.sectorCategory === undefined) { item.fields.sectorCategory = []; }
    if (item.fields.region === undefined) { item.fields.region = []; }
    if (item.fields.project === undefined) { item.fields.project = []; }
    if (item.fields.publicationType === undefined) { item.fields.publicationType = []; }
    if (item.fields.authors === undefined) { item.fields.authors = []; }
    if (item.fields.innovationCategory === undefined) { item.fields.innovationCategory = []; }

    return "<div class='result-item " +
    (item.fields.open ? "m-open f-open" : "") + " " +
    item.fields.organization.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.objectiveCategory.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.methodology.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.sectorCategory.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.region.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.project.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.publicationType.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.authors.map(function(i){ return "f-" + slugify(i)}).join(' ') + " " +
    item.fields.innovationCategory.map(function(i){ return "m-" + slugify(i)}).join(' ') + " " +
    "f-search-" + slugify(item.sys.id) + " " +

    "' style='display: inline-block; margin-left: -4px;'>" +
    "<h3 class='result-item__name'><a href='" + basepath + "paper.html?n=" + encodeURIComponent(safeslug(item.fields.publicationName)).replace('%20', '-') + "' title='" + item.fields.publicationName + "'>" + item.fields.publicationName + "</a></h3>" +
    // "<h3 class='result-item__name'><a href='../paper.html?id=" + item.sys.id + "' title='" + item.fields.publicationName + "'>" + item.fields.publicationName + "</a></h3>" +
    "<p class='result-item__authors'>" +
    item.fields.authors.map(function(i){ return "<a href='" + basepath + "by/author.html?name=" + i.replace(" ", "+") + "'>" + i + "</a>"}).join(' ') +
    "</p>" +
    "<div class='result-item__taxonomy result-item__taxonomy--category'>" +
    "<span class='result-item__taxonomy__key'>Category</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.innovationCategory.map(function(i){ return "<a href='" + basepath + "all.html?f=true&category=" + encodeURIComponent(safeslug(i)) + "' class='result-item__tag result-item__tag--" + slugify(i) + "'>" + i + "</a>"}).join(' ') +
    "</span>" +

    "</div>" +
    "<div class='result-item__taxonomy result-item__taxonomy--methodology'>" +
    "<span class='result-item__taxonomy__key'>Methodology</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.methodology.map(function(i){ return "<a class='result-item__tag' href='" + basepath + "all.html?f=true&methodology=" + encodeURIComponent(safeslug(i)) + "'>" + i + "</a>"}).join(' ') +
    "</span>" +
    "</div>" +
    "<div class='result-item__taxonomy result-item__taxonomy--objective'>" +
    "<span class='result-item__taxonomy__key'>Objective</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.objectiveCategory.map(function(i){ return "<a class='result-item__tag' href='" + basepath + "all.html?f=true&objective=" + encodeURIComponent(safeslug(i)) + "'>" + i + "</a>"}).join(' ') +
    "</span>" +
    "</div>" +
    "<div class='result-item__taxonomy result-item__taxonomy--type'>" +
    "<span class='result-item__taxonomy__key'>Type</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.publicationType.map(function(i){ return "<a class='result-item__tag' href='" + basepath + "all.html?f=true&type=" + encodeURIComponent(safeslug(i)) + "'>" + i + "</a>"}).join(' ') +
    "</span>" +
    "</div>" +
    (item.fields.open ? "" : "<div class='result-item__unpaywall'><p>May be available at</p><a href='http://unpaywall.org/''><img src='../images/unpaywall.png'></a></div>") +
    "</div>"
}

var singleResult = function(entry) {
    if (entry.fields.organization === undefined) { entry.fields.organization = []; }
    if (entry.fields.objectiveCategory === undefined) { entry.fields.objectiveCategory = []; }
    if (entry.fields.methodology === undefined) { entry.fields.methodology = []; }
    if (entry.fields.sectorCategory === undefined) { entry.fields.sectorCategory = []; }
    if (entry.fields.region === undefined) { entry.fields.region = []; }
    if (entry.fields.project === undefined) { entry.fields.project = []; }
    if (entry.fields.publicationType === undefined) { entry.fields.publicationType = []; }
    if (entry.fields.authors === undefined) { entry.fields.authors = []; }
    if (entry.fields.innovationCategory === undefined) { entry.fields.innovationCategory = []; }

    var utcAdjust = 4;
    var date = new Date(new Date(entry.fields.publicationDate).getTime() + utcAdjust*3600000);

    return '<div id="blog-single"><div class="top-section top-section--main-color blog-header">' +
    '<h1>' + entry.fields.publicationName + '</h1>' +
    '<h3 class="blog-single__meta">' + (date).toLocaleDateString('en-US', dateFormatOptions) +
    ' by ' + entry.fields.authors.join(', ') + '</h3>' +
    '<div class="paper-metadata"><div class="row"><div class="large-6 medium-6 small-12 column"><div class="row">' +
    '<div class="column large-4 medium-6 small-12 paper-metadata__left-column">Type</div>' +
    entry.fields.publicationType.map(function(i){ return '<div class="column large-8 medium-6 small-12 type">' + i + '</div>'}).join('\n') +
    '</div><div class="row"><div class="column large-4 medium-6 small-12 paper-metadata__left-column">Region</div>' +
    '<div class="column large-8 medium-6 small-12 type">' + entry.fields.region.join(', ') + '</div></div><div class="row"><div class="column large-4 medium-6 small-12 paper-metadata__left-column">Sector</div>' +
    '<div class="column large-8 medium-6 small-12 category">' + entry.fields.sectorCategory.join(', ') + '</div></div></div><div class="large-6 column"><div class="row"><div class="column large-4 medium-6 small-12 paper-metadata__left-column">Category</div>' +
    '<div class="column large-8 medium-6 small-12 type">' + entry.fields.innovationCategory.join(', ') + '</div></div><div class="row"><div class="column large-4 medium-6 small-12 paper-metadata__left-column">Methodology</div>' +
    '<div class="column large-8 medium-6 small-12 type">' + entry.fields.methodology.join(', ') + '</div></div><div class="row"><div class="column large-4 medium-6 small-12  paper-metadata__left-column">Objective</div>' +
    '<div class="column large-8 medium-6 small-12 category">' + entry.fields.objectiveCategory.join(', ') + '</div> </div> </div> </div> </div>' +
    '<a href="' + entry.fields.downloadLink + '" target="_blank" id="paper-access-button" class="button">Access this Publication</a> </div>' +
    '<section class="blog-content blog-single"><div class="row"><div class="large-8 column large-offset-2">' +
    entry.fields.abstract +
    '</div></div></section></div>';
}

var singleList = function(entry) {
    return ((entry.fields.articlesList === undefined) ? '' : '<section class="divider"><h1>Selected Readings</h1></section>') +
    entry.fields.articlesList.map(function(i) { return results(i, '../'); }) +
    '<div class="row"><div class="large-12 column" style="padding: 40px 0"><p style="text-align: center;"><a class="button" href="../selectedreadings.html">All Selected Readings</a></p></div></div></div>';
}

var singleBlog = function(entry) {
    return (entry.fields.articlesList === undefined) ? '' : entry.fields.articlesList.map(function(i) { return results(i, '../'); });
}

var singleAuthor = function(entry) {
    return '<div class="column small-12 large-4 all-authors-list__list-item">' +
    '<a href="by/author.html?name=' + encodeURIComponent(entry) + '">'+ entry + '</a></div><div class="alpha_anchor"><a name="' + getLastInitial(entry) + '"></a></div>'
}

var findGetParameter = function(parameterName) {
    var result = null,
    tmp = [];
    location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
    return result;
}

var pagination = function (p, l, t, params) {
    var numPagesDisplayed = 10;
    var max = Math.floor(t/l);
    var startPage = Math.floor(p - numPagesDisplayed/2);
    var pn = startPage;
    startPage = (startPage < 1) ? 1 : startPage;

    if ([25,50,100,200,500,1000].indexOf(l) > -1) {
        l = 100;
    }

    var html = "<div class='js-pagination'><div>Page: ";

    for (var i = 0; i < numPagesDisplayed && pn <= max; i++) {
        pn = startPage + i;
        if (pn != p) {
            html += "<a href='./" + location.pathname.split('/').pop() + "?p=" + pn + "&limit=" + l + params + "'>" + pn + "</a>";
        }
        else {
            html += "<span class='js-current-page'>" + pn + "</span>";
        }
    }

    html += "</div><div class='js-total'><span>Showing </span>" +
    "<div class='select' style=''><select name='select-limit' id='js-select-limit' onchange='selectLimitChange(this, " + t + ")'>" +
    "<option value='25' " + (l == 25 ? "selected" : "") + ">25</option>" +
    "<option value='50' " + (l == 50 ? "selected" : "") + ">50</option>" +
    "<option value='100' " + (l == 100 ? "selected" : "") + ">100</option>" +
    "<option value='200' " + (l == 200 ? "selected" : "") + ">200</option>" +
    "<option value='500' " + (l == 500 ? "selected" : "") + ">500</option>" +
    "<option value='1000' " + (l == 1000 ? "selected" : "") + ">1000</option>" +
    "</select></div><span> per page of <b>" + t + "</b> articles</span></div></div>";

    return html;
}

var selectLimitChange = function(e, total) {
    var paramstring = '';
    var page = findGetParameter('p');
    page = (page === null) ? 1 : page;
    if (page*e.value > total) {
        page = Math.floor(total/e.value)+1;
    }
    var query = findGetParameter('q');
    var filter = findGetParameter('f');
    if (query !== null) {
        var open = findGetParameter('open');
        open = (open === null) ? '' : '&open=' + encodeURIComponent(open);
        paramstring = '&q=' + encodeURIComponent(query) + open;
    }
    else if (filter == 'true' || filter == '1') {
        var category = findGetParameter('category');
        var methodology = findGetParameter('methodology');
        var objective = findGetParameter('objective');
        var type = findGetParameter('type');
        var open = findGetParameter('open');
        category = (category === null) ? '' : '&category=' + encodeURIComponent(category);
        methodology = (methodology === null) ? '' : '&methodology=' + encodeURIComponent(methodology);
        objective = (objective === null) ? '' : '&objective=' + encodeURIComponent(objective);
        type = (type === null) ? '' : '&type=' + encodeURIComponent(type);
        open = (open === null) ? '' : '&open=' + encodeURIComponent(open);
        paramstring = '&f=true' + category + methodology + objective + type + open;
    }
    location = location.pathname.split('/').pop() + '?p=' + page + '&limit=' + e.value + paramstring;
}

var renderEntries = function(el, basepath, _category, _organization, _author) {
    var container = document.getElementById(el);
    var category, organization, author;

    var params = {
        content_type: PAPER_CONTENT_TYPE_ID,
        order: '-sys.createdAt'
    };

    if (typeof basepath === "undefined") {
        basepath = '';
    }
    if (typeof _category !== "undefined") {
        category = _category;
        if (category !== null) { params['fields.innovationCategory[match]'] = category; }
    }
    if (typeof _organization !== "undefined") {
        organization = _organization;
        if (organization !== null) { params['fields.organization[match]'] = organization; }
    }
    if (typeof _author !== "undefined") {
        author = _author;
        if (author !== null) { params['fields.authors[match]'] = author; }
    }

    var paramstring = '';

    var page = findGetParameter('p');
    var limit = findGetParameter('limit');

    var query = findGetParameter('q');
    var filter = findGetParameter('f');
    if (query !== null) {
        var open = findGetParameter('open');
        if (open !== null) { params['fields.open'] = open; }
        open = (open === null) ? '' : '&open=' + encodeURIComponent(open);
        params['query'] = query;
        paramstring = '&q=' + encodeURIComponent(query) + open;
    }
    else if (filter == 'true' || filter == '1') {
        category = findGetParameter('category');
        var methodology = findGetParameter('methodology');
        var objective = findGetParameter('objective');
        var type = findGetParameter('type');
        var open = findGetParameter('open');
        if (category !== null) { params['fields.innovationCategory[match]'] = deslugify(category); }
        if (methodology !== null) { params['fields.methodology[match]'] = deslugify(methodology); }
        if (objective !== null) { params['fields.objectiveCategory[match]'] = deslugify(objective); }
        if (type !== null) { params['fields.publicationType[match]'] = deslugify(type); }
        if (open !== null) { params['fields.open'] = open; }
        category = (category === null) ? '' : '&category=' + encodeURIComponent(category);
        methodology = (methodology === null) ? '' : '&methodology=' + encodeURIComponent(methodology);
        objective = (objective === null) ? '' : '&objective=' + encodeURIComponent(objective);
        type = (type === null) ? '' : '&type=' + encodeURIComponent(type);
        open = (open === null) ? '' : '&open=' + encodeURIComponent(open);
        paramstring = '&f=true' + category + methodology + objective + type + open;
    }

    page = (page === null || page < 1) ? 1 : page;
    limit = (limit === null) ? 100 : limit;
    limit = (limit > 1000) ? 1000 : limit;
    var skip = Math.floor(page-1) * limit;

    params['skip'] = skip;
    params['limit'] = limit;

    contentfulClient.getEntries(params)
    .then(function(entries) {
        // if skip exceeds total, redirect back to p=1 using current limit to avoid broken page (should only happen if values are manually entered in url)
        if (skip > entries.total) {
            location = 'all.html?p=1&limit=' + limit;
        }
        container.innerHTML = pagination(page, limit, entries.total, paramstring) + entries.items.map(function(i) { return results(i, basepath); }).join('\n') + pagination(page, limit, entries.total, paramstring);
    })
}

var renderSingleEntry = function(el) {
    var container = document.getElementById(el)

    var id = findGetParameter('id');
    var name = findGetParameter('n');

    if (name !== null) {
        name = deslugify(name);
        contentfulClient.getEntries({
            content_type: PAPER_CONTENT_TYPE_ID,
            'fields.publicationName[match]': name
        })
        .then(function(entries) {
            console.log(name);
            if (entries.items.length > 0) {
                console.log(entries.items[0].sys.id);
                container.innerHTML = singleResult(entries.items[0]);
            } else {
                throw 'No entry found';
            }
        })
        .catch(console.error)
    } else {
        contentfulClient.getEntry(id)
        .then(function(entry){
            container.innerHTML = singleResult(entry);
        });
    }
}

var renderList = function(el) {
    var container = document.getElementById(el);

    var name = location.pathname.replace(/^.*\//,'').replace(/\.html$/,'');

    name = deslugify(name);
    contentfulClient.getEntries({
        content_type: LIST_CONTENT_TYPE_ID,
        'fields.title[match]': name
    })
    .then(function(entries) {
        console.log(name);
        if (entries.items.length > 0) {
            console.log(entries.items[0].sys.id);
            container.innerHTML = singleList(entries.items[0]);
        } else {
            throw 'No entry found';
        }
    })
    .catch(console.error)
}

var renderBlog = function(el) {
    var container = document.getElementById(el);

    var name = location.pathname.replace(/^.*\//,'').replace(/\.html$/,'');

    name = deslugify(name);
    contentfulClient.getEntries({
        content_type: BLOG_CONTENT_TYPE_ID,
        'fields.title[match]': name
    })
    .then(function(entries) {
        console.log(name);
        if (entries.items.length > 0) {
            console.log(entries.items[0].sys.id);
            container.innerHTML = singleBlog(entries.items[0]);
        } else {
            throw 'No entry found';
        }
    })
    .catch(console.error)
}

var authorNames = [];

var getAuthors = function(skip, container) {
    contentfulClient.getEntries({
        content_type: PAPER_CONTENT_TYPE_ID,
        select: 'fields.authors',
        limit: 1000,
        skip: skip
    })
    .then(function(entries) {
        console.log('Getting authors', skip, '-', skip+1000, 'of', entries.total);
        if (entries.items.length > 0) {
            // get all author names
            for (var i in entries.items) {
                if (typeof entries.items[i].fields !== 'undefined') {
                    for (var a in entries.items[i].fields.authors) {
                        authorNames.push(entries.items[i].fields.authors[a]);
                    }
                }
            }
        } else {
            throw 'No entries found';
        }
        skip += 1000;
        if (skip < entries.total) {
            getAuthors(skip, container);
        } else {
            console.log('done');

            // filter for unique names
            authorNames = Array.from(new Set(authorNames));

            authorNames = authorNames.sort(function(a, b) {
                return (getLastName(a).toLowerCase() > getLastName(b).toLowerCase()) ? 1 : -1;
            });
            console.log(authorNames);

            container.innerHTML = authorNames.map(function(i) { return singleAuthor(i); }).join('\n');
        }
    })
    .catch(console.error)
}

var renderAuthors = function(el) {
    var container = document.getElementById(el);
    getAuthors(0, container);
}