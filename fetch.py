import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from lxml import etree
from dotenv import load_dotenv
from tqdm import tqdm
import re
import csv


load_dotenv()
HEADER = os.getenv('HEADER')
HASH = os.getenv('HASH')
HEADERS = {
    HEADER: HASH,
}

# URL of the sitemap
sitemap_url = "https://devinit.org/sitemap.xml"

# Output directory for saving the static site
output_dir = "docs"


def remove_cache_busting_hashes(text):
    # Pattern to match URLs starting with "/assets", capture the file base name and extension, and remove the hash
    pattern = r'(/assets/.*?)(\.[a-f0-9]{12})(\.css|\.csv|\.eot|\.gif|\.hbs|\.html|\.ico|\.jpg|\.js|\.json|\.md|\.mjs|\.png|\.svg|\.ttf|\.txt|\.webp|\.woff|\.woff2)'
    
    # Replace the matched pattern with the cleaned URL (without the hash)
    cleaned_text = re.sub(pattern, r'\1\3', text)
    
    return cleaned_text


documents_mapping = list()
with open('docs.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        doc_id = row['id']
        doc_file = row['file']
        doc_file_basename = os.path.basename(doc_file)
        doc_path_from = f"/documents/{doc_id}/{doc_file_basename}"
        doc_path_to = f"/media/{doc_file}"
        doc_dict = {'from': doc_path_from, 'to': doc_path_to}
        documents_mapping.append(doc_dict)


def replace_document_redirects(text):
    for doc_map in documents_mapping:
        text = text.replace(doc_map['from'], doc_map['to'])
    return text


# Fetch and parse the sitemap
def fetch_sitemap(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        sitemap_xml = response.content
        sitemap = etree.fromstring(sitemap_xml)
        urls = sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        return [url.text for url in urls]
    else:
        print(f"Error fetching sitemap: {response.status_code}")
        return []

# Fetch HTML content from a URL
def fetch_page(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Error fetching page {url}: {response.status_code}")
        return None


def make_url_path(url):
    parsed_url = urlparse(url)
    path = parsed_url.path
    if path.endswith('/'):
        path = path + "index.html"
    if not path.endswith('.html'):
        path = path + ".html"
    
    # Full output path
    file_path = os.path.join(output_dir, path.strip('/'))

    return file_path

# Save HTML content to a file
def save_html(url, html_content):
    file_path = make_url_path(url)
    
    # Create directories if necessary
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    # Save the HTML file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(html_content)

# Crawl all URLs in the sitemap and save them
def crawl_and_save(sitemap_url):
    urls = fetch_sitemap(sitemap_url)
    for url in tqdm(urls):
        file_path = make_url_path(url)
        if not os.path.exists(file_path):
            html_content = fetch_page(url)
            if html_content:
                soup = BeautifulSoup(html_content, "html.parser")
                # Convert the BeautifulSoup object to a string for easier manipulation
                html_str = soup.prettify()

                # Replace "https://devinit-prod-static.ams3.cdn.digitaloceanspaces.com/" with "/"
                html_str = html_str.replace("https://devinit-prod-static.ams3.cdn.digitaloceanspaces.com/", "/")
                
                # Replace "https://devinit.org/" with "/"
                html_str = html_str.replace("https://devinit.org/", "/")

                # Remove the caching hash from assets URLs
                html_str = remove_cache_busting_hashes(html_str)

                # Replace document redirect URLs
                html_str = replace_document_redirects(html_str)

                # Save the modified page
                save_html(url, html_str)

if __name__ == "__main__":
    crawl_and_save(sitemap_url)
