<template>
  <div class="home-container">
    <div id="mapview" />
    <el-dialog
      title="新增事件"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false">
      <el-form ref="eventForm" :model="eventForm" status-icon :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="eventForm.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="事件描述" prop="description">
          <el-input v-model="eventForm.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="eventForm.location" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- <el-input v-model.number="eventForm.status" /> -->
          <el-select v-model.number="eventForm.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusList"
              :key="item.status"
              :label="item.label"
              :value="item.status" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理人员" prop="handler_id">
          <!-- <el-input v-model.number="eventForm.handler_id" /> -->
          <el-select v-model.number="eventForm.handler_id" placeholder="请选择处理人员">
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理时间" prop="handler_time">
          <el-input v-model="eventForm.handler_time" />
        </el-form-item>
        <el-form-item label="负责人id" prop="manager_id">
          <!-- <el-input v-model.number="eventForm.manager_id" /> -->
          <el-select v-model.number="eventForm.manager_id" placeholder="请选择负责人">
            <el-option
              v-for="item in personnelList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="管道id" prop="pipeline_id">
          <!-- <el-input v-model.number="eventForm.pipeline_id" /> -->
          <el-select v-model.number="eventForm.pipeline_id" placeholder="请选择管道">
            <el-option
              v-for="item in pipelineList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="事件级别" prop="level">
          <!-- <el-input v-model.number="eventForm.level" /> -->
          <el-select v-model.number="eventForm.level" placeholder="请选择级别">
            <el-option
              v-for="item in levelList"
              :key="item.level"
              :label="item.label"
              :value="item.level" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createEvent } from '@/api/event'
