import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import InfiniteScroll from "react-infinite-scroller";

import withApollo from "../lib/with-apollo";
import { Property } from "../components/property";
import { Spinner } from "../components/spinner";

const LIMIT = 5;

const FETCH_PROPERTIES = gql`
  query getProperties($offset: Float!, $limit: Float!) {
    properties(offset: $offset, limit: $limit) {
      id
      images
      bedrooms
      bathrooms
      address
      postcode
      description
      price
      expired
    }
  }
`;

const TOGGLE_PROPERTY_STATUS = gql`
  mutation setExpired($id: String!, $status: Boolean!) {
    setExpired(id: $id, expired: $status) {
      id
      expired
    }
  }
`;

const Index: React.FC = () => {
  const [toggleStatus] = useMutation(TOGGLE_PROPERTY_STATUS);
  const { loading, error, data, fetchMore } = useQuery(FETCH_PROPERTIES, {
    variables: {
      offset: 0,
      limit: LIMIT,
    },
    fetchPolicy: "cache-and-network",
  });

  const onLoadMore = (): void => {
    fetchMore({
      variables: {
        offset: data.properties.length,
      },
      updateQuery: (
        prev,
        { fetchMoreResult }: { fetchMoreResult: typeof data }
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          __typename: fetchMoreResult.__typename,
          properties: [...prev.properties, ...fetchMoreResult.properties],
        };
      },
    });
  };

  if (error) return <p className="error">{error.message}</p>;

  return (
    <main className="main">
      <div className="list">
        {data ? (
          <InfiniteScroll
            initialLoad={false}
            loadMore={onLoadMore}
            hasMore={!loading && data.properties.length % LIMIT === 0}
          >
            {data.properties.map((item) => (
              <Property
                key={item.id}
                {...item}
                onChangeStatus={(status): void => {
                  toggleStatus({
                    variables: { id: item.id, status: !status },
                  });
                }}
              />
            ))}
            {loading && <Spinner key={0} />}
          </InfiniteScroll>
        ) : (
          "No properties found"
        )}
      </div>
    </main>
  );
};

export default withApollo({ ssr: true })(Index);
