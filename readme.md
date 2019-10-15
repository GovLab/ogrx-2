# OGRX v2

This is a static site using Jekyll, and Contentful as a data API

### Installation
First make sure ruby, node, npm, and bundler are installed on your system, then:

    bundle install
    npm install
    bundle exec jekyll build

### Run server
    bundle exec jekyll serve

### Data
Contentful API data is fetched and stored in `source/_data/contentful`

    bundle exec rake contentful

Use `bundle exec rake contentful` to pull the contentful content, this is so the 'sys' property can be pulled to get automatically updated createdAt/updatedAt times for blog posts, etc


### Deploy

    gulp deploy

#### Troubleshooting
##### Deployment

The gulp-gh-pages plugin stores a cache of the repo automatically in a `.publish` folder, which throws this error when you try to deploy after deleting your gh-pages branch.

```
Error in plugin 'gulp-gh-pages'
Message:
    Command failed: git pull
Your configuration specifies to merge with the ref 'refs/heads/gh-pages'
from the remote, but no such ref was fetched.

Details:
    killed: false
    code: 1
    signal: null
    cmd: git pull
```

To fix this, delete the `.publish` folder in the root of the directory and then run `gulp deploy` again.

See:
https://github.com/shinnn/gulp-gh-pages/issues/109