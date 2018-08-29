/**
 * 获取 url 中的参数
 * 1. 指定参数名称，返回该参数的值 或者 空字符串
 * 2. 不指定参数名称，返回全部的参数对象 或者 {}
 * 3. 如果存在多个同名参数，则返回数组
 */

 class urlOperate {
     constructor(url) {
         this.url = url
         this.map = new Map()
     }

     getMap() {
         return this.dealUrlParam()
     }

     getObj(key = '') {
         return this.getUrlParam(key = '')
     }

     dealUrlParam() {
         const keys = this.url.split('?')[1].split('&')

         // 遍历keys
         for (let key of keys) {
             // 判断是否还包含hash值
             if (key.includes('#')) {
                 const [k, h] = key.split('#')
                 this.addKey(k, '=')
                 this.addKey(h, '=')
             } else {
                 this.addKey(key, '=')
             }
         }
         return this.map
     }

     addKey(str, sp) {
        const [key, value] = !str.includes(sp) ? [str, true] : str.split(sp)
        
        if (this.map.has(key)) {
            const tmpValue = this.map.get(key)
            Array.isArray(tmpValue) ? this.map.set(key, [...tmpValue, value]) : this.map.set(key, [tmpValue, value])
        } else {
            this.map.set(key, value)
        }
     }

     getUrlParam(key = '') {
         this.dealUrlParam()
         if (key) {
             return this.map.has(key) ? this.map.get(key) : ''
         } else {
             return this.strMapToObj()
         }
     }

     strMapToObj() {
        let obj = Object.create(null);
        for (let [k,v] of this.map) {
          obj[k] = v;
        }
        return obj;
     }
 }

 const url = new urlOperate('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe')

 console.log(url.getObj())