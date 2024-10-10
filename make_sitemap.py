import os
from urllib.parse import urlparse
from lxml import etree
from tqdm import tqdm


# Output directory for saving
output_dir = "docs"


# Fetch and parse the sitemap
def fetch_sitemap():
    with open("docs/sitemap.xml", "rb") as sitemap_file:
        sitemap_xml = sitemap_file.read()
        sitemap = etree.fromstring(sitemap_xml)
        urls = sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        return [url.text for url in urls]


def make_url_path(url):
    parsed_url = urlparse(url)
    path = parsed_url.path
    if path.endswith('/'):
        path = path + "index.html"
    if not path.endswith('.html'):
        path = path + ".html"

    # Replace "https://devinit.org/" with "/"
    path = path.replace("https://devinit.org/", "/")
    
    return path

def make_sitemap():
    html_content = "<html><head><title>Sitemap</title></head><body><ol>"
    urls = fetch_sitemap()
    for url in tqdm(urls):
        url_path = make_url_path(url)
        anchor = f"<li><a href='{url_path}'>{url_path}</a></li>\n"
        html_content += anchor
    html_content += "</ol></body></html>"
    with open("docs/sitemap.html", "w") as html_file:
        html_file.write(html_content)

if __name__ == "__main__":
    make_sitemap()
