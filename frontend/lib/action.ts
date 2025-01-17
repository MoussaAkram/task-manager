import { gql } from '@apollo/client';


export const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const Register_MUTATION = gql`
 mutation Signup($email: String!,$username: String!, $password: String!) {
   signup(email: $email, username: $username, password: $password) {
         success
         message
       }
 }
`;

export const TASKS_QUERY = gql`
query {
    tasks {
        id
        title
        description
        completed
        dueDate
    }
}
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!, $completed: Boolean, $dueDate: DateTime) {
    createTask(title: $title, description: $description, completed: $completed, dueDate: $dueDate) {
      task {
        id
        title
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation ($id: UUID!, $title: String!, $description: String, $completed: Boolean, $dueDate: DateTime) {
    updateTask(id: $id, title: $title, description: $description, completed: $completed, dueDate: $dueDate) {
      task {
        id
        title
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: UUID!) {
    deleteTask(id: $id) {
      ok
    }
  }
`;