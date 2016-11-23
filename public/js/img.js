/**
 *
 */

define(['jquery','popup'], function($) {
    function Stack() {
        var items = [];
        this.push = function(ele) {
            items.push(ele);
        };
        this.pop = function() {
            return items.pop();
        };
        this.peek = function() {
            return items[items.length - 1];
        };
        this.isEmpty = function() {
            return items.length === 0;
        };
        this.clear = function() {
            items = [];
        };
        this.printf = function() {
            console.log(items);
        };
        this.toString = function() {
            return items.toString();
        };
    }
    var stack = new Stack();
    console.log(stack.isEmpty());
    stack.push(11);
    stack.push(33);
    stack.peek();
    stack.printf();
    var ss ='<div></div>';

    $('.alertBtn').click(function(event) {
        showAlert(22);
    });
    $('.confirmBtn').click(function(event) {
        showConfirm(22,function(flag) {
            if(flag){
                showAlert('true');
            }
        });
    });
    // $('.imgBox img').each(function() {
    //     var $this = $(this),
    //         objWidth = $this.width(),
    //         objHeight = $this.height(),
    //         parentWidth = $this.parent('.imgBox').width(),
    //         parentHeight = $this.parent('.imgBox').height(),
    //         radio = objHeight / objWidth;
    //     if (objWidth > parentWidth && objHeight > parentHeight) {
    //         if (objHeight > objWidth) {
    //             $this.width(parentWidth);
    //             $this.height(parentWidth * radio);
    //         } else {
    //             $this.width(parentHeight / radio);
    //             $this.height(parentHeight);
    //         }
    //         objWidth = $this.width();
    //         objHeight = $this.height();
    //         if (objHeight > objWidth) {
    //             $(this).css('top', (parentHeight - objHeight) / 2);
    //         } else {
    //             $(this).css('left', (parentWidth - parentWidth) / 2);
    //         }
    //
    //     } else {
    //         if (objWidth > parentWidth) { //当图片宽大于容器宽，小于时利用css text-align属性居中
    //             $(this).css("left", (parentWidth - objWidth) / 2);
    //         }
    //         $(this).css("top", (parentHeight - objHeight) / 2);
    //
    //     }
    //
    // });

    //调用
    // $(function() {
    // zmnImgCenter($(".imgBox img"));
    // function zmnImgCenter(obj) {
    //     obj.each(function() {
    //         var $this = $(this);
    //         var objHeight = $this.height(); //图片高度
    //         var objWidth = $this.width(); //图片宽度
    //         var parentHeight = $this.parent().height(); //图片父容器高度
    //         var parentWidth = $this.parent().width(); //图片父容器宽度
    //         var ratio = objHeight / objWidth;
    //         if (objHeight > parentHeight && objWidth > parentWidth) { //当图片宽高都大于父容器宽高
    //             if (objHeight > objWidth) { //赋值宽高
    //                 $this.width(parentWidth);
    //                 $this.height(parentWidth * ratio);
    //             } else {
    //                 $this.height(parentHeight);
    //                 $this.width(parentHeight / ratio);
    //             }
    //             objHeight = $this.height(); //重新获取宽高
    //             objWidth = $this.width();
    //             if (objHeight > objWidth) {
    //                 $(this).css("top", (parentHeight - objHeight) / 2); //定义top属性
    //             } else { //定义left属性
    //                 $(this).css("left", (parentWidth - objWidth) / 2);
    //             }
    //         } else { //当图片宽高小于父容器宽高
    //             if (objWidth > parentWidth) { //当图片宽大于容器宽，小于时利用css text-align属性居中
    //                 $(this).css("left", (parentWidth - objWidth) / 2);
    //             }
    //             $(this).css("top", (parentHeight - objHeight) / 2);
    //         }
    //     });
    // }
});
