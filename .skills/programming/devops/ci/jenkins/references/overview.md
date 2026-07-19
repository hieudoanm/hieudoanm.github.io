# Overview

Focused reference for **jenkins-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Jenkins Best Practices

Jenkins is an open-source automation server that provides CI/CD capabilities. Best practice is to use declarative pipelines, implement proper security, use plugins effectively, follow Jenkins conventions, and optimize for performance and maintainability.

---

## 1. Core Concepts

- **Pipelines** — defined as code (Jenkinsfile)
- **Agents** — executors that run build jobs
- **Stages** — logical divisions of a pipeline
- **Steps** — individual tasks within a stage
- **Plugins** — extend Jenkins functionality

---

## 2. Pipeline Structure

- **Declarative pipeline:**

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

- **Use declarative pipelines over scripted.**
- **Use stages for logical pipeline organization.**
- **Use parallel execution where appropriate.**

---

## 3. Pipeline Triggers

- **Configure pipeline triggers:**

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
