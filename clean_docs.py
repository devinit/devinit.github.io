import os
import glob
from tqdm import tqdm

# Define the directories
documents_dir = 'docs/media/documents'
html_dir = 'docs'

# Get a list of all document files in the documents directory
document_files = [os.path.basename(doc) for doc in glob.glob(os.path.join(documents_dir, '*')) if doc.lower().endswith(('.csv', '.docx', '.html', '.jpg', '.pdf', '.xlsx', '.xltx', '.xml'))]

# Create a set to store referenced documents
referenced_documents = set()

# Check each .html file in the docs directory and its subdirectories
for root, dirs, files in tqdm(os.walk(html_dir)):
    for file in files:
        if file.lower().endswith('.html'):
            html_file_path = os.path.join(root, file)
            with open(html_file_path, 'r', encoding='utf-8') as file:
                content = file.read()
                for document in document_files:
                    # Check if the document is referenced in the HTML content
                    if document in content:
                        referenced_documents.add(document)

# Delete documents that are not referenced in any HTML files
for document in document_files:
    if document not in referenced_documents:
        document_path = os.path.join(documents_dir, document)
        try:
            os.remove(document_path)
            print(f'Deleted: {document_path}')
        except Exception as e:
            print(f'Error deleting {document_path}: {e}')
