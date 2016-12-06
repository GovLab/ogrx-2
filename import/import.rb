# usage: 
# ruby import.rb create_json JSON_FILENAME
# ruby import.rb import_json JSON_FILENAME

require "sqlite3"
require 'contentful/database_importer'
require 'tempfile'
require 'chronic'
require './contentful_monkey_patch.rb'

class Paper
  include Contentful::DatabaseImporter::Resource

	self.table_name = 'papers'

	field :open, type: :boolean, pre_process: -> (value) { value ? true : false }
	field :publicationName, type: :symbol
	field :organization, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :authors, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :publicationDate, type: :date, pre_process: :parse_date	
	field :downloadLink, type: :text
	field :innovationCategory, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :objectiveCategory, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :sectorCategory, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :region, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :methodology, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :publicationType, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :project, type: :array, item_type: :symbol, pre_process: :string_to_array
	field :gitHub, type: :symbol
	field :relatedDataUrl, type: :text
	field :relatedContentTitle, type: :symbol
	field :relatedContentUrl, type: :text
	field :abstract, type: :text
	field :relatedContentTitle1, type: :symbol, exclude_from_output: :true
	field :relatedContentUrl1, type: :symbol, exclude_from_output: :true
	
	def string_to_array(value)
		values = (value ? value.split(",") : [])
		values.map { |v| v.strip }
	end

	def parse_date(value)		
		value ? DateTime.parse(Chronic.parse(value).to_s).iso8601 : DateTime.parse(Chronic.parse('12/05/2016').to_s).iso8601
	end
end

Contentful::DatabaseImporter.setup do |config|
  config.space_name = 'ogrx'
  config.space_id = 'ufh1mvj7xl16'
  config.database_connection = 'sqlite://data.db'
  config.skip_content_types = true 
end

# Contentful::DatabaseImporter.run!
# Contentful::DatabaseImporter.update_space!

if ARGV[0] == 'create_json'	
	f = File.open(ARGV[1], "w")
	f.write(Contentful::DatabaseImporter.generate_json!)	
elsif ARGV[0] == 'import_json'
	file = Tempfile.new('import')
	f = File.open(ARGV[1], "r")
	file.write(f.read)
	Contentful::DatabaseImporter.bootstrap_update_space!(file)
end