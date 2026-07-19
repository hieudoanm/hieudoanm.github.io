# Ubuntu Best Practices: Basic Usage

Best practices for administering Ubuntu servers and desktops — apt components, PPAs, netplan, snaps, unattended-upgrades, cloud images, and LTS upgrades. Use when provisioning or troubleshooting Ubuntu.

## Scenario

Use this example as a starting point when applying **ubuntu-linux** to a small, representative task. It demonstrates the pattern shown in the skill’s **4. Networking: netplan** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
