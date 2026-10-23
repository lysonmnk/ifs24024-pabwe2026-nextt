pipeline {
    agent any

    environment {
        CI = 'true'
        SCANNER_HOME = tool 'SonarQube'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'cd backend && npm ci'
                sh 'cd frontend && npm ci'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'cd backend && npm test'
                sh 'cd frontend && npm test'
            }
        }

        stage('Trivy Security Scan') {
            agent {
                docker {
                    image 'aquasec/trivy:latest'
                    args '-u 0:0 -v /var/run/docker.sock:/var/run/docker.sock'
                    reuseNode true
                }
            }
            steps {
                sh 'trivy fs --severity HIGH,CRITICAL --exit-code 1 --ignore-unfixed .'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build and Package') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'cd frontend && npm run build'
                sh 'zip -r app.zip . -x "node_modules/*" "*/node_modules/*" ".env" "*/.env" "coverage/*" "*/coverage/*" "backend/data/*" ".git/*"'
            }
        }

        stage('Publish Artifact') {
            steps {
                archiveArtifacts artifacts: 'app.zip', fingerprint: true, allowEmptyArchive: true
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'curlimages/curl:latest'
                    reuseNode true
                }
            }
            steps {
                script {
                    if (env.URL_REDEPLOY && env.DEPLOY_TOKEN) {
                        sh '''
                            curl -s -X POST "${URL_REDEPLOY}" \
                                 -H "Authorization: Bearer ${DEPLOY_TOKEN}" \
                                 -H "Content-Type: application/json" \
                                 -d "{\\"website_id\\": \\"${WEBSITE_ID}\\"}"
                        '''
                    } else {
                        echo 'Deployment variables not set, skipping deployment step.'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
