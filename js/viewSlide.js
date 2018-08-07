;(function(w){
    //面向对象编写组件

//创建一个轮播图的对象

function ViewSlide(ele, obj) {
    //获取组件
    //判断传进来的是否是一个标签

    if (ele.nodeType == 1) {
        this.slide = ele;
    } else {
        this.slide = document.querySelector(ele) || document.querySelector('.viewSlide');
    }

    //获取到下面的子组件的内容
    this.slideList = this.slide.querySelectorAll('.view-slide');
    //获取移动的容器
    this.viewContainer = this.slide.querySelector('.view-container');
    //获取到下面的小点的最大容器
    this.viewPointer = this.slide.querySelector('.view-pagination');
    //获取容器下面的小点
    this.pointerList = null;
    //获取到里面的左右兼容
    this.arrowRight = this.slide.querySelector('.arrowRight');
    this.arrowLeft = this.slide.querySelector('.arrowLeft');
    //获取到左右的箭头的父容器
    this.arrowBox=this.slide.querySelector('.arrow');

    //向那边移动
    this.direction = obj.direction || 'left';
    //是否循环
    this.loop = obj.loop || false;
    //是否需要分页
    this.pagination = obj.pagination || false;
    //是否需要左右箭头
    this.arrow = obj.arrow || false;
    //是否需要自动播放
    this.autoPlay = obj.autoPlay || false;
    //播放的事件
    this.time = obj.speed || 50;

    //一个宽度为多少
    this.tranWidth = this.slide.offsetWidth;

    //设置点击小点时,将小点的索引付给this.index,此时的this,index被后面的点击动画使用
    this.index = 0;

    //设置标记,用来监控是否能被节流,模仿jQuery里面的stop
    this.flag = true;

    //自动播放的时间间隔
    this.autoPlayTime = obj.autoPlayTime || 3000;




    //设置每次移动的距离
    // this.target = -this.tranWidth * this.index;
    //设置小点的个数
    this.length = 0;


    //方法调用
    //调用init()方法,对对象进行初始化
    this.init();



}

//初始化的方法
ViewSlide.prototype.init = function () {
    //用变量来接收this
    var that = this;
    //调用方法获取到
    // this.setPointer(this.length);
    this.setStyle();
    //此处生成小点



    //修改四,判断是否需要进行调用小点,如果需要生成分页小点
    if (this.pagination) {
        this.setPointer(this.length);
    }



    //右边点击事件
    this.arrowRight.onclick = function () {
        that.doRight();
        if (that.index == that.length) {
            that.pointerColor(0)
        } else {
            that.pointerColor(that.index);
        }


    }

    //左边的点击事件
    this.arrowLeft.onclick = function () {
        that.doLeft();
        if (that.index == that.length) {
            that.pointerColor(this.length)
        } else {
            that.pointerColor(that.index);
        }
    }


    //修改七,判断是否设置了自动播放,如果设置了自动播放,name就进行,如果没有就不设置
    if(this.autoPlay) {
    //自动播放的事件
    this.doAutoPlay(this.autoPlayTime);
    }

    //修改六,判断是否显示箭头,如果不显示,对箭头进行隐藏
    if(!this.arrow) {
        this.hiddenArrow();
    }



}

//页面中view-Slide的和宽度
ViewSlide.prototype.setStyle = function () {
    //设置li的宽度
    this.length = this.slideList.length;

    //此处调用设置生成小点
    // console.log(this.length);

    // this.setPointer(this.length);


    for (var i = 0; i < this.length; i++) {
        this.slideList[i].style.width = this.tranWidth + 'px';
    }

    //修改一,原来的容器的宽度
    //设置容器的宽度
    // this.viewContainer.style.width=this.tranWidth*this.length+'px';

    //进行判断是否是循环,如果是循环,那么就要克隆一个li
    if (this.loop) {
        var newLi = this.slideList[0].cloneNode(true);
        this.viewContainer.appendChild(newLi);
        this.viewContainer.style.width = this.tranWidth * (this.length + 1) + 'px';
    } else {
        this.viewContainer.style.width = this.tranWidth * this.length + 'px';
    }






}

//创建页面的小点的方法
ViewSlide.prototype.setPointer = function (length) {

    //需要在此处设置一个变量来接收this.因为里面调用的是构造函数里面的原型的方法,然后里面的一个点击事件,不能使用this,this指向的会是onclick的对象,或者使用call来使用也可以
    var that = this;


    var ul = document.createElement('ul');
    this.viewPointer.appendChild(ul);
    // console.log(12);

    for (var i = 0; i < length; i++) {
        var li = document.createElement('li');
        li.setAttribute('liIndex', i);
        if (i == 0) {
            li.classList.add('active');
        }

        ul.appendChild(li);


        //在创建li小点的时候为小点添加上点击事件
        li.onclick = function () {
            that.index = this.getAttribute('liIndex');
            that.target = -that.tranWidth * that.index;
            that.pointerClick(that.target, that.time);

            // console.log(that.pointerList);

        }

    }


    //将小点重新赋值,赋予给上面
    this.pointerList = this.viewPointer.querySelector('ul').querySelectorAll('li');


}



//页面移动的动画animation
ViewSlide.prototype.animate = function (target, time) {

    //修改节流阀的参数
    this.flag = false;


    //定时器里面的this指向为window,需要使用一个变量来接收传进来的数据
    var that = this;

    //计算每次移动的步数

    var step = (target - that.viewContainer.offsetLeft) / time;

    that.viewContainer.timeId = setInterval(function () {
        //设置一个变量用来接收长度
        var left = that.viewContainer.offsetLeft;
        if (Math.abs((that.viewContainer.offsetLeft - target)) > Math.abs(step)) {
            left += step;
            that.viewContainer.style.left = left + "px";

        } else {
            that.viewContainer.style.left = target + "px";
            clearInterval(that.viewContainer.timeId);
            that.flag = true;
        }


    }, 1)


}


//右击事件
ViewSlide.prototype.doRight = function () {
    if (this.flag) {

        //判断是否是循环,如果是循环执行不同的操作

        if (this.loop) {

            if (this.index == this.length) {
                this.index = 0;
                this.viewContainer.style.left = 0;
            }
            this.index++;
            this.target = -this.tranWidth * this.index;
            this.animate(this.target, this.time);
        } else {
            if (this.index == this.length - 1) {
                this.index == this.length - 1
            } else {
                this.index++;
            }
            this.target = -this.tranWidth * this.index;
            this.animate(this.target, this.time);


        }


    }
}

//左击事件
ViewSlide.prototype.doLeft = function () {
    if (this.flag) {

        //修改三,判断是否是循环通过循环来控制小点的按钮
        if (this.loop) {
            if (this.index == 0) {
                this.index = this.length;
                this.viewContainer.style.left = -this.tranWidth * this.index;
            }
            this.index--;
            this.target = -this.tranWidth * this.index;
            this.animate(this.target, this.time);

        } else {
            if (this.index > 0) {
                this.index--;
                this.target = -this.tranWidth * this.index;
                this.animate(this.target, this.time);
            }
        }





    }
}

//小点点击事件
ViewSlide.prototype.pointerClick = function (target, time) {
    if (this.flag) {
        this.animate(target, time);
        this.pointerColor(this.index);
    }
}

//自动播放事件
ViewSlide.prototype.doAutoPlay = function (autoplayTime) {
    //有定时器,需要使用变量来接收
    var that = this;
    //自动播放就是调用右边的点击事件
    setInterval(function () {
        that.arrowRight.onclick();
    }, autoplayTime)



}


//修改五
//设置当分页存在的时候,才有可能生成小点的颜色这一做法
//为了不造成全句变量污染,应该将其放在pointerColor方法里面
//小点的颜色排他事件
ViewSlide.prototype.pointerColor = function (index) {
    //存在pagination的时候创建方法

    if (this.pagination) {


        for (var i = 0; i < this.pointerList.length; i++) {
            this.pointerList[i].classList.remove('active');
        }
        this.pointerList[index].classList.add('active');
    }

}


//创建一个小点,给小点添加一个属性进行隐藏
ViewSlide.prototype.hiddenArrow=function() {
    this.arrowBox.style="visibility:hidden";
}



//最后一步,将构造函数暴露在window里面成为一个全部变量
w.ViewSlide=ViewSlide;
w.$view=function(obj) {
    var viewSilde=new ViewSlide('.viewSilde',obj);
    return viewSilde; 
}


})(window);