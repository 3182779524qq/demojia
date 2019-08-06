<template>
  <div class="dataTableBox">
    <el-table :data="tableData.tData" stripe :height="height" :header-cell-style="headercellstyle" :border="border"
      :row-class-name="rowclassname" @cell-dblclick="cellDblclick" :header-cell-class-name="headercellclassname"
      :cell-class-name="cellclassname" :row-style="rowstyle" :cell-style="cellstyle" style="width: 100%"
      @selection-change="selectionChange" @sort-change="sortChange">
      <!--是否展示多选框-->
      <el-table-column v-if="tableData.isMultiple" type="selection" width="55">
      </el-table-column>
      <!--是否展示列序号-->
      <el-table-column v-if="tableData.isRank" type="index" align="center" width="80" label="序号" :index="numerical">
      </el-table-column>
      <template v-for="(tit,index) in tableData.tHead">
        <template v-if="tit.isHide">
          <!--type.image图片展示类型-->
          <el-table-column v-if="tit.type === 'image'" :key="index" :label="tit.name" :width="tit.width?tit.width:''"
            :formatter="formatter" v-show="!tit.isHide">
            <template slot-scope="scope">
              <span
                @click="allClick(tit.type,scope.row,tit.field,tit.callback?tit.callback(scope.row[tit.field],scope.row):'')">
                <img style="width: 100%"
                  :src="tit.callback?tit.callback(scope.row[tit.field],scope.row):scope.row[tit.field]" alt="">
              </span>
            </template>
          </el-table-column>
          <!--type.custom用户自定义类型可配合wordwrap字符定义数据换行位置，和textRowSize限制数据展示行数-->
          <el-table-column v-else-if="tit.type === 'custom'" :key="index" :prop="tit.field" :label="tit.name"
            :width="tit.width?tit.width:''" :formatter="formatter" v-show="!tit.isHide">
            <template slot-scope="scope">
              <div :class="textRowClassName[tit.textRowSize]"
                :title="tit.textRowSize?tit.hideTit?'':scope.row[tit.field]:''">
                <span v-html="scope.row[tit.field].split(tit.wordwrap||' ').join('<br />')"></span>
              </div>
            </template>
          </el-table-column>
          <!--type.function万能数据处理类型配合callback回调函数处理展示内容，和textRowSize限制数据展示行数-->
          <el-table-column v-else-if="tit.type === 'function'" :key="index" :prop="tit.field" :label="tit.name"
            :sortable="tit.sortable?'custom':false" :width="tit.width?tit.width:''" :formatter="formatter"
            v-show="!tit.isHide">
            <template slot-scope="scope">
              <div :class="textRowClassName[tit.textRowSize]"
                :title="tit.textRowSize?tit.hideTit?'':tit.callback(scope.row[tit.field],scope.row):''">
                <span v-html="tit.callback(scope.row[tit.field],scope.row)"></span>
              </div>
            </template>
          </el-table-column>
          <!-- 弹窗 -->
          <el-table-column v-else-if="tit.type === 'dialog'" :key="index" :prop="tit.field" :label="tit.name"
            :sortable="tit.sortable?'custom':false" :width="tit.width?tit.width:''" :formatter="formatter"
            v-show="!tit.isHide">
            <template slot-scope="scope">
              <el-button :class="textRowClassName[tit.textRowSize]" type="text"
                :title="tit.textRowSize?tit.hideTit?'':tit.callback(scope.row[tit.field],scope.row):''"
                @click="allClick(tit.type, scope.row,scope)">
                <span v-html="tit.callback(scope.row[tit.field],scope.row)"></span>
              </el-button>
            </template>
          </el-table-column>
          <!--actionBtns横向展示操作选项-->
          <el-table-column v-else-if="tit.type === 'actionBtns'" :label="tit.name"
            :width="tableData.actionBtWidth ? tableData.actionBtWidth :'' " :key="tit.index">
            <template slot-scope="scope">
              <template v-for="btn of tit.callback(scope.row[tit.field],scope.row)">
                <template v-if="btn.filter !== undefined && btn.filter != null">
                  <el-button type="text" :key="btn.index" :disabled="btn.disabled"
                    v-if="btn.filter.needel.indexOf(btn.filter.callback?btn.filter.callback(scope.row[btn.filter.field]):scope.row[btn.filter.field]) > -1"
                    @click="allClick(btn.type, scope.row,scope)">
                    <span v-html="btn.label"></span>
                  </el-button>
                </template>
                <template v-else>
                  <el-button :key="btn.index" type="text" :disabled="btn.disabled"
                    @click="allClick(btn.type, scope.row,scope)">
                    <span v-html="btn.label"></span>
                  </el-button>
                </template>
              </template>
            </template>
          </el-table-column>
          <!--actionSelectBtns下拉展示操作选项-->
          <el-table-column v-else-if="tit.type === 'actionSelectBtns'" :label="tit.name" :key="tit.index"
            :width="tableData.actionBtWidth ? tableData.actionBtWidth :'' ">
            <template slot-scope="scope">
              <el-dropdown placement="bottom" @command="optionHandleClick($event,scope.row,scope)">
                <el-button type="primary">
                  {{tit.name}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                </el-button>
                <el-dropdown-menu :class="{optionSelect:true}" slot="dropdown">
                  <template v-for="btn of tit.callback(scope.row[tit.field],scope.row)">
                    <template v-if="btn.filter !== undefined && btn.filter != null">
                      <el-dropdown-item :key="btn.index" :disabled="btn.disabled"
                        v-if="btn.filter.needel.indexOf(btn.filter.callback?btn.filter.callback(scope.row[btn.filter.field]):scope.row[btn.filter.field])>-1"
                        :command="btn.type">
                        <span v-html="btn.label"></span>
                      </el-dropdown-item>
                    </template>
                    <template v-else>
                      <el-dropdown-item :key="btn.index" :command="btn.type" :disabled="btn.disabled"><span
                          v-html="btn.label"></span>
                      </el-dropdown-item>
                    </template>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <!--默认数据展示没有type时走这个分支-->
          <el-table-column v-else :key="index" :prop="tit.field" :label="tit.name" :width="tit.width?tit.width:''"
            :sortable="tit.sortable?true:false" v-show="tit.isHide?false:true"
            :fixed="tit.fixed?tit.fixed:false">
            <template slot-scope="scope">
              <span v-html="scope.row[tit.field]?scope.row[tit.field]:'-'"></span>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <!--分页配置-->
    <div v-if="ispagination" class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
        :current-page="ispagination && ajax.data ? ajax.data.pageNumber:''" :page-sizes="[10,20,50,100]"
        :page-size="ispagination && ajax.data ? ajax.data.pageSize:''" layout="total, sizes,jumper, prev, pager, next"
        :total="tableData.total||0">
      </el-pagination>
    </div>
    <!-- 用户自定义设置表格 -->
    <div class="seeting_dialog clear_el_dialog">
      <el-dialog title="" :visible.sync="dialogVisible" width="640px" :close-on-click-modal="false">
        <h3>自定义表格</h3>
        <div class="dialog_content">
          <div class="thead">
            <el-row>
              <el-col :span="6">列名</el-col>
              <el-col :span="6">别名</el-col>
              <el-col :span="6">显示</el-col>
              <el-col :span="6">操作</el-col>
            </el-row>
          </div>
          <div class="tbody">
            <div v-for="(item,index) in  tableData.tHead" :key="index" class="table_col">
              <el-row>
                <el-col :span="6" style="text-align:center;height:40px;">
                  <p>{{item.name}}</p>
                </el-col>
                <el-col :span="6" style="text-align:center;height:40px;">
                  <el-input type="text" :placeholder="item.name" size='mini' v-model="item.name" readonly></el-input>
                </el-col>
                <el-col :span="6" style="text-align:center;height:40px;">
                  <div @click="showChange()" style="text-align:center;">
                    <el-switch v-model="item.isHide">
                    </el-switch>
                  </div>

                </el-col>
                <el-col :span="6" style="text-align:center;height:40px;">
                  <span class="el-icon-sort-up" style="margin-right:5px;" @click="sortUp(index)"></span>
                  <span class="el-icon-sort-down" @click="sortDown(index)"></span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import GlobalUtil from "@/utils/globalUtil";
  import {
    setTimeout
  } from 'timers';
  export default {
    data() {
      return {
        dialogVisible: false,
        ajax: this.inAjax,
        tableData: this.inTableData,
        dialogData: [],
        serachFilte: this.inSerachFilte,
        headercellstyle: {
          background: "#EFF3F5",
          fontSize: "14px",
          color: "#787C9A"
        },
        cellstyle: {
          background: "transparent",
          fontSize: "14px"
        },
        rowstyle: {
          height: "40px"
        },
        sortData: {},
        textRowClassName: ['', 'textLineSize1', 'textLineSize2', 'textLineSize3', 'textLineSize4',
          'textLineSize5'
        ]
      }
    },
    props: {
      height: {},
      //检测flush发生变化刷新数据
      flush: '',
      border: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      //是否分页
      ispagination: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      //排序格式化
      sortFormatter: {
        type: Function,
        default: function (obj) {

          return obj
        }
      },
      //搜索过滤把搜索字段及数据传过来自动搜索过滤
      inSerachFilte: {},
      //AJAX请求配置
      inAjax: {
        type: Object,
        default: function () {
          return {
            url: '',
            method: "post",
            data: {
              pageNumber: 1,
              pageSize: 15
            },
          }
        }
      },
      //table表参数配置
      inTableData: {
        type: Object,
        default: function () {
          return {
            //表头字段配置
            tHead: [],
            //表内容自动渲染
            tData: [],
            //总条数自动渲染
            total: 0,
            //控制操作选项列的宽度
            actionBtWidth: "",
            //配置操作按钮actionSelectBtns为下拉按钮，actionBtns为平铺按钮
            actionBtns: [{
                type: 'info',
                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>",
                //控制某个字段数据为多少时显示按钮，不设置则全部显示
                filter: {
                  field: 'id',
                  needel: [1, 2, 3, 4, 5]
                }
              },
              {
                type: 'hulve',
                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>忽略</span>"
              },
            ],
            //操作选项列的下拉按钮配置
            actionSelectBtns: [{
                type: 'info',
                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>",
                //控制某个字段数据为多少时显示按钮，不设置则全部显示
                filter: {
                  field: 'id',
                  needel: [1, 2, 3, 4, 5]
                }
              },
              {
                type: 'hulve',
                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>忽略</span>"
              }
            ],
            //配置是否显示多选框
            isMultiple: false,
            //配置是否显示排序
            isRank: true
          }
        }
      },
      //枚举字段数据对应数据
      formatter: {},
      //设置头部某列类名方便控制样式
      headercellclassname: {},
      //设置tbody部份某列类名方便控制样式
      cellclassname: {},
    },
    created() {
      this.dialogData = this.tableData.tHead;
      for (let i = 0; i < this.dialogData.length; i++) {
        if (this.tableData.tHead[i].isHide) {
          this.dialogData[i].isHide = false
          this.tableData.tHead[i].isHid = false
        } else {
          this.dialogData[i].isHide = true
          this.tableData.tHead[i].isHid = true
        }
        // this.tableData.tHead[i].isHide =this.tableData.tHead[i].isHide?false:true;
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      showChange() {
        this.$forceUpdate()
      },
      sortUp(index) {
        if (index != 0) {
          this.dialogData[index] = this.dialogData.splice(index - 1, 1, this.dialogData[index])[0];
        } else {
          this.dialogData.push(this.dialogData.shift());
        }
        this.tableData.tHead = this.dialogData
        this.$forceUpdate()
      },
      sortDown(index) {
        if (index != this.dialogData.length - 1) {
          this.dialogData[index] = this.dialogData.splice(index + 1, 1, this.dialogData[index])[0];
        } else {
          this.dialogData.unshift(this.dialogData.splice(index, 1)[0]);
        }
        this.tableData.tHead = this.dialogData
      },
      settingTable() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
      },
      numerical(i) {
        if (this.ajax.data && this.ajax.data.pageNumber) {
          return (this.ajax.data.pageNumber - 1) * this.ajax.data.pageSize + i + 1;
        } else {
          return ++i;
        }
      },
      getList() {
        let posdata = Object.assign({}, this.ajax.data, this.serachFilte, this.sortData);
        this.$axios.ajax({
          url: this.ajax.url,
          method: this.ajax.method,
          data: posdata
        }).then((res) => {
          let data = res.data;
          if (data.total > 9 & data.pageNumber > 1 && data.list.length === 0) {
            --this.ajax.data.pageNumber
            this.getList();
            return
          }
          this.tableData.tData = data.list;
          this.tableData.total = data.total;
        }).catch((error) => {
          console.log(error);
        })
      },
      allClick(type, row, scope, field, imgUrl) {
        if (type === "image") {
          GlobalUtil.bigImage(imgUrl ? imgUrl : row[field]);
          this.dialogVisible = true;
          return
        }
        const outData = {
          type: type,
          rowData: row,
          rowindex: scope.$index
        };
        this.$emit("rowClick", outData);
      },
      cellDblclick(row, column, cell, event) {
        const outData = {
          row: row,
          column: column,
          cell: cell,
          event: event
        };
        this.$emit("cellDbClick", outData);
      },
      selectionChange(selection) {
        this.$emit("selection", selection);
      },
      handleSizeChange(val) {
        this.ajax.data.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.ajax.data.pageNumber = val;
        this.getList();
      },
      rowclassname(row) {
        /* if ((++row.rowIndex % 2) == 0) {
             return "rowstylebg";
         }*/
      },
      //操作点击
      optionHandleClick(type, row, s) {
        this.allClick(type, row, s);
      },
      //排序
      sortChange(obj) {
        this.sortData = this.sortFormatter(obj);
        this.getList();
      },
    },
    watch: {
      inSerachFilte: {
        handler(newData, oldData) {
          this.serachFilte = newData;
          this.ajax.data.pageNumber = 1;
          this.getList();
        },
        deep: true
      },
      flush: {
        handler(newData, oldData) {
          this.getList();
        },
      },
      inAjax: {
        handler(newData, oldData) {
          this.ajax = this.inAjax;
          this.tableData = this.inTableData;
          this.serachFilte = this.inSerachFilte;
          this.getList();
        },
      },
    }
  }

</script>
<style lang="scss" scoped>
  .dialog_content {
    .thead {
      line-height: 40px;
      text-align: center;
      background: rgb(224, 220, 220);
    }

    .tbody {
      line-height: 40px;
    }

    .table_col {
      width: 100%;
      height: 40px;
      text-align: center;
    }

    .table_col p {
      display: block;
      width: 160px;
    }

    .table_col:hover {
      background: #eee;
    }
  }

  .dataTableBox {
    width: 100%;
    height: 100%;
    // background: #292C41;
  }

</style>
<style>
  .dataTableBox tr th {
    /* 表头背景 */
    /* background: #202435 !important; */
    height: 50px;
    border: 0;
    /* border-radius: 8px; */
  }

  /* .dataTableBox thead{
        border-radius: 8px;
        overflow: hidden;
        display: block;
        width: 100%;
    } */
  .el-table__header {
    /* background: #202435; */
  }

  /* thead tr:first-child th:first-child {
        border: 0;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    thead tr:first-child th:nth-last-child(2) {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    } */

  .dataTableBox .rowstylebg {
    background: rgba(247, 251, 252, 1) !important;
  }

  .dataTableBox .el-table__empty-block {
    /* background: #202435; */
  }

  .dataTableBox .el-checkbox__inner {
    width: 15px;
    height: 15px;
    border-color: #a5b3bc;
    border-radius: 0;
  }

  .dataTableBox .el-table::before {
    /* background: #292C41; */
  }

  .dataTableBox .el-table tr {
    background-color: #fff;
  }

  .dataTableBox .operationTit div {
    padding-left: 27%
  }

  .dataTableBox .operationbts div button {
    font-size: 14px;
    font-weight: bold;
  }

  .dataTableBox .el-button+.el-button {
    padding-left: 1.5%;
  }

  .dataTableBox .pageTotal {
    padding-left: 20px;
    height: 31px;
    line-height: 31px;
    font-size: 14px;
    color: #838383;
  }

  .dataTableBox .pageTotal span {
    color: #3a3a3a;
  }

  .dataTableBox .setPagesize .el-input--small .el-input__inner {
    height: 25px;
    line-height: 25px;
  }

  .dataTableBox .setPagesize .el-input__inner {
    border-color: #838383;
  }

  .dataTableBox .paginationBox {
    padding: 30px;
    position: relative;
    text-align: right;
  }

  .dataTableBox .paginationBox .el-pagination__total {
    color: #CDD2F6;
  }

  .dataTableBox .paginationBox .el-input__inner {
    background: #4D5379;
    border: 0;
    color: #CDD2F6;
  }

  .dataTableBox .paginationBox .btn-prev,
  .dataTableBox .paginationBox .btn-next {
    background: #4D5379;
    color: #CDD2F6;
  }

  .dataTableBox .paginationBox .el-pagination {
    display: inline-block;
  }

  .dataTableBox .paginationBox .el-pagination__jump {
    color: #CDD2F6;
    margin: 0 24px;
  }

  .dataTableBox .paginationBox .el-pager .number {
    background: #4D5379;
    color: #CDD2F6;
  }

  .dataTableBox .paginationBox .el-pager .number:hover {
    color: #ffffff !important;
    background-color: #00B77E
  }

  .dataTableBox .el-table th {
    text-align: center;
    /* border-top: 1px #e5e5e5 solid; */
    padding: 7px 0;
    border-right: none;
  }

  .dataTableBox .el-table td {
    padding: 5px 0;
  }

  .dataTableBox .el-table .cell {
    text-align: center;
    overflow: unset;

  }

  .dataTableBox .el-dropdown .el-button {
    padding: 7px 16px;
    border-radius: 30px;
  }

  .el-dropdown-menu.optionSelect {
    min-width: 100px;
    text-align: center;
  }

  .el-dropdown-menu.optionSelect .el-dropdown-menu__item {
    font-size: 12px;
    line-height: 25px;
    color: #141414;
  }

  .el-dropdown-menu.optionSelect .el-dropdown-menu__item span {
    font-size: 12px;
    color: #141414;
  }

  .el-dropdown-menu.optionSelect .el-dropdown-menu__item.is-disabled span {
    font-size: 12px;
    color: #bbbbbb;
  }

  .el-dropdown-menu.optionSelect .el-dropdown-menu__item.is-disabled {
    cursor: no-drop !important;
  }

  .dataTableBox .textLineSize1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .dataTableBox .textLineSize2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .dataTableBox .textLineSize3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .dataTableBox .textLineSize4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }

  .dataTableBox .textLineSize5 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }

  .dataTableBox .cell .el-button--text {
    padding: 0;
  }

  .dataTableBox .dangerious {
    color: #f56c6c;
  }

  .dataTableBox .el-table--border th,
  .el-table--border td {
    border-right: 0;
  }

  .el-table th.is-leaf,
  .el-table td {
    border-bottom: 1px solid #373B56;
  }

  .is-leaf,
  .el-table td {
    /* background: #292C41 !important; */
  }

  /* #292C41 */
  .dataTableBox .el-table--group,
  .el-table--border {
    border: 0;
  }

  .el-table--group::after,
  .el-table--border::after,
  .el-table::before {
    content: '';
    position: absolute;
    background-color: #292C41;
    z-index: 0;
  }

  .paginationBox button span {
    background: #292C41;
    color: #515575;
  }

  .dataTableBox tbody .cell {
    color: #C9CACF;
  }

  .dataTableBox .el-table__empty-text {
    color: #787c9a;
  }

</style>
