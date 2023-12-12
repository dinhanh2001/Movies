import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationStore } from '~/hooks/authentication';

// project imports
import MainLayout from '~/layout/MainLayout';
import Loadable from '~/ui-component/Loadable';

// dashboard routing
const HomePage = Loadable(lazy(() => import('~/views/dashboard/Default/HomePage')));

// sample page routing
const UserPage = Loadable(lazy(() => import('~/views/pages/users')));
const Shifts = Loadable(lazy(() => import('~/views/pages/shifts')));
const MoviesPopular = Loadable(lazy(() => import('~/views/pages/movies/MoviesPopular')));
const MoviesUpcoming = Loadable(lazy(() => import('~/views/pages/movies/MoviesUpcoming')));
const MoviesNowPlaying = Loadable(lazy(() => import('~/views/pages/movies/MoviesNowPlaying')));
const TopRated = Loadable(lazy(() => import('~/views/pages/movies/TopRated')));

const SearchHomePage = Loadable(lazy(() => import('~/views/dashboard/Default/Search')));

const TvAringToday = Loadable(lazy(() => import('~/views/pages/tv/TvAringToday')));
const TvPopular = Loadable(lazy(() => import('~/views/pages/tv/TvPopular')));
const TvTopRated = Loadable(lazy(() => import('~/views/pages/tv/TvTopRared')));
const TvOnTv = Loadable(lazy(() => import('~/views/pages/tv/TvOnTv')));

///detail

const DetailActor = Loadable(lazy(() => import('~/views/pages/details/DetailActor')));
const DetailMovie = Loadable(lazy(() => import('~/views/pages/details/DetailMovie')));
const DetailPeople = Loadable(lazy(() => import('~/views/pages/details/DetailPeople')));
const DetailTV = Loadable(lazy(() => import('~/views/pages/details/DetailTV')));
function ProtectedRoute() {
  // Kiểm tra trạng thái đăng nhập ở đây
  const { authenticationState } = useAuthenticationStore(); // Thay checkLoginStatus bằng hàm kiểm tra trạng thái đăng nhập thực tế

  return authenticationState.loginInfo ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <HomePage />
        }
      ]
    },
    {
      path: 'search', //(keyword) => `search?keyword=${keyword}`
      element: <SearchHomePage />
    },
    {
      path: 'detail-actor', //(keyword) => `search?keyword=${keyword}`
      element: <DetailActor />
    },
    {
      path: 'detail-movie', //(keyword) => `search?keyword=${keyword}`
      element: <DetailMovie />
    },
    {
      path: 'detail-people', //(keyword) => `search?keyword=${keyword}`
      element: <DetailPeople />
    },
    {
      path: 'detail-tv', //(keyword) => `search?keyword=${keyword}`
      element: <DetailTV />
    },
    {
      path: 'users',
      element: <UserPage />
    },
    {
      path: 'shifts',
      element: <Shifts />
    },
    {
      path: 'tv-show',
      children: [
        {
          path: 'popular',
          element: <TvPopular />
        },
        {
          path: 'aring-today',
          element: <TvAringToday />
        },
        {
          path: 'ontv',
          element: <TvOnTv />
        },
        {
          path: 'top-rated',
          element: <TvTopRated />
        }
      ]
    },
    {
      path: 'movies',
      children: [
        {
          path: 'popular',
          element: <MoviesPopular />
        },
        {
          path: 'now-playing',
          element: <MoviesNowPlaying />
        },
        {
          path: 'upcoming',
          element: <MoviesUpcoming />
        },
        {
          path: 'top-rated',
          element: <TopRated />
        }
      ]
    }
  ]
};

export default MainRoutes;
