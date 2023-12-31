const escape2Html = (str) => {
    const arrEntities = {
        'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'
    }
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t]
    })
}

export default escape2Html;
