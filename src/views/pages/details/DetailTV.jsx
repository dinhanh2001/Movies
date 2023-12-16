import { memo, useCallback, useEffect, useState, useMemo } from 'react';
// project imports

import MainCard from '~/ui-component/cards/MainCard';
import { MenuUnfoldOutlined, HeartTwoTone, TagOutlined, StarOutlined } from '@ant-design/icons';
import { useHomePageStore } from '../../../hooks/homepage';
import { Col, Row, Image, Progress, Card, Rate, Popover, Divider } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import Footer from '../../../ui-component/footer/Footer';
import { useSearchParams } from 'react-router-dom';
import { dienvien } from './data';
import './style.css';
function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

const DetailTV = () => {
  const { detailTV, dispatchGetDetailTV, rateList, dispatchChangeRateList, dispatchChangeFavoriteList, favoriteList } = useHomePageStore();
  const [rate, setRate] = useState(Object.values(rateList)?.find((el) => el?.id === detailTV?.id)?.star ?? 0);
  const [searchParam] = useSearchParams();
  const [overView, setOverView] = useState(detailTV?.overview?.slice(0, 150));
  const id = useMemo(() => {
    return searchParam.get('id');
  }, [searchParam]);

  const onChangeRate = useCallback(
    (value) => {
      dispatchChangeRateList({ id: detailTV?.id, star: value });
      setRate(value);
    },
    [detailTV?.id, dispatchChangeRateList]
  );

  const OnChangeFavoriteList = useCallback(() => {
    dispatchChangeFavoriteList(detailTV?.id);
  }, [detailTV?.id, dispatchChangeFavoriteList]);

  useEffect(() => {
    dispatchGetDetailTV(id);
  }, [dispatchGetDetailTV, id]);

  return (
    <MainCard>
      <div id="container">
        <Row
          justify={'space-between'}
          id="row-container"
          style={{
            padding: 20,
            backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detailTV?.poster_path})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat-x',
            color: 'white',
            backgroundColor: 'rgba(196, 196, 196, 0.9)',
            backgroundBlendMode: 'multiply'
          }}
        >
          <Col span={8} lg={8} md={24} sm={24} xs={24} xl={8}>
            <Image
              width={300}
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detailTV?.backdrop_path}`}
              style={{ borderRadius: 20 }}
            />
          </Col>
          <Col span={16} lg={16} md={24} sm={24} xs={24} xl={16}>
            <h2 style={{ marginBottom: 20 }}>
              {detailTV?.original_title ?? detailTV?.original_name}
              <span>({detailTV?.first_air_date?.slice(0, 4)})</span>
            </h2>
            <h5 style={{ marginBottom: 20 }}>
              <span>
                {detailTV?.release_date}
                {detailTV?.original_language?.toUpperCase()}
              </span>
              <b>
                {' '}
                {detailTV?.genres?.map((item) => {
                  return `${item?.name},`;
                })}
                {toHoursAndMinutes(detailTV?.runtime)}
              </b>
            </h5>
            <Row align={'middle'} gutter={[5, 20]}>
              <div style={{ backgroundColor: 'black', borderRadius: 100, padding: 5 }}>
                <Progress
                  type="circle"
                  percent={(detailTV?.vote_average * 10).toFixed(1)}
                  size={'small'}
                  trailColor="#204529"
                  strokeColor={'#21d07a'}
                  format={() => {
                    return <p style={{ color: 'white', fontWeight: 'bold' }}>{(detailTV?.vote_average * 10).toFixed(1)}%</p>;
                  }}
                />
              </div>
              <span style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 10 }}>User Score</span>
              <div
                style={{
                  width: 50,
                  marginRight: 10,
                  marginLeft: 10,
                  height: 50,
                  backgroundColor: '#032541',
                  borderRadius: 25,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <MenuUnfoldOutlined style={{ padding: 0, margin: 0 }} />
              </div>
              <Row
                style={{
                  width: 50,
                  marginRight: 10,
                  marginLeft: 10,
                  height: 50,
                  backgroundColor: '#032541',
                  borderRadius: 25,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={OnChangeFavoriteList}
              >
                <HeartTwoTone
                  style={{ padding: 0, margin: 0 }}
                  twoToneColor={Object.values(favoriteList)?.includes(detailTV?.id) ? 'pink' : 'blue'}
                />
              </Row>
              <div
                style={{
                  width: 50,
                  marginRight: 10,
                  marginLeft: 10,
                  height: 50,
                  backgroundColor: '#032541',
                  borderRadius: 25,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TagOutlined style={{ padding: 0, margin: 0 }} />
              </div>
              <div
                style={{
                  width: 50,
                  marginRight: 10,
                  marginLeft: 10,
                  height: 50,
                  backgroundColor: '#032541',
                  borderRadius: 25,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Popover
                  placement="bottomRight"
                  title={''}
                  content={() => {
                    return (
                      <Col>
                        <p>Đánh giá</p>
                        <Rate allowHalf value={rate} onChange={onChangeRate} />
                      </Col>
                    );
                  }}
                  arrow={true}
                >
                  <StarOutlined
                    style={{
                      padding: 0,
                      margin: 0,
                      color: Object.values(rateList)?.find((el) => el?.id === detailTV?.id) ? 'yellow' : 'white'
                    }}
                  />
                </Popover>
              </div>
            </Row>
            <p style={{ marginBottom: 20 }}>{detailTV?.tagline}</p>
            <h3 style={{ marginBottom: 20 }}>Over view</h3>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOverView(detailTV?.overview);
              }}
            >
              {overView} <b>{overView?.length === 150 && '...Read more >'}</b>
            </Col>
            <Row style={{ marginTop: 20 }} justify={'start'} gutter={[100, 0]}>
              <Col>
                <p>
                  <b>{dienvien[Math.floor(Math.random() * 71 + 1)]?.name}</b>
                </p>
                <span>Creator</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider></Divider>
        <h2>Diễn viên</h2>
        <div id="top-cast">
          {Array.from({ length: 15 }, (_, key) => {
            const idCast = dienvien[Math.floor(Math.random() * 71 + 1)]?.id;

            return (
              <Col key={key} className="item-cast">
                <Image src={dienvien[idCast]?.path} style={{ width: 100, height: 'auto' }} alt="image-error" />
                <p style={{ paddingLeft: 5 }}>{dienvien[idCast]?.name}</p>
              </Col>
            );
          })}
        </div>
        <Row style={{ marginTop: 50 }} justify={'space-around'}>
          <Card title="Original Name" bordered={false}>
            {detailTV?.original_name}
          </Card>
          <Card title="Status" bordered={false}>
            {detailTV?.status}
          </Card>
          <Card title="Network" bordered={false}>
            {detailTV?.networks?.map((item) => {
              return (
                <div key={item?.id} style={{ marginRight: 30 }}>
                  {/* <img
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item?.logo_path}`}
                    style={{ height: 100, width: 'auto' }}
                    alt="k co anh hien thi"
                  /> */}
                  <b>{item?.name},</b>
                </div>
              );
            })}
          </Card>
          <Card title="Type" bordered={false}>
            {detailTV?.type}
          </Card>
          <Card title="Original Language" bordered={false}>
            {detailTV?.original_language}
          </Card>
        </Row>
        <h2 style={{ marginBottom: 20, marginTop: 10 }}>Production_companies</h2>
        <Row style={{ margin: 50 }}>
          <Row gutter={[20, 50]}>
            {detailTV?.production_companies?.map((item) => {
              return (
                <div key={item?.id} style={{ marginRight: 30 }}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item?.logo_path}`}
                    style={{ height: 100, width: 'auto' }}
                    alt="k co anh hien thi"
                  />
                  <p>{item?.name}</p>
                </div>
              );
            })}
          </Row>
        </Row>
        <h3 style={{ marginTop: 50 }}>Top đánh giá</h3>
        <Row justify={'space-around'} align={'middle'}>
          <Row>
            <Image src="https://www.themoviedb.org/t/p/w45_and_h45_face/qZW7TazXYrGysGBgO6ygeAaC4WO.jpg" style={{ borderRadius: 25 }} />
            <Col style={{ marginLeft: 5 }}>
              <b>207</b>
              <p>Fougasse</p>
            </Col>
          </Row>
          <Row>
            <Image src="https://www.themoviedb.org/t/p/w45_and_h45_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg" style={{ borderRadius: 25 }} />
            <Col style={{ marginLeft: 5 }}>
              <b>165</b>
              <p>raze464</p>
            </Col>
          </Row>
          <Row>
            <Image src="https://www.themoviedb.org/t/p/w45_and_h45_face/sAyBN78PQJk2QL74zJ4tjO9JEOP.jpg" style={{ borderRadius: 25 }} />
            <Col style={{ marginLeft: 5 }}>
              <b>47</b>
              <p>JAKRATAKO</p>
            </Col>
          </Row>
          <Row>
            <Image src="https://www.themoviedb.org/t/p/w45_and_h45_face/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg" style={{ borderRadius: 25 }} />
            <Col style={{ marginLeft: 5 }}>
              <b>43</b>
              <p>vgfu34</p>
            </Col>
          </Row>
          <Row>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5]
                }
              ]}
              width={250}
              height={200}
            />
          </Row>
        </Row>
      </div>

      <Footer></Footer>
    </MainCard>
  );
};

export default memo(DetailTV);
