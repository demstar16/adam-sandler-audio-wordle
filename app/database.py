from app import app
import sqlite3

def create_connection():
    # Establish database connection
    return sqlite3.connect("database.db", detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)

def create_table():
    """Creates new database if it doesn't already exist to store played games"""
    connection = create_connection()
    cursor = connection.cursor()

    sql_command = """CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            user_id TEXT NOT NULL,
            username TEXT,
            date DATE NOT NULL,
            score INTEGER NOT NULL
        )"""
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

    connection = create_connection()
    cursor = connection.cursor()

    # Ensure that a user currently exists
    cursor.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    user_exist = cursor.fetchall()
    print(f"user_exist >> {user_exist}")

    if user_exist != []:
        # Obtain users current score
        cursor.execute(
            "SELECT score FROM users WHERE user_id=?", (user_id,)
        )
        current_score = cursor.fetchone()
        if current_score != []:
            print(f"current score: {current_score}. points: {points}")
            score = current_score[0]
            new_score = score + points
            print(f"new_score: {new_score}")
        else:
            new_score = points


        cursor.execute(
            "SELECT * FROM users WHERE user_id=? AND date=?", (user_id, date)
        )

        # Only allow 1 submission per day
        todays_submissions = cursor.fetchall()
        if len(todays_submissions) < 1:
            #
            cursor.execute("""UPDATE users SET score=?, date=? WHERE user_id=?""", (new_score, date, user_id))
            connection.commit()
            print("submitted and updated")
            return True
        else:
            print("Submitted Today already")
            return False
    else:
        # No existing record found, so insert a new one
        sql_command = """INSERT INTO users(user_id, date, score) VALUES (?, ?, ?)"""
        cursor.execute(sql_command, (user_id, date, points))
        connection.commit()
        print("submitted and inserted")
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
    connection = create_connection()
    cursor = connection.cursor()

    # gets list of top 10 users' scores, in desc order
    cursor.execute(
        f"SELECT user_id, username, score FROM users ORDER BY score DESC LIMIT 10;"
    )
    top10 = cursor.fetchall()

    # get user score
    cursor.execute(
        f"SELECT user_id, username, score FROM users WHERE user_id=?", (user_id,)
    )
    user_stats = cursor.fetchall()
    print(f"User Stats: {user_stats}")

    return top10, user_stats


def set_username(user_id, username):
    """ """
    connection = create_connection()
    cursor = connection.cursor()

    cursor.execute(f"UPDATE users SET username=? WHERE user_id=?", (username, user_id))
    connection.commit()
    return True
