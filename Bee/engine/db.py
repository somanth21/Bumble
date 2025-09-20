import csv
import sqlite3

con = sqlite3.connect("jarvis.db")
cursor = con.cursor()

query = "CREATE TABLE IF NOT EXISTS sys_command(id integer primary key, name VARCHAR(100), path VARCHAR(1000))"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'one note', 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Office16\\ONENOTE.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'chrome', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'notepad', 'C:\\Windows\\System32\\notepad.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'calculator', 'C:\\Windows\\System32\\calc.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'paint', 'C:\\Windows\\System32\\mspaint.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'cmd', 'C:\\Windows\\System32\\cmd.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'powershell', 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe')"
cursor.execute(query)

query = "INSERT INTO sys_command VALUES (null,'task manager', 'C:\\Windows\\System32\\Taskmgr.exe')"
cursor.execute(query)

con.commit()

query = "CREATE TABLE IF NOT EXISTS web_command(id integer primary key, name VARCHAR(100), url VARCHAR(1000))"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'youtube', 'https://www.youtube.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'gmail', 'https://mail.google.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'google', 'https://www.google.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'facebook', 'https://www.facebook.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'twitter', 'https://www.twitter.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'linkedin', 'https://www.linkedin.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'instagram', 'https://www.instagram.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'netflix', 'https://www.netflix.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'amazon', 'https://www.amazon.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'github', 'https://github.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'whatsapp web', 'https://web.whatsapp.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'google drive', 'https://drive.google.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'spotify', 'https://open.spotify.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'stack overflow', 'https://stackoverflow.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'google docs', 'https://docs.google.com/document/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'google sheets', 'https://docs.google.com/spreadsheets/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'canva', 'https://www.canva.com/')"
cursor.execute(query)

query = "INSERT INTO web_command VALUES (null,'reddit', 'https://www.reddit.com/')"
cursor.execute(query)

con.commit()


# testing module
# app_name = "android studio"
# cursor.execute('SELECT path FROM sys_command WHERE name IN (?)', (app_name,))
# results = cursor.fetchall()
# print(results[0][0])

# Create a table with the desired columns
cursor.execute('''CREATE TABLE IF NOT EXISTS contacts (id integer primary key, name VARCHAR(200), mobile_no VARCHAR(255), email VARCHAR(255) NULL)''')


# Specify the column indices you want to import (0-based index)
# Example: Importing the 1st and 3rd columns
desired_columns_indices = [0, 18]  # Adjust these based on your CSV structure

# # Read data from CSV and insert into SQLite table for the desired columns
with open('contacts.csv', 'r', encoding='utf-8') as csvfile:
    csvreader = csv.reader(csvfile)
    for row in csvreader:
        if len(row) > max(desired_columns_indices):
            selected_data = [row[i] for i in desired_columns_indices]
            cursor.execute('''INSERT INTO contacts (id, name, mobile_no) VALUES (null, ?, ?);''', tuple(selected_data))
        else:
            print(f"Skipping row (not enough columns): {row}")

# # Commit changes and close connection
con.commit()
con.close()

# query = "INSERT INTO contacts VALUES (null,'pawan', '1234567890', 'null')"
#cursor.execute(query)
#con.commit()

# query = 'kunal'
# query = query.strip().lower()

# cursor.execute("SELECT mobile_no FROM contacts WHERE LOWER(name) LIKE ? OR LOWER(name) LIKE ?", ('%' + query + '%', query + '%'))
# results = cursor.fetchall()
# print(results[0][0])