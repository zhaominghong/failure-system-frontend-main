<template>
  <div class="chart-container">
    <div class="chart-row">
      <div class="chart-column">
        <div id="pieChart" class="chart" />
      </div>
      <div class="chart-column">
        <div id="lineChart" class="chart" />
      </div>
    </div>
    <div class="chart-row">
      <div id="barChart" class="chart" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    this.drawPieChart()
    this.drawLineChart()
    this.drawBarChart()
  },
  methods: {
    drawPieChart() {
      const pieChart = echarts.init(document.getElementById('pieChart'))
      const data = [
        { name: '一般', value: 50 },
        { name: '重要', value: 30 },
        { name: '紧急', value: 20 }
      ]
      const option = {
        title: {
          text: '失效事件级别比例',
          x: 'center'
        },
        series: [
          {
            name: '级别比例',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      pieChart.setOption(option)
    },
    drawLineChart() {
      const lineChart = echarts.init(document.getElementById('lineChart'))
      const data = [
        { month: '1月', count: 21 },
        { month: '2月', count: 30 },
        { month: '3月', count: 26 },
        { month: '4月', count: 40 },
        { month: '5月', count: 18 }
      ]
      const xAxisData = data.map(item => item.month)
      const seriesData = data.map(item => item.count)
      const option = {
        title: {
          text: '每月失效事件数量',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '事件数量',
            type: 'line',
            data: seriesData
          }
        ]
      }
      lineChart.setOption(option)
    },
    drawBarChart() {
      const barChart = echarts.init(document.getElementById('barChart'))
      const data = [
        { pipe: '一号管道', count: 23 },
        { pipe: '二号管道', count: 27 },
        { pipe: '三号管道', count: 38 },
        { pipe: '四号管道', count: 18 },
        { pipe: '五号管道', count: 10 }
      ]
      const xAxisData = data.map(item => item.pipe)
      const seriesData = data.map(item => item.count)
      const option = {
        title: {
          text: '不同管道的失效事件数量',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '事件数量',
            type: 'bar',
            data: seriesData
          }
        ]
      }
      barChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chart-column {
  margin-right: 20px;
}

.chart {
  width: 400px;
  height: 300px;
}
</style>
