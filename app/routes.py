from flask import render_template, jsonify, request
from app import app
from app import database

from datetime import datetime, date
import random


TIMEZONE = 'Australia/Perth' # set this to None to use machine timezone

@app.route('/')
@app.route('/index')
def index():
    if TIMEZONE:
        random.seed(datetime.now().strftime('%Y-%m-%d'))
    else:
        random.seed(datetime.today().strftime('%Y-%m-%d'))

    # Generate a random number within the specified range
    random_number = random.randint(0, 13)
    
    render_args = {
        "index":random_number
    }
    return render_template('index.html', **render_args);

@app.route('/leaderboard/<user_id>')
def leaderboard(user_id):
    
    top10_raw, userScore = database.get_records(user_id)
    top10 = []
    
    for record in top10_raw:
        top10.append([record[0], record[1], record[2]])
    
    render_args = {   
       "top10":top10,
       "user_stats":userScore
    }
    
    return render_template('leaderboard.html', **render_args)


@app.route('/api/submitstats')
def submitstats():
    user_id = request.args.get("user_id")
    points = request.args.get("points")
    print(user_id, points)
    response = {"succeeded":0}
    if None not in (user_id, points):
        if TIMEZONE:
            today = datetime.now().strftime('%Y-%m-%d')
        else:
            today = datetime.today().strftime('%Y-%m-%d')
        try:
            float(user_id)
            response["succeeded"] = database.update_record(user_id, today, int(points))
        except ValueError:
            print("Attmpted SQL injection!")
    print(response)
    return jsonify(response)
    
@app.route('/api/setusername')
def setusername():
    user_id = request.args.get("user_id")
    username = request.args.get("username")
    response = {"succeeded":0}
    
    print(user_id, username)
    
    float(user_id)
    response["succeeded"] = database.set_username(user_id, username)
    return jsonify(response)

@app.route('/api/checksubmissions')
def checksubmissions():
    user_id = request.args.get("user_id")
    response = False
    
    if TIMEZONE:
        today = datetime.now().strftime('%Y-%m-%d')
    else:
        today = datetime.today().strftime('%Y-%m-%d')
    float(user_id)
    response = database.check_submissions(user_id, today)
    print(response)
    return str(response)