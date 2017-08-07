export enum ControlPanelActionType {
  Replace,
  Add,
  Delete,
  Update
};

export const ControlPanelDefaults = {
  ReplaceTickerIntervalMSec: 500,
  AddTickerIntervalMSec: 100,
  DeleteTickerIntervalMSec: 100,
  UpdateValuesIntervalMSec: 10,

  ReplaceIncrementMsec: 50,
  AddIncrementMsec: 50,
  UpdateIncrementMsec: 5,
  DeleteIncrementMsec: 50,

  MinReplaceIntervalMsec: 50,
  MinAddIntervalMsec: 50,
  MinUpdateIntervalMsec: 5,
  MinDeleteIntervalMsec: 50
};

