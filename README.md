# DnD-5e-Combat-Tracker

A web app for tracking combat in DnD 5e.

## Requirements
- Flask
- Python

## Use
- ```virtualenv venv``` to create virtual env.
- ```.\venv\Scripts\activate``` to activate virtual env.
- ```pip install -r requirements.txt``` to install dependencies
- ```deactivate``` to deactivate virtual env.
- ```py app.py``` to run the local server

## TODO

- Frontend
    - Add turn / round tracker
    - Add initiative auto rolling for enemies
    - Add button to sort cards by initiative
- Backend
    - SQLlite + db setup
- Deployment
    - Deploy on Digital Ocean droplet or PythonAnywhere
    - Gunicorn WSGI server
