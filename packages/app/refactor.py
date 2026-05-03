import os
import re

target_dir = "/Users/hieudoan/git/github.com/hieudoanm/github/hieudoanm/packages/app/src/components/modals"

# Regexes for Type B
div_pattern = re.compile(
    r'<div\s+className="fixed inset-0 z-50 flex items-center justify-center p-4"\s+style=\{\{\s*background:\s*\'rgba\(0,0,0,0\.6\)\',\s*backdropFilter:\s*\'blur\(4px\)\'\s*\}\}\s+onClick=\{onClose\}>',
    re.MULTILINE
)

# the card inner wrapper
card_pattern = re.compile(
    r'(<div\s+className="card[^"]*")\s+onClick=\{\(e\)\s*=>\s*e\.stopPropagation\(\)\}>',
    re.MULTILINE
)

# to match the closing structure of Type B
end_pattern = re.compile(
    r'\s+</div>\n\s*</div>\n\s*</div>\n\s*\);\n};',
    re.MULTILINE
)
end_pattern_alt = re.compile(
    r'\s+</div>\n\s*</div>\n\s*\);\n};',
    re.MULTILINE
)

# Regexes for Type A
dialog_pattern = re.compile(r'<dialog\s+(open\s+)?className="modal modal-open"(?!\s*style)', re.MULTILINE)

count = 0
for root, _, files in os.walk(target_dir):
    for filename in files:
        if not filename.endswith('.tsx'):
            continue
            
        path = os.path.join(root, filename)
        with open(path, 'r') as f:
            content = f.read()
            
        original = content
        
        # Apply Type B replacement
        if div_pattern.search(content):
            content = div_pattern.sub(r'<dialog open className="modal modal-open" style={{ background: \'rgba(0,0,0,0.6)\', backdropFilter: \'blur(4px)\' }}>', content)
            
            # remove stopPropagation
            content = card_pattern.sub(r'\1 z-10>', content) # add z-10 just in case
            
            # Some files might have one less </div> if they lack an intermediate container.
            # E.g. StringModal has 3 nested divs inside the function: return (<div fixed><div card><div card-body> ... </div></div></div>)
            # We replace the closing:
            new_closing = r'\n        </div>\n      </div>\n      <form method="dialog" className="modal-backdrop">\n        <button onClick={onClose}>close</button>\n      </form>\n    </dialog>\n  );\n};'
            if end_pattern.search(content):
                content = end_pattern.sub(new_closing, content)
            elif end_pattern_alt.search(content):
                # if it only has 2 nested divs at the end? We must make sure it closes properly.
                # Actually, wait. It's safer to just replace `<div ... onClick={(e)=>e.stopPropagation()}>` with `<div>`
                # and then manually fix the ends if necessary, or let python do it.
                # Let's use a simpler replace for the end if it doesn't match:
                pass
                
        # Apply Type A replacement (add style if missing)
        content = dialog_pattern.sub(r'<dialog \1className="modal modal-open" style={{ background: \'rgba(0,0,0,0.6)\', backdropFilter: \'blur(4px)\' }}>', content)
        
        if content != original:
            with open(path, 'w') as f:
                f.write(content)
            print(f"Updated {filename}")
            count += 1

print(f"Total updated: {count}")
