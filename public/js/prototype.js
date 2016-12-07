/**
 * define - description
 *
 * @param  {type} function( description
 * @return {type}           description
 */
define(function() {
    /**
     *  1、工厂模式
     */
    //定义构造函数
    var BicycleShop = function(name) {
        this.name = name;
        this.method = function() {
            return this.name;
        };
    };

    function extend(child, parent) {
        //child 表示子类 parent 表示父类
        //定义一个空函数
        var F = function() {};
        // 设置空函数的原型为超类的原型
        F.prototype = parent.prototype;
        // 实例化空函数，并把超类原型引用传递给子类
        child.prototype = new F();
        // 重置子类原型的构造器为子类自身
        child.prototype.constructor = child;
        // 在子类中保存超类的原型,避免子类与超类耦合
        child.parent = parent.prototype;
        if (parent.prototype.constructor === Object.prototype.constructor) {
            // 检测超类原型的构造器是否为原型自身
            parent.prototype.constructor = parent;
        }
    }
    BicycleShop.prototype = {
        constructor: BicycleShop,
        /**
         * sellBicyle - 买自行车的方法
         * @param {type} model 自行车型号
         */
        sellBicycle: function(model) {
            var bicycle = this.createBicycle(model);
            bicycle.A();
            bicycle.B();
        },
        createBicycle: function() {
            throw new Error('父类是抽象类不能直接调用，需要子类重写该方法');
        }
    };
    var BicycleChild = function(name) {
        this.name = name;
        BicycleShop.call(this, name);
    };
    extend(BicycleChild, BicycleShop);
    BicycleChild.prototype.createBicycle = function() {
        var A = function() {
            console.log("执行A业务操作");
        };
        var B = function() {
            console.log("执行B业务操作");
        };
        return {
            A: A,
            B: B
        };
    };
    var myBicycle = new BicycleChild('ss');
    console.log(myBicycle);
    console.log(myBicycle.sellBicycle());

    /**
     *2、单体模式 只被实例化一次
     */
    //example 1
    var SingleTon = function(name) {
        this.name = name;
        this.instance = null;
    };
    SingleTon.prototype.getName = function() {
        return this.name;
    };
    var getInstance = function(name) {
        if (!this.instance) {
            this.instance = new SingleTon(name);
        }
        return this.instance;
    };
    var aa = getInstance('a').getName(); //a
    var bb = getInstance('b').getName(); //a
    //example 2
    var CreateDiv = function(html) {
        this.html = html;
        this.init();
    };
    CreateDiv.prototype.init = function() {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };
    //  var getModule= function (name) {
    //     if(!this.div){
    //         this.div= new CreateDiv(name);
    //     }
    //     return this.div;
    //  };
    //  getModule('hello');
    //  getModule('world');
    var getModule = (function() {
        var instace = null;
        return function(html) {
            // if(!instace){
            //     instace = new CreateDiv(html);
            // }
            return instace || (instace = new CreateDiv(html));
        };
    })();
    getModule('dd999'); //dd
    getModule('ee'); //dd

    /**
     * 3、模块模式
     */
     //匿名函数 创建私有变量 私有函数
    var singleFunc = (function() {
        var num = 12;
        var func1 = function() {
            alert(num);
        };
        return {
            func1: func1
        };
    })();
    // singleFunc.func1();
    var CustomType = function (name) {
        this.name = name;
    };
    CustomType.prototype.getName = function () {
        return this.name;
    };
    var newStyleFunc = (function(){
        var privateCode = 66;
        var func = function () {

        };
        var obj = new CustomType('hello world');
        obj.a= 8;
        obj.b = function() {
            console.log('this='+this.a);
        };
        return obj;
    })();
    console.log(newStyleFunc);

    /**
     *4、代理模式
     */
     var MilkGirl = function(name) {
         this.name = name;
     };
     console.log(new MilkGirl('yyy'));
     var Ceo = function (girl) {
        this.girl = girl;
        this.sendMarriageRing = function (gif) {
            console.log('Hi '+ this.girl.name+' , ceo送你一个'+ gif);
        };
     };
     //代理
     var ProxyObj = function (girl) {
         this.girl = girl;
         this.sendGif = function(gif) {
            new Ceo(new MilkGirl(girl)).sendMarriageRing(gif);
         };
     };
     var gif = new ProxyObj('milk');
     gif.sendGif('ring');
     //图片懒加载
     var myImg= (function () {
        var imgNode=document.createElement('img');
        document.body.insertBefore(imgNode, document.body.childNodes[0]);
        return {
            setSrc : function(src) {
                imgNode.src = src;
            }
        };
    })();
    var proxyImg = (function(){
        var img = new Image();
        img.onload = function () {
            myImg.setSrc(this.src);
        };
        return {
            setSrc : function (src) {
                myImg.setSrc('http://sns-pre.gofund.cn:8093/img/loading&dcf8854a.gif');
                img.src = src;
            }
        };
    })();
    proxyImg.setSrc('http://www.go-goal.com/sample/ACC/ftx/forum/library/6162748.jpg');



});
