module Jekyll
  module DateSort
    require 'date'
    def date_sort(collection)
      collection.sort_by do |e|
        # puts e['sys']['created_at']
        # Date.parse(e['sys']['created_at'], '%d-%m-%Y')
        e['sys']['created_at']
    end
end
end
end
Liquid::Template.register_filter(Jekyll::DateSort)