export default defineAppConfig({
    "lazyCodeLoading": "requiredComponents",
    pages: ['pages/index/index', 'pages/components/index', 'pages/detail/index', 'pages/blog/index', 'pages/blog/detail', 'pages/about/index'],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
        navigationStyle: "custom"
    },
    tabBar: {
        backgroundColor: '#ffffff', color: '#003365', selectedColor: '#5879D0', custom: true, list: [{
            pagePath: 'pages/index/index', text: '首页'
        }, {
            pagePath: 'pages/components/index', text: '组件示例'
        }, {
            pagePath: 'pages/blog/index', text: '博客'
        }, {
            pagePath: 'pages/about/index', text: '关于我们'
        }]
    },
    "embeddedAppIdList": ["wx4167e8a57f6fb735", "wx7fc7c62a93b1b191"]
})
