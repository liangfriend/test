function createApp(Element) {
    vDom.id = Date.now();
    vDom.name = 'root';
    vDom.children = [];
}
function d(obj) {
    dataList[0].datas.push(obj);
    return new Proxy(obj, {
        set() {},
    });
}
const dataList = [{ id: 1, datas: {} }];
const vDom = {};
