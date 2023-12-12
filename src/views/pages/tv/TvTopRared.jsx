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
import TVItem from './TVItem';
const TvTopRated = () => {
  const [page, setPage] = useState(1);
  const { loading, tvShowsTopRatedList, dispatchGetTvShowsTopRatedRequestList } = useHomePageStore();
  useEffect(() => {
    dispatchGetTvShowsTopRatedRequestList(1);
  }, [dispatchGetTvShowsTopRatedRequestList]);
  const list = useMemo(() => tvShowsTopRatedList, [tvShowsTopRatedList]);

  const handleChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchGetTvShowsTopRatedRequestList(value);
      setPage(value);
    },
    [dispatchGetTvShowsTopRatedRequestList]
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
              return <TVItem item={item} key={id} />;
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={22} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <Footer></Footer>
    </MainCard>
  );
};

export default memo(TvTopRated);

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
