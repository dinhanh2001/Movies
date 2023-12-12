import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports

import MainCard from '~/ui-component/cards/MainCard';
import { MenuUnfoldOutlined, HeartTwoTone, TagOutlined, StarOutlined, PlayCircleFilled } from '@ant-design/icons';
import { useHomePageStore } from '../../../hooks/homepage';
import { Col, Row, Image, Progress, Card, Rate, Popover, Divider, Modal } from 'antd';
import { LineChart } from '@mui/x-charts/LineChart';
import Footer from '../../../ui-component/footer/Footer';
import { useSearchParams } from 'react-router-dom';
import { dienvien } from './data';
import './style.css';
function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} h ${minutes} m`;
}

const DetailMovie = () => {
  const { detailMovie, dispatchGetDetailMovieRequest, favoriteList, dispatchChangeFavoriteList, rateList, dispatchChangeRateList } =
    useHomePageStore();

  const [searchParam] = useSearchParams();
  const [rate, setRate] = useState(rateList?.find((el) => el?.id === detailMovie?.id)?.star);
  const [overView, setOverView] = useState(detailMovie?.overview?.slice(0, 150));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const OnChangeFavoriteList = useCallback(() => {
    dispatchChangeFavoriteList(detailMovie?.id);
  }, [dispatchChangeFavoriteList, detailMovie?.id]);

  const id = useMemo(() => {
    return searchParam.get('id');
  }, [searchParam]);

  useEffect(() => {
    dispatchGetDetailMovieRequest(id);
  }, [dispatchGetDetailMovieRequest, id]);

  const onChangeRate = useCallback(
    (value) => {
      dispatchChangeRateList({ id: detailMovie?.id, star: value });
      setRate(value);
    },
    [detailMovie?.id, dispatchChangeRateList]
  );

  return (
    <MainCard>
      <div id="container">
        <Row
          gutter={[10, 10]}
          justify={'space-around'}
          id="row-container"
          style={{
            padding: 20,
            backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detailMovie?.poster_path})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat-x',
            color: 'white',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(196, 196, 196, 0.9)'
          }}
        >
          <Col span={8} lg={5} md={24} sm={24} xs={24} xl={8}>
            <Image
              width={300}
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detailMovie?.backdrop_path}`}
              style={{ borderRadius: 20 }}
            />
          </Col>
          <Col span={16} lg={12} md={24} sm={24} xs={24} xl={16}>
            <h2 style={{ marginBottom: 20 }}>
              {detailMovie?.original_title ?? detailMovie?.title}
              <span>({detailMovie?.release_date?.slice(0, 4)})</span>
            </h2>
            <h5 style={{ marginBottom: 20 }}>
              <span>
                {detailMovie?.release_date}
                {detailMovie?.original_language?.toUpperCase()}
              </span>
              <b>
                {' '}
                {detailMovie?.genres?.map((item) => {
                  return `${item?.name},`;
                })}
                {toHoursAndMinutes(detailMovie?.runtime)}
              </b>
            </h5>
            <Row align={'middle'} gutter={[5, 20]}>
              <div style={{ backgroundColor: 'black', borderRadius: 100, padding: 5 }}>
                <Progress
                  type="circle"
                  percent={(detailMovie?.vote_average * 10).toFixed(1)}
                  size={'small'}
                  trailColor="#204529"
                  strokeColor={
                    (detailMovie?.vote_average * 10).toFixed(1) > 70
                      ? '#21d07a'
                      : (detailMovie?.vote_average * 10).toFixed(1) < 30
                      ? '#db2360'
                      : '#c6c82f'
                  }
                  format={() => {
                    return <p style={{ color: 'white', fontWeight: 'bold' }}>{(detailMovie?.vote_average * 10).toFixed(1)}%</p>;
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
                <HeartTwoTone style={{ padding: 0, margin: 0 }} twoToneColor={favoriteList?.includes(detailMovie?.id) ? 'pink' : 'blue'} />
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
                  alignItems: 'center'
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
                  <StarOutlined style={{ padding: 0, margin: 0, color: rateList?.find((el) => el?.id === detailMovie?.id) && 'yellow' }} />
                </Popover>
              </div>

              <Row
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  cursor: 'pointer'
                }}
                onClick={showModal}
              >
                <PlayCircleFilled />
                <p style={{ marginLeft: 5 }}>Play trailer</p>
              </Row>
            </Row>
            <p style={{ marginBottom: 20 }}>{detailMovie?.tagline}</p>
            <h3 style={{ marginBottom: 20 }}>Over view</h3>
            <Row>
              <Col
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setOverView(detailMovie?.overview);
                }}
              >
                {overView}
                <b>{overView?.length === 150 && '...Read more >'}</b>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }} justify={'start'} gutter={[100, 0]}>
              <Col>
                <p>
                  <b>{dienvien[Math.floor(Math.random() * 71 + 1)]?.name}</b>
                </p>
                <span>Director</span>
              </Col>
              <Col>
                <p>
                  <b>{dienvien[Math.floor(Math.random() * 71 + 1)]?.name}</b>
                </p>
                <span>Writer</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider></Divider>
        <Row style={{ marginTop: 50 }} justify={'space-around'} gutter={[30, 50]}>
          <Card title="Status" bordered={false}>
            {detailMovie?.status}
          </Card>
          <Card title="Original Language" bordered={false}>
            {detailMovie?.original_language}
          </Card>
          <Card title="Budget" bordered={false}>
            ${detailMovie?.budget}
          </Card>
          <Card title="Revenue" bordered={false}>
            ${detailMovie?.revenue}
          </Card>
          <Card title="Production_countries" bordered={false}>
            {detailMovie?.production_countries?.map((item) => {
              return `${item?.name},`;
            })}
          </Card>
        </Row>
        <h2 style={{ marginTop: 20 }}>Diễn viên được thanh toán hàng đầu</h2>

        <div id="top-cast">
          {Array.from({ length: 10 }, (_, key) => {
            // so dien vien
            const idCast = dienvien[Math.floor(Math.random() * 71 + 1)]?.id;
            return (
              <Col key={key} className="item-cast">
                <Image src={dienvien[idCast]?.path} style={{ width: 100, height: 'auto' }} alt="image-error" />
                <p style={{ paddingLeft: 5 }}>{dienvien[idCast]?.name}</p>
              </Col>
            );
          })}
        </div>
        <h2 style={{ marginBottom: 20, marginTop: 10 }}>Các công ty sản xuất</h2>

        <Row gutter={[20, 50]} justify={'space-around'}>
          {detailMovie?.production_companies?.map((item) => {
            return (
              <Col key={item?.id} style={{ marginRight: 30 }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item?.logo_path}`}
                  style={{ height: 100, width: 'auto' }}
                  alt="k co anh hien thi"
                />
                <p>{item?.name}</p>
              </Col>
            );
          })}
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
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={() => {}}
        afterClose={() => {
          // const video = document.getElementById('video');
          // // console.log(video);
          // video.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }}
        closeIcon={false}
      >
        <iframe
          id="video"
          width="944"
          height="531"
          src="https://www.youtube.com/embed/BAx2GaMW2qA"
          title="Introduce movie"
          // frameborder="Course"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Modal>
    </MainCard>
  );
};

export default memo(DetailMovie);
