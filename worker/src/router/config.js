import Login from '../view/Login';
import ManageSee from '../view/ManageSee';
import ContentBox from '../components/Content'
let router = [
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/manage/handle',
        component: ContentBox
    },
    {
        path: '/manage/managesee',
        component: ManageSee
    }
]

export default router