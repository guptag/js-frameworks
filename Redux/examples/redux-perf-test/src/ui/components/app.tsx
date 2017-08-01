import * as React from 'react';
import { Dispatch } from 'redux';

/*import { createSelector } from 'reselect'
const shopItemsSelector = (state: string[]) => state
const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item, '')
)*/

import ControlPanel from './control-panel/ControlPanel';
import TickerList from './ticker-list/TickerList';

interface IAppProps {
  dispatch: Dispatch<{}>;
}

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

export default App;