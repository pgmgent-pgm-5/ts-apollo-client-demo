/**
 * All used interfaces
 */

export interface Account {
  id: string
  email: string
  password: string
}

export interface AccountsData {
  accounts: Account[]
}

export interface AccountData {
  account: Account
}

export interface CreateAccountData {
  createAccount: Account
}

export interface PublishAccountData {
  publishAccount: Account
}

export interface AccountIdVars {
  id: string
}