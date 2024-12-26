const a = {
    b: 1,
    c: function () {
        console.log(this);
    },
};
function cl() {
    console.log('嗲及');
}
const p = new Proxy(a, {
    set() {
        console.log(that);
    },
});
function s() {
    p.a = 5;
}
s();
