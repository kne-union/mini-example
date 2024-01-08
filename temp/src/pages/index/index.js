import {Layout} from '@kne/mini-core';
import {View} from '@tarojs/components';
import toolbar from '../../common/toolbar';
import componentsDoc from 'components-doc';
import {Card} from '@kne/antd-taro';
import escape2Html from '../../common/escape2Html';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';

const escapeMd = (html) => {
    let target = escape2Html(html);
    ['js', 'jsx', 'json', 'shell', 'css'].forEach((codeType) => {
        let type = codeType;
        if (!Prism.languages[type]) {
            type = 'txt';
        }
        target = target.replace(new RegExp(`<pre><code class="language-${codeType}">([\\s\\S]*?)<\\/code><\\/pre>`, 'gi'), (str, target) => {
            return `<div class="language-${type}">${escape2Html(Prism.highlight(target, Prism.languages[type], type))}</div>`;
        });
    });
    return target;
};

const Index = () => {
    return <Layout header={{title: componentsDoc.name}} toolBarList={toolbar}>
        <Card title="概述">
            <View dangerouslySetInnerHTML={{__html: escapeMd(componentsDoc.summary)}} className='html-content'/>
        </Card>
        <Card title="API">
            <View dangerouslySetInnerHTML={{__html: escapeMd(componentsDoc.api)}} className='html-content md-content'/>
        </Card>
    </Layout>;
};

export default Index;
