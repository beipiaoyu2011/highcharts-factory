/**
 * define - description
 * @param  {type} function( description
 * @return {type}           description
 * url http://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe0
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
    var CustomType = function(name) {
        this.name = name;
    };
    CustomType.prototype.getName = function() {
        return this.name;
    };
    var newStyleFunc = (function() {
        var privateCode = 66;
        var func = function() {

        };
        var obj = new CustomType('hello world');
        obj.a = 8;
        obj.b = function() {
            console.log('this=' + this.a);
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
    var Ceo = function(girl) {
        this.girl = girl;
        this.sendMarriageRing = function(gif) {
            console.log('Hi ' + this.girl.name + ' , ceo送你一个' + gif);
        };
    };
    //代理
    var ProxyObj = function(girl) {
        this.girl = girl;
        this.sendGif = function(gif) {
            new Ceo(new MilkGirl(girl)).sendMarriageRing(gif);
        };
    };
    var gif = new ProxyObj('milk');
    gif.sendGif('ring');
    //图片懒加载
    var myImg = (function() {
        var imgNode = document.createElement('img');
        document.body.insertBefore(imgNode, document.body.childNodes[0]);
        return {
            setSrc: function(src) {
                imgNode.src = src;
            }
        };
    })();
    var proxyImg = (function() {
        var img = new Image();
        img.onload = function() {
            myImg.setSrc(this.src);
        };
        return {
            setSrc: function(src) {
                myImg.setSrc('http://sns-pre.gofund.cn:8093/img/loading&dcf8854a.gif');
                img.src = src;
            }
        };
    })();
    proxyImg.setSrc('http://www.go-goal.com/sample/ACC/ftx/forum/library/6162748.jpg');

    /**
     * 虚拟代理合并http请求的理解
     * 比如在做后端系统中，有表格数据，每一条数据前面有复选框按钮，当点击复选框按钮时候，需要获取该id后需要传递给给服务器发送ajax请求
     * 服务器端需要记录这条数据，去请求，如果我们每当点击一下向服务器发送一个http请求的话
     * 对于服务器来说压力比较大，网络请求比较频繁，但是如果现在该系统的实时数据不是很高的话
     * 我们可以通过一个代理函数收集一段时间内(比如说2-3秒)的所有id，一次性发ajax请求给服务器，相对来说网络请求降低了, 服务器压力减少了;
     */
    // 本体函数
    var mainFunc = function(ids) {
        console.log(ids);
        // 再把所有的id一次性发ajax请求给服务器端
    };
    // 代理函数 通过代理函数获取所有的id 传给本体函数去执行
    var proxyFunc = (function() {
        var cache = [], // 保存一段时间内的id
            timer = null;
        return function(checkbox) {
            // 判断如果定时器有的话，不进行覆盖操作
            if (timer) {
                return;
            }
            timer = setTimeout(function() {
                // 在2秒内获取所有被选中的id，通过属性isflag判断是否被选中
                for (var i = 0; i < checkbox.length; i++) {
                    if (checkbox[i].hasAttribute('isflag')) {
                        cache[cache.length] = checkbox[i].getAttribute('data-id');
                    }
                }
                mainFunc(cache.join(',')); // 2秒后需要给本体函数传递所有的id
                // 清空定时器
                clearTimeout(timer);
                timer = null;
                cache = [];
            }, 2000);
        };
    })();
    var checkboxs = document.getElementsByClassName('j-input');
    for (var i = 0; i < checkboxs.length; i++) {
        (function(i) {
            checkboxs[i].onclick = function() {
                // 给当前增加一个属性
                if (this.checked) {
                    this.setAttribute('isflag', 1);
                } else {
                    this.removeAttribute('isflag');
                }
                // 调用代理函数
                proxyFunc(checkboxs);
            };
        })(i);
    }

    /**
     * 理解缓存原理
     * 缓存代理的含义就是对第一次运行时候进行缓存，当再一次运行相同的时候，直接从缓存里面取
     * 这样做的好处是避免重复一次运算功能，如果运算非常复杂的话，对性能很耗费
     * 那么使用缓存对象可以提高性能;我们可以先来理解一个简单的缓存列子，就是网上常见的加法和乘法的运算
     */
    //计算乘法
    var mult = function() {
        var a = 1;
        for (var i = 0; i < arguments.length; i++) {
            a *= arguments[i];
        }
        return a;
    };
    //计算加法
    var plus = function() {
        var a = 0;
        for (var i = 0; i < arguments.length; i++) {
            a += arguments[i];
        }
        return a;
    };
    //代理函数
    var proxy = function(fn) {
        var cache = {};
        return function() {
            var args = Array.prototype.join.call(arguments, ',');
            if (args in cache) {
                return cache[args];
            }
            return cache[args] = fn.apply(this, arguments);
        };
    };
    var proxyMult = proxy(mult);
    proxyMult(1, 2, 3, 4);
    proxyMult(1, 2, 3, 4);
    var proxyPlus = proxy(plus);
    proxyPlus(1, 2, 3, 4);
    proxyPlus(1, 2, 3, 4);

    /**
     * 职责链模式
     * orderType(充值类型)，如果值为1的话，说明是充值500元的用户，如果为2的话，说明是充值200元的用户，如果是3的话，说明是没有充值的用户。
     * isPay(是否已经成功充值了): 如果该值为true的话，说明已经成功充值了，否则的话 说明没有充值成功；就当作普通用户来购买。
     * count(表示数量)；普通用户抽奖，如果数量有的话，就可以拿到优惠卷，否则的话，不能拿到优惠卷。
     */
    function order500(orderType, isPay, count) {
        if (orderType == 1 && isPay) {
            console.log('亲爱的用户，您中奖了100元红包了');
        } else {
            return 'nextSuccessor'; //我不知道下一个节点是谁,反正把请求往后面传递
        }
    }

    function order200(orderType, isPay, count) {
        if (orderType == 2 && isPay) {
            console.log('亲爱的用户，您中奖了20元红包了');
        } else {
            return 'nextSuccessor'; //我不知道下一个节点是谁,反正把请求往后面传递
        }
    }

    function orderNormal(orderType, isPay, count) {
        // 普通用户来处理中奖信息
        if (count > 0) {
            console.log('亲爱的用户，您中奖了10元红包了');
        } else {
            console.log('亲爱的用户，请再接再厉哦');
        }
    }
    var Chain = function(fn) {
        this.fn = fn;
        this.successor = null;
    };
    //下面需要编写职责链模式的封装构造函数方法
    Chain.prototype.setNextSuccessor = function(successor) {
        this.successor = successor;
    };
    //把请求往下传递
    Chain.prototype.passRequest = function() {
        var ret = this.fn.apply(this, arguments);
        if (ret == 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
        return ret;
    };
    //现在我们把3个函数分别包装成职责链节点
    var chain500 = new Chain(order500);
    var chain200 = new Chain(order200);
    var chainNormal = new Chain(orderNormal);
    chain500.setNextSuccessor(chain200);
    chain200.setNextSuccessor(chainNormal);
    console.log(chain500);
    console.log(chain200);
    chain500.passRequest(1, true, 500);
    chain500.passRequest(2, true, 500);
    chain500.passRequest(2, false, 0);

    /**
     * 异步职责链
     * @return {type}  description
     */
    function F1() {
        console.log(1);
        return 'nextSuccessor';
    }

    function F2() {
        console.log(2);
        var self = this;
        setTimeout(function() {
            self.next();
        }, 1000);
    }

    function F3() {
        console.log(3);
    }
    var ChainFunc = function(fn) {
        this.fn = fn;
        this.successor = null;
    };
    ChainFunc.prototype.setNextSuccessor = function(successor) {
        this.successor = successor;
    };
    ChainFunc.prototype.passRequest = function() {
        var ret = this.fn.apply(this, arguments);
        if (ret == 'nextSuccessor') {
            return this.successor && this.successor.passRequest(this.successor, arguments);
        }
        return ret;
    };
    ChainFunc.prototype.next = function() {
        return this.successor && this.successor.passRequest(this.successor, arguments);
    };
    //现在我们把3个函数分别包装成职责链节点
    var chainF1 = new ChainFunc(F1);
    var chainF2 = new ChainFunc(F2);
    var chainF3 = new ChainFunc(F3);
    // 然后指定节点在职责链中的顺序
    chainF1.setNextSuccessor(chainF2);
    chainF2.setNextSuccessor(chainF3);

    chainF1.passRequest();//打印出1，2 过1秒后 会打印出3









});
