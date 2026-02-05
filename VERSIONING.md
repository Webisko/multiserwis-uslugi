# Versioning Information

## Tag v1 Created

An annotated git tag `v1` has been created locally to mark the current OnePage version as a backup.

**Tag Details:**
- **Tag Name:** v1
- **Type:** Annotated tag
- **Message:** v1 – OnePage (backup)
- **Target Commit:** 95eb7aef46f659024a22952d319160d95f26b715 (main branch)
- **Purpose:** Backup of the first stable OnePage version before Astro migration

## Repository Protection Rules

⚠️ **Note:** The repository has protection rules that prevent tag creation via automated push. The tag has been created locally but needs to be pushed manually with appropriate permissions.

## Manual Steps Required

To complete the tag creation, a repository maintainer with appropriate permissions needs to:

1. Pull this branch:
   ```bash
   git fetch origin copilot/create-version-tag-v1
   git checkout copilot/create-version-tag-v1
   ```

2. Verify the tag exists locally:
   ```bash
   git tag -l -n
   # Should show: v1    v1 – OnePage (backup)
   ```

3. Push the tag to the remote repository (requires admin/maintainer permissions):
   ```bash
   git push origin v1
   ```

Alternatively, if you have admin access to the repository settings:
- Go to Settings → Rules → Tag protection rules
- Temporarily disable the rule or add an exception
- Push the tag
- Re-enable the rule

## Future Tags

This tag serves as v1 (OnePage backup). The next major version (Astro) should be tagged as v2.
