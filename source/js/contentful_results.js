  var contentfulClient = contentful.createClient({
      accessToken: '0fc4b56fae09e39a5cf7f383a3b35514f594e7a0b0b8c56c2421d771dacfc4e2',
      space: 'ufh1mvj7xl16'
  })

  var CONTENT_TYPE_ID = 'paper'

  var container = document.getElementById('content')

  contentfulClient.getEntries({
    content_type: CONTENT_TYPE_ID,
    skip: 100,
    limit: 200,
    order: 'sys.createdAt'
})
  .then(function(entries) {
    container.innerHTML = entries.items.length + " / " + entries.total +  " : " + entries.items.map(function(item){return "<div>" + item.fields.publicationName + "</div>"}).join('\n')
})
