import { memo, useCallback } from 'react';
import { Col } from 'antd';
// import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import './style.css';
import { useHomePageStore } from '../../../hooks/homepage';
const RenderItem = ({ type }) => {
  const navigate = useNavigate();

  const { searchList } = useHomePageStore();

  const onDetail = useCallback(
    (type, id) => {
      switch (type) {
        case 'tv': {
          navigate(`/detail-tv?id=${id}`); // chuyen huong
          break;
        }
        case 'movie': {
          navigate(`/detail-movie?id=${id}`);
          break;
        }
        case 'person': {
          navigate(`/detail-people?id=${id}`);
          break;
        }
        default:
          throw new Error('NO navigate is handled');
      }
    },
    [navigate]
  );
  if (searchList?.results?.length === 0) {
    return <p>There are no {type} that matched your query.</p>;
  }
  return (
    <div>
      {searchList &&
        searchList?.results?.map((item) => {
          switch (type) {
            case 'tv':
              return (
                <Col
                  key={item?.id}
                  style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, cursor: 'pointer' }}
                  onClick={() => {
                    onDetail(type, item?.id);
                  }}
                >
                  <img
                    src={
                      !(item?.backdrop_path === null)
                        ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item?.backdrop_path}`
                        : 'data:image/png;base64,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'
                    }
                    alt="Không tồn tại ảnh"
                    style={{ height: 120, width: 80, marginRight: 20 }}
                  />
                  <div>
                    <h6>{item?.original_name}</h6>
                    <span>{item?.first_air_date}</span>
                    <p>{item?.overview?.slice(0, 50)}</p>
                  </div>
                </Col>
              );
            case 'movie':
              return (
                <Col
                  key={item?.id}
                  style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, cursor: 'pointer' }}
                  onClick={() => {
                    onDetail(type, item?.id);
                  }}
                >
                  <img
                    src={
                      !(item?.backdrop_path === null)
                        ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item?.backdrop_path}`
                        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAAgVBMVEXd3d3////e3t709PT8/PxTU1Pl5eVISEhSUlKbm5u+vr5OTk7h4eHa2tqoqKjo6OjS0tJCQkKzs7Pu7u6BgYFzc3OwsLBFRUWGhoZ+fn5qampgYGCioqLDw8O5ubmpqalcXFzKyso9PT2UlJSVlZU0NDR3d3cvLy83NzceHh4oKCg44IHMAAAH90lEQVR4nO2aC3urKBCGBfEOUUO84SWxpvbs/v8fuIO3mLbby9nt00OfeZsYg8TO5wwwIpaFIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC/Fio5ruN+B3om3y3df+FN403Wtm7GKnunXgzOR4p5W9hpjRtsUjeQXy3lb+FcIPC8aPIj/w7IgcKoDRy0kaK6QoY5TeqhWkVWsMLtDI/DaSgXBgWj1qY50QOcHGe4zu+f3G8gysAs6TRWZjjeGnh3VF4kVYWFd6vxnbjmFPLqLZGLd3GnGgsy+q0pywjkFXr0iA/n8+JgW0MPOa3ErxyB4c4jDLbde3yEfzZu8IoYdYsLAqf280t8JiXxVTEpQfdZk/hIkDo6q0R3ITdl9NZmBQgrLg4UWIJqAHqTelC3hNmWXH5WKRpIl3puoJTUyJyJ2zyxeqQTZjg4SHPz6eqGgeqy80TdscWirArY+nWaZQqU8JQcydsl+5uwnTwCUvU8E1xQY3p9ffCdJq/mk3XXlHvgrQ68j0V6xrfau7H2YTpLITqzEmX0k3Y3PQ4CIsK8JjW+N0mf4ybMN5DZugNri7VvTok9tHcxvQbbl9oFzkXL4jNULYX5kWRV052a49Bzr90HrrtuZy7bQG5Y+B+t8kfYycsgbT3JkyAsEILE1P2C2831BUMFAaheBPGhU6Cda44E7tctpHjm+kx30k3YdSD2zHVduFCF7YNeCwaDGxjoOQWihRk+g4kU6l+p14Bd2y+4xSNIf39s1AsFofASAy9ov/iltrMNhZtbQzKuQ7FZ6qcyExhDw/F40nOwrhIH6YY3KFnCwzsPGgSBM21W5oQFQF8bYKNJmgGCE4DPUaplDLe+jwh9Ve5ADux3U/CjOs8qJhYyiHznW6Zl0K9MXWAnu8zrVt6T+9n3ECYHsGNE/b2sKvlGuoxFIbCvhcUZrawqcvnYr5pnp7RzjMe5guzFiWb/4TYZklNFjYX0VXgPNE4TeZY5gvjbszdG3yakfsBwmhyODTAYeacUJD2E4S5/aW4PV73Li3/IaHI2xpyXWdZFeHU/fIAhpqa3Yulx3D7Wgta13vUPedLT2msMGta8gAe83ZrPi49n1dCmOwxLoISyI/HY9cdZ/KyPJXBNAIYKww8MxaRpwTnLuVrZ69SPxqnZ8/GCqNUnHwnUokOvGVSgAoFYiqhJzqMFQZaRi8CYRySj5VEeZE3Tl2mocIs3aOXF1WPiR6Rl96fJuNFXcrpeYuxwiB1SpKk1+sTtye2wup7XaQL3NC8KW4/jOcUngrKpwa2hiL0JPNNC9TsTJ2lopNjhLWfeNOP/dwp9xBua2IoxnrFALxc6Of5bpWw/g6jtj4Ut55xwvygO+bwt7ymjwn4mEtg2wW+aXP3U9I7Pyladv39KtO1XL8MEQYdxrzC1PefP+R7Bf/WK/7xi4/mFabzHYr/HlrZ8nzsz9cFoZi+sn77X0lNCUW4sWzOh49yPjehGc/H9HAM/fsnMGIxN6Xzspvl5v89LJDF//huY2JevvxhU7kwwl8IgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAI8nMQPxTL/qFY5IeCwt6E/U6Nl0UvSt4/77/yGWFs+pv/HWPTJ5t32HZsKplL12/LlrHlt8tPl4K52rx7q0J21bbTfJGwRQlL8kXRVjKLYZuyRaN9kPPx9eBqG9sE7FyyKHu2e3/4i4QtluclWUy3G5sM7qJrqXOVm8VSuS8Munf0NSfHp7R4YPbQQUkJG71HDlFmE5KMMbHLFiqLGs7a67KvEDYZJCU5nmzJbJvYtlCWfUlsKGTMho1+OYLpT12TZ5RJfTVsCbXjqZKt99foGn81+rx9xaqnA2PjI8TC+JST/iIDRbhKiMz+Bp1y+EsSS4nP6Pq4sOkS5xcVh97o8aAk1+D0WA1PqmvH8SqrumqdjF7/zpKmVo0d1FU38mAA++NMlbJSdZg8ZFWllPZ1os8WhgEByaeEhV3DYHMgrD2eyXgmsmBllth2f9AOPI6SVVXyRR7TpgyDS7qMXa/5QILAVjaJpFRV4/VjSIaSM+LY4iLjsbmAQ7PspK9HUxLZ1RBKrc+uAYkScNKT1KcMtcf6EvZBGCHHA3zNz0SFhHhJGqiBkKYjYUkqu/cCFXyNME18LGlXkvMwCZMgrJA0y/vErQRYXybMt9uM2MM4QgRlp0xfjhPYGwwQWuGFNEdS93AomdpeGDBoReATEAY1wVmTsAw85jUDsQrtLfLLqx6y4Eqs9IuEgRHcLs9wAQ9lOMpskLVLPBGDs3p3FETIIGCea0WxpbrIle3oqlwbrViSpHY3tvUqbOn0WvCYUNp53VRRCzseSeLIpmoV6XwQ1pHYlSo5nkh++RJh00h0LhQLB5IHTDnlgY11nKctz35d5SBIV6iYlBerj6KWtF7dlrGdJZXLhodS/5KLjOQdGZN1lKgfHhQbQtid9rYNORdZTIK0ljZ8zeCflzacZLoC/7+wXc/Nnhe8Xu2V0tuW3YZn9nw0e+23XziO3czaBlDG1uH3NmRvo+wmYh3Ll2GZ7Y+QdXBfsxZyq8Tuz/fJ5OPjoUiWJOMuQdonVGwbfVcL14xkzavuXEZ2PyXr+L+lYNvR7Ux3nv0/he0t2dIQsjPkuUM3Natn9znYXt+qfMtEb3J2jv1kOP4D7V6wPiDisTwAAAAASUVORK5CYII='
                    }
                    alt="Không tồn tại ảnh"
                    style={{ height: 120, width: 80, marginRight: 20 }}
                  />
                  <div>
                    <h4>{item?.original_title}</h4>
                    <span>{item?.release_date}</span>
                    <p>{item?.overview?.slice(0, 50)}</p>
                  </div>
                </Col>
              );
            case 'person':
              return (
                <Col
                  key={item?.id}
                  style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, cursor: 'pointer' }}
                  onClick={() => {
                    onDetail(type, item?.id);
                  }}
                >
                  <img
                    src={
                      !(item?.profile_path === null)
                        ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item?.profile_path}`
                        : 'data:image/png;base64,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'
                    }
                    alt="Không tồn tại ảnh"
                    style={{ height: 120, width: 80, marginRight: 20 }}
                  />
                  <div>
                    <h6>{item?.name}</h6>
                    <span>{item?.known_for_department}</span>
                    {item?.known_for?.map((it) => {
                      return <span key={it?.id}>{it?.original_title ?? it?.title}</span>;
                    })}
                  </div>
                </Col>
              );
            case 'company':
              return (
                <div key={item?.id} style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, cursor: 'pointer' }}>
                  {/* <img
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item?.profile_path}`}
                    alt="Không tồn tại ảnh"
                    style={{ height: 120, width: 80 }}
                  /> */}
                  <div>
                    <h4>{item?.name}</h4>
                  </div>
                </div>
              );
            case 'collection':
              return (
                <div key={item?.id} style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, cursor: 'pointer' }}>
                  <img
                    src={
                      !(item?.poster_path === null)
                        ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item?.poster_path}`
                        : 'data:image/png;base64,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'
                    }
                    alt="Không tồn tại ảnh"
                    style={{ height: 120, width: 80, marginRight: 20 }}
                  />
                  <div>
                    <h4>{item?.name}</h4>
                  </div>
                </div>
              );
            case 'keyword':
              return (
                <div key={item?.id} style={{ cursor: 'pointer' }}>
                  <p>{item?.name}</p>
                </div>
              );
            case 'multi':
              return (
                <div key={item?.id} style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, cursor: 'pointer' }}>
                  <img
                    src={
                      !(item?.backdrop_path === null)
                        ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item?.backdrop_path}`
                        : 'data:image/png;base64,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'
                    }
                    alt="Không tồn tại ảnh"
                    style={{ height: 120, width: 80, marginRight: 20 }}
                  />
                </div>
              );
            default:
              return <></>;
          }
        })}
    </div>
  );
};

export default memo(RenderItem);
