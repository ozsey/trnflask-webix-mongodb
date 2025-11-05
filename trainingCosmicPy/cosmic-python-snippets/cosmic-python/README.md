# COSMIC PYTHON SNIPPETS #

Cosmic Python Snippets. 

### Requirements ###

* See the requirement libraries  of this project in ```requirements.txt```.
* Install using ```pip```:

```
pip install -r requirements.txt
```


### Project Structure ###
```
.
|---- src                           # Initialize Projects (Dont't change this)
|    |-- purchase_order             # Project Name in this snippets Project name as a module
|    |   |-- adapter                # Database Query and repository function's
|    |   |   |-- implementation.py
|    |   |   |-- repository.py
|    |   |-- domain                 # Model Layer for parameter's or data's
|    |   |   |-- model.py
|    |   |-- entrypoints            # endpoints from purchase_order
|    |   |   |-- controller.py
|    |   |-- service_layer          # Business Logic
|    |   |   |-- service.py
|    |   |-- tests
|    |   |   |-- test_service.py    # Test folder for testing business logic
|    |   |-- setup.py               # for running application in localhost or server and register all blueprint endpoints
|---- requirements.txt              # requirements for this project
|---- README.md                     # readme file for project
|---- .gitignore                    # git ignore file
|---- pyproject.toml                # configuration file used by packaging tools
```
### How to run test ###

* Install the pyproject.toml
```
pip install -e .
```

* Run test file
```
pytest --pyargs PROJECT-NAME
```