# nvm: Starter Template

A reusable starting point derived from the **4. Daily Commands** section of [nvm](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
nvm ls                # installed versions, current one marked
nvm ls-remote --lts   # available LTS lines, without installing
nvm current           # active version
nvm which 24          # absolute path to that binary
nvm run 22 jest       # run a command under 22 without switching
nvm exec 22 npm -v    # execute anything with 22's PATH
nvm alias default 24  # what a fresh shell starts on
nvm uninstall 20      # remove a version
nvm cache clear       # drop downloaded tarballs
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
