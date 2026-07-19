# Jenkins Best Practices: Starter Template

A reusable starting point derived from the **4. Agent Configuration** section of [Jenkins Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
