export const getManifest = {
    url: 'https://registry.npmmirror.com/@kne-components/member/{version}/files/manifest.json', ignoreSuccessState: true
};

export const getMemberDetail = {
    url: `https://registry.npmmirror.com/@kne-components/member/{version}/files/manifest-pages/html/{id}.html`,
    ignoreSuccessState: true
};

const apis = {getManifest, getMemberDetail};

export default apis;
