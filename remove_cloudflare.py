import os
import re
from tqdm import tqdm

def remove_script_from_html(file_path):
    # Read the contents of the HTML file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Define the regex pattern to match the specific <script> block
    pattern = r"<script>\s*\(function\(\)\{function\ c\(\)\{var\ b=a\.contentDocument\|\|a\.contentWindow\.document;if\(b\)\{var\ d=b\.createElement\('script'\);d\.innerHTML=\"window\.__CF\$cv\$params=\{r:'[^']+',t:'[^']+'\};var\ a=document\.createElement\('script'\);a\.nonce='';a\.src='/cdn\-cgi/challenge\-platform/scripts/jsd/main\.js';document\.getElementsByTagName\('head'\)\[0\]\.appendChild\(a\);\";b\.getElementsByTagName\('head'\)\[0\]\.appendChild\(d\)\}\}if\(document\.body\)\{var\ a=document\.createElement\('iframe'\);a\.height=1;a\.width=1;a\.style\.position='absolute';a\.style\.top=0;a\.style\.left=0;a\.style\.border='none';a\.style\.visibility='hidden';document\.body\.appendChild\(a\);if\('loading'!==document\.readyState\)c\(\);else\ if\(window\.addEventListener\)document\.addEventListener\('DOMContentLoaded',c\);else\{var\ e=document\.onreadystatechange\|\|function\(\)\{\};document\.onreadystatechange=function\(b\)\{e\(b\);'loading'!==document\.readyState\&\&\(document\.onreadystatechange=e,c\(\)\)\}\}\}\}\)\(\);\s*</script>"

    # Remove the matched script block from the content
    updated_content = re.sub(pattern, '', content, flags=re.DOTALL)

    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)

def process_html_files_in_directory(directory):
    # Recursively iterate through every .html file in the specified directory
    for root, _, files in tqdm(os.walk(directory)):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                remove_script_from_html(file_path)

# Set the directory containing the HTML files
docs_directory = 'docs'
process_html_files_in_directory(docs_directory)
