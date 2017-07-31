// https://github.com/jimbolla/react-redux-perf/blob/connect-rewrite/src/components/pair.jsx
// http://broadsw0rd.github.io/react-redux-perf/

import * as React from 'react';
import { Dispatch } from 'redux';




/*import { createSelector } from 'reselect'
const shopItemsSelector = (state: string[]) => state
const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item, '')
)*/

/*import {
  addTodo,
  editTodo,
  clearCompleted,
  completeAll,
  completeTodo,
  deleteTodo
} from '../../todos/actions';*/

import ControlPanel from './control-panel/ControlPanel';
import TickerList from './ticker-list/TickerList';


interface IAppProps {
  dispatch: Dispatch<{}>;
}

/*
interface StateFromProps {
  label: string;
  clickCount: number;
}

interface DispatchFromProps {
  handleClick: () => void;
}

const mapStateToProps = (state: State) => ({
  clickCount: state.myData.clickCount
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  handleClick: () => dispatch(incrementCounterAction())
});

export default connect<StateFromProps, DispatchFromProps, { label: string }>(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

*/

/*
export default connect<StateFromProps, DispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
*/

class App extends React.Component<null, null> {
  render() {
    return (
      <div>
        <ControlPanel></ControlPanel>
        <TickerList></TickerList>
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;