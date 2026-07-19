# Apache Server Best Practices: 3. Performance tuning

## Source guidance

This example applies the **3. Performance tuning** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`KeepAlive On`** with `KeepAliveTimeout 5` — enable persistent connections; tune timeout for your workload.
- **`MaxRequestWorkers`** — set based on available memory; default 150 may be too high for low-RAM servers.
- **`EnableSendfile on`** — improve static file delivery on Linux (disable on some virtualized environments).

## Example

```apache
<IfModule mpm_prefork_module>
    MaxRequestWorkers 100
    StartServers 5
    MinSpareServers 5
    MaxSpareServers 10
</IfModule>

<IfModule mpm_event_module>
    KeepAliveTimeout 5
    MaxRequestWorkers 150
    ThreadsPerChild 25
</IfModule>

EnableSendfile on
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-server-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
