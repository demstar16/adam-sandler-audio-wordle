from app import app
import sqlite3 

def create_table():
    """Creates new database if it doesn't already exist to store played games"""
    connection = sqlite3.connect(
        "database.db",
        detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    )
    cursor = connection.cursor()    

    sql_command = (
        """CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            user_id TEXT NOT NULL,
            date DATE NOT NULL,
            score INTEGER NOT NULL
        )"""
    )
    cursor.execute(sql_command)
    connection.commit()


def update_record(user_id, date, score):
    """Attempts to update an existing record for a user's game.

    Parameters:
    user_id (str): UUID for each user
    date (datetime): day the game was played
    score (int): new score to update

    Returns:
    bool: True if the record was updated, False otherwise
    """

    connection = sqlite3.connect(
        "database.db",
        detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    )
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM users WHERE user_id=? AND date=?", (user_id, date))

    # Only allow 1 submission per day
    todays_submissions = cursor.fetchall()
    if len(todays_submissions) < 1:
        # A record already exists for this user and date, so update it
        sql_command = (
            """UPDATE users SET score=? WHERE user_id=? AND date=?"""
        )
        cursor.execute(sql_command, (score, user_id, date))
        connection.commit()
        return True
    else:
        # No existing record found, so insert a new one
        sql_command = (
            """INSERT INTO users(user_id, date, score) VALUES (?, ?, ?)"""
        )
        cursor.execute(sql_command, (user_id, date, score))
        connection.commit()
        return False


def get_records(user_id):
    """Retrieves records for particular user_id

    Parameters:
    user_id (str): UUID of user
    
    Returns:
    list: list of all users number of wins, ordered by most wins then least avg attempts
    list: list containing tuple containing int, number of games played by user_id
    list: list with counts of games with x turns that given user has won
    """
    connection = sqlite3.connect(
        "database.db",
        detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    )
    cursor = connection.cursor()

    # gets list of top 10 users' scores, in desc order
    cursor.execute(f"SELECT user_id, score FROM users ORDER BY score DESC LIMIT 10;") 
    top10 = cursor.fetchall()
    
    # get user score    
    cursor.execute(f"SELECT score FROM users WHERE user_id==?", (user_id,))
    user_score_raw = cursor.fetchall()
    user_score = user_score_raw[0][0]

    return top10, user_score