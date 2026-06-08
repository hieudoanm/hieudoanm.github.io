import * as fs from 'node:fs';
import * as path from 'node:path';
import * as vscode from 'vscode';

const wikiLinkRe = /\[\[([^\]|]+)(?:\|[^\]|]+)?\]\]/;

export class WikiLinkCompletionProvider
  implements vscode.CompletionItemProvider
{
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.CompletionItem[] | undefined> {
    const line = document.lineAt(position).text;
    const textBefore = line.slice(0, position.character);

    const match = textBefore.match(/\[\[([^\]|]*)$/);
    if (!match) return undefined;

    const filter = match[1].toLowerCase();
    const dir = path.dirname(document.uri.fsPath);
    const items: vscode.CompletionItem[] = [];

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.name.endsWith('.md')) continue;
        const name = entry.name.replace(/\.md$/i, '');
        if (name.toLowerCase().includes(filter)) {
          const item = new vscode.CompletionItem(
            name,
            vscode.CompletionItemKind.File
          );
          item.insertText = `${name}]]`;
          item.filterText = name;
          items.push(item);
        }
      }
    } catch {}

    return items;
  }
}

export class WikiLinkDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Location | undefined {
    const range = document.getWordRangeAtPosition(
      position,
      /\[\[[^\]|]+(?:\|[^\]|]+)?\]\]/
    );
    if (!range) return undefined;

    const text = document.getText(range);
    const match = text.match(wikiLinkRe);
    if (!match) return undefined;

    const target = match[1];
    const dir = path.dirname(document.uri.fsPath);
    const targetPath = this.resolvePath(dir, target);
    if (!targetPath) return undefined;

    return new vscode.Location(
      vscode.Uri.file(targetPath),
      new vscode.Position(0, 0)
    );
  }

  private resolvePath(dir: string, name: string): string | undefined {
    const targetPath = path.join(dir, `${name}.md`);
    if (fs.existsSync(targetPath)) return targetPath;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const found = this.resolvePath(path.join(dir, entry.name), name);
          if (found) return found;
        }
      }
    } catch {}

    return undefined;
  }
}

export class WikiLinkHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | undefined {
    const range = document.getWordRangeAtPosition(
      position,
      /\[\[[^\]|]+(?:\|[^\]|]+)?\]\]/
    );
    if (!range) return undefined;

    const text = document.getText(range);
    const match = text.match(wikiLinkRe);
    if (!match) return undefined;

    const target = match[1];
    const dir = path.dirname(document.uri.fsPath);

    const targetPath = this.resolvePath(dir, target);
    if (!targetPath) {
      return new vscode.Hover(`Wiki-link: **${target}** (unresolved)`);
    }

    try {
      const content = fs.readFileSync(targetPath, 'utf-8');
      const lines = content
        .split('\n')
        .filter((l: string) => l.trim())
        .slice(0, 10);
      const preview = lines.join('\n').slice(0, 500);
      const md = new vscode.MarkdownString();
      md.appendMarkdown(`**${target}**\n\n${preview}`);
      return new vscode.Hover(md);
    } catch {
      return new vscode.Hover(`Wiki-link: **${target}**`);
    }
  }

  private resolvePath(dir: string, name: string): string | undefined {
    const targetPath = path.join(dir, `${name}.md`);
    if (fs.existsSync(targetPath)) return targetPath;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const found = this.resolvePath(path.join(dir, entry.name), name);
          if (found) return found;
        }
      }
    } catch {}

    return undefined;
  }
}

export class WikiLinkDocumentLinkProvider
  implements vscode.DocumentLinkProvider
{
  provideDocumentLinks(document: vscode.TextDocument): vscode.DocumentLink[] {
    const links: vscode.DocumentLink[] = [];
    const text = document.getText();
    const re = /\[\[([^\]|]+)(?:\|[^\]|]+)?\]\]/g;
    let match: RegExpExecArray | null;

    while ((match = re.exec(text)) !== null) {
      const start = document.positionAt(match.index);
      const end = document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(start, end);

      const target = match[1];
      const dir = path.dirname(document.uri.fsPath);

      const targetPath = this.resolvePath(dir, target);
      if (targetPath) {
        links.push(new vscode.DocumentLink(range, vscode.Uri.file(targetPath)));
      }
    }

    return links;
  }

  private resolvePath(dir: string, name: string): string | undefined {
    const targetPath = path.join(dir, `${name}.md`);
    if (fs.existsSync(targetPath)) return targetPath;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const found = this.resolvePath(path.join(dir, entry.name), name);
          if (found) return found;
        }
      }
    } catch {}

    return undefined;
  }
}
