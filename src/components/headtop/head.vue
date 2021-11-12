<template>
    <div id="head">
      <div class="headMengban"></div>
      <div class="headBgimg">
        <img width="100%" height="100%" :src="headtopSeller.avatar">
      </div>
      <div id="headimg">
        <img width="64" height="64" :src="headtopSeller.avatar">
      </div>
      <div class="sellername">
        <span class="nameImg"></span>
        <span class="name">{{headtopSeller.name}}</span>
      </div>
      <div class="description">
        {{headtopSeller.description}}/{{headtopSeller.deliveryTime}}分钟送达
      </div>
      <div v-if="headtopSeller.supports" class="decreaseImg">
        <span class="dcImg"></span>
        <span class="dcText">{{headtopSeller.supports[0].description}}</span>
      </div>
      <div @click="showDetail" class="headBottom">
        <span class="hbImg"></span>
        <span class="hbText">{{headtopSeller.bulletin}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div @click="showDetail" v-if="headtopSeller.supports" class="support-num">
        {{headtopSeller.supports.length}}个
        <span class="icon-keyboard_arrow_right"></span>
      </div>

      <transition name="fade">
        <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-content">
              <h1 class="name">{{headtopSeller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="headtopSeller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="headtopSeller.supports" class="supports">
                <li class="supports-item" v-for="(item,index) in headtopSeller.supports">
                  <span class="icon" :class="classMap[headtopSeller.supports[index].type]"></span>
                  <span class="text">{{headtopSeller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div v-if="headtopSeller.bulletin" class="bulletin">
                <p class="content">{{headtopSeller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div @click="closeDetail" class="detail-close">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import star from '../star/star'

    export default {
      components:{
        star
      },
      props:{
        headtopSeller:{
          type: Object
        }
      },
      data(){
        return{
          detailShow:false
        }
      },
      methods:{
        showDetail(){
          this.detailShow = true;
        },
        closeDetail(){
          this.detailShow = false;
        }
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    }
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"

  #head
    width 100%
    height 120px
    .headMengban
      width 100%
      height 120px
      position absolute
      z-index -50
      background-color black
      opacity 0.6
    .headBgimg
      width 100%
      height 110px
      position absolute
      z-index -100
      filter blur(10px)
    #headimg
      position absolute
      left 20px
      top 20px
    .sellername
      position absolute
      left 100px
      top: 22px
      .nameImg
        display: inline-block
        width 30px
        height 18px
        vertical-align: top
        background-image url("brand@2x.png")
        background-size: 30px 18px
        background-repeat: no-repeat
      .name
        margin-left 10px
        color white
        font-size 16px
        text-align center
        font-weight bold
        line-height 18px
    .description
      color rgba(255,255,255,0.8)
      font-size 10px
      position absolute
      left 100px
      top 45px
    .decreaseImg
      position absolute
      left 100px
      top 65px
      .dcImg
        position relative
        top 2px
        display: inline-block
        width 12px
        height 12px
        background-image url("decrease_1@3x.png")
        background-size: 12px 12px
      .dcText
        margin-left 5px
        color white
        font-size 10px
        text-align center
        line-height 12px
    .headBottom
      position relative
      top 97px
      height 23px
      background-color rgba(0,0,0,0.3)
      color white
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      padding 0 20px 0 20px
      .hbImg
        display: inline-block
        width 22px
        height 12px
        vertical-align: top
        background-image url("bulletin@2x.png")
        background-size 22px 12px
        position relative
        top 5px
        left -5px
      .icon-keyboard_arrow_right
        position absolute
        color white
        right 5px
        line-height 23px
      .hbText
        font-size 8px
        line-height 23px
    .support-num
      color white
      height 25px
      padding 0 10px 0 10px
      position absolute
      right 15px
      top 60px
      background-color rgba(0,0,0,0.2)
      border-radius 10px
      line-height 25px
    .detail
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      overflow auto
      background rgba(7,17,27,0.8)
      trasition all 0.5s
      color white
      &.fade-enter,&.fade-leave-active
        opacity 0
        background rgba(7,17,27,0)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-content
          margin-top 64px
          padding-bottom 64px
          .name
            font-size 16px
            line-height 16px
            font-weight 700
            text-align center
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 12px
              font-size 14px
              font-weight 700
          .supports
            margin 0 auto
            width 80%
            .supports-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                width 16px
                height 16px
                margin-right 16px
                vertical-align top
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size 12px
                line-height 16px
                font-weight 200
          .bulletin
            width 80%
            margin 0 auto
            .content
              margin-bottom 16px
              padding 0 12px
              line-height 24px
              font-size 12px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        font-size 32px
</style>
