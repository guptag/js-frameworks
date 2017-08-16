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

  ReplaceMinIntervalMsec: 50,
  AddMinIntervalMsec: 50,
  UpdateMinIntervalMsec: 5,
  DeleteMinIntervalMsec: 50
};

export const ActionDefaults = {
  AddActionTickerCount: 50,
  ReplaceActionTickerCount: 150,
  DeleteActionTickerCount: 50
}

