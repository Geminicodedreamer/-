<template>
  <view>
    <view class="text-align center">
      <view class="input-container">
        <text class="label">体重:</text>
        <input v-model="weight" type="text" class="input_weight" id="weight" placeholder="请输入体重(kg)" @input="handleWeightInput">
        <text class="unit">kg</text>
      </view>
      <view class="input-container">
        <text class="label">身高:</text>
        <input v-model="height" type="text" class="input_height" id="height" placeholder="请输入身高(cm)" @input="handleHeightInput">
        <text class="unit">cm</text>
      </view>
      <view class="input-container">
        <text class="label">年龄:</text>
        <input v-model="age" type="text" class="input_age" id="age" placeholder="请输入年龄" @input="handleAgeInput">
      </view>
      <view class="input-container">
        <text class="label">性别:</text>
        <picker mode="selector" :range="genderOptions" :value="selectedGenderIndex" @change="handleGenderChange" class="input_gender">
          <view class="picker">
            <text>{{ genderOptions[selectedGenderIndex] }}</text>
          </view>
        </picker>
      </view>
      <view class="input-container">
        <text class="label">训练时长:</text>
        <input v-model="trainingTime" type="text" class="input_time" placeholder="训练时长(min)" @input="handleTimeInput">
        <text class="unit">分</text>
      </view>
      <view class="input-container">
        <text class="label">训练强度:</text>
        <picker mode="selector" :range="StageOptions" :value="selectedStageIndex" @change="handleStageChange" class="input_stage">
            <view class="picker">
              <text>{{ StageOptions[selectedStageIndex] }}</text>
            </view>
        </picker>
      </view>

      <view class="button-container">
        <button type="submit" class="weight_btn" @tap="calculateBaseFood">
          计算代谢
        </button>
        <button type="submit" class="erase_btn" @tap="eraseData">
        重置
        </button>
      </view>

      <view class="exception">
        <text>{{ error_message }}</text>
      </view>
      <view class="show_info">
        <text v-if="base_food !== null">基础代谢： {{ base_food }} k大卡</text>
      </view>
      <view class="show_info">
        <text v-if="trainingCalories !== null">训练代谢： {{ trainingCalories }} k大卡</text>
      </view>
      <view class="show_info">
        <text v-if="totalCalories !== null">总代谢： {{ totalCalories }} k大卡</text>
      </view>

      <view class="remind">
        <text v-if="totalCalories !== null">点击以更改营养结构</text>
      </view>
      <view v-if="totalCalories !== null">
        <view class="input-container">
          <text class="label-calc">营养比:</text>
          <picker mode="selector" :range="DietOptions" :value="selectedDietIndex" @change="handleDietChange" class="input_diet">
            <view class="picker">
              <text>{{ DietOptions[selectedDietIndex] }}</text>
            </view>
          </picker>
        </view>
      </view>
      <view class="show_str" v-if="carbs !== null">
        <text>碳水化合物： {{ carbs }} 克</text>
      </view>
      <view class="show_str" v-if="carbs !== null">
        <text>蛋白质： {{ protein }} 克</text>
      </view>
      <view class="show_str" v-if="carbs !== null">
        <text>脂肪： {{ fat }} 克</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const weight = ref('');
    const height = ref('');
    const age = ref('');
    const genderOptions = ['女性', '男性'];
    const StageOptions = ['新手/女性', '老手', '高强度'];
    const selectedStageIndex = ref(0);
    const selectedGenderIndex = ref(0);
    const error_message = ref('');
    const base_food = ref(null);
    const trainingTime = ref('');
    const trainingCalories = ref(null);
    const totalCalories = ref(null);
    const DietOptions = ['5:3:2', '4:4:2'];
    const selectedDietIndex = ref(0);
    const carbsRatio = ref(5);
    const proteinRatio = ref(3);
    const fatRatio = ref(2);
    const carbs = ref(null);
    const protein = ref(null);
    const fat = ref(null);

    const handleWeightInput = (e) => {
      weight.value = e.target.value;
    }

    const handleHeightInput = (e) => {
      height.value = e.target.value;
    }

    const handleAgeInput = (e) => {
      age.value = e.target.value;
    }

    const handleGenderChange = (e) => {
      selectedGenderIndex.value = e.detail.value;
    }

    const handleStageChange = (e) => {
      selectedStageIndex.value = e.detail.value;
    }

    const handleTimeInput = (e) => {
      trainingTime.value = e.target.value;
    }

    const handleDietChange = (e) => {
      selectedDietIndex.value = e.detail.value;
      const selectedDiet = DietOptions[selectedDietIndex.value];
      const [carbsRatioValue, proteinRatioValue, fatRatioValue] = selectedDiet.split(':').map(Number);
      carbsRatio.value = carbsRatioValue;
      proteinRatio.value = proteinRatioValue;
      fatRatio.value = fatRatioValue;
      calculateDietStructure();
    };

    const calculateDietStructure = () => {
      if (totalCalories.value === null) {
        return;
      }

      // 根据选择的比例计算各营养物质的需求量
      const totalCaloriesValue = totalCalories.value;
      const totalRatio = carbsRatio.value + proteinRatio.value + fatRatio.value;
      const carbsValue = (carbsRatio.value / totalRatio) * totalCaloriesValue;
      const proteinValue = (proteinRatio.value / totalRatio) * totalCaloriesValue;
      const fatValue = (fatRatio.value / totalRatio) * totalCaloriesValue;

      // 更新状态变量
      carbs.value = Math.round(carbsValue);
      protein.value = Math.round(proteinValue);
      fat.value = Math.round(fatValue);
    };

    const calculateBaseFood = () => {
      const weightValue = parseFloat(weight.value);
      const heightValue = parseFloat(height.value);
      const ageValue = parseInt(age.value);
      const timeValue = parseInt(trainingTime.value);

      if (!/^\d*\.?\d+$/.test(weight.value) || !/^\d*\.?\d+$/.test(height.value) || !/^\d+$/.test(age.value) || !/^\d+$/.test(trainingTime.value) ||
          weightValue < 1 || weightValue > 10000 || heightValue < 1 || heightValue > 10000 || ageValue < 1 || ageValue > 10000) {
        error_message.value = '请输入正确的数值';
        return;
      }

      let bmr;
      const gender = genderOptions[selectedGenderIndex.value];
      if (gender === '女性') {
        bmr = 655.1 + (9.563 * weightValue) + (1.850 * heightValue) - (4.676 * ageValue);
      } else {
        bmr = 66.5 + (13.75 * weightValue) + (5.003 * heightValue) - (6.75 * ageValue);
      }

      const stage = StageOptions[selectedStageIndex.value];
      let trainingMultiplier;
      switch (stage) {
        case '新手/女性':
          trainingMultiplier = 5;
          break;
        case '老手':
          trainingMultiplier = 8;
          break;
        case '高强度':
          trainingMultiplier = 10;
          break;
        default:
          trainingMultiplier = 0;
          break;
      }

      const trainingCaloriesValue = timeValue * trainingMultiplier;
      const totalCaloriesValue = bmr + trainingCaloriesValue;

      base_food.value = Math.round(bmr);
      trainingCalories.value = Math.round(trainingCaloriesValue);
      totalCalories.value = Math.round(totalCaloriesValue);
      error_message.value = '';

      calculateDietStructure();
    };
    const eraseData = () => {
      weight.value = '';
      height.value = '';
      age.value = '';
      trainingTime.value = '';
      error_message.value = '';
      selectedGenderIndex.value = 0;
      selectedStageIndex.value = 0;
      selectedDietIndex.value = 0;
      base_food.value = null;
      trainingCalories.value = null;
      totalCalories.value = null;
      carbsRatio.value = 5;
      proteinRatio.value = 3;
      fatRatio.value = 2;
      carbs.value = null;
      protein.value = null;
      fat.value = null;
    };

    return {
      weight,
      height,
      age,
      genderOptions,
      StageOptions,
      selectedGenderIndex,
      selectedStageIndex,
      error_message,
      base_food,
      trainingTime,
      trainingCalories,
      totalCalories,
      carbs,
      protein,
      fat,
      DietOptions,
      selectedDietIndex,
      handleDietChange,
      calculateDietStructure,
      handleWeightInput,
      handleHeightInput,
      handleAgeInput,
      handleGenderChange,
      handleStageChange,
      handleTimeInput,
      calculateBaseFood,
      eraseData
    };
  }
};
</script>

