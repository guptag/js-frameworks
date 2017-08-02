import * as React from 'react';
import {observer} from 'mobx-react';

import ControlPanel from './control-panel/ControlPanel';
import TickerList from './ticker-list/TickerList';

import { tickerDataModel } from '../models/TickerDataModel';
import { controlPanelModel, IConrolPanelOptions} from '../models/ControlPanelModel';

interface IAppProps {

}
@observer
class App extends React.Component<IAppProps, null> {
  render() {
    console.log("app render");
    return (
      <div>
        <ControlPanel tickerDataModel={tickerDataModel} controlPanelModel={controlPanelModel}></ControlPanel>
        <TickerList tickerDataModel={tickerDataModel}></TickerList>
      </div>
    );
  }
}

export default App;