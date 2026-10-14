
pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token')
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
                    echo Portfolio validation successful.
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                bat '''
                    npx --yes vercel deploy --prod --yes --project=%VERCEL_PROJECT_ID% --token=%VERCEL_TOKEN%
                '''
            }
        }
    }

    post {
        success {
            echo 'Portfolio deployed successfully to Vercel!'
        }
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
