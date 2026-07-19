# dbml (Go) — Rollback Strategy

dbml is a single binary with no persistent state, so rollback is binary replacement. There is no data migration, schema version, or down-migration to reason about.

## Rolling back the binary

```bash
# Option A: rebuild from a known-good commit
git checkout <previous-commit>
make build
./bin/dbml --version

# Option B: restore a previously downloaded release artifact
# (copy the saved binary over bin/dbml, then verify)
./bin/dbml --version
```

Note on the release channel: CI force-updates the tag `app-headless-dbml-latest` on every push, so the "latest" release always points at the newest commit and does not retain older builds. Rollback therefore means rebuilding from a pinned commit or keeping your own copy of previous artifacts; download-and-replace from "latest" is not a rollback path.

## Rolling back a container

```bash
# rebuild the image at the previous commit
git checkout <previous-commit>
docker build -t dbml .
```

If you maintain your own registry tags, retag and redeploy the previous image; the repository publishes no versioned image tags of its own.

## Verifying a rollback

```bash
./bin/dbml sql schema.dbml -o schema.sql       # conversion works
curl http://localhost:8080/api/v1/health       # API answers if serving
```

## Rollback checklist

- [ ] Record the commit used for each deployment.
- [ ] Keep copies of deployed binaries or images; "latest" moves forward only.
- [ ] After rollback, run one conversion and (if serving) one health check.
- [ ] Generated outputs need no rollback: they are reproducible from source and regenerate identically on the old version.

## Cross-references

- Operations: [`12-operations.md`](../12-operations.md)
- Deployment: [`11-deployment.md`](../11-deployment.md)
- CI/CD pipeline: [`ci-cd-pipeline.md`](../11-deployment/ci-cd-pipeline.md)
