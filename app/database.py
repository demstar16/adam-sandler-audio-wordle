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
        """CREATE TABLE IF NOT EXISTS games_played (
            id INTEGER PRIMARY KEY,
            user_id TEXT NOT NULL,
            date DATE NOT NULL,
            score INTEGER NOT NULL
        )"""
    )

    print(sql_command)
    cursor.execute(sql_command)
    connection.commit()


def insert_record(user_id, date, score):
    """Attempts to store data on a played game.  Will only allow 1 insert per 
    user_id per day to avoid manipualting user stats.

    Parameters:
    user_id (str): UUID for each user
    date (datetime): day the game was played
    win (int): if player won the  game win == 1, otherwise win==0
    attempts (int): number of attempts made in the game

    Returns:
    int: last row id
    """

    
    connection = sqlite3.connect(
        "database.db",
        detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    )
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM games_played WHERE user_id==? AND date==?", (user_id, date))

    # Only allow 1 submission per day
    todays_submissions = cursor.fetchall()
    if len(todays_submissions) < 1:
        sql_command = (
            f"""INSERT INTO games_played(user_id, date, score) VALUES (
                ?,
                ?,
                ?,
                ?
            )
            """
        )
        cursor.execute(sql_command, (user_id, date, score))
        connection.commit()
    return cursor.lastrowid

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
    cursor.execute(f"SELECT user_id, score FROM games_played ORDER BY score DESC LIMIT 10;") 
    top10 = cursor.fetchall()
    # get number of games played by this user      
    cursor.execute(f"SELECT score FROM games_played WHERE user_id==?", (user_id,))
    user_score = cursor.fetchall()

    return top10, user_score