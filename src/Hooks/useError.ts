/**
 * The use error hook
 */

import { ApolloError } from '@apollo/client'

export const useError = () => {
  const handleGqlError = ({ graphQLErrors }: ApolloError) => {
    graphQLErrors.forEach(({ message, extensions }) => {
      // logout if we have code unauthenticated
      if (extensions?.code === 'UNAUTHENTICATED') console.error('User is not authenticated!')
      // notify the message
      else console.error("testing;" + message);
    });
  };
  return [handleGqlError];
};
