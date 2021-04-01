// let email = 'kinaneeSamsonJohn@gmail.com'
// let key = 'pk_test_e8832467bc585390acdb989ed595694d3b3db860'
// let currency = 'NGN'
//
// let get = (url) => {
//     return new Promise((resolve, reject) => {
//         let XHR = new XMLHttpRequest()
//         XHR.open('GET', url)
//         XHR.send()
//         XHR.onload = ()=>{
//             if(XHR.status === 200){
//                 resolve(XHR.responseText)
//             }
//             else{
//                 reject('error ', XHR.status)
//             }
//         }
//     })
// }
//
// function payWithPayStack() {
//     var handler = PaystackPop.setup({
//         key,
//         email,
//         amount: 300000,
//         currency,
//         callback: function(response){
//             var reference = response.reference
//             console.log(reference)
//             get(`http://localhost:3000/transaction/${reference}`).
//             then(data => console.log(data)).
//             catch(err => console.log(err))
//         },
//         onClose: function(){
//             console.log('error')
//         }
//     })
//     handler.openIframe()
// }
//  payWithPayStack()


const set = new Set()

set.add({ name: 'superman', alias: 'clark kent'})
set.add({ name: 'batman', alias: 'bruce wayne'})

const arr = set.values()

const iterable = set[Symbol.iterator]()

console.log(arr.next())
console.log(iterable.next())