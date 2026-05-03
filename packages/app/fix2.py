import os
import re

target_dir = "/Users/hieudoan/git/github.com/hieudoanm/github/hieudoanm/packages/app/src/components/modals"

for root, _, files in os.walk(target_dir):
    for filename in files:
        if not filename.endswith('.tsx'):
            continue
            
        path = os.path.join(root, filename)
        with open(path, 'r') as f:
            content = f.read()
            
        original = content
        
        # fix double brackets
        content = content.replace("}}>>", "}}>")
        
        if content != original:
            with open(path, 'w') as f:
                f.write(content)
            print(f"Fixed >> in {filename}")
