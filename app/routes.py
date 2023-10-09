from flask import render_template, url_for, redirect, request
from app import app
from app import database



TIMEZONE = 'Australia/Perth' # set this to None to use machine timezone

@app.route('/', methods=['POST', 'GET'])
@app.route('/index', methods=['POST', 'GET'])
def index():
    # if request.method == 'POST':
    #     if done:
    #         return redirect('/leaderboard')

    return render_template('index.html');

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html');
