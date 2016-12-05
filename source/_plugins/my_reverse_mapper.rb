require 'jekyll-contentful-data-import/mappers'

class MyReverseMapper < Jekyll::Contentful::Mappers::Base
  def map
    result = super
    puts 'test'
    puts result
    result.keys.each do |name|
      result[name.reverse] = result[name]
    end

    result
  end
end