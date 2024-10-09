#!/bin/bash

# Check if directory is passed as an argument, if not, use the current directory
dir=${1:-.}

# Find all files, extract their extensions, and list them uniquely
find "$dir" -type f | sed -n 's/.*\.\([a-zA-Z0-9]*\)$/\1/p' | sort | uniq
