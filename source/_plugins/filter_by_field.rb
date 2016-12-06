module Jekyll
  module FilterDataByField
    def filter_data_by_field(input, field_name, field_value)
      new_rows = []
      if !input.nil?
        for row in input
          field = row[field_name]
          if !field.nil?
            for value in field
              if !value.nil? && !field_value.nil?
                if value.downcase == field_value.downcase
                  new_rows << row
                end
              end
            end
          end
        end
      end
      return new_rows
    end
  end
end

Liquid::Template.register_filter(Jekyll::FilterDataByField)