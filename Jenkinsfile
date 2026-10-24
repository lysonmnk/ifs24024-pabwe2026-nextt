pipeline {
    agent any

<<<<<<< HEAD
    environment {
        CI = 'true'
        SCANNER_HOME = tool 'SonarQube'
=======
    options {
        timestamps()
        skipDefaultCheckout(true)
        skipStagesAfterUnstable()
>>>>>>> parent of 886720f (Use exact course Jenkinsfile template)
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
<<<<<<< HEAD
<<<<<<< HEAD
                sh '''
                    set -e

                    echo "=== Installing Dependencies ==="

                    if [ -f package.json ]; then
                        bun install || true
                    fi

                    if [ -d backend ]; then
                        echo "=== Installing backend dependencies ==="
                        cd backend
                        bun install
                        cd ..
                    fi

                    if [ -d frontend ]; then
                        echo "=== Installing frontend dependencies ==="
                        cd frontend
                        bun install
                        cd ..
                    fi

                    echo "=== Dependencies Installed ==="
                '''
=======
                sh 'cd backend && npm ci'
                sh 'cd frontend && npm ci'
>>>>>>> parent of 14bb961 (Merge branch 'main' of https://github.com/lysonmnk/ifs24024-pabwe2026-proyek1)
=======
                sh 'cd backend && npm ci'
                sh 'cd frontend && npm ci'
>>>>>>> parent of 14bb961 (Merge branch 'main' of https://github.com/lysonmnk/ifs24024-pabwe2026-proyek1)
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
<<<<<<< HEAD
<<<<<<< HEAD
                sh '''
                    set -e

                    echo "=== Running Tests with Coverage ==="

                    if [ -d backend ]; then
                        echo "=== Backend tests ==="
                        cd backend
                        npm test -- --coverage || npx vitest run --coverage
                        cd ..
                    fi

                    if [ -d frontend ]; then
                        echo "=== Frontend tests ==="
                        cd frontend
                        if [ -f angular.json ]; then
                            echo "Framework: Angular"
                            npx ng test --coverage
                        else
<<<<<<< HEAD
                            echo "Framework: React / Vite"
                            npx vitest run --coverage
                        fi
                        cd ..
=======
                            echo "Framework: React, Next.js, Vue, Nuxt, Svelte, or SvelteKit"
                            npx vitest run --coverage
                        fi
                        cd ..
                    elif [ -f angular.json ]; then
                        echo "Framework: Angular"
                        npx ng test --coverage
                    else
                        echo "Framework: React, Next.js, Vue, Nuxt, Svelte, or SvelteKit"
                        npx vitest run --coverage
>>>>>>> parent of da3c77d (oke)
                    fi

                    echo "=== Tests Passed ==="
                '''
=======
                sh 'cd backend && npm test'
                sh 'cd frontend && npm test'
>>>>>>> parent of 14bb961 (Merge branch 'main' of https://github.com/lysonmnk/ifs24024-pabwe2026-proyek1)
=======
                sh 'cd backend && npm test'
                sh 'cd frontend && npm test'
>>>>>>> parent of 14bb961 (Merge branch 'main' of https://github.com/lysonmnk/ifs24024-pabwe2026-proyek1)
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
<<<<<<< HEAD
                sh 'trivy fs --severity HIGH,CRITICAL --exit-code 1 --ignore-unfixed .'
=======
                sh '''
                    set -e

                    mkdir -p .trivy-cache || true

                    echo "======================================"
                    echo "        TRIVY SECURITY SCAN"
                    echo "======================================"

                    echo "=== Trivy Version ==="
                    trivy --version

                    echo "=== Trivy Scan ==="

                    trivy fs \
                        --cache-dir .trivy-cache \
                        --scanners vuln \
                        --severity HIGH,CRITICAL \
                        --format sarif \
                        --output trivy-results.sarif \
                        --exit-code 1 \
                        .

                    echo "=== Trivy Result ==="
                    ls -lh trivy-results.sarif
                '''
            }

            post {
                always {
                    recordIssues(
                        enabledForFailure: true,
                        failOnError: false,
                        tools: [
                            sarif(
                                id: 'trivy',
                                name: 'Trivy Security',
                                pattern: 'trivy-results.sarif'
                            )
                        ]
                    )
                }
>>>>>>> parent of 886720f (Use exact course Jenkinsfile template)
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
<<<<<<< HEAD
<<<<<<< HEAD
                sh '''
                    set -e

                    echo "======================================"
                    echo "       CREATING APPLICATION PACKAGE"
                    echo "======================================"

                    apk add --no-cache zip unzip

                    rm -f latest-app.zip

                    zip -r latest-app.zip . \
                        -x "node_modules/*" \
                        -x "*/node_modules/*" \
                        -x ".git/*" \
                        -x ".env" \
                        -x ".env.*" \
                        -x "*/.env" \
                        -x "coverage/*" \
                        -x "*/coverage/*" \
                        -x ".next/*" \
                        -x "out/*" \
                        -x ".nuxt/*" \
                        -x ".output/*" \
                        -x ".svelte-kit/*" \
                        -x ".angular/*" \
                        -x "dist/*" \
                        -x "*/dist/*" \
                        -x "build/*" \
                        -x "backend/data/*" \
                        -x ".trivy-cache/*" \
                        -x "latest-app.zip" \
                        -x "trivy-results.sarif" \
                        -x ".docs/*"

                    echo "=== Application Package Created ==="

                    ls -lh latest-app.zip

                    echo "=== Package Content ==="

                    unzip -l latest-app.zip
                '''
=======
                sh 'cd frontend && npm run build'
                sh 'zip -r app.zip . -x "node_modules/*" "*/node_modules/*" ".env" "*/.env" "coverage/*" "*/coverage/*" "backend/data/*" ".git/*"'
>>>>>>> parent of 14bb961 (Merge branch 'main' of https://github.com/lysonmnk/ifs24024-pabwe2026-proyek1)
=======
                sh 'cd frontend && npm run build'
                sh 'zip -r app.zip . -x "node_modules/*" "*/node_modules/*" ".env" "*/.env" "coverage/*" "*/coverage/*" "backend/data/*" ".git/*"'
>>>>>>> parent of 14bb961 (Merge branch 'main' of https://github.com/lysonmnk/ifs24024-pabwe2026-proyek1)
            }
        }

        stage('Publish Artifact') {
            steps {
<<<<<<< HEAD
                archiveArtifacts artifacts: 'app.zip', fingerprint: true, allowEmptyArchive: true
=======

                archiveArtifacts(
                    artifacts: 'latest-app.zip',
                    fingerprint: true,
                    allowEmptyArchive: false
                )

                script {

                    def appName = env.JOB_NAME
                        .replaceAll('[^a-zA-Z0-9._-]', '-')
                        .replaceAll('-+', '-')
                        .replaceAll('^-|-$', '')

                    def buildId = env.BUILD_NUMBER

                    echo "Application Name: ${appName}"
                    echo "Build ID: ${buildId}"

                    sh """
                        set -e

                        echo "======================================"
                        echo "       PUBLISHING USER CONTENT"
                        echo "======================================"

                        docker exec cicd-jenkins \
                            mkdir -p \
                            "/var/jenkins_home/userContent/applications/${appName}/${buildId}"

                        docker cp \
                            latest-app.zip \
                            "cicd-jenkins:/var/jenkins_home/userContent/applications/${appName}/${buildId}/latest-app.zip"

                        echo "=== Published File ==="

                        docker exec cicd-jenkins \
                            ls -lh \
                            "/var/jenkins_home/userContent/applications/${appName}/${buildId}/latest-app.zip"
                    """

                    def jenkinsBaseUrl = env.BUILD_URL
                        .substring(0, env.BUILD_URL.indexOf('/job/'))
                        .replace('localhost', 'host.docker.internal')

                    env.ARTIFACT_URL =
                        "${jenkinsBaseUrl}/userContent/applications/${appName}/${buildId}/latest-app.zip"

                    echo "======================================"
                    echo "       APPLICATION PUBLISHED"
                    echo "======================================"

                    echo "Artifact URL:"
                    echo "${env.ARTIFACT_URL}"
                }
>>>>>>> parent of 886720f (Use exact course Jenkinsfile template)
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
<<<<<<< HEAD
                    if (env.URL_REDEPLOY && env.DEPLOY_TOKEN) {
                        sh '''
                            curl -s -X POST "${URL_REDEPLOY}" \
                                 -H "Authorization: Bearer ${DEPLOY_TOKEN}" \
                                 -H "Content-Type: application/json" \
                                 -d "{\\"website_id\\": \\"${WEBSITE_ID}\\"}"
                        '''
                    } else {
                        echo 'Deployment variables not set, skipping deployment step.'
=======

                    echo "=========================================="
                    echo "       START APPLICATION DEPLOYMENT"
                    echo "=========================================="

                    echo "Artifact URL:"
                    echo "${env.ARTIFACT_URL}"

                    echo ""
                    echo "=== Request Redeployment ==="

                    def redeployResponse = sh(
                        script: '''
                            set -e

                            curl -sS --fail-with-body \
                                -X POST "$URL_REDEPLOY" \
                                -H "Content-Type: application/json" \
                                -d "{
                                    \\"token_access\\": \\"$DEPLOY_TOKEN\\",
                                    \\"website_id\\": \\"$WEBSITE_ID\\",
                                    \\"source_url\\": \\"$ARTIFACT_URL\\",
                                    \\"source_type\\": \\"jenkins\\"
                                }"
                        ''',
                        returnStdout: true
                    ).trim()

                    echo "Redeploy Response:"
                    echo redeployResponse

                    echo ""
                    echo "=== Waiting For Deployment ==="

                    def maxAttempts = 120
                    def attempt = 0
                    def deploymentStatus = 'IN_PROGRESS'

                    while (deploymentStatus == 'IN_PROGRESS') {

                        attempt++

                        if (attempt > maxAttempts) {
                            error(
                                "Deployment timeout. " +
                                "Status masih IN_PROGRESS setelah " +
                                "${maxAttempts} attempts."
                            )
                        }

                        sleep time: 5, unit: 'SECONDS'

                        echo ""
                        echo "=== Checking Deployment Progress (${attempt}/${maxAttempts}) ==="

                        def progressResponse = sh(
                            script: '''
                                set -e

                                curl -sS --fail-with-body \
                                    -X POST "$URL_PROGRESS" \
                                    -H "Content-Type: application/json" \
                                    -d "{
                                        \\"token_access\\": \\"$DEPLOY_TOKEN\\",
                                        \\"website_id\\": \\"$WEBSITE_ID\\"
                                    }"
                            ''',
                            returnStdout: true
                        ).trim()

                        echo "Progress Response:"
                        echo progressResponse

                        def json = readJSON text: progressResponse

                        deploymentStatus = json?.data?.status
                            ?.toString()
                            ?.toUpperCase()

                        if (!deploymentStatus) {
                            error(
                                "Response progress tidak memiliki data.status"
                            )
                        }

                        echo "Deployment Status: ${deploymentStatus}"

                        if (deploymentStatus == 'SUCCESS') {

                            echo ""
                            echo "=========================================="
                            echo "       DEPLOYMENT SUCCESS"
                            echo "=========================================="

                            break
                        }

                        if (deploymentStatus == 'FAIL') {

                            echo ""
                            echo "=========================================="
                            echo "       DEPLOYMENT FAILED"
                            echo "=========================================="

                            def deploymentLog =
                                json?.data?.log
                                    ?: 'Deployment failed tanpa log.'

                            echo ""
                            echo "========== DEPLOYMENT LOG =========="
                            echo deploymentLog
                            echo "===================================="

                            error(
                                "Deployment gagal untuk website " +
                                "${WEBSITE_ID}"
                            )
                        }

                        echo "Deployment masih berjalan..."
>>>>>>> parent of 886720f (Use exact course Jenkinsfile template)
                    }
                }
            }
        }
    }

    post {
        always {
<<<<<<< HEAD
            cleanWs()
=======
            archiveArtifacts(
                artifacts: 'trivy-results.sarif',
                allowEmptyArchive: true
            )
        }

        success {
            echo "=========================================="
            echo "       PIPELINE SUCCESS"
            echo "=========================================="
            echo "Result: ${currentBuild.currentResult}"
            echo "Artifact: ${env.ARTIFACT_URL ?: '(not published)'}"
            echo "Website berhasil dideploy."
        }

        failure {
            echo "=========================================="
            echo "       PIPELINE FAILED"
            echo "=========================================="
            echo "Result: ${currentBuild.currentResult}"
            echo "Periksa log stage yang merah / Console Output untuk penyebab gagal."
        }

        unstable {
            echo "=========================================="
            echo "       PIPELINE UNSTABLE"
            echo "=========================================="
            echo "Result: ${currentBuild.currentResult}"
>>>>>>> parent of 886720f (Use exact course Jenkinsfile template)
        }
    }
}