import { getPersonnelList } from '@/api/personnel'
import { getPipelineList } from '@/api/pipeline'
import { loadModules } from 'esri-loader'
import baseData from './baseData.json'
export default {
  name: 'Home',
  data() {
    return {
      dialogVisible: false,
      eventForm: {
        title: '',
        description: '',
        location: '',
        status: '',
        handler_id: '',
        handler_time: '',
        manager_id: '',
        pipeline_id: '',
        level: ''
      },
      rules: {
        title: [{ required: true }],
        description: [],
        location: [],
        status: [{ required: true }],
        handler_id: [],
        handler_time: [],
        manager_id: [],
        pipeline_id: [{ required: true }],
        level: [{ required: true }]
      },
      statusList: [{ status: 0, label: '已完成' }, { status: 1, label: '待指派' }, { status: 2, label: '执行中' }, { status: 3, label: '已暂停' }],
      personnelList: [{ id: '', name: '' }],
      pipelineList: [{ id: '', name: '' }],
      levelList: [{ level: 1, label: '一般' }, { level: 2, label: '重要' }, { level: 3, label: '紧急' }]
    }
  },
  created() {
    this.fetchDataList()
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      const that = this
      const options = {
        css: 'http://localhost:8899/arcgis_js_api/javascript/4.26/esri/themes/light/main.css',
        url: 'http://localhost:8899/arcgis_js_api/javascript/4.26/init.js'
      }
      loadModules([
        'esri/Map',
        'esri/layers/WebTileLayer',
        'esri/geometry/Polyline',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
        'esri/geometry/SpatialReference',
        'esri/geometry/Point',
        'esri/Graphic',
        'esri/PopupTemplate',
        'esri/widgets/Popup'
      ], options).then(([Map, WebTileLayer, Polyline, MapView, FeatureLayer, SpatialReference, Point, Graphic, PopupTemplate, Popup]) => {
        var tiandituBaseUrl = 'http://{subDomain}.tianditu.gov.cn' // 天地图服务地址

        var token = '0f65c7e23704bba9d5d3697dab9fdd0e' // 天地图token，在官网申请

        // 矢量底图
        var tiledLayer = new WebTileLayer({
          urlTemplate: tiandituBaseUrl + '/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=' + token,
          subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
        })

        // poi
        var tiledLayer_poi = new WebTileLayer({
          urlTemplate: tiandituBaseUrl + '/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=' + token,
          subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
        })

        // 定位地图中心
        var cityCenter = new Point(104.061272, 30.629293, new SpatialReference({ wkid: 4490 }))

        // 创建一个弹窗模板
        const popupTemplate = new PopupTemplate({
          title: '管线详情',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'name',
                  label: '管道名称'
                },
                {
                  fieldName: 'description',
                  label: '管道描述'
                },
                {
                  fieldName: 'length',
                  label: '管道长度'
                },
                {
                  fieldName: 'start_location_x',
                  label: '管道起始点经度'
                },
                {
                  fieldName: 'start_location_y',
                  label: '管道起始点纬度'
                },
                {
                  fieldName: 'end_location_x',
                  label: '管道终点经度'
                },
                {
                  fieldName: 'end_location_y',
                  label: '管道终点纬度'
                }
              ]
            }
          ],
          actions: [
            {
              type: 'button',
              title: '失效上报',
              id: 'failure-report',
              className: 'esri-icon-plus-circled',
              disabled: false,
              style: 'padding: 8px;left: 0'
            }
          ]
        })

        // 创建地图
        var map = new Map({
          basemap: {
            baseLayers: [tiledLayer, tiledLayer_poi]
          }
        })

        var view = new MapView({
          container: 'mapview',
          map: map,
          center: cityCenter,
          constraints: {
            minZoom: 1,
            maxZoom: 20
          },
          zoom: 16,
          ui: {
            components: ['zoom', 'compass']
          }
        })
        for (const index in that.pipelineList) {
          const colors = ['#E600A9', '#fe0000', '#23aaf2', '#f9bf1a', '#8881f9']
          // 创建一个简单的Polyline
          const lineGeometry = {
            type: 'polyline',
            paths: JSON.parse(that.pipelineList[index].paths)
          }
          const lineSymbol = {
            type: 'simple-line',
            color: colors[index],
            width: 3
          }
          // 创建一个Graphic对象，用于在地图上显示Polyline
          const lineGraphic = new Graphic({
            geometry: lineGeometry,
            symbol: lineSymbol,
            attributes: {
              id: that.pipelineList[index].id,
              name: that.pipelineList[index].name,
              description: that.pipelineList[index].description,
              length: that.pipelineList[index].length,
              start_location_x: that.pipelineList[index].start_location_x,
              start_location_y: that.pipelineList[index].start_location_y,
              end_location_x: that.pipelineList[index].end_location_x,
              end_location_y: that.pipelineList[index].end_location_y
            },
            popupTemplate: popupTemplate
          })
          view.graphics.add(lineGraphic)
        }

        // 存放点击的经纬度位置
        let location = []
        // 存放点击的管道id
        let pipeline_id = ''
        const paths = []
        view.on('click', (event) => {
          view.hitTest(event).then(function(response) {
            const result = response.results[0]
            if (result?.graphic) {
              const clickedGraphic = result.graphic
              if (clickedGraphic.geometry.type === 'polyline') {
                pipeline_id = clickedGraphic.attributes.id
              }
            }
          })
          const lat = +event.mapPoint.latitude.toFixed(6)
          const lon = +event.mapPoint.longitude.toFixed(6)
          paths.push([lat, lon])
          console.log(paths)
          location = [lat, lon]
        })

        view.popup.on('trigger-action', (event) => {
          if (event.action.id === 'failure-report') {
            that.eventForm.location = JSON.stringify(location)
            this.eventForm.pipeline_id = pipeline_id
            that.dialogVisible = true
          }
        })
      })
    },
    handleCancel() {
      this.eventForm = this.$options.data.call(this).eventForm
      this.$refs['eventForm'].resetFields()
      this.dialogVisible = false
      this.onlyShow = false
    },
    handleSubmit() {
      const that = this
      this.$refs['eventForm'].validate(async valid => {
        if (valid) {
          const res = await createEvent(this.eventForm)
          if (this.$$isResponseSuccess(res)) {
            that.dialogVisible = false
            this.$message.success('新增事件成功')
          } else {
            this.$message.error('新增事件失败')
          }
        }
      })
    },
    async fetchDataList() {
      const personnel = await getPersonnelList()
      const pipeline = await getPipelineList()

      if (this.$$isResponseSuccess(personnel) && this.$$isResponseSuccess(pipeline)) {
        this.personnelList = Object.assign(this.personnelList, personnel.data.items)
        this.pipelineList = Object.assign(this.pipelineList, pipeline.data.items)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
  }
}
#mapview {
  padding: 0;
  margin: 0;
  height: 88vh;
  width: 100%;
}
::v-deep .esri-popup__footer.esri-popup__footer--has-actions{
  .esri-popup__inline-actions-container {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
}
</style>
