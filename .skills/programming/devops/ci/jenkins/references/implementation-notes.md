# Implementation notes

Focused reference for **jenkins-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```groovy
pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        API_KEY = credentials('api-key')
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

- **Use Jenkins credentials for sensitive data.**
- **Use environment variables for configuration.**
- **Never hardcode secrets in pipelines.**

---

## 7. Tools

- **Use appropriate tools:**

```groovy
pipeline {
    agent any
    tools {
        nodejs 'Node.js 18.x'
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

- **Use tool declarations for version control.**
- **Use sh for shell commands.**
- **Use bat for Windows commands.**

---

## 8. Build Parameters

- **Use build parameters:**

```groovy
pipeline {
    agent any
    parameters {
        string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Deployment environment')
    }
    stages {
        stage('Deploy') {
            steps {
                sh "npm run deploy:${params.DEPLOY_ENV}"
            }
        }
    }
}
```

- **Use parameters for flexible pipeline execution.**
- **Use boolean parameters for flags.**
- **Use choice parameters for options.**

---

## 9. Post-Build Actions
