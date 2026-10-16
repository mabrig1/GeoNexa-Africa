#!/usr/bin/env bash
set -euo pipefail
# Licensed third-party geoscience dataset; run locally/CI only after reviewing terms.
REPO="https://github.com/fraxen/tectonicplates.git"
DEST="data/external/tectonicplates"
mkdir -p data/external
if [ -e "$DEST" ]; then echo "Destination exists: $DEST"; exit 1; fi
git clone --depth 1 --filter=blob:none --sparse "$REPO" "$DEST"
git -C "$DEST" sparse-checkout set GeoJSON LICENSE.md README.md
echo "Dataset cloned to $DEST. Preserve upstream attribution and licence."
