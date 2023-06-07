Installation
1. clone the repository "git clone git@github.com:tanvirMahtab077/task_management_api.git"
2. run command "npm i --save"
3. add those to the .env file

    APP_NAME = task_management_api
    PORT=8000
    DB_CONNECT=mongodb://localhost/task_manager
    Jwt_SECRET_Key= sdf3483&34$2w3

4. connect to your mongodb database

5. Api List:
signup
   http://localhost:8000/api/user/signup
login
   http://localhost:8000/api/user/login
user List
   http://localhost:8000/api/user/userList
refresh token
   http://localhost:8000/api/user/refresh
create a task
   http://localhost:8000/api/task/create
