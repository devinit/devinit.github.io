import os
import glob
from tqdm import tqdm

# Define the directories
images_dir = 'docs/media/images'
html_dir = 'docs'

# Get a list of all image files in the images directory
image_files = [os.path.basename(img) for img in glob.glob(os.path.join(images_dir, '*')) if img.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp'))]

# Create a set to store referenced images
referenced_images = set()

# Check each .html file in the docs directory and its subdirectories
for root, dirs, files in tqdm(os.walk(html_dir)):
    for file in files:
        if file.lower().endswith('.html'):
            html_file_path = os.path.join(root, file)
            with open(html_file_path, 'r', encoding='utf-8') as file:
                content = file.read()
                for image in image_files:
                    # Check if the image is referenced in the HTML content
                    if image in content:
                        referenced_images.add(image)

# Delete images that are not referenced in any HTML files
for image in image_files:
    if image not in referenced_images:
        image_path = os.path.join(images_dir, image)
        try:
            os.remove(image_path)
            print(f'Deleted: {image_path}')
        except Exception as e:
            print(f'Error deleting {image_path}: {e}')
