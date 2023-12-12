import { memo, useCallback, useState, useEffect, useMemo } from 'react';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Pagination from '@mui/material/Pagination';
import Footer from '../../../ui-component/footer/Footer';
import { Col, Row } from 'antd';
import { useHomePageStore } from '../../../hooks/homepage';
import { Progress, Spin } from 'antd';
import styled from 'styled-components';
import './styles.css';
import { useNavigate } from 'react-router';
import TVItem from './TVItem';
const TvAringToday = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, tvShowsAiringTodayList, dispatchGetTvShowsAiringTodayRequestList } = useHomePageStore();
  useEffect(() => {
    dispatchGetTvShowsAiringTodayRequestList(1);
  }, [dispatchGetTvShowsAiringTodayRequestList]);
  const list = useMemo(() => tvShowsAiringTodayList, [tvShowsAiringTodayList]);

  const handleChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchGetTvShowsAiringTodayRequestList(value);
      setPage(value);
    },
    [dispatchGetTvShowsAiringTodayRequestList]
  );

  if (loading) {
    <Spin size="large" />;
  }
  return (
    <MainCard>
      <div id="container">
        <h2 style={{ marginBottom: 10 }}>Phát sóng hôm nay</h2>
        <Row gutter={[25, 30]} id="row-container" justify={'center'}>
          {list &&
            list?.map((item, id) => {
              return <TVItem item={item} key={id} />;
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={103} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <Footer></Footer>
    </MainCard>
  );
};

export default memo(TvAringToday);

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
