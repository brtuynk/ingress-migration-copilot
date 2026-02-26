#!/usr/bin/env bash
set -euo pipefail

FORMULA_PATH="Formula/ingress-migration-copilot.rb"
VERSION="${1:-}"

if [[ -z "$VERSION" ]]; then
  VERSION="$(node -p "require('./package.json').version")"
fi

REPO_SLUG="${GITHUB_REPOSITORY:-}"
if [[ -z "$REPO_SLUG" ]]; then
  REPO_URL="$(node -p "(require('./package.json').repository || {}).url || ''")"
  REPO_SLUG="$(echo "$REPO_URL" | sed -E 's#^git\+##; s#\.git$##; s#^https://github.com/##; s#^git@github.com:##')"
fi

if [[ -z "$REPO_SLUG" ]]; then
  echo "Could not infer GitHub repository from package.json repository.url" >&2
  exit 1
fi

TARBALL_URL="https://github.com/${REPO_SLUG}/archive/refs/tags/v${VERSION}.tar.gz"
TMP_FILE="$(mktemp -t ingress-migration-copilot-${VERSION}.XXXXXX.tar.gz)"

cleanup() {
  rm -f "$TMP_FILE"
}
trap cleanup EXIT

FETCH_OK=0
for ATTEMPT in {1..12}; do
  if curl -fsSL "$TARBALL_URL" -o "$TMP_FILE"; then
    FETCH_OK=1
    break
  fi
  echo "Waiting for release tarball (attempt ${ATTEMPT}/12): ${TARBALL_URL}"
  sleep 5
done
if [[ "$FETCH_OK" -ne 1 ]]; then
  echo "Failed to fetch release tarball: ${TARBALL_URL}" >&2
  exit 1
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
echo "  url:     ${TARBALL_URL}"
echo "  sha256:  ${SHA256}"
