// var str='asdsdfgasdsdfg'
// console.log((http|https)?:\/\/\w+(\.[\w.-])+\.[a-zA-Z]{2,6})

// var re = /ab+c/
// console.log( re.test( 'abc' ) )   返回bool
var str = `import { RouteRecordRaw } from 'vue-router'
import templateView from '../views/template/index.vue'
import template1View from '../views/template/template1.vue'
import template2View from '../views/template/template2.vue'
const template: RouteRecordRaw =
{
    path: '/template',
    component: templateView, // () => import('./TestManagement/reportProcess.vue'),
    name: 'template',
    redirect: '/template/template1',
    meta: {
        menuTitle: 'template',

    },
    children: [
        {
            path: '/template/template1',
            component: template1View,
            meta: {
                menuTitle: '练习1',
                id: 1

            },
        },
        {
            path: '/template/template2',
            component: template2View,
            meta: {
                menuTitle: '练习2',
                id: 2

            },
        }
    ]

}`
const re = /(?<=children:)(.|\n)*]/g
console.log( str.match( re ) ? str.match( re )[ 0 ] : str.match( re ) )