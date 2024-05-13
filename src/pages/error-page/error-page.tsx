import { Helmet } from 'react-helmet-async';

export default function ErrorPage(): JSX.Element {
  return (
    <div>
      <Helmet>fitfriends:error</Helmet>
      404 page not found
    </div>
  );
}
