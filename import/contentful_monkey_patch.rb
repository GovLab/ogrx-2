module Contentful
  module Bootstrap
    module Templates
      class Base        
        def create_entries
          content_types = []
          processed_entries = entries.map do |content_type_id, entry_list|
            content_type = space.content_types.find(content_type_id)
            content_types << content_type

            entry_list.each.map do |e|
              array_fields = []
              regular_fields = []
              e.each do |field_name, value|
                if value.is_a? ::Array
                  array_fields << field_name
                  next
                end

                regular_fields << field_name
              end

              array_fields.each do |af|
                e[af].map! do |item|
                  if item.is_a? ::Contentful::Bootstrap::Templates::Links::Base
                    item.to_management_object
                  else
                    item
                  end
                end
                e[af.to_sym] = e.delete(af)
              end

              regular_fields.each do |rf|
                value = e.delete(rf)
                if value.is_a? ::Contentful::Bootstrap::Templates::Links::Base
                  value = value.to_management_object
                end
                e[rf.to_sym] = value
              end

              begin
                puts "Creating Entry #{e[:id]}"
                entry = content_type.entries.create({:id => e[:id]})
                entry.save

                e = e.clone
                e[:id] = entry.id # in case no ID was specified in template
              rescue Contentful::Management::Conflict
                puts "Entry '#{e[:id]}' already exists! Skipping"
              ensure
                next e
              end
            end
          end.flatten

          processed_entries = processed_entries.map do |e|
            sleep(10)
            puts "MonkeyPatch Populating Entry #{e[:id]}"

            entry = space.entries.find(e[:id])
            e.delete(:id)
            entry.update(e)
            entry.save

            10.times do
              break if space.entries.find(entry.id).sys[:version] >= 4
              sleep(0.5)
            end

            entry.id
          end

          processed_entries.each { |e| space.entries.find(e).publish }
        end
      end
    end
  end
end