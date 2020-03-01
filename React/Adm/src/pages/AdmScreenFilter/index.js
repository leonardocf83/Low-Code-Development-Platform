
/* this is external interface(for import) for this screen */
import { naviPath } from '../../helpers/utils'
import MstList from './MstList';
import MstRecord from './MstRecord';

import DtlList from './DtlList';
import DtlRecord from './DtlRecord';
/* react router match by order of appearance in list so make sure wider match comes last, use order to control display order */
export const pagesRoutes = [
  {
    path: '/AdmScreenFilter/Mst/:mstId?',
    name: 'Master Record',
    short: 'MasterRecord',
    component: MstRecord,
    icon: 'briefcase',
    isPublic: false,
    type: 'MstRecord',
    order: 2,
    screenId: 59
  },

  {
    path: '/AdmScreenFilter/:mstId?/DtlList/:dtlId?',
    name: 'Detail List',
    short: 'DetailList',
    component: DtlList,
    icon: 'list-ul',
    isPublic: false,
    type: 'DtlList',
    order: 3,
    screenId : 59
  },
  {
    path: '/AdmScreenFilter/:mstId?/Dtl/:dtlId?',
    name: 'Detail Record',
    short: 'DetailRecord',
    component: DtlRecord,
    icon: 'picture-o',
    isPublic: false,
    type: 'DtlRecord',
    order: 4,
    screenId: 59
  },

  {
    path: '/AdmScreenFilter/:mstId?',
    name: 'Master List',
    short: 'MasterList',
    component: MstList,
    icon: 'usd',
    isPublic: false,
    type: 'MstList',
    order: 1,
    inMenu: true,
    menuLabel: 'AdmScreenFilter',
    screenId: 59
  },
]

function naviLabel(label, type) {
  if (type === 'MstList') return ((label || {}).MasterLst || {}).label || '';
  else if (type === 'MstRecord') return ((label || {}).MasterRec || {}).label || '';
  else if (type === 'DtlList') return ((label || {}).DetailLst || {}).label || '';
  else if (type === 'DtlRecord') return ((label || {}).DetailRec || {}).label || '';
  else return type;
}

export function getNaviBar(type, mst, dtl, label) {
  return pagesRoutes
    .sort((a, b) => a.order - b.order)
    .map((v, i) => {
      return {
        path: naviPath(v.type === 'MstList' ? '_' : mst.ScreenFilterId86, v.type === 'DtlList' ? '_' : dtl.ScreenFilterHlpId87, v.path),
        label: naviLabel(label, v.type),
        type: v.type,
        active: v.type === type,
      }
    });
}
