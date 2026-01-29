# Deployment Instructions for eighty5labs Repository

## Quick Copy Method

### All Files to Copy:
```
index.html
styles.css
script.js
snapshot.html
snapshot-form.css
snapshot-form.js
snapshot-confirmation.html
GHL_INTEGRATION_GUIDE.md
GHL_SNAPSHOT_FORM_MAPPING.md
README.md
```

### Method 1: Via GitHub Web Interface

1. Go to: https://github.com/briannafare/eighty5labs
2. Click "Add file" → "Upload files"
3. Download all files from the current repo: https://github.com/briannafare/ClaudeTerminal/tree/claude/redesign-saas-website-01KCVq62sKJyDeDxRPMDFMXK
4. Drag and drop all the files listed above
5. Commit with message: "Add Out of This World AI website with snapshot form"

### Method 2: Via Git Command Line (Local)

```bash
# Clone both repositories
git clone https://github.com/briannafare/ClaudeTerminal.git
git clone https://github.com/briannafare/eighty5labs.git

# Copy files from ClaudeTerminal to eighty5labs
cd ClaudeTerminal
git checkout claude/redesign-saas-website-01KCVq62sKJyDeDxRPMDFMXK

# Copy all website files
cp index.html ../eighty5labs/
cp styles.css ../eighty5labs/
cp script.js ../eighty5labs/
cp snapshot.html ../eighty5labs/
cp snapshot-form.css ../eighty5labs/
cp snapshot-form.js ../eighty5labs/
cp snapshot-confirmation.html ../eighty5labs/
cp GHL_INTEGRATION_GUIDE.md ../eighty5labs/
cp GHL_SNAPSHOT_FORM_MAPPING.md ../eighty5labs/
cp README.md ../eighty5labs/

# Commit and push to eighty5labs
cd ../eighty5labs
git add .
git commit -m "Add Out of This World AI website with snapshot form"
git push origin main
```

### Method 3: Direct Download Links

After running the commands above, the files will be at:
https://github.com/briannafare/ClaudeTerminal/tree/claude/redesign-saas-website-01KCVq62sKJyDeDxRPMDFMXK

You can download each file individually and upload to eighty5labs.

## GitHub Pages Setup for eighty5labs

Once files are in the eighty5labs repository:

1. Go to: https://github.com/briannafare/eighty5labs/settings/pages
2. Under "Source", select your main branch
3. Click "Save"
4. Your site will be live at: https://briannafare.github.io/eighty5labs/

## Custom Domain Setup (eighty5labs.com)

If you want to use eighty5labs.com:

1. In GitHub repository settings → Pages
2. Add custom domain: `eighty5labs.com` or `www.eighty5labs.com`
3. In your domain registrar (where you bought eighty5labs.com):
   - Add CNAME record: `www` → `briannafare.github.io`
   - Or add A records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

## File Manifest

### Core Website:
- `index.html` - Main homepage
- `styles.css` - All styling
- `script.js` - Interactive features

### Snapshot Form:
- `snapshot.html` - Multi-step form
- `snapshot-form.css` - Form-specific styles
- `snapshot-form.js` - Form logic & GHL integration
- `snapshot-confirmation.html` - Thank you page

### Documentation:
- `GHL_INTEGRATION_GUIDE.md` - General GHL setup
- `GHL_SNAPSHOT_FORM_MAPPING.md` - Form integration guide
- `README.md` - Project overview

## URLs After Deployment

- Homepage: `https://briannafare.github.io/eighty5labs/`
- Snapshot Form: `https://briannafare.github.io/eighty5labs/snapshot.html`
- Confirmation: `https://briannafare.github.io/eighty5labs/snapshot-confirmation.html`

Or with custom domain:
- Homepage: `https://eighty5labs.com/`
- Snapshot Form: `https://eighty5labs.com/snapshot`
- Confirmation: `https://eighty5labs.com/snapshot-confirmation.html`
