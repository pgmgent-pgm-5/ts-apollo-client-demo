import React, { useEffect } from 'react';
import { NetworkStatus, useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_ALL_ACCOUNTS, GET_ACCOUNT_PASSWORD } from './graphql/accounts'
import { useError } from './Hooks';
import { AccountData, AccountsData, AccountIdVars } from './interfaces'
import { Register } from './Components'

function App() {
  const [handleGqlError] = useError();
  /**
   * Example of a "normal" query
   */
  const { loading, error, data, refetch, networkStatus } = useQuery<AccountsData>(GET_ALL_ACCOUNTS, {
    onError: handleGqlError,
    fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
    notifyOnNetworkStatusChange: true,
    // pollInterval: 500,
  });

  /**
   * Example of a query that needs a trigger
   */
  const [getAccount, lazyQueryParams] = useLazyQuery<AccountData, AccountIdVars>(GET_ACCOUNT_PASSWORD);

  useEffect(() => {
    if(lazyQueryParams.data?.account) {
      console.log(lazyQueryParams.data.account.password);
    }
  }, [lazyQueryParams.data])

  /**
   * Check status, loading states and errors
   */

  if (networkStatus === NetworkStatus.refetch) return <div>Refetching!</div>;
  if (loading) return <div>loading...</div>;
  if (error) return <div>ERROR: ${error.message}</div>;

  return (
    <>
      <div className="App">
        {!loading && (
          <ul>
            {data?.accounts?.map(account => (
              <li key={account.id}>
                Account with email: {account.email}. <button onClick={() => getAccount({ variables: { id: account.id } })}>Get Password</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => refetch()}>Refetch</button>
      </div>
      <Register />
    </>
  );
}

export default App;
