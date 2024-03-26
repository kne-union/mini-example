import {useRouter} from "@tarojs/taro";
import {Layout, usePreset} from '@kne/mini-core';
import '@tarojs/taro/html.css'
import Detail from '../../common/Detail';

const BlogDetail = () => {
    const {params} = useRouter();
    const {apis} = usePreset();
    return <Layout header={{title: params.title || '文章详情页'}}>
        <Detail api={apis.blog.getBlogDetail} id={params.id} name="@kne-components/blog"/></Layout>
};

export default BlogDetail;
