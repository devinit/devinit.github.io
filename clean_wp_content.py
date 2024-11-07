import os
import glob
from tqdm import tqdm

# Define the directories
documents_dir = 'docs/wp-content'
html_dir = 'docs'

# Get a list of all document files in the documents directory
document_files = [doc[4:] for doc in glob.glob(os.path.join(documents_dir, '**/*'), recursive=True) if doc.lower().endswith(('.bmp', '.csv', '.doc', '.docx', '.gif', '.jpeg', '.jpg', '.mp4', '.ods', '.odt', '.pdf', '.png', '.ppt', '.pptx', '.svg', '.tif', '.txt', '.xls', '.xlsx'))]

# Create a set to store referenced documents
referenced_documents = set()

# Check each .html file in the docs directory and its subdirectories
for root, dirs, files in tqdm(os.walk(html_dir)):
    for file in files:
        if file.lower().endswith('.html'):
            html_file_path = os.path.join(root, file)
            if 'wp-content' not in html_file_path:
                with open(html_file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    for document in document_files:
                        # Check if the document is referenced in the HTML content
                        if document in content:
                            referenced_documents.add(document)

# Delete documents that are not referenced in any HTML files
for document in document_files:
    if document not in referenced_documents:
        document_path = 'docs{}'.format(document)
        try:
            os.remove(document_path)
            print(f'Deleted: {document_path}')
        except Exception as e:
            print(f'Error deleting {document_path}: {e}')
