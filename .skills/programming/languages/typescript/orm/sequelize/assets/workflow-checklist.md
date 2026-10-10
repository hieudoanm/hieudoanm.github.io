# Sequelize Best Practices: Workflow Checklist

A practical run sheet for applying [Sequelize Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Models & Definitions: **A Model class is the schema contract:**
- [ ] 1. Models & Definitions: **tableName explicit; underscored: true** maps snake_case columns to camelCase attributes — one convention
- [ ] 2. Associations: **Associations defined once, on the right side, with foreignKey explicit:**
- [ ] 2. Associations: **Both sides declared** so eager-loading and FKs are consistent; as: names the aliased relation when it's ambiguous
- [ ] 3. Querying & Projection: **findAll/findOne with a where contract; projections deliberate:**
- [ ] 3. Querying & Projection: **attributes: { exclude: ["password"] }** over shipping whole documents read-only
- [ ] 4. Validations & Hooks: **validate at the model boundary — notEmpty, isEmail, custom:
- [ ] 4. Validations & Hooks: **Hooks (beforeValidate, beforeSave, afterUpdate) small and narrowly scoped** — they run on every instance path, so keep them side-effect-light
- [ ] 5. Transactions: **sequelize.transaction() for multi-entity invariants; every op through the tx handle:**
- [ ] 5. Transactions: **Pass transaction into every query/instance-save inside the callback** — one missed transaction breaks atomicity silently

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
