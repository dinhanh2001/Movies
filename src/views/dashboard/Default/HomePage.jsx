import { memo, useCallback, useEffect, useState } from 'react';

// material-ui
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { Grid } from '@mui/material';
import styled from 'styled-components';
import MainCard from '~/ui-component/cards/MainCard';
import { HeartTwoTone } from '@ant-design/icons';
import './style.css';
import { Input, Space, Segmented, Progress, Popover, Row, Rate, Col } from 'antd';
import { useHomePageStore } from '../../../hooks/homepage';
import Footer from '../../../ui-component/footer/Footer';
import { useNavigate } from 'react-router';
const { Search } = Input;
import MovieItem from '../../../ui-component/MovieItem';
const HomePage = () => {
  const navigate = useNavigate();
  const {
    // loading,
    favoriteList,
    todayTrendingList,
    inThearsTrailersList,
    popularList,
    popularTrailersList,
    thisWeekTrendingList,
    rateList,
    dispatchGetTodayTrendingList,
    dispatchGetThisWeekTrendingList,
    dispatchGetInThearsTrailersList,
    dispatchGetPopularList,
    dispatchGetPopularTrailersList,
    dispatchGetPeopleLeaderBoardList,
    dispatchChangeFavoriteList,
    dispatchChangeRateList
  } = useHomePageStore();
  const [trendingList, setTrendingList] = useState(todayTrendingList);
  const [popular, setPopular] = useState(popularTrailersList);
  const [urlBackground, setUrlBackground] = useState(popular[0]?.backdrop_path);

  const TrailersLayOut = styled.div`
    background-image: url('https://www.themoviedb.org/t/p/w220_and_h330_face/${urlBackground}');
    height: 400px;
    background-repeat: repeat-x;
    background-size: cover;
  `;

  useEffect(() => {
    dispatchGetTodayTrendingList();
    dispatchGetThisWeekTrendingList();
    dispatchGetInThearsTrailersList();
    dispatchGetPopularList();
    dispatchGetPopularTrailersList();
    dispatchGetPeopleLeaderBoardList();
  }, [
    dispatchGetInThearsTrailersList,
    dispatchGetPopularList,
    dispatchGetPopularTrailersList,
    dispatchGetThisWeekTrendingList,
    dispatchGetTodayTrendingList,
    dispatchGetPeopleLeaderBoardList
  ]);

  const onChangeTrending = useCallback(
    (value) => {
      if (value === 'Today') {
        setTrendingList(todayTrendingList);
        return;
      }
      // this week
      setTrendingList(thisWeekTrendingList);
    },
    [thisWeekTrendingList, todayTrendingList] // dependency
  );
  const onChangeTrailers = useCallback(
    (value) => {
      if (value === 'Movies') {
        setPopular(popularTrailersList);
        return;
      }
      setPopular(inThearsTrailersList);
    },
    [inThearsTrailersList, popularTrailersList]
  );
  const onSearch = useCallback(
    (keyword) => {
      navigate(`/search?keyword=${keyword?.target?.value}`);
    },
    [navigate]
  );

  const onDetail = useCallback(
    (id) => {
      navigate(`/detail-movie?id=${id}`);
    },
    [navigate]
  );
  const OnChangeFavoriteList = useCallback(
    (id) => {
      dispatchChangeFavoriteList(id);
    },
    [dispatchChangeFavoriteList]
  );

  const onChangeRate = useCallback(
    (value, id) => {
      dispatchChangeRateList({ id: id, star: value });
    },
    [dispatchChangeRateList]
  );
  return (
    <MainCard>
      <div>
        <HomeLayout className="bg-home">
          <h2>Welcome. Millions of movies, TV shows and people to discover. Explore now.</h2>
          <Search
            placeholder="Search for a movie,tv show,person..."
            allowClear
            enterButton="Search"
            size="large"
            // value={keyword} ant design ,mui
            onPressEnter={onSearch}
          />
        </HomeLayout>
      </div>

      <div className="trending">
        <h3>Trending</h3>
        <Space direction="vertical">
          <Segmented size="large" options={['Today', 'This Week']} onChange={onChangeTrending} />
        </Space>
      </div>
      <div className="list-trending">
        <div className="trending-items">
          {trendingList &&
            trendingList?.map((item) => {
              return <MovieItem item={item} key={item?.id} />;
            })}
        </div>
      </div>
      <div className="Latest-trailers">
        <div id="latest-title">
          <h2>Latest Trailers</h2>
          <Space direction="vertical">
            <Segmented size="large" options={['Movies', 'TV']} onChange={onChangeTrailers} />
          </Space>
        </div>
        <TrailersLayOut className="lastest-items">
          {popular &&
            popular?.map((item, id) => {
              return (
                <Col
                  className="lastest-item"
                  key={id}
                  onClick={() => {
                    onDetail(item?.id);
                  }}
                  onMouseMove={() => {
                    // setUrlBackground(item?.backdrop_path);
                  }}
                >
                  <div id="image-item">
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item?.poster_path}`} alt="" srcSet="" />
                    <div className="pop-comfirm">
                      <Popover
                        placement="bottomRight"
                        title={''}
                        content={() => {
                          return (
                            <>
                              <Row
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  OnChangeFavoriteList(item?.id);
                                }}
                              >
                                <b>Yêu thích</b>
                                <HeartTwoTone
                                  twoToneColor={Object.values(favoriteList)?.includes(item?.id) ? 'pink' : 'black'}
                                  style={{ fontSize: 20, marginLeft: 5 }}
                                />
                              </Row>
                              <Row>
                                <b>Đánh giá</b>
                                <Rate
                                  allowHalf
                                  value={Object.values(rateList)?.find((el) => el?.id === item?.id)?.star ?? 0}
                                  onChange={(value) => {
                                    onChangeRate(value, item?.id);
                                  }}
                                />
                              </Row>
                            </>
                          );
                        }}
                        arrow={false}
                      >
                        <MoreHorizIcon />
                      </Popover>
                    </div>
                  </div>
                  <div className="lastest-item-content">
                    <h3>{item?.title ?? item?.original_title ?? item?.original_name}</h3>
                    {/* <h5>{item?.original_title ?? item?.title ?? item?.original_name}</h5> */}
                  </div>
                </Col>
              );
            })}
        </TrailersLayOut>
      </div>
      <div id="popular-title">
        <h2> What`s Popular</h2>
      </div>
      <div className="list-trending">
        <div className="trending-items">
          {popularList &&
            popularList?.map((item) => {
              return <MovieItem item={item} key={item?.id} />;
            })}
        </div>
      </div>

      <div id="rate-people">
        <div id="rate-header">
          <div>
            <h2>LeaderBroard</h2>
          </div>
          <div style={{ width: 800 }} id="title-rate">
            <div className="test">
              <Progress
                percent={100}
                showInfo={false}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                trailColor="#ffffff"
                style={{ width: 8 }}
              />
              <span>All Time Edits</span>
            </div>
            <div className="test">
              <Progress
                percent={100}
                showInfo={false}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                trailColor="#ffffff"
                style={{ width: 8 }}
              />
              <span>Edits This Week</span>
            </div>
          </div>
        </div>
        <Row id="items-board">
          <Col>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={50} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={95} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/hjvyN4SrXqXy316GkbOshW8sGXJ.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={45} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/uJngdDd0WzNYGwlmBGYrDxp1akP.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/wi90lJSpmdT3N9bRwdIlhnvC5Gb.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
          </Col>
          <Col>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/fiTMX152UpCyfDqxy9gVdRDSDZW.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
            <div className="board-item">
              <img src="https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" className="image-board" />
              <div>
                <p>RuiZafon</p>
                <Progress percent={20} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} trailColor="#ffffff" />
                <Progress percent={70} showInfo={false} strokeColor={{ '0%': '#fcbe6f', '100%': '#da3e64' }} trailColor="#ffffff" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </MainCard>
  );
};
const HomeLayout = styled.div``;

export default memo(HomePage);
