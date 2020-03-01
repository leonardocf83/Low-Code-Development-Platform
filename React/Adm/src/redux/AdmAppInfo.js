
import { getAsyncTypes } from '../helpers/actionType'
import * as AdmAppInfoService from '../services/AdmAppInfoService'
import { RintagiScreenRedux, initialRintagiScreenReduxState } from './_ScreenReducer'
const Label = {
  PostToAp: 'Post to AP',
}
class AdmAppInfoRedux extends RintagiScreenRedux {
  allowTmpDtl = false;
  constructor() {
    super();
    this.ActionApiNameMapper = {
      'GET_SEARCH_LIST': 'GetAdmAppInfo82List',
      'GET_MST': 'GetAdmAppInfo82ById',
      'GET_DTL_LIST': 'GetAdmAppInfo82DtlById',
    }
    this.ScreenDdlDef = [
      { columnName: 'CultureTypeName135', payloadDdlName: 'CultureTypeName135List', keyName: 'CultureTypeName135', labelName: 'CultureTypeName135Text', forMst: true, isAutoComplete: true, apiServiceName: 'GetCultureTypeName135List', actionTypeName: 'GET_DDL_CultureTypeName135' },
      { columnName: 'AppItemLink135', payloadDdlName: 'AppItemLink135List', keyName: 'AppItemLink135', labelName: 'AppItemLink135Text', forMst: true, isAutoComplete: false, apiServiceName: 'GetAppItemLink135List', actionTypeName: 'GET_DDL_AppItemLink135' },
    ]
    this.ScreenOnDemandDef = [

    ]

    this.ScreenCriDdlDef = [
      
    ]
    this.SearchActions = {
      ...[...this.ScreenDdlDef].reduce((a, v) => { a['Search' + v.columnName] = this.MakeSearchAction(v); return a; }, {}),
      ...[...this.ScreenCriDdlDef].reduce((a, v) => { a['SearchCri' + v.columnName] = this.MakeSearchAction(v); return a; }, {}),
      ...[...this.ScreenOnDemandDef].reduce((a, v) => { a['Get' + v.columnName] = this.MakeGetColumnOnDemandAction(v); return a; }, {}),
    }
    this.ScreenDdlSelectors = this.ScreenDdlDef.reduce((a, v) => { a[v.columnName] = this.MakeDdlSelectors(v); return a; }, {})
    this.ScreenCriDdlSelectors = this.ScreenCriDdlDef.reduce((a, v) => { a[v.columnName] = this.MakeCriDdlSelectors(v); return a; }, {})
    this.actionReducers = this.MakeActionReducers();
  }
  GetScreenName() { return 'AdmAppInfo' }
  GetMstKeyColumnName(isUnderlining = false) { return isUnderlining ? 'AppInfoId' : 'AppInfoId135'; }
  GetDtlKeyColumnName(isUnderlining = false) { return isUnderlining ? '' : ''; }
  GetPersistDtlName() { return this.GetScreenName() + '_Dtl'; }
  GetPersistMstName() { return this.GetScreenName() + '_Mst'; }
  GetWebService() { return AdmAppInfoService; }
  GetReducerActionTypePrefix() { return this.GetScreenName(); };
  GetActionType(actionTypeName) { return getAsyncTypes(this.GetReducerActionTypePrefix(), actionTypeName); }
  GetInitState() {
    return {
      ...initialRintagiScreenReduxState,
      Label: {
        ...initialRintagiScreenReduxState.Label,
        ...Label,
      }
    }
  };

  GetDefaultDtl(state) {
    return (state || {}).NewDtl ||
    {

    }
  }
  ExpandMst(mst, state, copy) {
    return {
      ...mst,
      key: Date.now(),
      AppInfoId135: copy ? null : mst.AppInfoId135,
    }
  }
  ExpandDtl(dtlList, copy) {
    return dtlList;
  }

  SearchListToSelectList(state) {
    const searchList = ((state || {}).SearchList || {}).data || [];
    return searchList
      .map((v, i) => {
        return {
          key: v.key || null,
          value: v.labelL || v.label || ' ',
          label: v.labelL || v.label || ' ',
          labelR: v.labelR || ' ',
          detailR: v.detailR,
          detail: v.detail || '',
          idx: i,
          isSelected: v.isSelected,
        }
      })
  }
}

/* ReactRule: Redux Custom Function */

/* ReactRule End: Redux Custom Function */

/* helper functions */

export function ShowMstFilterApplied(state) {
  return !state
    || !state.ScreenCriteria
    || (state.ScreenCriteria.VersionDt10 || {}).LastCriteria
    || state.ScreenCriteria.SearchStr;
}

export default new AdmAppInfoRedux()
