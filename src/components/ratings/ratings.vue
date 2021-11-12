<template>
    <div class="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect @onlyContentChange="onlyContentChange" @typeChange="typeChange"
        :onlyContent="onlyContent" :selectType="selectType" :ratings="ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings">
              <div class="avatar">
                <img :src="rating.avatar" height="28" width="28">
              </div>
              <div class="content">
                <div class="name">{{rating.username}}</div>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="(item,index) in rating.recommend">{{rating.recommend[index]}}</span>
                </div>
                <div class="time">{{rating.rateTime|format}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/formatDate'

const ALL = 2;

export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return{
      ratings:[
        {
          "username": "3******c",
          "rateTime": 1469281964000,
          "deliveryTime": 30,
          "score": 5,
          "rateType": 0,
          "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": [
            "南瓜粥",
            "皮蛋瘦肉粥",
            "扁豆焖面",
            "娃娃菜炖豆腐",
            "牛肉馅饼"
          ]
        },
        {
          "username": "2******3",
          "rateTime": 1469271264000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "deliveryTime": "",
          "text": "服务态度不错",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": [
            "扁豆焖面"
          ]
        },
        {
          "username": "3******b",
          "rateTime": 1469261964000,
          "score": 3,
          "rateType": 1,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "1******c",
          "rateTime": 1469261864000,
          "deliveryTime": 20,
          "score": 5,
          "rateType": 0,
          "text": "良心店铺",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "2******d",
          "rateTime": 1469251264000,
          "deliveryTime": 10,
          "score": 4,
          "rateType": 0,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "9******0",
          "rateTime": 1469241964000,
          "deliveryTime": 70,
          "score": 1,
          "rateType": 1,
          "text": "送货速度蜗牛一样",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "d******c",
          "rateTime": 1469231964000,
          "deliveryTime": 30,
          "score": 5,
          "rateType": 0,
          "text": "很喜欢的粥店",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "2******3",
          "rateTime": 1469221264000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "量给的还可以",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "3******8",
          "rateTime": 1469211964000,
          "deliveryTime": "",
          "score": 3,
          "rateType": 1,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "a******a",
          "rateTime": 1469201964000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "孩子喜欢吃这家",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": [
            "南瓜粥"
          ]
        },
        {
          "username": "3******3",
          "rateTime": 1469191264000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "粥挺好吃的",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "t******b",
          "rateTime": 1469181964000,
          "deliveryTime": "",
          "score": 3,
          "rateType": 1,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "f******c",
          "rateTime": 1469171964000,
          "deliveryTime": 15,
          "score": 5,
          "rateType": 0,
          "text": "送货速度很快",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "k******3",
          "rateTime": 1469161264000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "u******b",
          "rateTime": 1469151964000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "下雨天给快递小哥点个赞",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "s******c",
          "rateTime": 1469141964000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "好",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "z******3",
          "rateTime": 1469131264000,
          "deliveryTime": "",
          "score": 5,
          "rateType": 0,
          "text": "吃了还想再吃",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "n******b",
          "rateTime": 1469121964000,
          "deliveryTime": "",
          "score": 3,
          "rateType": 1,
          "text": "发票开的不对",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "m******c",
          "rateTime": 1469111964000,
          "deliveryTime": 30,
          "score": 5,
          "rateType": 0,
          "text": "好吃",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "l******3",
          "rateTime": 1469101264000,
          "deliveryTime": 40,
          "score": 5,
          "rateType": 0,
          "text": "还不错吧",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "3******o",
          "rateTime": 1469091964000,
          "deliveryTime": "",
          "score": 2,
          "rateType": 1,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "3******p",
          "rateTime": 1469081964000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "很喜欢的粥",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "o******k",
          "rateTime": 1469071264000,
          "deliveryTime": "",
          "score": 5,
          "rateType": 0,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        },
        {
          "username": "k******b",
          "rateTime": 1469061964000,
          "deliveryTime": "",
          "score": 4,
          "rateType": 0,
          "text": "",
          "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
          "recommend": []
        }
      ],
      selectType:ALL,
      onlyContent:false
    }
  },
  created(){
//    this.$http({
//      method:'get',
//      url:'/api/ratings',
//    }).then((data) =>{
//      this.ratings = data.data.data;
//      console.log(this.ratings);
//    }).catch((err)=>{
//      console.log(err);
//    })
  },
  methods:{
    needShow(type,text){
      if(this.foodShow === false){
        return;
      }
      if(this.onlyContent && !text){
        return false;
      }
      if(this.selectType === ALL){
        return true;
      }else{
        return this.selectType === type;
      }
    },
    typeChange(type){
      this.selectType = type;
    },
    onlyContentChange(){
      this.onlyContent = !this.onlyContent;
    }
  },
  filters:{
    format(time){
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  },
  components:{
    star,
    split,
    ratingselect,
  }

}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin'
  .ratings
    position absolute
    top 170px
    bottom 50px
    left 0
    width 100%
    overflow hidden
    overflow-y scroll
    .overview
      display flex
      padding 18px 0
      .overview-left
        padding 6px 0
        flex 0 0 137px
        width 137px
        border-right 1px solid rgba(7,17,27,0.1)
        text-align center
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255,153,0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(147,153,159)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(7,17,27)
          .star
            display inline-block
            vertical-align top
            margin 0 12px
          .score
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(255,153,0)
        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7,17,27)
          .delivery
            margin 12px
            font-size 12px
            color rgb(147,153,159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147,153,159)
          .text
            margin-bottom 8px
            line-height 18px
            color rgb(7,17,27)
            font-size 12px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up,.item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0,160,220)
            .item
              padding 0 6px
              border 1px solid rgba(7,17,27,0.1)
              border-radius 1px
              color rgb(147,153,159)
              background #fff
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147,153,159)
</style>
