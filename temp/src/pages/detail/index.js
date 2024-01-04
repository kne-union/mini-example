import {Layout} from '@kne/mini-core';
import componentsDoc from 'components-doc';
import {useRouter} from '@tarojs/taro';
import {Card} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import Prism from 'prismjs';

const escape2Html = (str) => {
    const arrEntities = {
        'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'
    }
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t]
    })
}

const Components = () => {
    const {params} = useRouter();
    const detailInfo = componentsDoc.example.list[params.index];
    const scopeHtml = Prism.highlight(detailInfo.scope, Prism.languages.javascript, 'jsx');
    const codeHtml = Prism.highlight(detailInfo.code, Prism.languages.javascript, 'jsx');

    return <Layout header={{title: detailInfo.title}}>
        <Card title="说明">
            {detailInfo.description}
        </Card>
        <Card title="示例">
            {detailInfo.component()}
        </Card>
        <Card title="源代码">
            <View dangerouslySetInnerHTML={{
                __html: `<div class="language-jsx">${scopeHtml}<br/>${escape2Html(codeHtml)}</div>`
            }} className='html-content'/>
        </Card>
    </Layout>;
};

export default Components;
