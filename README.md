# Combat-Tracker_v2

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
    - Add styling to add/save/load buttons
    - When dead condition is acticated, add larger visual indication on card
- Backend
    - SQLlite + db setup
- Deployment
    - Deploy on Digital Ocean droplet or PythonAnywhere
    - Gunicorn WSGI server
