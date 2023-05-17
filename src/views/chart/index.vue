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
      <div id="barChart" class="chart-large" />
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
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
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
        tooltip: {
          trigger: 'axis'
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
        { pipe: '一号管道', count: [23, 15, 8] },
        { pipe: '二号管道', count: [27, 20, 7] },
        { pipe: '三号管道', count: [38, 28, 10] },
        { pipe: '四号管道', count: [18, 14, 4] },
        { pipe: '五号管道', count: [10, 5, 5] }
      ]
      const legendData = ['事件数', '已完成数', '未完成数']
      const xAxisData = data.map(item => item.pipe)
      const seriesData = legendData.map((name, index) => ({
        name: name,
        type: 'bar',
        data: data.map(item => item.count[index])
      }))
      const option = {
        title: {
          text: '各管道事件数量',
          x: 'center'
        },
        legend: {
          data: legendData,
          bottom: '0'
        },
        tooltip: {},
        xAxis: { type: 'category', data: xAxisData },
        yAxis: {},
        series: seriesData
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
  margin: 20px;
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
  width: 40vw;
  height: 300px;
}
.chart-large {
  width: 90vw;
  height: 500px;
}
</style>
