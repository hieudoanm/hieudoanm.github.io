(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,13050,e=>{"use strict";var o=e.i(50491),n=e.i(60328),a=e.i(20137),i=e.i(5668),t=e.i(65699);let r=e=>{let a,i,r,s=(0,n.c)(5),{errors:c}=e;return s[0]===Symbol.for("react.memo_cache_sentinel")?(a=(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)(t.FiAlertTriangle,{size:14}),(0,o.jsx)("span",{className:"font-semibold",children:"Parse errors"})]}),s[0]=a):a=s[0],s[1]!==c?(i=c.map(d),s[1]=c,s[2]=i):i=s[2],s[3]!==i?(r=(0,o.jsxs)("div",{className:"border-base-300 bg-error/10 text-error border-b px-3 py-1.5 text-xs",children:[a,(0,o.jsx)("ul",{className:"mt-1 space-y-0.5",children:i})]}),s[3]=i,s[4]=r):r=s[4],r};function d(e){return(0,o.jsxs)("li",{children:["line ",e.line,": ",e.message]},`${e.line}:${e.message}`)}let s=e=>{let i,r,d,s,l,g,u,p,m,y,h,w,b,v,f=(0,n.c)(29),{examples:k,open:S,onClose:x,onLoadExample:H}=e,[q,D]=(0,a.useState)(""),A=(0,a.useRef)(null);if(f[0]!==S?(i=()=>{S&&(D(""),A.current?.focus())},r=[S],f[0]=S,f[1]=i,f[2]=r):(i=f[1],r=f[2]),(0,a.useEffect)(i,r),f[3]!==x||f[4]!==S?(d=()=>{if(!S)return;let e=e=>{"Escape"===e.key&&x()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},s=[S,x],f[3]=x,f[4]=S,f[5]=d,f[6]=s):(d=f[5],s=f[6]),(0,a.useEffect)(d,s),f[7]!==k||f[8]!==q){e:{let e=q.trim().toLowerCase();if(!e){l=k;break e}l=k.filter(o=>[o.name,o.description,o.id,...o.questions].join(" ").toLowerCase().includes(e))}f[7]=k,f[8]=q,f[9]=l}else l=f[9];let C=l;return S?(f[10]===Symbol.for("react.memo_cache_sentinel")?(g=(0,o.jsx)("h2",{className:"text-lg font-semibold",children:"Example diagrams"}),f[10]=g):g=f[10],f[11]===Symbol.for("react.memo_cache_sentinel")?(u=(0,o.jsx)(t.FiX,{size:16}),f[11]=u):u=f[11],f[12]!==x?(p=(0,o.jsxs)("div",{className:"border-base-content/10 flex items-center justify-between gap-2 border-b p-3",children:[g,(0,o.jsx)("button",{className:"btn btn-ghost btn-sm",onClick:x,"aria-label":"Close examples",children:u})]}),f[12]=x,f[13]=p):p=f[13],f[14]===Symbol.for("react.memo_cache_sentinel")?(m=(0,o.jsx)(t.FiSearch,{className:"text-base-content/40",size:16}),f[14]=m):m=f[14],f[15]===Symbol.for("react.memo_cache_sentinel")?(y=e=>D(e.target.value),f[15]=y):y=f[15],f[16]!==q?(h=(0,o.jsx)("div",{className:"p-3",children:(0,o.jsxs)("label",{className:"flex items-center gap-2",children:[m,(0,o.jsx)("input",{ref:A,className:"input input-sm bg-base-100 w-full",onChange:y,placeholder:"Search by name, service, or question…","aria-label":"Search examples",type:"search",value:q})]})}),f[16]=q,f[17]=h):h=f[17],f[18]!==H||f[19]!==q||f[20]!==C?(w=(0,o.jsx)("div",{className:"min-h-0 flex-1 overflow-y-auto px-3 pb-3",children:0===C.length?(0,o.jsxs)("p",{className:"text-base-content/50 p-4 text-center text-sm",children:['No examples match "',q.trim(),'".']}):(0,o.jsx)("ul",{className:"menu rounded-box w-full p-0",children:C.map(e=>(0,o.jsx)("li",{children:(0,o.jsxs)("button",{onClick:()=>H(e),children:[(0,o.jsx)(t.FiGrid,{size:14}),(0,o.jsxs)("span",{children:[(0,o.jsx)("span",{className:"text-sm font-medium",children:e.name}),(0,o.jsx)("span",{className:"text-base-content/50 block text-xs",children:e.description})]}),(0,o.jsxs)("span",{className:"text-base-content/30 text-[10px]",children:[e.questions.length," questions"]})]})},e.id))})}),f[18]=H,f[19]=q,f[20]=C,f[21]=w):w=f[21],f[22]!==h||f[23]!==w||f[24]!==p?(b=(0,o.jsxs)("div",{"aria-label":"Example diagrams",className:"card bg-base-200 flex max-h-[90vh] w-full max-w-2xl flex-col shadow-2xl",onClick:c,role:"dialog",children:[p,h,w]}),f[22]=h,f[23]=w,f[24]=p,f[25]=b):b=f[25],f[26]!==x||f[27]!==b?(v=(0,o.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",onClick:x,children:b}),f[26]=x,f[27]=b,f[28]=v):v=f[28],v):null};function c(e){return e.stopPropagation()}let l=e=>{let a,i=(0,n.c)(3),{children:t,className:r}=e,d=`bg-base-300/50 block rounded-lg px-3 py-2 font-mono text-xs leading-6 whitespace-pre ${void 0===r?"":r}`;return i[0]!==t||i[1]!==d?(a=(0,o.jsx)("code",{className:d,children:t}),i[0]=t,i[1]=d,i[2]=a):a=i[2],a},g=e=>{let a,i,r,d,s,c,g,p,m,y,h,w,b,v,f,k,S,x,H,q,D,A,C,P=(0,n.c)(27),{open:I,onClose:N}=e;return I?(P[0]===Symbol.for("react.memo_cache_sentinel")?(a=(0,o.jsx)("h2",{className:"text-lg font-semibold",children:"Diagram syntax"}),P[0]=a):a=P[0],P[1]===Symbol.for("react.memo_cache_sentinel")?(i=(0,o.jsx)(t.FiX,{size:16}),P[1]=i):i=P[1],P[2]!==N?(r=(0,o.jsxs)("div",{className:"border-base-content/10 flex items-center justify-between border-b p-3",children:[a,(0,o.jsx)("button",{className:"btn btn-ghost btn-sm",onClick:N,"aria-label":"Close help",children:i})]}),P[2]=N,P[3]=r):r=P[3],P[4]===Symbol.for("react.memo_cache_sentinel")?(d=(0,o.jsx)("span",{className:"font-mono text-xs",children:".diagram"}),P[4]=d):d=P[4],P[5]===Symbol.for("react.memo_cache_sentinel")?(s=(0,o.jsxs)("p",{children:["A diagram is described in a plain text file (",d,"). The canvas re-renders live as you type. Lines starting with"," ",(0,o.jsx)("span",{className:"font-mono text-xs",children:"#"})," are comments."]}),c=(0,o.jsx)("h3",{className:"mb-1 font-semibold",children:"Title and kind"}),g=(0,o.jsx)(l,{children:"title: Web App Architecture\nkind: sequence"}),P[5]=s,P[6]=c,P[7]=g):(s=P[5],c=P[6],g=P[7]),P[8]===Symbol.for("react.memo_cache_sentinel")?(p=(0,o.jsx)("span",{className:"font-mono",children:"flow"}),P[8]=p):p=P[8],P[9]===Symbol.for("react.memo_cache_sentinel")?(h=(0,o.jsxs)("div",{children:[c,g,(0,o.jsxs)("p",{className:"text-base-content/60 mt-1 text-xs",children:["The kind is ",p," by default. Use ",(0,o.jsx)("span",{className:"font-mono",children:"kind: sequence"})," for a sequence diagram with lifelines and message arrows."]})]}),m=(0,o.jsx)("h3",{className:"mb-1 font-semibold",children:"Nodes"}),y=(0,o.jsx)(l,{children:"node <id>: <label> [shape, icon=<name>]"}),P[9]=m,P[10]=y,P[11]=h):(m=P[9],y=P[10],h=P[11]),P[12]===Symbol.for("react.memo_cache_sentinel")?(w=(0,o.jsx)("span",{className:"font-mono",children:"rect, round, ellipse, diamond, cylinder, hexagon, parallelogram, cloud, note, actor"}),P[12]=w):w=P[12],P[13]===Symbol.for("react.memo_cache_sentinel")?(b=(0,o.jsx)("span",{className:"font-mono",children:"icon=database"}),P[13]=b):b=P[13],P[14]===Symbol.for("react.memo_cache_sentinel")?(v=(0,o.jsxs)("div",{children:[m,y,(0,o.jsxs)("p",{className:"text-base-content/60 mt-1 text-xs",children:["Shape is optional and defaults to rect. Available shapes:"," ",w,". Icons are optional, e.g."," ",b,". Available icons:"," ",(0,o.jsx)("span",{className:"font-mono",children:"alert, archive, auth, bell, box, browser, cache, camera, chart, check, clock, cloud, code, compute, credit-card, database, eye, file, globe, heart, key, link, mail, map, message, monitor, music, phone, queue, search, server, settings, shield, star, sync, users, video, worker"}),"."]}),(0,o.jsx)(l,{className:"mt-2",children:"node client: Web Browser [round, icon=browser]\nnode db: PostgreSQL [cylinder, icon=database]"})]}),f=(0,o.jsx)("h3",{className:"mb-1 font-semibold",children:"Edges"}),k=(0,o.jsx)(l,{children:"edge <from> -> <to>: <label>"}),P[14]=v,P[15]=f,P[16]=k):(v=P[14],f=P[15],k=P[16]),P[17]===Symbol.for("react.memo_cache_sentinel")?(S=(0,o.jsx)("span",{className:"font-mono",children:"->"}),P[17]=S):S=P[17],P[18]===Symbol.for("react.memo_cache_sentinel")?(x=(0,o.jsxs)("div",{children:[f,k,(0,o.jsxs)("p",{className:"text-base-content/60 mt-1 text-xs",children:["Use ",S," for a directed arrow,"," ",(0,o.jsx)("span",{className:"font-mono",children:"--"})," for an undirected line. An edge from a node to itself creates a self-loop."]}),(0,o.jsx)(l,{className:"mt-2",children:"edge client -> api: HTTP\nedge api -> db: read\nedge db -> api: rows\nedge api -- cdn: static (undirected)\nedge api -> api: retry (self-loop)"})]}),H=(0,o.jsxs)("div",{children:[(0,o.jsx)("h3",{className:"mb-1 font-semibold",children:"Example"}),(0,o.jsx)(l,{children:"title: Request Flow\nnode client: Browser [round, icon=browser]\nnode api: API Server [icon=server]\nnode db: Database [cylinder, icon=database]\nedge client -> api: HTTP\nedge api -> db: read\nedge db -> api: rows"})," "]}),P[18]=x,P[19]=H):(x=P[18],H=P[19]),P[20]===Symbol.for("react.memo_cache_sentinel")?(q=(0,o.jsx)("span",{className:"font-mono",children:"-"}),P[20]=q):q=P[20],P[21]===Symbol.for("react.memo_cache_sentinel")?(D=(0,o.jsxs)("div",{className:"space-y-4 p-4 text-sm",children:[s,h,v,x,H,(0,o.jsxs)("p",{className:"text-base-content/60 text-xs",children:["Nodes referenced by an edge are created automatically if you have not declared them. Ids may contain letters, digits,"," ",q," and"," ",(0,o.jsx)("span",{className:"font-mono",children:"_"}),". Drag nodes on the canvas to arrange them, pick a shape from the toolbar to insert a node, and switch the layout between left-to-right and top-to-bottom."]})]}),P[21]=D):D=P[21],P[22]!==r?(A=(0,o.jsxs)("div",{className:"card bg-base-200 max-h-[90vh] w-full max-w-2xl overflow-y-auto shadow-2xl",onClick:u,children:[r,D]}),P[22]=r,P[23]=A):A=P[23],P[24]!==N||P[25]!==A?(C=(0,o.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",onClick:N,children:A}),P[24]=N,P[25]=A,P[26]=C):C=P[26],C):null};function u(e){return e.stopPropagation()}let p={flow:"Flow diagram",sequence:"Sequence diagram",timeline:"Timeline",venn:"Venn diagram"},m={flow:"bg-primary",sequence:"bg-secondary",timeline:"bg-accent",venn:"bg-info"},y=e=>{let a,i,t,r,d,s,c,l,g,u,y,h,w=(0,n.c)(25),{kind:b,title:v,nodes:f,edges:k,errors:S}=e,x=`badge badge-sm ${m[b]}`;w[0]!==x?(a=(0,o.jsx)("span",{className:x}),w[0]=x,w[1]=a):a=w[1];let H=p[b];w[2]!==H?(i=(0,o.jsx)("span",{"data-testid":"status-kind",children:H}),w[2]=H,w[3]=i):i=w[3],w[4]!==a||w[5]!==i?(t=(0,o.jsxs)("span",{className:"flex items-center gap-2",children:[a,i]}),w[4]=a,w[5]=i,w[6]=t):t=w[6],w[7]===Symbol.for("react.memo_cache_sentinel")?(r=(0,o.jsx)("span",{className:"bg-base-300 h-3 w-px"}),w[7]=r):r=w[7];let q=v||"Untitled diagram";return w[8]!==q?(d=(0,o.jsx)("span",{className:"text-base-content max-w-64 truncate font-medium",children:q}),w[8]=q,w[9]=d):d=w[9],w[10]===Symbol.for("react.memo_cache_sentinel")?(s=(0,o.jsx)("span",{className:"bg-base-300 h-3 w-px"}),w[10]=s):s=w[10],w[11]!==f?(c=(0,o.jsxs)("span",{"aria-label":"Node count",children:[f," nodes"]}),w[11]=f,w[12]=c):c=w[12],w[13]!==k?(l=(0,o.jsxs)("span",{"aria-label":"Edge count",children:[k," edges"]}),w[13]=k,w[14]=l):l=w[14],w[15]===Symbol.for("react.memo_cache_sentinel")?(g=(0,o.jsx)("span",{className:"bg-base-300 h-3 w-px"}),u=(0,o.jsx)("span",{className:"text-base-content/40",children:"autosaved locally"}),w[15]=g,w[16]=u):(g=w[15],u=w[16]),w[17]!==S?(y=S>0&&(0,o.jsxs)("span",{className:"text-error ml-auto font-medium",children:[S," error(s)"]}),w[17]=S,w[18]=y):y=w[18],w[19]!==c||w[20]!==l||w[21]!==y||w[22]!==t||w[23]!==d?(h=(0,o.jsxs)("div",{className:"no-print border-base-300 bg-base-200 text-base-content/70 flex items-center gap-3 border-t px-3 py-1.5 text-xs",children:[t,r,d,s,c,l,g,u,y]}),w[19]=c,w[20]=l,w[21]=y,w[22]=t,w[23]=d,w[24]=h):h=w[24],h},h=e=>{let i,r,d,s,c,l,g,u,p,m,y,h,b,v=(0,n.c)(31),{text:f,onChange:k,errors:S,onUndo:x,onRedo:H}=e,q=(0,a.useRef)(null),D=(0,a.useRef)(null);v[0]!==f?(i=f.split("\n"),v[0]=f,v[1]=i):i=v[1];let A=i.length;v[2]!==S?(r=new Set(S.map(w)),v[2]=S,v[3]=r):r=v[3];let C=r;if(v[4]!==C||v[5]!==A){let e;v[7]!==C?(e=(e,n)=>{let a=n+1;return(0,o.jsx)("div",{className:`flex h-6 items-center justify-end pr-2 text-xs text-base-content/40 select-none ${C.has(a)?"text-error":""}`,children:a},a)},v[7]=C,v[8]=e):e=v[8],d=Array.from({length:A},e),v[4]=C,v[5]=A,v[6]=d}else d=v[6];let P=d;v[9]===Symbol.for("react.memo_cache_sentinel")?(s=()=>{q.current&&D.current&&(q.current.scrollTop=D.current.scrollTop)},v[9]=s):s=v[9];let I=s;v[10]!==H||v[11]!==x?(c=e=>{if(!(e.ctrlKey||e.metaKey))return;let o=e.key.toLowerCase();"z"===o?(e.preventDefault(),e.shiftKey?H():x()):"y"===o&&(e.preventDefault(),H())},v[10]=H,v[11]=x,v[12]=c):c=v[12];let N=c;return v[13]===Symbol.for("react.memo_cache_sentinel")?(l=(0,o.jsx)(t.FiFileText,{className:"text-primary",size:14}),g=(0,o.jsx)("span",{className:"font-mono text-xs",children:"diagram.diagram"}),v[13]=l,v[14]=g):(l=v[13],g=v[14]),v[15]!==A?(u=(0,o.jsxs)("div",{className:"border-base-300 bg-base-200 flex items-center gap-2 border-b px-3 py-1.5",children:[l,g,(0,o.jsxs)("span",{className:"text-base-content/40 ml-auto text-xs",children:[A," lines"]})]}),v[15]=A,v[16]=u):u=v[16],v[17]!==P?(p=(0,o.jsx)("div",{ref:q,"aria-hidden":!0,className:"border-base-300 bg-base-200/60 overflow-hidden border-r pt-3",children:(0,o.jsx)("div",{children:P})}),v[17]=P,v[18]=p):p=v[18],v[19]!==k?(m=e=>k(e.target.value),v[19]=k,v[20]=m):m=v[20],v[21]!==N||v[22]!==m||v[23]!==f?(y=(0,o.jsx)("textarea",{ref:D,"aria-label":"Diagram source",className:"min-h-0 flex-1 resize-none bg-transparent p-3 pt-3 font-mono text-[13px] leading-6 outline-none",onChange:m,onKeyDown:N,onScroll:I,spellCheck:!1,value:f,wrap:"off"}),v[21]=N,v[22]=m,v[23]=f,v[24]=y):y=v[24],v[25]!==y||v[26]!==p?(h=(0,o.jsxs)("div",{className:"flex min-h-0 flex-1",children:[p,y]}),v[25]=y,v[26]=p,v[27]=h):h=v[27],v[28]!==h||v[29]!==u?(b=(0,o.jsxs)("div",{className:"border-base-300 bg-base-100 flex w-full min-w-0 flex-col border-r",children:[u,h]}),v[28]=h,v[29]=u,v[30]=b):b=v[30],b};function w(e){return e.line}var b=e.i(16652);let v="btn btn-ghost btn-sm gap-1 font-normal",f="size-4",k=[{shape:"rect",label:"Rectangle"},{shape:"round",label:"Rounded"},{shape:"ellipse",label:"Ellipse"},{shape:"diamond",label:"Diamond"},{shape:"hexagon",label:"Hexagon"},{shape:"parallelogram",label:"Parallelogram"},{shape:"cylinder",label:"Cylinder"},{shape:"cloud",label:"Cloud"},{shape:"note",label:"Note"},{shape:"actor",label:"Actor"}],S=e=>{let i,r,d,s,c,l,g,u,p,m,y,h,w,S,x,H,q,D,A,C,P,I,N,R,j,G,B,T,E,M,L,_,F,z,W,U,O,Q,V,J,K,$,Z,Y,X,ee,eo,en,ea,ei,et,er,ed,es,ec,el=(0,n.c)(109),{onNew:eg,onOpen:eu,onSave:ep,onExportSvg:em,onExportSvgPrint:ey,onExportPng:eh,onCopySnippet:ew,onExamples:eb,canExport:ev,canUndo:ef,canRedo:ek,onUndo:eS,onRedo:ex,zoom:eH,onZoomIn:eq,onZoomOut:eD,onZoomReset:eA,theme:eC,onToggleTheme:eP,onHelp:eI,direction:eN,onDirectionChange:eR,onNewShape:ej}=e,[eG,eB]=(0,a.useState)(null);el[0]===Symbol.for("react.memo_cache_sentinel")?(i=e=>eB(o=>o===e?null:e),el[0]=i):i=el[0];let eT=i;el[1]===Symbol.for("react.memo_cache_sentinel")?(r=e=>()=>{eB(null),e()},el[1]=r):r=el[1];let eE=r;el[2]===Symbol.for("react.memo_cache_sentinel")?(d=(0,o.jsx)("span",{className:"mr-1 text-sm font-semibold tracking-wide",children:"Diagram"}),el[2]=d):d=el[2],el[3]===Symbol.for("react.memo_cache_sentinel")?(s=(0,o.jsx)(t.FiFilePlus,{className:f}),el[3]=s):s=el[3],el[4]!==eg?(c=(0,o.jsxs)("button",{className:v,onClick:eg,children:[s," New"]}),el[4]=eg,el[5]=c):c=el[5],el[6]===Symbol.for("react.memo_cache_sentinel")?(l=(0,o.jsx)(t.FiUpload,{className:f}),el[6]=l):l=el[6],el[7]!==eu?(g=(0,o.jsxs)("button",{className:v,onClick:eu,children:[l," Open"]}),el[7]=eu,el[8]=g):g=el[8],el[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,o.jsx)(t.FiDownload,{className:f}),el[9]=u):u=el[9],el[10]!==ep?(p=(0,o.jsxs)("button",{className:v,onClick:ep,children:[u," Save"]}),el[10]=ep,el[11]=p):p=el[11];let eM=!ev;el[12]===Symbol.for("react.memo_cache_sentinel")?(m=(0,o.jsx)(t.FiImage,{className:f}),el[12]=m):m=el[12],el[13]!==em||el[14]!==eM?(y=(0,o.jsxs)("button",{className:v,disabled:eM,onClick:em,children:[m," Export SVG"]}),el[13]=em,el[14]=eM,el[15]=y):y=el[15],el[16]===Symbol.for("react.memo_cache_sentinel")?(h=(0,o.jsx)("button",{"aria-label":"More export options",className:v,onClick:()=>eT("export"),children:(0,o.jsx)(t.FiChevronDown,{className:"size-3"})}),el[16]=h):h=el[16],el[17]!==ev||el[18]!==eG||el[19]!==eh||el[20]!==ey?(w="export"===eG&&(0,o.jsxs)("ul",{className:"dropdown-content menu bg-base-200 z-20 mt-1 w-48 rounded-box p-2 shadow",tabIndex:-1,children:[(0,o.jsx)("li",{children:(0,o.jsx)("button",{disabled:!ev,onClick:eE(ey),children:"SVG (A4 print)"})}),(0,o.jsx)("li",{children:(0,o.jsx)("button",{disabled:!ev,onClick:eE(eh),children:"PNG"})})]}),el[17]=ev,el[18]=eG,el[19]=eh,el[20]=ey,el[21]=w):w=el[21],el[22]!==w?(S=(0,o.jsxs)("div",{className:"dropdown",children:[h,w]}),el[22]=w,el[23]=S):S=el[23],el[24]===Symbol.for("react.memo_cache_sentinel")?(x=(0,o.jsx)(t.FiLayout,{className:f}),el[24]=x):x=el[24],el[25]!==eb?(H=(0,o.jsxs)("button",{className:v,onClick:eb,"aria-label":"Browse examples",title:"Browse example diagrams",children:[x," Examples"]}),el[25]=eb,el[26]=H):H=el[26],el[27]===Symbol.for("react.memo_cache_sentinel")?(q=(0,o.jsxs)("a",{className:v,href:"/posts/",title:"Browse the example library",children:[(0,o.jsx)(t.FiBookOpen,{className:f})," Posts"]}),D=(0,o.jsx)("span",{className:"bg-base-300 mx-1 h-6 w-px"}),el[27]=q,el[28]=D):(q=el[27],D=el[28]);let eL=!ef;el[29]===Symbol.for("react.memo_cache_sentinel")?(A=(0,o.jsx)(t.FiRotateCcw,{className:f}),el[29]=A):A=el[29],el[30]!==eS||el[31]!==eL?(C=(0,o.jsx)("button",{className:v,disabled:eL,onClick:eS,"aria-label":"Undo",title:"Undo (Ctrl+Z)",children:A}),el[30]=eS,el[31]=eL,el[32]=C):C=el[32];let e_=!ek;el[33]===Symbol.for("react.memo_cache_sentinel")?(P=(0,o.jsx)(t.FiRotateCw,{className:f}),el[33]=P):P=el[33],el[34]!==ex||el[35]!==e_?(I=(0,o.jsx)("button",{className:v,disabled:e_,onClick:ex,"aria-label":"Redo",title:"Redo (Ctrl+Y)",children:P}),el[34]=ex,el[35]=e_,el[36]=I):I=el[36],el[37]===Symbol.for("react.memo_cache_sentinel")?(N=(0,o.jsx)("span",{className:"bg-base-300 mx-1 h-6 w-px"}),el[37]=N):N=el[37],el[38]===Symbol.for("react.memo_cache_sentinel")?(R=(0,o.jsx)(t.FiMinus,{className:f}),el[38]=R):R=el[38],el[39]!==eD?(j=(0,o.jsx)("button",{className:v,onClick:eD,"aria-label":"Zoom out",children:R}),el[39]=eD,el[40]=j):j=el[40],el[41]!==eH?(G=Math.round(100*eH),el[41]=eH,el[42]=G):G=el[42],el[43]!==eA||el[44]!==G?(B=(0,o.jsxs)("button",{className:"btn btn-ghost btn-sm w-14 font-mono text-xs",onClick:eA,children:[G,"%"]}),el[43]=eA,el[44]=G,el[45]=B):B=el[45],el[46]===Symbol.for("react.memo_cache_sentinel")?(T=(0,o.jsx)(t.FiPlus,{className:f}),el[46]=T):T=el[46],el[47]!==eq?(E=(0,o.jsx)("button",{className:v,onClick:eq,"aria-label":"Zoom in",children:T}),el[47]=eq,el[48]=E):E=el[48],el[49]===Symbol.for("react.memo_cache_sentinel")?(M=(0,o.jsx)(t.FiMaximize,{className:f}),el[49]=M):M=el[49],el[50]!==eA?(L=(0,o.jsx)("button",{className:v,onClick:eA,"aria-label":"Reset zoom",children:M}),el[50]=eA,el[51]=L):L=el[51],el[52]===Symbol.for("react.memo_cache_sentinel")?(_=(0,o.jsx)("span",{className:"bg-base-300 mx-1 h-6 w-px"}),el[52]=_):_=el[52],el[53]===Symbol.for("react.memo_cache_sentinel")?(F=()=>eT("layout"),z=(0,o.jsx)(t.FiLayout,{className:f}),el[53]=F,el[54]=z):(F=el[53],z=el[54]);let eF="horizontal"===eN?"Left → Right":"Top → Bottom";return el[55]===Symbol.for("react.memo_cache_sentinel")?(W=(0,o.jsx)(t.FiChevronDown,{className:"size-3"}),el[55]=W):W=el[55],el[56]!==eF?(U=(0,o.jsxs)("button",{"aria-label":"Layout",className:v,onClick:F,children:[z,eF,W]}),el[56]=eF,el[57]=U):U=el[57],el[58]!==eG||el[59]!==eR?(O="layout"===eG&&(0,o.jsxs)("ul",{className:"dropdown-content menu bg-base-200 z-20 mt-1 w-48 rounded-box p-2 shadow",tabIndex:-1,children:[(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:eE(()=>eR("horizontal")),children:"Left → Right"})}),(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:eE(()=>eR("vertical")),children:"Top → Bottom"})})]}),el[58]=eG,el[59]=eR,el[60]=O):O=el[60],el[61]!==U||el[62]!==O?(Q=(0,o.jsxs)("div",{className:"dropdown",children:[U,O]}),el[61]=U,el[62]=O,el[63]=Q):Q=el[63],el[64]===Symbol.for("react.memo_cache_sentinel")?(V=()=>eT("shape"),J=(0,o.jsx)(t.FiType,{className:f}),el[64]=V,el[65]=J):(V=el[64],J=el[65]),el[66]===Symbol.for("react.memo_cache_sentinel")?(K=(0,o.jsxs)("button",{"aria-label":"Shape",className:v,onClick:V,children:[J,"Shape",(0,o.jsx)(t.FiChevronDown,{className:"size-3"})]}),el[66]=K):K=el[66],el[67]!==eG||el[68]!==ej?($="shape"===eG&&(0,o.jsx)("ul",{className:"dropdown-content menu bg-base-200 z-20 mt-1 w-48 rounded-box p-2 shadow",tabIndex:-1,children:k.map(e=>{let{shape:n,label:a}=e;return(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:eE(()=>ej(n)),children:a})},n)})}),el[67]=eG,el[68]=ej,el[69]=$):$=el[69],el[70]!==$?(Z=(0,o.jsxs)("div",{className:"dropdown",children:[K,$]}),el[70]=$,el[71]=Z):Z=el[71],el[72]===Symbol.for("react.memo_cache_sentinel")?(Y=()=>eT("copy"),X=(0,o.jsx)(t.FiCopy,{className:f}),el[72]=Y,el[73]=X):(Y=el[72],X=el[73]),el[74]===Symbol.for("react.memo_cache_sentinel")?(ee=(0,o.jsxs)("button",{"aria-label":"Copy",className:v,onClick:Y,children:[X,"Copy",(0,o.jsx)(t.FiChevronDown,{className:"size-3"})]}),el[74]=ee):ee=el[74],el[75]!==ev||el[76]!==eG||el[77]!==ew?(eo="copy"===eG&&(0,o.jsxs)("ul",{className:"dropdown-content menu bg-base-200 z-20 mt-1 w-48 rounded-box p-2 shadow",tabIndex:-1,children:[(0,o.jsx)("li",{children:(0,o.jsx)("button",{disabled:!ev,onClick:eE(()=>ew("markdown")),children:"Markdown"})}),(0,o.jsx)("li",{children:(0,o.jsx)("button",{disabled:!ev,onClick:eE(()=>ew("mermaid")),children:"Mermaid"})}),(0,o.jsx)("li",{children:(0,o.jsx)("button",{disabled:!ev,onClick:eE(()=>ew("plantuml")),children:"PlantUML"})})]}),el[75]=ev,el[76]=eG,el[77]=ew,el[78]=eo):eo=el[78],el[79]!==eo?(en=(0,o.jsxs)("div",{className:"dropdown",children:[ee,eo]}),el[79]=eo,el[80]=en):en=el[80],el[81]===Symbol.for("react.memo_cache_sentinel")?(ea=(0,o.jsx)("span",{className:"bg-base-300 mx-1 h-6 w-px"}),el[81]=ea):ea=el[81],el[82]!==eC?(ei="dark"===eC?(0,o.jsx)(t.FiSun,{className:f}):(0,o.jsx)(t.FiMoon,{className:f}),el[82]=eC,el[83]=ei):ei=el[83],el[84]!==eP||el[85]!==ei?(et=(0,o.jsx)("button",{className:v,onClick:eP,title:"Toggle theme","aria-label":"Toggle theme",children:ei}),el[84]=eP,el[85]=ei,el[86]=et):et=el[86],el[87]===Symbol.for("react.memo_cache_sentinel")?(er=(0,o.jsx)(t.FiHelpCircle,{className:f}),el[87]=er):er=el[87],el[88]!==eI?(ed=(0,o.jsx)("button",{className:v,onClick:eI,"aria-label":"Help",children:er}),el[88]=eI,el[89]=ed):ed=el[89],el[90]===Symbol.for("react.memo_cache_sentinel")?(es=(0,o.jsxs)(b.default,{href:"/downloads",className:v,"aria-label":"Downloads",children:[(0,o.jsx)(t.FiDownload,{className:f}),"Downloads"]}),el[90]=es):es=el[90],el[91]!==y||el[92]!==S||el[93]!==H||el[94]!==C||el[95]!==I||el[96]!==j||el[97]!==B||el[98]!==E||el[99]!==L||el[100]!==Q||el[101]!==Z||el[102]!==c||el[103]!==en||el[104]!==et||el[105]!==ed||el[106]!==g||el[107]!==p?(ec=(0,o.jsxs)("div",{className:"no-print border-base-300 bg-base-200 flex flex-wrap items-center gap-1 border-b px-2 py-1.5",children:[d,c,g,p,y,S,H,q,D,C,I,N,j,B,E,L,_,Q,Z,en,ea,et,ed,es]}),el[91]=y,el[92]=S,el[93]=H,el[94]=C,el[95]=I,el[96]=j,el[97]=B,el[98]=E,el[99]=L,el[100]=Q,el[101]=Z,el[102]=c,el[103]=en,el[104]=et,el[105]=ed,el[106]=g,el[107]=p,el[108]=ec):ec=el[108],ec},x=`# Diagram source file (.diagram)
# Lines starting with # are comments.
#
#   title: <diagram title>
#   kind: <flow | sequence>
#   node <id>: <label> [shape, icon=<name>]
#   edge <from> -> <to>: <label>      (use -- for an undirected line)
#
# Shapes: rect, round, ellipse, diamond, cylinder, hexagon,
#         parallelogram, cloud, note, actor
# Icons: alert, archive, auth, bell, box, browser, cache, camera, chart,
#        check, clock, cloud, code, compute, credit-card, database, eye,
#        file, globe, heart, key, link, mail, map, message, monitor, music,
#        phone, queue, search, server, settings, shield, star, sync, users,
#        video, worker

title: Web App Architecture

node client: Browser [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Server [icon=server]
node auth: Auth Service [icon=auth]
node db: PostgreSQL [cylinder, icon=database]
node cache: Redis [cylinder, icon=cache]

edge client -> cdn: static
edge client -> api: JSON
edge api -> auth: verify
edge auth -> api: token
edge api -> db: read / write
edge api -> cache: cache
edge cache -> api: hit
edge db -> api: rows
`;var H=e.i(57991);let q="diagram-editor:text",D=()=>{try{return window.localStorage.getItem(q)??x}catch{return x}},A="diagram-editor:theme";var C=e.i(46750);let P=[{id:"uber",name:"Uber — Ride Hailing",description:"Rider/driver apps, ride matching, dispatch, surge pricing, payments.",questions:["Design Uber / Lyft ride matching and dispatch","How would you handle 100k drivers coming online at rush hour?","Design Uber surge pricing","How do you run geospatial queries at scale (finding nearby drivers)?","Design a ride payment + receipt flow"],text:`title: Uber Ride Hailing
node rider: Rider App [round, icon=browser]
node driver: Driver App [round, icon=browser]
node api: API Gateway [icon=server]
node matching: Ride Matching [icon=compute]
node dispatch: Dispatch Queue [icon=queue]
node surge: Surge Pricing [icon=cache]
node geo: Geo Index [icon=search]
node trip: Trip Service [icon=worker]
node pay: Payment Service [icon=shield]
node notify: Notifications [icon=message]
node db: Trips DB [cylinder, icon=database]
node cache: Driver Locations Cache [cylinder, icon=cache]

edge rider -> api: request ride
edge driver -> api: go online
edge api -> matching: rider + nearby drivers
edge matching -> geo: find nearby
edge geo -> matching: candidates
edge matching -> dispatch: assignment
edge dispatch -> driver: accept
edge surge -> api: dynamic price
edge rider -> trip: start / end
edge trip -> pay: charge
edge pay -> notify: receipt
edge trip -> db: store
edge api -> cache: read / write`},{id:"login-flow",name:"Login Flow — Sequence",description:"OAuth login sequence: client, auth service, session store, database.",questions:["Design an OAuth2 / OIDC login flow","How do you keep sessions secure and revocable?","How do you handle token refresh and expiry?","How do you scale the session store?","Design single sign-on across multiple apps"],text:`kind: sequence
title: Login Flow
node client: Client [round, icon=browser]
node auth: Auth Service [icon=auth]
node session: Session Service [icon=shield]
node db: Users DB [cylinder, icon=database]

edge client -> auth: POST /login
edge auth -> db: verify credentials
edge db -> auth: user row
edge auth -> client: set cookie
edge client -> session: request access token
edge session -> db: read session
edge db -> session: session row
edge session -> client: access token`},{id:"twitter",name:"Twitter / X — Feed",description:"Tweet ingestion, fanout, home timeline, media, search, notifications.",questions:["Design Twitter / X home timeline","Pull-based vs push-based fanout: when do you use which?","How do you rank or order a news feed?","Design Twitter search / trending topics","How do you support a celebrity (supernode) with millions of followers?"],text:`title: Twitter Feed
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node tweet: Tweet Service [icon=message]
node fanout: Fanout Worker [icon=worker]
node feed: Timeline Service [icon=compute]
node media: Media Service [icon=file]
node search: Search Service [icon=search]
node notify: Notification Service [icon=mail]
node db: Tweets DB [cylinder, icon=database]
node graph: Graph DB [cylinder, icon=users]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> cdn: static assets
edge client -> api: post / read
edge api -> tweet: publish
edge tweet -> db: persist
edge tweet -> fanout: push to followers
edge fanout -> graph: get followers
edge graph -> fanout: follower ids
edge fanout -> cache: push feeds
edge client -> api: home timeline
edge api -> feed: build
edge feed -> cache: cached feed
edge feed -> cache: write
edge api -> search: query
edge tweet -> notify: alerts`},{id:"netflix",name:"Netflix — Streaming",description:"Video-on-demand, encoding pipeline, CDN delivery, catalog, watch history.",questions:["Design Netflix / a video streaming service","Why are CDNs essential for streaming? How do you pick edge servers?","How do you encode and store videos at scale (transcoding pipeline)?","Design a recommendation engine for movies","How do you resume playback across devices?"],text:`title: Netflix Streaming
node client: Player [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node catalog: Catalog Service [icon=search]
node drm: DRM / Auth [icon=shield]
node encode: Encoding Pipeline [icon=compute]
node recommend: Recommendations [icon=cache]
node history: Watch History [icon=file]
node analytics: Analytics [icon=worker]
node storage: Video Storage [cylinder, icon=file]
node db: Catalog DB [cylinder, icon=database]
node cache: Metadata Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> catalog: title metadata
edge catalog -> db: read
edge catalog -> cache: read / write
edge client -> drm: license
edge client -> cdn: stream segments
edge upload: Studio -> encode: raw video
edge encode -> storage: encoded chunks
edge cdn -> storage: fetch
edge client -> api: playback start
edge api -> history: log
edge history -> recommend: personalize
edge api -> analytics: metrics`},{id:"instagram",name:"Instagram — Photo Sharing",description:"Media upload pipeline, photo storage, feed, likes/comments, discovery.",questions:["Design Instagram","How do you store and serve billions of photos?","Design the photo upload + processing pipeline","How do you design the Instagram feed?","How do you build a like/comment system with counters at scale?"],text:`title: Instagram Photo Sharing
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node upload: Media Upload [icon=file]
node process: Media Processor [icon=compute]
node feed: Feed Service [icon=message]
node graph: User Graph [icon=users]
node social: Likes & Comments [icon=sync]
node notify: Notifications [icon=mail]
node storage: Photo Storage [cylinder, icon=file]
node db: Media DB [cylinder, icon=database]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> api: upload photo
edge api -> upload: accept
edge upload -> process: transcode / thumbnail
edge process -> storage: store
edge process -> db: index
edge client -> api: view feed
edge api -> feed: build feed
edge feed -> graph: follow graph
edge feed -> cache: cached feed
edge api -> social: like / comment
edge social -> notify: push
edge api -> cache: read`},{id:"whatsapp",name:"WhatsApp — Chat",description:"Persistent WebSocket gateway, message queue, group chats, presence, media.",questions:["Design WhatsApp / a chat application","How do you deliver messages reliably (at-least-once vs exactly-once)?","How do you support large group chats?","How do you scale persistent WebSocket connections?","Design presence (online/typing) status at scale"],text:`title: WhatsApp Chat
node client: Client [round, icon=browser]
node gateway: WS Gateway [icon=server]
node chat: Chat Service [icon=message]
node queue: Message Queue [icon=queue]
node presence: Presence Service [icon=users]
node group: Group Service [icon=users]
node media: Media Service [icon=file]
node notify: Notifications [icon=mail]
node db: Messages DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> gateway: connect
edge gateway -> presence: online status
edge client -> gateway: send message
edge gateway -> chat: route
edge chat -> queue: enqueue
edge chat -> db: persist
edge queue -> gateway: deliver to peers
edge client -> gateway: read receipts
edge gateway -> notify: offline alert
edge chat -> group: broadcast
edge group -> queue: fan out
edge client -> media: attach`},{id:"amazon",name:"Amazon — Checkout",description:"Product catalog, cart, inventory, orders, payments, idempotency.",questions:["Design Amazon / an e-commerce checkout flow","How do you keep inventory consistent under high concurrency?","Design an order service with idempotent retries","How do you design a payment flow with exactly-once semantics?","How do you handle cart → order → payment failure recovery?"],text:`title: Amazon Checkout
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node product: Product Service [icon=search]
node cart: Cart Service [icon=file]
node inventory: Inventory Service [icon=queue]
node order: Order Service [icon=compute]
node payment: Payment Service [icon=shield]
node notify: Notifications [icon=mail]
node search: Search Service [icon=search]
node db: Orders DB [cylinder, icon=database]
node cache: Catalog Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> search: query
edge api -> product: details
edge product -> cache: read / write
edge client -> api: add to cart
edge api -> cart: save
edge client -> api: checkout
edge api -> order: place order
edge order -> inventory: reserve
edge inventory -> order: ok / fail
edge order -> payment: charge
edge payment -> order: confirmation
edge order -> db: persist
edge order -> notify: email`},{id:"url-shortener",name:"URL Shortener",description:"Shorten + redirect at scale, ID generation, analytics, caching.",questions:["Design a URL shortening service like bit.ly","How do you generate unique short IDs at scale (base62 vs UUID)?","How do you handle ~10M redirects/sec?","How do you track click analytics?","Design the storage schema and cache strategy"],text:`title: URL Shortener
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node shorten: Shorten Service [icon=compute]
node redirect: Redirect Service [icon=sync]
node ids: ID Generator [icon=cache]
node analytics: Analytics Worker [icon=worker]
node cache: Redirect Cache [cylinder, icon=cache]
node db: Links DB [cylinder, icon=database]

edge client -> api: POST /shorten
edge api -> shorten: create
edge shorten -> ids: next id
edge ids -> shorten: short code
edge shorten -> db: persist
edge client -> api: GET /code
edge api -> redirect: resolve
edge redirect -> cache: lookup
edge redirect -> db: miss fallback
edge redirect -> client: 301
edge api -> analytics: log click
edge analytics -> db: aggregate`},{id:"google-docs",name:"Google Docs — Collaboration",description:"Real-time collaborative editing, OT/CRDT, presence, version history.",questions:["Design Google Docs / real-time collaborative editing","OT vs CRDT: which do you choose and why?","How do you handle concurrent edits and conflicts?","How do you broadcast edits to hundreds of collaborators?","Design presence and cursors for live collaboration"],text:`title: Google Docs Collaboration
node client: Client [round, icon=browser]
node ws: Collab Gateway [icon=server]
node collab: Collab Service [icon=message]
node crdt: OT / CRDT Engine [icon=compute]
node doc: Document Service [icon=file]
node presence: Presence Service [icon=users]
node history: Version History [icon=sync]
node db: Documents DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> ws: connect
edge ws -> presence: online
edge client -> ws: edit op
edge ws -> collab: apply op
edge collab -> crdt: transform / merge
edge crdt -> doc: apply
edge collab -> ws: broadcast op
edge ws -> client: peer edits
edge collab -> cache: snapshot
edge doc -> db: persist
edge doc -> history: snapshot
edge client -> doc: open`},{id:"slack",name:"Slack — Messaging",description:"Channels, threads, realtime WebSocket delivery, presence, search, files.",questions:["Design Slack / a team messaging app","How do you deliver messages in real time across thousands of clients?","How do you model channels and threaded replies?","How do you scale presence and typing indicators?","Design full-text search over every workspace"],text:`title: Slack Messaging
node client: Client [round, icon=browser]
node gateway: WS Gateway [icon=server]
node api: API Gateway [icon=server]
node chat: Chat Service [icon=message]
node thread: Threads Service [icon=message]
node search: Search Service [icon=search]
node file: File Service [icon=file]
node presence: Presence Service [icon=users]
node notify: Notifications [icon=mail]
node queue: Message Queue [icon=queue]
node db: Messages DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> gateway: connect
edge client -> api: post message
edge api -> chat: route
edge chat -> db: persist
edge chat -> queue: enqueue
edge queue -> gateway: deliver
edge gateway -> client: realtime
edge client -> api: thread reply
edge api -> thread: reply
edge thread -> chat: associate
edge client -> api: search
edge api -> search: query
edge client -> api: upload
edge api -> file: store
edge gateway -> presence: status
edge api -> cache: session
edge api -> notify: push`},{id:"dropbox",name:"Dropbox — File Sync",description:"Desktop sync client, chunked upload, metadata service, block storage, versioning.",questions:["Design Dropbox / a file sync service","How do you detect and sync file changes efficiently?","Why store files as content-addressed blocks?","How do you handle concurrent edits to the same file?","Design version history and rollback"],text:`title: Dropbox File Sync
node client: Desktop Client [round, icon=browser]
node api: API Gateway [icon=server]
node upload: Upload Service [icon=file]
node sync: Sync Worker [icon=worker]
node meta: Metadata Service [icon=compute]
node version: Versioning [icon=sync]
node notify: Notifications [icon=mail]
node storage: Block Storage [cylinder, icon=file]
node db: Metadata DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> api: watch changes
edge api -> sync: diff
edge sync -> db: compare
edge client -> api: upload chunk
edge api -> upload: accept
edge upload -> storage: store blocks
edge upload -> meta: index
edge meta -> db: persist
edge meta -> cache: read / write
edge client -> api: poll
edge api -> sync: pending changes
edge sync -> notify: push updates
edge sync -> version: snapshot
edge version -> storage: history`},{id:"spotify",name:"Spotify — Music Streaming",description:"Music catalog, streaming delivery via CDN, playlists, recommendations, DRM.",questions:["Design Spotify / a music streaming service","How do you stream audio with low latency and no buffering?","Design the music catalog and metadata model","How do you build a music recommendation system?","How do you serve billions of playlist lookups?"],text:`title: Spotify Music Streaming
node client: Player [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node catalog: Catalog Service [icon=search]
node stream: Streaming Service [icon=compute]
node recs: Recommendations [icon=cache]
node playlists: Playlists Service [icon=file]
node search: Search Service [icon=search]
node drm: DRM / License [icon=shield]
node analytics: Analytics [icon=worker]
node db: Catalog DB [cylinder, icon=database]
node cache: Metadata Cache [cylinder, icon=cache]
node storage: Audio Storage [cylinder, icon=file]

edge client -> api: browse
edge api -> catalog: metadata
edge catalog -> db: read
edge catalog -> cache: read / write
edge client -> stream: request track
edge stream -> drm: license
edge stream -> cdn: stream audio
edge cdn -> storage: fetch
edge client -> api: search
edge api -> search: query
edge client -> api: create playlist
edge api -> playlists: save
edge playlists -> db: persist
edge api -> recs: personalize
edge recs -> analytics: signals
edge api -> analytics: metrics`},{id:"doordash",name:"DoorDash — Food Delivery",description:"Customer and dasher apps, restaurant search, order dispatch, live tracking.",questions:["Design DoorDash / a food delivery service","How do you match orders to nearby dashers?","How do you show live order tracking with low latency?","Design the order lifecycle from pickup to delivery","How do you handle surge demand during lunch and dinner?"],text:`title: DoorDash Food Delivery
node customer: Customer App [round, icon=browser]
node dasher: Dasher App [round, icon=browser]
node api: API Gateway [icon=server]
node search: Restaurant Search [icon=search]
node order: Order Service [icon=compute]
node dispatch: Dispatch Service [icon=worker]
node track: Tracking Service [icon=sync]
node pay: Payment Service [icon=shield]
node notify: Notifications [icon=message]
node menu: Menu Cache [cylinder, icon=cache]
node db: Orders DB [cylinder, icon=database]
node geo: Geo Index [cylinder, icon=search]

edge customer -> api: browse
edge api -> search: query
edge api -> menu: read
edge customer -> api: place order
edge api -> order: create
edge order -> pay: charge
edge order -> db: persist
edge order -> dispatch: assign
edge dispatch -> geo: find dashers
edge geo -> dispatch: candidates
edge dispatch -> dasher: offer
edge dasher -> dispatch: accept
edge dasher -> track: location
edge track -> customer: live status
edge dispatch -> notify: alerts`},{id:"stripe",name:"Stripe — Payments",description:"Payments API, idempotency, PSP authorization, ledger, webhooks, fraud.",questions:["Design Stripe / an online payment platform","How do you guarantee exactly-once charge semantics?","Why does idempotency matter in payment APIs?","How do you reconcile money across ledgers and banks?","Design webhook delivery with retries and backoff"],text:`title: Stripe Payments
node merchant: Merchant Dashboard [round, icon=browser]
node buyer: Buyer [round, icon=browser]
node api: Payments API [icon=server]
node payments: Payments Service [icon=shield]
node psp: PSP / Network [icon=sync]
node ledger: Ledger Service [icon=compute]
node wallet: Wallet Balance [icon=cache]
node webhook: Webhook Dispatcher [icon=worker]
node fraud: Fraud Detection [icon=search]
node notify: Notifications [icon=mail]
node db: Transactions DB [cylinder, icon=database]
node cache: Idempotency Cache [cylinder, icon=cache]

edge buyer -> api: charge
edge api -> payments: process
edge payments -> cache: idempotency key
edge payments -> psp: authorize
edge psp -> payments: result
edge payments -> ledger: record
edge ledger -> db: persist
edge payments -> wallet: settle
edge payments -> webhook: emit event
edge webhook -> merchant: callback
edge payments -> fraud: screen
edge fraud -> payments: verdict
edge payments -> notify: receipt`},{id:"web-crawler",name:"Web Crawler — Search Engine",description:"Crawler, URL frontier, indexer, inverted index, ranking, result caching.",questions:["Design a web crawler","How do you manage the URL frontier and politeness?","How do you detect duplicate pages across the web?","Design an inverted index for full-text search","How do you rank and cache query results at scale?"],text:`title: Web Crawler
node client: Client [round, icon=browser]
node api: Query API [icon=server]
node crawler: Crawler [icon=worker]
node frontier: URL Frontier [icon=queue]
node fetcher: Fetcher [icon=server]
node extractor: Extractor [icon=file]
node indexer: Indexer [icon=compute]
node index: Inverted Index [cylinder, icon=search]
node rank: Ranking Service [icon=sync]
node cache: Result Cache [cylinder, icon=cache]
node db: Page DB [cylinder, icon=database]

edge crawler -> frontier: next urls
edge frontier -> fetcher: fetch
edge fetcher -> extractor: parse html
edge extractor -> frontier: new links
edge extractor -> indexer: content
edge indexer -> index: build
edge indexer -> db: store
edge client -> api: search
edge api -> rank: query
edge rank -> index: lookup
edge rank -> cache: cached results
edge rank -> api: ranked results`},{id:"airbnb",name:"Airbnb — Booking",description:"Listing search, calendar availability, booking, payments, reviews.",questions:["Design Airbnb / a short-term rental platform","How do you model listing availability calendars?","How do you prevent double-booking under concurrency?","Design the search over price, location, and amenities","How do you handle the host payouts flow?"],text:`title: Airbnb Booking
node guest: Guest App [round, icon=browser]
node host: Host App [round, icon=browser]
node api: API Gateway [icon=server]
node search: Listing Search [icon=search]
node listing: Listing Service [icon=file]
node calendar: Calendar Service [icon=cache]
node booking: Booking Service [icon=compute]
node pay: Payment Service [icon=shield]
node review: Reviews Service [icon=message]
node notify: Notifications [icon=mail]
node db: Listings DB [cylinder, icon=database]
node cache: Search Cache [cylinder, icon=cache]

edge guest -> api: search
edge api -> search: query
edge search -> cache: results
edge search -> listing: details
edge listing -> db: read
edge guest -> api: book
edge api -> booking: reserve
edge booking -> calendar: lock dates
edge calendar -> booking: available
edge booking -> pay: charge
edge booking -> db: persist
edge booking -> notify: alert host
edge guest -> api: review
edge api -> review: post
edge review -> notify: alert`},{id:"rate-limiter",name:"API Rate Limiter",description:"API gateway, sliding-window counting, policies per client, throttling.",questions:["Design an API rate limiter","Fixed window vs sliding window vs token bucket: which do you use?","Where should the rate limiter live in the request path?","How do you enforce limits across many gateway instances?","How do you return 429 responses without dropping valid traffic?"],text:`title: API Rate Limiter
node client: Client [round, icon=browser]
node gateway: API Gateway [icon=server]
node limiter: Rate Limiter [icon=shield]
node cache: Sliding Window Cache [cylinder, icon=cache]
node counter: Counter Store [cylinder, icon=queue]
node auth: Auth Service [icon=auth]
node backend: Backend Services [icon=compute]
node analytics: Analytics [icon=worker]
node db: Policy DB [cylinder, icon=database]
node notify: Alerts [icon=mail]

edge client -> gateway: request
edge gateway -> auth: verify
edge auth -> gateway: identity
edge gateway -> limiter: check
edge limiter -> cache: sliding window
edge cache -> limiter: allow / deny
edge limiter -> counter: increment
edge limiter -> gateway: 429 / pass
edge gateway -> backend: forward
edge backend -> gateway: response
edge limiter -> analytics: log
edge limiter -> db: policy rules
edge limiter -> notify: alert`},{id:"youtube",name:"YouTube — Video Sharing",description:"UGC video upload, transcoding, CDN delivery, subscriptions, comments, recommendations.",questions:["Design YouTube / a video-sharing platform","How do you process and store uploaded videos at scale?","How do you stream video with adaptive bitrate and low startup latency?","Design a recommendation system for videos","How do you support live streaming alongside video-on-demand?"],text:`title: YouTube Video Sharing
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node upload: Upload Service [icon=file]
node encode: Encoding Pipeline [icon=compute]
node catalog: Catalog Service [icon=search]
node recs: Recommendations [icon=cache]
node comment: Comments [icon=message]
node notify: Notifications [icon=mail]
node storage: Video Storage [cylinder, icon=file]
node db: Metadata DB [cylinder, icon=database]
node cache: Metadata Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> catalog: metadata
edge catalog -> db: read
edge catalog -> cache: read / write
edge client -> api: upload video
edge api -> upload: accept
edge upload -> encode: transcode
edge encode -> storage: chunks
edge client -> api: watch
edge api -> recs: personalize
edge client -> cdn: stream
edge cdn -> storage: fetch
edge api -> comment: post
edge comment -> notify: alerts`},{id:"zoom",name:"Zoom — Video Conferencing",description:"WebRTC realtime media, SFU routing, rooms, screen share, recording.",questions:["Design Zoom / a video conferencing service","How do you route realtime audio/video with low latency (WebRTC / SFU)?","How do you support large meetings with many participants?","Design screen sharing and recording","How do you handle poor network conditions in a video call?"],text:`title: Zoom Video Conferencing
node client: Client [round, icon=browser]
node signal: Signaling Server [icon=server]
node auth: Auth Service [icon=auth]
node room: Room Service [icon=message]
node sfu: SFU Media Router [icon=compute]
node relay: Media Relay [ellipse, icon=cloud]
node screen: Screen Share [icon=file]
node record: Recording [icon=file]
node notify: Notifications [icon=mail]
node db: Meeting DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> auth: login
edge auth -> signal: token
edge client -> signal: join room
edge signal -> room: create / join
edge room -> db: persist
edge client -> sfu: publish media
edge sfu -> client: forward streams
edge sfu -> relay: bridge cross-region
edge client -> screen: share
edge screen -> sfu: video track
edge room -> record: archive
edge room -> notify: status
edge signal -> cache: session`},{id:"facebook",name:"Facebook — Social Network",description:"Friend graph, news feed fanout, photo upload, reactions, notifications.",questions:["Design Facebook / a social network","How do you build and traverse a friend graph at scale?","Design the news feed (push vs pull fanout)","How do you recommend friends (friend suggestions)?","Design reactions and notifications"],text:`title: Facebook Social Network
node client: Client [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node post: Post Service [icon=compute]
node graph: Friend Graph [icon=users]
node fanout: Fanout Worker [icon=worker]
node feed: News Feed [icon=message]
node upload: Media Upload [icon=file]
node search: Search Service [icon=search]
node notify: Notifications [icon=mail]
node db: Posts DB [cylinder, icon=database]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> post: publish
edge post -> db: persist
edge post -> fanout: push to friends
edge fanout -> graph: friend ids
edge graph -> fanout: friends
edge fanout -> cache: timelines
edge client -> api: home feed
edge api -> feed: build
edge feed -> cache: read
edge client -> api: upload photo
edge api -> upload: store
edge upload -> cdn: serve
edge api -> notify: alerts`},{id:"linkedin",name:"LinkedIn — Professional Network",description:"Professional graph, connections, feed, job search, endorsements.",questions:["Design LinkedIn / a professional network","How do you model a connection graph and degrees of separation?","Design the professional feed and relevance ranking","How do you design job search and matching?","How do you scale profile and connection requests?"],text:`title: LinkedIn Professional Network
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node graph: Connection Graph [icon=users]
node profile: Profile Service [icon=search]
node connection: Connections [icon=sync]
node feed: Feed Service [icon=message]
node job: Job Service [icon=compute]
node search: Search Index [icon=search]
node notify: Notifications [icon=mail]
node db: Profiles DB [cylinder, icon=database]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> profile: view
edge profile -> db: read
edge api -> connection: request
edge connection -> graph: update
edge graph -> profile: connections
edge client -> api: feed
edge api -> feed: build
edge feed -> graph: network
edge api -> job: search
edge job -> search: query
edge api -> notify: alerts`},{id:"reddit",name:"Reddit — Community Forum",description:"Subreddits, posts, upvoting, hot ranking, comments.",questions:["Design Reddit / a community forum","How do you model subreddits and posts?","How do you rank content (hot / top / new)?","Design the comment tree at scale","How do you detect vote fraud and spam?"],text:`title: Reddit Community
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node subreddit: Subreddits [icon=message]
node post: Post Service [icon=compute]
node vote: Votes [icon=sync]
node rank: Ranking Worker [icon=worker]
node comment: Comments [icon=message]
node search: Search Service [icon=search]
node mod: Moderation [icon=shield]
node db: Posts DB [cylinder, icon=database]
node cache: Hot Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> subreddit: list posts
edge subreddit -> db: read
edge client -> api: submit
edge api -> post: publish
edge post -> db: persist
edge client -> api: vote
edge api -> vote: record
edge vote -> rank: score
edge rank -> cache: hot list
edge api -> comment: reply
edge api -> search: index
edge api -> mod: review`},{id:"medium",name:"Medium — Blogging",description:"Publishing, editor, following feed, claps, tags, discovery.",questions:["Design Medium / a blogging platform","How do you design the writing and publishing flow?","Design a following feed with recommendations","How do you build discovery (tags, topics, trends)?","How do you measure and surface engagement (claps)?"],text:`title: Medium Blogging
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node editor: Editor Service [icon=file]
node post: Post Service [icon=compute]
node follow: Following Graph [icon=users]
node feed: Feed Service [icon=message]
node tag: Tag Index [icon=search]
node recs: Recommendations [icon=cache]
node notify: Notifications [icon=mail]
node db: Posts DB [cylinder, icon=database]
node cache: Feed Cache [cylinder, icon=cache]

edge client -> api: write
edge api -> editor: draft
edge editor -> post: save
edge post -> db: persist
edge post -> notify: followers
edge client -> api: read feed
edge api -> feed: build
edge feed -> follow: authors
edge api -> tag: browse
edge tag -> recs: discover
edge recs -> feed: candidates
edge api -> cache: read`},{id:"quora",name:"Quora — Q&A Platform",description:"Questions, answers, upvotes, topic graph, moderation.",questions:["Design Quora / a Q&A platform","How do you model questions, answers, and topics?","How do you rank answers and questions?","Design the feed of recommended questions","How do you moderate content and detect duplicate questions?"],text:`title: Quora Q&A
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node question: Questions [icon=message]
node answer: Answers [icon=compute]
node vote: Votes [icon=sync]
node topic: Topic Graph [icon=search]
node rank: Ranking Worker [icon=worker]
node mod: Moderation [icon=shield]
node notify: Notifications [icon=mail]
node db: Q&A DB [cylinder, icon=database]
node cache: Rank Cache [cylinder, icon=cache]

edge client -> api: ask
edge api -> question: create
edge question -> topic: classify
edge question -> db: persist
edge client -> api: answer
edge api -> answer: submit
edge answer -> question: attach
edge client -> api: vote
edge api -> vote: record
edge vote -> rank: score
edge rank -> cache: sorted
edge api -> mod: review
edge answer -> notify: followers`},{id:"tinder",name:"Tinder — Dating App",description:"Profiles, geo-based matching, swipe decks, realtime chat.",questions:["Design Tinder / a dating app","How do you build a swipe deck of nearby profiles?","How do you match users and notify them in real time?","How do you store and serve profile media?","Design the chat after a match"],text:`title: Tinder Dating
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node geo: Geo Index [icon=search]
node profile: Profile Service [icon=compute]
node matching: Matching Service [icon=queue]
node swipe: Swipes [icon=sync]
node chat: Chat Service [icon=message]
node cdn: Media CDN [ellipse, icon=cloud]
node notify: Notifications [icon=mail]
node db: Profiles DB [cylinder, icon=database]
node cache: Swipe Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> geo: nearby users
edge geo -> matching: candidates
edge matching -> client: deck
edge client -> api: swipe
edge api -> swipe: record
edge swipe -> matching: score
edge matching -> notify: match
edge api -> chat: message
edge chat -> client: realtime
edge api -> cdn: media
edge api -> db: persist`},{id:"ticketmaster",name:"Ticketmaster — Event Booking",description:"Event search, seat selection, high-concurrency booking, payments.",questions:["Design Ticketmaster / an event booking platform","How do you prevent overselling seats under high concurrency?","How do you implement seat holds with timeouts?","Design the event search and browse experience","How do you handle ticket resale and refunds?"],text:`title: Ticketmaster Booking
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node event: Event Service [icon=search]
node seat: Seat Map [icon=compute]
node booking: Booking Service [icon=queue]
node payment: Payment Service [icon=shield]
node inventory: Inventory Store [cylinder, icon=database]
node notify: Notifications [icon=mail]
node db: Bookings DB [cylinder, icon=database]
node cache: Event Cache [cylinder, icon=cache]

edge client -> api: browse events
edge api -> event: search
edge event -> cache: read
edge client -> api: select seats
edge api -> seat: hold
edge seat -> inventory: reserve
edge inventory -> booking: confirm
edge booking -> payment: charge
edge payment -> booking: success
edge booking -> db: persist
edge booking -> notify: tickets
edge seat -> cache: availability`},{id:"google-maps",name:"Google Maps — Location Services",description:"Map tiles, geocoding, routing, real-time traffic, ETAs.",questions:["Design Google Maps / a location-based service","How do you serve map tiles at global scale?","How do you build routing and ETA at scale?","How do you ingest real-time traffic data?","Design geocoding and place search"],text:`title: Google Maps
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node tiles: Tile Service [ellipse, icon=cloud]
node geo: Geo Index [icon=search]
node geocode: Geocoding [icon=compute]
node routing: Routing Engine [icon=worker]
node traffic: Traffic Ingestion [icon=sync]
node eta: ETA Service [icon=cache]
node db: Map DB [cylinder, icon=database]
node cache: Tile Cache [cylinder, icon=cache]

edge client -> api: search
edge api -> geocode: address
edge geocode -> geo: places
edge client -> tiles: load map
edge tiles -> cache: tiles
edge api -> routing: directions
edge routing -> traffic: live speeds
edge traffic -> eta: estimate
edge eta -> client: ETA
edge routing -> db: road graph
edge api -> cache: hot queries`},{id:"typeahead",name:"Autocomplete / Typeahead",description:"Prefix search, trie, top-k suggestions, caching, freshness.",questions:["Design a typeahead / autocomplete system","How do you return top-k suggestions for a prefix quickly?","How do you store the trie and scale reads?","How do you keep suggestions fresh from query logs?","How do you handle typos and personalization?"],text:`title: Typeahead Search
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node suggester: Suggester [icon=search]
node trie: Trie Service [icon=cache]
node rank: Ranking Worker [icon=worker]
node index: Indexer [icon=queue]
node querylog: Query Log [cylinder, icon=database]
node cache: Hot Prefix Cache [cylinder, icon=cache]

edge client -> api: type prefix
edge api -> suggester: top-k
edge suggester -> trie: match
edge trie -> suggester: candidates
edge suggester -> rank: score
edge rank -> api: results
edge client -> api: select
edge api -> querylog: log
edge querylog -> index: aggregate
edge index -> trie: rebuild
edge suggester -> cache: hot prefixes`},{id:"notification-service",name:"Notification Service",description:"Event fanout, delivery channels, retries, dedupe, preferences.",questions:["Design a notification service","How do you fan out notifications to millions of users?","How do you choose delivery channels (push, email, SMS)?","How do you guarantee delivery with retries and dedupe?","How do you respect user notification preferences?"],text:`title: Notification Service
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node event: Event Ingestion [icon=queue]
node prefs: Preference Service [icon=search]
node fanout: Fanout Worker [icon=worker]
node push: Push Provider [ellipse, icon=cloud]
node email: Email Service [icon=mail]
node sms: SMS Gateway [ellipse, icon=cloud]
node dedupe: Dedupe Cache [cylinder, icon=cache]
node db: Notification DB [cylinder, icon=database]

edge client -> api: subscribe
edge api -> prefs: save
edge event -> fanout: dispatch
edge fanout -> prefs: filter
edge prefs -> fanout: channels
edge fanout -> dedupe: check
edge fanout -> push: send
edge fanout -> email: send
edge fanout -> sms: send
edge fanout -> db: log
edge client -> api: read inbox`},{id:"message-queue",name:"Distributed Message Queue",description:"Publish/subscribe, partitioning, ordering, durability, consumers.",questions:["Design a distributed message queue (Kafka-style)","How do you guarantee ordering within a partition?","How do you ensure durability and replay (offsets)?","How do consumers scale and handle rebalancing?","How do you handle at-least-once vs exactly-once semantics?"],text:`title: Message Queue
node producer: Producers [icon=compute]
node broker: Broker Cluster [icon=server]
node partition: Partitions [icon=queue]
node consumer: Consumers [icon=worker]
node coordinator: Coordinator [icon=search]
node zk: Cluster Metadata [cylinder, icon=database]
node offset: Offset Store [cylinder, icon=cache]
node dlq: Dead Letter Queue [icon=queue]

edge producer -> broker: publish
edge broker -> partition: append
edge coordinator -> broker: assign
edge consumer -> broker: subscribe
edge broker -> consumer: deliver
edge consumer -> offset: commit
edge broker -> dlq: retry overflow
edge coordinator -> zk: metadata
edge producer -> coordinator: discover
edge consumer -> coordinator: heartbeat`},{id:"distributed-cache",name:"Distributed Cache",description:"Cache-aside, TTL, invalidation, consistency, eviction.",questions:["Design a distributed cache (Redis-like)","Cache-aside vs write-through: which do you use?","How do you invalidate cache entries consistently?","How do you handle cache stampedes and hot keys?","How do you ensure consistency between cache and source of truth?"],text:`title: Distributed Cache
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node cache: Cache Cluster [icon=cache]
node shard: Shards [icon=queue]
node source: Source DB [cylinder, icon=database]
node invalidate: Invalidation [icon=sync]
node monitor: Monitor [icon=worker]
node backup: Backup [cylinder, icon=database]

edge client -> api: request
edge api -> cache: read
edge cache -> shard: hash lookup
edge shard -> api: hit
edge api -> source: miss
edge source -> api: value
edge api -> cache: write-back
edge source -> invalidate: notify
edge invalidate -> cache: invalidate
edge cache -> backup: snapshot
edge monitor -> cache: health`},{id:"key-value-store",name:"Distributed Key-Value Store",description:"Consistent hashing, replication, quorum, durability, hash tables.",questions:["Design a distributed key-value store","How do you partition data with consistent hashing?","How do you replicate and ensure quorum reads/writes?","How do you handle node failures and rebalancing?","How do you guarantee durability (WAL, snapshotting)?"],text:`title: Key-Value Store
node client: Client [round, icon=browser]
node coordinator: Coordinator [icon=server]
node ring: Hash Ring [icon=cache]
node store: Storage Nodes [icon=compute]
node wal: Write-Ahead Log [icon=file]
node replicate: Replication [icon=sync]
node quorum: Quorum [icon=compute]
node snapshot: Snapshot Store [cylinder, icon=database]
node api: API Gateway [icon=server]

edge client -> api: get / put
edge api -> coordinator: route
edge coordinator -> ring: hash
edge ring -> store: locate
edge store -> wal: append
edge store -> replicate: propagate
edge replicate -> quorum: votes
edge quorum -> coordinator: confirm
edge store -> snapshot: dump
edge coordinator -> api: response`},{id:"id-generator",name:"Distributed ID Generator",description:"Snowflake IDs, uniqueness at scale, ordering, allocation.",questions:["Design a distributed unique ID generator","Why are database auto-increment IDs not enough?","How does a Snowflake-style ID work?","How do you allocate ID ranges without a central bottleneck?","How do you ensure IDs are k-ordered by time?"],text:`title: ID Generator
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node allocator: Allocator Service [icon=server]
node snowflake: Snowflake Worker [icon=compute]
node segment: Segment Queue [icon=queue]
node db: ID DB [cylinder, icon=database]
node cache: Range Cache [cylinder, icon=cache]
node monitor: Monitor [icon=worker]

edge client -> api: next id
edge api -> allocator: request
edge allocator -> snowflake: generate
edge allocator -> segment: batch
edge allocator -> db: reserve range
edge allocator -> cache: cached range
edge api -> client: id
edge allocator -> monitor: stats`},{id:"google-search",name:"Google Search — Web Search",description:"Crawling, inverted index, ranking, autocomplete, result caching.",questions:["Design a web search engine","How do you build and update the inverted index?","How do you rank search results at scale?","How do you serve autocomplete suggestions?","How do you handle cache misses and hot queries?"],text:`title: Web Search
node user: User [round, icon=browser]
node app: Search App [icon=browser]
node gateway: API Gateway [icon=server]
node crawler: Web Crawler [icon=worker]
node indexer: Indexer [icon=compute]
node index: Inverted Index [cylinder, icon=search]
node store: Page Store [cylinder, icon=database]
node query: Query Engine [icon=search]
node rank: Ranking Service [icon=compute]
node cache: Result Cache [cylinder, icon=cache]
node suggest: Autocomplete [icon=search]
node analytics: Query Analytics [icon=worker]
node graph: Link Graph [cylinder, icon=users]

edge user -> app: search query
edge app -> gateway: query
edge gateway -> query: parse
edge query -> index: lookup
edge index -> query: candidates
edge query -> rank: score
edge rank -> gateway: results
edge gateway -> cache: cache results
edge gateway -> suggest: prefixes
edge crawler -> store: raw pages
edge crawler -> indexer: content
edge indexer -> index: terms
edge indexer -> graph: links
edge query -> analytics: log`},{id:"google-calendar",name:"Google Calendar — Scheduling",description:"Event scheduling, availability, invites, recurring events, reminders.",questions:["Design a calendar / scheduling service","How do you detect overlapping events and find free slots?","How do you distribute invites and manage RSVPs?","How do you handle recurring events?","How do you sync events across devices offline?"],text:`title: Calendar
node user: User [round, icon=browser]
node app: Calendar App [icon=browser]
node api: API Gateway [icon=server]
node event: Event Service [icon=compute]
node avail: Availability Engine [icon=search]
node invite: Invitation Service [icon=mail]
node sync: Sync Service [icon=sync]
node notifier: Reminders [icon=message]
node db: Events DB [cylinder, icon=database]
node cache: Slots Cache [cylinder, icon=cache]
node search: Event Search [icon=search]

edge user -> app: create event
edge app -> api: schedule
edge api -> event: CRUD
edge event -> db: persist
edge event -> avail: find slots
edge avail -> cache: query
edge event -> invite: notify guests
edge invite -> notifier: reminders
edge sync -> api: pull changes
edge api -> search: index events
edge event -> notifier: schedule reminders`},{id:"google-photos",name:"Google Photos — Photo Library",description:"Photo upload, dedupe, thumbnails, face grouping, sharing.",questions:["Design a photo backup and sharing service","How do you handle large uploads and duplicate detection?","How do you organize photos by time, location, and people?","How do you generate and serve thumbnails at scale?","How do you design sharing and permissions?"],text:`title: Photo Library
node user: User [round, icon=browser]
node app: Photos App [icon=browser]
node api: API Gateway [icon=server]
node upload: Upload Service [icon=cloud]
node storage: Object Storage [cylinder, icon=database]
node face: Face Recognition [icon=compute]
node tag: Tagging Service [icon=search]
node album: Album Service [icon=file]
node share: Share Service [icon=users]
node cache: Thumbnail Cache [cylinder, icon=cache]
node queue: Processing Queue [icon=queue]

edge user -> app: upload photos
edge app -> upload: stream
edge upload -> storage: store
edge upload -> queue: enqueue
edge queue -> face: detect faces
edge queue -> tag: classify
edge face -> tag: labels
edge app -> api: browse
edge api -> album: group
edge api -> share: share link
edge api -> cache: thumbnails`},{id:"gmail",name:"Gmail — Email Service",description:"Mailboxes, SMTP delivery, spam filtering, full-text search, attachments.",questions:["Design an email system","How do you store mailboxes so reads and searches stay fast?","How do you deliver mail reliably and handle bounces?","How do you detect spam and phishing?","How do you support search across all of a users mail?"],text:`title: Email Service
node user: User [round, icon=browser]
node client: Email Client [icon=browser]
node api: API Gateway [icon=server]
node send: Send Service [icon=mail]
node inbound: Inbound Queue [icon=queue]
node delivery: Delivery Agent [icon=worker]
node index: Search Index [icon=search]
node spam: Spam Filter [icon=shield]
node mailbox: Mailbox DB [cylinder, icon=database]
node attach: Attachment Store [cylinder, icon=file]
node notify: Push Notifications [icon=message]

edge user -> client: compose
edge client -> api: send
edge api -> send: queue
edge send -> inbound: relay
edge inbound -> spam: filter
edge inbound -> delivery: route
edge delivery -> mailbox: store
edge send -> attach: save
edge mailbox -> index: index
edge api -> notify: alert
edge client -> api: search
edge api -> index: lookup`},{id:"google-analytics",name:"Google Analytics — Web Analytics",description:"Event ingestion, aggregation, funnels, cohorts, dashboards.",questions:["Design a web analytics platform","How do you collect and ingest billions of events per day?","How do you aggregate metrics without losing accuracy?","How do you run funnel and cohort queries fast?","How do you generate and cache dashboard reports?"],text:`title: Web Analytics
node site: Website [round, icon=browser]
node collector: Event Collector [icon=server]
node ingest: Ingestion Pipeline [icon=queue]
node stream: Stream Processor [icon=compute]
node store: Event Store [cylinder, icon=database]
node agg: Aggregator [icon=worker]
node cube: OLAP Cube [cylinder, icon=search]
node api: Reporting API [icon=server]
node dash: Dashboard [icon=browser]
node funnel: Funnel Analyzer [icon=compute]
node cache: Report Cache [cylinder, icon=cache]

edge site -> collector: pageview
edge collector -> ingest: batch
edge ingest -> stream: events
edge stream -> store: raw
edge store -> agg: rollup
edge agg -> cube: dimensions
edge api -> cube: query
edge api -> cache: cached
edge dash -> api: report
edge store -> funnel: segments`},{id:"twitch",name:"Twitch — Live Streaming",description:"Live ingest, transcoding, low-latency delivery, chat, presence.",questions:["Design a live streaming platform","How do you ingest and transcode live streams?","How do you keep stream latency low across regions?","How do you scale chat alongside the video stream?","How do you handle broadcaster failures gracefully?"],text:`title: Live Streaming
node viewer: Viewer [round, icon=browser]
node streamer: Streamer [round, icon=browser]
node ingest: Ingestion Endpoint [icon=server]
node transcode: Transcode Pipeline [icon=compute]
node origin: Origin Store [cylinder, icon=file]
node cdn: CDN [ellipse, icon=cloud]
node chat: Chat Service [icon=message]
node presence: Presence [icon=users]
node subscribe: Subscriptions [icon=shield]
node db: Channel DB [cylinder, icon=database]
node recommend: Recommender [icon=search]

edge streamer -> ingest: push stream
edge ingest -> transcode: segment
edge transcode -> origin: publish
edge origin -> cdn: replicate
edge cdn -> viewer: play
edge viewer -> chat: message
edge chat -> presence: online
edge viewer -> subscribe: follow
edge subscribe -> db: persist
edge streamer -> ingest: stream key
edge recommend -> viewer: discover`},{id:"tiktok",name:"TikTok — Short-form Video",description:"Short video storage, encoding, feed ranking, viral traffic.",questions:["Design a short-form video app","How do you store and serve millions of short videos?","How do you build the For You feed?","How do you make uploads fast and encoding cheap?","How do you handle viral spikes in traffic?"],text:`title: Short Video Feed
node user: User [round, icon=browser]
node app: Video App [icon=browser]
node api: API Gateway [icon=server]
node upload: Upload Service [icon=cloud]
node encode: Encoding Workers [icon=compute]
node storage: Video Store [cylinder, icon=file]
node feed: Feed Service [icon=compute]
node rank: Ranker [icon=cache]
node watch: Watch History [cylinder, icon=database]
node effect: Effects Service [icon=compute]
node notify: Notifications [icon=message]

edge user -> app: scroll
edge app -> feed: next videos
edge feed -> rank: score
edge rank -> storage: fetch
edge user -> app: upload
edge app -> upload: upload
edge upload -> encode: queue
edge encode -> storage: segments
edge feed -> watch: log view
edge watch -> rank: feedback
edge app -> notify: alerts`},{id:"discord",name:"Discord — Chat & Voice",description:"WebSocket gateways, message fanout, presence, voice relay.",questions:["Design a real-time chat and voice application","How do you deliver messages with low latency at scale?","How do you scale presence across many servers?","How do you route voice without jitter?","How do you handle server partitions and failover?"],text:`title: Chat & Voice
node user: User [round, icon=browser]
node client: Discord Client [icon=browser]
node gateway: Gateway [icon=server]
node message: Message Service [icon=message]
node rooms: Room Service [icon=users]
node presence: Presence [icon=users]
node voice: Voice Service [icon=worker]
node media: Media Relay [icon=cloud]
node index: Message Index [icon=search]
node db: Messages DB [cylinder, icon=database]
node cache: Hot Cache [cylinder, icon=cache]

edge user -> client: send
edge client -> gateway: websocket
edge gateway -> message: deliver
edge message -> db: store
edge message -> cache: recent
edge message -> index: index
edge gateway -> presence: status
edge client -> voice: connect
edge voice -> media: relay
edge client -> rooms: members`},{id:"shopify",name:"Shopify — E-commerce Platform",description:"Catalog, cart, orders, inventory, payments, checkout.",questions:["Design an e-commerce platform","How do you model products, variants, and inventory?","How do you keep the cart consistent under concurrency?","How do you process payments safely?","How do you scale flash-sale traffic?"],text:`title: E-commerce Platform
node buyer: Buyer [round, icon=browser]
node store: Storefront [icon=browser]
node api: API Gateway [icon=server]
node catalog: Catalog Service [icon=search]
node cart: Cart Service [icon=cache]
node order: Order Service [icon=compute]
node inv: Inventory Service [icon=file]
node pay: Payment Service [icon=shield]
node ship: Shipping Service [icon=worker]
node notify: Notifications [icon=mail]
node db: Orders DB [cylinder, icon=database]
node search: Product Search [icon=search]

edge buyer -> store: browse
edge store -> catalog: products
edge buyer -> cart: add
edge cart -> api: checkout
edge api -> order: place
edge order -> inv: reserve
edge order -> pay: charge
edge order -> ship: fulfill
edge order -> notify: receipt
edge order -> db: persist
edge store -> search: query`},{id:"ebay",name:"eBay — Online Marketplace",description:"Listings, search, auctions, bidding, escrow, settlement.",questions:["Design an online marketplace","How do you model listings and categories?","How do you run auctions with strict deadlines?","How do you prevent double-sales and over-bidding?","How do you handle search over millions of listings?"],text:`title: Online Marketplace
node buyer: Buyer [round, icon=browser]
node seller: Seller [round, icon=browser]
node api: API Gateway [icon=server]
node listing: Listing Service [icon=file]
node search: Listing Search [icon=search]
node bid: Bidding Engine [icon=compute]
node auction: Auction Timer [icon=worker]
node escrow: Escrow Service [icon=shield]
node pay: Payment Service [icon=shield]
node notify: Notifications [icon=message]
node db: Listings DB [cylinder, icon=database]
node cache: Hot Listings [cylinder, icon=cache]

edge seller -> api: create listing
edge api -> listing: persist
edge listing -> db: store
edge listing -> search: index
edge buyer -> api: place bid
edge api -> bid: record
edge bid -> auction: deadline
edge bid -> escrow: hold funds
edge escrow -> pay: settle
edge auction -> notify: outbid
edge buyer -> api: search
edge api -> search: query
edge search -> cache: hit`},{id:"datadog",name:"Datadog — Monitoring & Observability",description:"Metric ingestion, time-series storage, alerting, tracing.",questions:["Design a monitoring and observability platform","How do you ingest metrics at high write rates?","How do you store and query time-series data?","How do you alert reliably without noise?","How do you sample and retain traces efficiently?"],text:`title: Monitoring
node agent: Host Agent [round, icon=worker]
node ingest: Ingest API [icon=server]
node queue: Metrics Queue [icon=queue]
node stream: Stream Processor [icon=compute]
node series: Metric Store [cylinder, icon=database]
node tags: Tag Index [icon=search]
node alert: Alert Engine [icon=message]
node api: Query API [icon=server]
node dash: Dashboard [icon=browser]
node notify: Pager Notifier [icon=mail]

edge agent -> ingest: push metrics
edge ingest -> queue: buffer
edge queue -> stream: aggregate
edge stream -> series: store
edge stream -> tags: index
edge alert -> series: evaluate
edge alert -> notify: page
edge dash -> api: query
edge api -> series: range
edge agent -> ingest: heartbeat`},{id:"sentry",name:"Sentry — Error Tracking",description:"Error ingestion, grouping, releases, alerts, dashboards.",questions:["Design an error tracking service","How do you ingest error events at scale?","How do you group similar errors into issues?","How do you correlate errors with releases?","How do you alert on regressions without noise?"],text:`title: Error Tracking
node app: App SDK [round, icon=browser]
node ingest: Ingest Endpoint [icon=server]
node queue: Event Queue [icon=queue]
node normalize: Normalizer [icon=compute]
node group: Grouping Service [icon=search]
node index: Event Index [icon=search]
node store: Event Store [cylinder, icon=database]
node release: Release Service [icon=file]
node alert: Alert Service [icon=message]
node dash: Dashboard [icon=browser]
node notify: Notifications [icon=mail]

edge app -> ingest: report
edge ingest -> queue: buffer
edge queue -> normalize: parse
edge normalize -> group: fingerprint
edge group -> store: save
edge group -> index: index
edge release -> group: resolve
edge group -> alert: threshold
edge alert -> notify: email
edge dash -> store: query
edge dash -> index: search`},{id:"log-aggregation",name:"Log Aggregation — Log Search",description:"Log shipping, indexing, search, hot shards, archival.",questions:["Design a log aggregation system","How do you ship logs reliably from thousands of hosts?","How do you index and search structured logs fast?","How do you handle hot shards and uneven log volumes?","How do you archive old logs cheaply?"],text:`title: Log Aggregation
node host: Host [round, icon=worker]
node agent: Log Agent [icon=worker]
node collector: Collector [icon=server]
node queue: Log Queue [icon=queue]
node indexer: Indexer [icon=compute]
node index: Log Index [icon=search]
node store: Archive Store [cylinder, icon=database]
node query: Query Service [icon=search]
node alert: Alerting [icon=message]
node ui: Log UI [icon=browser]

edge host -> agent: tail
edge agent -> collector: ship
edge collector -> queue: batch
edge queue -> indexer: parse
edge indexer -> index: index
edge indexer -> store: archive
edge ui -> query: search
edge query -> index: lookup
edge query -> store: deep
edge index -> alert: pattern
edge alert -> ui: notify`},{id:"distributed-cron",name:"Distributed Scheduler — Cron",description:"Job scheduling, exactly-once, retries, rebalancing.",questions:["Design a distributed job scheduler","How do you ensure a job runs exactly once?","How do you handle missed executions and retries?","How do you prevent thundering-herd at schedule boundaries?","How do you rebalance jobs across workers?"],text:`title: Distributed Scheduler
node app: App [round, icon=browser]
node api: Scheduler API [icon=server]
node store: Job Store [cylinder, icon=database]
node dispatcher: Dispatcher [icon=compute]
node queue: Ready Queue [icon=queue]
node workers: Worker Pool [icon=worker]
node leader: Leader Elector [icon=shield]
node retry: Retry Handler [icon=sync]
node monitor: Monitor [icon=search]
node notify: Notifier [icon=message]

edge app -> api: schedule
edge api -> store: persist
edge store -> dispatcher: due jobs
edge dispatcher -> queue: enqueue
edge queue -> workers: claim
edge workers -> api: result
edge leader -> dispatcher: elect
edge retry -> queue: redeliver
edge monitor -> store: scan
edge dispatcher -> notify: alert`},{id:"leaderboard",name:"Gaming Leaderboard — Rankings",description:"Score updates, sorted sets, top-N queries, rank lookup.",questions:["Design a gaming leaderboard service","How do you store and update scores under concurrency?","How do you query top N and a players rank fast?","How do you handle ties and rank stability?","How do you scale to millions of players?"],text:`title: Leaderboard
node player: Player [round, icon=browser]
node api: Game API [icon=server]
node score: Score Service [icon=compute]
node zset: Sorted Set [cylinder, icon=cache]
node db: Player DB [cylinder, icon=database]
node rank: Rank Resolver [icon=search]
node snapshot: Snapshots [icon=file]
node notify: Push [icon=message]
node prize: Reward Service [icon=shield]

edge player -> api: submit score
edge api -> score: validate
edge score -> zset: insert
edge zset -> rank: lookup
edge player -> api: view top
edge api -> rank: top N
edge rank -> zset: range
edge score -> db: persist
edge db -> snapshot: dump
edge zset -> notify: rank change
edge notify -> prize: reward`},{id:"online-judge",name:"Online Judge — Code Runner",description:"Sandboxing, resource limits, submission queue, verification.",questions:["Design an online judge / code runner","How do you execute untrusted code safely?","How do you isolate and limit resources?","How do you queue and parallelize submissions?","How do you detect cheating and plagiarism?"],text:`title: Online Judge
node user: User [round, icon=browser]
node app: Problem App [icon=browser]
node api: Judge API [icon=server]
node problem: Problem Store [icon=file]
node queue: Submission Queue [icon=queue]
node runner: Sandbox Runner [icon=compute]
node checker: Verifier [icon=search]
node results: Result Store [cylinder, icon=database]
node stats: Leaderboard [icon=cache]
node notify: Notifications [icon=message]

edge user -> app: submit
edge app -> api: submit
edge api -> problem: fetch
edge api -> queue: enqueue
edge queue -> runner: execute
edge runner -> checker: verify
edge checker -> results: save
edge results -> api: verdict
edge api -> notify: result
edge results -> stats: update`},{id:"ad-serving",name:"Ad Serving — Ad Network",description:"Real-time auction, targeting, budgets, attribution.",questions:["Design an ad serving platform","How do you run a real-time auction under latency?","How do you target ads without hurting performance?","How do you enforce budgets and frequency caps?","How do you attribute conversions across touchpoints?"],text:`title: Ad Serving
node user: User [round, icon=browser]
node site: Publisher Site [icon=browser]
node ssp: Ad Request [icon=server]
node dsp: DSP Bidding [icon=compute]
node adx: Ad Exchange [icon=queue]
node profile: User Profile [cylinder, icon=database]
node target: Targeting Engine [icon=search]
node budget: Budget Service [icon=cache]
node tracking: Tracking Service [icon=worker]
node adstore: Ad Store [cylinder, icon=file]
node report: Reporting [icon=search]

edge user -> site: open
edge site -> ssp: request
edge ssp -> adx: auction
edge adx -> dsp: bid
edge dsp -> target: match
edge target -> profile: lookup
edge adx -> ssp: winner
edge ssp -> user: ad
edge user -> tracking: impression
edge tracking -> budget: charge
edge tracking -> report: log`},{id:"experimentation",name:"Experimentation — A/B Testing",description:"Variant assignment, statistical testing, metrics, guardrails.",questions:["Design an A/B testing platform","How do you assign users to variants consistently?","How do you ensure statistical validity across metrics?","How do you run experiments at scale without pollution?","How do you detect and stop bad experiments early?"],text:`title: Experimentation
node app: App SDK [round, icon=browser]
node api: Flag API [icon=server]
node assign: Assignment Service [icon=compute]
node alloc: Allocation Store [cylinder, icon=cache]
node event: Event Collector [icon=queue]
node metrics: Metrics Pipeline [icon=worker]
node analyze: Analysis Engine [icon=search]
node results: Results Store [cylinder, icon=database]
node ui: Experiment UI [icon=browser]
node notify: Alerts [icon=message]

edge app -> api: get variants
edge api -> assign: bucket
edge assign -> alloc: lookup
edge app -> event: log
edge event -> metrics: aggregate
edge metrics -> analyze: test
edge analyze -> results: save
edge ui -> api: create
edge api -> alloc: persist
edge analyze -> notify: alert`},{id:"feature-flag",name:"Feature Flag Service — Rollouts",description:"Flag evaluation, rollouts, targeting, caching, audit.",questions:["Design a feature flag service","How do you evaluate flags with low latency?","How do you implement gradual rollouts and targeting?","How do you avoid cache stampedes on flag changes?","How do you audit who changed what and when?"],text:`title: Feature Flags
node app: App SDK [round, icon=browser]
node api: Flag API [icon=server]
node store: Flag Store [cylinder, icon=database]
node cache: Flag Cache [cylinder, icon=cache]
node rollout: Rollout Engine [icon=compute]
node target: Targeting [icon=search]
node audit: Audit Log [icon=file]
node ui: Admin UI [icon=browser]
node notify: Webhooks [icon=message]
node metrics: Usage Metrics [icon=worker]

edge app -> api: evaluate
edge api -> cache: lookup
edge cache -> store: fallback
edge app -> api: flag check
edge ui -> rollout: update
edge rollout -> store: persist
edge rollout -> target: rules
edge rollout -> notify: publish
edge api -> audit: log
edge api -> metrics: count`},{id:"distributed-lock",name:"Distributed Lock Service",description:"Mutual exclusion, leases, fencing, fairness, failover.",questions:["Design a distributed lock service","How do you guarantee mutual exclusion across nodes?","How do you handle lock expiry and fencing?","How do you make locks fair and starvation-free?","How do you protect against split-brain failures?"],text:`title: Distributed Lock
node client: Client [round, icon=browser]
node api: Lock API [icon=server]
node backend: Lock Store [cylinder, icon=database]
node lease: Lease Manager [icon=compute]
node fencing: Fencing Tokens [icon=shield]
node wait: Wait Queue [icon=queue]
node heartbeat: Heartbeat [icon=sync]
node monitor: Monitor [icon=worker]
node audit: Audit Log [icon=file]

edge client -> api: acquire
edge api -> backend: try lock
edge backend -> api: grant
edge api -> lease: ttl
edge client -> heartbeat: renew
edge heartbeat -> backend: refresh
edge api -> fencing: token
edge api -> wait: queue
edge client -> api: release
edge api -> audit: record
edge monitor -> backend: expire`},{id:"time-series",name:"Time-series Database",description:"High-frequency writes, compression, downsampling, range queries.",questions:["Design a time-series database","How do you ingest high-frequency writes efficiently?","How do you compress and downsample old data?","How do you query ranges and aggregations fast?","How do you handle out-of-order and late data?"],text:`title: Time-series DB
node source: Sensor [round, icon=worker]
node ingest: Ingest API [icon=server]
node queue: Write Queue [icon=queue]
node writer: TSDB Writer [icon=compute]
node storage: Segment Store [cylinder, icon=database]
node index: Time Index [icon=search]
node downsample: Downsampler [icon=compute]
node query: Query Engine [icon=search]
node cache: Hot Cache [cylinder, icon=cache]
node api: Query API [icon=server]

edge source -> ingest: write
edge ingest -> queue: buffer
edge queue -> writer: flush
edge writer -> storage: segment
edge writer -> index: build
edge storage -> downsample: compact
edge api -> query: read
edge query -> cache: hit
edge query -> storage: scan
edge query -> index: locate`},{id:"object-storage",name:"Object Storage Service",description:"Partitioning, metadata, replication, multipart uploads.",questions:["Design an object storage service","How do you scale writes across many servers?","How do you keep metadata consistent and durable?","How do you replicate objects across regions?","How do you handle large objects and multipart uploads?"],text:`title: Object Storage
node client: Client [round, icon=browser]
node api: Storage API [icon=server]
node auth: Auth Service [icon=auth]
node metadata: Metadata DB [cylinder, icon=database]
node partition: Partitioner [icon=compute]
node chunks: Chunk Store [cylinder, icon=file]
node placement: Placement [icon=search]
node replication: Replicator [icon=sync]
node gc: Garbage Collector [icon=worker]
node monitor: Monitor [icon=search]

edge client -> api: put
edge api -> auth: verify
edge api -> partition: route
edge partition -> chunks: write
edge partition -> metadata: index
edge chunks -> replication: copy
edge metadata -> placement: locate
edge client -> api: get
edge api -> metadata: lookup
edge api -> chunks: read
edge chunks -> gc: collect`},{id:"cdn",name:"Content Delivery Network",description:"Edge routing, caching, invalidation, purge, analytics.",questions:["Design a content delivery network","How do you route users to the nearest edge?","How do you keep edge caches consistent with origin?","How do you handle cache stampedes and thundering herds?","How do you purge content across the network?"],text:`title: CDN
node user: User [round, icon=browser]
node edge: Edge Server [icon=server]
node cache: Edge Cache [cylinder, icon=cache]
node origin: Origin Server [icon=server]
node store: Origin Store [cylinder, icon=file]
node dns: DNS Router [icon=search]
node control: Control Plane [icon=compute]
node purge: Invalidation [icon=sync]
node log: Access Logs [icon=worker]
node analytics: Analytics [icon=search]

edge user -> dns: resolve
edge dns -> edge: route
edge user -> edge: request
edge edge -> cache: hit
edge edge -> origin: miss
edge origin -> store: fetch
edge edge -> user: serve
edge control -> purge: invalidate
edge purge -> edge: clear
edge edge -> log: record
edge log -> analytics: report`},{id:"email-delivery",name:"Email Delivery Service",description:"Sending, templating, deliverability, bounces, reputation.",questions:["Design an email delivery service","How do you ensure high deliverability?","How do you manage sender reputation?","How do you handle bounces and complaints?","How do you prevent your service being used for spam?"],text:`title: Email Delivery
node sender: Sender [round, icon=browser]
node api: Send API [icon=server]
node queue: Send Queue [icon=queue]
node template: Template Service [icon=file]
node validate: Address Validator [icon=search]
node agent: Sending Agent [icon=mail]
node bounce: Bounce Handler [icon=sync]
node reputation: Reputation Store [cylinder, icon=database]
node track: Tracking Pixel [icon=worker]
node report: Analytics [icon=search]

edge sender -> api: send
edge api -> template: render
edge api -> validate: check
edge api -> queue: enqueue
edge queue -> agent: deliver
edge agent -> bounce: track
edge bounce -> reputation: update
edge agent -> track: log
edge track -> report: stats
edge api -> queue: retry`},{id:"wallet",name:"Digital Wallet — Payments",description:"Ledger, balances, transfers, settlement, KYC, notifications.",questions:["Design a digital wallet","How do you guarantee balance consistency?","How do you avoid double-spending in transfers?","How do you reconcile with external payment rails?","How do you handle chargebacks and disputes?"],text:`title: Digital Wallet
node user: User [round, icon=browser]
node app: Wallet App [icon=browser]
node api: Wallet API [icon=server]
node ledger: Ledger Service [icon=compute]
node account: Account Store [cylinder, icon=database]
node auth: Auth Service [icon=auth]
node pay: Payment Rail [icon=shield]
node kyc: Compliance [icon=search]
node notify: Notifications [icon=message]
node cache: Balance Cache [cylinder, icon=cache]

edge user -> app: top up
edge app -> api: deposit
edge api -> auth: verify
edge api -> ledger: credit
edge ledger -> account: balance
edge user -> app: pay
edge app -> api: transfer
edge api -> pay: settle
edge api -> ledger: debit
edge ledger -> notify: receipt
edge api -> kyc: screen`},{id:"crypto-exchange",name:"Crypto Exchange — Trading",description:"Order matching, order book, settlement, market data.",questions:["Design a cryptocurrency exchange","How do you match buy and sell orders fairly?","How do you keep the order book consistent under load?","How do you settle trades atomically?","How do you prevent flash crashes and manipulation?"],text:`title: Crypto Exchange
node trader: Trader [round, icon=browser]
node api: Exchange API [icon=server]
node auth: Auth Service [icon=auth]
node order: Order Service [icon=compute]
node matching: Matching Engine [icon=compute]
node book: Order Book [cylinder, icon=cache]
node settle: Settlement [icon=shield]
node wallet: Wallet Service [icon=file]
node market: Market Data [icon=queue]
node ledger: Ledger DB [cylinder, icon=database]

edge trader -> api: place order
edge api -> auth: verify
edge api -> order: submit
edge order -> matching: match
edge matching -> book: update
edge matching -> market: publish
edge matching -> settle: trade
edge settle -> wallet: transfer
edge settle -> ledger: record
edge api -> ledger: balance`},{id:"flight-booking",name:"Flight Booking — Travel",description:"Flight search, fares, seat inventory, reservations, tickets.",questions:["Design a flight booking system","How do you avoid overselling seats?","How do you handle price changes and fare rules?","How do you manage partial payments and refunds?","How do you integrate with airline inventory systems?"],text:`title: Flight Booking
node user: User [round, icon=browser]
node app: Booking App [icon=browser]
node api: API Gateway [icon=server]
node search: Flight Search [icon=search]
node fare: Fare Service [icon=cache]
node inventory: Seat Inventory [cylinder, icon=database]
node booking: Booking Service [icon=compute]
node payment: Payment Service [icon=shield]
node ticket: Ticket Service [icon=file]
node notify: Notifications [icon=mail]

edge user -> app: search
edge app -> search: query
edge search -> fare: price
edge search -> inventory: seats
edge user -> app: book
edge app -> api: reserve
edge api -> booking: hold
edge booking -> payment: charge
edge booking -> inventory: decrement
edge booking -> ticket: issue
edge api -> notify: confirm`},{id:"telehealth",name:"Telehealth — Remote Care",description:"Appointments, video visits, EHR storage, triage, prescriptions.",questions:["Design a telehealth platform","How do you schedule and manage appointments?","How do you run secure video visits at scale?","How do you store and share patient records safely?","How do you handle emergency triage and escalations?"],text:`title: Telehealth
node patient: Patient [round, icon=browser]
node app: Patient App [icon=browser]
node api: Gateway [icon=server]
node auth: Auth Service [icon=auth]
node schedule: Scheduling [icon=compute]
node visit: Video Visit [icon=worker]
node record: EHR Store [cylinder, icon=database]
node triage: Triage Service [icon=search]
node rx: Prescription Service [icon=file]
node notify: Notifications [icon=message]

edge patient -> app: request
edge app -> api: book
edge api -> auth: verify
edge api -> schedule: slot
edge schedule -> notify: confirm
edge patient -> visit: join
edge visit -> record: chart
edge api -> triage: screen
edge triage -> rx: order
edge rx -> notify: ready`},{id:"password-manager",name:"Password Manager — Vault",description:"Encryption, key derivation, vault sync, autofill, audit.",questions:["Design a password manager","How do you protect vaults end-to-end?","How do you derive and manage encryption keys?","How do you sync vaults across devices securely?","How do you autofill without leaking credentials?"],text:`title: Password Manager
node user: User [round, icon=browser]
node app: Manager App [icon=browser]
node api: Vault API [icon=server]
node auth: Auth Service [icon=auth]
node kdf: Key Derivation [icon=compute]
node vault: Encrypted Vault [cylinder, icon=database]
node sync: Sync Service [icon=sync]
node audit: Audit Log [icon=file]
node monitor: Breach Monitor [icon=search]
node notify: Alerts [icon=message]

edge user -> app: unlock
edge app -> auth: verify
edge auth -> kdf: derive key
edge kdf -> vault: decrypt
edge user -> app: add entry
edge app -> api: encrypt
edge api -> vault: store
edge api -> sync: replicate
edge api -> audit: log
edge monitor -> notify: breach`},{id:"git-hosting",name:"Git Hosting — Repositories",description:"Object storage, refs, pull requests, CI, code review.",questions:["Design a git hosting service","How do you store git objects at scale?","How do you make clone and fetch operations fast?","How do you run CI on pushed commits?","How do you handle large repositories and monorepos?"],text:`title: Git Hosting
node dev: Developer [round, icon=browser]
node client: Git Client [icon=browser]
node gateway: Git Gateway [icon=server]
node repo: Repo Service [icon=file]
node object: Object Store [cylinder, icon=database]
node refs: Ref Service [icon=search]
node ci: CI Runner [icon=worker]
node review: PR Service [icon=users]
node web: Web UI [icon=browser]
node notify: Notifications [icon=message]

edge dev -> client: push
edge client -> gateway: pack
edge gateway -> repo: receive
edge repo -> object: store
edge repo -> refs: update
edge dev -> web: open PR
edge web -> review: create
edge review -> ci: build
edge ci -> review: status
edge review -> notify: comment`},{id:"podcast",name:"Podcast Platform — Audio",description:"Audio ingest, transcoding, RSS feeds, subscriptions, progress.",questions:["Design a podcast platform","How do you ingest and transcode audio?","How do you generate RSS feeds at scale?","How do you track listen progress across devices?","How do you recommend shows to listeners?"],text:`title: Podcast Platform
node creator: Creator [round, icon=browser]
node app: Podcast App [icon=browser]
node api: API Gateway [icon=server]
node upload: Upload Service [icon=cloud]
node encode: Audio Pipeline [icon=compute]
node storage: Audio Store [cylinder, icon=file]
node feed: RSS Feed [icon=queue]
node catalog: Catalog Service [icon=search]
node subscribe: Subscriptions [icon=users]
node progress: Listen State [cylinder, icon=cache]
node notify: Notifications [icon=message]

edge creator -> app: upload
edge app -> upload: submit
edge upload -> encode: transcode
edge encode -> storage: publish
edge storage -> feed: update
edge feed -> catalog: index
edge app -> subscribe: follow
edge app -> progress: save
edge progress -> api: resume
edge catalog -> notify: new episode`},{id:"iot-hub",name:"IoT Hub — Device Platform",description:"Telemetry ingestion, rules, device registry, command delivery.",questions:["Design an IoT device platform","How do you ingest telemetry from millions of devices?","How do you process rules in real time?","How do you send commands back to devices?","How do you manage device state and firmware updates?"],text:`title: IoT Hub
node device: Device [round, icon=worker]
node gateway: Edge Gateway [icon=server]
node hub: IoT Hub [icon=server]
node ingest: Ingestion Pipeline [icon=queue]
node rules: Rules Engine [icon=compute]
node store: Time-series Store [cylinder, icon=database]
node command: Command Service [icon=message]
node registry: Device Registry [icon=search]
node alert: Alerting [icon=message]
node dash: Dashboard [icon=browser]

edge device -> gateway: telemetry
edge gateway -> hub: publish
edge hub -> ingest: buffer
edge ingest -> rules: evaluate
edge ingest -> store: persist
edge rules -> alert: trigger
edge dash -> hub: query
edge hub -> command: downlink
edge command -> gateway: relay
edge gateway -> device: control
edge hub -> registry: register`},{id:"hotel-booking",name:"Booking.com — Hotel Booking",description:"Hotel search, availability, booking, payments, cancellations.",questions:["Design a hotel booking platform","How do you prevent double-booking and overbooking?","How do you design search and filtering for millions of rooms?","How do you handle payments, refunds, and currency conversion?","How do you handle cancellations and pricing changes?"],text:`title: Hotel Booking
node guest: Guest [round, icon=browser]
node app: Booking App [icon=browser]
node gateway: API Gateway [icon=server]
node search: Search Service [icon=search]
node avail: Availability Engine [icon=cache]
node booking: Booking Service [icon=compute]
node payment: Payment Service [icon=shield]
node inventory: Room Inventory [cylinder, icon=database]
node cache: Search Cache [cylinder, icon=cache]
node notify: Notifications [icon=message]
node db: Bookings DB [cylinder, icon=database]

edge guest -> app: search
edge app -> gateway: query
edge gateway -> search: hotels
edge search -> avail: check dates
edge avail -> inventory: lock room
edge gateway -> booking: book
edge booking -> payment: charge
edge booking -> db: store
edge payment -> notify: confirm
edge gateway -> cache: cache results
edge search -> cache: read
edge booking -> avail: release`},{id:"grocery-delivery",name:"Instacart — Grocery Delivery",description:"Catalog, cart, order fulfillment, shopper matching, delivery.",questions:["Design a grocery delivery service","How do you match shoppers with orders at scale?","How do you keep inventory in sync across stores?","How do you handle delivery time windows and routing?","How do you handle order substitutions and refunds?"],text:`title: Grocery Delivery
node customer: Customer [round, icon=browser]
node app: Store App [icon=browser]
node gateway: API Gateway [icon=server]
node catalog: Catalog [icon=search]
node cart: Cart Service [icon=compute]
node order: Order Service [icon=compute]
node inventory: Inventory Sync [icon=sync]
node shopper: Shopper Matching [icon=users]
node route: Delivery Routing [icon=compute]
node payment: Payment [icon=shield]
node notify: Notifications [icon=message]
node db: Orders DB [cylinder, icon=database]

edge customer -> app: shop
edge app -> gateway: add to cart
edge gateway -> cart: items
edge cart -> catalog: prices
edge gateway -> order: checkout
edge order -> inventory: check stock
edge order -> shopper: assign
edge shopper -> route: plan
edge order -> payment: charge
edge order -> db: store
edge payment -> notify: receipt
edge order -> notify: status`},{id:"restaurant-reservation",name:"OpenTable — Restaurant Reservation",description:"Restaurant search, table availability, booking, waitlists.",questions:["Design a restaurant reservation system","How do you model table availability and seat assignment?","How do you handle no-shows and overbooking?","How do you distribute reservations across restaurants?","How do you handle the waitlist and real-time updates?"],text:`title: Restaurant Reservation
node diner: Diner [round, icon=browser]
node app: Booking App [icon=browser]
node gateway: API Gateway [icon=server]
node search: Restaurant Search [icon=search]
node avail: Table Availability [icon=cache]
node booking: Reservation Service [icon=compute]
node waitlist: Waitlist [icon=queue]
node notify: Notifications [icon=message]
node restaurant: Restaurant Portal [icon=browser]
node db: Reservations DB [cylinder, icon=database]

edge diner -> app: find restaurant
edge app -> gateway: query
edge gateway -> search: matches
edge gateway -> avail: check tables
edge avail -> booking: reserve
edge booking -> db: store
edge booking -> notify: confirm
edge diner -> waitlist: join
edge waitlist -> notify: slot open
edge restaurant -> avail: update tables
edge restaurant -> booking: manage
edge avail -> search: capacity`},{id:"package-delivery",name:"FedEx — Package Delivery",description:"Shipment creation, sorting hubs, tracking, delivery routes.",questions:["Design a package delivery / shipping system","How do you generate and scan tracking events at scale?","How do you route packages through sorting hubs?","How do you plan last-mile delivery routes?","How do you handle delays and customer notifications?"],text:`title: Package Delivery
node sender: Sender [round, icon=browser]
node app: Shipping App [icon=browser]
node gateway: API Gateway [icon=server]
node ship: Shipment Service [icon=compute]
node label: Label Generator [icon=file]
node sort: Sorting Engine [icon=worker]
node track: Tracking Service [icon=search]
node route: Route Planner [icon=compute]
node carrier: Delivery Fleet [icon=users]
node notify: Notifications [icon=message]
node db: Shipments DB [cylinder, icon=database]

edge sender -> app: create shipment
edge app -> gateway: request
edge gateway -> ship: register
edge ship -> label: generate
edge label -> sort: route
edge sort -> route: assign
edge route -> carrier: deliver
edge carrier -> track: scan events
edge track -> notify: updates
edge ship -> db: store
edge track -> db: append
edge sender -> app: track`},{id:"fitness-tracker",name:"Strava — Fitness Tracker",description:"Workout logging, GPS tracks, stats, challenges, social feed.",questions:["Design a fitness / activity tracking service","How do you ingest high-frequency GPS track points?","How do you compute routes and segment stats?","How do you build leaderboards and challenges?","How do you make the social feed real-time?"],text:`title: Fitness Tracker
node athlete: Athlete [round, icon=browser]
node app: Tracker App [icon=browser]
node gateway: API Gateway [icon=server]
node ingest: Activity Ingest [icon=worker]
node gps: GPS Processing [icon=compute]
node workout: Workout Store [cylinder, icon=database]
node stats: Stats Engine [icon=compute]
node segments: Segment Engine [icon=search]
node social: Social Feed [icon=users]
node leaderboard: Leaderboards [icon=cache]
node notify: Notifications [icon=message]
node db: Profiles DB [cylinder, icon=database]

edge athlete -> app: record workout
edge app -> gateway: upload track
edge gateway -> ingest: points
edge ingest -> gps: smooth
edge gps -> workout: save
edge gps -> stats: summarize
edge gps -> segments: match
edge workout -> social: share
edge social -> leaderboard: rank
edge leaderboard -> notify: medal
edge app -> db: profile`},{id:"stock-trading",name:"Robinhood — Stock Trading",description:"Market data, order placement, matching, portfolio, risk.",questions:["Design a stock trading platform","How do you stream live market data to clients?","How do you place and match orders with low latency?","How do you manage risk and prevent losses?","How do you keep portfolio balances consistent?"],text:`title: Stock Trading
node trader: Trader [round, icon=browser]
node app: Trading App [icon=browser]
node gateway: API Gateway [icon=server]
node market: Market Data Feed [icon=queue]
node order: Order Service [icon=compute]
node match: Matching Engine [icon=compute]
node risk: Risk Checks [icon=shield]
node portfolio: Portfolio Service [icon=compute]
node ledger: Ledger [cylinder, icon=database]
node notify: Notifications [icon=message]
node cache: Price Cache [cylinder, icon=cache]
node db: Orders DB [cylinder, icon=database]

edge trader -> app: place order
edge app -> gateway: submit
edge gateway -> order: validate
edge order -> risk: check
edge risk -> match: execute
edge match -> portfolio: update
edge portfolio -> ledger: settle
edge market -> cache: prices
edge cache -> app: quote stream
edge match -> notify: fill
edge order -> db: record`},{id:"online-banking",name:"Online Banking",description:"Accounts, transfers, transactions, ledgers, notifications.",questions:["Design an online banking system","How do you ensure transfers are atomic and consistent?","How do you design the ledger and double-entry accounting?","How do you detect fraud and flag suspicious activity?","How do you handle high traffic on paydays?"],text:`title: Online Banking
node customer: Customer [round, icon=browser]
node app: Banking App [icon=browser]
node gateway: API Gateway [icon=server]
node auth: Auth Service [icon=shield]
node account: Account Service [icon=compute]
node transfer: Transfer Service [icon=compute]
node ledger: Ledger [cylinder, icon=database]
node fraud: Fraud Detection [icon=shield]
node pay: Payments [icon=compute]
node notify: Notifications [icon=message]
node db: Accounts DB [cylinder, icon=database]

edge customer -> app: login
edge app -> gateway: request
edge gateway -> auth: verify
edge customer -> app: transfer
edge gateway -> transfer: initiate
edge transfer -> account: debit
edge account -> ledger: record
edge ledger -> pay: settle
edge pay -> notify: receipt
edge gateway -> fraud: screen
edge fraud -> transfer: block
edge account -> db: balance`},{id:"payroll-service",name:"Gusto — Payroll Service",description:"Employee onboarding, pay runs, tax filing, direct deposit.",questions:["Design a payroll processing system","How do you compute pay with taxes and deductions?","How do you run monthly and semimonthly pay cycles?","How do you handle tax filing across jurisdictions?","How do you ensure compliance and auditability?"],text:`title: Payroll
node company: Company Admin [round, icon=browser]
node app: Payroll App [icon=browser]
node gateway: API Gateway [icon=server]
node employee: Employee Service [icon=users]
node pay: Payroll Engine [icon=compute]
node tax: Tax Engine [icon=compute]
node deposit: Direct Deposit [icon=shield]
node ledger: Pay Ledger [cylinder, icon=database]
node report: Reports [icon=file]
node notify: Notifications [icon=message]
node db: Payroll DB [cylinder, icon=database]

edge company -> app: add employee
edge app -> gateway: onboard
edge gateway -> employee: save
edge gateway -> pay: run payroll
edge pay -> tax: compute
edge pay -> employee: hours
edge tax -> deposit: amount
edge deposit -> ledger: pay
edge pay -> report: generate
edge pay -> notify: payslips
edge pay -> db: store`},{id:"crm",name:"Salesforce — CRM",description:"Leads, contacts, opportunities, pipelines, dashboards.",questions:["Design a customer relationship management system","How do you model leads, contacts, and accounts?","How do you track sales pipelines and forecasts?","How do you support custom objects and fields?","How do you integrate email and notifications?"],text:`title: CRM
node sales: Sales Rep [round, icon=browser]
node app: CRM App [icon=browser]
node gateway: API Gateway [icon=server]
node lead: Lead Service [icon=compute]
node contact: Contact Service [icon=users]
node account: Account Service [icon=compute]
node opp: Opportunity Service [icon=compute]
node pipeline: Pipeline Engine [icon=compute]
node report: Reports & Dashboards [icon=file]
node mail: Email Sync [icon=mail]
node notify: Notifications [icon=message]
node db: CRM DB [cylinder, icon=database]

edge sales -> app: log activity
edge app -> gateway: save
edge gateway -> lead: capture
edge gateway -> contact: update
edge lead -> opp: convert
edge contact -> account: associate
edge opp -> pipeline: stage
edge pipeline -> report: forecast
edge mail -> contact: sync
edge report -> notify: alert
edge lead -> db: store`},{id:"issue-tracker",name:"Jira — Issue Tracker",description:"Issues, sprints, boards, workflows, search, notifications.",questions:["Design an issue tracking system","How do you model issues, projects, and workflows?","How do you power board and backlog queries?","How do you support real-time collaboration?","How do you scale search across many issues?"],text:`title: Issue Tracker
node dev: Developer [round, icon=browser]
node app: Tracker App [icon=browser]
node gateway: API Gateway [icon=server]
node issue: Issue Service [icon=compute]
node project: Project Service [icon=compute]
node workflow: Workflow Engine [icon=compute]
node sprint: Sprint Service [icon=compute]
node search: Search Index [icon=search]
node realtime: Realtime Updates [icon=sync]
node notify: Notifications [icon=message]
node db: Issues DB [cylinder, icon=database]

edge dev -> app: create issue
edge app -> gateway: submit
edge gateway -> issue: validate
edge issue -> project: link
edge issue -> workflow: transition
edge workflow -> sprint: assign
edge issue -> search: index
edge realtime -> app: push updates
edge search -> app: results
edge issue -> notify: mentions
edge issue -> db: store`},{id:"customer-support",name:"Zendesk — Customer Support",description:"Tickets, routing, knowledge base, live chat, SLAs.",questions:["Design a customer support / ticketing system","How do you route tickets to the right agent?","How do you build the knowledge base and search?","How do you power live chat at scale?","How do you track SLAs and agent metrics?"],text:`title: Customer Support
node customer: Customer [round, icon=browser]
node app: Support Portal [icon=browser]
node gateway: API Gateway [icon=server]
node ticket: Ticket Service [icon=compute]
node routing: Routing Engine [icon=compute]
node agent: Agent Workspace [icon=users]
node kb: Knowledge Base [icon=search]
node chat: Live Chat [icon=message]
node sla: SLA Tracker [icon=cache]
node notify: Notifications [icon=message]
node db: Tickets DB [cylinder, icon=database]

edge customer -> app: submit ticket
edge app -> gateway: request
edge gateway -> ticket: create
edge ticket -> routing: assign
edge routing -> agent: queue
edge agent -> ticket: respond
edge kb -> agent: suggestions
edge customer -> chat: message
edge chat -> agent: stream
edge ticket -> sla: monitor
edge sla -> notify: escalate
edge ticket -> db: store`},{id:"wiki",name:"Confluence — Wiki",description:"Pages, revisions, search, permissions, notifications.",questions:["Design a wiki / knowledge base","How do you model page revisions and history?","How do you implement permissions across spaces?","How do you index pages for search?","How do you handle concurrent edits?"],text:`title: Wiki
node author: Author [round, icon=browser]
node app: Wiki App [icon=browser]
node gateway: API Gateway [icon=server]
node page: Page Service [icon=compute]
node space: Space Service [icon=compute]
node revision: Revision Engine [icon=compute]
node acl: Permissions [icon=shield]
node search: Search Index [icon=search]
node cache: Page Cache [cylinder, icon=cache]
node notify: Notifications [icon=message]
node db: Pages DB [cylinder, icon=database]

edge author -> app: edit page
edge app -> gateway: save
edge gateway -> page: validate
edge page -> revision: snapshot
edge page -> space: organize
edge page -> acl: check
edge acl -> page: allow
edge page -> search: index
edge page -> cache: invalidate
edge page -> notify: watchers
edge page -> db: store`},{id:"notes-app",name:"Evernote — Notes App",description:"Note capture, sync, search, attachments, sharing.",questions:["Design a notes / note-taking app","How do you sync notes across devices?","How do you handle offline edits and conflict resolution?","How do you implement full-text search over notes?","How do you handle attachments and media?"],text:`title: Notes App
node user: User [round, icon=browser]
node app: Notes App [icon=browser]
node gateway: API Gateway [icon=server]
node note: Note Service [icon=compute]
node sync: Sync Engine [icon=sync]
node version: Version Control [icon=compute]
node attach: Attachment Store [cylinder, icon=file]
node search: Search Index [icon=search]
node share: Sharing [icon=users]
node notify: Notifications [icon=message]
node db: Notes DB [cylinder, icon=database]

edge user -> app: create note
edge app -> gateway: upload
edge gateway -> note: save
edge note -> sync: delta
edge sync -> version: history
edge app -> attach: store
edge note -> search: index
edge user -> app: search
edge search -> app: results
edge note -> share: collaborate
edge share -> notify: comment
edge note -> db: store`},{id:"read-it-later",name:"Pocket — Read It Later",description:"Article saving, extraction, reading progress, search.",questions:["Design a read-it-later service","How do you fetch and extract article content reliably?","How do you handle paywalls and dynamic pages?","How do you recommend articles and tag content?","How do you sync reading progress across devices?"],text:`title: Read It Later
node user: Reader [round, icon=browser]
node app: Reader App [icon=browser]
node gateway: API Gateway [icon=server]
node save: Save Service [icon=compute]
node fetch: Fetch Worker [icon=worker]
node extract: Content Extractor [icon=compute]
node queue: Fetch Queue [icon=queue]
node tag: Tagging [icon=search]
node progress: Reading Progress [icon=sync]
node cache: Article Cache [cylinder, icon=cache]
node db: Articles DB [cylinder, icon=database]

edge user -> app: save url
edge app -> gateway: request
edge gateway -> save: queue
edge save -> queue: enqueue
edge queue -> fetch: crawl
edge fetch -> extract: parse
edge extract -> db: store
edge extract -> cache: cache
edge user -> app: read
edge app -> progress: track
edge db -> tag: classify
edge tag -> app: filter`},{id:"newsletter",name:"Substack — Newsletter",description:"Writing, subscribers, campaign sending, analytics.",questions:["Design a newsletter / mailing platform","How do you send campaigns to millions of subscribers?","How do you handle bounces and unsubscribes?","How do you track opens and clicks?","How do you manage paid subscriptions?"],text:`title: Newsletter
node author: Author [round, icon=browser]
node app: Writing App [icon=browser]
node gateway: API Gateway [icon=server]
node campaign: Campaign Service [icon=compute]
node subscriber: Subscriber Service [icon=users]
node send: Send Engine [icon=worker]
node queue: Send Queue [icon=queue]
node mail: Email Delivery [icon=mail]
node track: Tracking Pixel [icon=cache]
node analytics: Analytics [icon=compute]
node db: Subscribers DB [cylinder, icon=database]

edge author -> app: publish post
edge app -> gateway: create
edge gateway -> campaign: schedule
edge campaign -> subscriber: list
edge subscriber -> queue: enqueue
edge queue -> send: dispatch
edge send -> mail: deliver
edge mail -> track: opens
edge track -> analytics: events
edge campaign -> analytics: report
edge campaign -> db: store`},{id:"news-aggregator",name:"Google News — News Aggregator",description:"Feed fetching, ranking, categorization, personalization.",questions:["Design a news aggregator","How do you crawl and parse news sources?","How do you rank stories for a personalized feed?","How do you cluster related articles?","How do you handle breaking news in real-time?"],text:`title: News Aggregator
node reader: Reader [round, icon=browser]
node app: News App [icon=browser]
node gateway: API Gateway [icon=server]
node crawler: Feed Crawler [icon=worker]
node parser: Article Parser [icon=compute]
node cluster: Story Clustering [icon=compute]
node rank: Ranking Service [icon=compute]
node feed: Personalized Feed [icon=search]
node realtime: Breaking News [icon=queue]
node cache: Feed Cache [cylinder, icon=cache]
node db: Articles DB [cylinder, icon=database]

edge reader -> app: open feed
edge crawler -> parser: raw pages
edge parser -> db: store
edge parser -> cluster: group
edge cluster -> rank: stories
edge rank -> feed: personalize
edge feed -> cache: serve
edge realtime -> feed: inject
edge app -> gateway: request
edge gateway -> feed: read
edge cache -> app: fast load`},{id:"weather-service",name:"Weather Service",description:"Forecast ingestion, geocoding, alerting, caching.",questions:["Design a weather service","How do you ingest data from multiple forecast providers?","How do you serve forecasts by location at scale?","How do you geocode locations and reverse-geocode?","How do you push severe weather alerts?"],text:`title: Weather Service
node user: User [round, icon=browser]
node app: Weather App [icon=browser]
node gateway: API Gateway [icon=server]
node provider: Forecast Providers [icon=cloud]
node ingest: Ingest Worker [icon=worker]
node forecast: Forecast Service [icon=compute]
node geocode: Geocoding [icon=search]
node cache: Forecast Cache [cylinder, icon=cache]
node alert: Alert Engine [icon=message]
node queue: Alert Queue [icon=queue]
node db: Weather DB [cylinder, icon=database]

edge user -> app: get forecast
edge app -> gateway: query
edge gateway -> geocode: locate
edge geocode -> forecast: lookup
edge forecast -> cache: read
edge cache -> forecast: miss
edge provider -> ingest: data
edge ingest -> db: store
edge ingest -> forecast: refresh
edge forecast -> alert: thresholds
edge alert -> queue: dispatch
edge queue -> user: push`},{id:"translation-service",name:"Google Translate — Translation",description:"Text translation, language detection, models, caching.",questions:["Design a translation service","How do you serve translation models at scale?","How do you detect source language automatically?","How do you translate documents while preserving format?","How do you cache translations safely?"],text:`title: Translation Service
node user: User [round, icon=browser]
node app: Translate App [icon=browser]
node gateway: API Gateway [icon=server]
node detect: Language Detect [icon=search]
node translate: Translation Engine [icon=compute]
node models: Model Serving [icon=cloud]
node format: Format Preserver [icon=file]
node cache: Translation Cache [cylinder, icon=cache]
node queue: Batch Queue [icon=queue]
node audit: Usage Tracking [icon=compute]
node db: Usage DB [cylinder, icon=database]

edge user -> app: input text
edge app -> gateway: request
edge gateway -> detect: language
edge gateway -> translate: translate
edge translate -> models: infer
edge translate -> cache: check
edge models -> cache: store
edge gateway -> format: document
edge format -> app: output
edge gateway -> queue: batch
edge queue -> audit: log
edge audit -> db: store`},{id:"speech-recognition",name:"Speech Recognition",description:"Audio streaming, transcription, diarization, models.",questions:["Design a speech-to-text service","How do you stream audio and transcribe in real-time?","How do you handle speaker diarization?","How do you improve accuracy with context?","How do you process batch audio files?"],text:`title: Speech Recognition
node user: User [round, icon=browser]
node app: Speech App [icon=browser]
node gateway: API Gateway [icon=server]
node stream: Audio Stream [icon=queue]
node asr: ASR Engine [icon=compute]
node diarize: Speaker Diarization [icon=users]
node models: Model Serving [icon=cloud]
node context: Context Service [icon=search]
node queue: Batch Queue [icon=queue]
node notify: Notifications [icon=message]
node db: Transcripts DB [cylinder, icon=database]

edge user -> app: speak
edge app -> gateway: stream
edge gateway -> stream: buffer
edge stream -> asr: chunks
edge asr -> models: decode
edge asr -> diarize: speakers
edge asr -> context: refine
edge context -> app: live text
edge gateway -> queue: batch
edge queue -> asr: process
edge asr -> db: store
edge gateway -> notify: done`},{id:"voice-assistant",name:"Alexa — Voice Assistant",description:"Wake word, speech-to-text, intent parsing, actions.",questions:["Design a voice assistant","How do you handle wake word detection on device?","How do you convert speech to intent reliably?","How do you orchestrate skills and actions?","How do you handle errors and fallbacks?"],text:`title: Voice Assistant
node user: User [round, icon=browser]
node device: Smart Device [icon=browser]
node wake: Wake Word Engine [icon=compute]
node gateway: Assistant Gateway [icon=server]
node asr: Speech-to-Text [icon=compute]
node nlu: Intent Parser [icon=search]
node skill: Skill Router [icon=compute]
node action: Action Service [icon=worker]
node tts: Text-to-Speech [icon=compute]
node cache: Response Cache [cylinder, icon=cache]
node db: Session DB [cylinder, icon=database]

edge user -> device: "hey device"
edge device -> wake: detect
edge wake -> gateway: start
edge gateway -> asr: audio
edge asr -> nlu: text
edge nlu -> skill: intent
edge skill -> action: execute
edge action -> tts: respond
edge tts -> device: speak
edge skill -> cache: reuse
edge gateway -> db: session`},{id:"content-moderation",name:"Content Moderation",description:"Image and text screening, policy scoring, human review.",questions:["Design a content moderation system","How do you detect violating images and text?","How do you combine automated and human review?","How do you handle policy changes?","How do you scale to millions of uploads?"],text:`title: Content Moderation
node user: User [round, icon=browser]
node app: Upload App [icon=browser]
node gateway: API Gateway [icon=server]
node pipeline: Moderation Pipeline [icon=compute]
node image: Image Detector [icon=compute]
node text: Text Detector [icon=compute]
node model: ML Models [icon=cloud]
node review: Human Review [icon=users]
node queue: Review Queue [icon=queue]
node notify: Notifications [icon=message]
node db: Moderation DB [cylinder, icon=database]

edge user -> app: upload
edge app -> gateway: submit
edge gateway -> pipeline: score
edge pipeline -> image: scan
edge pipeline -> text: scan
edge image -> model: predict
edge text -> model: predict
edge pipeline -> queue: flag
edge queue -> review: adjudicate
edge review -> db: decision
edge review -> notify: result`},{id:"fraud-detection",name:"Fraud Detection",description:"Transaction scoring, rules, models, real-time blocks.",questions:["Design a fraud detection system","How do you score transactions in real-time?","How do you combine rules with ML models?","How do you retrain models with new fraud patterns?","How do you avoid false positives?"],text:`title: Fraud Detection
node user: User [round, icon=browser]
node app: Payment App [icon=browser]
node gateway: API Gateway [icon=server]
node txn: Transaction Service [icon=compute]
node rules: Rule Engine [icon=compute]
node model: ML Model Service [icon=cloud]
node feature: Feature Store [icon=cache]
node risk: Risk Scoring [icon=shield]
node queue: Event Queue [icon=queue]
node notify: Alerts [icon=message]
node db: Transactions DB [cylinder, icon=database]

edge user -> app: pay
edge app -> gateway: charge
edge gateway -> txn: create
edge txn -> rules: evaluate
edge rules -> feature: enrich
edge feature -> model: predict
edge model -> risk: score
edge risk -> txn: allow
edge risk -> queue: events
edge queue -> notify: alert
edge txn -> db: store`},{id:"bot-detection",name:"Bot Detection",description:"Traffic analysis, behavioral checks, CAPTCHA, blocking.",questions:["Design a bot detection system","How do you distinguish bots from humans?","How do you use behavioral signals?","How do you scale checks without hurting latency?","How do you handle CAPTCHA challenges?"],text:`title: Bot Detection
node client: Client [round, icon=browser]
node app: Web App [icon=browser]
node gateway: API Gateway [icon=server]
node traffic: Traffic Analyzer [icon=compute]
node behavior: Behavioral Signals [icon=compute]
node device: Device Fingerprint [icon=cache]
node model: Bot Model [icon=cloud]
node captcha: CAPTCHA Service [icon=shield]
node block: Blocking Engine [icon=shield]
node queue: Event Queue [icon=queue]
node db: Signals DB [cylinder, icon=database]

edge client -> app: request
edge app -> gateway: pass
edge gateway -> traffic: analyze
edge traffic -> behavior: score
edge behavior -> device: fingerprint
edge device -> model: classify
edge model -> block: decide
edge block -> captcha: challenge
edge captcha -> client: verify
edge traffic -> queue: log
edge queue -> db: store`},{id:"recommendation-system",name:"Recommendation System",description:"User features, candidate generation, ranking, serving.",questions:["Design a recommendation system","How do you generate candidate items?","How do you rank candidates for each user?","How do you handle cold-start users?","How do you update features and retrain models?"],text:`title: Recommendation System
node user: User [round, icon=browser]
node app: Web App [icon=browser]
node gateway: API Gateway [icon=server]
node feature: Feature Store [icon=cache]
node candidate: Candidate Generation [icon=compute]
node rank: Ranking Model [icon=cloud]
node policy: Serving Policy [icon=compute]
node recs: Recommendation Service [icon=search]
node feedback: Feedback Loop [icon=queue]
node train: Training Pipeline [icon=worker]
node db: Events DB [cylinder, icon=database]

edge user -> app: browse
edge app -> gateway: request
edge gateway -> recs: get
edge recs -> candidate: pool
edge candidate -> rank: score
edge rank -> policy: filter
edge policy -> recs: serve
edge recs -> app: results
edge app -> feedback: clicks
edge feedback -> train: retrain
edge train -> feature: update
edge recs -> db: log`},{id:"spell-checker",name:"Spell Checker",description:"Dictionary lookup, fuzzy matching, corrections, suggestions.",questions:["Design a spell checker","How do you store and query the dictionary?","How do you generate correction suggestions?","How do you rank suggestions by likelihood?","How do you handle context and proper nouns?"],text:`title: Spell Checker
node user: User [round, icon=browser]
node app: Editor [icon=browser]
node gateway: API Gateway [icon=server]
node check: Check Service [icon=compute]
node dict: Dictionary [cylinder, icon=database]
node fuzzy: Fuzzy Matcher [icon=search]
node cand: Candidate Generator [icon=compute]
node rank: Suggestion Ranker [icon=compute]
node cache: Lookup Cache [cylinder, icon=cache]
node model: Context Model [icon=cloud]
node db: Usage DB [cylinder, icon=database]

edge user -> app: type
edge app -> gateway: check
edge gateway -> check: tokenize
edge check -> dict: lookup
edge dict -> check: hit
edge check -> fuzzy: near match
edge fuzzy -> cand: candidates
edge cand -> rank: order
edge rank -> app: suggestions
edge app -> model: context
edge gateway -> cache: memo
edge check -> db: log`},{id:"grammar-checker",name:"Grammarly — Grammar Checker",description:"Grammar rules, style scoring, rewrites, model serving.",questions:["Design a grammar and writing assistant","How do you detect grammar errors at scale?","How do you combine rules with language models?","How do you suggest style improvements?","How do you protect user privacy?"],text:`title: Grammar Checker
node user: User [round, icon=browser]
node app: Editor Plugin [icon=browser]
node gateway: API Gateway [icon=server]
node parse: Parsing Service [icon=compute]
node rules: Rule Engine [icon=compute]
node model: Language Model [icon=cloud]
node style: Style Scorer [icon=compute]
node rewrite: Rewrite Service [icon=compute]
node cache: Check Cache [cylinder, icon=cache]
node privacy: Privacy Filter [icon=shield]
node db: Usage DB [cylinder, icon=database]

edge user -> app: write
edge app -> gateway: submit
edge gateway -> parse: sentences
edge parse -> rules: check
edge rules -> model: verify
edge model -> style: score
edge style -> rewrite: suggest
edge rewrite -> app: display
edge app -> privacy: scrub
edge privacy -> cache: store
edge gateway -> db: log`},{id:"sentiment-analysis",name:"Sentiment Analysis",description:"Text scoring, aggregation, dashboards, streaming input.",questions:["Design a sentiment analysis service","How do you classify sentiment at scale?","How do you aggregate sentiment over time?","How do you handle streaming data sources?","How do you evaluate and improve accuracy?"],text:`title: Sentiment Analysis
node source: Data Sources [icon=cloud]
node app: Dashboard App [icon=browser]
node gateway: API Gateway [icon=server]
node ingest: Ingestion Worker [icon=worker]
node queue: Event Queue [icon=queue]
node classify: Sentiment Model [icon=cloud]
node agg: Aggregation Engine [icon=compute]
node store: Time Series Store [cylinder, icon=database]
node dash: Dashboard Service [icon=search]
node monitor: Model Monitor [icon=cache]
node db: Scores DB [cylinder, icon=database]

edge source -> app: stream
edge app -> gateway: forward
edge gateway -> ingest: buffer
edge ingest -> queue: enqueue
edge queue -> classify: score
edge classify -> agg: aggregate
edge agg -> store: buckets
edge store -> dash: query
edge dash -> app: render
edge classify -> monitor: drift
edge classify -> db: store`},{id:"online-learning",name:"Coursera — Online Learning",description:"Courses, videos, progress, quizzes, certificates.",questions:["Design an online learning platform","How do you stream video lessons at scale?","How do you track learner progress?","How do you build quizzes and grading?","How do you issue certificates?"],text:`title: Online Learning
node student: Student [round, icon=browser]
node app: Learning App [icon=browser]
node gateway: API Gateway [icon=server]
node course: Course Service [icon=compute]
node video: Video Platform [icon=cloud]
node progress: Progress Tracker [icon=compute]
node quiz: Quiz Engine [icon=compute]
node grade: Grading Service [icon=compute]
node cert: Certificate Service [icon=shield]
node notify: Notifications [icon=message]
node db: Enrollments DB [cylinder, icon=database]

edge student -> app: enroll
edge app -> gateway: join
edge gateway -> course: register
edge student -> app: watch
edge app -> video: stream
edge app -> progress: update
edge student -> app: take quiz
edge gateway -> quiz: submit
edge quiz -> grade: score
edge grade -> cert: award
edge progress -> db: store
edge cert -> notify: email`},{id:"quiz-game",name:"Kahoot — Quiz Game",description:"Lobbies, live questions, answers, scoring, leaderboards.",questions:["Design a live quiz / trivia game","How do you synchronize questions across players?","How do you handle answer latency and correctness?","How do you compute scores and leaderboards in real-time?","How do you scale to many concurrent lobbies?"],text:`title: Quiz Game
node player: Player [round, icon=browser]
node host: Host [round, icon=browser]
node app: Game App [icon=browser]
node gateway: API Gateway [icon=server]
node lobby: Lobby Service [icon=compute]
node room: Game Room [icon=compute]
node question: Question Bank [cylinder, icon=database]
node answer: Answer Collector [icon=queue]
node score: Scoring Engine [icon=compute]
node board: Live Leaderboard [icon=sync]
node db: Games DB [cylinder, icon=database]

edge host -> app: start game
edge app -> lobby: create
edge lobby -> room: join
edge player -> app: join
edge room -> question: load
edge room -> app: broadcast
edge player -> app: answer
edge answer -> score: grade
edge score -> board: update
edge board -> app: push
edge room -> db: save`},{id:"multiplayer-game",name:"Multiplayer Game",description:"Game state, tick loop, sync, chat, persistence.",questions:["Design a multiplayer online game backend","How do you synchronize game state at 60fps?","How do you run the authoritative tick loop?","How do you handle lag and prediction?","How do you scale players across servers?"],text:`title: Multiplayer Game
node player: Player [round, icon=browser]
node app: Game Client [icon=browser]
node gateway: Gateway [icon=server]
node session: Session Service [icon=compute]
node tick: Tick Loop [icon=compute]
node state: Game State [icon=cache]
node world: World Shards [icon=compute]
node sync: State Sync [icon=sync]
node chat: Chat Service [icon=message]
node save: Snapshot Service [icon=worker]
node db: Game DB [cylinder, icon=database]

edge player -> app: input
edge app -> gateway: command
edge gateway -> session: route
edge session -> tick: step
edge tick -> state: mutate
edge state -> sync: diff
edge sync -> app: update
edge tick -> world: zone
edge app -> chat: message
edge tick -> save: checkpoint
edge save -> db: store`},{id:"game-matchmaking",name:"Game Matchmaking",description:"Queueing, skill rating, party formation, match creation.",questions:["Design a game matchmaking system","How do you build a ranked queue?","How do you balance teams by skill?","How do you handle queue time targets?","How do you avoid bad matches?"],text:`title: Game Matchmaking
node player: Player [round, icon=browser]
node app: Game App [icon=browser]
node gateway: API Gateway [icon=server]
node queue: Matchmaking Queue [icon=queue]
node rating: Skill Rating [icon=compute]
node party: Party Service [icon=users]
node match: Matchmaker [icon=compute]
node mmr: Rating Store [cylinder, icon=database]
node room: Match Rooms [icon=server]
node notify: Notifications [icon=message]
node db: Matches DB [cylinder, icon=database]

edge player -> app: queue
edge app -> gateway: enqueue
edge gateway -> queue: insert
edge queue -> rating: rank
edge rating -> mmr: lookup
edge party -> queue: group
edge queue -> match: form
edge match -> room: create
edge room -> notify: ready
edge notify -> app: accept
edge match -> db: store`},{id:"fantasy-sports",name:"Fantasy Sports",description:"Leagues, drafts, rosters, live scoring, notifications.",questions:["Design a fantasy sports platform","How do you run live drafts with many users?","How do you score rosters against live games?","How do you power the waiver wire and trades?","How do you push real-time score updates?"],text:`title: Fantasy Sports
node owner: Team Owner [round, icon=browser]
node app: Fantasy App [icon=browser]
node gateway: API Gateway [icon=server]
node league: League Service [icon=compute]
node draft: Draft Engine [icon=compute]
node roster: Roster Service [icon=compute]
node score: Live Scoring [icon=queue]
node stats: Stats Provider [icon=cloud]
node trade: Waiver & Trades [icon=compute]
node notify: Notifications [icon=message]
node db: Leagues DB [cylinder, icon=database]

edge owner -> app: draft
edge app -> gateway: pick
edge gateway -> draft: select
edge draft -> roster: assign
edge stats -> score: live data
edge score -> roster: points
edge roster -> app: update
edge owner -> app: waiver
edge gateway -> trade: process
edge trade -> roster: swap
edge score -> notify: alert
edge league -> db: store`},{id:"photo-editing",name:"Photo Editing",description:"Uploads, processing jobs, filters, rendering, storage.",questions:["Design a photo editing service","How do you handle large image uploads?","How do you apply filters and edits at scale?","How do you manage processing job queues?","How do you serve edited images fast?"],text:`title: Photo Editing
node user: User [round, icon=browser]
node app: Editor App [icon=browser]
node gateway: API Gateway [icon=server]
node upload: Upload Service [icon=worker]
node store: Object Storage [cylinder, icon=file]
node job: Edit Job [icon=compute]
node queue: Job Queue [icon=queue]
node render: Render Workers [icon=compute]
node filter: Filter Library [icon=file]
node cache: CDN Cache [icon=cache]
node db: Metadata DB [cylinder, icon=database]

edge user -> app: upload
edge app -> gateway: submit
edge gateway -> upload: transfer
edge upload -> store: save
edge gateway -> job: create
edge job -> queue: enqueue
edge queue -> render: process
edge render -> filter: apply
edge render -> store: write
edge store -> cache: deliver
edge job -> db: metadata`},{id:"video-editing",name:"Video Editing",description:"Uploads, transcoding, timeline editing, rendering.",questions:["Design a cloud video editing service","How do you transcode videos at scale?","How do you support timeline editing in the browser?","How do you render final videos efficiently?","How do you manage storage costs?"],text:`title: Video Editing
node user: User [round, icon=browser]
node app: Editor App [icon=browser]
node gateway: API Gateway [icon=server]
node upload: Upload Service [icon=worker]
node store: Object Storage [cylinder, icon=file]
node transcode: Transcoding Cluster [icon=compute]
node segment: Segment Service [icon=compute]
node queue: Job Queue [icon=queue]
node render: Render Farm [icon=compute]
node cache: CDN Cache [icon=cache]
node db: Metadata DB [cylinder, icon=database]

edge user -> app: upload
edge app -> gateway: submit
edge gateway -> upload: transfer
edge upload -> store: raw
edge transcode -> segment: chunks
edge segment -> store: proxies
edge app -> segment: edit
edge gateway -> render: export
edge render -> queue: jobs
edge render -> store: final
edge store -> cache: stream`},{id:"sms-gateway",name:"SMS Gateway",description:"Message sending, provider routing, delivery reports.",questions:["Design an SMS gateway service","How do you send SMS through multiple providers?","How do you handle delivery reports and retries?","How do you route messages to the best provider?","How do you enforce rate limits and compliance?"],text:`title: SMS Gateway
node sender: Sender [round, icon=browser]
node app: Sending App [icon=browser]
node gateway: API Gateway [icon=server]
node sms: SMS Service [icon=compute]
node route: Provider Router [icon=compute]
node queue: Send Queue [icon=queue]
node provider: SMS Providers [icon=cloud]
node status: Delivery Status [icon=message]
node retry: Retry Engine [icon=worker]
node audit: Compliance Audit [icon=file]
node db: Messages DB [cylinder, icon=database]

edge sender -> app: send
edge app -> gateway: submit
edge gateway -> sms: validate
edge sms -> route: choose
edge route -> queue: enqueue
edge queue -> provider: deliver
edge provider -> status: report
edge status -> sms: update
edge sms -> retry: retry
edge sms -> audit: log
edge sms -> db: store`},{id:"webhook-delivery",name:"Webhook Delivery",description:"Event subscription, delivery, retries, signing.",questions:["Design a webhook delivery system","How do you deliver events reliably?","How do you handle retries and backoff?","How do you secure webhook payloads?","How do you handle slow or down endpoints?"],text:`title: Webhook Delivery
node source: Event Source [icon=cloud]
node app: Service [icon=server]
node gateway: API Gateway [icon=server]
node sub: Subscription Service [icon=compute]
node deliver: Delivery Engine [icon=worker]
node queue: Delivery Queue [icon=queue]
node endpoint: Customer Endpoint [icon=server]
node sign: Payload Signer [icon=shield]
node retry: Retry Scheduler [icon=cache]
node dlq: Dead Letter Queue [icon=queue]
node db: Delivery DB [cylinder, icon=database]

edge source -> app: event
edge app -> gateway: forward
edge gateway -> deliver: submit
edge deliver -> sub: endpoints
edge sub -> queue: enqueue
edge deliver -> sign: payload
edge sign -> endpoint: send
edge endpoint -> deliver: ack
edge deliver -> retry: backoff
edge retry -> dlq: fail
edge deliver -> db: log`},{id:"comments-service",name:"Disqus — Comments Service",description:"Threads, comments, moderation, nesting, notifications.",questions:["Design a comments system","How do you model threaded comments?","How do you handle moderation at scale?","How do you serve comment trees fast?","How do you handle spam and abuse?"],text:`title: Comments Service
node user: User [round, icon=browser]
node site: Publisher Site [icon=browser]
node app: Comments Widget [icon=browser]
node gateway: API Gateway [icon=server]
node thread: Thread Service [icon=compute]
node comment: Comment Service [icon=compute]
node nest: Tree Builder [icon=compute]
node moderate: Moderation [icon=shield]
node spam: Spam Filter [icon=compute]
node cache: Comment Cache [cylinder, icon=cache]
node db: Comments DB [cylinder, icon=database]

edge user -> app: comment
edge app -> gateway: submit
edge gateway -> comment: create
edge comment -> thread: attach
edge thread -> nest: tree
edge nest -> cache: build
edge gateway -> moderate: scan
edge moderate -> spam: filter
edge spam -> comment: allow
edge cache -> app: load
edge comment -> db: store`},{id:"reviews-service",name:"Yelp — Reviews Service",description:"Business listings, reviews, ratings, aggregates, moderation.",questions:["Design a reviews platform","How do you aggregate ratings fairly?","How do you verify reviews are authentic?","How do you power review search and ranking?","How do you handle review bias?"],text:`title: Reviews Service
node user: User [round, icon=browser]
node app: Review App [icon=browser]
node gateway: API Gateway [icon=server]
node business: Business Service [icon=compute]
node review: Review Service [icon=compute]
node rating: Rating Aggregator [icon=compute]
node verify: Review Verification [icon=shield]
node rank: Review Ranking [icon=compute]
node search: Search Index [icon=search]
node cache: Listing Cache [cylinder, icon=cache]
node db: Reviews DB [cylinder, icon=database]

edge user -> app: write review
edge app -> gateway: submit
edge gateway -> verify: check
edge verify -> review: accept
edge review -> rating: update
edge rating -> cache: refresh
edge review -> rank: score
edge rank -> search: index
edge app -> gateway: browse
edge gateway -> business: load
edge review -> db: store`},{id:"voting-system",name:"Voting System",description:"Voter auth, ballot casting, tallying, auditability.",questions:["Design a voting system","How do you prevent double voting?","How do you keep ballots anonymous yet verifiable?","How do you tally votes accurately?","How do you handle partial failures?"],text:`title: Voting System
node voter: Voter [round, icon=browser]
node app: Voting Portal [icon=browser]
node gateway: API Gateway [icon=server]
node auth: Voter Auth [icon=shield]
node ballot: Ballot Service [icon=compute]
node vote: Vote Recording [icon=compute]
node ledger: Immutable Ledger [cylinder, icon=database]
node tally: Tally Engine [icon=compute]
node audit: Audit Trail [icon=file]
node result: Results Service [icon=search]
node db: Votes DB [cylinder, icon=database]

edge voter -> app: login
edge app -> gateway: verify
edge gateway -> auth: check
edge voter -> app: cast
edge gateway -> ballot: submit
edge ballot -> vote: record
edge vote -> ledger: append
edge vote -> tally: aggregate
edge tally -> result: publish
edge vote -> audit: log
edge ballot -> db: store`},{id:"oauth-provider",name:"OAuth Provider",description:"Authorization, tokens, consent, client management.",questions:["Design an OAuth 2.0 provider","How do you issue and validate tokens securely?","How do you manage consent screens?","How do you handle refresh tokens and rotation?","How do you revoke access quickly?"],text:`title: OAuth Provider
node user: User [round, icon=browser]
node app: Client App [icon=browser]
node gateway: API Gateway [icon=server]
node auth: Auth Server [icon=shield]
node consent: Consent Service [icon=compute]
node token: Token Service [icon=compute]
node sign: Token Signer [icon=shield]
node client: Client Registry [cylinder, icon=database]
node validate: Token Validation [icon=compute]
node cache: Token Cache [cylinder, icon=cache]
node db: Grants DB [cylinder, icon=database]

edge user -> app: login
edge app -> auth: authorize
edge auth -> consent: prompt
edge consent -> user: approve
edge auth -> token: exchange
edge token -> sign: issue
edge token -> db: store
edge app -> gateway: api
edge gateway -> validate: check
edge validate -> cache: lookup
edge token -> cache: cache`},{id:"otp-service",name:"OTP Service",description:"Code generation, delivery, verification, rate limits.",questions:["Design a one-time password service","How do you generate secure OTP codes?","How do you deliver codes across channels?","How do you prevent brute force?","How do you handle resend and expiry?"],text:`title: OTP Service
node user: User [round, icon=browser]
node app: Mobile App [icon=browser]
node gateway: API Gateway [icon=server]
node otp: OTP Service [icon=compute]
node gen: Code Generator [icon=compute]
node send: Delivery Service [icon=mail]
node verify: Verification Service [icon=shield]
node rate: Rate Limiter [icon=cache]
node provider: SMS / Email [icon=cloud]
node audit: Audit Log [icon=file]
node db: OTP Store [cylinder, icon=database]

edge user -> app: request code
edge app -> gateway: send
edge gateway -> otp: generate
edge otp -> gen: code
edge gen -> rate: check
edge rate -> send: deliver
edge send -> provider: transmit
edge user -> app: enter code
edge gateway -> verify: validate
edge verify -> db: check
edge otp -> audit: log`},{id:"session-service",name:"Session Service",description:"Session creation, validation, revocation, devices.",questions:["Design a session management service","How do you issue and validate session tokens?","How do you support multiple devices?","How do you revoke sessions remotely?","How do you handle session expiry?"],text:`title: Session Service
node user: User [round, icon=browser]
node app: Client App [icon=browser]
node gateway: API Gateway [icon=server]
node login: Login Service [icon=shield]
node session: Session Service [icon=compute]
node issue: Token Issuer [icon=compute]
node store: Session Store [cylinder, icon=cache]
node validate: Session Validator [icon=compute]
node device: Device Registry [icon=compute]
node revoke: Revocation [icon=shield]
node db: Sessions DB [cylinder, icon=database]

edge user -> app: login
edge app -> gateway: authenticate
edge gateway -> login: verify
edge login -> session: create
edge session -> issue: token
edge issue -> store: save
edge app -> gateway: request
edge gateway -> validate: check
edge validate -> store: lookup
edge user -> app: revoke
edge revoke -> db: invalidate`},{id:"iam",name:"IAM Service",description:"Authentication, authorization, roles, policies, audit.",questions:["Design an identity and access management system","How do you model roles and permissions?","How do you evaluate policies efficiently?","How do you support SSO and federation?","How do you keep an audit trail?"],text:`title: IAM Service
node user: User [round, icon=browser]
node app: Application [icon=browser]
node gateway: API Gateway [icon=server]
node authn: Authentication [icon=shield]
node authz: Authorization [icon=compute]
node policy: Policy Engine [icon=compute]
node role: Role Service [icon=users]
node idp: Identity Provider [icon=cloud]
node audit: Audit Service [icon=file]
node cache: Decision Cache [cylinder, icon=cache]
node db: Policies DB [cylinder, icon=database]

edge user -> app: access
edge app -> gateway: request
edge gateway -> authn: verify
edge authn -> idp: federate
edge gateway -> authz: authorize
edge authz -> policy: evaluate
edge policy -> role: resolve
edge role -> db: fetch
edge authz -> cache: cache
edge gateway -> audit: record
edge authz -> app: allow`},{id:"incident-management",name:"PagerDuty — Incident Management",description:"Alerts, paging, escalation, runbooks, timelines.",questions:["Design an incident management system","How do you dedupe and group alerts?","How do you route pages to the right on-call?","How do you run escalation policies?","How do you track incident timelines?"],text:`title: Incident Management
node monitor: Monitoring [icon=cloud]
node app: Alert App [icon=browser]
node gateway: API Gateway [icon=server]
node alert: Alert Service [icon=compute]
node dedupe: Deduplication [icon=cache]
node incident: Incident Service [icon=compute]
node oncall: On-Call Scheduler [icon=users]
node page: Paging Engine [icon=message]
node escalate: Escalation Policy [icon=compute]
node runbook: Runbooks [icon=file]
node db: Incidents DB [cylinder, icon=database]

edge monitor -> app: alert
edge app -> gateway: ingest
edge gateway -> dedupe: group
edge dedupe -> alert: create
edge alert -> incident: open
edge incident -> oncall: assign
edge oncall -> page: notify
edge page -> escalate: retry
edge escalate -> incident: severity
edge incident -> runbook: suggest
edge incident -> db: log`},{id:"code-search",name:"GitHub — Code Search",description:"Repository indexing, code search, ranking, filters.",questions:["Design a code search engine","How do you index large codebases?","How do you search code with high precision?","How do you keep the index up to date?","How do you rank search results?"],text:`title: Code Search
node dev: Developer [round, icon=browser]
node app: Search UI [icon=browser]
node gateway: API Gateway [icon=server]
node indexer: Indexer [icon=worker]
node repo: Repository Store [cylinder, icon=database]
node index: Code Index [cylinder, icon=search]
node query: Query Engine [icon=compute]
node filter: Filter Service [icon=compute]
node rank: Ranking Service [icon=compute]
node queue: Index Queue [icon=queue]
node cache: Result Cache [cylinder, icon=cache]

edge dev -> app: search
edge app -> gateway: query
edge gateway -> query: parse
edge query -> index: lookup
edge index -> query: matches
edge query -> filter: refine
edge filter -> rank: order
edge rank -> app: results
edge repo -> queue: push
edge queue -> indexer: process
edge indexer -> index: update`},{id:"package-registry",name:"npm — Package Registry",description:"Package publish, dependency resolution, downloads.",questions:["Design a package registry","How do you store and serve package versions?","How do you resolve dependency trees?","How do you protect against supply chain attacks?","How do you handle hot downloads?"],text:`title: Package Registry
node dev: Developer [round, icon=browser]
node app: Package App [icon=browser]
node gateway: API Gateway [icon=server]
node publish: Publish Service [icon=compute]
node package: Package Store [cylinder, icon=database]
node resolve: Resolver [icon=compute]
node search: Search Index [icon=search]
node security: Security Scan [icon=shield]
node cache: Download Cache [icon=cache]
node queue: Audit Queue [icon=queue]
node db: Registry DB [cylinder, icon=database]

edge dev -> app: publish
edge app -> gateway: submit
edge gateway -> security: scan
edge security -> publish: allow
edge publish -> package: store
edge dev -> app: install
edge app -> gateway: resolve
edge gateway -> resolve: tree
edge resolve -> package: fetch
edge package -> cache: serve
edge publish -> search: index`},{id:"container-registry",name:"Docker — Container Registry",description:"Image push, manifest storage, layer dedup, pulls.",questions:["Design a container image registry","How do you store layers with deduplication?","How do you stream image pulls efficiently?","How do you enforce policies and scanning?","How do you handle concurrent pushes?"],text:`title: Container Registry
node dev: Developer [round, icon=browser]
node app: Docker CLI [icon=browser]
node gateway: API Gateway [icon=server]
node push: Push Service [icon=compute]
node manifest: Manifest Store [cylinder, icon=database]
node layer: Layer Store [cylinder, icon=file]
node dedupe: Layer Dedup [icon=cache]
node pull: Pull Service [icon=compute]
node cache: Blob Cache [icon=cache]
node scan: Vulnerability Scan [icon=shield]
node db: Registry DB [cylinder, icon=database]

edge dev -> app: push
edge app -> gateway: upload
edge gateway -> push: layers
edge push -> dedupe: check
edge dedupe -> layer: store
edge push -> manifest: record
edge dev -> app: pull
edge app -> gateway: fetch
edge gateway -> pull: layers
edge pull -> layer: read
edge push -> scan: inspect
edge scan -> db: report`},{id:"online-ide",name:"Online IDE",description:"Workspaces, editors, execution sandboxes, builds.",questions:["Design an online IDE","How do you manage isolated execution environments?","How do you stream edits and terminal output?","How do you scale cloud builds?","How do you persist user workspaces?"],text:`title: Online IDE
node dev: Developer [round, icon=browser]
node app: IDE Web App [icon=browser]
node gateway: API Gateway [icon=server]
node ws: Workspace Service [icon=compute]
node sandbox: Sandbox Pool [icon=cloud]
node editor: Editor Backend [icon=compute]
node exec: Execution Proxy [icon=worker]
node build: Build Service [icon=compute]
node fs: Workspace Files [cylinder, icon=file]
node session: Session Store [icon=cache]
node db: Workspaces DB [cylinder, icon=database]

edge dev -> app: open project
edge app -> gateway: connect
edge gateway -> ws: allocate
edge ws -> sandbox: create
edge app -> editor: edit
edge editor -> exec: run
edge exec -> sandbox: execute
edge editor -> app: output
edge dev -> app: build
edge app -> build: compile
edge ws -> fs: persist
edge ws -> db: metadata`},{id:"config-service",name:"Config Service",description:"Config storage, environments, push updates, rollback.",questions:["Design a distributed configuration service","How do you version and rollback configs?","How do you push config changes to clients?","How do you validate config before rollout?","How do you handle secrets in config?"],text:`title: Config Service
node admin: Operator [round, icon=browser]
node app: Config Portal [icon=browser]
node gateway: API Gateway [icon=server]
node config: Config Service [icon=compute]
node env: Environment Service [icon=compute]
node version: Version Store [cylinder, icon=database]
node publish: Publisher [icon=queue]
node client: Client SDK [icon=server]
node validate: Validation [icon=shield]
node audit: Audit Log [icon=file]
node db: Config DB [cylinder, icon=database]

edge admin -> app: edit config
edge app -> gateway: save
edge gateway -> validate: check
edge validate -> version: commit
edge version -> env: scope
edge env -> publish: push
edge publish -> client: update
edge client -> app: apply
edge config -> audit: log
edge app -> gateway: rollback
edge gateway -> version: revert`},{id:"anomaly-detection",name:"Anomaly Detection",description:"Metric ingestion, model scoring, alerting, dashboards.",questions:["Design an anomaly detection service","How do you detect anomalies in time series?","How do you reduce false positives?","How do you score streams in real-time?","How do you explain detected anomalies?"],text:`title: Anomaly Detection
node source: Metric Sources [icon=cloud]
node app: Dashboard [icon=browser]
node gateway: API Gateway [icon=server]
node ingest: Ingestion Service [icon=worker]
node queue: Event Queue [icon=queue]
node model: Detection Model [icon=cloud]
node baseline: Baseline Store [cylinder, icon=database]
node score: Scoring Engine [icon=compute]
node alert: Alerting [icon=message]
node explain: Explanation Service [icon=compute]
node db: Metrics DB [cylinder, icon=database]

edge source -> app: stream
edge app -> gateway: forward
edge gateway -> ingest: buffer
edge ingest -> queue: enqueue
edge queue -> model: score
edge model -> baseline: compare
edge baseline -> score: threshold
edge score -> alert: trigger
edge alert -> app: notify
edge score -> explain: reason
edge score -> db: store`},{id:"data-warehouse",name:"Data Warehouse",description:"Ingestion, ETL, columnar storage, SQL analytics.",questions:["Design a cloud data warehouse","How do you store data for fast analytics?","How do you run massive parallel queries?","How do you ingest data from many sources?","How do you optimize query performance?"],text:`title: Data Warehouse
node user: Analyst [round, icon=browser]
node source: Data Sources [icon=cloud]
node app: Analytics UI [icon=browser]
node gateway: API Gateway [icon=server]
node ingest: Ingestion Pipeline [icon=worker]
node stage: Staging Area [cylinder, icon=file]
node etl: ETL Engine [icon=compute]
node store: Columnar Store [cylinder, icon=database]
node query: Query Engine [icon=compute]
node mpp: MPP Compute [icon=cloud]
node cache: Result Cache [icon=cache]
node db: Metadata DB [cylinder, icon=database]

edge source -> app: send
edge app -> gateway: ingest
edge gateway -> ingest: load
edge ingest -> stage: raw
edge stage -> etl: transform
edge etl -> store: load
edge user -> app: query
edge app -> gateway: sql
edge gateway -> query: plan
edge query -> mpp: execute
edge query -> cache: reuse
edge query -> store: scan`},{id:"vector-database",name:"Vector Database",description:"Embedding storage, indexing, similarity search.",questions:["Design a vector database","How do you index millions of vectors?","How do you run approximate nearest neighbor search?","How do you handle hybrid search with filters?","How do you keep embeddings fresh?"],text:`title: Vector Database
node app: Client App [icon=browser]
node gateway: API Gateway [icon=server]
node embed: Embedding Service [icon=compute]
node model: Embedding Model [icon=cloud]
node index: Vector Index [icon=search]
node ann: ANN Search [icon=compute]
node filter: Metadata Filter [icon=compute]
node rerank: Re-ranking [icon=compute]
node queue: Ingestion Queue [icon=queue]
node cache: Result Cache [cylinder, icon=cache]
node db: Metadata Store [cylinder, icon=database]

edge app -> gateway: query
edge gateway -> embed: vector
edge embed -> model: encode
edge gateway -> ann: search
edge ann -> index: probe
edge index -> filter: prune
edge filter -> rerank: score
edge rerank -> app: top k
edge app -> gateway: upsert
edge gateway -> queue: index
edge queue -> index: update`},{id:"graph-database",name:"Graph Database",description:"Nodes, edges, traversals, index-free adjacency.",questions:["Design a graph database","How do you store graph data efficiently?","How do you run deep traversals fast?","How do you handle hot nodes?","How do you partition a graph at scale?"],text:`title: Graph Database
node app: Client App [icon=browser]
node gateway: API Gateway [icon=server]
node query: Query Service [icon=compute]
node graph: Graph Store [icon=compute]
node node: Node Storage [cylinder, icon=database]
node edge: Edge Storage [cylinder, icon=database]
node index: Property Index [icon=search]
node traverse: Traversal Engine [icon=compute]
node cache: Hot Path Cache [icon=cache]
node partition: Partitioner [icon=worker]
node db: Metadata DB [cylinder, icon=database]

edge app -> gateway: query
edge gateway -> query: parse
edge query -> traverse: plan
edge traverse -> graph: walk
edge graph -> node: load
edge graph -> edge: follow
edge traverse -> index: lookup
edge traverse -> cache: check
edge cache -> traverse: hit
edge partition -> graph: shard
edge query -> db: meta`},{id:"distributed-database",name:"Distributed Database",description:"Sharding, replication, consensus, transactions.",questions:["Design a distributed database","How do you shard data across nodes?","How do you replicate for durability?","How do you keep replicas consistent?","How do you support distributed transactions?"],text:`title: Distributed Database
node app: Application [icon=browser]
node gateway: API Gateway [icon=server]
node proxy: Query Router [icon=compute]
node leader: Leader Node [icon=server]
node replica: Replica Nodes [icon=server]
node shard: Shards [icon=compute]
node consensus: Consensus [icon=shield]
node log: Write-ahead Log [cylinder, icon=file]
node cache: Query Cache [icon=cache]
node balance: Rebalancer [icon=worker]
node db: Metadata DB [cylinder, icon=database]

edge app -> gateway: request
edge gateway -> proxy: route
edge proxy -> leader: write
edge leader -> consensus: agree
edge consensus -> log: append
edge log -> replica: replicate
edge proxy -> shard: read
edge shard -> cache: hit
edge leader -> balance: rebalance
edge balance -> shard: move
edge proxy -> db: meta`},{id:"distributed-file-system",name:"Distributed File System",description:"Namespaces, chunk storage, replication, recovery.",questions:["Design a distributed file system","How do you split files into chunks?","How do you replicate chunks for durability?","How do you locate chunks quickly?","How do you recover from node failures?"],text:`title: Distributed File System
node client: Client [round, icon=browser]
node app: File App [icon=browser]
node gateway: API Gateway [icon=server]
node name: NameNode [icon=compute]
node meta: Metadata Store [cylinder, icon=database]
node chunk: Chunk Servers [icon=server]
node split: Chunk Splitter [icon=compute]
node replicate: Replication [icon=sync]
node locate: Location Service [icon=search]
node heal: Rebalancer [icon=worker]
node db: File Metadata DB [cylinder, icon=database]

edge client -> app: write file
edge app -> gateway: upload
edge gateway -> split: chunks
edge split -> chunk: store
edge chunk -> replicate: copy
edge client -> app: read
edge app -> gateway: request
edge gateway -> locate: chunk list
edge locate -> meta: lookup
edge locate -> chunk: fetch
edge heal -> chunk: repair`},{id:"stream-processing",name:"Stream Processing",description:"Event streams, windows, aggregation, sinks.",questions:["Design a stream processing system","How do you guarantee exactly-once semantics?","How do you handle windowing and out-of-order events?","How do you scale stream operators?","How do you handle stream reprocessing?"],text:`title: Stream Processing
node source: Event Sources [icon=cloud]
node app: Producer App [icon=browser]
node gateway: API Gateway [icon=server]
node topic: Topic Cluster [icon=queue]
node consume: Consumers [icon=worker]
node window: Windowing [icon=compute]
node agg: Aggregations [icon=compute]
node join: Stream Joins [icon=compute]
node state: State Store [cylinder, icon=database]
node sink: Output Sinks [icon=cloud]
node db: Checkpoints DB [cylinder, icon=database]

edge source -> app: events
edge app -> gateway: produce
edge gateway -> topic: publish
edge topic -> consume: subscribe
edge consume -> window: bucket
edge window -> agg: aggregate
edge agg -> join: combine
edge join -> sink: emit
edge consume -> state: checkpoint
edge state -> db: persist
edge topic -> app: replay`},{id:"api-gateway",name:"API Gateway",description:"Routing, auth, rate limiting, aggregation, observability.",questions:["Design an API gateway","How do you route requests to services?","How do you enforce auth and rate limits?","How do you aggregate multiple services?","How do you handle partial failures?"],text:`title: API Gateway
node client: Client [round, icon=browser]
node app: Client App [icon=browser]
node gateway: API Gateway [icon=server]
node router: Router [icon=compute]
node auth: Auth Filter [icon=shield]
node rate: Rate Limiter [icon=cache]
node agg: Aggregator [icon=compute]
node svc: Microservices [icon=server]
node cache: Response Cache [cylinder, icon=cache]
node metric: Observability [icon=compute]
node db: Routes DB [cylinder, icon=database]

edge client -> app: request
edge app -> gateway: call
edge gateway -> auth: verify
edge auth -> rate: throttle
edge rate -> router: route
edge router -> svc: forward
edge svc -> agg: responses
edge agg -> gateway: return
edge gateway -> cache: cache
edge gateway -> metric: log
edge router -> db: lookup`},{id:"service-discovery",name:"Service Discovery",description:"Registration, health checks, DNS, load-aware lookup.",questions:["Design a service discovery system","How do services register themselves?","How do you keep the registry fresh?","How do clients resolve healthy instances?","How do you handle network partitions?"],text:`title: Service Discovery
node svc: Service Instances [icon=server]
node agent: Sidecar Agent [icon=worker]
node app: Client App [icon=browser]
node gateway: API Gateway [icon=server]
node registry: Registry [icon=compute]
node health: Health Checker [icon=compute]
node heartbeat: Heartbeat Channel [icon=queue]
node resolve: Resolution Service [icon=search]
node cache: Resolver Cache [cylinder, icon=cache]
node watch: Watch Service [icon=sync]
node db: Registry DB [cylinder, icon=database]

edge svc -> agent: register
edge agent -> registry: heartbeat
edge heartbeat -> health: monitor
edge health -> registry: status
edge app -> gateway: resolve
edge gateway -> resolve: lookup
edge resolve -> registry: query
edge resolve -> cache: cache
edge cache -> gateway: instances
edge registry -> watch: notify
edge registry -> db: store`},{id:"load-balancer",name:"Load Balancer",description:"Traffic distribution, health checks, algorithms.",questions:["Design a load balancer","How do you distribute traffic across backends?","How do you detect and drain unhealthy servers?","How do you maintain sticky sessions?","How do you scale the load balancer itself?"],text:`title: Load Balancer
node client: Client [round, icon=browser]
node app: Client App [icon=browser]
node dns: DNS [icon=server]
node lb: Load Balancer [icon=compute]
node pool: Backend Pool [icon=server]
node health: Health Checks [icon=compute]
node algo: Scheduling Algorithm [icon=compute]
node session: Session Affinity [icon=cache]
node tls: TLS Termination [icon=shield]
node metric: Metrics [icon=compute]
node db: Config DB [cylinder, icon=database]

edge client -> app: request
edge app -> dns: resolve
edge dns -> lb: endpoint
edge lb -> algo: choose
edge algo -> pool: backend
edge lb -> health: probe
edge health -> pool: mark
edge lb -> session: bind
edge session -> algo: pin
edge lb -> tls: terminate
edge lb -> metric: log`},{id:"change-data-capture",name:"Change Data Capture",description:"Log-based capture, transformation, publishing.",questions:["Design a change data capture pipeline","How do you capture changes from a database?","How do you keep downstream systems consistent?","How do you handle schema changes?","How do you replay from a point in time?"],text:`title: Change Data Capture
node source: Source DB [cylinder, icon=database]
node agent: CDC Agent [icon=worker]
node gateway: API Gateway [icon=server]
node log: WAL Reader [icon=compute]
node parse: Change Parser [icon=compute]
node topic: Change Topic [icon=queue]
node sink: Downstream Sinks [icon=cloud]
node transform: Transformer [icon=compute]
node schema: Schema Registry [cylinder, icon=database]
node checkpoint: Checkpoint Store [icon=cache]
node db: CDC State DB [cylinder, icon=database]

edge source -> log: changes
edge agent -> gateway: tail
edge gateway -> parse: decode
edge parse -> topic: publish
edge topic -> transform: enrich
edge transform -> sink: apply
edge topic -> schema: register
edge agent -> checkpoint: offset
edge checkpoint -> db: save
edge agent -> log: resume
edge parse -> db: state`},{id:"backup-service",name:"Backup Service",description:"Scheduling, snapshots, restore, verification.",questions:["Design a backup service","How do you take consistent snapshots?","How do you store backups efficiently?","How do you restore data quickly?","How do you verify backup integrity?"],text:`title: Backup Service
node admin: Operator [round, icon=browser]
node app: Backup Console [icon=browser]
node gateway: API Gateway [icon=server]
node schedule: Scheduler [icon=compute]
node backup: Backup Engine [icon=worker]
node snapshot: Snapshot Service [icon=compute]
node store: Backup Store [cylinder, icon=file]
node dedupe: Deduplication [icon=cache]
node verify: Verification [icon=shield]
node restore: Restore Service [icon=compute]
node db: Backup DB [cylinder, icon=database]

edge admin -> app: configure
edge app -> gateway: schedule
edge gateway -> schedule: policy
edge schedule -> backup: trigger
edge backup -> snapshot: capture
edge snapshot -> dedupe: chunks
edge dedupe -> store: save
edge backup -> verify: check
edge verify -> db: status
edge admin -> app: restore
edge app -> restore: recover`},{id:"realtime-analytics",name:"Realtime Analytics",description:"Event ingestion, streaming, dashboards, alerts.",questions:["Design a realtime analytics platform","How do you ingest millions of events per second?","How do you query streaming data?","How do you render live dashboards?","How do you keep query results accurate?"],text:`title: Realtime Analytics
node source: Event Sources [icon=cloud]
node app: Dashboard App [icon=browser]
node gateway: API Gateway [icon=server]
node ingest: Ingest Cluster [icon=worker]
node topic: Event Topic [icon=queue]
node compute: Streaming Compute [icon=compute]
node store: Analytics Store [cylinder, icon=database]
node dash: Dashboard Service [icon=search]
node push: Realtime Push [icon=sync]
node alert: Alert Engine [icon=message]
node db: Metadata DB [cylinder, icon=database]

edge source -> app: events
edge app -> gateway: forward
edge gateway -> ingest: buffer
edge ingest -> topic: publish
edge topic -> compute: process
edge compute -> store: aggregate
edge store -> dash: query
edge dash -> push: stream
edge push -> app: render
edge compute -> alert: detect
edge alert -> app: notify`},{id:"batch-processing",name:"Batch Processing",description:"Job scheduling, data partitions, workers, outputs.",questions:["Design a batch processing framework","How do you split work into parallel tasks?","How do you handle retries and failures?","How do you schedule and monitor jobs?","How do you make jobs idempotent?"],text:`title: Batch Processing
node source: Data Sources [icon=cloud]
node app: Job Console [icon=browser]
node gateway: API Gateway [icon=server]
node scheduler: Job Scheduler [icon=compute]
node plan: Job Planner [icon=compute]
node worker: Worker Pool [icon=worker]
node queue: Task Queue [icon=queue]
node output: Output Store [cylinder, icon=file]
node retry: Retry Handler [icon=cache]
node monitor: Monitoring [icon=compute]
node db: Jobs DB [cylinder, icon=database]

edge source -> app: input
edge app -> gateway: submit
edge gateway -> scheduler: queue
edge scheduler -> plan: split
edge plan -> queue: tasks
edge queue -> worker: execute
edge worker -> output: write
edge worker -> retry: fail
edge retry -> queue: retry
edge worker -> monitor: progress
edge scheduler -> db: state`},{id:"order-state-machine",name:"Order State Machine",description:"Order lifecycle as a state machine: states, transitions, and guards.",questions:["Design an order lifecycle as a state machine","Which transitions are allowed from each state?","How do you persist state and recover from crashes?","How do you handle concurrent transitions on the same order?"],text:`title: Order State Machine
node created: Created [ellipse, icon=clock]
node pending: Payment Pending [round, icon=credit-card]
node paid: Paid [round, icon=check]
node shipped: Shipped [round, icon=box]
node delivered: Delivered [round, icon=check]
node cancelled: Cancelled [ellipse, icon=alert]
node refunded: Refunded [ellipse, icon=archive]

edge created -> pending: place
edge pending -> paid: pay
edge pending -> cancelled: cancel
edge paid -> shipped: fulfill
edge shipped -> delivered: deliver
edge shipped -> cancelled: return
edge cancelled -> refunded: refund
edge paid -> refunded: refund`},{id:"checkout-flowchart",name:"Checkout Flowchart",description:"Checkout logic as a flowchart: decisions, retries, and side effects.",questions:["Draw the checkout flow as a flowchart","Where do you add decision points and retry loops?","How do you keep the audit trail consistent?","What happens when the payment is declined?"],text:`title: Checkout Flowchart
node start: Start [round, icon=clock]
node cart: Cart Valid? [diamond, icon=check]
node stock: In Stock? [diamond, icon=box]
node pay: Charge Payment [icon=credit-card]
node fail: Payment Failed [ellipse, icon=alert]
node ship: Fulfill Order [icon=box]
node email: Send Receipt [icon=mail]
node orders: Orders Table [cylinder, icon=database]
node audit: Audit Log [cylinder, icon=file]

edge start -> cart: begin
edge cart -> cart: fix
edge cart -> stock: valid
edge stock -> cart: out of stock
edge stock -> pay: in stock
edge pay -> ship: success
edge pay -> fail: declined
edge ship -> email: shipped
edge ship -> orders: insert
edge ship -> audit: append`},{id:"user-data-model",name:"User Data Model — ER",description:"Relational schema with tables and relationships using undirected edges.",questions:["Model a users / accounts / orders relational schema","Which relationships are one-to-many and many-to-many?","How do you index foreign keys for join-heavy queries?","How do you migrate the schema without downtime?"],text:`title: User Data Model
node users: Users [cylinder, icon=users]
node accounts: Accounts [cylinder, icon=key]
node orders: Orders [cylinder, icon=box]
node products: Products [cylinder, icon=database]
node line_items: Line Items [cylinder, icon=file]
node addresses: Addresses [cylinder, icon=map]

edge users -- accounts: has
edge users -- orders: places
edge users -- addresses: lives at
edge orders -- line_items: contains
edge products -- line_items: listed in`},{id:"app-store",name:"Apple — App Store",description:"App upload, review, catalog, download, updates.",questions:["Design an app store","How do you process developer uploads and reviews?","How do you serve downloads at global scale?","How do you push app updates?","How do you handle app discovery and search?"],text:`title: App Store
node user: User [round, icon=browser]
node dev: Developer [round, icon=browser]
node app: Developer Portal [icon=browser]
node gateway: API Gateway [icon=server]
node upload: Upload Service [icon=worker]
node review: Review Pipeline [icon=shield]
node catalog: App Catalog [cylinder, icon=database]
node binary: Binary Store [cylinder, icon=file]
node search: Search Index [icon=search]
node update: Update Service [icon=compute]
node cdn: Content Delivery [icon=cloud]
node db: Metadata DB [cylinder, icon=database]

edge dev -> app: upload
edge app -> gateway: submit
edge gateway -> review: screen
edge review -> catalog: approve
edge catalog -> binary: store
edge user -> app: browse
edge app -> gateway: search
edge gateway -> search: index
edge user -> app: install
edge app -> update: check
edge update -> cdn: fetch`}];var I=e.i(23873);let N=e=>Math.min(4,Math.max(.25,e)),R={rect:"Rectangle",round:"Rounded",ellipse:"Ellipse",diamond:"Diamond",cylinder:"Cylinder",hexagon:"Hexagon",parallelogram:"Parallelogram",cloud:"Cloud",note:"Note",actor:"Actor"};function j(e){return N(e+.25)}function G(e){return N(e-.25)}e.s(["default",0,()=>{let e,t,d,c,l,u,p,m,w,b,v,f,k,N,B,T,E,M,L,_,F,z,W,U,O,Q,V,J,K,$,Z,Y,X,ee,eo=(0,n.c)(103),{text:en,setText:ea,parsed:ei,reset:et,importText:er,undo:ed,redo:es,canUndo:ec,canRedo:el}=(()=>{let e,o,i,t,r,d,s,c,l,g,u,p,m=(0,n.c)(18),[y,h]=(0,a.useState)(D),w=(0,a.useRef)(y);m[0]===Symbol.for("react.memo_cache_sentinel")?(e=[],m[0]=e):e=m[0];let b=(0,a.useRef)(e);m[1]===Symbol.for("react.memo_cache_sentinel")?(o=[],m[1]=o):o=m[1];let v=(0,a.useRef)(o),[f,k]=(0,a.useState)(!1),[S,A]=(0,a.useState)(!1);m[2]!==y?(i=()=>{try{window.localStorage.setItem(q,y)}catch{}},t=[y],m[2]=y,m[3]=i,m[4]=t):(i=m[3],t=m[4]),(0,a.useEffect)(i,t),m[5]!==y?(r=(0,H.parseDiagram)(y),m[5]=y,m[6]=r):r=m[6];let C=r;m[7]===Symbol.for("react.memo_cache_sentinel")?(d=()=>{k(b.current.length>0),A(v.current.length>0)},m[7]=d):d=m[7];let P=d;m[8]===Symbol.for("react.memo_cache_sentinel")?(s=e=>{let o=w.current;e===o||(!(b.current.length>0&&e.startsWith(o))&&(b.current.push(o),b.current.length>100&&b.current.shift()),v.current=[],w.current=e,h(e),P())},m[8]=s):s=m[8];let I=s;m[9]===Symbol.for("react.memo_cache_sentinel")?(c=()=>{let e=b.current.pop();void 0!==e&&(v.current.push(w.current),w.current=e,h(e),P())},m[9]=c):c=m[9];let N=c;m[10]===Symbol.for("react.memo_cache_sentinel")?(l=()=>{let e=v.current.pop();void 0!==e&&(b.current.push(w.current),b.current.length>100&&b.current.shift(),w.current=e,h(e),P())},m[10]=l):l=m[10];let R=l;m[11]===Symbol.for("react.memo_cache_sentinel")?(g=()=>{w.current!==x&&(b.current.push(w.current),b.current.length>100&&b.current.shift()),v.current=[],w.current=x,h(x),P()},m[11]=g):g=m[11];let j=g;m[12]===Symbol.for("react.memo_cache_sentinel")?(u=e=>{I(e)},m[12]=u):u=m[12];let G=u;return m[13]!==S||m[14]!==f||m[15]!==C||m[16]!==y?(p={text:y,setText:I,parsed:C,reset:j,importText:G,undo:N,redo:R,canUndo:f,canRedo:S},m[13]=S,m[14]=f,m[15]=C,m[16]=y,m[17]=p):p=m[17],p})(),{theme:eg,toggleTheme:eu}=(()=>{let[e,o]=(0,a.useState)("dark");return(0,a.useEffect)(()=>{let e=null;try{let o=window.localStorage.getItem(A);("dark"===o||"light"===o)&&(e=o)}catch{}o(e??"dark")},[]),(0,a.useEffect)(()=>{document.documentElement.dataset.theme="dark"===e?"diagram":"light";try{window.localStorage.setItem(A,e)}catch{}},[e]),{theme:e,toggleTheme:()=>o(e=>"dark"===e?"light":"dark")}})(),ep=(0,a.useRef)(null),[em,ey]=(0,a.useState)(1),[eh,ew]=(0,a.useState)(!1),[eb,ev]=(0,a.useState)(!1),[ef,ek]=(0,a.useState)("horizontal"),[eS,ex]=(0,a.useState)(null);eo[0]===Symbol.for("react.memo_cache_sentinel")?(e={},eo[0]=e):e=eo[0];let[eH,eq]=(0,a.useState)(e);eo[1]!==ef||eo[2]!==ei.diagram?(t=(0,I.computeLayout)(ei.diagram,ef),eo[1]=ef,eo[2]=ei.diagram,eo[3]=t):t=eo[3];let eD=t;eo[4]!==eD||eo[5]!==eH?(d=(0,I.applyManualPositions)(eD,eH),eo[4]=eD,eo[5]=eH,eo[6]=d):d=eo[6];let eA=d,eC=ei.diagram.title||"diagram";eo[7]===Symbol.for("react.memo_cache_sentinel")?(c=()=>{eq({}),ex(null)},eo[7]=c):c=eo[7],eo[8]!==en?(l=[en],eo[8]=en,eo[9]=l):l=eo[9],(0,a.useEffect)(c,l),eo[10]===Symbol.for("react.memo_cache_sentinel")?(u=()=>{ep.current?.click()},eo[10]=u):u=eo[10];let eP=u;eo[11]!==er?(p=async e=>{e&&er(await e.text())},eo[11]=er,eo[12]=p):p=eo[12];let eI=p;eo[13]!==eC||eo[14]!==en?(m=()=>{(0,C.downloadDiagram)(en,eC)},eo[13]=eC,eo[14]=en,eo[15]=m):m=eo[15];let eN=m;eo[16]!==eA||eo[17]!==eC||eo[18]!==ei.diagram.title?(w=()=>{(0,C.downloadSvg)(eA,ei.diagram.title,eC)},eo[16]=eA,eo[17]=eC,eo[18]=ei.diagram.title,eo[19]=w):w=eo[19];let eR=w;eo[20]!==eA||eo[21]!==eC||eo[22]!==ei.diagram.title?(b=()=>{(0,C.downloadSvg)(eA,ei.diagram.title,eC,{print:!0,page:"a4-landscape"})},eo[20]=eA,eo[21]=eC,eo[22]=ei.diagram.title,eo[23]=b):b=eo[23];let ej=b;eo[24]!==eA||eo[25]!==eC||eo[26]!==ei.diagram.title?(v=()=>{(0,C.downloadPng)(eA,ei.diagram.title,eC,{page:"a4-landscape"})},eo[24]=eA,eo[25]=eC,eo[26]=ei.diagram.title,eo[27]=v):v=eo[27];let eG=v;eo[28]!==ei.diagram?(f=async e=>{let o=(0,C.buildSnippet)(ei.diagram,e);try{await navigator.clipboard.writeText(o)}catch{}},eo[28]=ei.diagram,eo[29]=f):f=eo[29];let eB=f;eo[30]!==ea?(k=e=>{ea(e.text),ev(!1)},eo[30]=ea,eo[31]=k):k=eo[31];let eT=k;eo[32]===Symbol.for("react.memo_cache_sentinel")?(N=e=>{ek(e),eq({})},eo[32]=N):N=eo[32];let eE=N;eo[33]!==eA.nodes.length||eo[34]!==ea||eo[35]!==en?(B=e=>{let o=`shape${eA.nodes.length+1}`,n=`node ${o}: ${R[e]} [${e}]`;ea(en?`${en.replace(/\s+$/,"")}
${n}`:n)},eo[33]=eA.nodes.length,eo[34]=ea,eo[35]=en,eo[36]=B):B=eo[36];let eM=B;eo[37]!==eA.nodes?(T=(e,o,n)=>{eq(a=>{let i=eA.nodes.find(o=>o.id===e);if(!i)return a;let t=a[e]??{x:i.x,y:i.y};return{...a,[e]:{x:t.x+o,y:t.y+n}}})},eo[37]=eA.nodes,eo[38]=T):T=eo[38];let eL=T,e_=ei.diagram.nodes.length>0;return eo[39]!==eB?(E=e=>void eB(e),eo[39]=eB,eo[40]=E):E=eo[40],eo[41]===Symbol.for("react.memo_cache_sentinel")?(M=()=>ev(!0),eo[41]=M):M=eo[41],eo[42]===Symbol.for("react.memo_cache_sentinel")?(L=()=>ew(!0),eo[42]=L):L=eo[42],eo[43]===Symbol.for("react.memo_cache_sentinel")?(_=()=>ey(j),F=()=>ey(G),z=()=>ey(1),eo[43]=_,eo[44]=F,eo[45]=z):(_=eo[43],F=eo[44],z=eo[45]),eo[46]!==e_||eo[47]!==el||eo[48]!==ec||eo[49]!==ef||eo[50]!==eG||eo[51]!==eR||eo[52]!==ej||eo[53]!==eM||eo[54]!==eN||eo[55]!==es||eo[56]!==et||eo[57]!==E||eo[58]!==eg||eo[59]!==eu||eo[60]!==ed||eo[61]!==em?(W=(0,o.jsx)(S,{canExport:e_,canRedo:el,canUndo:ec,direction:ef,onCopySnippet:E,onDirectionChange:eE,onExamples:M,onExportPng:eG,onExportSvg:eR,onExportSvgPrint:ej,onHelp:L,onNew:et,onNewShape:eM,onOpen:eP,onRedo:es,onSave:eN,onToggleTheme:eu,onUndo:ed,onZoomIn:_,onZoomOut:F,onZoomReset:z,theme:eg,zoom:em}),eo[46]=e_,eo[47]=el,eo[48]=ec,eo[49]=ef,eo[50]=eG,eo[51]=eR,eo[52]=ej,eo[53]=eM,eo[54]=eN,eo[55]=es,eo[56]=et,eo[57]=E,eo[58]=eg,eo[59]=eu,eo[60]=ed,eo[61]=em,eo[62]=W):W=eo[62],eo[63]!==eI?(U=(0,o.jsx)("input",{ref:ep,accept:".diagram,.txt,text/plain","aria-label":"Open diagram file",className:"hidden",type:"file",onChange:e=>{eI(e.target.files?.[0]),e.target.value=""}}),eo[63]=eI,eo[64]=U):U=eo[64],eo[65]!==ei.errors?(O=ei.errors.length>0&&(0,o.jsx)(r,{errors:ei.errors}),eo[65]=ei.errors,eo[66]=O):O=eo[66],eo[67]!==ei.errors||eo[68]!==es||eo[69]!==ea||eo[70]!==en||eo[71]!==ed?(Q=(0,o.jsx)("div",{className:"flex w-[44%] max-w-[52%] min-w-64",children:(0,o.jsx)(h,{errors:ei.errors,onChange:ea,onRedo:es,onUndo:ed,text:en})}),eo[67]=ei.errors,eo[68]=es,eo[69]=ea,eo[70]=en,eo[71]=ed,eo[72]=Q):Q=eo[72],eo[73]!==eL||eo[74]!==eA||eo[75]!==ei.diagram.title||eo[76]!==eS||eo[77]!==em?(V=(0,o.jsx)(i.default,{layout:eA,onDragNode:eL,onSelectNode:ex,selectedId:eS,title:ei.diagram.title,zoom:em}),eo[73]=eL,eo[74]=eA,eo[75]=ei.diagram.title,eo[76]=eS,eo[77]=em,eo[78]=V):V=eo[78],eo[79]!==Q||eo[80]!==V?(J=(0,o.jsxs)("div",{className:"flex min-h-0 flex-1",children:[Q,V]}),eo[79]=Q,eo[80]=V,eo[81]=J):J=eo[81],eo[82]!==ei.diagram.edges.length||eo[83]!==ei.diagram.kind||eo[84]!==ei.diagram.nodes.length||eo[85]!==ei.diagram.title||eo[86]!==ei.errors.length?(K=(0,o.jsx)(y,{edges:ei.diagram.edges.length,errors:ei.errors.length,kind:ei.diagram.kind,nodes:ei.diagram.nodes.length,title:ei.diagram.title}),eo[82]=ei.diagram.edges.length,eo[83]=ei.diagram.kind,eo[84]=ei.diagram.nodes.length,eo[85]=ei.diagram.title,eo[86]=ei.errors.length,eo[87]=K):K=eo[87],eo[88]===Symbol.for("react.memo_cache_sentinel")?($=()=>ew(!1),eo[88]=$):$=eo[88],eo[89]!==eh?(Z=(0,o.jsx)(g,{onClose:$,open:eh}),eo[89]=eh,eo[90]=Z):Z=eo[90],eo[91]===Symbol.for("react.memo_cache_sentinel")?(Y=()=>ev(!1),eo[91]=Y):Y=eo[91],eo[92]!==eb||eo[93]!==eT?(X=(0,o.jsx)(s,{examples:P,onClose:Y,onLoadExample:eT,open:eb}),eo[92]=eb,eo[93]=eT,eo[94]=X):X=eo[94],eo[95]!==W||eo[96]!==U||eo[97]!==O||eo[98]!==J||eo[99]!==K||eo[100]!==Z||eo[101]!==X?(ee=(0,o.jsxs)("div",{className:"flex h-screen flex-col",children:[W,U,O,J,K,Z,X]}),eo[95]=W,eo[96]=U,eo[97]=O,eo[98]=J,eo[99]=K,eo[100]=Z,eo[101]=X,eo[102]=ee):ee=eo[102],ee}],13050)}]);