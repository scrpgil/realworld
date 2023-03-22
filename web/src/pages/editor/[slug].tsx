import EditorUpdatePage, {
  queryToVariables,
} from '../../containers/editor-update-page';
import { initializeApollo } from '../../lib/apolloClient';

export default EditorUpdatePage;

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(ctx);

  await apolloClient.query({
    query: EditorUpdatePage.query,
    variables: queryToVariables(ctx.query),
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
