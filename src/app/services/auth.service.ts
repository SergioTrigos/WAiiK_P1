import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  signUp(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation SignUp($username: String!, $email: String!, $password: String!) {
          addUser(input: { username: $username, email: $email, password: $password }) {
            user {
              id
              username
            }
          }
        }
      `,
      variables: { username, email, password },
    });
  }

  login(username: string, password: string) {
    return this.apollo.query({
      query: gql`
        query Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      variables: { username, password },
    });
  }
}