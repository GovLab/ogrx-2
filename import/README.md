bundle install
bundle exec contentful_bootstrap generate_token SPACE_ID
bundle exec contentful_bootstrap generate_json SPACE_ID TOKEN -o output.json

edit import.rb with space name and id

# create structured json file of data
ruby import.rb create_json data.json

# import structured json file into contentful
ruby import.rb import_json data.json