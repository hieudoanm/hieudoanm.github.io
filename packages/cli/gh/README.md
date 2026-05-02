# 🚀 GitHub CLI

## 📚 Table of Contents

- [🚀 GitHub CLI](#-github-cli)
  - [📚 Table of Contents](#-table-of-contents)
  - [📦 Installation](#-installation)
  - [🚀 Usage](#-usage)
  - [Extensions](#extensions)
    - [`.gitignore`](#gitignore)
    - [Code of Conduct](#code-of-conduct)
    - [Languages](#languages)
    - [Licenses](#licenses)
    - [Open Graph](#open-graph)
  - [📄 License](#-license)

## 📦 Installation

```bash
git clone https://github.com/hieudoanm/gh.cli.git
cd gh.cli/packages/cli
make build
# Binaries: gh-coc, gh-ignore, gh-langs, gh-license, gh-og  (see ./bin)
sudo cp bin/gh-* /usr/local/bin/
```

## 🚀 Usage

```bash
# Build first: make build  (binaries in ./bin)
gh-coc --help
gh-ignore --help
gh-langs --help
gh-license --help
gh-og --help
```

## Extensions

### `.gitignore`

[`gh ignore`](https://github.com/hieudoanm/gh.cli/blob/master/packages/cli/bin/gh-ignore)

### Code of Conduct

[`gh coc`](https://github.com/hieudoanm/gh.cli/blob/master/packages/cli/bin/gh-coc)

### Languages

[`gh langs <owner>/<repo>`](https://github.com/hieudoanm/gh.cli/blob/master/packages/cli/bin/gh-langs)

### Licenses

[`gh license`](https://github.com/hieudoanm/gh.cli/blob/master/packages/cli/bin/gh-license)

### Open Graph

[`gh og <owner>/<repo>`](https://github.com/hieudoanm/gh.cli/blob/master/packages/cli/bin/gh-og)

## 📄 License

[GNU General Public License - Version 3 (GPL-3.0)](https://opensource.org/license/gpl-3.0)
