import {usePreset} from '@kne/mini-core';
import Fetch from '@kne/react-fetch';

const PackageVersion = ({name, children}) => {
    const {apis} = usePreset();
    return <Fetch {...Object.assign({}, apis.common.packageInfo)} urlParams={{packageName: name}} render={({data}) => {
        return children({version: data['dist-tags']['latest']});
    }}/>
};

export default PackageVersion;

export const PackageVersionFetch = ({name, urlParams, render, ...props}) => {
    return <PackageVersion name={name}>{({version}) => {
        return <Fetch {...props} urlParams={Object.assign({}, urlParams, {version})}
                      render={(response) => render(Object.assign({}, response, {version}))}/>
    }}</PackageVersion>
};
