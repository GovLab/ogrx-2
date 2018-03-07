var contentfulClient = contentful.createClient({
  accessToken: '0fc4b56fae09e39a5cf7f383a3b35514f594e7a0b0b8c56c2421d771dacfc4e2',
  space: 'ufh1mvj7xl16'
})

var CONTENT_TYPE_ID = 'paper'

var container = document.getElementById('content')

var slugify = function(text) { return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, ''); }

var results = function (item) {
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

    "' style='display: inline-block; margin-left: -4px;'>" +
    "<h3 class='result-item__name'><a href='' title='" + item.fields.publicationName + "'>" + item.fields.publicationName + "</a></h3>" +
    "<p class='result-item__authors'>" +
    item.fields.authors.map(function(i){ return "<a href='../by/author.html?query=" + i.replace(" ", "+") + "'>" + i + "</a>"}).join(' ') +
    "</p>" +
    "<div class='result-item__taxonomy result-item__taxonomy--category'>" +
    "<span class='result-item__taxonomy__key'>Category</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.innovationCategory.map(function(i){ return "<a href='' class='result-item__tag result-item__tag--" + slugify(i) + "'>" + slugify(i) + "</a>"}).join(' ') +
    "</span>" +

    "</div>" +
    "<div class='result-item__taxonomy result-item__taxonomy--methodology'>" +
    "<span class='result-item__taxonomy__key'>Methodology</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.methodology.map(function(i){ return "<a class='result-item__tag' href=''>" + i + "</a>"}).join(' ') +
    "</span>" +
    "</div>" +
    "<div class='result-item__taxonomy result-item__taxonomy--objective'>" +
    "<span class='result-item__taxonomy__key'>Objective</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.objectiveCategory.map(function(i){ return "<a class='result-item__tag' href=''>" + i + "</a>"}).join(' ') +
    "</span>" +
    "</div>" +
    "<div class='result-item__taxonomy result-item__taxonomy--type'>" +
    "<span class='result-item__taxonomy__key'>Type</span>" +
    "<span class='result-item__taxonomy__value'>" +
    item.fields.publicationType.map(function(i){ return "<a class='result-item__tag' href=''>" + i + "</a>"}).join(' ') +
    "</span>" +
    "</div>" +
    (item.fields.open ? "" : "<div class='result-item__unpaywall'><p>May be available at</p><a href='http://unpaywall.org/''><img src='../images/unpaywall.png'></a></div>") +
    "</div>"
}

contentfulClient.getEntries({
    content_type: CONTENT_TYPE_ID,
    skip: 100,
    limit: 200,
    order: 'sys.createdAt'
})
.then(function(entries) {
    console.log(entries.items);
    container.innerHTML =
    entries.items.length + " / "
    + entries.total +  " : "
    + entries.items.map(results).join('\n')
})