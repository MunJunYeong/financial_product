<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-3" outlined>
          <v-card-title>정기 적금 상품 계산기</v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <!-- 계산 입력 부분 -->
              <v-form ref="savingsForm" v-model="savingsValid">
                <!-- 납입 기간 -->
                <v-text-field
                  v-model="savingsPeriod"
                  label="납입 기간"
                  type="number"
                  hint="단위: 개월"
                  :rules="[rules.required]"
                  :suffix="savingsPeriodSuffix"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initSavingsPeriod"
                  required
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseSavingsPeriod(1)"
                  >1개월</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsPeriod(6)"
                  >6개월</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsPeriod(12)"
                  >12개월</v-btn
                >
                <!-- 예치 금액 -->
                <v-text-field
                  :value="formattedSavingsAmount"
                  @input="updateSavingsAmount"
                  label="월 납입 금액"
                  type="text"
                  hint="단위: 원"
                  :rules="[rules.required]"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initSavingsAmount"
                  required
                  suffix="원"
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseSavingsAmout(100000)"
                  >10만원</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsAmout(1000000)"
                  >100만원</v-btn
                >
                <v-btn
                  small
                  class="mr-2"
                  @click="increaseSavingsAmout(10000000)"
                  >1000만원</v-btn
                >
                <v-btn small @click="increaseSavingsAmout(100000000)"
                  >1억</v-btn
                >
                <!-- 이자율 -->
                <v-text-field
                  v-model="savingsRate"
                  label="이자율"
                  type="number"
                  step="0.1"
                  hint="예: 3.5, 3.7"
                  :rules="[rules.required]"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initSavingsRate"
                  required
                  suffix="%"
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseSavingsRate(0.1)"
                  >0.1</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsRate(0.5)"
                  >0.5</v-btn
                >
                <v-btn small class="mr-2" @click="increaseSavingsRate(1)"
                  >1.0</v-btn
                >
                <v-switch
                  v-model="savingsIsSimple"
                  label="단리 적용 여부"
                ></v-switch>
                <v-btn
                  color="primary"
                  :disabled="!savingsValid"
                  @click="calcRegSavings"
                  >계산하기</v-btn
                >
              </v-form>
            </v-col>
            <v-col cols="12" md="6" v-if="savingsTotalInterest !== null">
              <!-- 계산 결과 부분 -->
              <v-list>
                <v-list-item>
                  <v-list-item-title>총 이자금액</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(savingsTotalInterest)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>세금 일반 (15.4%)</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(savingsInterest15)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>세금우대 (9.5%)</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(savingsInterest9)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>세금우대 (1.4%)</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(savingsInterest1)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>비과세</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ formatAmount(savingsInterest) }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-btn small class="mr-2" @click="saveSavings()">
                  저장하기
                </v-btn>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-3" outlined>
          <v-card-title>정기 예금 상품 계산기</v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <!-- 계산 입력 부분 -->
              <v-form ref="depositForm" v-model="depositValid">
                <!-- 예치 기간 -->
                <v-text-field
                  v-model="depositPeriod"
                  label="예치 기간"
                  type="number"
                  hint="단위: 개월"
                  :rules="[rules.required]"
                  :suffix="depositPeriodSuffix"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initDepositPeriod"
                  required
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseDepositPeriod(1)"
                  >1개월</v-btn
                >
                <v-btn small class="mr-2" @click="increaseDepositPeriod(6)"
                  >6개월</v-btn
                >
                <v-btn small class="mr-2" @click="increaseDepositPeriod(12)"
                  >12개월</v-btn
                >
                <!-- 예치 금액 -->
                <v-text-field
                  :value="formattedDepositAmount"
                  @input="updateDepositAmount"
                  label="예치 금액"
                  type="text"
                  hint="단위: 원"
                  :rules="[rules.required]"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initDepositAmount"
                  required
                  suffix="원"
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseDepositAmout(100000)"
                  >10만원</v-btn
                >
                <v-btn small class="mr-2" @click="increaseDepositAmout(1000000)"
                  >100만원</v-btn
                >
                <v-btn
                  small
                  class="mr-2"
                  @click="increaseDepositAmout(10000000)"
                  >1000만원</v-btn
                >
                <v-btn small @click="increaseDepositAmout(100000000)"
                  >1억</v-btn
                >
                <!-- 이자율 -->
                <v-text-field
                  v-model="depositRate"
                  label="이자율"
                  type="number"
                  step="0.1"
                  hint="예: 3.5, 3.7"
                  :rules="[rules.required]"
                  append-outer-icon="mdi-refresh"
                  @click:append-outer="initDepositRate"
                  required
                  suffix="%"
                ></v-text-field>
                <v-btn small class="mr-2" @click="increaseDepositRate(0.1)"
                  >0.1</v-btn
                >
                <v-btn small class="mr-2" @click="increaseDepositRate(0.5)"
                  >0.5</v-btn
                >
                <v-btn small class="mr-2" @click="increaseDepositRate(1)"
                  >1.0</v-btn
                >
                <v-switch
                  v-model="depositIsSimple"
                  label="단리 적용 여부"
                ></v-switch>
                <v-btn
                  color="primary"
                  :disabled="!depositValid"
                  @click="calcRegDeposit"
                  >계산하기</v-btn
                >
              </v-form>
            </v-col>
            <v-col cols="12" md="6" v-if="depositTotalInterest !== null">
              <!-- 계산 결과 부분 -->
              <v-list>
                <v-list-item>
                  <v-list-item-title>총 이자금액</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(depositTotalInterest)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>세금 일반 (15.4%)</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(depositInterest15)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>세금우대 (9.5%)</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(depositInterest9)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>세금우대 (1.4%)</v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      formatAmount(depositInterest1)
                    }}원</v-list-item-subtitle
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>비과세</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ depositInterest }}원</v-list-item-subtitle
                  >
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <SubmitDateDialog ref="startDateDialog" />
  </v-container>
