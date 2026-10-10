# Ubuntu Best Practices: Validation Plan

Use this plan to verify work guided by [Ubuntu Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **UFW is the default front-end firewall and it is disabled on fresh images.** ufw default deny incoming && ufw allow 22 && ufw allow OpenSSH && ufw enable is the minimum for any public host
- [ ] **Allow the SSH port before enabling UFW**, or you will lock yourself out. The ufw allow OpenSSH form survives a port change; the numeric one does not
- [ ] **UFW only filters host traffic** — it does not protect a container or a load balancer in front of it. Security groups still belong in your cloud provider
- [ ] **AppArmor is enforcing by default** and profiles ship with packages. Do not disable it globally to work around one misbehaving daemon; put that daemon in complain mode instead
- [ ] **Ubuntu Pro (pro attach)** buys ESM for packages on versions past standard support, plus CVE scanning and compliance tooling. For anything with a long life, it is cheap insurance
- [ ] **LXD or snap-based container tooling is a real choice, not a default.** Plain docker from Docker's own repository is usually simpler for a single-purpose server
- [ ] **Leaving UFW disabled on a public host**, which is the Ubuntu default on cloud images
- [ ] **Running netplan apply over ssh instead of netplan try,** losing the session on a typo
- [ ] **Writing /etc/resolv.conf directly** and losing the change to systemd-resolved on reboot
- [ ] **Adding a PPA and never removing its packages** when the repo is gone

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
