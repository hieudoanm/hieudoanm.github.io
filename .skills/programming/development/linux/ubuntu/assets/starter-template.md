# Ubuntu Best Practices: Starter Template

A reusable starting point derived from the **4. Networking: netplan** section of [Ubuntu Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```yaml
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: true
      dhcp4-overrides:
        use-dns: false
      nameservers:
        addresses: [1.1.1.1, 9.9.9.9]
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
