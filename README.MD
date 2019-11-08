# Calcudis Authentication Server
## Getting started
### Install the dependencies
```bash
npm install
```
### Install SQLite 3
For Debian/Ubuntu :
```bash
sudo apt install sqlite3
```
For an other OS, check out the [official SQLite download page](https://sqlite.org/download.html).
### Create the database
```bash
sqlite3 data.db < schema.sql
```
### Generate a pair of keys
```bash
ssh-keygen -o -b 4096 -t rsa
```
### Start the server
```bash
npm run start
```
