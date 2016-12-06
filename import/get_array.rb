# get a list of all unique values in the database for a specific comma separated field
# ruby get_array.rb OBJECT_NAME
# i.e. ruby get_array.rb project
require "sqlite3"

DB_FILE = "data.db"

db = SQLite3::Database.new DB_FILE

object_name = ARGV[0]
results = db.execute "select distinct #{object_name} from papers"
entry_list = []
selection = results.map { |r| 	
	entry_list << r.first.split(",").map {|item| item.strip } if r.first
}
puts selection.flatten.uniq