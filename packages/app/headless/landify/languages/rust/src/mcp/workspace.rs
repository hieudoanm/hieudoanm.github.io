//! A sandboxed view of the filesystem for the MCP tools.
//!
//! A model chooses every path that reaches this server, so all access is
//! confined to one root directory. Without that an LLM client could read or
//! overwrite any file the process can reach.

use anyhow::{anyhow, Result};
use std::path::{Path, PathBuf};

/// The directory paths resolve against when the CLI is started without `--root`.
pub const DEFAULT_ROOT: &str = ".";

/// The file the tools read when a caller names no source.
pub const DEFAULT_CONFIG_PATH: &str = "landify.yaml";

/// The file access the MCP tools are allowed to perform.
#[derive(Debug, Clone)]
pub struct Workspace {
    root: PathBuf,
}

impl Workspace {
    /// Returns a [`Workspace`] rooted at `dir`.
    ///
    /// The directory is resolved to a canonical absolute path once, so a later
    /// `chdir` cannot widen the sandbox, and must already exist.
    pub fn new(dir: &str) -> Result<Workspace> {
        let target = if dir.trim().is_empty() {
            DEFAULT_ROOT
        } else {
            dir
        };
        let absolute = std::fs::canonicalize(target).map_err(|e| anyhow!("root {target}: {e}"))?;
        if !absolute.is_dir() {
            return Err(anyhow!("root {} is not a directory", absolute.display()));
        }
        Ok(Workspace { root: absolute })
    }

    /// The absolute directory every path is resolved inside.
    pub fn root(&self) -> &Path {
        &self.root
    }

    /// Turns a caller-supplied relative path into an absolute one that is
    /// guaranteed to stay inside the root.
    ///
    /// Absolute paths and any path that escapes via `..` are rejected rather
    /// than silently rewritten: a caller that means to leave the sandbox has a
    /// bug, and quietly serving a different file would hide it. Symlinks are
    /// resolved too — a link inside the root pointing outside it is an escape,
    /// not a shortcut — so a lexical join is never enough to prove containment.
    pub fn resolve(&self, path: &str) -> Result<PathBuf> {
        let clean = path.trim();
        if clean.is_empty() {
            return Ok(self.root.clone());
        }
        let candidate = Path::new(clean);
        if candidate.is_absolute() {
            return Err(anyhow!(
                "path \"{path}\" must be relative to the server root {}",
                self.root.display()
            ));
        }
        let target = self.root.join(candidate);
        if !self.contains(&target) {
            return Err(anyhow!(
                "path \"{path}\" escapes the server root {}",
                self.root.display()
            ));
        }
        Ok(target)
    }

    /// Returns the contents of a file inside the root.
    pub fn read(&self, path: &str) -> Result<Vec<u8>> {
        let target = self.resolve(path)?;
        std::fs::read(&target).map_err(|e| match e.kind() {
            std::io::ErrorKind::NotFound => {
                anyhow!("no such file in the server root: {path}")
            }
            _ => anyhow!("read {path}: {e}"),
        })
    }

    /// Creates or replaces a file inside the root, creating parent directories
    /// as needed.
    pub fn write(&self, path: &str, data: &[u8]) -> Result<()> {
        let target = self.resolve(path)?;
        if let Some(parent) = target.parent() {
            if parent != self.root {
                std::fs::create_dir_all(parent)
                    .map_err(|e| anyhow!("create {}: {e}", parent.display()))?;
            }
        }
        std::fs::write(&target, data).map_err(|e| anyhow!("write {path}: {e}"))
    }

    /// Reports whether a path inside the root names an existing file.
    pub fn exists(&self, path: &str) -> Result<bool> {
        let target = self.resolve(path)?;
        match std::fs::metadata(&target) {
            Ok(meta) => Ok(meta.is_file()),
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(false),
            Err(e) => Err(anyhow!("stat {path}: {e}")),
        }
    }

    /// Reports whether `target` is the root itself or lives under it, both
    /// lexically and after symlinks are resolved. The second check is what
    /// catches a link inside the root that points out of it.
    fn contains(&self, target: &Path) -> bool {
        if !self.within(target) {
            return false;
        }
        match resolve_existing(target) {
            Ok(resolved) => self.within(&resolved),
            Err(_) => false,
        }
    }

    /// Reports whether `target` is the root or sits under it.
    fn within(&self, target: &Path) -> bool {
        target == self.root || target.starts_with(&self.root)
    }
}

/// Resolves symlinks in the longest existing prefix of `path` and re-appends the
/// segments that do not exist yet, so a file the server is about to create is
/// checked against the real location of its parent directory.
///
/// A component that exists but cannot be resolved is a broken symlink, not a
/// path awaiting creation. Confusing the two would let a link inside the root
/// point at a location outside it: the target does not exist, so nothing is
/// written there yet, and the walk would happily approve the link's own name.
/// The write would then follow the link and create the file outside the root,
/// so a broken symlink is refused outright.
fn resolve_existing(path: &Path) -> Result<PathBuf> {
    let mut tail: Vec<std::ffi::OsString> = Vec::new();
    let mut current = path.to_path_buf();
    loop {
        match std::fs::canonicalize(&current) {
            Ok(resolved) => {
                let mut out = resolved;
                for name in tail.iter().rev() {
                    out.push(name);
                }
                return Ok(out);
            }
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => {}
            Err(e) => return Err(anyhow!("inspect {}: {e}", current.display())),
        }
        if is_symlink(&current)? {
            return Err(anyhow!(
                "path {} is a symlink that does not resolve, \
                 so its target cannot be confined to the root",
                current.display()
            ));
        }
        let name = match current.file_name() {
            Some(name) => name.to_os_string(),
            None => return Ok(path.to_path_buf()),
        };
        tail.push(name);
        match current.parent() {
            Some(parent) if parent != current => current = parent.to_path_buf(),
            _ => return Ok(path.to_path_buf()),
        }
    }
}

/// Reports whether `path` is itself a symbolic link. Reading the link's own
/// attributes without following it means a broken link is still seen as a link.
fn is_symlink(path: &Path) -> Result<bool> {
    match std::fs::symlink_metadata(path) {
        Ok(meta) => Ok(meta.file_type().is_symlink()),
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(false),
        Err(e) => Err(anyhow!("inspect {}: {e}", path.display())),
    }
}
