# cloud-servers

## Zip File Manual Method

- create a `server` with a `package.json`
- place contents within a zip file
- go on amazon aws to create an application
- upload zipfile
- [Uploaded with Zip](http://cloudserverlab-env.eba-hxfra52d.us-west-2.elasticbeanstalk.com/)

## Elastic Beanstalk Method

- go on amazon aws security credentials
- create a group
- give group certain permissions
  - AWSCodeCommitFullAccess
  - AdministratorAccess-AWSElasticBeanstalk
  - AdministratorAccess
- create a user
  - go to security credentials within the user
  - generate credentials for 'HTTPS Git credentials for AWS CodeCommit'
    - IMPORTANT!!! These will be used when you go on to create an environment using `eb create` or `eb init`
  - save the access number and security number on your computer
- eb init:

```yml
branch-defaults:
  main:
    environment: NewCloudServerLab-env
environment-defaults:
  NewCloudServerLab-env:
    branch: main
    repository: cloud-servers
global:
  application_name: New Cloud Server Lab
  branch: null
  default_ec2_keyname: null
  default_platform: Node.js 14 running on 64bit Amazon Linux 2
  default_region: us-west-2
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: eb-cli
  repository: null
  sc: git
  workspace_type: Application

```

- a `.elasticbeanstalk` folder is made when you try to init
- ON AWS ensure that you are on the correct server region on the top right
- [GitHub/eb deploy Version](http://newcloudserverlab-env.us-west-2.elasticbeanstalk.com/)

## Github Actions Method

- create a yml file
- paste within yml file

```yml
name: Beanstalk Deploy
on:
  push:
    branches:
    - main
    
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    
    - name: Checkout source code
      uses: actions/checkout@v1

    - name: Generate deployment package
      run: zip -r deploy.zip . -x '*.git*'
      
    - name: Deploy to EB
      uses: einaregilsson/beanstalk-deploy@v16
      with:
        aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        application_name: New Cloud Server Lab
        environment_name: NewCloudServerLab-env
        version_label: 11111
        region: us-west-2
        deployment_package: deploy.zip
```

- Change the following:
  - name
  - branches
  - application_name
  - environtment_name
  - change version every time you make changes
- paste access key and screcret keys in secrets area
- when you ACP, should update directly on AWS
- the process creates a new zip file with the new version label
- this new zip file is uploaded on the application and replaces previous versions
- caveat: if upload has broken code, will not revert back to previous code. you have to do this manually
