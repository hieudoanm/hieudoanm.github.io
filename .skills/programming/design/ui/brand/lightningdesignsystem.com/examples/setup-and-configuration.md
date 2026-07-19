# Lightning Design System (Salesforce): 5. Lightning Base Components over Blueprints

## Source guidance

This example applies the **5. Lightning Base Components over Blueprints** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Blueprints are **framework-agnostic**, using standard HTML. When building an LWC,
replace standard elements with Lightning base components wherever possible.
- Blueprint markup you copy becomes _your_ code. When SLDS updates the blueprint,
yours does not update with it. Plan for that.
- Useful base components for layout and structure include `lightning-layout` and
`lightning-layout-item` for responsive grids, and `lightning-tabset` for tabs.
- Blueprints describe their device support — adaptive (separate markup for

## Example

```html
<lightning-card title="Details">
  <lightning-layout multiple-rows>
    <lightning-layout-item
      size="12"
      small-device-size="9"
      padding="around-small">
      <lightning-tabset>
        <lightning-tab label="Item one">…</lightning-tab>
      </lightning-tabset>
    </lightning-layout-item>
  </lightning-layout>
</lightning-card>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for lightning-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
