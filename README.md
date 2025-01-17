# Task Manager

A robust application for managing tasks efficiently. Built with Django, GraphQL, and React Native, it provides a seamless experience for creating, viewing, and editing tasks with secure user authentication.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [More Features](#bonus-features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Project Overview

Managing tasks effectively is essential for personal and professional productivity. This application simplifies task management by offering CRUD operations through a user-friendly interface, backed by a secure and scalable architecture.

## Core Features

The Task Manager offers the following functionalities:

- Task Management: Create, view, edit, and delete tasks with essential details like title, description, completion status, and due date.

- User Authentication: Secure APIs using JWT-based authentication to protect user data.

- Real-Time Sync: Seamless communication between the frontend and backend using Apollo Client for GraphQL.


## Technology Stack

The application utilizes the following technologies:

- Frontend: React Native for building cross-platform mobile applications.

- Backend: Django with GraphQL integration using Graphene-Django for rapid development and flexible data queries.

- API Management: Apollo Client for handling GraphQL queries and mutations.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Python 3.10+: Required for the Django backend.

Node.js: For running the React Native application.

### Installation

1. Clone the Repository:
 ```bash
git clone https://github.com/MoussaAkram/task-manager.git
cd task-manager/backend
 ```

2. Set Up the Backend:

- Create a virtual environment and activate it:
```bash
python -m venv env
source env/bin/activate
 ```
- Install dependencies:
```bash
pip install -r requirements.txt
 ```

- Apply database migrations:
```bash
python manage.py migrate
 ```

- Run the development server:
```bash
python manage.py runserver
 ```

3. Set Up the Frontend:

- Navigate to the frontend directory:
```bash
cd ../frontend
 ```

- Install dependencies:
```bash
npm install
```
- Run the application:
```bash
npx expo start
```

## Contributing

We welcome contributions to enhance the project. Follow these steps to contribute:

1. Fork the repository.

2. Create a new branch:
```bash
git checkout -b feature/YourFeature
```

3. Commit your changes:
```bash
git commit -m "Add YourFeature"
```

4. Push to the branch:
```bash
git push origin feature/YourFeature
```

5. Open a pull request.