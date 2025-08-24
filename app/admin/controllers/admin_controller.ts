import Controller from 'easeadmin/admin/controllers/admin_controller'
import amis from 'easeadmin/builder/amis'

export default class AdminController extends Controller {
  protected dashboard() {
    return (
      amis('page')
        //.initApi(this.ctx.admin.api('pagniate'))
        .data({
          order_chart: ordersChart,
          order_status: orderStatus,
          task_chart: taskChart,
          task_queue: taskQueue,
          task_category: taskCategory,
          page_view: { count: 1200, percent: '+12%', color: 'success' },
          total_revenue: { count: 1023, percent: '+12%', color: 'success' },
          bounce_rate: { count: 866, percent: '-2%', color: 'error' },
        })
        .body([
          amis('alert')
            .body([
              '本系统仅供演示使用，请勿发布违规信息，系统每小时恢复一次数据，整点时分所有数据恢复初始化。',
            ])
            .level('danger')
            .showIcon(true)
            .className('mb-4'),
          amis('grid').columns([
            amis('grid_item')
              .md(4)
              .body(
                amis('panel').body([
                  amis('flex')
                    .alignItems('center')
                    .justify('space-between')
                    .className('mb-2')
                    .items([
                      amis('tpl').tpl('Page Views'),
                      amis('remark').content('remark').placement('left').shape('circle'),
                    ]),
                  amis('flex')
                    .justify('flex-start')
                    .alignItems('center')
                    .items([
                      amis('number').value('${page_view.count}').className('text-2xl'),
                      amis('tag')
                        .label('${page_view.percent}')
                        .color('${page_view.color}')
                        .className('ml-5 rounded-full'),
                    ]),
                ])
              ),
            amis('grid_item')
              .md(4)
              .body(
                amis('panel').body([
                  amis('flex')
                    .alignItems('center')
                    .justify('space-between')
                    .className('mb-2')
                    .items([
                      amis('tpl').tpl('Total Revenue'),
                      amis('remark').content('remark').placement('left').shape('circle'),
                    ]),
                  amis('flex')
                    .justify('flex-start')
                    .alignItems('center')
                    .items([
                      amis('number').value('${total_revenue.count}').className('text-2xl'),
                      amis('tag')
                        .label('${total_revenue.percent}')
                        .color('${total_revenue.color}')
                        .className('ml-5 rounded-full'),
                    ]),
                ])
              ),
            amis('grid_item')
              .md(4)
              .body(
                amis('panel').body([
                  amis('flex')
                    .alignItems('center')
                    .justify('space-between')
                    .className('mb-2')
                    .items([
                      amis('tpl').tpl('Bounce Rate'),
                      amis('remark').content('remark').placement('left').shape('circle'),
                    ]),
                  amis('flex')
                    .justify('flex-start')
                    .alignItems('center')
                    .items([
                      amis('number').value('${bounce_rate.count}').className('text-2xl'),
                      amis('tag')
                        .label('${bounce_rate.percent}')
                        .color('${bounce_rate.color}')
                        .className('ml-5 rounded-full'),
                    ]),
                ])
              ),
          ]),
          amis('grid').columns([
            amis('grid_item')
              .md(8)
              .body(
                amis('panel')
                  .header(
                    amis('flex')
                      .alignItems('center')
                      .justify('space-between')
                      .items([
                        amis('tpl').tpl('Orders in the past 7 days'),
                        amis('remark').content('remark').placement('left').shape('circle'),
                      ])
                  )
                  .body(amis('chart').source('${order_chart}'))
              ),
            amis('grid_item')
              .md(4)
              .body(
                amis('panel')
                  .header(
                    amis('flex')
                      .alignItems('center')
                      .justify('space-between')
                      .items([
                        amis('tpl').tpl('Orders Status'),
                        amis('remark').content('remark').placement('left').shape('circle'),
                      ])
                  )
                  .body(amis('chart').source('${order_status}'))
              ),
          ]),
          amis('grid').columns([
            amis('grid_item')
              .md(3)
              .body(
                amis('panel')
                  .header(
                    amis('flex')
                      .alignItems('center')
                      .justify('space-between')
                      .items([
                        amis('tpl').tpl('Task queue pressure'),
                        amis('remark').content('remark').placement('left').shape('circle'),
                      ])
                  )
                  .body(amis('chart').source('${task_queue}'))
              ),
            amis('grid_item')
              .md(3)
              .body(
                amis('panel')
                  .header(
                    amis('flex')
                      .alignItems('center')
                      .justify('space-between')
                      .items([
                        amis('tpl').tpl('Task Category'),
                        amis('remark').content('remark').placement('left').shape('circle'),
                      ])
                  )
                  .body(amis('chart').source('${task_category}'))
              ),
            amis('grid_item')
              .md(6)
              .body(
                amis('panel')
                  .header(
                    amis('flex')
                      .alignItems('center')
                      .justify('space-between')
                      .items([
                        amis('tpl').tpl('Tasks in the past 7 days'),
                        amis('remark').content('remark').placement('left').shape('circle'),
                      ])
                  )
                  .body(amis('chart').source('${task_chart}'))
              ),
          ]),
        ])
    )
  }
}

const ordersChart = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Processing', 'Cancelled', 'Refunded', 'Success'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Processing',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Cancelled',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Refunded',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Success',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
}

const orderStatus = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Processing' },
        { value: 580, name: 'Cancelled' },
        { value: 484, name: 'Refunded' },
        { value: 300, name: 'Success' },
      ],
    },
  ],
}

const taskChart = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
}

const taskQueue = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
      },
      data: [
        {
          value: 50,
          name: 'SCORE',
        },
      ],
    },
  ],
}

const taskCategory = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },
  legend: {
    data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'],
  },
  series: [
    {
      name: 'Expected',
      type: 'funnel',
      left: '10%',
      width: '80%',
      label: {
        formatter: '{b}Expected',
      },
      labelLine: {
        show: false,
      },
      itemStyle: {
        opacity: 0.7,
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}Expected: {c}%',
        },
      },
      data: [
        { value: 60, name: 'Visit' },
        { value: 40, name: 'Inquiry' },
        { value: 20, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' },
      ],
    },
    {
      name: 'Actual',
      type: 'funnel',
      left: '10%',
      width: '80%',
      maxSize: '80%',
      label: {
        position: 'inside',
        formatter: '{c}%',
        color: '#fff',
      },
      itemStyle: {
        opacity: 0.5,
        borderColor: '#fff',
        borderWidth: 2,
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}Actual: {c}%',
        },
      },
      data: [
        { value: 30, name: 'Visit' },
        { value: 10, name: 'Inquiry' },
        { value: 5, name: 'Order' },
        { value: 50, name: 'Click' },
        { value: 80, name: 'Show' },
      ],
      // Ensure outer shape will not be over inner shape when hover.
      z: 100,
    },
  ],
}
