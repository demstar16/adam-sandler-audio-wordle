from flask import Flask
from flask_crontab import Crontab

app = Flask(__name__)
crontab = Crontab(app)

from app import routes 
from app import database

database.create_table()
