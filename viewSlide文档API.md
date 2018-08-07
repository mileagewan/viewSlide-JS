##使用说明

##使用前先引用对应的css样式和js数据
其中css样式集合了左右的图标的字体图标样式

js数据集合了简单的方法操作

##引用相对应的html结构
##结构如下
<div class="viewSlide">
        <div class="view-container">
            <div class="view-slide">slide 1</div>
            <div class="view-slide">slide 2</div>
            <div class="view-slide">slide 3</div>
            <div class="view-slide">slide 4</div>
        </div>
        <div class="arrow">
            <i class='arrowLeft iconfont'></i>
            <i class='arrowRight iconfont'></i>
        </div>
        <div class="view-pagination"></div>
</div>

viewSlide为轮播图的主题,包含了轮播内容view-container,箭头父盒子arrow ,已经箭头父盒子里面的左右箭头arrowLeft和arrowRight

包行分页中的小点view-pagination 

##html结构必须具备三者,如果三者缺少,或产生报错

其中的使用ajax生成view-container时候,只需要将轮播图的初始化放在后面即可


##调用方式
<script>
//方法一
var viewSlide=new ViewSlide('.viewSlide',{
    direction:'left',   //目前没哟实现
    loop:true,          //是否循环
    pagination:true,    //是否显示小点
    arrow:true,         //是否显示箭头
    speed:50,           //轮播图切换的速度,默认为50
    autoPlay:true,      //是否开启自动轮播
    autoPlayTime:3000   //自动轮播的切换时间,默认时间为3000毫秒

})

//方法二 
var ele=document.querySelector('.viewSlide');
var viewSlide=new ViewSlide(ele,{
    direction:'left',   //目前没哟实现
    loop:true,          //是否循环
    pagination:true,    //是否显示小点
    arrow:true,         //是否显示箭头
    speed:50,           //轮播图切换的速度,默认为50
    autoPlay:true,      //是否开启自动轮播
    autoPlayTime:3000   //自动轮播的切换时间,默认时间为3000毫秒

})


//方法三

$view({
    direction:'left',   //目前没哟实现
    loop:true,          //是否循环
    pagination:true,    //是否显示小点
    arrow:true,         //是否显示箭头
    speed:50,           //轮播图切换的速度,默认为50
    autoPlay:true,      //是否开启自动轮播
    autoPlayTime:3000   //自动轮播的切换时间,默认时间为3000毫秒

});      //该方法存在一个返回值viewSlide


</script>