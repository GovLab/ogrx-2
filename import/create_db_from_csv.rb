# import content of csv file into sqlite database
# ruby create_db_from_csv.rb

require "sqlite3"
require "csv"

DATA_FILE = "data.csv"
DB_FILE = "data.db"

File.delete DB_FILE
db = SQLite3::Database.new DB_FILE

rows = db.execute <<-SQL
	create table papers (
		open boolean,
		publicationName varchar(255),
		organization varchar(255),
		authors varchar(255),
		publicationDate varchar(255),
		downloadLink varchar(255),
		innovationCategory varchar(255),
		objectiveCategory varchar(255),
		sectorCategory varchar(255),
		region varchar(255),
		methodology varchar(255),
		publicationType varchar(255),
		project varchar(255),
		gitHub varchar(255),		
		relatedDataUrl varchar(255),
		abstract varchar(255),
		relatedContentTitle varchar(255),
		relatedContentUrl varchar(255),		
		relatedContentTitle1 varchar(255),
		relatedContentUrl1 varchar(255)
	);
SQL

CSV.foreach(DATA_FILE) do |row|	
	if row[0] == "Open"
		row[0] = 1
	else
		row[0] = 0
	end
  db.execute "insert into papers values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", row
end