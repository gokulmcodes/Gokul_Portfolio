pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token')

        // Replace these with the values from .vercel/project.json
        VERCEL_ORG_ID = 'team_NZASLqlY7sz5XRZ0RZSxtI20'
        VERCEL_PROJECT_ID = 'prj_0nGIfJpAIZ8KzIVbGlGCOPQfdXgm'
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
                    if not exist assets exit /b 1

                    echo Portfolio files validated successfully.
                '''
            }
        }

        stage('Prepare Vercel') {
            steps {
                bat '''
                    npx --yes vercel pull --yes --environment=production --token=%VERCEL_TOKEN%
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
            echo 'Portfolio pipeline failed. Check the Console Output.'
        }
    }
}