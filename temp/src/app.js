import preset from './preset';
import {Global} from '@kne/mini-core';
import './app.scss';
import './html-content.scss';
import './code.css';

function App({children}) {
    return <Global preset={preset}>{children}</Global>
}

export default App;
