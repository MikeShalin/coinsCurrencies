import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import React, { Component } from 'react';
import { coinParamsActions } from 'ducks/coinParams';
import { coinListActions, coinListSelector } from 'ducks/coinlist';
import { connect } from 'react-redux';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export class App extends Component {
  componentDidMount() {
    const { requestCoinParams, requestCoinList } = this.props,
      params = {
        start: null,
        limit: null,
        convert: 'RUB',
        id: 'ethereum',
      };
    requestCoinParams(params);
    requestCoinList(Object.assign({}, params, { id: null }));
  }

  render() {
    const { coinList } = this.props;
    // console.log()
    return (
      <div>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        <ul>{coinList.map((coin, i) => <li key={i}>{coin.name}</li>)}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coinList: coinListSelector(state),
    // status: statusSelector(state),
    // result: resultSelector(state),
    // error: errorSelector(state),
    // fetching: fetchingSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  const actionsParam = coinParamsActions.coinParams,
    actionsList = coinListActions.coinList;
  return {
    requestCoinParams: params => {
      dispatch(actionsParam.requestCoinParams(params));
    },
    requestCoinList: params => {
      dispatch(actionsList.requestCoinList(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
