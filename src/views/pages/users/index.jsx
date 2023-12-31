import { memo, useCallback, useEffect, useState, useMemo } from 'react';
// project imports
import styled from 'styled-components';
import MainCard from '~/ui-component/cards/MainCard';
import Pagination from '@mui/material/Pagination';
import { useHomePageStore } from '../../../hooks/homepage';
import { Col, Row } from 'antd';
import './styles.css';
import Footer from '../../../ui-component/footer/Footer';
import { useNavigate } from 'react-router';
const UsersPage = () => {
  const [page, setPage] = useState(1);
  const {
    // loading,
    leaderoardList,
    dispatchGetPeopleLeaderBoardList
  } = useHomePageStore();
  const navigate = useNavigate();
  console.log(leaderoardList);
  useEffect(() => {
    dispatchGetPeopleLeaderBoardList(1);
  }, [dispatchGetPeopleLeaderBoardList]);

  const list = useMemo(() => leaderoardList?.results, [leaderoardList?.results]);

  const handleChange = useCallback(
    (_, value) => {
      dispatchGetPeopleLeaderBoardList(value);
      setPage(value);
    },
    [dispatchGetPeopleLeaderBoardList]
  );

  const onDetailPeople = useCallback(
    (id) => {
      navigate(`/detail-people?id=${id}`);
    },
    [navigate]
  );

  return (
    <MainCard>
      <div id="container">
        <h2 style={{ marginBottom: 10 }}>Popular People</h2>
        <Row gutter={[10, 30]} id="row-container">
          {list &&
            list?.map((item, id) => {
              return (
                <Col
                  span={6}
                  key={id}
                  style={{ borderRadius: 20, cursor: 'pointer' }}
                  xs={22}
                  sm={12}
                  md={8}
                  lg={6}
                  onClick={() => onDetailPeople(item?.id)}
                >
                  <div>
                    <img
                      src={`https://www.themoviedb.org/t/p/w235_and_h235_face/${item?.profile_path}`}
                      alt=""
                      style={{ width: 220, height: 'auto', borderRadius: 10 }}
                    />
                    <h4>{item?.name ?? item?.original_name}</h4>
                    {item?.known_for?.map((item, id) => {
                      return <p key={id}>{item?.original_title ?? item?.name ?? item?.original_name ?? item?.original_title},</p>;
                    })}
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
      <PaginationWrapper>
        <Pagination count={100} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <Footer></Footer>
    </MainCard>
  );
};

export default memo(UsersPage);

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
