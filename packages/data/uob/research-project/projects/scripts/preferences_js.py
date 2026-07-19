"""Tab 1: degree entry and ranked interests, with results recomputed in place.

Interests and methods are ranked by dragging rows to the top of the list. There
is no separate priority control: position is the weight, so the first choice
counts 5 and anything past the fifth counts 0. Preferences live in localStorage
and every change rebuilds the view models the results tab renders from, so the
dashboard never needs a server.
"""

from __future__ import annotations


PREFERENCES_JS = r"""
const STORAGE_KEY='uob-research-projects.preferences.v1';
let preferenceState=null;

const defaults=()=>({programme:data.config.programme||'',
  interest:scopeFrom(data.config.subject_categories,data.config.interest),
  method:scopeFrom(data.config.method_categories,data.config.method)});

/** One list's state: the rows that count, and the ones below them. */
function scopeFrom(names,weights){const ranked=rankedOrder(weights);
  return {ranked,rest:unrankedRest(names,ranked)}}

/** Keep every category exactly once: saved order first, new ones appended. */
function reconcile(saved,names,fallback){
  if(!saved||!Array.isArray(saved.ranked))return fallback;
  const ranked=saved.ranked.filter(name=>names.includes(name)).slice(0,MAX_RANKED);
  const rest=(Array.isArray(saved.rest)?saved.rest:[]).filter(name=>names.includes(name)&&!ranked.includes(name));
  return {ranked,rest:rest.concat(names.filter(name=>!ranked.includes(name)&&!rest.includes(name)))}}

function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return defaults();
  const saved=JSON.parse(raw);const base=defaults();
  return {programme:saved.programme??base.programme,
    interest:reconcile(saved.interest,data.config.subject_categories,base.interest),
    method:reconcile(saved.method,data.config.method_categories,base.method)};}
  catch(error){return defaults()}}

function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(preferenceState))}
  catch(error){/* private browsing: keep working without persistence */}}

function currentConfig(){return {...data.config,
  programme:preferenceState.programme,
  interest:rankedWeights(preferenceState.interest.ranked),
  method:rankedWeights(preferenceState.method.ranked)}}

/** Drag-and-drop is a mouse affordance; these buttons carry touch and keyboard. */
function moveRow(list,name,step){const rows=[...list.querySelectorAll('li')];
  const index=rows.findIndex(li=>li.dataset.name===name);
  const target=index+step;
  if(index<0||target<0||target>=rows.length)return;
  if(step<0)list.insertBefore(rows[index],rows[target]);
  else list.insertBefore(rows[target],rows[index]);
  recordOrder(list,name);afterChange(true)}

function moveButton(list,name,label,glyph,step,disabled){
  const button=document.createElement('button');
  button.type='button';button.className='move';button.textContent=glyph;
  button.disabled=disabled;
  button.setAttribute('aria-label',label+' '+name);
  button.addEventListener('click',()=>moveRow(list,name,step));
  return button}

function weightRow(list,name,weight,index,count){const row=document.createElement('li');
  row.draggable=true;row.dataset.name=name;
  if(!weight){row.classList.add('off')}
  else row.dataset.weight=String(weight);
  const grip=document.createElement('span');grip.className='grip';grip.textContent='\u2261';
  const label=document.createElement('span');label.className='name';label.textContent=name;
  const badge=document.createElement('span');badge.className='weight';
  badge.textContent=weight?String(weight):'0';
  badge.setAttribute('aria-label',weight?`counts ${weight}`:'outside the top three');
  row.append(grip,label,badge,
    moveButton(list,name,'Move up','\u25B2',-1,index===0),
    moveButton(list,name,'Move down','\u25BC',1,index===count-1));
  return row}

function renderRankList(id,scope){const list=byId(id);list.replaceChildren();
  const weights=rankedWeights(preferenceState[scope].ranked);
  const ordered=[...preferenceState[scope].ranked,...preferenceState[scope].rest];
  ordered.forEach((name,index)=>list.appendChild(weightRow(list,name,weights[name],index,ordered.length)))}

/** Bound once per list: re-rendering replaces the rows, not the listeners. */
function enableDragAndDrop(list){let dragged=null;
  list.addEventListener('dragstart',event=>{dragged=event.target.closest('li');
    if(dragged){dragged.classList.add('dragging');event.dataTransfer.effectAllowed='move'}});
  list.addEventListener('dragend',()=>{if(dragged)dragged.classList.remove('dragging');
    dragged=null;list.querySelectorAll('li').forEach(li=>li.classList.remove('over'))});
  list.addEventListener('dragover',event=>{event.preventDefault();
    const target=event.target.closest('li');if(!target||target===dragged)return;
    list.querySelectorAll('li').forEach(li=>li.classList.remove('over'));target.classList.add('over')});
  list.addEventListener('drop',event=>{event.preventDefault();
    const target=event.target.closest('li');
    if(dragged&&target&&target!==dragged&&dragged.parentElement===list&&target.parentElement===list){
      list.insertBefore(dragged,target);recordOrder(list,dragged.dataset.name)}
    list.querySelectorAll('li').forEach(li=>li.classList.remove('over'));afterChange(true)})}

/**
 * Read the new order off the DOM and split it back into ranked and the rest.
 * Dragging a row into the block makes it count and pushes the weakest one out;
 * dragging a ranked row past the fifth stops it counting. The block never
 * exceeds MAX_RANKED, so a three-method profile never promotes a fourth.
 */
function recordOrder(list,moved){const scope=list.id==='interest-list'?'interest':'method';
  const order=[...list.querySelectorAll('li')].map(li=>li.dataset.name);
  const before=new Set(preferenceState[scope].ranked);
  const index=order.indexOf(moved);
  let count=before.size;
  if(before.has(moved)&&index>=count)count-=1;
  else if(!before.has(moved)&&index<count)count+=1;
  count=Math.max(0,Math.min(count,MAX_RANKED));
  preferenceState[scope]={ranked:order.slice(0,count),rest:order.slice(count)}}

function describeSelection(){const count=scope=>preferenceState[scope].ranked.length;
  const interests=count('interest');const methods=count('method');
  return `${interests} interest${interests===1?'':'s'}, ${methods} method${methods===1?'':'s'}`}

function afterChange(rerenderList){saveState();
  if(rerenderList)renderPreferencePanel();
  applyPreferences();byId('setup-summary').textContent=describeSelection()}

/** Rebuild the rows the results tab renders from, then redraw it. */
function applyPreferences(){const cfg=currentConfig();
  const rows=rescoreProjects(cfg);
  const byTitle=new Map(rows.map(row=>[row.project.title,row]));
  projects=rows.map(row=>viewModel(row.project,row));
  supervisors=rescoreSupervisors(cfg);
  activeDimensions=[...new Set(rows.flatMap(row=>row.active))];
  repopulateFilter('interest',selectedInterests(),'All preferred interests');
  repopulateFilter('method',selectedMethods(),'All preferred methods');
  renderAll()}

/** Overlay the recomputed scores onto the project's stored facts. */
function viewModel(project,row){return {...project,ratings:project.feasibility||{},rank:row.rank,
  interest_match:row.scores['Interest match'],method_match:row.scores['Method match'],
  supervisor_focus_match:row.scores['Supervisor focus match'],
  feasibility:row.scores.Feasibility,programme_fit:row.scores['Programme relevance'],
  matching_interests:row.interest.matched.join('; '),
  matching_methods:row.method.matched.join('; '),
  matching_supervisor_focus:row.focus.matched.join('; '),
  project_contributions:contributionText(row.interest.contributions),
  supervisor_contributions:contributionText(row.focus.contributions)}}

function contributionText(contributions){return Object.entries(contributions)
  .sort((a,b)=>b[1]-a[1]).map(([name,value])=>`${name}=${value}`).join('; ')}

function repopulateFilter(id,values,first){const select=byId(id);
  const chosen=select.value;select.replaceChildren(new Option(first,''));
  values.forEach(value=>select.appendChild(new Option(value,value)));
  select.value=values.includes(chosen)?chosen:''}

/** Programmes come from the projects themselves, so every option can match. */
function fillProgrammeOptions(){const select=byId('programme');
  const current=preferenceState.programme;
  const names=[...new Set(data.projects.flatMap(p=>p.programmes||[]))].sort();
  select.replaceChildren(new Option('Any programme',''));
  names.forEach(name=>select.appendChild(new Option(name,name)));
  if(current&&!names.includes(current))select.appendChild(new Option(current,current));
  select.value=names.includes(current)?current:''}

function selectTab(name){['setup','results'].forEach(key=>{
    byId('panel-'+key).hidden=key!==name;
    byId('tab-'+key).setAttribute('aria-selected',String(key===name))})}

function setupTabs(){byId('tab-setup').addEventListener('click',()=>selectTab('setup'));
  byId('tab-results').addEventListener('click',()=>selectTab('results'));
  byId('to-results').addEventListener('click',()=>selectTab('results'));
  byId('reset').addEventListener('click',()=>{preferenceState=defaults();saveState();
    renderPreferencePanel();afterChange(false);selectTab('setup')})}

function renderPreferencePanel(){fillProgrammeOptions();
  renderRankList('interest-list','interest');
  renderRankList('method-list','method')}

function startPreferences(){preferenceState=loadState();
  renderPreferencePanel();setupTabs();setupFilters();watchFilters();
  enableDragAndDrop(byId('interest-list'));enableDragAndDrop(byId('method-list'));
  byId('programme').addEventListener('change',event=>{preferenceState.programme=event.target.value;
    afterChange(false)});
  afterChange(false)}
startPreferences();
"""
