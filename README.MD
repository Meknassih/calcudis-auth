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
**Be sure to use the passphrase** `1234` when prompted while generating the key pair below.
```bash
openssl genrsa -des3 -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```
### Start the server
```bash
npm run start
```
