import React, {useEffect, useRef, useState} from "react";

import {LoadingWrapper, TodoListWrapper} from './style'

import {indexDBSuccess, readAll, remove, update, add} from '../../api/indexDB'
import {findTodoIndex, filterChartData} from '../../api/libs'

import {Chart} from '@antv/g2';

import {message, Modal, Button} from 'antd';

function Visualization(props) {

  const [loading, setLoading] = useState(true)

  const [chartData, setChartData] = useState([]);

  const [type, setType] = useState('all');


  const {match: {params: {id}}} = props

  const {route} = props;

  useEffect(() => {
    setType(id)
    setChartData([])
    setLoading(true)

    const chart = new Chart({
      container: 'c1', // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300, // 指定图表高度
    });
    chart.interval().position('timer*num');

    setTimeout(() => {
      readAll().then(res => {
        setChartData(filterChartData(res, id))
        chart.data(filterChartData(res, id));
        chart.render();
        setLoading(false)
      }).catch(err => {
        console.log(err);
      })
    }, 1000);
  }, [id])
  return (
    <TodoListWrapper key="1">
      {
        loading ? <LoadingWrapper>数据加载中</LoadingWrapper> : null
      }
      <div id="c1" style={{display: `${chartData.length > 0 ? 'block' : 'none'}`}}></div>
    </TodoListWrapper>
  )
}

export default React.memo(Visualization);