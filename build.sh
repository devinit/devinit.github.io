#!/bin/bash

source venv/bin/activate

rm -rf docs/blog
rm -rf docs/contact-us
rm -rf docs/data
rm -rf docs/events
rm -rf docs/how-we-work
rm -rf docs/media-centre
rm -rf docs/policies-and-statements
rm -rf docs/resources
rm -rf docs/welcome
rm -rf docs/what-we-do
rm -rf docs/who-we-are
rm -rf docs/work-for-us
rm docs/index.html
rm docs/sitemap.html

rsync -r /home/alex/git/DIwebsite-redesign/media/images docs/media/
rsync -r /home/alex/git/DIwebsite-redesign/media/documents docs/media/
find docs/media -type f -size +50M | xargs rm

python3 fetch.py
python3 remove_cloudflare.py
python3 clean_images.py
python3 clean_docs.py
python3 make_sitemap.py