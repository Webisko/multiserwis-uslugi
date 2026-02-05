#!/bin/bash
# Script to push the v1 tag to the remote repository
# This should be run by a repository maintainer with appropriate permissions

set -e

echo "Checking if tag v1 exists locally..."
if git tag -l | grep -q "^v1$"; then
    echo "✓ Tag v1 found locally"
    git show v1 --no-patch
    echo ""
    echo "Attempting to push tag v1 to origin..."
    git push origin v1
    echo "✓ Tag v1 pushed successfully!"
else
    echo "✗ Tag v1 not found locally"
    echo "Creating tag v1 on main branch..."
    git fetch origin main
    git tag -a v1 origin/main -m "v1 – OnePage (backup)"
    echo "✓ Tag v1 created"
    echo "Pushing tag v1 to origin..."
    git push origin v1
    echo "✓ Tag v1 pushed successfully!"
fi

echo ""
echo "Verification:"
git ls-remote --tags origin | grep v1
