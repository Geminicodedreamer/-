<template>
  <view class="image-container">
    <view class="show_body">
      <image src="/static/body/people.jpg" ></image>
      <image src="/static/body/shoulder.png" v-if="shoulder"></image>
      <image src="/static/body/arm_front.png" v-if="arm"></image>
    </view>
  </view>

  <view class="sport">
    <text>

    </text>
  </view>

  <view>
    <button v-if="!menushow" class="floatbtn" @click="changeMenu">
      <text>
        点击添加运动
      </text>
    </button>

    <view v-if="menushow && !(action1 || action2)" class="menuarea">
      <view class="mask" @click="changeMenu">
      </view>
      <scroll-view class="menulist scroll-view" scroll-y="true">
        <view class="scroll-view-item" @click="m1">
          训练方案1
        </view>
        <view class="scroll-view-item" @click="m2">
          训练方案2
        </view>
        <view class="scroll-view-item" @click="m3">
          训练方案3
        </view>
        <view class="scroll-view-item" @click="return_menu">
          返回
        </view>
      </scroll-view>
    </view>

    <view v-if="action1" class="menuarea">
      <view class="mask" @click="">
      </view>
      <scroll-view class="menulist scroll-view" scroll-y="true">
        <view class="scroll-view-item" @click="click_shoulder">
          肩胛骨
        </view>
        <view class="scroll-view-item" @click="click_arm">
          肱二头肌
        </view>
        <view class="scroll-view-item" @click="">
          无
        </view>
        <view class="scroll-view-item" @click="">
          无
        </view>
        <view class="scroll-view-item" @click="return_exer">
          返回
        </view>
      </scroll-view>
    </view>

    <view v-if="action2" class="menuarea">
      <view class="mask" @click="">
      </view>
      <scroll-view class="menulist scroll-view" scroll-y="true">
        <view class="scroll-view-item" @click="click_shoulder">
          肩胛骨
        </view>
        <view class="scroll-view-item" @click="click_arm">
          肱二头肌
        </view>
        <view class="scroll-view-item" @click="">
          3
        </view>
        <view class="scroll-view-item" @click="">
          4
        </view>
        <view class="scroll-view-item" @click="return_exer">
          返回
        </view>
      </scroll-view>
    </view>

  </view>

</template>

<script>
export default {
  data() {
    return {
      menushow: false,
      action1: false,
      action2: false,
      shoulder: false,
      arm: false,
    }
  },
  methods: {
    changeMenu() {
      this.menushow = !this.menushow;
    },
    m1(){
      this.action1 = !this.action1;
    },
    m2(){
      this.action2 = !this.action2;
    },
    m3() {
    },
    click_shoulder(){
      this.shoulder = !this.shoulder;
    },
    click_arm(){
      this.arm = !this.arm;
    },
    return_exer() {
      this.menushow = true;
      this.action1 = this.action2 = false;
      this.arm = this.shoulder = false;
    },
    return_menu(){
     this.menushow = false;
    },
    scroll(event) {
      console.log(event.detail)
    },
  },
}
</script>

<style scoped lang="scss">
.scroll-view {
  white-space: nowrap;
  height: 200px;
  width: 100%;
}

.image-container {
  position: relative;
  height: 560rpx;
}

.show_body image{
  position: absolute;
  width: 750rpx;
  height: 650rpx;
  top: 0;
  left: 0;
}

.shoulder image,
.arm_front image {
  position: absolute;
  top: 0;
  left: 0;
}

.sport {
  margin-top: 20px;
}

.floatbtn {
  background-color: rgba(0 , 0 , 0 ,0);
  color: grey;
  width: 90%;
  position: fixed;
  z-index: 99999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15rpx;
  margin-top: 10px;
  margin-left: 5%;
}

.menuarea {
  width: 100%;
  height: 100%;
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 88888;
  background-color: #3B414433;
}

.menulist {
  position: fixed;
  border-radius: 5px;
  bottom: 130rpx;
  width: 90%;
  z-index: 99999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 5%;
}

.menulist view {
  padding-left: 20rpx;
  border-bottom: 1px solid #88888833;
  height: 100rpx;
  line-height: 100rpx;
}


</style>
