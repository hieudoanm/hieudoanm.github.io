# Sequelize Best Practices: Starter Template

A reusable starting point derived from the **3. Querying & Projection** section of [Sequelize Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
const lastAdmins = await User.findAll({
  where: { role: "admin" },
  attributes: ["id", "email"],
  order: [["createdAt", "DESC"]],
  limit: 20,
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
