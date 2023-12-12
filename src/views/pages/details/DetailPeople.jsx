import { memo, useEffect, useMemo, useState } from 'react';
// project imports

import MainCard from '~/ui-component/cards/MainCard';
import { useHomePageStore } from '../../../hooks/homepage';
import { Col, Row, Card, Spin, Divider } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Footer from '../../../ui-component/footer/Footer';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
const DetailPeople = () => {
  const [search] = useSearchParams();
  const id = useMemo(() => search.get('id'), [search]);
  const { loading, detailPeople, dispatchGetDetailPeopleRequest } = useHomePageStore();
  const [overView, setOverView] = useState(detailPeople?.biography?.slice(0, 400));
  useEffect(() => {
    dispatchGetDetailPeopleRequest(id);
  }, [dispatchGetDetailPeopleRequest, id]);

  if (loading) {
    return (
      <Row justify={'center'}>
        <Spin></Spin>
      </Row>
    );
  }
  return (
    <MainCard>
      <div id="container">
        <Row id="row-container" gutter={[0, 20]} justify={'space-between'}>
          <Col span={8} lg={5} md={24} sm={24} xs={24} xl={8}>
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${detailPeople?.profile_path}`}
              alt="anh k ton tai"
              style={{ width: 300, height: 'auto', borderRadius: 20 }}
            />
            <Row justify={'space-around'} style={{ width: 300, marginTop: 20 }}>
              <FacebookOutlinedIcon />
              <TwitterIcon />
              <InstagramIcon />
            </Row>
          </Col>
          <Col span={16} lg={12} md={24} sm={24} xs={24} xl={16}>
            <h1 style={{ marginBottom: 20 }}>{detailPeople?.name}</h1>
            <h2 style={{ marginBottom: 20 }}>{detailPeople?.known_for_department}</h2>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOverView(detailPeople?.biography);
              }}
            >
              {overView} <b>{overView?.length === 400 && '...Read more >'}</b>
            </Col>
            <h4>Known for</h4>
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={[20, 30]} justify={'space-around'} wrap={true}>
          <Col>
            <h4>Known For</h4>
            <p style={{ marginBottom: 20 }}>{detailPeople?.known_for_department}</p>
          </Col>
          <Col>
            {' '}
            <h4>Known Credits</h4>
            <p style={{ marginBottom: 20 }}> {detailPeople?.known_for_department}</p>
          </Col>
          <Col>
            {' '}
            <h4>Gender</h4>
            <p style={{ marginBottom: 20 }}>{detailPeople?.gender === 1 ? 'FEMALE' : 'MALE'}</p>
          </Col>
          <Col>
            <h4>Birthday</h4>
            <p style={{ marginBottom: 20 }}>{detailPeople?.birthday}</p>
          </Col>
          <Col>
            <h4>Also Known As</h4>
            {detailPeople?.also_known_as?.map((item, id) => {
              return <p key={id}>{item}</p>;
            })}
          </Col>
          <Col>
            <h4>Content Score</h4>
            <Card title={detailPeople?.popularity >= 100 ? 100 : detailPeople?.popularity} style={{ width: 200, marginBottom: 20 }}>
              <p>{detailPeople?.popularity >= 100 ? 'Yes! Looking good!' : 'Normal'}</p>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </div>
      <Footer></Footer>
    </MainCard>
  );
};

export default memo(DetailPeople);
