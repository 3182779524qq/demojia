<template>
  <el-form :label-position="labelPosition" :model="outData" :ref="reform" :label-width="labelWidth" class="my_el_form"
    :rules="formRule">
    <div class="form_item" v-for="(item,index) in formData" :key="index"
      :style="{ width:item.divwidth?item.divwidth:'50%',display:item.hide?'none':'block'}">
      <el-form-item v-if="item.type==='input'" :label="item.name" :prop="item.field" :required="item.required">
        <el-input :style="{ width:item.width?item.width+'px':'235px'}" :disabled="item.disabled?item.disabled:false"
          :placeholder="item.placeholder?item.placeholder:'请输入内容'" v-model="outData[item.field]"></el-input>
      </el-form-item>
      <el-form-item v-else-if="item.type==='select'" :label="item.name" :prop="item.field" :required="item.required"
        v-show="!item.isshow">
        <el-select v-if="!item.packet" v-model="outData[item.field]" :multiple="item.multiple?item.multiple:false"
          :filterable="item.filterable?item.filterable:false" :disabled="item.disabled?item.disabled:false"
          :style="{ width:item.width?item.width+'px':'235px'}">
          <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-else v-model="packValue[item.field]" :multiple="item.multiple?item.multiple:false"
          :filterable="item.filterable?item.filterable:false" :disabled="item.disabled?item.disabled:false"
          :style="{ width:item.width?item.width+'px':'235px'}">
          <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-else-if="item.type==='textarea'" :label="item.name" :prop="item.field" :required="item.required">
        <el-input :style="{ width:item.width?item.width+'px':'235px'}" type="textarea"
          :disabled="item.disabled?item.disabled:false" :placeholder="item.placeholder?item.placeholder:'请输入内容'"
          v-model="outData[item.field]"></el-input>
      </el-form-item>
      <el-form-item v-else-if="item.type==='checkbox'" :label="item.name" :prop="item.field" :required="item.required">
        <el-checkbox-group v-model="outData[item.field]">
          <el-checkbox v-for="(checkedItem,index) in item.options" :label="checkedItem.value" :key="index">
            {{checkedItem.label}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-else-if="item.type==='radio'" :label="item.name" :prop="item.field">
        <el-radio-group v-model="outData[item.field]" :disabled="item.disabled?item.disabled:false">
          <el-radio v-for="(checkedItem,index) in item.options" :label="checkedItem.value" :key="index">
            {{checkedItem.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-else-if="item.type==='time'" :label="item.name" :prop="item.field">
        <el-time-picker is-range v-model="outData[item.field]" range-separator="至" start-placeholder="开始时间"
          end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
      <el-form-item v-else-if="item.type==='rate'" :label="item.name" :prop="item.field">
        <div class="rate_star">
          <el-rate v-model="outData[item.field]" :max="item.max"></el-rate>
        </div>
      </el-form-item>
      <el-form-item v-else-if="item.type==='datatimes'" :label="item.name" :prop="item.field">
        <el-date-picker :style="{ width:item.width?item.width+'px':'235px'}" v-model="outData[item.field]"
          type="datetime" :picker-options="pickerOptions" value-format="timestamp" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
  import FormValidate from '@/utils/formValidate';
  import GlobalUtil from '@/utils/globalUtil';
  import {
    setTimeout
  } from 'timers';

  let oldPacket = {}
  export default {
    props: {
      labelWidth: {
        type: String,
        default: '110px'
      },
      labelPosition: {
        type: String,
        default: 'left'
      },
      reform: {
        type: String,
        default: function () {
          return 'alform'
        }
      },
      reformRule: {
        type: Object,
        default: function () {
          return {
            idCard: [{
              validator: FormValidate.idCard,
              required: true,
              trigger: 'blur'
            }],
            phone: [{
              validator: FormValidate.phone,
              required: true,
              trigger: 'blur'
            }],
            schoolName: [{
              validator: FormValidate.schoolName,
              required: true,
              trigger: 'blur'
            }],
            schoolCode: [{
              validator: FormValidate.schoolCode,
              required: true,
              trigger: 'blur'
            }]
          }
        }
      },
      formData: {
        type: Array,
        default: function () {
          return [{
              type: "input", //普通输入框
              field: "id",
              name: "员工ID",
              icon: '2',
              dataType: 'string'
            },
            {
              type: "select", //普通下拉框
              field: "type",
              name: "告警类型",
              filterable: true, //可搜索
              options: [],
              dataType: 'string',
              optionCallback: function (value) {
                return value + "hh"
              },
              ajax: {
                url: this.$url.getPageList, //url地址
                data: {}, //参数
                label: 'parkName', //key的字段
                value: 'parkCode', //value的字段
              }
            },
            {
              type: "textarea", //时间范围搜索
              field: "textarea",
              name: "文本框",
              dataType: 'string'
            },
            {
              type: "checkbox", //普通下拉框
              field: "checkbox",
              name: "职位",
              options: [],
              dataType: 'array',
              optionCallback: function (value) {
                return value + "hh"
              },
              ajax: {
                url: this.$url.getPageList, //url地址
                data: {}, //参数
                label: 'parkName', //key的字段
                value: 'parkCode', //value的字段
              }
            },
          ]
        },
      }
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            // console.log(time.getTime(),'==================')
            time = time.getTime() - 1000
            return time > Date.now(); //如果没有后面的-8.64e7就是不可以选择今天的
          }
        },
        outData: {},
        formRule: {
          name: [{
            validator: FormValidate.name,
            required: true,
            trigger: 'blur'
          }],
          phone: [{
            validator: FormValidate.phone,
            required: true,
            trigger: 'blur'
          }],
          jobNumber: [{
            validator: FormValidate.jobNumber,
            required: true,
            trigger: 'blur'
          }],
          city: [{
            validator: FormValidate.city,
            required: true,
            trigger: 'blur'
          }],
          region: [{
            validator: FormValidate.region,
            required: true,
            trigger: 'blur'
          }],
          level: [{
            validator: FormValidate.level,
            required: true,
            trigger: 'blur'
          }],
          orgId: [{
            validator: FormValidate.orgId,
            required: true,
            trigger: 'blur'
          }],
          roleId: [{
            validator: FormValidate.roleId,
            required: true,
            trigger: 'blur'
          }],
          reportName: [{
            validator: FormValidate.reportName,
            required: true,
            trigger: 'blur'
          }],
          insuranceType: [{
            validator: FormValidate.insuranceType,
            required: true,
            trigger: 'blur'
          }],
          reportAddr: [{
            validator: FormValidate.reportAddr,
            required: true,
            trigger: 'blur'
          }],
          insuranceTime: [{
            validator: FormValidate.insuranceTime,
            required: true,
            trigger: 'blur'
          }],
          // remarks: [{
          //     validator: FormValidate.remarks,
          //     required: true,
          //     trigger: 'blur'
          // }],
          insuranceAddr: [{
            validator: FormValidate.insuranceAddr,
            required: true,
            trigger: 'blur'
          }],
        },
        packetsheet: {},
        packValue: {},
      }
    },
    created() {
      // this.formRule = GlobalUtil.deepCopy(this.reformRule)
    },
    mounted() {
      let outData = {}
      let packValue = {}
      let packetsheetFlag = false
      for (let i in this.formData) {
        let _data = this.formData[i]
        if (_data.type === 'select' && _data.ajax != null) {
          if (_data.packet) {
            this.packetsheet[_data.packet] = _data
            packValue[_data.field] = _data.value
            packetsheetFlag = true
          } else {
            this.$axios.ajax({
              method: _data.ajax.method ? _data.ajax.method : "get",
              url: _data.ajax.url,
              data: _data.ajax.data
            }).then((res) => {
              let lab = _data.ajax.label;
              let val = _data.ajax.value;
              let list = res.data;
              if (_data.ajax.callback && typeof (_data.ajax.callback) === 'function') {
                list = _data.ajax.callback(list)
              } else {

              }
              if (list != null) {
                let options = [];
                for (let item of list) {
                  options.push({
                    label: item[lab],
                    value: item[val]
                  });
                }
                this.formData[i].options = options;
              }
            })
          }
        } else if (_data.type === 'checkbox' && _data.ajax != null) {
          this.$axios.ajax({
            method: _data.ajax.method ? _data.ajax.method : "get",
            url: _data.ajax.url,
            data: _data.ajax.data
          }).then((res) => {
            let lab = _data.ajax.label;
            let val = _data.ajax.value;
            let list = res.data;
            if (_data.ajax.callback && typeof (_data.ajax.callback) === 'function') {
              list = _data.ajax.callback(list)
            } else {

            }
            if (list != null) {
              let options = [];
              for (let item of list) {
                options.push({
                  label: item[lab],
                  value: item[val]
                });
              }
              this.formData[i].options = options;
            }
          })
        }
        outData[_data.field] = _data.value;
        // console.log( outData)
      }
      this.emptyData = Object.assign({}, outData)
      this.outData = outData;
      this.packValue = packValue;
      // console.log(this.outData)
      // console.log(this.packetsheet,'==================')
      if (packetsheetFlag) {
        for (let i in this.packetsheet) {
          let firstAjax = this.packetsheet[i];
          if (firstAjax.packet > 1) {
            let val = this.packetsheet[firstAjax.packet - 1].value;
            if (!val) {
              continue;
            }
            firstAjax.ajax.data.id = val
          }
          this.$axios.ajax({
            method: firstAjax.ajax.method ? firstAjax.ajax.method : "get",
            url: firstAjax.ajax.url,
            data: firstAjax.ajax.data
          }).then((res) => {
            let lab = firstAjax.ajax.label;
            let val = firstAjax.ajax.value;
            let list = res.data;
            if (firstAjax.ajax.callback && typeof (firstAjax.ajax.callback) === 'function') {
              list = firstAjax.ajax.callback(list)
            }
            if (list != null) {
              let options = [];
              for (let item of list) {
                options.push({
                  label: item[lab],
                  value: item[val]
                });
              }
              this.packetsheet[i].options = options;
            }
          })
        }
      }
      oldPacket = GlobalUtil.deepCopy(this.packValue)
      this.$forceUpdate()
    },
    methods: {
      getOption(ajaxData, par, pos) {
        this.$axios.ajax({
          method: ajaxData.ajax.method ? ajaxData.ajax.method : "get",
          url: ajaxData.ajax.url,
          data: par
        }).then((res) => {
          let lab = ajaxData.ajax.label;
          let val = ajaxData.ajax.value;
          let list = res.data;
          if (ajaxData.ajax.callback && typeof (ajaxData.ajax.callback) === 'function') {
            // console.log(1321)
            list = ajaxData.ajax.callback(list)
          } else {

          }
          if (list != null) {
            let options = []
            for (let item of list) {
              options.push({
                label: item[lab],
                value: item[val]
              });
            }
            this.packetsheet[pos].options = options
          }
        })
      },
      submitForm() {
        // console.log(this.outData)
        let flag = false
        if (this.packValue) {
          for (let i in this.packValue) {
            this.outData[i] = this.packValue[i]
          }
        }
        // console.log(this.outData, '==================')
        this.$refs[this.reform].validate((valid) => {
          if (valid) {
            // console.log(this.outData)
            flag = true
          } else {
            // console.log('error submit!!');
            flag = false
          }
        })
        if (flag) {
          return this.outData
        } else {
          return false
        }
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    },
    watch: {
      packValue: {
        handler: function (newD) { //特别注意，不能用箭头函数，箭头函数，this指向全局
          let change = 1;
          let changeNum = 0;
          let changeKey = '';
          for (let i in newD) {
            if (oldPacket[i] !== newD[i]) {
              changeNum = change;
              changeKey = i;
              break
            }
            change++
          }
          if (changeNum === 1) {
            let formData = {
              'id': newD[changeKey]
            };
            this.getOption(this.packetsheet[2], formData, 2);
            this.packValue['orgId'] = null
            this.packValue['region'] = null
            // console.log(this.packValue,'==================')
            this.packetsheet[3].options = []
          } else if (changeNum === 2) {
            let formData = {
              'id': newD[changeKey]
            };
            this.getOption(this.packetsheet[3], formData, 3)
            this.packValue['orgId'] = null
          }
          oldPacket = GlobalUtil.deepCopy(this.packValue)
        },
        deep: true //深度监听
      }
    }
  }

</script>
<style scoped>
  .my_el_form {
    display: flex;
    flex-wrap: wrap;
    padding-right: 25px;
  }

  .form_item {
    display: flex;
  }

  .rate_star {
    padding-top: 10px;
  }

</style>

<style>
  .my_el_form .el-input__inner {
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }

</style>
