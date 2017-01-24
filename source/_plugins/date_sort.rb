module Jekyll
  module DateSort
    require 'date'
    def date_sort(collection)
      collection.sort_by do |e|
        # puts e['sys']['createdAt']
        # Date.parse(e['sys']['createdAt'], '%d-%m-%Y')
        e['sys']['createdAt']
    end
end
end
end
Liquid::Template.register_filter(Jekyll::DateSort)