pipeline {
    agent any

    environment {
        PROJECT_NAME = 'simpul-app'
        PROJECT_DIR = '/home/apps'
        BUILD_TAG = "build-${env.BUILD_NUMBER}"
        DOCKER_COMPOSE = "docker compose -f ${PROJECT_DIR}/docker-compose.yml"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Sync Code to Host') {
            steps {
                sh """
                rm -rf ${PROJECT_DIR}/${PROJECT_NAME}/*
                cp -r . ${PROJECT_DIR}/${PROJECT_NAME}/
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                TAG=${BUILD_TAG} ${DOCKER_COMPOSE} build --no-cache ${PROJECT_NAME}
                """
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                TAG=${BUILD_TAG} ${DOCKER_COMPOSE} up -d ${PROJECT_NAME}
                """
            }
        }

        stage('Prune Old Images') {
            steps {
                echo '🧹 Cleaning up old Docker images...'
                sh 'docker image prune -a -f || true'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh "docker ps | grep ${PROJECT_NAME}"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful for ${env.PROJECT_NAME} (${env.BUILD_TAG})"
        }
        failure {
            echo "❌ Deployment failed for ${env.PROJECT_NAME}"
        }
    }
}
