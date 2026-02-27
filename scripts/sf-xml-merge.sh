#!/usr/bin/env bash
#
# Salesforce XML Merge Driver
#
# Custom git merge driver for Salesforce metadata XML files.
# Sorts XML child elements alphabetically before merging so that
# element-ordering conflicts (the most common SF metadata conflict) are
# eliminated. Falls back to git's built-in merge for real content conflicts.
#
# Usage (configured via .gitconfig / .git/config):
#   [merge "sf-xml"]
#       name = Salesforce XML merge driver
#       driver = scripts/sf-xml-merge.sh %O %A %B
#       recursive = binary
#
# Arguments:
#   $1 = %O  ancestor (base)
#   $2 = %A  current  (ours)
#   $3 = %B  other    (theirs)
#
# Exit codes:
#   0  = merge succeeded (clean)
#   >0 = merge has conflicts (markers left in %A)

set -euo pipefail

BASE="$1"   # %O - ancestor
OURS="$2"   # %A - current (result is written back here)
THEIRS="$3" # %B - other

# ---------------------------------------------------------------------------
# Helper: sort direct children of the root XML element by tag name + fullName
# (or name attribute), keeping the XML declaration and root wrapper intact.
# This normalises the ordering so that git merge can diff on content only.
# ---------------------------------------------------------------------------
sort_xml() {
    local file="$1"

    # If xmllint is not available, skip sorting
    if ! command -v xmllint &>/dev/null; then
        return 0
    fi

    # Validate XML first; skip sorting if invalid
    if ! xmllint --noout "$file" 2>/dev/null; then
        return 0
    fi

    # Use Python for reliable XML sorting (available on macOS and most Linux)
    python3 - "$file" <<'PYEOF'
import sys
import xml.etree.ElementTree as ET

path = sys.argv[1]

try:
    tree = ET.parse(path)
    root = tree.getroot()

    # Preserve the namespace
    ns = ''
    if root.tag.startswith('{'):
        ns = root.tag.split('}')[0] + '}'

    # Sort children by: tag name, then by <fullName> text (if present)
    def sort_key(elem):
        tag = elem.tag.replace(ns, '')
        # Look for fullName or name sub-element for secondary sort
        name_elem = elem.find(f'{ns}fullName')
        if name_elem is None:
            name_elem = elem.find(f'{ns}name')
        name = name_elem.text if name_elem is not None and name_elem.text else ''
        return (tag, name)

    children = list(root)
    for child in children:
        root.remove(child)

    children.sort(key=sort_key)
    for child in children:
        root.append(child)

    # Register the namespace to avoid ns0: prefixes
    if ns:
        ET.register_namespace('', ns.strip('{}'))

    tree.write(path, xml_declaration=True, encoding='UTF-8')
except Exception:
    # If anything fails, leave the file untouched
    pass
PYEOF
}

# Sort all three versions to normalise element order
sort_xml "$BASE"
sort_xml "$OURS"
sort_xml "$THEIRS"

# Now let git's built-in merge handle the (order-normalised) files.
# git merge-file writes the result into $OURS (%A) and returns 0 on
# clean merge or >0 if there are conflicts (with markers in the file).
git merge-file --diff3 "$OURS" "$BASE" "$THEIRS"
exit $?
