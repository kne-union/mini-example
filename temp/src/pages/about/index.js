import {Layout, usePreset, InfoPage} from '@kne/mini-core';
import Detail, {DisplayHtml} from '../../common/Detail';
import toolbar from "../../common/toolbar";
import {PackageVersionFetch} from "../../common/PackageVersion";

const content = `<div class="mark-down-html style_mark-down-html__IQDxB__DB0NP md-content"><blockquote>
<p>为什么要创建kne-union</p>
</blockquote>
<p>那是2019年的某天，我实在是厌倦了COPY代码，并且需要维护不同的COPY代码的一致性。我创建并发布了第一个我自己的npm
package，但是紧接着我意识到：我该如何去维护这个包的文档示例等，便于同事使用。</p>
<p>因此我有了一个构想，我需要用README.md去完成package的文档和示例，通过一定的格式约定，可以让这个文档既可以在github或者npm的信息页良好展示，还可以通过一个容器能获得增强的，所见即所得和可以实时修改生效的页面。</p>
<p>于是我便发布了 <a href="https://www.npmjs.com/package/@kne/md-doc">@kne/md-doc</a>
和 <a href="https://www.npmjs.com/package/@kne/example-driver">@kne/example-driver</a> 的最初版本，用来支持我的想法。</p>
<p>后面随着我发布的package越来越多，我意识到npm
package作为前端package使用时都需要依赖于编译构建，构建的结果是静态的，即我发布一个package的修改，只有当依赖它的项目更新package版本并且重新执行构建重新部署之后才能生效，并且随着依赖越加越多项目的体积也开始膨胀。我需要另一种可以动态加载的包的机制。</p>
<p>最开始，我尝试自己构建了一套前端微服务，通过加载器动态加载部署在静态服务器的编译好的js文件。但是由于没有妥善解决依赖包共享问题和版本划分的问题，恰逢webpack
5发布，我意识到webpack 5的<a href="https://webpack.js.org/concepts/module-federation/">Module Federation</a>是更合适的工具。</p>
<p>由此我诞生了一个想法：将我需要公用的代码分为两个部分，功能确定并且稳定的部分作为npm
package去维护，以较低的频率更新。功能不确定，不稳定且业务属性强的部分作为Module Federation去维护，我给这部分起名叫
<em><strong>远程组件【remote modules】</strong></em>。</p>
<p>随后我创建了脚手架模板，集成式构建工具等用来规范每个每种类型包的创建。再后来我将工作流接入GitHub actions。
再后来加入了微信小程序Taro技术线支持的包。至此我想通过业余时间进行技术积累的目标已经实现。
我很希望将这些东西分享给我的同事，前同事，希望更多人能加入进来贡献代码，贡献想法，也可以随意使用大家共同的技术积累。
我创建了 <em><strong>kne-union</strong></em> 组织，kne取自我前两家任职的公司：肯耐珂萨(knx)和逸橙科技(e成)，
正是在这两家公司工作的时候我诞生了这一长期的想法。</p>
<p>我希望技术是可以随着时间持续增长的，而不是兜兜转转停滞不前。
我希望技术是可以在之前的基础之上持续积累的，而不是重复造轮子去做相似的东西。
我希望技术是可以在一个平台上共同发挥创意的，而不是一个单打独斗的过程。</p>
<blockquote>
<p>一些重要的说明</p>
</blockquote>
<p>为了避免一些问题，我需要特别说明：<em><strong>kne-union</strong></em> 是一个完全开源的组织，托管代码可以随意使用，并且组织成员在向该组织任意项目提交代码将意味着，这些代码也是遵从完全开源协议的。
提交前需要自行确认代码中不包含任何公司的不适宜公开的业务代码，密钥或者机密信息。我也会定期审核以确保这一点。
需要保证任何组件或者包及其后续迭代过程满足语义化版本号规范。
在你需要使用该组织中任何项目代码前，你需要明白：我们是一个非盈利组织，旨在技术交流，需要你具备你所使用的代码的维护能力，确保你自己清楚使用这些代码面临的风险。
我们只提供有限地维护，可能并不能按照你的项目进度需求或者你的要求来进行修改和维护。你可以通过issues来进行反馈，也可以自己修改后提交request给我们，我们将非常感谢。
但是在遇到实在没有人有空处理的时候，你可以fork仓库自行处理。</p>
<p>如果你想加入我们的组织，可以发送申请邮件到：sunandmoon001@icloud.com 。</p>
</div>`;

const About = () => {
    const {apis} = usePreset();
    return <Layout header={{title: '关于我们'}} toolBarList={toolbar}>
        <DisplayHtml content={content}/>
        <PackageVersionFetch {...Object.assign({}, apis.member.getManifest)}
                             name="@kne-components/member" render={({data, version}) => {
            return <InfoPage>
                {data.map(({id, title}) => {
                    return <InfoPage.Part key={id} title={title}>
                        <Detail name="@kne-components/member" id={id} api={apis.member.getMemberDetail}/>
                    </InfoPage.Part>
                })}
            </InfoPage>
        }}/>
    </Layout>;
};

export default About;
