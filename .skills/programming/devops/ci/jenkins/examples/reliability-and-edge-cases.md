# Jenkins Best Practices: 3. Pipeline Triggers

## Source guidance

This example applies the **3. Pipeline Triggers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Configure pipeline triggers:**
- **Use appropriate triggers for your pipeline.**
- **Use webhooks for immediate triggers.**
- **Use cron expressions for scheduled builds.**

## Example

```groovy
pipeline {
    triggers {
        pollSCM('H/5 * * *')
        upstream(upstreamProject: 'myproject', threshold: hudson.model.Result.SUCCESS)
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

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for jenkins-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
