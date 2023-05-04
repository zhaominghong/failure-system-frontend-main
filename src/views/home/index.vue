<template>
  <div class="home-container">
    <div id="mapview" />
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
export default {
  name: 'Home',
  data() {
    return {}
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      const options = {
        css: 'http://localhost:8899/arcgis_js_api/javascript/4.26/esri/themes/light/main.css',
        url: 'http://localhost:8899/arcgis_js_api/javascript/4.26/init.js'
      }
      loadModules([
        'esri/Map',
        'esri/layers/WebTileLayer',
        'esri/layers/support/TileInfo',
        'esri/views/MapView',
        'esri/layers/FeatureLayer',
        'esri/geometry/SpatialReference',
        'esri/geometry/Point'
      ], options).then(([Map, WebTileLayer, TileInfo, MapView, FeatureLayer, SpatialReference, Point]) => {
        var tiandituBaseUrl = 'http://{subDomain}.tianditu.gov.cn' // 天地图服务地址

        var token = '0f65c7e23704bba9d5d3697dab9fdd0e' // 天地图token，在官网申请
        var tileInfo = new TileInfo({
          'rows': 256,
          'cols': 256,
          'compressionQuality': 0,
          'origin': {
            'x': -180,
            'y': 90
          },
          'spatialReference': {
            'wkid': 4490
          },
          // 缩放层级
          'lods': [
            { 'level': '1', 'scale': 295829355.45, 'resolution': 0.703125 },
            { 'level': '2', 'scale': 147914677.725, 'resolution': 0.3515625 },
            { 'level': '3', 'scale': 73957338.8625, 'resolution': 0.17578125 },
            { 'level': '4', 'scale': 36978669.43125, 'resolution': 0.087890625 },
            { 'level': '5', 'scale': 18489334.715625, 'resolution': 0.0439453125 },
            { 'level': '6', 'scale': 9244667.3578125, 'resolution': 0.02197265625 },
            { 'level': '7', 'scale': 4622333.67890625, 'resolution': 0.010986328125 },
            { 'level': '8', 'scale': 2311166.839453125, 'resolution': 0.0054931640625 },
            { 'level': '9', 'scale': 1155583.4197265625, 'resolution': 0.00274658203125 },
            { 'level': '10', 'scale': 577791.7098632812, 'resolution': 0.001373291015625 },
            { 'level': '11', 'scale': 288895.8549316406, 'resolution': 0.0006866455078125 },
            { 'level': '12', 'scale': 144447.9274658203, 'resolution': 0.00034332275390625 },
            { 'level': '13', 'scale': 72223.96373291015, 'resolution': 0.000171661376953125 },
            { 'level': '14', 'scale': 36111.98186645508, 'resolution': 0.0000858306884765625 },
            { 'level': '15', 'scale': 18055.99093322754, 'resolution': 0.00004291534423828125 },
            { 'level': '16', 'scale': 9027.99546661377, 'resolution': 0.000021457672119140625 },
            { 'level': '17', 'scale': 4513.997733306885, 'resolution': 0.000010728836059570312 },
            { 'level': '18', 'scale': 2256.9988666534423, 'resolution': 0.000005364418029785156 },
            { 'level': '19', 'scale': 1128.4994333267211, 'resolution': 0.000002682209014892578 }
          ]
        })

        // 影像地图
        var tiledLayer = new WebTileLayer({
          urlTemplate: tiandituBaseUrl + '/DataServer?T=img_c&x={col}&y={row}&l={level}&tk=' + token,
          subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
          tileInfo: tileInfo,
          spatialReference: { wkid: 4490 }
        })

        // 影像注记
        var tiledLayerAnno = new WebTileLayer({
          urlTemplate: tiandituBaseUrl + '/DataServer?T=cia_c&x={col}&y={row}&l={level}&tk=' + token,
          subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
          tileInfo: tileInfo,
          spatialReference: { wkid: 4490 }
        })

        // 定位地图中心
        var cityCenter = new Point(103.640780, 29.550361, new SpatialReference({ wkid: 4490 }))

        // 创建地图
        var map = new Map({
          basemap: {
            baseLayers: [tiledLayer, tiledLayerAnno]
          }
        })

        var view = new MapView({
          container: 'mapview',
          map: map,
          center: cityCenter,
          constraints: {
            minZoom: 1,
            maxZoom: 13
          },
          zoom: 12,
          ui: {
            components: ['zoom', 'compass']
          }
        })
        // 显示经纬度坐标
        view.on('click', (event) => {
          const lat = Math.round(event.mapPoint.latitude * 1000) / 1000
          const lon = Math.round(event.mapPoint.longitude * 1000) / 1000
          alert(lon + ', ' + lat)
        })
      })
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
  height: 500px;
  width: 100%;
}
</style>
