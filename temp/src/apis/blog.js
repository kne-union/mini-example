export const getFolderList = {
    url: 'https://registry.npmmirror.com/@kne-components/blog/{version}/files/manifest-pages/folder-tree.json',
    ignoreSuccessState: true
};

export const getArticleList = {
    url: `https://registry.npmmirror.com/@kne-components/blog/{version}/files/manifest-pages/{id}/{currentPage}.json`,
    ignoreSuccessState: true
};

export const getBlogDetail = {
    url: `https://registry.npmmirror.com/@kne-components/blog/{version}/files/manifest-pages/html/{id}.html`,
    ignoreSuccessState: true
};

const apis = {getFolderList, getArticleList, getBlogDetail};


export default apis;
