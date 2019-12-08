[![Heroku](https://heroku-badge.herokuapp.com/?app=chat3301)](https://chat3301.herokuapp.com/)

# Welcome to TeamChat!
This is a simple application:
* registration 
* one chat for all authorisation users

![chat_image](https://raw.githubusercontent.com/LialinMaxim/TeamChat/master/app/static/readme/demo.png)

## Launch Locally

0. Clone this repository/ 
1. Register at https://dashboard.pusher.com/ 

2. Create `.env` file in main folder and register at https://dashboard.pusher.com/

    ```shell
    PUSHER_APP_ID=9****8
    PUSHER_KEY=68****************fc
    PUSHER_SECRET=01****************d8
    PUSHER_CLUSTER=**
    
    SECRET_KEY=yor_secret_key
    
    DATABASE_URL=if_pass_will_be_use_sqlight_in_app.db
    ``` 


3. Create virtual environment and Install dependencies:

    ```shell
    pip install -r src/app/requirements.txt
    ```

4. Migrate DataBase:

    ```shell
    set/export FLASK_APP=run_app.py
    python db uprade
    ```
    
5. Run app:

    ```shell
    python run_app.py
    ```
    
    or
     ```shell
    flask run
    ```
    
    
6. Visit [http://localhost:5000](http://localhost:5000)


## Database Migration 

Read [flask-migrate](https://flask-migrate.readthedocs.io/en/latest/#using-flask-script)


## Docker 

Create image
```shell
docker build -t chat:latest .
```

Run image
```shell
docker run --name chat -d -p 8000:5000 --rm chat:latest
```

Visit [http://localhost:5000](http://localhost:5000)

