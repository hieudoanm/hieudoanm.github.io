"""Build a self-contained interactive HTML explorer from the latest ranking."""

from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).parent.parent
INPUT = ROOT / "csv" / "projects_rankings.csv"
OUTPUT = ROOT / "reports" / "projects_dashboard.html"


def read_projects(path: Path = INPUT) -> list[dict[str, str]]:
    """Read the current ranking rows for dashboard embedding."""
    if not path.is_file():
        raise FileNotFoundError(f"{path} is missing; run `make rank` first")
    with path.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))
    if not rows:
        raise ValueError(f"{path} has no projects")
    return rows


def json_for_script(rows: list[dict[str, str]]) -> str:
    """Serialize data safely for an inline script block."""
    return json.dumps(rows, ensure_ascii=False).replace("<", "\\u003c")


def dashboard_html(rows: list[dict[str, str]]) -> str:
    """Return a responsive filterable dashboard with charts and project details."""
    data = json_for_script(rows)
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Research project explorer</title>
<style>
:root{{font:15px/1.5 system-ui,sans-serif;color:#18212b;background:#f4f6f8}}body{{margin:0}}
main{{max-width:1280px;margin:auto;padding:28px}}h1{{margin:0 0 4px}}.muted{{color:#5d6875}}
.cards,.charts,.filters{{display:grid;gap:14px}}.cards{{grid-template-columns:repeat(3,minmax(0,1fr));margin:18px 0}}
.card,section,.filters{{background:#fff;border:1px solid #dce2e8;border-radius:10px;padding:16px}}
.charts{{grid-template-columns:1fr 1fr}}.filters{{grid-template-columns:2fr 1fr 1fr 1fr;align-items:end}}
label{{display:block;font-weight:600}}input,select{{width:100%;box-sizing:border-box;padding:9px;border:1px solid #aeb9c5;border-radius:6px;margin-top:5px}}
table{{border-collapse:collapse;width:100%;background:white}}th,td{{padding:9px;border-bottom:1px solid #e4e8ec;text-align:left;vertical-align:top}}th{{position:sticky;top:0;background:#edf2f7}}
.table-wrap{{overflow:auto;max-height:70vh;border:1px solid #dce2e8;border-radius:8px}}.pill{{display:inline-block;padding:2px 7px;background:#e7f0ff;border-radius:999px;margin:1px;font-size:.86em}}
svg{{width:100%;height:auto;overflow:visible}}.network{{max-height:590px;overflow:auto}}.notice{{padding:10px;background:#fff4d9;border-radius:7px}}
@media(max-width:820px){{.charts,.filters,.cards{{grid-template-columns:1fr}}main{{padding:15px}}}}
</style></head><body><main>
<h1>Research project explorer</h1>
<div class="muted">Rankings reflect the configured interest profile. Requirements and feasibility need your review; blank ratings are not treated as a poor fit.</div>
<div class="cards"><div class="card"><b>Projects</b><div id="project-count"></div></div><div class="card"><b>Best current interest fit</b><div id="best-fit"></div></div><div class="card"><b>Feasibility assessments</b><div id="feasibility-count"></div></div></div>
<p class="notice">Scatter plot shows interest fit against how completely the source describes project requirements. This is a documentation measure, not a judgement of your readiness.</p>
<div class="charts"><section><h2>Interest fit vs. information completeness</h2><div id="scatter"></div></section><section><h2>Interest heatmap · top 20</h2><div id="heatmap"></div></section></div>
<section><h2>Supervisor and interest graph</h2><div class="muted">Edges connect supervisors to preferred-interest areas represented in their projects. The graph shows up to 18 supervisors with the most matching projects.</div><div class="network" id="network"></div></section>
<section><h2>Find projects</h2><div class="filters"><label>Search title, supervisor or requirements<input id="search" type="search" placeholder="e.g. EEG, Python, language"></label><label>Project type<select id="type"><option value="">All types</option></select></label><label>Interest area<select id="interest"><option value="">All preferred interests</option></select></label><label>Research method<select id="method"><option value="">All methods</option></select></label><label>Minimum interest fit<input id="minimum" type="range" min="0" max="100" value="0"><span id="minimum-value">0%</span></label></div>
<p id="result-count" class="muted"></p><div class="table-wrap"><table><thead><tr><th>Rank / fit</th><th>Project</th><th>Supervisor</th><th>Categories</th><th>Methods</th><th>Why it matched</th><th>Requirements to review</th><th>Ethics</th></tr></thead><tbody id="projects"></tbody></table></div></section>
</main><script>
const allProjects={data};
const interests=['AI, machine learning & data science','Language development','Neuroscience & brain imaging','Software & tool development'];
const methods=['Behavioural & experimental methods','Computational modelling','Eye tracking','Longitudinal & observational research','Neuroimaging & electrophysiology','Qualitative interviews & focus groups','Questionnaires & surveys','Secondary data analysis','Literature review & evidence synthesis'];
const byId=id=>document.getElementById(id);
const number=value=>Number.parseFloat(value)||0;
const hasInterest=(project,name)=>project['Matching interests'].split(';').includes(name);
const hasMethod=(project,name)=>project['Matching methods'].split(';').includes(name);
function addCell(row,value){{const cell=document.createElement('td');cell.textContent=value||'—';row.appendChild(cell);return cell}}
function fillTypes(){{const types=[...new Set(allProjects.map(p=>p['Project Type']).filter(Boolean))].sort();for(const type of types){{const option=document.createElement('option');option.value=type;option.textContent=type;byId('type').appendChild(option)}}for(const name of interests){{const option=document.createElement('option');option.value=name;option.textContent=name;byId('interest').appendChild(option)}}for(const name of methods){{const option=document.createElement('option');option.value=name;option.textContent=name;byId('method').appendChild(option)}}}}
function visibleProjects(){{const query=byId('search').value.toLowerCase();const type=byId('type').value;const interest=byId('interest').value;const method=byId('method').value;const minimum=number(byId('minimum').value);return allProjects.filter(p=>{{const haystack=[p['Project title'],p.Supervisor,p.Topic,p.Methodology,p['Skills & requirements'],p['Recommended practical'],p['Recommended data science module']].join(' ').toLowerCase();return haystack.includes(query)&&(!type||p['Project Type']===type)&&(!interest||hasFamily(p,interest))&&(!method||hasMethod(p,method))&&number(p['Interest fit (%)'])>=minimum}})}}
function renderTable(){{const body=byId('projects');body.replaceChildren();for(const p of visibleProjects()){{const row=document.createElement('tr');addCell(row,`#${{p.Rank}} · ${{p['Interest fit (%)']||0}}%`);const title=addCell(row,'');const link=document.createElement('a');link.textContent=p['Project title'];link.href='../md/projects/'+encodeURIComponent(p['Source file']);title.appendChild(link);addCell(row,p.Supervisor);addCell(row,p.Categories);addCell(row,p.Methods);addCell(row,[p['Weighted category contributions'],p['Weighted method contributions'],p['Category evidence'],p['Method evidence']].filter(Boolean).join(' · '));addCell(row,p['Requirement review']);addCell(row,p['Ethical approval status']);body.appendChild(row)}}byId('result-count').textContent=`Showing ${{visibleProjects().length}} of ${{allProjects.length}} projects`;byId('minimum-value').textContent=byId('minimum').value+'%'}}
function renderScatter(){{const box=byId('scatter');const width=560,height=300,left=48,bottom=252;const points=allProjects.map(p=>`<circle cx="${{left+number(p['Interest fit (%)'])*4.8}}" cy="${{bottom-number(p['Information completeness (%)'])*2.1}}" r="5" fill="#2463a6"><title>${{esc(p['Project title'])}} · interest ${{p['Interest fit (%)']}}% · info ${{p['Information completeness (%)']}}%</title></circle>`).join('');box.innerHTML=`<svg viewBox="0 0 ${{width}} ${{height}}"><line x1="${{left}}" y1="${{bottom}}" x2="528" y2="${{bottom}}" stroke="#64748b"/><line x1="${{left}}" y1="42" x2="${{left}}" y2="${{bottom}}" stroke="#64748b"/><text x="230" y="292">Interest fit (%)</text><text x="4" y="30">Info</text><text x="4" y="44">completeness</text>${{[0,25,50,75,100].map(v=>`<text x="${{left+v*4.8-8}}" y="272">${{v}}</text><text x="16" y="${{bottom-v*2.1+4}}">${{v}}</text>`).join('')}}${{points}}</svg>`}}
function esc(value){{return String(value).replace(/[&<>"']/g,char=>({{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}}[char]))}}
function renderHeatmap(){{const top=allProjects.slice(0,20);const short=['AI / ML','Language development','Brain imaging','Software development'];const head=short.map((name,i)=>`<text x="${{245+i*125}}" y="20">${{name}}</text>`).join('');const rows=top.map((p,i)=>{{const y=34+i*27;const title=esc(p['Project title'].slice(0,35));const cells=interests.map((name,j)=>`<rect x="${{245+j*125}}" y="${{y}}" width="105" height="22" rx="4" fill="${{hasFamily(p,name)?'#4388c8':'#edf1f5'}}"><title>${{esc(p['Project title'])}} · ${{short[j]}}: ${{hasFamily(p,name)?'match':'no match'}}</title></rect>`).join('');return `<text x="0" y="${{y+16}}">${{i+1}}. ${{title}}</text>${{cells}}`}}).join('');byId('heatmap').innerHTML=`<svg viewBox="0 0 760 ${{40+top.length*27}}">${{head}}${{rows}}</svg>`}}
function hasFamily(project,name){{const family=name==='Language, reading & communication'||name==='Language development'?'language':name==='Neuroscience & brain imaging'||name==='Neuroimaging & electrophysiology'?'brain':name;return project['Matching interests'].split(';').some(tag=>{{const candidate=tag.trim();if(name==='Language development')return candidate==='Language development'||candidate==='Language, reading & communication';if(name==='Neuroscience & brain imaging')return candidate==='Neuroscience & brain imaging'||candidate==='Neuroimaging & electrophysiology';return candidate===name}})}}
function family(name){{if(name==='Language, reading & communication')return 'Language development';if(name==='Neuroimaging & electrophysiology')return 'Neuroscience & brain imaging';return name}}
function renderNetwork(){{const edges=new Map();const totals=new Map();for(const p of allProjects){{const supervisors=p.Supervisor.split(';').map(x=>x.trim()).filter(Boolean);const tags=[...new Set(p['Matching interests'].split(';').filter(Boolean).map(family))];for(const supervisor of supervisors){{totals.set(supervisor,(totals.get(supervisor)||0)+1);for(const tag of tags)edges.set(`${{supervisor}}|${{tag}}`,(edges.get(`${{supervisor}}|${{tag}}`)||0)+1)}}}}const supervisors=[...totals.keys()].sort((a,b)=>totals.get(b)-totals.get(a)||a.localeCompare(b)).slice(0,18);const tags=interests;const height=Math.max(220,supervisors.length*31+30);const paths=[];for(const [key,count] of edges){{const [supervisor,tag]=key.split('|');const yi=supervisors.indexOf(supervisor);const xi=tags.indexOf(tag);if(yi<0||xi<0)continue;paths.push(`<line x1="195" y1="${{34+xi*48}}" x2="420" y2="${{24+yi*31}}" stroke="#9aaaba" stroke-width="${{1+Math.min(count,4)}}"><title>${{esc(supervisor)}}: ${{count}} matching project(s) in ${{esc(tag)}}</title></line>`)}}const left=tags.map((tag,i)=>`<circle cx="185" cy="${{34+i*48}}" r="7" fill="#e28e2c"/><text x="0" y="${{38+i*48}}">${{esc(tag)}}</text>`).join('');const right=supervisors.map((name,i)=>`<circle cx="420" cy="${{24+i*31}}" r="6" fill="#2463a6"/><text x="432" y="${{28+i*31}}">${{esc(name)}}</text>`).join('');byId('network').innerHTML=`<svg viewBox="0 0 780 ${{height}}">${{paths.join('')}}${{left}}${{right}}</svg>`}}
function renderSummary(){{byId('project-count').textContent=allProjects.length;const best=Math.max(...allProjects.map(p=>number(p['Interest fit (%)'])));byId('best-fit').textContent=best+'%';const assessed=allProjects.filter(p=>p['Feasibility (%)']).length;byId('feasibility-count').textContent=`${{assessed}} of ${{allProjects.length}} rated`}}
fillTypes();renderSummary();renderScatter();renderHeatmap();renderNetwork();renderTable();for(const id of ['search','type','interest','method','minimum'])byId(id).addEventListener('input',renderTable);
</script></body></html>'''


def main() -> None:
    """Write the dashboard HTML next to the project reports."""
    rows = read_projects()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(dashboard_html(rows), encoding="utf-8")
    print(f"Built dashboard for {len(rows)} projects at {OUTPUT}")


if __name__ == "__main__":
    main()
