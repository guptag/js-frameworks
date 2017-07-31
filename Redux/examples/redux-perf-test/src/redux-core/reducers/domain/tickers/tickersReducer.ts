/*

export function goodReducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === INCREASE_COUNTER) {
    partialState = {
      counterTypoError: state.counter + 1, // Error: Object literal may only specify known properties, and 'counterTypoError' does not exist in type 'Partial<State>'. 
    }; // now it's showing a typo error correctly 
  }
  if (action.type === CHANGE_BASE_CURRENCY) {
    partialState = { // Error: Types of property 'baseCurrency' are incompatible. Type 'number' is not assignable to type 'string'.
      baseCurrency: 5,
    }; // type errors also works fine 
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
*/

import  {
  AppAction,
  ADD_TICKER,
  UPDATE_VOLUME,
  UPDATE_PRICE,
  UPDATE_SECTOR
} from '../../../actions/actions';

export interface ITickerData {
  ticker: string;
  company: string;
  change: number;
  sector: string;
  industry: string;
  last: number;
  price: number;
  sma20: number;
  sma50: number;
  sma200: number;
  volume: number;
  avgVol: number;
}

export type ITickersHash = { [ticker: string]: ITickerData; };

export const DefaultTickersState: ITickersHash = {};

type ITickersReducer = (state: ITickersHash, action: AppAction) => ITickersHash;
export const tickersReducer: ITickersReducer = (state: ITickersHash = DefaultTickersState, action: AppAction): ITickersHash => {
  switch (action.type) {
    case ADD_TICKER:
      return {
        ...state,
        [action.ticker]: action.tickerData
      }
    case UPDATE_PRICE:
      return {
        ...state,
        [action.ticker]: {
          ...state[action.ticker],
          change: action.change,
          price: action.price
        }
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        [action.ticker]: {
          ...state[action.ticker],
          volume: action.volume
        }
      };
    case UPDATE_SECTOR:
      return {
        ...state,
        [action.ticker]: {
          ...state[action.ticker],
          sector: action.sector
        }
      };
    default:
      return state;
  }
}



/*

{
"_id":{
"$oid":"52853800bb1177ca391c17ff"
},
"Ticker":"A",
"ProfitMargin":0.137,
"InstOwnership":0.847,
"EPS_5Y":0.0843,
"Total_Debt_Equity":0.56,
"Current Ratio":3,
"ROA":0.089,
"Sector":"Healthcare",
"P/S":2.54,
"ChangeFromOpen":-0.0148,
"Perf_YTD":0.2605,
"Perf_1W":0.0031,
"QuickRatio":2.3,
"InsiderTransactions":-0.1352,
"P/B":3.63,
"EPS_Q":-0.29,
"Payout Ratio":0.162,
"Perf_1Q":0.0928,
"Forward_PE":16.11,
"P/E":19.1,
"SMA200":0.1062,
"SharesOutstanding":339,
"Earnings Date":{
"$date":1384464600000
},
"High52W":-0.0544,
"P/Cash":7.45,
"Change":-0.0148,
"AnalystRecom":1.6,
"Volatility_W":0.0177,
"Country":"USA",
"ROE":0.182,
"Low50D":0.0728,
"Price":50.44,
"High50D":-0.0544,
"ROI":0.163,
"Shares Float":330.21,
"DividendYield":0.0094,
"Industry":"Medical Laboratories & Research",
"Beta":1.5,
"SALES_GROWTH_Q":-0.041,
"OperatingMargin":0.187,
"EPS (ttm)":2.68,
"PEG":2.27,
"FloatShort":0.008,
"Low52W":0.4378,
"ATR":0.86,
"EPSGrowthYear":0.1194,
"Sales_5Y":0.048,
"Company":"Agilent Technologies Inc.",
"Gap":0,
"RelVol":0.79,
"Volatility_M":0.0168,
"Market Cap":17356.8,
"Volume":1847978,
"GrossMargin":0.512,
"Short Ratio":1.03,
"Perf_6M":0.1439,
"RSI":46.51,
"InsiderOwnership":0.001,
"SMA20":-0.0172,
"Perf_1M":0.0063,
"P_FCF":19.63,
"InstTran":-0.0074,
"Perf_1Y":0.4242,
"LT Debt/Equity":0.56,
"AvgVol":2569.36,
"EPS_1Y":0.147,
"SMA50":-0.0055
},





*/





