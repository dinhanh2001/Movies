import { memo, useCallback, useState, useEffect, useMemo } from 'react';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Pagination from '@mui/material/Pagination';
import Footer from '../../../ui-component/footer/Footer';

import { useHomePageStore } from '../../../hooks/homepage';
import { Row, Spin } from 'antd';
import styled from 'styled-components';
import './styles.css';
import { useNavigate } from 'react-router';
import TVItem from './TVItem';
const TvPopular = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, tvShowsPopulardList, dispatchGetTvShowsPopularRequestList } = useHomePageStore();
  useEffect(() => {
    dispatchGetTvShowsPopularRequestList(1);
  }, [dispatchGetTvShowsPopularRequestList]);

  const list = useMemo(() => tvShowsPopulardList, [tvShowsPopulardList]);

  const handleChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchGetTvShowsPopularRequestList(value);
      setPage(value);
    },
    [dispatchGetTvShowsPopularRequestList]
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
              return <TVItem item={item} key={id} />;
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={20} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <Footer></Footer>
    </MainCard>
  );
};

export default memo(TvPopular);

const PaginationWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0 0 0;
  margin: 20px 0;
`;
