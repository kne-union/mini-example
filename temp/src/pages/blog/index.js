import {useState} from 'react';
import {Layout, usePreset, Filter, PageList} from '@kne/mini-core';
import toolbar from '../../common/toolbar';
import {List} from '@kne/antd-taro';
import Taro from "@tarojs/taro";
import PackageVersion, {PackageVersionFetch} from '../../common/PackageVersion';

const ArticleList = ({id}) => {
    const {apis} = usePreset();
    return <PackageVersion name="@kne-components/blog">{({version}) => {
        return <PageList {...Object.assign({}, apis.blog.getArticleList)} urlParams={{id, version}} pagination={{
            paramsType: 'urlParams', startCurrent: 0
        }}>
            {({data}) => {
                return <List mode='card'>
                    {data.list.map(({id, label}) => {
                        return <List.Item key={id} onClick={() => {
                            Taro.navigateTo({url: `/pages/blog/detail?id=${id}&title=${label}`});
                        }}>{label}</List.Item>;
                    })}
                </List>;
            }}
        </PageList>;
    }}</PackageVersion>
};

const Blog = () => {
    const [filter, setFilter] = useState({});
    const {apis} = usePreset();
    return <Layout header={{
        title: '博客',
        extra: <PackageVersionFetch {...Object.assign({}, apis.blog.getFolderList)} name="@kne-components/blog"
                                    render={({data}) => {
                                        return <Filter filter={filter} onChange={setFilter}>
                                            <Filter.StateBar name="state" items={data.map(({id, label}) => {
                                                return {
                                                    key: id, children: label
                                                };
                                            })}/>
                                        </Filter>;
                                    }} onRequestSuccess={(data) => {
            const defaultValue = data[0]?.id;
            defaultValue && setFilter({state: defaultValue});
        }}/>
    }} toolBarList={toolbar} className="bg-grey">
        {filter.state && <ArticleList id={filter.state}/>}
    </Layout>;
};

export default Blog;
