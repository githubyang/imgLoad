/*+======================================
* 图片预加载
* v 1.0.0
* 单骑闯天下 2014.3.8
*+======================================*/
;({
    IMG:function(){return new Image();},
    list:[], /* 加载列表 */
    imgArr:[],
    total:10, /* 检测次数 检测次数越多意味着会延长图片的加载时间 */
    attribute:[['width','height'],['naturalWidth','naturalHeight']],/* 常规图片的高宽属性 html5新增图片高宽属性 */
    attrMethod:function(){
        return ('naturalWidth' in this.IMG())?1:0;
    },
    init:function(img,fn){
        var type=(typeof img ==='object')?1:0,
            that=this,
            imgArr=that.imgArr,
            bool=that.attrMethod(),
            total=that.total,
            IMG=that.IMG();
        if(bool===1){
            var _width=that.attribute[1][0],
                _height=that.attribute[1][1];
        }else{
            var _width=that.attribute[0][0],
                _height=that.attribute[0][1];
        }
        if(type===1){
            for(var i in img){
                this.list.push(img[i]);
            }
        }else{
            if(typeof img==="string"){
                this.list.push(img);
            }else{
                return;
            }
        }
        var list=this.list,
            n=parseInt(list.length,10);
        for(i=0;i<n;i++){
            (function(){
                /* ie && ie<=8 的浏览器必须在src赋予前定义onerror */
                IMG.onerror=function(){
                    img.onload=img.onerror=img.onreadystatechange=null;
                    img=null;
                };
                IMG.src=this[i];
                /* 递归检测服务器是否返回图片占位信息 这里不能使用setTimeout setInterval */
                var check=function(){
                    var a=IMG[_width],
                        b=IMG[_height];
                    if(a>0||b>0){
                        IMG.width=a;
                        IMG.height=b;
                        // 图片对象
                        imgArr.push(IMG)
                    }
                    if( (total>0) && !(a>0||b>0)){
                        total--;
                        check();
                    }
                }
                check();
            }).call(list,i);
        }
        /* 到这一步图片已经预加载完成了 可以开始用函数执行操作 */
        if(fn){
            fn(imgArr);
        }
    }
}).init({
    a:'图片地址1',
    b:'图片地址1'
},function(data){
    data;/* data是图片预加载完成之后返回的数组 */
});