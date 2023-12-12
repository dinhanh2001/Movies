import { memo, useCallback, useState, useEffect, useMemo } from 'react';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Pagination from '@mui/material/Pagination';
import Footer from '../../../ui-component/footer/Footer';
import { useHomePageStore } from '../../../hooks/homepage';
import { Row, Spin } from 'antd';
import MovieItem from './MovieItem';
import styled from 'styled-components';
import './styles.css';
const MoviesPopular = () => {
  const [page, setPage] = useState(1); // khoi tai page 1
  const { loading, moviesPopularList, dispatchGetMoviesPopularListRequestList } = useHomePageStore(); // hooks goi ra nhuwng cai can thiet
  useEffect(() => {
    dispatchGetMoviesPopularListRequestList(1); // goi danh sach khi khoi tao trang
  }, [dispatchGetMoviesPopularListRequestList]);

  const list = useMemo(() => moviesPopularList, [moviesPopularList]); // lay dah sasch gan vao list

  const handleChange = useCallback(
    // thay doi page
    (_, value) => {
      setPage(value);
      dispatchGetMoviesPopularListRequestList(value);
      setPage(value);
    },
    [dispatchGetMoviesPopularListRequestList]
  );

  if (loading) {
    <Spin size="large" />;
  }
  return (
    <MainCard>
      <div id="container">
        <h2 style={{ marginBottom: 10 }}>Phổ biến</h2>
        <Row gutter={[25, 30]} id="row-container" justify={'center'}>
          {list &&
            list?.map((item, id) => {
              return <MovieItem item={item} key={id} />;
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={15} page={page} onChange={handleChange} color="primary" />
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

export default memo(MoviesPopular);
