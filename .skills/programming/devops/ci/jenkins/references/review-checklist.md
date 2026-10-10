# Review checklist

Focused reference for **jenkins-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
