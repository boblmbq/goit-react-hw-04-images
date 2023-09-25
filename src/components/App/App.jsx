import { useEffect, useState } from 'react';
import Searchbar from '../Searchbar';
import Button from '../Button';
import ImageGallery from '../ImageGallery';
import { getImages } from 'utils/axios-fetching';

const MAX_PER_PAGE = 12;

export const App = () => {
  const [queryInput, setQueryInput] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const onSubmit = input => {
    setQueryInput(input);
    setItems([]);
    setPage(1);
    setLoadMore(false);
  };

  useEffect(() => {
    async function gettingImgs() {
      setLoading(true);
      try {
        const gettedImgs = await getImages(queryInput, page);
        const { hits, totalHits } = gettedImgs;
        setItems(prev => [...prev, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / MAX_PER_PAGE));
        return;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    queryInput && gettingImgs();
  }, [queryInput, page]);

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {items.length > 0 ? (
        <ImageGallery items={items} />
      ) : (
        <h1>Enter your query</h1>
      )}
      {loadMore && <Button onClick={() => setPage(prev => prev + 1)} />}
      {loading && <h2>loading</h2>}
    </>
  );
};
