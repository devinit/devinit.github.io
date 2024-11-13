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

# Output directory for saving the static site
output_dir = "docs"


def remove_cache_busting_hashes(text):
    # Pattern to match URLs starting with "/assets", capture the file base name and extension, and remove the hash
    pattern = r'(/assets/.*?)(\.[a-f0-9]{12})(\.css|\.csv|\.eot|\.gif|\.hbs|\.html|\.ico|\.jpg|\.js|\.json|\.md|\.mjs|\.png|\.svg|\.ttf|\.txt|\.webp|\.woff|\.woff2)'
    
    # Replace the matched pattern with the cleaned URL (without the hash)
    cleaned_text = re.sub(pattern, r'\1\3', text)
    
    return cleaned_text


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
    query = parsed_url.query.replace("=", "_")
    path = f"{path}{query}/"
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

# Crawl all page URLs and save them
def crawl_and_save():
    resource_urls = ["https://devinit.org/resources/?page=" + str(i) for i in range(1, 49)]
    blog_urls = ["https://devinit.org/blog/?page=" + str(i) for i in range(1, 34)]
    urls = resource_urls + blog_urls
    for url in tqdm(urls):
        file_path = make_url_path(url)
        if not os.path.exists(file_path):
            html_content = fetch_page(url)
            if html_content:
                soup = BeautifulSoup(html_content, "html.parser")

                # Find the div with class 'notice__wrapper' and remove it
                notice_div = soup.find('div', class_='notice__wrapper')
                if notice_div:
                    notice_div.decompose()  # Removes the element from the DOM

                # JavaScript code you want to inject
                js_code = """
                <script>
                    // Get the URLSearchParams object for the current URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const pageParam = urlParams.get('page'); // Get the 'page' parameter

                    if (pageParam) {
                        // Get the current URL path and origin (e.g., https://devinit.org/resources/)
                        const currentUrl = window.location.origin + window.location.pathname;

                        // Remove any existing page_X segment from the path
                        const newPath = currentUrl.replace(/\\/page_\\d+\\//, `/page_${pageParam}/`);

                        // Redirect if the new path differs from the current path
                        if (newPath + window.location.search !== window.location.href) {
                            window.location.href = newPath;
                        }
                    }
                </script>
                """

                # Create a new Tag object for the script tag
                script_tag = BeautifulSoup(js_code, "html.parser")

                # Append the script tag to the end of the body
                soup.body.append(script_tag)

                # Convert the BeautifulSoup object to a string for easier manipulation
                html_str = soup.prettify()

                # Replace "https://devinit-prod-static.ams3.cdn.digitaloceanspaces.com/" with "/"
                html_str = html_str.replace("https://devinit-prod-static.ams3.cdn.digitaloceanspaces.com/", "/")
                
                # Replace "https://devinit.org/" with "/"
                html_str = html_str.replace("https://devinit.org/", "/")

                # Remove the caching hash from assets URLs
                html_str = remove_cache_busting_hashes(html_str)

                # Save the modified page
                save_html(url, html_str)

if __name__ == "__main__":
    crawl_and_save()
