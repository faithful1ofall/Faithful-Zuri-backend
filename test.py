import requests

# Define the base URL of your API
base_url = "https://faithful-zuri-backend.vercel.app"

# Function to add a new person
def add_person():
    person_data = {
        "name": "Mark Essien",
        "value": "Some Value"
    }
    response = requests.post(f"{base_url}/api", json=person_data)
    print("Adding a new person...")
    print(response.json())

# Function to fetch details of a person by ID
def get_person_by_id(person_id):
    response = requests.get(f"{base_url}/api/{person_id}")
    print(f"Fetching details of person with ID {person_id}...")
    print(response.json())

# Function to modify details of an existing person by ID
def update_person_by_id(person_id, updated_data):
    response = requests.put(f"{base_url}/api/{person_id}", json=updated_data)
    print(f"Modifying details of person with ID {person_id}...")
    print(response.json())

# Function to remove a person by ID
def remove_person_by_id(person_id):
    response = requests.delete(f"{base_url}/api/{person_id}")
    print(f"Removing person with ID {person_id}...")
    print(response.json())

# Test the CRUD operations
add_person()
get_person_by_id(1)  # Replace 1 with the actual person ID
update_person_by_id(1, {"name": "Mark", "value": "Some"})  # Replace 1 and the data as needed
remove_person_by_id(1)  # Replace 1 with the actual person ID
