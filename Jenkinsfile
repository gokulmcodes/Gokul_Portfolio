pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Portfolio') {
            steps {
                bat '''
                    if not exist index.html exit /b 1
                    if not exist page.css exit /b 1
                    if not exist mediaqueries.css exit /b 1
                    if not exist page.js exit /b 1
                    echo Portfolio files validated successfully.
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                bat '''
                    npx --yes vercel deploy --prod --yes --token=%VERCEL_TOKEN%
                '''
            }
        }
    }

    post {
        success {
            echo 'Portfolio deployed successfully!'
        }

        failure {
            echo 'Portfolio pipeline failed. Check the console output.'
        }
    }
}