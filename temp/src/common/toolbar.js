import classnames from 'classnames';
import {Icon} from '@kne/antd-taro';

const toolbar = [{
    key: '/pages/index/index',
    icon: (active) => active ? <Icon type="tabgongzuotai-xuanzhong" className={classnames('iconfont')}/> :
        <Icon type="tabgongzuotai-moren" className={classnames('iconfont')}/>,
    title: '首页',
    pagePath: '/pages/index/index'
}, {
    key: '/pages/components/index',
    icon: (active) => active ? <Icon type="tabzhiwei-xuanzhong" className={classnames('iconfont')}/> :
        <Icon type="tabzhiwei-moren" className={classnames('iconfont')}/>,
    title: '组件示例',
    pagePath: '/pages/components/index'
}, {
    key: '/pages/blog/index',
    icon: <Icon type="pengyouquan" className={classnames('iconfont')}/>,
    title: '博客',
    pagePath: '/pages/blog/index'
}, {
    key: '/pages/about/index',
    icon: <Icon type="jiaoyujingli" className={classnames('iconfont')}/>,
    title: '关于我们',
    pagePath: '/pages/about/index'
}];

export default toolbar;
