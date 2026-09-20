---
name: jenkins-best-practices
description: Best practices for using Jenkins for CI/CD. Use when creating, structuring, or reviewing Jenkins pipelines — covers pipeline design, security, plugins, and optimization.
---

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

- **Use post-build actions:**

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'dist/**', fingerprint: true
                    junit 'test-results/**/*.xml'
                }
            }
        }
    }
}
```

- **Use post for cleanup actions.**
- **Use always for actions that should always run.**
- **Use archiveArtifacts for build artifacts.**

---

## 10. Docker

- **Use Docker in pipelines:**

```groovy
pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp:latest .'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push myapp:latest'
                }
            }
        }
    }
}
```

- **Use Docker for containerized builds.**
- **Use Docker Hub credentials for authentication.**
- **Use Docker Compose for multi-container apps.**

---

## 11. General Rules of Thumb

- **Pipeline design** — use declarative pipelines
- **Triggers** — use appropriate triggers
- **Security** — use credentials for secrets
- **Performance** — use parallel execution
- **Maintenance** — use pipeline documentation
- **Plugins** — use appropriate plugins

---

## Quick-Start Checklist

- [ ] Declarative pipeline configured
- [ ] Appropriate triggers configured
- [ ] Agents configured properly
- [ ] Parallel execution implemented
- [ ] Environment variables configured
- [ ] Credentials used for secrets
- [ ] Post-build actions configured
- [ ] Docker integration if needed
- [ ] Documentation complete
- [ ] Performance optimized
