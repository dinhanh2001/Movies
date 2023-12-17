import { memo, useCallback, useEffect, useState, useMemo } from 'react';

// material-ui
// import { Grid } from '@mui/material';
import MainCard from '~/ui-component/cards/MainCard';
import { useSearchParams } from 'react-router-dom';
import './style.css';
import { Input } from 'antd';
import { useHomePageStore } from '../../../hooks/homepage';
import Footer from '../../../ui-component/footer/Footer';
const { Search } = Input;
import { Radio, Tabs } from 'antd';
import RenderItem from './RenderItem';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

const SearchHomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();
  const keyword = useMemo(() => searchParams?.get('keyword'), [searchParams]);
  const [type, setType] = useState('movie');
  const [page, setPage] = useState(1);
  const { dispatchSearchHomePageList, searchList } = useHomePageStore();

  useEffect(() => {
    dispatchSearchHomePageList({ keyword, type, page });
  }, [dispatchSearchHomePageList, keyword, page, type]);

  const onChangeContent = useCallback(
    (activeKey) => {
      setType(activeKey);
      setSearchParams(`keyword=${keyword}&type=${activeKey}`);
    },
    [keyword, setSearchParams]
  );

  const tabs = useMemo(
    () => [
      {
        label: `Movies`,
        key: 'movie',
        children: <RenderItem type={type} />
      },
      {
        label: `TV Shows`,
        key: 'tv',
        children: <RenderItem type={type} />
      },

      {
        label: `People`,
        key: 'person',
        children: <RenderItem type={type} />
      },
      {
        label: `Companies`,
        key: 'company',
        children: <RenderItem type={type} />
      },
      {
        label: `Collections`,
        key: 'collection',
        children: <RenderItem type={type} />
      },
      {
        label: `Keywords`,
        key: 'keyword',
        children: <RenderItem type={type} />
      }
      // {
      //   label: `Networks`,
      //   key: 'multi',
      //   children: <RenderItem type={type} /> // k co api
      // }
    ],
    [type]
  );

  const onChangePage = useCallback(
    (_, page) => {
      setPage(page);
      setSearchParams(`keyword=${keyword}&type=${type}&page=${page}`);
      dispatchSearchHomePageList({ keyword: keyword, type: type, page });
    },
    [dispatchSearchHomePageList, keyword, setSearchParams, type]
  );

  const onChangeKeyword = useCallback(
    (input) => {
      dispatchSearchHomePageList({ keyword: input?.target?.value, type: type, page });
      setSearchParams(`keyword=${input?.target?.value}&type=${type}`);
    },
    [dispatchSearchHomePageList, page, setSearchParams, type]
  );

  return (
    <MainCard>
      <Search
        placeholder="Search for a movie,tv show,person..."
        allowClear
        enterButton="Search"
        size="large"
        style={{ marginBottom: 10 }}
        onPressEnter={onChangeKeyword}
      />
      <Radio.Group value={'left'} style={{ marginBottom: 8 }}>
        <Radio.Button value="left">Search Results</Radio.Button>
      </Radio.Group>

      <Tabs
        defaultActiveKey={tabs[0].key}
        activeKey={searchParams?.get('type') ?? type}
        tabPosition={'left'}
        items={tabs}
        onChange={onChangeContent}
        style={{ marginBottom: 20 }}
      />
      {searchList?.results?.length > 0 && (
        <PaginationWrapper>
          <Pagination count={searchList?.total_pages} page={page} color="primary" onChange={onChangePage} />
        </PaginationWrapper>
      )}
      <Footer />
    </MainCard>
  );
};

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

export default memo(SearchHomePage);
