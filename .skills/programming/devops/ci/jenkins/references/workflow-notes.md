# Workflow notes

Focused reference for **jenkins-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Use appropriate triggers for your pipeline.**
- **Use webhooks for immediate triggers.**
- **Use cron expressions for scheduled builds.**

---

## 4. Agent Configuration

- **Configure agents:**

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

- **Use appropriate agents for your build requirements.**
- **Use labels for agent selection.**
- **Use custom workspaces when needed.**

---

## 5. Parallel Execution

- **Use parallel execution:**

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
            }
        }
    }
}
```

- **Use parallel execution for independent tasks.**
- **Use matrix for multiple configurations.**
- **Use fail-fast to stop on first failure.**

---

## 6. Environment Variables

- **Use environment variables:**
