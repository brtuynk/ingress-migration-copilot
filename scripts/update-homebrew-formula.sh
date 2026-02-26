#!/usr/bin/env bash
set -euo pipefail

PKG_NAME="ingress-migration-copilot"
FORMULA_PATH="Formula/ingress-migration-copilot.rb"
VERSION="${1:-}"
LOCAL_TARBALL="${2:-}"

if [[ -z "$VERSION" ]]; then
  VERSION="$(node -p "require('./package.json').version")"
fi

TARBALL_URL="https://registry.npmjs.org/${PKG_NAME}/-/${PKG_NAME}-${VERSION}.tgz"
TMP_FILE="$(mktemp -t ${PKG_NAME}-${VERSION}.XXXXXX.tgz)"

cleanup() {
  rm -f "$TMP_FILE"
}
trap cleanup EXIT

if [[ -n "$LOCAL_TARBALL" ]]; then
  cp "$LOCAL_TARBALL" "$TMP_FILE"
elif [[ -f "./${PKG_NAME}-${VERSION}.tgz" ]]; then
  cp "./${PKG_NAME}-${VERSION}.tgz" "$TMP_FILE"
else
  curl -fsSL "$TARBALL_URL" -o "$TMP_FILE"
fi
SHA256="$(shasum -a 256 "$TMP_FILE" | awk '{print $1}')"

if [[ ! -f "$FORMULA_PATH" ]]; then
  echo "Formula not found: $FORMULA_PATH" >&2
  exit 1
fi

sed -i.bak -E "s|^  url \".*\"$|  url \"${TARBALL_URL}\"|" "$FORMULA_PATH"
sed -i.bak -E "s|^  sha256 \".*\"$|  sha256 \"${SHA256}\"|" "$FORMULA_PATH"
rm -f "${FORMULA_PATH}.bak"

echo "Updated ${FORMULA_PATH}"
echo "  version: ${VERSION}"
echo "  sha256:  ${SHA256}"
