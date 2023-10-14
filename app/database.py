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
            username TEXT,
            date DATE NOT NULL,
            score INTEGER NOT NULL
        )"""
    )
    cursor.execute(sql_command)
    connection.commit()


def update_record(user_id, date, points):
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

    cursor.execute("SELECT score FROM users WHERE user_id=? AND date=?", (user_id, date))
    current_score = cursor.fetchone()
    if current_score is not None:
        current_score = current_score[0]
        new_score = current_score + points
    else:
        new_score = points
    
    cursor.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    user_exist = cursor.fetchall()
    print("USER EXISTS", user_exist)
    if user_exist != []:
        cursor.execute("SELECT * FROM users WHERE user_id=? AND date=?", (user_id, date))

        # Only allow 1 submission per day
        todays_submissions = cursor.fetchall()
        if len(todays_submissions) < 1:
            #
            sql_command = (
                """UPDATE users SET score=? AND date=? WHERE user_id=?"""
            )
            cursor.execute(sql_command, (new_score, date, user_id))
            connection.commit()
            return True
        else:
            print("Submitted Today already")
            return False
    else:
        # No existing record found, so insert a new one
        sql_command = (
            """INSERT INTO users(user_id, date, score) VALUES (?, ?, ?)"""
        )
        cursor.execute(sql_command, (user_id, date, points))
        connection.commit()
        return True


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
    cursor.execute(f"SELECT user_id, username, score FROM users ORDER BY score DESC LIMIT 10;") 
    top10 = cursor.fetchall()
    
    # get user score    
    cursor.execute(f"SELECT user_id, username, score FROM users WHERE user_id==?", (user_id,))
    user_stats = cursor.fetchall()
    print(user_stats)
    
    return top10, user_stats

def set_username(user_id, username):
    """
    
    """
    connection = sqlite3.connect(
        "database.db",
        detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    )
    cursor = connection.cursor()
    
    cursor.execute(f"UPDATE users SET username=? WHERE user_id=?", (username, user_id))
    connection.commit()
    return True