# Calcudis Authentication Server
## Installation and launch
```bash
npm install
sqlite3 data.db < schema.sql
npm run start
```

## Generate a pair of keys
```bash
ssh-keygen -o -b 4096 -t rsa
```