// ECharts 图表：各层次院校保研率对比（估算）
(function () {
  var el = document.getElementById('chart-baoyan');
  if (!el) return;
  if (typeof echarts === 'undefined') {
    el.innerHTML = '<p class="note">图表加载失败，请参考上方“保研”表格与正文说明。</p>';
    return;
  }

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#0E7A4A';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#2E9E6B';
  var ink = style.getPropertyValue('--ink').trim() || '#1A1F1C';
  var muted = style.getPropertyValue('--muted').trim() || '#5C6660';
  var rule = style.getPropertyValue('--rule').trim() || '#E2E6E2';

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    animation: false,
    grid: { top: 30, left: 16, right: 24, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      formatter: function (params) {
        var p = params[0];
        return p.name + '：约 ' + p.value + '%（量级估算）';
      }
    },
    xAxis: {
      type: 'category',
      data: ['顶尖985', '普通985', '211高校', '有推免资格的双非'],
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: ink, fontSize: 13 }
    },
    yAxis: {
      type: 'value',
      name: '保研率（%）',
      nameTextStyle: { color: muted, fontSize: 12 },
      max: 35,
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12, formatter: '{value}%' }
    },
    series: [
      {
        name: '保研率（量级估算）',
        type: 'bar',
        barWidth: '42%',
        data: [
          { value: 25, itemStyle: { color: accent } },
          { value: 20, itemStyle: { color: accent } },
          { value: 12, itemStyle: { color: accent2 } },
          { value: 3, itemStyle: { color: accent2 } }
        ],
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 13,
          fontWeight: 600,
          formatter: '{c}%'
        },
        itemStyle: { borderRadius: [6, 6, 0, 0] }
      }
    ]
  });

  function resize() { chart.resize(); }
  window.addEventListener('resize', resize);
})();
