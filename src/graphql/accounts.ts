/**
 * All ACCOUNTS related graphql stuff
 */

import { gql } from '@apollo/client'

/**
 * Fragments
 */

export const FRAGMENT_ACCOUNT_EMAIL = gql`
  fragment AccountEmail on Account {
    id
    email
  }
`

/**
 * Queries
 */

export const GET_ALL_ACCOUNTS = gql`
  query Users {
    accounts {
      ...AccountEmail
      password
    }
  }
  ${FRAGMENT_ACCOUNT_EMAIL}
`

export const GET_ACCOUNT_PASSWORD = gql`
  query GetAccountPassword($id: ID!) {
    account(where: { id: $id }) {
      password
    }
  }
`

/**
 * Mutations
 */

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(data: { email: $email, password: $password }) {
      id
    }
  }
`

export const PUBLISH_ACCOUNT = gql`
  mutation publishAccount($id: ID!) {
    publishAccount(where: {id: $id}) {
      id
    }
  }
`