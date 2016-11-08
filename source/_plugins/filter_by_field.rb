module Jekyll
  module FilterDataByField
    def filter_data_by_field(data, field_name, field_value)  
      new_rows = []      
      for row in data
        field = row[field_name]
        for value in field 
          if value.downcase == field_value.downcase
            new_rows << row
          end
        end
      end
      return new_rows
    end
  end
end

Liquid::Template.register_filter(Jekyll::FilterDataByField)