<style scoped lang="scss">
.button-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}


.input-container {
  display: flex;
  align-items: center;
}

.remind{
  text-align: center;
  margin-top: 10px;
  font-size:13px;
  margin-left: 50px;
  color: lightgrey;
}

.label , .label-calc {
  margin-left: 15px;
  width:auto;
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
}

.label-calc{
  margin-top: 0;
}

.unit {
  width:auto;
  margin-left: 10px;
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
}


.input_weight, .input_height, .input_age , .input_time {
  width: 70%;
  height: 35px;
  background-color: lightblue;
  border-radius: 50px;
  margin-top: 20px;
  margin-left: 5px;
  color: black;
  outline: none;
  text-align: center;
  line-height: 35px;
  font-size: 22px;
}
.input_time{
  background-color: lightpink;
  width: 60%;
}
.input_gender, .input_stage , .input_diet {
  width: 70%;
  height: 35px;
  background-color: lightblue;
  border-radius: 50px;
  margin-top: 20px;
  margin-left: 5px;
  color: black;
  outline: none;
  text-align: center;
  font-size: 22px;
}
.input_stage{
  background-color: lightpink;
  width: 60%;
}
.input_diet{
  background-color: lightsalmon;
  margin-top: 0;
}

.weight_btn{
  margin-top: 15px;
  margin-right: 5px;
  width: 30%;
  height: 40px;
  background-color: greenyellow;
  line-height: 40px;
}

.erase_btn{
  margin-top: 15px;
  margin-left: 5px;
  width: 30%;
  height: 40px;
  background-color: grey;
  line-height: 40px;
}

.diet_btn{
  margin-top: 15px;
  width: 40%;
  height: 40px;
  background-color: indianred;
  line-height: 40px;
}

.show_info , .show_str {
  margin-top: 10px;
  background-color: lightgrey;
  font-size: 25px;
  text-align: center;
}

.show_str{
  background-color: blanchedalmond;
}

.exception {
  color: red;
  text-align: center;
  margin-top: 10px;
}

</style>
