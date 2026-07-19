# Review checklist

Focused reference for **pyramid-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Deploy behind a real WSGI server (gunicorn/uvicorn) with one app factory:**
- **`webtest` harness for view tests (fixture ORM per test), response contracts asserted:**
- **Structure: `pyramid_create`/scaffold style — models/views/config separated; CI lint + tests.**

---

## General Rules of Thumb

- **Small explicit core; includes for batteries.**
- **Views plain + renderer'd; validated inputs.**
- **Dispatch/traversal chosen once; documented.**
- **Auth via policy pair; CSRF on; secrets env-only.**
- **WSGI server + webtest; additive complexity justified.**

---

## Quick-Start Checklist

- [ ] Configurator + explicit routes; `scan()` finds views
- [ ] Views render to json/templates; inputs validated
- [ ] Dispatch vs traversal decided + consistent
- [ ] AuthTkt + ACL policies set; `__acl__`/permissions on views
- [ ] CSRF enabled; secrets via env; tweens minimal
- [ ] webtest view tests; WSGI deploy; CI lint/test
