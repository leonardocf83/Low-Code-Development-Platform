
import { getAsyncTypes } from '../helpers/actionType'
import * as AdmWizardRuleService from '../services/AdmWizardRuleService'
import { RintagiScreenRedux, initialRintagiScreenReduxState } from './_ScreenReducer'
const Label = {
  PostToAp: 'Post to AP',
}
class AdmWizardRuleRedux extends RintagiScreenRedux {
  allowTmpDtl = false;
  constructor() {
    super();
    this.ActionApiNameMapper = {
      'GET_SEARCH_LIST': 'GetAdmWizardRule50List',
      'GET_MST': 'GetAdmWizardRule50ById',
      'GET_DTL_LIST': 'GetAdmWizardRule50DtlById',
    }
    this.ScreenDdlDef = [
      { columnName: 'RuleTypeId73', payloadDdlName: 'RuleTypeId73List', keyName: 'RuleTypeId73', labelName: 'RuleTypeId73Text', forMst: true, isAutoComplete: false, apiServiceName: 'GetRuleTypeId73List', actionTypeName: 'GET_DDL_RuleTypeId73' },
      { columnName: 'WizardId73', payloadDdlName: 'WizardId73List', keyName: 'WizardId73', labelName: 'WizardId73Text', forMst: true, isAutoComplete: false, apiServiceName: 'GetWizardId73List', actionTypeName: 'GET_DDL_WizardId73' },
    ]
    this.ScreenOnDemandDef = [

    ]

    this.ScreenCriDdlDef = [
      { columnName: 'WizardId10', payloadDdlName: 'WizardId10List', keyName: 'WizardId', labelName: 'WizardTitle', isCheckBox:false, isAutoComplete: false, apiServiceName: 'GetScreenCriWizardId10List', actionTypeName: 'GET_DDL_CRIWizardId10' },
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
  GetScreenName() { return 'AdmWizardRule' }
  GetMstKeyColumnName(isUnderlining = false) { return isUnderlining ? 'WizardRuleId' : 'WizardRuleId73'; }
  GetDtlKeyColumnName(isUnderlining = false) { return isUnderlining ? '' : ''; }
  GetPersistDtlName() { return this.GetScreenName() + '_Dtl'; }
  GetPersistMstName() { return this.GetScreenName() + '_Mst'; }
  GetWebService() { return AdmWizardRuleService; }
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
      WizardRuleId73: copy ? null : mst.WizardRuleId73,
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
    || (state.ScreenCriteria.WizardId10 || {}).LastCriteria
    || state.ScreenCriteria.SearchStr;
}

export default new AdmWizardRuleRedux()
