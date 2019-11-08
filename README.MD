# Calcudis Authentication Server
## Getting started
### Install the dependencies
```bash
npm install
```
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
