"""Dashboard behaviour, injected as an inline script."""

from __future__ import annotations


SCRIPT = """
// `data` is declared by the page shell before this region runs.
// Rebuilt by preferences_js whenever the ranking changes.
let projects=data.projects, supervisors=data.supervisors, activeDimensions=[];
const byId=id=>document.getElementById(id);
const num=value=>Number.parseFloat(value)||0;
const tags=value=>(value||'').split(';').map(s=>s.trim()).filter(Boolean);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const familyOf=tag=>{for(const[family,members]of Object.entries(data.families))if(members.includes(tag))return family;return tag};
const selectedInterestFamilies=()=>[...new Set(selectedInterests().map(familyOf))];
const selectedInterests=()=>Object.keys(currentConfig().interest).filter(name=>currentConfig().interest[name]>0);
const selectedMethods=()=>Object.keys(currentConfig().method).filter(name=>currentConfig().method[name]>0);
const matches=(project,interest)=>tags(project.matching_interests).some(tag=>familyOf(tag)===familyOf(interest));
const matchesMethod=(project,name)=>tags(project.matching_methods).includes(name);
function pill(text,kind){return `<span class="pill${kind?' '+kind:''}">${esc(text)}</span>`}
function fillSelect(id,values,first){const select=byId(id);for(const value of values){const option=document.createElement('option');
  option.value=value;option.textContent=value;select.appendChild(option)}select.insertBefore(new Option(first,''),select.firstChild)}
function renderSummary(){byId('active-dimensions').textContent=activeDimensions.join(', ')||'no active dimensions';
  byId('project-count').textContent=projects.length;
  byId('best-fit').textContent=Math.max(0,...projects.map(p=>num(p.interest_match)))+'%';
  const focus=supervisors.map(s=>num(s.focus_match));
  byId('best-focus').textContent=(focus.length?Math.max(...focus):'—')+'%';
  byId('feasibility-count').textContent=projects.filter(p=>Object.keys(p.ratings||{}).length>0).length+' of '+projects.length}
function renderScatter(){const width=560,height=300,left=48,bottom=252;
  const points=projects.map(p=>`<circle cx="${left+num(p.interest_match)*4.8}" cy="${bottom-num(p.information_completeness)*2.1}" r="5" fill="#2463a6"><title>${esc(p.title)} · interest ${num(p.interest_match).toFixed(0)}% · info ${num(p.information_completeness).toFixed(0)}%</title></circle>`).join('');
  const ticks=[0,25,50,75,100].map(v=>`<text x="${left+v*4.8-8}" y="272">${v}</text><text x="16" y="${bottom-v*2.1+4}">${v}</text>`).join('');
  byId('scatter').innerHTML=`<svg viewBox="0 0 ${width} ${height}"><line x1="${left}" y1="${bottom}" x2="528" y2="${bottom}" stroke="#64748b"/><line x1="${left}" y1="42" x2="${left}" y2="${bottom}" stroke="#64748b"/><text x="230" y="292">Interest fit (%)</text><text x="4" y="30">Info</text><text x="4" y="44">completeness</text>${ticks}${points}</svg>`}
function renderHeatmap(){const top=projects.slice(0,20);
  const interests=selectedInterests();
  if(!interests.length){byId('heatmap').innerHTML='<p class="muted">Pick at least one interest to see the heatmap.</p>';return}
  const column=150,left=250,head=interests.map((name,i)=>`<text x="${left+i*column+4}" y="20">${esc(name)}</text>`).join('');
  const rows=top.map((p,i)=>{const y=34+i*27;
    const cells=interests.map((name,j)=>{const on=matches(p,name);
      return `<rect x="${left+j*column}" y="${y}" width="130" height="22" rx="4" fill="${on?'#4388c8':'#edf1f5'}"><title>${esc(p.title)} \u00b7 ${esc(name)}: ${on?'match':'no match'}</title></rect>`}).join('');
    return `<text x="0" y="${y+16}">${i+1}. ${esc(p.title.slice(0,35))}</text>${cells}`}).join('');
  byId('heatmap').innerHTML=`<svg viewBox="0 0 ${left+interests.length*column} ${40+top.length*27}">${head}${rows}</svg>`}
function visibleSupervisors(){const query=byId('supervisor-search').value.toLowerCase();
  return supervisors.filter(s=>!query||[s.name,s.research_focus,s.focus_categories].join(' ').toLowerCase().includes(query))}
function renderSupervisors(){const body=byId('supervisors');body.replaceChildren();
  for(const s of visibleSupervisors()){const row=document.createElement('tr');
    const name=document.createElement('td');name.textContent=s.name;row.appendChild(name);
    const fit=document.createElement('td');
    fit.innerHTML=s.focus_match===undefined||s.focus_match===null?pill('unverified','warn'):pill(num(s.focus_match).toFixed(0)+'%','focus');
    row.appendChild(fit);
    const count=document.createElement('td');count.textContent=s.project_count;row.appendChild(count);
    const focus=document.createElement('td');focus.textContent=s.research_focus||'—';row.appendChild(focus);
    const hit=document.createElement('td');hit.innerHTML=tags(s.focus_categories).filter(t=>data.interests.some(i=>familyOf(i)===familyOf(t))).map(t=>pill(t,'focus')).join('')||'—';
    row.appendChild(hit);
    const contact=document.createElement('td');
    contact.innerHTML=[s.email?`<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>`:'',
      s.website?`<a href="${esc(s.website)}" target="_blank" rel="noopener">profile</a>`:''].filter(Boolean).join(' · ')||'—';
    row.appendChild(contact);body.appendChild(row)}}
function renderNetwork(){const edges=new Map();
  const families=selectedInterestFamilies();
  for(const s of supervisors){const hit=tags(s.focus_categories).filter(t=>families.includes(familyOf(t)));
    for(const tag of hit){const key=`${s.name}|${familyOf(tag)}`;
      if(!edges.has(key))edges.set(key,{supervisor:s.name,family:familyOf(tag),tags:new Set()});
      edges.get(key).tags.add(tag)}}
  const coverage=new Map();for(const edge of edges.values())coverage.set(edge.supervisor,(coverage.get(edge.supervisor)||0)+1);
  const top=[...coverage.keys()].sort((a,b)=>coverage.get(b)-coverage.get(a)||a.localeCompare(b)).slice(0,20);
  const height=Math.max(220,top.length*31+40);
  if(!families.length){byId('network').innerHTML='<p class="muted">Pick at least one interest to see the graph.</p>';return}
  const paths=[...edges.values()].filter(e=>top.includes(e.supervisor)).map(e=>{
    const y=top.indexOf(e.supervisor), x=families.indexOf(e.family);
    if(y<0||x<0)return '';
    const width=1+Math.min(3,e.tags.size-1);
    return `<line x1="230" y1="${40+x*48}" x2="470" y2="${28+y*31}" stroke="#9aaaba" stroke-width="${width}"><title>${esc(e.supervisor)}: ${esc([...e.tags].join(', '))}</title></line>`}).join('');
  const left=families.map((f,i)=>`<circle cx="220" cy="${40+i*48}" r="7" fill="#e28e2c"/><text x="0" y="${44+i*48}">${esc(f)}</text>`).join('');
  const right=top.map((name,i)=>`<circle cx="470" cy="${28+i*31}" r="6" fill="#2463a6"/><text x="482" y="${32+i*31}">${esc(name)}</text>`).join('');
  byId('network').innerHTML=`<svg viewBox="0 0 800 ${height}">${paths}${left}${right}</svg>`}
function visibleProjects(){const query=byId('search').value.toLowerCase();
  const type=byId('type').value, interest=byId('interest').value, method=byId('method').value;
  const minimum=num(byId('minimum').value), focusMinimum=num(byId('minimum-focus').value);
  return projects.filter(p=>{const hay=[p.title,p.supervisors,p.topic,p.methodology,p.skills_requirements,
      p.recommended_practical,p.recommended_data_module,p.supervisor_research_focus].join(' ').toLowerCase();
    const focusOk=p.supervisor_focus_match===undefined||p.supervisor_focus_match===null||num(p.supervisor_focus_match)>=focusMinimum;
    return hay.includes(query)&&(!type||p.project_type===type)&&(!interest||matches(p,interest))
      &&(!method||matchesMethod(p,method))&&num(p.interest_match)>=minimum&&focusOk})}
function supervisorCell(p){const focus=p.supervisor_focus_match;
  const badge=focus===undefined||focus===null?'':` ${pill(num(focus).toFixed(0)+'%','focus')}`;
  const detail=p.supervisor_research_focus?`<span class="sup">${esc(p.supervisor_research_focus)}</span>`:'';
  return `${esc(p.supervisors||'—')}${badge}${detail}`}
function renderTable(){const body=byId('projects');body.replaceChildren();
  for(const p of visibleProjects()){const row=document.createElement('tr');
    const rank=document.createElement('td');rank.className='rank';
    rank.textContent=`#${p.rank} · ${num(p.interest_match).toFixed(0)}%`;row.appendChild(rank);
    const title=document.createElement('td');const link=document.createElement('a');
    link.textContent=p.title;link.href=data.source_base+encodeURIComponent(p.source_file);
    title.appendChild(link);
    const categories=document.createElement('div');categories.className='sup';
    categories.innerHTML=tags(p.categories).map(c=>pill(c)).join(' ');title.appendChild(categories);row.appendChild(title);
    const supervisor=document.createElement('td');supervisor.innerHTML=supervisorCell(p);row.appendChild(supervisor);
    const methods=document.createElement('td');methods.innerHTML=tags(p.methods).map(m=>pill(m)).join(' ')||'—';row.appendChild(methods);
    const why=document.createElement('td');
    why.textContent=[p.project_contributions,p.supervisor_contributions,p.supervisor_focus_status].filter(Boolean).join(' · ')||'—';
    row.appendChild(why);
    row.appendChild(cell(p.requirement_review));row.appendChild(cell(p.ethics_status));body.appendChild(row)}
  byId('result-count').textContent=`Showing ${visibleProjects().length} of ${projects.length} projects`;
  byId('minimum-value').textContent=byId('minimum').value+'%';
  byId('minimum-focus-value').textContent=byId('minimum-focus').value+'%'}
function cell(value){const td=document.createElement('td');td.textContent=value||'—';return td}
function setupFilters(){fillSelect('type',[...new Set(data.projects.map(p=>p.project_type).filter(Boolean))].sort(),'All types')}
function renderAll(){renderSummary();renderScatter();renderHeatmap();renderSupervisors();renderNetwork();renderTable()}
function watchFilters(){for(const id of ['search','type','interest','method','minimum','minimum-focus','supervisor-search'])
  byId(id).addEventListener('input',id==='supervisor-search'?renderSupervisors:renderTable)}
"""