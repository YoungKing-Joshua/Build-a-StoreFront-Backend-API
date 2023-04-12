# UDACITY STOREFRONT BACKEND

---
## PROJECT OVERVIEW

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.
<br/><br/>

---

## PROJECT TASKS

The main goal is to build an API for a shopping application. In this project you will:
* Draft a database schema that covers all the data requirements.
* Draft a map of endpoints to expose for the frontend.

#### _Database Setup_
* Create a connection to a Postgres database from the provided Node application.
* Add tables and columns according to the database schema doc from step 1.

#### _Create Models_
* Create models that facilitate CRUD operations on the database tables.
* Create a test suite for each model in Jasmine.

#### _Create API Endpoints_
* Create handler files for each model.
* In each handler file, create RESTful endpoints for each model method.
* Create a test suite that covers each endpoint with Jasmine.

# REQUIRED TECHNOLOGIES
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

Find [project rubric, here](https://review.udacity.com/#!/rubrics/3061/view).

**The final implementation of the project showcases my abilities to build a backend API for an online store.**
<br/><br/>

---
## FOLDERS AND FILES
* build :  `build`
* spec : `spec`
* src : `src`
* package : `package.json`
* tsconfig : `tsconfig.json`
<br/><br/>

---
## INSTALL NODE PACKAGES

### _Install Dependencies_. 
<br/>

```bash
npm install
```
<br/>

---

## SET ENVIRONMENT VARIABLES

* Convert `.env-example` to `.env`
* Set the following environment variables
<br/>

```bash
#Your Postgres host IP eg. 127.0.0.1
POSTGRES_HOST=

#Your postgres port. Default port is 5432
POSTGRES_PORT=

#Your postgres database name
POSTGRES_DB=

#Your postgres database name for unit testing
POSTGRES_TEST_DB=

#Your postgres username. Follow the steps on POSTGRES DATABASE SETUP
POSTGRES_USER=

#Your postgres password. Follow the steps on POSTGRES DATABASE SETUP
POSTGRES_PASSWORD=

#For BCRYPT encryption
BCRYPT_PEPPER=

#For BCRYPT encryption
SALT_ROUNDS=

#For jwt tokens
TOKEN_SECRET=

#For unit testing
JASMINE_TEST_PASSWORD=
```
<br/>

---

## POSTGRES DATABASE SETUP

#### INSTALL POSTGRES
Download at https://www.postgresql.org/download/windows/

#### DATABASE PORT 

```bash
5432
```
#### DATABASE SETUP 
* Connect to Database

`Linux`
```bash
#Switch to the postgres user
su postgres

#Start psql
psql postgres
```

`Windows`
```bash
#Start psql
psql postgres postgres
```
_Resolve failed authentication -> https://stackoverflow.com/questions/55038942/fatal-password-authentication-failed-for-user-postgres-postgresql-11-with-pg_
* Create Role

```sql
CREATE ROLE full_stack_user SUPERUSER LOGIN PASSWORD 'set-your-password';
```
* Create Databases

```sql
CREATE DATABASE storefront_db;
CREATE DATABASE storefront_test_db;
```

* Grant Privileges

```sql
GRANT ALL PRIVILEGES ON DATABASE storefront_db TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test_db TO full_stack_user;
```

#### CREATE DATABASE MIGRATION 

```bash
npm run migrate-up
```

#### REMOVING USER ROLE 

```sql
REASSIGN OWNED BY full_stack_user TO postgres;
DROP OWNED BY full_stack_user;
DROP USER full_stack_user;
```
<br/>

## DATABASE SCHEMA

### _USERS_:

| COLUMN       | DATA TYPE      |
| :---         |    ----:       |          
| id           | integer        | 
| first_name   | varchar(255)   | 
| last_name    | varchar(255)   | 
| email        | varchar(255)   | 
| password     | varchar(255)   | 

### _ORDERS_:

| COLUMN              | DATA TYPE      |
| :---                |    ----:       |          
| id                  | integer        | 
| product_id          | integer        | 
| product_quantity    | integer        | 
| user_id             | integer        | 
| order_status        | varchar(10)    | 

### _PRODUCTS_:

| COLUMN       | DATA TYPE      |
| :---         |    ----:       |          
| id           | integer        | 
| name         | varchar(255)   | 
| price        | decimal        | 
| category     | varchar(255)   | 

### _ORDER-PRODUCTS_:

| COLUMN        | DATA TYPE   |
| :---          |    ----:    |          
| id            | integer     | 
| order_id      | integer     | 
| product_id    | integer     | 
| quantity      | integer     | 

![](<https://github.com/devkofi/udacity-store-front/blob/master/schema.png>)


---
## START PROJECT

### _Build_:  
```bash
npm run build
```

### _Start Server_:  
```bash
npm run start
```

### _Watch_:  
```bash
npm run watch
```

Start server at http://localhost:3000

<br/>

---


# FORMATTING

### _Run Linter_:  
```bash
npm run lint
```
<br/>

### _Run Prettier_:  
```bash
npm run prettier
```
<br/>

---

# TESTING

### _Jasmine_:  
```bash
npm install -g jasmine
npm run test
```
<br/>

---

# ENVIRONMENT

#### _Production_:  
```bash
ENV=dev
```
#### _Test_:  
```bash
ENV=test
```
<br/><br/>