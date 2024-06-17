<template>
  <view class="myContent">
  <swiper class="banner" :autoplay="true">
    <swiper-item v-for="item in pictures" :key="item.id">
      <image @click="to_url(item.src)" :src="item.url"></image>
    </swiper-item>
  </swiper>

    <view class="mydingdan">
      <view class="row1">
        <van-cell link-type="navigateTo"/>
      </view>
      <view class="diet">
        <van-grid :gutter="3" square column-num="3">
          <van-grid-item v-for="item in DietFood" :key="item.key" :url="item.toUrl" :text="item.text" :icon="item.photoSrc" />
        </van-grid>
      </view>
    </view>

  <view class="liebiao">
    <text>
        总计
    </text>
    <van-cell v-for="item in foods" :key="item.id" :title="item.text">
      {{item.weight}}g
    </van-cell>
  </view>
  </view>
</template>

<script>
export  default {
  data(){
    return{
      pictures: [
        {id: '1' , url:"/static/food/1.jpg" , src:"/pages/FoodMade/FoodMade"},
        {id: '2' , url:"/static/food/2.jpg" , src:"/pages/FoodMade/FoodMade"},
        {id: '3' , url:"/static/food/3.jpg" , src:"/pages/FoodMade/FoodMade"},
      ],
      foods:[
        {id: '1' , text:"马铃薯" , weight:"12"},
        {id: '2' , text:"番茄", weight:"2"},
        {id: '3' , text:"鱼", weight:"77"},
      ],
      DietFood:[
        {key: '1' , text:"早餐", toUrl:"" , photoSrc:""},
        {key: '2' , text:"午餐", toUrl:"" , photoSrc:""},
        {key: '3' , text:"晚餐", toUrl:"" , photoSrc:""},
      ]
    }
  },
  onLoad() {

  },
  methods: {
    to_url(url){
      wx.navigateTo({
        url:url,
      });
    }
  },
}
</script>


<style scoped>
page {
  background: #eaeaea;
}

.myContent {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.banner{
  width: 750rpx;
  height: 450rpx;
  margin-top: 15px;
  align-items: center;
}

.banner image{
  margin-left: 2.5%;
  height: 100%;
  width: 95%;
  border-radius: 35px;
}

.liebiao {
  align-items: center;
  height: 600rpx;
  flex-wrap: nowrap;
  background: #fff;
  width: 91%;
  border-radius: 10px;
  flex-direction: column;
  padding: 2%;
  margin: 20rpx 20rpx 10rpx 20rpx;
}

.mydingdan {
  display: flex;
  flex-wrap: nowrap;
  background: green;
  width: 95%;
  height: 250rpx;
  margin-left: 20rpx;
  border-radius: 10px;
  flex-direction: column;
}

.diet {
  margin-top: 5rpx;
  background-color: green;
}

</style>