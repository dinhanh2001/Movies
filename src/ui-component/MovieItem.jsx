import { Progress, Popover, Row, Rate, Col, Divider } from 'antd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { HeartTwoTone } from '@ant-design/icons';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import './style.css';
import { useHomePageStore } from '../hooks/homepage';
import { useState } from 'react';

const MovieItem = ({ item }) => {
  const { favoriteList, dispatchChangeFavoriteList, rateList, dispatchChangeRateList } = useHomePageStore();
  const [rate, setRate] = useState([...rateList]?.find((el) => el?.id === item?.id)?.star);
  const navigate = useNavigate();
  const OnChangeFavoriteList = useCallback(() => {
    dispatchChangeFavoriteList(item?.id);
  }, [dispatchChangeFavoriteList, item?.id]);

  const onChangeRate = useCallback(
    (value) => {
      dispatchChangeRateList({ id: item?.id, star: value });
      setRate(value);
    },
    [dispatchChangeRateList, item?.id]
  );

  const OnDetail = useCallback(
    // chuyen huong toi detail
    () => {
      navigate(`/detail-movie?id=${item?.id}`);
    },
    [item?.id, navigate]
  );
  return (
    <div className="trending-item" key={item?.id}>
      <Col onClick={OnDetail}>
        <img className="image-trending" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item?.backdrop_path}`} alt=""></img>
      </Col>

      <Progress
        type="circle"
        percent={(item?.vote_average * 10).toFixed(1)}
        size={50}
        trailColor="#204529"
        strokeColor={
          (item?.vote_average * 10).toFixed(1) > 70 ? '#21d07a' : (item?.vote_average * 10).toFixed(1) < 30 ? '#db2360' : '#c6c82f'
        } // '#c6c82f' vang '#db2360' hong '#21d07a'xanh
        className="progress-item"
        format={() => {
          return <p style={{ color: 'white', fontWeight: 'bold' }}>{(item?.vote_average * 10).toFixed(1)}%</p>;
        }}
      />
      <div className="pop-div">
        <Popover
          placement="bottomRight" // vi tri
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
          arrow={true}
        >
          <MoreHorizIcon />
        </Popover>
      </div>
      <Row>
        <b style={{ marginTop: 10 }}>{item?.title ?? item?.name ?? item?.original_name}</b>
      </Row>
      <p style={{ marginTop: 10 }}>
        <span>{item?.release_date}</span>
      </p>
    </div>
  );
};
export default memo(MovieItem);
