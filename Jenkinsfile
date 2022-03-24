def appname = 'community-frontend-code-deploy'
def deploy_group = 'community-frontend-dev'
// def deploy_group_prod = 'freelance-backend-prod'
def s3_bucket = 'community-product-media'
def s3_filename = 'community-frontend-codedeploy'

pipeline {
  agent any 
    
  tools {nodejs "nodejs"}
    
  stages {     
    // stage('Build') {
    //   steps {
    //     sh 'npm install'
    //   }
    // }  
              
    // stage('Test') {
    //   steps {
    //     withCredentials([file(credentialsId: 'freelance-backend-env-file', variable: 'mySecretEnvFile')]){
    //        sh 'cp $mySecretEnvFile .env'
    //        sh 'npm run test'
    //     }
    //   }
    // }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          script {
            def scannerHome = tool 'SonarScanner';
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }

    stage('Prepare Deploy') {
      when {
        branch 'staging'
      }
      steps {
        withAWS(region:'eu-west-1',credentials:'aws-cred') {
          script {
            def gitsha = sh(script: 'git log -n1 --format=format:"%H"', returnStdout: true)
            s3_filename = "${s3_filename}-${gitsha}"
            echo s3_filename
            echo s3_filename
            echo appname
            sh """
                aws deploy push \
                --application-name ${appname} \
                --description "This is a revision for the ${appname}-${gitsha}" \
                --ignore-hidden-files \
                --s3-location s3://${s3_bucket}/${s3_filename}.zip \
                --source .
              """
          }
        }
      }
    }

    stage('Deploy To Development') {
      when {
        branch 'staging'
      }
      steps {
        withAWS(region:'eu-west-1',credentials:'aws-cred') {
          script {
            sh """
                aws deploy create-deployment \
                --application-name ${appname} \
                --deployment-config-name CodeDeployDefault.OneAtATime \
                --deployment-group-name ${deploy_group} \
                --file-exists-behavior OVERWRITE \
                --s3-location bucket=${s3_bucket},key=${s3_filename}.zip,bundleType=zip
              """
          }
        }
      }
    }
    // stage('Deploy To Production') {
    //   when {
    //     branch 'main'
    //   }
    //   steps {
    //     withAWS(region:'eu-west-1',credentials:'aws-cred') {
    //       script {
    //         sh """
    //             aws deploy create-deployment \
    //             --application-name ${appname} \
    //             --deployment-config-name CodeDeployDefault.OneAtATime \
    //             --deployment-group-name ${deploy_group_prod} \
    //             --file-exists-behavior OVERWRITE \
    //             --s3-location bucket=${s3_bucket},key=${s3_filename}.zip,bundleType=zip
    //           """
    //       }
    //     }
    //   }
    // }
    stage('Clean WS') {
      steps {
        cleanWs()
      }
    }

  }
  post {
    always {
      echo 'One way or another, I have finished'
      cleanWs()
    }
    success {
      withAWS(region:'eu-west-1',credentials:'aws-cred') {
        sh 'aws ses send-email --from cloudamalitech@amalitech.org --to john.jebo@amalitech.com --subject "Deployment passed" --text "Freelance Backend Deployment passed"'
      }
    }
    unstable {
      echo 'I am unstable :/'
    }
    failure {
      withAWS(region:'eu-west-1',credentials:'aws-cred') {
        sh 'aws ses send-email --from cloudamalitech@amalitech.org --to john.jebo@amalitech.com --subject "Deployment failed" --text "Freelance Backend Deployment failed"'
      }
    }
    changed {
      echo 'Things were different before...'
    }
  }
  
}