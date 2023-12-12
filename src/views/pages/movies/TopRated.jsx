import { memo, useCallback, useState, useEffect, useMemo } from 'react';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Pagination from '@mui/material/Pagination';
import Footer from '../../../ui-component/footer/Footer';
import { Row } from 'antd';
import { useHomePageStore } from '../../../hooks/homepage';
import { Spin } from 'antd';
import styled from 'styled-components';
import './styles.css';
import MovieItem from './MovieItem';
const TopRated = () => {
  const [page, setPage] = useState(1);
  const { loading, moviesTopRatedList, dispatchGetMoviesTopRatedListRequestList } = useHomePageStore();
  useEffect(() => {
    dispatchGetMoviesTopRatedListRequestList(1);
  }, [dispatchGetMoviesTopRatedListRequestList]);
  const list = useMemo(() => moviesTopRatedList, [moviesTopRatedList]);

  const handleChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchGetMoviesTopRatedListRequestList(value);
      setPage(value);
    },
    [dispatchGetMoviesTopRatedListRequestList]
  );

  if (loading) {
    <Spin size="large" />;
  }
  return (
    <MainCard>
      <div id="container">
        <h2 style={{ marginBottom: 10 }}>Top đánh giá</h2>
        <Row gutter={[25, 30]} id="row-container" justify={'center'}>
          {list &&
            list?.map((item, id) => {
              return <MovieItem item={item} key={id} />;
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={36} page={page} onChange={handleChange} color="primary" />
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
`;

export default memo(TopRated);
