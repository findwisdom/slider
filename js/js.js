/**
 * Created by Administrator on 2016/8/31.
*/
(function($){
    $.fn.slider =function(ops){
        ops = $.extend({
            movetime:1000, //动画执行时间
            timeout:6000, //间隔时间
            autoslider:true, //是否自动轮播
            addbtn:true, //是否加入按钮
            btnW:30, //按钮宽度
            btnH:30, //按钮高度
            btnbk_left:'url("images/left.png") no-repeat center',//按钮背景
            btnbk_right:'url("images/right.png") no-repeat center',
            mouse_btnleft:'url("images/chick_left.png") no-repeat center',//鼠标悬停背景
            mouse_btnright:'url("images/chick_right.png") no-repeat center'
        },ops||{});

        ops.timeout =ops.timeout<1500?1500:ops.timeout;
        var ths=this,
            thslink=ths.find(".slider_img li"),
            thstop=ths.find(".wrap .slider_changetop li"),
            count= 0,
            imglenth=thslink.length,
            $btn;

        var init =function(){
            autoplay();
            //鼠标悬停到介绍小板轮播停止
            $('.slider .slider_changetop li').on("mouseover",function(){
                stopslider();
            })
            //鼠标离开介绍小板轮播开始
            $('.slider .slider_changetop li').on("mouseout",function(){
                autoplay();
            })
            if(ops.addbtn){
                creatbtn();
                $btn.eq(0).on("click",function(){
                    stopslider();
                    count--;
                    if(count<0){
                        count=imglenth-1;
                    }
                    play(count);
                })
                $btn.eq(0).on("mouseover",function(){
                    stopslider();
                    $btn.eq(0).css({"background":ops.mouse_btnleft});
                })
                $btn.eq(0).on("mouseout",function(){
                    $btn.eq(0).css({"background":ops.btnbk_left});
                    autoplay();
                })

                $btn.eq(1).on("click",function(){
                    stopslider();
                    count++;
                    if(count>imglenth-1){
                        count=0;
                    }
                    play(count);
                })
                $btn.eq(1).on("mouseover",function(){
                    stopslider();
                    $btn.eq(1).css({"background":ops.mouse_btnright});
                })
                $btn.eq(1).on("mouseout",function(){
                    $btn.eq(1).css({"background":ops.btnbk_right});
                    autoplay();
                })

            }
        }
        function autoplay(){
            if(ops.autoslider==true){
                startslider();

            }
        }
        function index(){
            count++;
            if (count>imglenth-1){
               count=0;
            }
            play(count);
        }
        function play(index){
            //背景动画
            thslink.eq(index).stop(true,true).animate({opacity:1,"z-index":10},ops.movetime).siblings().animate({opacity:0,'z-index':8},ops.movetime);
            //小展板动画
            thstop.eq(index).stop(true,true).animate({bottom:0,opacy:1},ops.movetime).siblings().animate({bottom:'-100%',opacy:0});

        }

        //开始动画
        function startslider(){
            playlider=setInterval(index,ops.timeout);
        }
        //停止动画
        function stopslider(){
            clearInterval(playlider);
        }
        //添加按钮
        function creatbtn(){
            var btnTem =  '<span class="s_btn"></span><span class="s_btn"></span>';
            ths.append(btnTem);
            $btn =ths.find('.s_btn');

            $btn.css({
                "position": "absolute",
                "top": "50%",
                "margin-top": (-1) * ops.btnH / 2+"px",
                "width": ops.btnW + "px",
                "height": ops.btnH + "px",
                "cursor": "pointer",
                "background-color": ops.btnBk,
                "z-index": "20"
            });
            $btn.eq(0).css({"left":"10px","background":ops.btnbk_left});
            $btn.eq(1).css({"right":"10px","background":ops.btnbk_right});
        }

        init()
    }
})(jQuery);





