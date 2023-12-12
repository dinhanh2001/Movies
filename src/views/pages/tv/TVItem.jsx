import { memo, useCallback, useState } from 'react';
import { Col, Progress, Popover, Row, Rate, Divider } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './styles.css';
import { useNavigate } from 'react-router';
import { useHomePageStore } from '../../../hooks/homepage';
const TVItem = ({ item }) => {
  const { favoriteList, dispatchChangeFavoriteList, dispatchChangeRateList, rateList } = useHomePageStore();
  const [rate, setRate] = useState(rateList?.find((el) => el?.id === item?.id)?.star);
  const navigate = useNavigate();
  const onDetail = useCallback(
    (id) => {
      navigate(`/detail-tv?id=${id}`);
    },
    [navigate]
  );
  const onChangeRate = useCallback(
    (value) => {
      dispatchChangeRateList({ id: item?.id, star: value });
      setRate(value);
    },
    [dispatchChangeRateList, item?.id]
  );
  const OnChangeFavoriteList = useCallback(() => {
    dispatchChangeFavoriteList(item?.id);
  }, [dispatchChangeFavoriteList, item?.id]);
  return (
    <Col
      //   span={20}
      //   xs={22}
      //   sm={12}
      //   md={8}
      //   lg={6}
      //   xl={4}
      className="item-list"
    >
      <div className="pop-comfirm">
        <Popover
          placement="bottomRight"
          title={''}
          content={() => {
            return (
              <>
                <Row style={{ cursor: 'pointer', marginBottom: 10 }} onClick={OnChangeFavoriteList}>
                  {' '}
                  <b>Yêu thích</b>
                  <HeartTwoTone
                    twoToneColor={favoriteList?.includes(item?.id) ? 'pink' : 'black'}
                    style={{ fontSize: 20, marginLeft: 5 }}
                  />
                </Row>
                <Divider style={{ margin: '10px 0' }}></Divider>

                <Row>
                  <p>Đánh giá</p>
                  <Rate allowHalf value={rate} onChange={onChangeRate} />
                </Row>
              </>
            );
          }}
          arrow={false}
        >
          <MoreHorizIcon />
        </Popover>
      </div>
      <Col
        id="item"
        style={{ padding: 0 }}
        onClick={() => {
          onDetail(item?.id);
        }}
      >
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item?.backdrop_path}`}
          alt=""
          style={{ width: 200, height: 'auto', borderTopLeftRadius: 5, borderTopRightRadius: 6 }}
        />
        <Progress
          type="circle"
          percent={(item?.vote_average * 10).toFixed(1)}
          size={50}
          trailColor="#204529"
          strokeColor={
            (item?.vote_average * 10).toFixed(1) > 70 ? '#21d07a' : (item?.vote_average * 10).toFixed(1) < 30 ? '#db2360' : '#c6c82f'
          }
          className="progress-item"
          format={() => {
            return <p style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>{(item?.vote_average * 10).toFixed(1)}%</p>;
          }}
        />
        <h4>{item?.original_name ?? item?.title}</h4>
        <span>{item?.first_air_date}</span>
      </Col>
    </Col>
  );
};
export default memo(TVItem);
