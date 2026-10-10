# Apache Solr: Starter Template

A reusable starting point derived from the **4. Schema & Analysis** section of [Apache Solr](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
