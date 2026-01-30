from pathlib import Path
lines=Path('src/layouts/TemplateShell.tsx').read_text().splitlines()
for i,line in enumerate(lines,1):
    if 'TEMPLATE_TITLE_OVERRIDES' in line:
        print('TEMPLATE_TITLE_OVERRIDES starts at', i)
    if 'prettifyTemplateName' in line:
