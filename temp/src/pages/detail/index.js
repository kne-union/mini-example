import {useState} from 'react';
import {Layout} from '@kne/mini-core';
import componentsDoc from 'components-doc';
import {useRouter} from '@tarojs/taro';
import {Button, Card} from '@kne/antd-taro';
import {View} from '@tarojs/components';
import Prism from 'prismjs';
import escape2Html from '../../common/escape2Html';
import 'prismjs/components/prism-js-extras';

const Components = () => {
    const {params} = useRouter();
    const detailInfo = componentsDoc.example.list[params.index];
    const scopeHtml = Prism.highlight(detailInfo.scope, Prism.languages.javascript, 'jsx');
    const codeHtml = Prism.highlight(detailInfo.code, Prism.languages.javascript, 'jsx');
    const [open, setOpen] = useState(false);

    return <Layout header={{title: detailInfo.title}}>
        <Card title="说明">
            {detailInfo.description}
        </Card>
        <Card title="示例">
            {detailInfo.component()}
        </Card>
        <Card title="源代码" extra={<Button size="small" fill='none' onClick={() => {
            setOpen((open) => !open);
        }}>{open ? '</隐藏>' : '<显示>'}</Button>}>
            {open && <View dangerouslySetInnerHTML={{
                __html: `<div class="language-jsx">${scopeHtml}<br/>${escape2Html(codeHtml)}</div>`
            }} className='html-content'/>}
        </Card>
    </Layout>;
};

export default Components;
