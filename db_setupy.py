import sqlite3


def db_setup():
    # connecting to the database
    connection = sqlite3.connect("data.db")
    crsr = connection.cursor()
    print("Connected to the database")

    commands = open("./setup.sql", "r").read().split(";")
    commands = commands[0:-1]  # get rid of empty command on end
    for command in commands:
        # Split removes ; so need to add it back
        command += ";"
        print(command)
        crsr.execute(command)

    # save changes and close the connection
    connection.commit()
    print("DB setup successful")
    print("Closing database connection...")
    print()
    connection.close()


def db_stuff():
    # connecting to the database
    connection = sqlite3.connect("data.db")
    crsr = connection.cursor()
    print("Connected to the database")

    # execute the statement
    crsr.execute("select * from test;")
    ans = crsr.fetchall()
    print(ans)

    # save changes and close the connection
    print("Closing database connection...")
    connection.commit()
    connection.close()


if __name__ == "__main__":
    if len(open("./data.db", "rb").read()) == 0:  # if len = 0, db not setup
        db_setup()
    db_stuff()
