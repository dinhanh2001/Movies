import { memo } from 'react';
import { Col, Row } from 'antd';
// project imports
import './styles.css';
const Footer = () => {
  return (
    <Row id="content" justify={'center'} gutter={[10, 20]}>
      <Col id="Col-image" span={4} xs={12} sm={24} md={12} lg={4} xl={4}>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt=""
        />
        {/* <div>
          <button>JOIN THE COMMUNITY</button>
        </div> */}
      </Col>
      <Col span={4} xs={12} sm={12} md={12} lg={4} xl={4}>
        <h3>THE BASICS</h3>
        <h6>Giới thiệu về TMDB</h6>
        <h6>Contact Us</h6>
        <h6>Support Forums</h6>
        <h6>API</h6>
        <h6>System Status</h6>
      </Col>
      <Col span={4} xs={12} sm={12} md={12} lg={4} xl={4}>
        <h3>Get INVOLVED</h3>
        <h6>
          <Cc:noie></Cc:noie>ONTRIBUTION BIBLE
        </h6>
        <h6>Add New Mobie</h6>
        <h6>Add New TV Show</h6>
      </Col>{' '}
      <Col span={4} xs={12} sm={12} md={12} lg={4} xl={4}>
        <h3>COMMUNITY</h3>
        <h6>Guilines</h6>
        <h6>Disscussions</h6>
        <h6>Leaderboard</h6>
      </Col>{' '}
      <Col span={4} xs={12} sm={12} md={12} lg={4} xl={4}>
        <h3>LEGAL</h3>
        <h6>Terms of Use</h6>
        <h6>API Terms of Use</h6>
        <h6>Privacy Policy</h6>
        <h6>DMCA Policy</h6>
      </Col>
    </Row>
  );
};

export default memo(Footer);
