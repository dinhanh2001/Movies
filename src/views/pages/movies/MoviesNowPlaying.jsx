import { memo, useCallback, useState, useEffect, useMemo } from 'react';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Pagination from '@mui/material/Pagination';
import Footer from '../../../ui-component/footer/Footer';
import { useHomePageStore } from '../../../hooks/homepage';
import { Spin, Row } from 'antd';
import styled from 'styled-components';
import './styles.css';
import MovieItem from './MovieItem';
const MoviesNowPlaying = () => {
  const [page, setPage] = useState(1);
  const { loading, moviesNowPlayingList, dispatchGetMoviesNowPlayingListRequestList } = useHomePageStore();
  useEffect(() => {
    dispatchGetMoviesNowPlayingListRequestList(1);
  }, [dispatchGetMoviesNowPlayingListRequestList]);
  const list = useMemo(() => moviesNowPlayingList, [moviesNowPlayingList]);

  const handleChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchGetMoviesNowPlayingListRequestList(value);
      setPage(value);
    },
    [dispatchGetMoviesNowPlayingListRequestList]
  );

  if (loading) {
    <Spin size="large" />;
  }

  return (
    <MainCard>
      <div id="container">
        <h2 style={{ marginBottom: 10 }}>Đang chiếu</h2>
        <Row gutter={[25, 20]} id="row-container" justify={'center'}>
          {list &&
            list?.map((item, id) => {
              return <MovieItem item={item} key={id} />;
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={30} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <Footer></Footer>
    </MainCard>
  );
};

const PaginationWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0 0 0;
  margin-bottom: 20px;
`;
export default memo(MoviesNowPlaying);
