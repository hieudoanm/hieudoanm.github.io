# Cocos Creator Best Practices: Basic Usage

Best practices for building games with Cocos Creator — the framework conventions for 3D/2D games exported to web, iOS, and Android. Use when writing, structuring, or reviewing Cocos Creator projects — covers project structure, components/scenes, the component lifecycle, state management, asset loading, performance, and the build pipeline.

## Scenario

Use this example as a starting point when applying **cocos-creator-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Components & Lifecycle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
@ccclass("Health")
export class Health extends Component {
  @property({ type: Number })
  max = 100;
  get current() { return this._current; }
  private _current = 100;

  takeDamage(n: number) {
    this._current = Math.max(0, this._current - n);
    if (this._current === 0) this.node.emit("died");
  }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
