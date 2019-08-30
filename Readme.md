# Challenge for UruIT

Coded by Germán Cárdenas M

Open a terminal and import the SQL file

## App Installation

Clone this repository to your local host

```bash
git clone https://github.com/germancardenasm/gameofdrones.git
```

cd into the directory just created

```bash
cd UruIT
```

cd into the client directory and install npm dependencies

```bash
cd client
npm install
```

cd into the server directory and install npm dependencies

```bash
cd ..
cd server
npm install
```

##DB Installation
Install MySQL, download and isntall the DB from [Here](https://dev.mysql.com/downloads/mysql/) in case you don have it already.
Remember Username and password you generated to log into your MySQL.

Open a terminal window and import the SQL file that you will find in the root folder of the project you just cloned.
Please replace <user_name> with your own user name and provide your password when promted.

```bash
mysql -u <user_name> -p gameOfDrones < bd-structure.sql
```

##Configure DB credentials
Edit the **Connection.js** file that you will find in the `./server/connection/` folder of the clone repository. Replace the username and password with your own.
Save the file.

## Run app

In the server directory run the backend server:

```bash
npm start
```

cd into the client directory and run the frontend app

```bash
cd ..
cd client
npm start
```

If the browser does not open automatically, please open manually at this URL [http://localhost:3000](http://localhost:3000).
