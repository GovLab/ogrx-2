require 'byebug'
module Jekyll
  module DataFormatter

    def sort_authors(authors)
      authors.sort_by! {|x|x.split(" ")[-1]}
    end

    def get_last_initial(author)
      author.split(" ")[-1][0].upcase
    end




    # // make people objects from data
    # function createPeopleObjects(obj) {
    #   var people = [];
    #   obj.forEach(function(val) {
    #     if (val){
    #       var nameArr = val.value.split(" ");
    #       var lastName = nameArr[nameArr.length-1];
    #       var firstName = nameArr.slice(0,nameArr.indexOf(lastName)).join(" ");
    #       people.push(new Person(val.id, firstName, lastName));
    #     }
    #   });
    #   return people;
    # }
    
    def titlecase(str)
      no_caps = ["a", "an", "and", "as", "at", "but", "by", "for", "from", "if", "in", "nor", "of", "on", "or", "so", "the", "to", "via", "vs", "with ", "without", "yet"]
      cappedString = []
      unless str == nil
        str.downcase.split(" ").map! do | word | 
          if no_caps.include?(word) 
            cappedString << (word)
          else
            cappedString << word.capitalize 
          end
        end
      end
      cappedString.join(" ")

    end

    def format_url(url)
      url_regex = /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix
      if url.match(url_regex)
        url
      elsif
        url = "http://#{url}"
        if url.match(url_regex)
          url
        end
      else 
        ""
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::DataFormatter)