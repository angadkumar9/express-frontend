pipeline {
    agent any

    triggers { githubPush() }   // GitHub webhook trigger

    environment {
        APP_DIR  = '/home/ubuntu/apps/express-frontend'
        APP_NAME = 'express-frontend'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install & Test (CI)') {
            steps {
                sh '''
                    node -v
                    npm install
                    npm test
                '''
            }
        }

        stage('Deploy (CD)') {
            steps {
                sh '''
                    sudo -u ubuntu -H bash -c "
                      cd ${APP_DIR} &&
                      git pull origin main &&
                      npm install &&
                      pm2 restart ${APP_NAME} &&
                      pm2 save
                    "
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh 'sleep 3 && curl -f http://localhost:3000/health'
            }
        }
    }

    post {
        success { echo 'Express deployment SUCCESS' }
        failure { echo 'Express deployment FAILED' }
    }
}