</template>

<script>
import SubmitDateDialog from "@/components/dialog/SubmitDateDialog.vue";

// cus
import { calculateDeposits, calculateSavings } from "../lib/calc/savings";
import { formatAmount } from "../lib/formatter";
import { SavingsType } from "../lib/type";
import { errMsgInternal, openDialog } from "../lib/defines";

export default {
  name: "CalcHome",
  components: {
    SubmitDateDialog,
  },
  data() {
    return {
      // 적금
      savingsValid: true,
      savingsPeriod: 12,
      savingsAmount: 100000,
      savingsRate: 5,
      savingsIsSimple: true,
      savingsTotalInterest: null,
      savingsInterest15: 0,
      savingsInterest9: 0,
      savingsInterest1: 0,
      savingsInterest: 0,
      rules: {
        required: (value) => !!value || "필요한 값입니다.",
      },
      // 예금
      depositValid: true,
      depositPeriod: 0,
      depositAmount: 0,
      depositRate: 0,
      depositIsSimple: true,
      depositTotalInterest: null,
      depositInterest15: 0,
      depositInterest9: 0,
      depositInterest1: 0,
      depositInterest: 0,
    };
  },
  computed: {
    savingsPeriodSuffix() {
      const years = Math.floor(this.savingsPeriod / 12);
      const months = this.savingsPeriod % 12;
      return `${years}년 ${months}개월`;
    },
    formattedSavingsAmount() {
      return this.savingsAmount.toLocaleString();
    },
    depositPeriodSuffix() {
      const years = Math.floor(this.depositPeriod / 12);
      const months = this.depositPeriod % 12;
      return `${years}년 ${months}개월`;
    },
    formattedDepositAmount() {
      return this.depositAmount.toLocaleString();
    },
    userData: function () {
      return this.$store.getters.GET_USER;
    },
  },
  methods: {
    formatAmount,
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 적금 관련 method
    increaseSavingsPeriod(months) {
      this.savingsPeriod = Number(this.savingsPeriod) + months;
    },
    initSavingsPeriod() {
      this.savingsPeriod = 0;
    },
    increaseSavingsAmout(amount) {
      this.savingsAmount = Number(this.savingsAmount) + amount;
    },
    initSavingsAmount() {
      this.savingsPeriod = 0;
    },
    updateSavingsAmount(value) {
      const numberValue = Number(value.replace(/,/g, ""));
      if (!isNaN(numberValue)) {
        this.savingsAmount = numberValue;
      }
    },
    increaseSavingsRate(rate) {
      this.savingsRate = Number((Number(this.savingsRate) + rate).toFixed(1));
    },
    initSavingsRate() {
      this.savingsRate = 0;
    },
    // 정기 적금 계산
    calcRegSavings() {
      if (this.$refs.savingsForm.validate()) {
        const res = calculateSavings({
          period: this.savingsPeriod,
          price: this.savingsAmount,
          rate: this.savingsRate,
          isSimple: this.savingsIsSimple,
        });
        if (res) {
          this.savingsTotalInterest = res.taxFreeInterest;
          this.savingsInterest15 = res.taxGeneralInterest;
          this.savingsInterest9 = res.taxInterest;
          this.savingsInterest1 = res.taxInterest2;
          this.savingsInterest = res.taxFreeInterest;
        }
      }
    },
    // 정기 적금 상품 내용 저장
    async saveSavings() {
      if (!this.userData) {
        this.$store.dispatch(openDialog, "로그인 후 이용해주세요.");
        return;
      }

      try {
        const startDate = await this.$refs.startDateDialog.waitForDate();
        this.$nextTick(async () => {
          const res = await this.$store.dispatch("SAVE_PRODUCT_AFTER_CALC", {
            period: this.savingsPeriod,
            price: this.savingsAmount,
            rate: this.savingsRate,
            isSimple: this.savingsIsSimple,
            startDate: startDate,
            type: SavingsType.SAVINGS,
            totalInterest: this.savingsTotalInterest,
            userIdx: Number(this.userData.user_idx),
          });
          if (res) {
            this.$store.dispatch(openDialog, "저장 성공");
          }
        });
      } catch (err) {
        this.$store.dispatch(openDialog, errMsgInternal);
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 예금 관련 method
    increaseDepositPeriod(months) {
      this.depositPeriod = Number(this.depositPeriod) + months;
    },
    initDepositPeriod() {
      this.depositPeriod = 0;
    },
    increaseDepositAmout(amount) {
      this.depositAmount = Number(this.depositAmount) + amount;
    },
    initDepositAmount() {
      this.depositPeriod = 0;
    },
    updateDepositAmount(value) {
      const numberValue = Number(value.replace(/,/g, ""));
      if (!isNaN(numberValue)) {
        this.depositAmount = numberValue;
      }
    },
    increaseDepositRate(rate) {
      this.depositRate = Number((Number(this.depositRate) + rate).toFixed(1));
    },
    initDepositRate() {
      this.depositRate = 0;
    },
    async calcRegDeposit() {
      if (this.$refs.depositForm.validate()) {
        const res = calculateDeposits({
          period: this.depositPeriod,
          price: this.depositAmount,
          rate: this.depositRate,
          isSimple: this.depositIsSimple,
        });

        if (res) {
          this.depositTotalInterest = res.taxFreeInterest;
          this.depositInterest15 = res.taxGeneralInterest;
          this.depositInterest9 = res.taxInterest;
          this.depositInterest1 = res.taxInterest2;
          this.depositInterest = res.taxFreeInterest;
        }
      }
    },
  },
};
</script>

