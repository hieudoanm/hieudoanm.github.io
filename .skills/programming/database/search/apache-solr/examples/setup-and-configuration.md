# Apache Solr: 4. Schema & Analysis

## Source guidance

This example applies the **4. Schema & Analysis** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Field types belong to an analysis chain (tokenizer + filters) — e.g., `standard`, `keyword`, `n-gram`, `edge-ngram`, `synonym`, `stop`, `stem`.
- Choose between **string** (exact, facetable, sortable) vs **text** (analyzed).
- Use **docValues=true** for faceting/grouping/sorting on large fields for performance.
- **CopyFields** for catch-all search over multiple source fields.

## Example

```xml
<field name="id"       type="string" indexed="true" stored="true"/>
<field name="sku"      type="string" indexed="true" stored="true"/>
<field name="category" type="string" indexed="true" stored="false" docValues="true"/>
<field name="author"   type="string" indexed="true" stored="true"    docValues="true"/>
<field name="title"    type="text_general" indexed="true" stored="true">
  <copyField source="title"/>
  <copyField source="summary"/>
</field>
<field name="published_at" type="pdate" indexed="true" stored="true" docValues="true"/>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-solr.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
