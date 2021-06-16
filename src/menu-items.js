import NavigationOutlinedIcon from '@material-ui/icons/NavigationOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import ColorizeOutlinedIcon from '@material-ui/icons/ColorizeOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

const icons = {
    DashboardOutlinedIcon: DashboardOutlinedIcon,
    NavigationOutlinedIcon: NavigationOutlinedIcon,
    InsertChartOutlinedRoundedIcon: InsertChartOutlinedRoundedIcon,
    ColorizeOutlinedIcon: ColorizeOutlinedIcon,
    LibraryBooksOutlinedIcon: LibraryBooksOutlinedIcon,
};

export default {
    items: [
        {
            id: 'navigation',
            type: 'group',
            icon: icons['NavigationOutlinedIcon'],
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    icon: icons['DashboardOutlinedIcon'],
                    url: '/',
                },
                {
                    id: 'charts',
                    title: 'Charts',
                    type: 'item',
                    icon: icons['InsertChartOutlinedRoundedIcon'],
                    url: '/charts'
                },
                {
                    id: 'vaccination',
                    title: 'Vaccination',
                    type: 'item',
                    icon: icons['ColorizeOutlinedIcon'],
                    url: '/vaccination'
                },
                {
                    id: 'resources',
                    title: 'Resources',
                    type: 'item',
                    icon: icons['LibraryBooksOutlinedIcon'],
                    url: '/resources'
                },
            ],
        },
    ],
};
