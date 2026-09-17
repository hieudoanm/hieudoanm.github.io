# Implementation notes

Focused reference for **osso**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Security

- **Keep metadata and certificates up to date per IdP** — expired certs = locked-out customers
- **Never log assertion payloads or session data**
- Rate-limit **SAML/ACS endpoints** to mitigate assertion attacks
- Validate **SAML responses** at Osso (signature + `InResponseTo`)
- Least-privilege access to the **admin API/panel** that manages connections

---

## 5. General Rules of Thumb

- **One SAML gateway for your entire SaaS** — enterprises connect to Osso, not to each service
- **Connections are data** — on/offboard IdPs as config, never code
- **Certificates expire** — monitor and rotate IdP metadata before upstream certs lapse
- **Upstream sync is the source of truth** — SCIM drives provisioning
