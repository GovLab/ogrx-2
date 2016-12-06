# install requisite libs
bundle install

# generate oauth token for space
bundle exec contentful_bootstrap generate_token SPACE_ID

# generate json export of current space to get content model
bundle exec contentful_bootstrap generate_json SPACE_ID TOKEN -o output.json

# import content of csv file into sqlite database
ruby create_db_from_csv.rb CSVFILE.csv

# create structured json file of data from sqlite database
ruby import.rb create_json data.json

# copy content model of paper from output.json and replace the content model of paper in data.json. contentful_database_importer doesn't format array content fields properly.

# edit import.rb with space name and id
# import structured json file into contentful
ruby import.rb import_json data.json