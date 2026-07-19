# Jenkins Best Practices: Basic Usage

Best practices for using Jenkins for CI/CD. Use when creating, structuring, or reviewing Jenkins pipelines — covers pipeline design, security, plugins, and optimization.

## Scenario

Use this example as a starting point when applying **jenkins-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Pipeline Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run deploy'
            }
        }
    }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
