import React from 'react';
import { useQuery } from '@apollo/client/react';
import { graphql } from '../generated/gql';

const HELLO_QUERY = graphql(`
  query Hello {
    hello
  }
`);

const HelloQuery: React.FC = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data?.hello}</p>;
};

export default HelloQuery;
