// assets
import { IconBuildingCommunity, IconClock, IconFileDescription, IconKey, IconUser } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUser,
  IconClock,
  IconBuildingCommunity,
  IconFileDescription
};

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'movies',
      title: 'menu.requestForm',
      type: 'collapse',
      icon: icons.IconFileDescription,

      children: [
        {
          id: 'popular',
          title: 'menu.submenu.requestForm.leaveRequest',
          type: 'item',
          url: '/movies/popular'
        },
        {
          id: 'now-playing',
          title: 'menu.submenu.requestForm.lateAttendanceRequest',
          type: 'item',
          url: '/movies/now-playing'
        },
        {
          id: 'upcoming',
          title: 'menu.submenu.requestForm.forgotCheckoutReport',
          type: 'item',
          url: '/movies/upcoming'
        },
        {
          id: 'top-rated',
          title: 'menu.submenu.requestForm.topRated',
          type: 'item',
          url: '/movies/top-rated'
        }
      ]
    },
    {
      id: 'organization',
      title: 'menu.organization',
      type: 'collapse',
      icon: icons.IconBuildingCommunity,

      children: [
        {
          id: 'popular',
          title: 'menu.submenu.tvshows.popular',
          type: 'item',
          url: '/tv-show/popular'
        },
        {
          id: 'now-playing',
          title: 'menu.submenu.tvshows.airingtoday',
          type: 'item',
          url: '/tv-show/aring-today'
        },
        {
          id: 'upcoming',
          title: 'menu.submenu.tvshows.ontv',
          type: 'item',
          url: '/tv-show/ontv'
        },
        {
          id: 'top-rated',
          title: 'menu.submenu.tvshows.toprated',
          type: 'item',
          url: '/tv-show/top-rated'
        }
      ]
    },
    {
      id: 'users',
      title: 'menu.users',
      type: 'item',
      url: '/users',
      icon: icons.IconUser
    },
    {
      id: 'search',
      title: 'menu.users',
      type: 'item',
      url: '/search',
      icon: icons.IconUser,
      hide: true
    },
    {
      id: 'detail-actor',
      title: 'menu.users',
      type: 'item',
      url: '/detail-actor',
      icon: null,
      hide: true
    },
    {
      id: 'detail-movie',
      title: 'menu.users',
      type: 'item',
      url: '/detail-movie',
      icon: null,
      hide: true
    },
    {
      id: 'detail-people',
      title: 'menu.users',
      type: 'item',
      url: '/detail-people',
      icon: null,
      hide: true
    },
    {
      id: 'detail-tv',
      title: 'menu.users',
      type: 'item',
      url: '/detail-tv',
      icon: null,
      hide: true
    }
  ]
};

export default pages;
