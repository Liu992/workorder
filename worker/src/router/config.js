import Login from '../view/Login';
import ManageSee from '../view/ManageSee';
import ContentBox from '../components/Content';
import SiderDemo from '../components/SiderDemo';
let router = [
    {
        path: '/',
        component: Login,
        exact: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/manage',
        component: SiderDemo,
        exact: false,
        children: [
            {
                path: '/manage/all',
                exact: false,
                component: ManageSee
            },
            {
                path: '/manage/handle/:id',
                exact: false,
                component: ContentBox
            }
        ]
    }
]

export default router