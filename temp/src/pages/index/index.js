import {Layout} from '@kne/mini-core';
import {View} from '@tarojs/components';
import toolbar from '../../common/toolbar';
import componentsDoc from 'components-doc';
import {Card} from '@kne/antd-taro';

const Index = () => {
    return <Layout header={{title: componentsDoc.name}} toolBarList={toolbar}>
        <Card title="概述">
            <View dangerouslySetInnerHTML={{ __html: componentsDoc.summary }} className='html-content' />
        </Card>
        <Card title="API">
            <View dangerouslySetInnerHTML={{ __html: componentsDoc.api }} className='html-content md-content' />
        </Card>
    </Layout>;
};

export default Index;
