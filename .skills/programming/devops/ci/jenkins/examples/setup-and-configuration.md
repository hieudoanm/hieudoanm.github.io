# Jenkins Best Practices: 4. Agent Configuration

## Source guidance

This example applies the **4. Agent Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Configure agents:**
- **Use appropriate agents for your build requirements.**
- **Use labels for agent selection.**
- **Use custom workspaces when needed.**

## Example

```groovy
pipeline {
    agent {
        label 'my-agent'
        customWorkspace '/opt/jenkins/workspace'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
            }
        }
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for jenkins-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
