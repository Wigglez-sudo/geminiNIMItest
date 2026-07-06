/* ================================================================
   NViMi AI v7.0.0 - Complete Rebuild
   Premium NVIDIA model chat experience
   ================================================================ */

const APP_VERSION = '7.0.0';
const BUILD_ID = '202607-v7';
const NVIDIA_API = 'https://integrate.api.nvidia.com/v1';
const DEFAULT_PROXY = 'https://nvidia-ai-proxy.lukewai.workers.dev';

const TIMEOUTS = {
  firstToken: 60e3, idle: 3 * 60e3, total: 20 * 60e3,
  nonStream: 10 * 60e3, modelCache: 5 * 60e3,
};

const KEYS = {
  settings: 'nvimi_v7_settings', models: 'nvimi_v7_models',
  favs: 'nvimi_v7_favs', chats: 'nvimi_v7_chats',
  current: 'nvimi_v7_current', onboarded: 'nvimi_v7_onboarded',
};

const I = {
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>',
  stop:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  idea:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
  data:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  img:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.67 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.67a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="3.5"/><path d="M3 21.5l5-5"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1 2.12-9.36L23 10"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  zip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  activity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  model:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  attach:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
};

const MODES = [
  { key:'chat', icon:'chat', label:'Chat', desc:'General purpose', prompt:'You are a helpful AI assistant. Be clear, practical and honest. When code or files are useful, use fenced code blocks with a filename line such as filename: app.js.' },
  { key:'coding', icon:'code', label:'Code', desc:'Code and files', prompt:'You are an expert software engineer. Prioritise working code, exact commands, and debugging. When generating files, use fenced code blocks with filename: path/to/file.ext as the first line.' },
  { key:'research', icon:'book', label:'Research', desc:'Deep analysis', prompt:'You are a careful research assistant. Give structured, evidence-aware analysis. Separate facts from assumptions.' },
  { key:'writing', icon:'doc', label:'Writing', desc:'Docs and emails', prompt:'You are a writing assistant. Improve clarity, tone, grammar and structure.' },
  { key:'creative', icon:'idea', label:'Creative', desc:'Ideas and stories', prompt:'You are a creative assistant. Be imaginative, vivid and useful.' },
  { key:'data', icon:'data', label:'Data', desc:'CSV, SQL, analysis', prompt:'You are a data analyst. Prefer clear tables, CSV/JSON when requested, and reproducible steps.' },
  { key:'web', icon:'web', label:'Web', desc:'HTML, CSS, JS', prompt:'You are a web developer. Produce clean, responsive HTML/CSS/JS with accessible UI patterns.' },
  { key:'images', icon:'img', label:'Images', desc:'Vision and prompts', prompt:'You help with image generation prompts and vision workflows.' },
  { key:'voice', icon:'mic', label:'Voice', desc:'Dictation', prompt:'You are a voice-friendly assistant. Keep responses conversational and easy to read aloud.' },
  { key:'custom', icon:'gear', label:'Custom', desc:'Your prompt', prompt:'' },
];

const AGENTS = [
  { key:'general', name:'General', role:'Balanced helper', prompt:'' },
  { key:'engineer', name:'Senior Engineer', role:'Code reviewer', prompt:'Act as a senior engineer. Check edge cases and give practical implementation details.' },
  { key:'researcher', name:'Researcher', role:'Careful analyst', prompt:'Act as a cautious researcher. Avoid overclaiming and state uncertainty.' },
  { key:'data', name:'Data Analyst', role:'Tables & analysis', prompt:'Act as a data analyst. Prefer structured outputs, tables, and repeatable analysis.' },
  { key:'creative', name:'Creative', role:'Ideas & writing', prompt:'Act as a creative director. Offer bold options and polished wording.' },
  { key:'teacher', name:'Teacher', role:'Step by step', prompt:'Act as a patient teacher. Explain in plain English and build up step by step.' },
  { key:'security', name:'Security', role:'Safety review', prompt:'Act as a security reviewer. Highlight secrets, unsafe defaults, and injection risks.' },
];

const DEFAULT_PLUGINS = {
  webSearch:false, webSearchProvider:'brave', webSearchApiKey:'', webSearchResults:6,
  webSearchMode:'auto', fileReader:true, downloadButtons:true,
  artifactPreview:true, thinkingDisplay:true,
};

const VERIFIED_FREE = new Set([
  'minimax-m3','diffusiongemma-26b-a4b-it','nemotron-3-ultra-550b-a55b',
  'nemotron-3.5-content-safety','cosmos3-nano','cosmos3-nano-reasoner',
  'step-3.7-flash','kimi-k2.6','mistral-medium-3.5-128b',
  'nemotron-3-nano-omni-30b-a3b-reasoning','deepseek-v4-flash','deepseek-v4-pro',
  'glm-5.1','nemotron-3-content-safety','minimax-m2.7','gemma-3-31b-it',
  'nemotron-voicechat','qwen3.5-122b-a10b','step-3.5-flash',
  'nemotron-3-nano-30b-a3b','mistral-small-4-1-9b-2509',
  'nemotron-3-super-128b-a12b','qwen3.5-397b-a17b',
  'nemotron-content-safety-reasoning-9b','mistral-large-3.675b-instruct-2512',
  'gliner-v1','mistral-14b-instruct-2512','nemotron-nano-12b-v2',
  'qwen3-next-80b-a3b-thinking','lightcone-preview-instruct',
  'mistral-nemotron-nano-9b-v2','gpt-oss-20b','gpt-oss-120b',
  'llama-3.1-nemotron-super-49b-v1.5','sarvam-m','llama-guard-4-12b',
  'gemma-3n-e4b-it','gemma-3n-e2b-it','cosmos-transfer1-7b',
  'background-noise-removal','mistral-nemotron','llama-3.1-nemotron-nano-vl-8b-v1',
  'llama-4-maverick-17b-128e-instruct','llama-3.3-nemotron-super-49b-v1',
  'llama-3.1-nemotron-nano-8b-v1','nv-embedcode-7b-v1','phi-4-mini-instruct',
  'phi-4-multimodal-instruct','whisper-large-v3','gemma-7b',
  'llama-3.2-70b-instruct','studio-voice','llama-3.2-3b-instruct',
  'llama-3.2-11b-vision-instruct','llama-3.2-90b-vision-instruct',
  'llama-3.2-1b-instruct','dracarys-llama-3.1-70b-instruct',
  'nemotron-mini-4b-instruct','gemma-2-9b-it','llama-3.1-70b-instruct',
  'llama-3.1-8b-instruct','nv-embed-v1','bloom','paligemma',
  'rerank-qa-mistral-4b','seamlessm4t','mistral-7b-instruct-v0.1',
]);

// â”€â”€ State
const S = {
  settings: {
    apiKey:'', proxyUrl:DEFAULT_PROXY, userName:'User',
    temperature:0.7, maxTokens:32768, stream:true,
    showThinking:true, streamDiagnostics:false, forceReasoning:true,
    theme:'dark', customPrompt:'',
    currentMode:'chat', currentAgent:'general', currentModelId:'',
    recentModelIds:[], plugins:{...DEFAULT_PLUGINS},
  },
  liveModels:[], favourites:new Set(),
  currentChat:null, chats:[],
  modelFilter:'all', modelRefreshAt:0, modelRefreshBusy:false,
  isBusy:false, abortCtrl:null, assistantId:null, stopReq:false,
  editMsgId:null, voiceRec:null, attachments:[],
  openThinking:new Set(), chatSearch:'',
  scrollLocked:true,
};

// â”€â”€ Helpers
const uid = (p='id') => `${p}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
const now = () => new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
const esc = v => String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const slash = r => String(r||'').trim().replace(/\/+$/,'');
const short = (v,m=800) => { const t=String(v??'');return t.length>m?t.slice(0,m)+'... (+'+(t.length-m)+')':t; };
const mobile = () => matchMedia('(max-width:768px)').matches;
const cstr = v => v==null?'':typeof v==='string'?v:typeof v==='object'?v.text||v.content||v.value||'':String(v);
const intV = v => { const n=Number(v);return Number.isFinite(n)&&n>0?Math.floor(n):0; };
const loadJ = (k,f) => { try{return JSON.parse(localStorage.getItem(k)||'null')??f;}catch{return f;} };
const saveJ = (k,v) => { try{localStorage.setItem(k,JSON.stringify(v));return true;}catch{return false;} };
const fmtB = n => { const b=Number(n||0);if(!b)return'0 B';const u=['B','KB','MB'];let v=b,i=0;while(v>=1024&&i<u.length-1){v/=1024;i++;}return v.toFixed(v>=10||i===0?0:1)+' '+u[i]; };
const nslug = v => String(v||'').toLowerCase().split('/').pop().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');

function isFree(id,raw={}){
  const vals=[id,raw.id,raw.modelId,raw.model,raw.slug,raw.catalogSlug].filter(Boolean);
  return vals.some(v=>VERIFIED_FREE.has(nslug(v)));
}

function inferCaps(id,raw={}){
  const t=(id+' '+(raw.id||'')+' '+(raw.name||'')+' '+(raw.description||'')+' '+(raw.owned_by||'')+' '+(raw.type||'')).toLowerCase();
  const caps=new Set(['chat','live']);
  if(/deepseek|r1\b|qwq|reason|thinking|nemotron/.test(t))caps.add('reasoning');
  if(/coder|coding|code|codestral|devstral|program/.test(t))caps.add('coding');
  if(/vision|visual|vl\b|multimodal|maverick|pixtral/.test(t))caps.add('vision');
  if(/image|stable-diffusion|flux|sdxl/.test(t))caps.add('image');
  if(/speech|audio|voice|whisper|tts|asr/.test(t))caps.add('speech');
  if(/128k|200k|256k|1m|million|long/.test(t))caps.add('long');
  if(/nano|mini|small|fast|flash|7b|8b|9b|12b/.test(t))caps.add('fast');
  if(isFree(id,raw)){caps.add('free_endpoint');caps.add('free');}
  if(/paid|credit|partner|premium/.test(t))caps.add('paid');
  return [...caps];
}

function fmtName(id){
  const t=String(id||'').split('/').pop()||'Unknown';
  return t.replace(/[-_]+/g,' ').replace(/\b\w/g,l=>l.toUpperCase()).replace(/\bAi\b/g,'AI').replace(/\bGpt\b/g,'GPT').trim();
}

function normModel(raw){
  if(!raw)return null;
  const obj=typeof raw==='object'?raw:{id:raw};
  const id=obj.id||obj.name||obj.model||obj.modelId||obj.slug;
  if(!id)return null;
  const caps=inferCaps(id,obj);
  const src=obj.source||(obj.catalogOnly?'catalog':'api');
  if(src==='catalog'&&!caps.includes('catalog'))caps.push('catalog');
  if((src==='api'||src==='api+catalog')&&!caps.includes('api'))caps.push('api');
  return {id, name:obj.display_name||obj.displayName||obj.title||obj.name||fmtName(id),
    desc:obj.description||obj.desc||obj.owned_by||(src==='catalog'?'Catalog':'API model'),
    capabilities:[...new Set(caps)], source:src, catalogOnly:!!obj.catalogOnly||src==='catalog', raw:obj};
}

// â”€â”€ Persistence
function saveSettings(){saveJ(KEYS.settings,S.settings);}
function saveFavs(){saveJ(KEYS.favs,[...S.favourites]);}
function saveModels(){S.modelRefreshAt=Date.now();saveJ(KEYS.models,{models:S.liveModels.map(m=>m.raw),at:S.modelRefreshAt});}
function saveChats(){
  const clean=S.chats.map(c=>({...c,messages:(c.messages||[]).map(m=>{
    const a=m.attachments?m.attachments.map(att=>att&&att.kind==='image'?{...att,dataUrl:''}:att):m.attachments;
    return {...m,attachments:a};
  })}));
  saveJ(KEYS.chats,clean);
  if(S.currentChat)localStorage.setItem(KEYS.current,S.currentChat.id);
}

function loadState(){
  const stored=loadJ(KEYS.settings,{});
  S.settings={...S.settings,...stored};
  S.settings.plugins={...DEFAULT_PLUGINS,...(S.settings.plugins||{})};
  S.settings.recentModelIds=Array.isArray(S.settings.recentModelIds)?S.settings.recentModelIds.slice(0,5):[];
  if(!S.settings.proxyUrl)S.settings.proxyUrl=DEFAULT_PROXY;
  if(!S.settings.userName)S.settings.userName='User';

  const mc=loadJ(KEYS.models,{models:[],at:0});
  S.liveModels=Array.isArray(mc.models)?mc.models.map(normModel).filter(Boolean):[];
  S.modelRefreshAt=Number(mc.at||0)||0;
  S.favourites=new Set(loadJ(KEYS.favs,[]));

  S.chats=loadJ(KEYS.chats,[]);
  const seen=new Set();
  S.chats=(Array.isArray(S.chats)?S.chats:[]).filter(c=>{if(!c||!c.id||seen.has(c.id))return false;seen.add(c.id);if(!Array.isArray(c.messages))c.messages=[];if(!c.title)c.title='New Chat';if(typeof c.draft!=='string')c.draft='';return true;});

  const cid=localStorage.getItem(KEYS.current);
  S.currentChat=S.chats.find(c=>c.id===cid)||S.chats[0]||createChat(false);
}

// â”€â”€ Chat
function createChat(persist=true){
  const c={id:uid('chat'),title:'New Chat',createdAt:Date.now(),messages:[],draft:''};
  S.chats.unshift(c);if(persist)saveChats();return c;
}
function newChat(){captureDraft();S.currentChat=createChat();S.editMsgId=null;S.chatSearch='';renderAll();restoreDraft();focusInput();}
function selectChat(id){const c=S.chats.find(x=>x.id===id);if(!c)return;captureDraft();S.currentChat=c;S.editMsgId=null;S.chatSearch='';saveChats();renderAll();restoreDraft();}
function pinChat(id){const c=S.chats.find(x=>x.id===id);if(!c)return;c.pinned=!c.pinned;saveChats();renderHistory();toast(c.pinned?'Pinned':'Unpinned');}
function renameChat(id){const c=S.chats.find(x=>x.id===id);if(!c)return;const n=prompt('Rename chat',c.title||'New Chat');if(n===null)return;c.title=n.trim().slice(0,80)||'New Chat';saveChats();renderHistory();updateTopBar();}
function deleteChat(id,e){e&&e.preventDefault();e&&e.stopPropagation();const c=S.chats.find(x=>x.id===id);if(!c)return;if(!confirm('Delete "'+(c.title||'New Chat')+'"?'))return;S.chats=S.chats.filter(x=>x.id!==id);if(!S.chats.length)S.currentChat=createChat(false);else if(S.currentChat&&S.currentChat.id===id)S.currentChat=S.chats[0];S.editMsgId=null;saveChats();renderAll();toast('Deleted');}
function clearAll(){if(!confirm('Delete all chats?'))return;S.chats=[];S.currentChat=createChat(false);S.editMsgId=null;saveChats();renderAll();toast('All deleted');}
function getMsg(id){return S.currentChat&&S.currentChat.messages?S.currentChat.messages.find(m=>m.id===id):null;}

// â”€â”€ Model helpers
function curModel(){return S.liveModels.find(m=>m.id===S.settings.currentModelId)||S.liveModels[0]||null;}
function hasReasoning(m){if(!m)return false;const t=(m.id||'')+' '+(m.name||'');t.toLowerCase();return(m.capabilities||[]).includes('reasoning')||/reason|thinking|deepseek|qwen|qwq|glm|nemotron|kimi|gemma-3|gpt-oss/.test(t.toLowerCase());}

function tokenLimit(m){
  if(!m)return 32768;
  const r=m.raw||{};
  const c=[r.max_output_tokens,r.maxOutputTokens,r.max_completion_tokens,r.maxCompletionTokens,r.output_token_limit,r.outputTokenLimit,r.max_tokens,r.maxTokens,r.token_limit,r.tokenLimit,r.context_length,r.contextLength].map(intV).filter(Boolean);
  if(!c.length)return 32768;
  const o=c.filter(v=>v<=131072);
  return Math.max(512,Math.min(...(o.length?o:c)));
}

function tokenPresets(limit){
  const cap=Math.max(512,Math.min(131072,intV(limit)||32768));
  const p=[512,1024,2048,4096,8192,16384,32768,65536,131072];
  if(!p.includes(cap))p.push(cap);
  return [...new Set(p)].sort((a,b)=>a-b);
}

function tokenOptions(limit){
  const cur=Math.max(32768,intV(S.settings.maxTokens)||0);
  return tokenPresets(limit).map(v=>'<option value="'+v+'"'+(v===cur?' selected':'')+'>'+v.toLocaleString()+'</option>').join('');
}

function syncTokens(){
  const m=curModel();const lim=tokenLimit(m);
  if(intV(S.settings.maxTokens)>lim){S.settings.maxTokens=lim;saveSettings();}
  return lim;
}

function reasoningBody(m){
  if(!S.settings.forceReasoning||!S.settings.showThinking||!hasReasoning(m))return{};
  const t=(m&&m.id||'')+(m&&m.name||'');const id=t.toLowerCase();
  const kw={enable_thinking:true};
  if(/glm/.test(id))kw.clear_thinking=false;
  if(/deepseek/.test(id)||/kimi/.test(id))kw.thinking=true;
  const ex={include_reasoning:true,chat_template_kwargs:kw};
  if(/nemotron/.test(id))ex.thinking_token_budget=Math.min(4096,Math.max(512,Math.floor(Number(S.settings.maxTokens||4096)/2)));
  return ex;
}

function modelProfile(m){
  const id=(m&&m.id||'')+' '+(m&&m.name||'');return {ns:/deepseek[-_\s/]*v4[-_\s/]*pro/.test(id.toLowerCase()),stripR:/deepseek/.test(id.toLowerCase())};
}

function stripR(p){const{include_reasoning,chat_template_kwargs,thinking_token_budget,...r}=p||{};return r;}
function retryable(s){return[404,429,500,502,503,504,524].includes(Number(s));}

function capBadge(c){
  const map={chat:'Chat',reasoning:'Reasoning',coding:'Coding',vision:'Vision',image:'Image',speech:'Speech',long:'Long Ctx',fast:'Fast',free_endpoint:'Free',free:'Free',paid:'Paid',api:'API',catalog:'Catalog',live:'Live'};
  return map[c]||c;
}

function capHtml(m){
  const order=['free_endpoint','api','reasoning','coding','vision','image','speech','long','fast','catalog'];
  const caps=order.filter(c=>m.capabilities&&m.capabilities.includes(c));
  return'<div class="capability-bar">'+caps.map(c=>'<span class="capability-tag '+c+'">'+esc(capBadge(c))+'</span>').join('')+'</div>';
}

// â”€â”€ API
function apiUrl(path){
  const clean=path.startsWith('/v1/')?path:'/v1'+(path.startsWith('/')?path:'/'+path);
  const proxy=slash(S.settings.proxyUrl);
  return proxy?proxy+clean:NVIDIA_API+clean.replace(/^\/v1/,'');
}
function apiHeaders(stream){
  const h={'Content-Type':'application/json',Accept:stream?'text/event-stream':'application/json',Authorization:'Bearer '+(S.settings.apiKey||'')};
  if(slash(S.settings.proxyUrl))h['X-Nvidia-Api-Key']=S.settings.apiKey||'';
  return h;
}
function directHeaders(stream){
  return {'Content-Type':'application/json',Accept:stream?'text/event-stream':'application/json',Authorization:'Bearer '+(S.settings.apiKey||'')};
}

async function ft(url,opts,t){
  t=t||120000;
  const ctrl=new AbortController();
  const es=opts.signal;
  const onAbort=function(){ctrl.abort(es&&es.reason||'Aborted');};
  if(es&&es.aborted)onAbort();else if(es)es.addEventListener('abort',onAbort,{once:true});
  const timer=setTimeout(function(){ctrl.abort('Timeout');},t);
  try{return await fetch(url,Object.assign({},opts,{signal:ctrl.signal}));}
  finally{clearTimeout(timer);if(es)es.removeEventListener('abort',onAbort);}
}

// â”€â”€ Stream Debug
function ensureDbg(msg){
  if(!msg)return null;
  if(!msg.debug)msg.debug={started:Date.now(),http:{},counters:{chunks:0,sse:0,json:0,contentD:0,reasonD:0},events:[]};
  return msg.debug;
}
function dEvent(msg,lbl,det){
  const d=ensureDbg(msg);if(!d)return;
  const el=((Date.now()-d.started)/1e3).toFixed(1)+'s';
  d.events.push({t:el,label:lbl,details:short(det||'',300)});
  if(d.events.length>30)d.events.shift();
}
function dSummary(msg){
  if(!msg||!msg.debug)return'';
  const d=msg.debug,c=d.counters||{};
  const rows=[['Time',((Date.now()-(d.started||Date.now()))/1e3).toFixed(1)+'s'],['HTTP',d.http&&d.http.status?''+d.http.status:'-'],['Content',(c.contentD||0)+' chunks'],['Reasoning',(c.reasonD||0)+' chunks']];
  if(msg.finishReason)rows.push(['Finish',String(msg.finishReason)]);
  return'<div class="activity-grid">'+rows.map(function(r){return'<div class="activity-grid-item"><span>'+esc(r[0])+'</span><strong>'+esc(r[1])+'</strong></div>';}).join('')+'</div>';
}

function visThinking(msg){
  var t=String(msg&&msg.thinking||'');
  if(msg&&msg.content){
    t=t.replace(/Reasoning params were rejected[\s\S]*?(?=\n(?:We have|The user|I |Let's|$)|$)/i,'')
      .replace(/The selected model did not start streaming within \d+ seconds[^\n]*\n?/i,'');
  }
  return t.trim();
}

function thinkHtml(msg){
  if(!msg||msg.role==='user')return'';
  var th=visThinking(msg);
  var hasTh=S.settings.showThinking&&!!th;
  var hasC=S.settings.showThinking&&!!msg.content;
  var hasD=!!msg.debug;
  if(!hasTh&&!hasC&&!hasD)return'';
  var sum=dSummary(msg);
  var body='';
  if(hasC)body+='<div class="think-section-label">Content preview</div><div class="think-text">'+esc(short(msg.content,2000))+'</div>';
  if(hasTh)body+='<div class="think-section-label">Reasoning</div><div class="think-text">'+esc(th)+'</div>';
  if(msg.finishReason==='length')body+='<div class="finish-warning">Output limit reached. Increase max tokens or request continuation.</div>';
  if(hasD)body+='<div class="think-section-label">Stream</div>'+sum;
  var id=msg.id||'';
  var openAttr=id&&S.openThinking&&S.openThinking.has(id)?' open':'';
  return'<details class="think-panel" data-think-id="'+esc(id)+'"'+openAttr+'><summary class="think-summary"><span class="think-icon">AI</span><span class="think-title">Activity</span><span class="think-status">'+esc(msg.debug?(((Date.now()-(msg.debug.started||Date.now()))/1e3).toFixed(1)+'s'):(msg.loading?'thinking':'done'))+'</span></summary><div class="think-body">'+body+'</div></details>';
}

// â”€â”€ Content appending
function appReasoning(msg,text){
  var v=cstr(text);if(!v)return false;
  msg.thinking=(msg.thinking||'')+v;return true;
}
function appContent(msg,text){
  var ch=cstr(text);if(!ch)return false;
  var changed=false;
  while(ch){
    if(msg._reasonTag){
      var closeRe=new RegExp('</'+msg._reasonTag+'>','i');
      var ci=ch.search(closeRe);
      if(ci===-1){msg.thinking=(msg.thinking||'')+ch;changed=true;return changed;}
      msg.thinking=(msg.thinking||'')+ch.slice(0,ci);
      var cm=ch.slice(ci).match(closeRe);
      ch=ch.slice(ci+(cm?cm[0].length:0));
      msg._reasonTag='';changed=true;continue;
    }
    var om=ch.match(/<(think|thinking|reasoning)>/i);
    if(!om){msg.content=(msg.content||'')+ch;changed=true;return changed;}
    var before=ch.slice(0,om.index);
    if(before){msg.content=(msg.content||'')+before;changed=true;}
    msg._reasonTag=om[1].toLowerCase();
    ch=ch.slice(om.index+om[0].length);
  }
  return changed;
}

function applyFinish(msg,reason){
  if(!msg||!reason)return;
  msg.finishReason=String(reason);
  if(msg.finishReason==='length')msg.status='Output limit';
  if(msg.finishReason==='length'&&!msg.content&&!msg.thinking)msg.content='Output limit reached before text arrived.';
}

// â”€â”€ Markdown
function renderMd(text,opts){
  opts=opts||{};
  var src=String(text||'');
  var blocks=[];
  src=src.replace(/```([^\n`]*)\n([\s\S]*?)(?:```|$)/g,function(full,lang,code,offset){
    var before=src.slice(Math.max(0,offset-200),offset);
    var meta=extractMeta(lang,code,before);
    if(opts.hideFiles&&meta.explicit)return'';
    blocks.push({id:uid('code'),lang:meta.lang,code:meta.code,filename:meta.filename||inferFn(meta.lang),explicit:meta.explicit});
    return'@@CODE_'+(blocks.length-1)+'@@';
  });
  if(opts.hideFiles)src=src.replace(/^\s*(?:filename|file|path)\s*[:=]\s*`?[^`\n]+`?\s*$/gmi,'');

  var fmt=function(v){return String(v||'').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*(?!\s)(.*?)\*(?!\*)/g,'$1<em>$2</em>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>');};

  var isTb=function(ls){return ls.length>=2&&/^\s*\|?.+\|.+\|?\s*$/.test(ls[0])&&/^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(ls[1]);};
  var renderTb=function(ls){
    var cells=function(l){return l.replace(/^\s*\|/,'').replace(/\|\s*$/,'').split('|').map(function(c){return fmt(c.trim());});};
    var h=cells(ls[0]),rows=ls.slice(2).filter(Boolean).map(function(r){return cells(r);});
    return'<table><thead><tr>'+h.map(function(c){return'<th>'+c+'</th>';}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return'<tr>'+r.map(function(c){return'<td>'+c+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>';
  };

  var html=esc(src).split(/\n{2,}/).map(function(block){
    var lines=block.trim().split('\n').map(function(l){return l.trimEnd();});
    if(!lines[0])return'';
    if(isTb(lines))return renderTb(lines);
    if(/^###\s+/.test(lines[0]))return'<h3>'+fmt(lines[0].replace(/^###\s+/,''))+'</h3>';
    if(/^##\s+/.test(lines[0]))return'<h2>'+fmt(lines[0].replace(/^##\s+/,''))+'</h2>';
    if(/^#\s+/.test(lines[0]))return'<h1>'+fmt(lines[0].replace(/^#\s+/,''))+'</h1>';
    var bul=lines.every(function(l){return/^[-*+]\s+/.test(l);});
    var ord=lines.every(function(l){return/^\d+\.\s+/.test(l);});
    if(bul||ord){var tag=ord?'ol':'ul';return'<'+tag+'>'+lines.map(function(l){return fmt(l.replace(/^(?:[-*+]\s+|\d+\.\s+)/,'').trim());}).map(function(i){return'<li>'+i+'</li>';}).join('')+'</'+tag+'>';}
    return'<p>'+lines.map(function(l){return fmt(l);}).join('<br>')+'</p>';
  }).join('');
  html=html.replace(/@@CODE_(\d+)@@/g,function(_,n){return codeHtml(blocks[Number(n)]);});
  return html;
}

// â”€â”€ Code meta
function langF(f){
  var e=String(f||'').split('.').pop().toLowerCase();
  var m={js:'javascript',jsx:'javascript',ts:'typescript',tsx:'typescript',py:'python',html:'html',css:'css',scss:'css',json:'json',md:'markdown',sh:'bash',ps1:'powershell',sql:'sql',csv:'csv',yml:'yaml',yaml:'yaml',xml:'xml',dockerfile:'dockerfile'};
  return m[e]||'text';
}
function inferFn(lang,idx){
  idx=idx||1;
  var ext={javascript:'js',typescript:'ts',python:'py',html:'html',css:'css',json:'json',markdown:'md',bash:'sh',powershell:'ps1',sql:'sql',csv:'csv',text:'txt',yaml:'yml',dockerfile:'Dockerfile'}[String(lang||'').toLowerCase()]||'txt';
  var s=idx>1?'-'+idx:'';
  return ext==='Dockerfile'?'Dockerfile'+s:'response'+s+'.'+ext;
}
function cleanFn(v){var n=String(v||'').trim().replace(/^[-*\s]+/,'').replace(/^['"`]+|['"`]+$/g,'').replace(/[<>:"|?*]/g,'-').replace(/\\/g,'/');n=n.split('/').map(function(x){return x.trim();}).filter(Boolean).join('/');return(!n||n.length>160)?'':n;}
function extractMeta(lang,code,before){
  before=before||'';
  var l=(lang||'').trim()||'text',c=String(code||'').replace(/\n$/,''),f='',e=false;
  var lf=l.match(/(?:filename|file|path)\s*[:=]\s*([\w.\-@/\\() ]+)/i)||l.match(/([\w.\-@/\\()]+\.[a-z0-9]{1,8})/i);
  if(lf){f=cleanFn(lf[1]);l=l.replace(lf[0],'').trim()||langF(f)||'text';e=true;}
  var lines=c.split(/\r?\n/),fl=lines[0]||'';
  var fln=fl.match(/^\s*(?:(?:\/\/|#|--)\s*)?(?:filename|file|path)\s*[:=]\s*(.+?)\s*(?:\*\/|-->)?\s*$/i);
  if(!f&&fln){f=cleanFn(fln[1]);c=lines.slice(1).join('\n');e=true;}
  if(f&&(!l||l==='text'))l=langF(f)||l||'text';
  return{lang:l,filename:f,code:c,explicit:e};
}

// â”€â”€ Generated files
var PAYLOADS=new Map();
function storeP(data){
  var id='p_'+Date.now()+'_'+(PAYLOADS.size+1);
  PAYLOADS.set(id,data);
  if(PAYLOADS.size>500){var first=PAYLOADS.keys().next().value;if(first)PAYLOADS.delete(first);}
  return id;
}
function readP(el){
  var id=el&&el.dataset?el.dataset.payloadId:null;
  if(id&&PAYLOADS.has(id))return PAYLOADS.get(id);
  var enc=el&&el.dataset?el.dataset.payload:null;
  return enc?JSON.parse(decodeURIComponent(atob(enc))):null;
}

function parseFiles(text,opts){
  opts=opts||{};
  var src=String(text||'');
  var files=[],seen=new Set(),used=new Map();
  var re=/```([^\n`]*)\n([\s\S]*?)(?:```|$)/g;
  var m;
  while((m=re.exec(src))){
    var before=src.slice(Math.max(0,m.index-200),m.index);
    var meta=extractMeta(m[1],m[2],before);
    var code=meta.code;if(!code.trim())continue;
    var fn=meta.filename||(opts.includeInferred?inferFn(meta.lang,files.length+1):'');
    if(!fn)continue;
    var key=fn.toLowerCase()+'::'+String(code).length;
    if(seen.has(key))continue;seen.add(key);
    files.push({filename:uniqFn(fn,used),lang:meta.lang,code:code,explicit:meta.explicit});
  }
  return files;
}

function genState(text,msg){
  var src=String(text||'');
  var bc=(src.match(/```/g)||[]).length/2;
  var large=src.length>50000||bc>10;
  return{can:!!src&&!(msg&&msg.loading)&&S.settings.plugins.downloadButtons&&!large,large:large,count:bc};
}

function parseManifest(text){
  var src=String(text||'');
  if(!/download links|primary file|here are the rebuilt files|here are the files/i.test(src))return[];
  var lines=src.split(/\r?\n/).map(function(s){return s.trim();}).filter(Boolean);
  var seen=new Set(),files=[];
  for(var i=0;i<lines.length;i++){
    var line=lines[i];
    var m=line.match(/^([A-Za-z0-9_.\-@/\\() ]+\.[A-Za-z0-9]{1,8})\s*[â€”-]/);
    if(!m)continue;
    var filename=cleanFn(m[1]);if(!filename||seen.has(filename.toLowerCase()))continue;
    seen.add(filename.toLowerCase());
    var note=[lines[i+1],lines[i+2]].filter(Boolean).join(' ').trim();
    files.push({filename:filename,lang:langF(filename),code:note||'Generated file from summary.',explicit:false});
  }
  return files;
}

function genHtml(text){
  var s=genState(text);if(!s.can)return s.large?'<div class="generated-files"><div><strong>Large output</strong><span style="color:var(--text-tertiary);font-size:11px;margin-left:8px">File extraction deferred.</span></div></div>':'';
  var files=parseFiles(text);
  var mf=parseManifest(text).filter(function(f){return!files.some(function(x){return x.filename.toLowerCase()===f.filename.toLowerCase();});});
  var all=files.concat(mf);
  if(!all.length)return'';
  var allF=all.map(function(f){return{filename:f.filename,code:f.code,lang:f.lang};});
  var allId=storeP(allF);
  var sub=all.length+' file'+(all.length===1?'':'s');

  var cards=all.map(function(f){
    var sid=storeP({filename:f.filename,code:f.code,lang:f.lang});
    var k=fKind(f);
    var mn=f.manifestOnly?'<div style="font-size:11px;color:var(--text-tertiary);margin-top:4px">Model described this file but did not provide source.</div>':'';
    return'<div class="gen-file-card"><div class="gen-file-icon">'+esc(k.slice(0,4).toUpperCase())+'</div><div class="gen-file-info"><div class="gen-file-name">'+esc(f.filename)+'</div><div class="gen-file-meta"><span class="capability-tag">'+esc(k)+'</span> '+esc(f.lang)+' - '+fmtB(new Blob([f.code]).size)+'</div>'+mn+'</div><div class="gen-file-actions"><button class="gen-file-btn" data-action="copy-code" data-payload-id="'+sid+'">Copy</button><button class="gen-file-btn primary" data-action="download-code" data-payload-id="'+sid+'">Download</button></div></div>';
  }).join('');

  var preBtn=canPrv(allF)?'<button class="gen-file-btn" data-action="preview-artifacts" data-payload-id="'+allId+'">Preview</button>':'';
  var multi=all.length>1
    ?preBtn+'<button class="gen-file-btn" data-action="copy-all-files" data-payload-id="'+allId+'">Copy all</button><button class="gen-file-btn primary" data-action="download-zip" data-payload-id="'+allId+'">ZIP</button>'
    :preBtn+'<button class="gen-file-btn primary" data-action="download-all-files" data-payload-id="'+allId+'">Download</button>';

  return'<div class="generated-files"><div class="gen-files-header"><div><strong>Generated Files</strong><span style="color:var(--text-tertiary);font-size:11px;margin-left:8px">'+sub+'</span></div><div style="display:flex;gap:6px;flex-wrap:wrap">'+multi+'</div></div>'+cards+'</div>';
}

function fKind(f){
  var n=String(f.filename||'').toLowerCase(),l=String(f.lang||'').toLowerCase();
  if(/\.(html?|css|jsx?|tsx?)$/.test(n)||['html','css','javascript','typescript'].includes(l))return'Web';
  if(/\.(md|markdown|txt|doc)$/.test(n)||['markdown','text'].includes(l))return'Doc';
  if(/\.(json|csv|tsv|ya?ml|toml|xml)$/.test(n)||['json','csv','yaml','xml'].includes(l))return'Data';
  if(/\.(py|ps1|sh|bat|cmd|sql|go|rs|java|cs|php|rb)$/.test(n))return'Code';
  return'File';
}
function canPrv(f){return Array.isArray(f)&&f.some(function(x){return/\.html?$/i.test(x.filename||'')||/html/i.test(x.lang||'');});}
function uniqFn(fn,used){
  var c=cleanFn(fn)||'response.txt';var lower=c.toLowerCase();
  var count=(used.get(lower)||0)+1;used.set(lower,count);
  if(count===1)return c;
  var s=c.lastIndexOf('/');var dir=s>=0?c.slice(0,s+1):'';
  var base=s>=0?c.slice(s+1):c;var d=base.lastIndexOf('.');
  return d>0?dir+base.slice(0,d)+'-'+count+base.slice(d):dir+base+'-'+count;
}
function codeHtml(block){
  if(!block)return'';
  var sid=storeP({code:block.code,filename:block.filename,lang:block.lang});
  var actions='<div class="code-actions"><button class="code-action-btn" data-action="copy-code" data-payload-id="'+sid+'">Copy</button>'+(S.settings.plugins.downloadButtons?'<button class="code-action-btn" data-action="download-code" data-payload-id="'+sid+'">Download</button>':'')+'</div>';
  var hdr='<div class="code-block-header"><div><span class="code-lang">'+esc(block.lang)+'</span><span class="code-filename">'+esc(block.filename)+'</span></div>'+actions+'</div>';
  if(block.explicit)return'<details class="code-block-wrapper"><summary>'+hdr+'<span style="padding:0 12px 8px;display:block;color:var(--text-tertiary);font-size:11px">Click to expand</span></summary><pre><code>'+esc(block.code)+'</code></pre></details>';
  return'<div class="code-block-wrapper">'+hdr+'<pre><code>'+esc(block.code)+'</code></pre></div>';
}

// â”€â”€ ZIP
var CRC32=(function(){var t=new Uint32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;})();
function crc(b){var c=0xFFFFFFFF;for(var i=0;i<b.length;i++)c=(c>>>8)^CRC32[(c^b[i])&0xFF];return(c^0xFFFFFFFF)>>>0;}
function buildZip(entries){
  var enc=new TextEncoder(),chunks=[],central=[];
  var off=0;
  var u16=function(v){return new Uint8Array([v&0xFF,(v>>>8)&0xFF]);};
  var u32=function(v){return new Uint8Array([v&0xFF,(v>>>8)&0xFF,(v>>>16)&0xFF,(v>>>24)&0xFF]);};
  var push=function(a){chunks.push(a);off+=a.length;};
  var used=new Set();
  entries.forEach(function(e){
    var n=String(e.name||'file.txt').replace(/^\/+/,'');
    while(used.has(n))n=n.replace(/(\.[^.]*$|$)/,'_$&');
    used.add(n);
    var nb=enc.encode(n),data=enc.encode(e.content);
    var c=crc(data),lho=off;
    push(concat([u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(c),u32(data.length),u32(data.length),u16(nb.length),u16(0),nb]));
    push(data);
    central.push(concat([u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(c),u32(data.length),u32(data.length),u16(nb.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(lho),nb]));
  });
  var cs=off;var csz=0;
  central.forEach(function(c){chunks.push(c);csz+=c.length;off+=c.length;});
  chunks.push(concat([u32(0x06054b50),u16(0),u16(0),u16(central.length),u16(central.length),u32(csz),u32(cs),u16(0)]));
  return new Blob(chunks,{type:'application/zip'});
}
function concat(parts){var len=0;parts.forEach(function(p){len+=p.length;});var out=new Uint8Array(len);var pos=0;parts.forEach(function(p){out.set(p,pos);pos+=p.length;});return out;}

// â”€â”€ File Handling
var MAX_TEXT=2*1024*1024,MAX_IMG=8*1024*1024,MAX_ATTACH=10;

function isTextFile(f){var n=String(f&&f.name||'').toLowerCase(),t=String(f&&f.type||'').toLowerCase();return t.startsWith('text/')||['application/manifest+json','application/json','text/plain'].includes(t)||/\.(txt|md|json|csv|tsv|py|js|jsx|ts|tsx|html|css|scss|xml|yaml|yml|toml|ini|cfg|conf|log|ps1|bat|cmd|sh|sql|java|c|cpp|h|hpp|cs|go|rs|php|rb|swift|kt|dockerfile|env|webmanifest|manifest)$/i.test(n);}
function isImg(f){var n=String(f&&f.name||'').toLowerCase(),t=String(f&&f.type||'').toLowerCase();return['image/png','image/jpeg','image/webp','image/gif','image/jpg','image/heic','image/heif'].includes(t)||/\.(png|jpe?g|webp|gif|heic|heif)$/i.test(n);}
function isZip(f){var n=String(f&&f.name||'').toLowerCase(),t=String(f&&f.type||'').toLowerCase();return['application/zip','application/x-zip-compressed','application/x-zip'].includes(t)||/\.zip$/i.test(n);}
function isManifest(f){var n=String(f&&f.name||'').toLowerCase(),t=String(f&&f.type||'').toLowerCase();return t==='application/manifest+json'||/(?:^|[\/._-])manifest(?:[\/._-]|$)/i.test(n)||/\.webmanifest$/i.test(n);}
function attLang(n){var e=(String(n||'').split('.').pop()||'txt').toLowerCase();var m={js:'javascript',ts:'typescript',tsx:'typescript',py:'python',md:'markdown',html:'html',css:'css',json:'json',csv:'csv',txt:'text',ps1:'powershell',sh:'bash',sql:'sql',yml:'yaml',yaml:'yaml',xml:'xml',dockerfile:'dockerfile'};return m[e]||e||'text';}
function readTextF(f){return new Promise(function(res,rej){var r=new FileReader();r.onload=function(){res(String(r.result||''));};r.onerror=function(){rej(r.error);};r.readAsText(f);});}
function readDataUrl(f){return new Promise(function(res,rej){var r=new FileReader();r.onload=function(){res(String(r.result||''));};r.onerror=function(){rej(r.error);};r.readAsDataURL(f);});}

async function addAttachments(fileList){
  var files=Array.from(fileList||[]).filter(Boolean);
  if(!files.length)return;
  var added=0;var skipped=[];
  for(var i=0;i<files.length;i++){
    var file=files[i];
    var name=file.name||'file';
    if(S.attachments.length>=MAX_ATTACH){skipped.push(name+' (max '+MAX_ATTACH+')');continue;}
    if(isImg(file)){
      if(file.size>MAX_IMG){skipped.push(name+' (>8MB)');continue;}
      try{var du=await readDataUrl(file);S.attachments.push({id:uid('att'),kind:'image',name:name,size:file.size,type:file.type||'image/*',dataUrl:du});added++;}catch(e){skipped.push(name+' (failed)');}
      continue;
    }
    if(isZip(file)){
      if(file.size>50*1024*1024){skipped.push(name+' (>50MB)');continue;}
      S.attachments.push({id:uid('att'),kind:'archive',name:name,size:file.size,type:file.type||'application/zip',content:''});added++;
      continue;
    }
    if(isManifest(file)){
      try{var text=await readTextF(file);S.attachments.push({id:uid('att'),kind:'text',name:name,size:file.size,type:file.type||'application/manifest+json',language:'json',content:text});added++;}catch(e){skipped.push(name+' (failed)');}
      continue;
    }
    if(!isTextFile(file)){skipped.push(name+' (unsupported type)');continue;}
    if(!S.settings.plugins.fileReader){skipped.push(name+' (reader off)');continue;}
    if(file.size>MAX_TEXT){skipped.push(name+' (>2MB)');continue;}
    try{var txt=await readTextF(file);S.attachments.push({id:uid('att'),kind:'text',name:name,size:file.size,type:file.type||'text/plain',language:attLang(name),content:txt});added++;}catch(e){skipped.push(name+' (failed)');}
  }
  renderAttach();updateSendBtn();
  if(added)toast('Attached '+added+' file'+(added===1?'':'s'));
  if(skipped.length)toast('Skipped: '+skipped.slice(0,2).join(', ')+(skipped.length>2?'...':''),'warning');
}

function renderAttach(){
  var el=document.getElementById('pendingAttachments');if(!el)return;
  if(!S.attachments.length){el.innerHTML='';el.style.display='none';return;}
  el.style.display='flex';
  el.innerHTML=S.attachments.map(function(a){
    var kindTag=a.kind==='image'?'IMG':a.kind==='archive'?'ZIP':'TXT';
    var metaText=(a.kind==='image'?'image':a.kind==='archive'?'zip':a.language||'text')+' - '+fmtB(a.size);
    return'<div class="attachment-chip" title="'+esc(a.name)+'"><span class="attachment-icon">'+kindTag+'</span><div class="attachment-info"><div class="attachment-name">'+esc(a.name)+'</div><div class="attachment-meta">'+esc(metaText)+'</div></div><button class="attachment-remove" data-action="remove-attachment" data-att-id="'+esc(a.id)+'">&times;</button></div>';
  }).join('')+'<button class="attachment-chip attachment-chip-add" data-action="attach"><span class="attachment-icon">+</span><div class="attachment-info"><div class="attachment-name">Add more</div></div></button>';
}

function removeAttach(id){S.attachments=S.attachments.filter(function(a){return a.id!==id;});renderAttach();updateSendBtn();}
function clearAttach(){S.attachments=[];renderAttach();updateSendBtn();}

function attPrompt(atts){
  if(!atts||!atts.length||!S.settings.plugins.fileReader)return'';
  return atts.map(function(a){
    if(a.kind==='image')return'\n\n[Image: '+a.name+' ('+(a.type||'image')+' '+fmtB(a.size)+')]';
    if(a.kind==='archive')return'\n\n[Archive: '+a.name+' ('+fmtB(a.size)+')]';
    var c=String(a.content||'').slice(0,200000);
    var t=String(a.content||'').length>c.length?'\n[truncated]':'';
    return'\n\n[File: '+a.name+' ('+(a.type||'text')+' '+fmtB(a.size)+')]\n\n```'+(a.language||'text')+'\n'+c+t+'\n```';
  }).join('');
}

function msgContent(base,atts){
  var t=String(base||'')+attPrompt(atts);
  var imgs=(atts||[]).filter(function(a){return a&&a.kind==='image'&&a.dataUrl;});
  if(!imgs.length)return t;
  return[{type:'text',text:t||'Review the attached image.'}].concat(imgs.map(function(a){return{type:'image_url',image_url:{url:a.dataUrl}};}));
}

function attSummaryHtml(atts){
  if(!atts||!atts.length)return'';
  return'<div class="msg-attachments">'+atts.map(function(a){return'<div class="msg-attachment-card"><span style="font-weight:700;color:var(--accent);font-size:11px">'+(a.kind==='image'?'IMG':'FILE')+'</span><div><strong>'+esc(a.name)+'</strong><br><small>'+esc(a.kind==='image'?'image':a.language||'text')+' - '+fmtB(a.size)+'</small></div></div>';}).join('')+'</div>';
}

// â”€â”€ Render
function welcomeHtml(){
  return'<div class="chat-welcome"><div class="chat-welcome-logo">NV</div><div class="chat-welcome-title">NViMi AI</div><div class="chat-welcome-sub">A premium NVIDIA model chat experience. Connect your API key, choose a model, and start creating.</div><div class="chat-welcome-cards"><div class="chat-welcome-card" data-action="open-settings"><div class="welcome-card-icon">'+I.gear+'</div><div class="welcome-card-title">1. Connect</div><div class="welcome-card-desc">Add your NVIDIA API key in Settings.</div></div><div class="chat-welcome-card" data-action="refresh-models"><div class="welcome-card-icon">'+I.refresh+'</div><div class="welcome-card-title">2. Load Models</div><div class="welcome-card-desc">Refresh to load live NVIDIA models.</div></div><div class="chat-welcome-card" data-action="guide"><div class="welcome-card-icon">'+I.chat+'</div><div class="welcome-card-title">3. Get Started</div><div class="welcome-card-desc">Learn about modes, plugins, and shortcuts.</div></div></div></div>';
}

function typingHtml(label){
  label=label||'Thinking';
  var l=S.settings.showThinking?label:'Generating';
  return'<span style="display:inline-flex;align-items:center;gap:8px;color:var(--text-tertiary);font-size:13px">'+esc(l)+' <span class="typing-indicator"><span></span><span></span><span></span></span></span>';
}

function msgHtml(m){
  var isUser=m.role==='user';
  var av=isUser?(S.settings.userName||'U').slice(0,1).toUpperCase():'NV';
  var author=isUser?(S.settings.userName||'You'):'NViMi';
  var visible=isUser?stripBlocks(m.content||''):(m.content||'');
  var content=m.loading&&!visible?typingHtml(m.status||'Thinking'):renderMd(visible,{hideFiles:!isUser});
  var gen=(!isUser&&visible&&S.settings.plugins.downloadButtons&&genState(visible,m).can)?genHtml(visible):'';
  var search=!isUser?searchCard(m):'';
  var atts=isUser?attSummaryHtml(m.attachments||[]):'';
  var think=!isUser?thinkHtml(m):'';
  return'<div class="message" id="msg_'+esc(m.id)+'"><div class="message-avatar '+(isUser?'user':'assistant')+'">'+esc(av)+'</div><div class="message-body"><div class="message-header"><span class="message-author">'+esc(author)+'</span><span class="message-time">'+esc(m.time||'')+'</span>'+(m.model?'<span class="message-model-tag">'+esc(m.model)+'</span>':'')+'</div><div class="message-content" id="body_'+esc(m.id)+'">'+think+search+gen+content+atts+'</div>'+msgActionsHtml(m)+'</div></div>';
}

function msgActionsHtml(m){
  if(m.loading)return'';
  var id=esc(m.id);
  if(m.role==='user'){
    return'<div class="message-actions"><button class="msg-action-btn" data-action="edit-message" data-id="'+id+'">'+I.edit+' Edit</button><button class="msg-action-btn" data-action="copy-message" data-id="'+id+'">'+I.copy+' Copy</button></div>';
  }
  var contBtn=m.finishReason==='length'?'<button class="msg-action-btn primary" data-action="continue" data-id="'+id+'">'+I.refresh+' Continue</button>':'';
  return'<div class="message-actions">'+contBtn+'<button class="msg-action-btn" data-action="regenerate" data-id="'+id+'">'+I.refresh+' Retry</button><button class="msg-action-btn" data-action="copy-message" data-id="'+id+'">'+I.copy+' Copy</button><button class="msg-action-btn" data-action="download-message" data-id="'+id+'">'+I.download+' Save</button></div>';
}

function searchCard(msg){
  var s=msg&&msg.webSearch;if(!s)return'';
  var results=Array.isArray(s.results)?s.results:[];
  var rows=results.slice(0,6).map(function(r){return'<li>'+(r.url?'<a href="'+esc(r.url)+'" target="_blank" rel="noopener">'+esc(r.title||r.url)+'</a>':esc(r.title||''))+'</li>';}).join('');
  var srcs=rows?'<details class="search-card-sources"><summary>Sources</summary><ol>'+rows+'</ol></details>':'';
  var status=s.error?'Failed: '+s.error:results.length+' result'+(results.length===1?'':'s');
  return'<div class="search-card"><div class="search-card-kicker">Web Search</div><div class="search-card-title">'+esc(s.query||'Search')+'</div><div class="search-card-meta">'+esc(s.provider||'search')+' - '+esc(status)+'</div>'+srcs+'</div>';
}

function stripBlocks(t){return String(t||'').replace(/\n?\s*\[(?:Attached|Att)(?: file)?:[\s\S]*$/i,'').trim();}

function renderMsgs(){
  var c=document.getElementById('chatMessages');if(!c||!S.currentChat)return;
  if(!S.currentChat.messages.length){c.innerHTML=welcomeHtml();updateTopBar();return;}
  c.innerHTML=S.currentChat.messages.map(function(m){return msgHtml(m);}).join('');
  if(S.scrollLocked)scrollBottom(false);
  updateTopBar();
}

function updateMsgDom(msg){
  if(!msg||!msg.id||!S.currentChat)return;
  var existing=document.getElementById('msg_'+msg.id);
  if(!existing){renderMsgs();return;}
  var w=document.createElement('div');
  w.innerHTML=msgHtml(msg).trim();
  var n=w.firstElementChild;
  if(!n){renderMsgs();return;}
  existing.replaceWith(n);
  document.querySelectorAll('.think-panel').forEach(function(p){
    var tid=p.dataset.thinkId;
    if(tid){if(p.open)S.openThinking.add(tid);else S.openThinking.delete(tid);}
  });
  if(S.currentChat.messages[S.currentChat.messages.length-1]&&S.currentChat.messages[S.currentChat.messages.length-1].id===msg.id&&S.scrollLocked)scrollBottom(false);
}

function updateTopBar(){
  var t=document.getElementById('chatTitle'),m=document.getElementById('modeBadge');
  if(t)t.textContent=S.currentChat&&S.currentChat.title||'New Chat';
  if(m)m.textContent=(MODES.find(function(x){return x.key===S.settings.currentMode;})||MODES[0]).label;
}

function scrollBottom(smooth){
  var c=document.getElementById('chatArea');
  if(c)requestAnimationFrame(function(){c.scrollTo({top:c.scrollHeight,behavior:smooth?'smooth':'auto'});});
}

function onScroll(){
  var c=document.getElementById('chatArea');if(!c)return;
  S.scrollLocked=c.scrollHeight-c.scrollTop-c.clientHeight<80;
}

function renderModes(){
  var el=document.getElementById('modeNav');if(!el)return;
  var iconMap={chat:I.chat,code:I.code,book:I.book,doc:I.doc,idea:I.idea,data:I.data,web:I.web,img:I.img,mic:I.mic,gear:I.gear};
  el.innerHTML=MODES.map(function(m){
    var svg=iconMap[m.icon]||I.gear;
    return'<div class="sidebar-item'+(S.settings.currentMode===m.key?' active':'')+'" data-action="set-mode" data-mode="'+m.key+'"><span style="width:22px;min-width:22px;height:20px;border-radius:5px;display:inline-flex;align-items:center;justify-content:center;background:var(--accent-dim);border:1px solid var(--accent-strong);color:var(--accent);font-size:8px;font-weight:800">'+esc(m.label.slice(0,3).toUpperCase())+'</span><div style="min-width:0"><div style="font-size:12px;font-weight:600">'+esc(m.label)+'</div><div style="font-size:10px;color:var(--text-tertiary);white-space:normal;line-height:1.2">'+esc(m.desc)+'</div></div></div>';
  }).join('');
}

function renderHistory(){
  var el=document.getElementById('chatHistory');if(!el)return;
  var q=(S.chatSearch||'').toLowerCase().trim();
  var chats=S.chats.slice();
  if(q)chats=chats.filter(function(c){return(c.title||'New Chat').toLowerCase().includes(q);});
  chats.sort(function(a,b){return Number(!!b.pinned)-Number(!!a.pinned);});
  if(!chats.length){
    el.innerHTML=q?'<div style="padding:10px 12px;font-size:12px;color:var(--text-tertiary)">No matches</div>':'';
  }else{
    el.innerHTML=chats.slice(0,150).map(function(c){
      var id=esc(c.id),active=S.currentChat&&S.currentChat.id===c.id?' active':'',pinned=c.pinned?' pinned':'';
      return'<div class="chat-history-item'+active+pinned+'" data-action="select-chat" data-chat-id="'+id+'">'+I.chat+'<span class="chat-history-title">'+esc(c.title||'New Chat')+'</span><span class="chat-history-actions"><button class="chat-action-btn" data-action="pin-chat" data-chat-id="'+id+'" title="'+(c.pinned?'Unpin':'Pin')+'">'+I.pin+'</button><button class="chat-action-btn" data-action="rename-chat" data-chat-id="'+id+'" title="Rename">'+I.edit+'</button><button class="chat-action-btn danger" data-action="delete-chat" data-chat-id="'+id+'" title="Delete">'+I.trash+'</button></span></div>';
    }).join('');
  }
  var cb=document.getElementById('clearHistoryBtn');if(cb)cb.style.display=S.chats.length?'flex':'none';
}

// â”€â”€ Model Browser
function filteredModels(){
  var search=(document.getElementById('modelSearch')&&document.getElementById('modelSearch').value||'').toLowerCase().trim();
  var models=S.liveModels.slice();
  if(S.modelFilter==='favorites')models=models.filter(function(m){return S.favourites.has(m.id);});
  else if(S.modelFilter!=='all')models=models.filter(function(m){return m.capabilities&&m.capabilities.includes(S.modelFilter);});
  if(search)models=models.filter(function(m){return (m.name+' '+m.id+' '+m.desc+' '+(m.capabilities||[]).join(' ')).toLowerCase().includes(search);});
  var recent=new Map((S.settings.recentModelIds||[]).map(function(id,idx){return[id,idx];}));
  return models.sort(function(a,b){
    return Number(S.favourites.has(b.id))-Number(S.favourites.has(a.id))||
      (recent.has(a.id)?recent.get(a.id):99)-(recent.has(b.id)?recent.get(b.id):99)||
      Number(b.capabilities&&b.capabilities.includes('free_endpoint'))-Number(a.capabilities&&a.capabilities.includes('free_endpoint'))||
      (a.name||a.id).localeCompare(b.name||b.id);
  });
}

function renderModelBrowser(){
  var list=document.getElementById('modelList'),meta=document.getElementById('modelMeta');
  if(!list)return;
  var models=filteredModels();
  if(!S.liveModels.length){
    list.innerHTML='<div class="empty-state"><div class="empty-state-icon">'+I.model+'</div><div class="empty-state-title">No models loaded</div><div class="empty-state-desc">Add your API key and click refresh.</div></div>';
    if(meta)meta.textContent='';return;
  }
  if(!models.length){
    list.innerHTML='<div class="empty-state"><div class="empty-state-icon">'+I.search+'</div><div class="empty-state-title">No matches</div><div class="empty-state-desc">Try a different filter or search.</div></div>';
    if(meta)meta.textContent=S.liveModels.length+' total - '+S.favourites.size+' favorites';return;
  }

  var recent=new Set(S.settings.recentModelIds||[]);
  var current=curModel();

  var renderCards=function(items){
    return items.map(function(m){
      var status=m.catalogOnly?'Catalog':m.capabilities&&m.capabilities.includes('free_endpoint')?'Free':m.capabilities&&m.capabilities.includes('api')?'API':'Live';
      var sClass=m.catalogOnly?'catalog':m.capabilities&&m.capabilities.includes('free_endpoint')?'free':'api';
      var marker=S.favourites.has(m.id)?'Favorite':recent.has(m.id)?'Recent':'';
      var notes=[];
      if(m.capabilities&&m.capabilities.includes('reasoning'))notes.push('Reasoning');
      if(m.capabilities&&m.capabilities.includes('coding'))notes.push('Coding');
      if(m.capabilities&&m.capabilities.includes('vision'))notes.push('Vision');
      if(m.capabilities&&m.capabilities.includes('fast'))notes.push('Fast');
      return'<div class="model-item'+(current&&current.id===m.id?' selected':'')+'" data-action="select-model" data-model-id="'+esc(m.id)+'"><button class="model-fav-btn'+(S.favourites.has(m.id)?' active':'')+'" data-action="toggle-fav" data-model-id="'+esc(m.id)+'">'+(S.favourites.has(m.id)?'\u2605':'\u2606')+'</button><div class="model-info"><div class="model-name-row"><div class="model-name">'+esc(m.name)+'</div><span class="model-status-pill '+sClass+'">'+esc(status)+'</span></div><div class="model-id">'+esc(m.id)+'</div>'+(marker?'<div style="font-size:10px;color:var(--text-tertiary)">'+esc(marker)+'</div>':'')+(notes.length?'<div class="model-notes">'+esc(notes.slice(0,2).join(' \u00B7 '))+'</div>':'')+capHtml(m)+'</div></div>';
    }).join('');
  };

  var searchInput=document.getElementById('modelSearch');
  if(S.modelFilter==='all'&&!(searchInput&&(searchInput.value||'').trim())){
    var fav=models.filter(function(m){return S.favourites.has(m.id);});
    var rec=models.filter(function(m){return recent.has(m.id)&&!S.favourites.has(m.id);});
    var other=models.filter(function(m){return!S.favourites.has(m.id)&&!recent.has(m.id);});
    var s=[];
    if(fav.length)s.push('<div class="model-section-label"><strong>Favorites</strong><span>'+fav.length+'</span></div>'+renderCards(fav));
    if(rec.length)s.push('<div class="model-section-label"><strong>Recents</strong><span>'+rec.length+'</span></div>'+renderCards(rec));
    s.push('<div class="model-section-label"><strong>All Models</strong><span>'+other.length+'</span></div>'+renderCards(other));
    list.innerHTML=s.join('');
  }else{
    list.innerHTML=renderCards(models);
  }
  if(meta)meta.textContent=models.length+' shown - '+S.liveModels.length+' total - '+S.favourites.size+' favorites';
}

function setModelFilter(filter,el){
  S.modelFilter=filter;
  document.querySelectorAll('[data-action="model-filter"]').forEach(function(b){b.classList.toggle('active',el?b===el:b.dataset.filter===filter);});
  renderModelBrowser();
}

function selectModel(id){
  var m=S.liveModels.find(function(x){return x.id===id;});
  if(m&&m.catalogOnly)toast('Catalog-only: chat may fail','warning');
  S.settings.currentModelId=id;
  S.settings.recentModelIds=[id].concat(S.settings.recentModelIds.filter(function(x){return x!==id;})).slice(0,5);
  syncTokens();saveSettings();
  updateModelLabel();renderModelBrowser();updateStatus();updateSendBtn();
  closeModal('modelModal');
  toast('Model selected');
}

function toggleFav(id,e){if(e)e.stopPropagation();if(S.favourites.has(id))S.favourites.delete(id);else S.favourites.add(id);saveFavs();renderModelBrowser();}

function updateModelLabel(){
  var m=curModel();
  var l=document.getElementById('selectedModelName');if(l)l.textContent=m?m.name:'Select model';
}

// â”€â”€ Send / Streaming
function updateSendBtn(){
  var inp=document.getElementById('inputBox'),btn=document.getElementById('sendBtn');if(!btn)return;
  if(S.isBusy){
    btn.disabled=false;btn.dataset.action='stop';btn.classList.add('stop');
    btn.setAttribute('aria-label','Stop');btn.innerHTML=I.stop;return;
  }
  var hasText=!!(inp&&inp.value&&inp.value.trim());
  var hasFiles=S.attachments.length>0;
  btn.dataset.action='send';btn.classList.remove('stop');
  btn.setAttribute('aria-label','Send');btn.innerHTML=I.send;
  btn.disabled=(!hasText&&!hasFiles)||!S.settings.apiKey||!curModel();
}

function handleKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}}
function autoResize(el){
  if(!el)return;var max=mobile()?120:160;
  el.style.height='auto';var h=Math.min(el.scrollHeight,max);
  el.style.height=h+'px';el.style.overflowY=el.scrollHeight>max?'auto':'hidden';
}

function stopResponse(){
  if(!S.isBusy&&!S.abortCtrl)return;
  S.stopReq=true;
  try{if(S.abortCtrl)S.abortCtrl.abort('Stopped');}catch(e){}
  var msg=S.assistantId?getMsg(S.assistantId):null;
  if(msg){msg.loading=false;msg.status='Stopped';if(!msg.content&&!msg.thinking)msg.content='Stopped.';dEvent(msg,'Stopped');updateMsgDom(msg);}
  S.isBusy=false;S.abortCtrl=null;S.assistantId=null;
  saveChats();renderMsgs();updateSendBtn();toast('Stopped');
}

function makeUserMsg(text){
  return{id:uid('msg'),role:'user',content:text,time:now(),attachments:S.attachments.map(function(a){return Object.assign({},a);})};
}
function makeAsstMsg(model){
  return{id:uid('msg'),role:'assistant',content:'',thinking:'',model:model&&model.name||'NViMi',time:now(),loading:true,status:'Waiting...',webSearch:null,finishReason:null};
}
function makeSysMsg(){
  var mode=MODES.find(function(m){return m.key===S.settings.currentMode;})||MODES[0];
  var agent=AGENTS.find(function(a){return a.key===S.settings.currentAgent;})||AGENTS[0];
  var parts=[mode.prompt||''];
  if(agent&&agent.prompt)parts.push(agent.prompt);
  if(S.settings.plugins.webSearch&&S.settings.plugins.webSearchMode==='always')parts.push('Use web search when helpful.');
  if(!S.settings.plugins.fileReader)parts.push('Do not use file reader tools.');
  if(S.settings.customPrompt&&S.settings.currentMode==='custom')parts.push(S.settings.customPrompt);
  var full=parts.filter(Boolean).join('\n\n').trim();
  return full?{role:'system',content:full}:null;
}

async function sendMsg(userText,opts){
  opts=opts||{};
  var inp=document.getElementById('inputBox');
  var text=typeof userText==='string'?userText.trim():(inp&&inp.value?inp.value.trim():'');
  var appendUser=opts.appendUser!==false;
  if(!text&&!S.attachments.length)return;
  if(S.isBusy)return;
  if(!S.settings.apiKey){toast('Enter API key in Settings','error');openModal('settingsModal');return;}
  if(!curModel()){toast('Select a model first','error');openModelBrowser();return;}

  var chat=S.currentChat;if(!chat)chat=createChat();

  if(appendUser&&S.editMsgId){
    var idx=chat.messages.findIndex(function(m){return m.id===S.editMsgId;});
    if(idx>=0){
      chat.messages=chat.messages.slice(0,idx+1);
      var msg=chat.messages[idx];
      msg.content=text;msg.attachments=S.attachments.map(function(a){return Object.assign({},a);});
      msg.edited=true;msg.editedAt=Date.now();msg.time=now();
      if(S.settings.showThinking)msg.thinking='';
    }
    S.editMsgId=null;
    var eb=document.getElementById('editBanner');if(eb)eb.style.display='none';
  }else if(appendUser){
    chat.messages.push(makeUserMsg(text));
  }

  if(appendUser){
    clearAttach();
    if(inp){inp.value='';inp.style.height='auto';inp.style.overflowY='hidden';}
  }
  var model=curModel();
  var asst=makeAsstMsg(model);
  chat.messages.push(asst);
  S.assistantId=asst.id;
  S.isBusy=true;S.stopReq=false;S.scrollLocked=true;
  saveChats();renderMsgs();updateSendBtn();scrollBottom(false);

  try{await callStream(asst,model,chat.messages);}
  catch(err){if(!S.stopReq){asst.loading=false;asst.status='Error';dEvent(asst,'Error',String(err&&err.message||err));asst.content='Request failed: '+String(err&&err.message||err);updateMsgDom(asst);toast(String(err&&err.message||err),'error');saveChats();}}
  finally{S.isBusy=false;S.abortCtrl=null;S.assistantId=null;saveChats();renderMsgs();updateSendBtn();}
}

async function callStream(asst,model,allMsgs){
  var url=apiUrl('/chat/completions');
  var ctrl=new AbortController();
  S.abortCtrl=ctrl;
  var stream=S.settings.stream;
  var profile=modelProfile(model);
  var extras=reasoningBody(model);

  var latest=allMsgs.slice(-20).map(function(m){return{role:m.role,content:msgContent(m.content,m.attachments)};});
  var sys=makeSysMsg();
  var msgs=sys?[sys].concat(latest):latest;
  var payload={model:model.id,messages:msgs,temperature:Number(S.settings.temperature)||0.7,max_tokens:Math.min(tokenLimit(model),Math.max(32768,intV(S.settings.maxTokens)||0)),stream:stream};
  Object.keys(extras).forEach(function(k){payload[k]=extras[k];});
  if(stream&&profile.ns)delete payload.stream;

  ensureDbg(asst);
  dEvent(asst,'Sending','stream='+(!!payload.stream));

  var opts={method:'POST',headers:apiHeaders(!!payload.stream),body:JSON.stringify(payload),signal:ctrl.signal};
  try{
    var resp=await ft(url,opts,TIMEOUTS.total);
    var dbg=ensureDbg(asst);
    if(dbg){dbg.http={status:resp.status};dEvent(asst,'HTTP',''+resp.status);}

    if(!resp.ok){
      var rt=await resp.text().catch(function(){return'';});
      dEvent(asst,'HTTP error',resp.status+' '+rt.slice(0,200));
      if(retryable(resp.status)&&slash(S.settings.proxyUrl)){
        dEvent(asst,'Retry','Direct after proxy fail');
        var du=NVIDIA_API+'/chat/completions';
        var dh=directHeaders(!!payload.stream);
        var dr=await ft(du,{method:'POST',headers:dh,body:JSON.stringify(payload),signal:ctrl.signal},TIMEOUTS.total);
        if(!dr.ok){
          var dt=await dr.text().catch(function(){return'';});
          if(payload.stream&&retryable(dr.status)){
            dEvent(asst,'Retry','Non-stream direct');
            var da=Object.assign({},payload,{stream:false});delete da.stream;
            var dar=await ft(du,{method:'POST',headers:directHeaders(false),body:JSON.stringify(da),signal:ctrl.signal},TIMEOUTS.nonStream);
            if(!dar.ok){var e=await dar.text().catch(function(){return'';});throw new Error('Direct fail: '+dar.status+' - '+e.slice(0,200));}
            await handleResp(dar,asst,false,model);return;
          }
          throw new Error('Direct fail: '+dr.status+' - '+dt.slice(0,200));
        }
        await handleResp(dr,asst,!!payload.stream,model);return;
      }
      if(resp.status===422&&payload.stream&&profile.ns){
        dEvent(asst,'Retry','Non-stream');
        var a=Object.assign({},payload,{stream:false});delete a.stream;
        var ar=await ft(url,{method:'POST',headers:apiHeaders(false),body:JSON.stringify(a),signal:ctrl.signal},TIMEOUTS.nonStream);
        if(!ar.ok){var e=await ar.text().catch(function(){return'';});throw new Error('Fallback fail: '+ar.status+' - '+e.slice(0,200));}
        await handleResp(ar,asst,false,model);return;
      }
      if(resp.status===429){
        var ra=Number(resp.headers&&(resp.headers.get('retry-after')||resp.headers.get('Retry-After'))||0);
        var delay=ra>0?Math.min(30000,ra*1e3):1500;
        toast('Rate limited. Retrying...','warning');
        await new Promise(function(r){setTimeout(r,delay);});
        var rr=await ft(url,opts,TIMEOUTS.total);
        if(!rr.ok){var e=await rr.text().catch(function(){return'';});throw new Error(rr.status===524?'NVIDIA still processing. Try again.':'Retry fail: '+rr.status+' - '+e.slice(0,200));}
        await handleResp(rr,asst,!!payload.stream,model);return;
      }
      throw new Error('HTTP '+resp.status+': '+rt.slice(0,300));
    }
    await handleResp(resp,asst,!!payload.stream,model);
  }catch(err){
    if(err&&err.name==='AbortError'||S.stopReq)throw err;
    if(Object.keys(extras).length>0&&profile.stripR){
      dEvent(asst,'Retry','Without reasoning');
      var clean=stripR(payload);
      var fr=await ft(url,{method:'POST',headers:apiHeaders(!!clean.stream),body:JSON.stringify(clean),signal:ctrl.signal},TIMEOUTS.total);
      if(!fr.ok){var e=await fr.text().catch(function(){return'';});throw new Error(fr.status===524?'Still waiting. Try another model.':'Fallback fail: '+fr.status+' - '+e.slice(0,200));}
      await handleResp(fr,asst,!!clean.stream,model);return;
    }
    throw err;
  }
}

async function readStream(reader,tMs){
  if(!tMs||tMs<=0)return reader.read();
  var timer;
  var timeout=new Promise(function(_,rej){timer=setTimeout(function(){rej(new Error('Stream timeout'));},tMs);});
  try{return await Promise.race([reader.read(),timeout]);}
  finally{clearTimeout(timer);}
}

async function handleResp(resp,asst,streaming,model){
  if(!resp.body){var t=await resp.text().catch(function(){return'';});asst.content=String(asst.content||'')+t;asst.loading=false;asst.status='Done';updateMsgDom(asst);return;}
  var reader=resp.body.getReader();
  var dec=new TextDecoder();
  var buf='';
  asst.status='Reading...';
  dEvent(asst,'Reading','streaming='+streaming);

  if(!streaming){
    var chunks=[];
    while(true){if(S.stopReq)break;var r1=await readStream(reader,TIMEOUTS.nonStream);if(r1.done)break;chunks.push(dec.decode(r1.value,{stream:false}));}
    var full=chunks.join('');
    await parseShot(full,asst,model);return;
  }

  var start=Date.now();var first=false;
  while(true){
    if(S.stopReq)break;
    var tMs=first?TIMEOUTS.idle:Math.max(TIMEOUTS.idle,TIMEOUTS.firstToken-(Date.now()-start));
    if(tMs<=0&&!first){asst.content='Model took too long. Try again.';asst.loading=false;asst.status='Timeout';updateMsgDom(asst);return;}
    var r2=await readStream(reader,Math.max(0,tMs)||TIMEOUTS.idle);
    if(r2.done)break;first=true;
    buf+=dec.decode(r2.value,{stream:true});
    var lines=buf.split('\n');buf=lines.pop()||'';
    for(var i=0;i<lines.length;i++){
      var line=lines[i];
      var t=line.trim();if(!t)continue;
      if(t.startsWith('event:'))continue;
      var dm=t.match(/^data:\s*(.*)/);
      if(!dm)continue;
      var data=dm[1].trim();
      if(data==='[DONE]'){asst.loading=false;asst.status='Done';updateMsgDom(asst);return;}
      var pr=parseStream(data,asst);
      if(pr&&pr.finishReason)applyFinish(asst,pr.finishReason);
    }
  }
  asst.loading=false;asst.status='Done';updateMsgDom(asst);
}

async function parseShot(full,asst,model){
  if(!full.trim()){asst.loading=false;asst.status='Empty';updateMsgDom(asst);return;}
  try{
    var json=JSON.parse(full);
    var choice=json.choices&&json.choices[0];if(!choice)throw new Error('No choices');
    var msg=choice.message;
    if(msg&&msg.content)asst.content=String(asst.content||'')+cstr(msg.content);
    if(msg&&msg.reasoning_content)appReasoning(asst,msg.reasoning_content);
    if(choice.finish_reason)applyFinish(asst,choice.finish_reason);
    asst.loading=false;asst.status='Done';updateMsgDom(asst);
  }catch(e){
    var cbm=full.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if(cbm){await parseShot(cbm[1],asst,model);return;}
    asst.content=String(asst.content||'')+full;
    asst.loading=false;asst.status='Done';updateMsgDom(asst);
  }
}

function parseStream(data,asst){
  var dbg=ensureDbg(asst);
  if(dbg)dbg.counters.sse++;
  try{
    var json=JSON.parse(data);
    if(dbg)dbg.counters.json++;
    var choice=json.choices&&json.choices[0];if(!choice)return null;
    var delta=choice.delta;if(!delta)return null;
    var changed=false;
    if(delta.content){var v=appContent(asst,delta.content);changed=changed||v;if(v&&dbg)dbg.counters.contentD++;}
    if(delta.reasoning_content){var vr=appReasoning(asst,delta.reasoning_content);changed=changed||vr;if(vr&&dbg)dbg.counters.reasonD++;}
    if(changed)updateMsgDom(asst);
    return{finishReason:choice.finish_reason||json.finish_reason};
  }catch(e){return null;}
}

// â”€â”€ Copy / Download
function copyText(text){
  navigator.clipboard.writeText(text).then(function(){toast('Copied');}).catch(function(){
    var el=document.createElement('textarea');el.value=text;document.body.appendChild(el);el.select();document.execCommand('copy');document.body.removeChild(el);toast('Copied');
  });
}
function copyMsg(id){var m=getMsg(id);if(!m||!m.content){toast('Nothing to copy','warning');return;}copyText(m.content);}
function copyFromPayload(data){if(!data)return;if(Array.isArray(data))copyText(data.map(function(f){return'// '+f.filename+'\n'+f.code;}).join('\n\n'));else if(data.code)copyText(data.code);}
function downloadMsg(id){
  var m=getMsg(id);if(!m||!m.content)return;
  var blob=new Blob([stripBlocks(m.content)],{type:'text/markdown'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=((S.currentChat&&S.currentChat.title||'chat').replace(/[^a-z0-9]/gi,'_')+'_'+m.role+'_'+(m.time||'msg').replace(/[:\s]/g,'_')+'.md');
  a.click();URL.revokeObjectURL(a.href);toast('Downloaded');
}
function downloadFromPayload(data){
  if(!data)return;
  if(Array.isArray(data)){if(data.length===1){dlSingle(data[0].filename,data[0].code);return;}dlZip(data.map(function(f){return{name:f.filename,content:f.code};}),'generated_files.zip');}
  else if(data.code&&data.filename)dlSingle(data.filename,data.code);
}
function dlSingle(fn,content){
  var blob=new Blob([content],{type:'text/plain'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;a.click();URL.revokeObjectURL(a.href);toast('Downloaded '+fn);
}
function dlZip(entries,fn){
  fn=fn||'files.zip';
  var zip=buildZip(entries);var a=document.createElement('a');a.href=URL.createObjectURL(zip);a.download=fn;a.click();URL.revokeObjectURL(a.href);toast('Downloaded '+fn);
}
function previewArtifacts(data){
  if(!data||!data.length){toast('Nothing to preview','warning');return;}
  var html=buildPreview(data);
  if(!html){toast('No HTML to preview','warning');return;}
  var blob=new Blob([html],{type:'text/html'});
  var url=URL.createObjectURL(blob);
  window.open(url,'_blank');setTimeout(function(){URL.revokeObjectURL(url);},30000);
}
function buildPreview(files){
  var byName=new Map(files.map(function(f){return[String(f.filename||'').toLowerCase().split('/').pop(),f];}));
  var hf=files.find(function(f){return/^index\.html?$/i.test(String(f.filename||'').split('/').pop());})||files.find(function(f){return/\.html?$/i.test(f.filename||'');});
  if(!hf)return'';
  var html=String(hf.code||'');
  var css=files.filter(function(f){return/\.css$/i.test(f.filename||'')&&!html.includes(String(f.filename||'').split('/').pop());});
  var js=files.filter(function(f){return/\.(m?js|jsx)$/i.test(f.filename||'')&&!html.includes(String(f.filename||'').split('/').pop());});
  var injCss=css.map(function(f){return'<style>'+f.code+'</style>';}).join('\n');
  var injJs=js.map(function(f){return'<script>'+String(f.code||'').replace(/<\/script/gi,'<\\/script')+'</script>';}).join('\n');
  html=html.replace(/<link\b[^>]+href=["']([^"']+)["'][^>]*>/gi,function(t,href){var f=byName.get(String(href||'').split('/').pop().toLowerCase());return f&&/\.css$/i.test(f.filename||'')?'<style>'+f.code+'</style>':t;});
  html=html.replace(/<script\b[^>]+src=["']([^"']+)["'][^>]*><\/script>/gi,function(t,src){var f=byName.get(String(src||'').split('/').pop().toLowerCase());return f&&/\.(m?js|jsx)$/i.test(f.filename||'')?'<script>'+String(f.code||'').replace(/<\/script/gi,'<\\/script')+'</script>':t;});
  if(injCss)html=/<\/head>/i.test(html)?html.replace(/<\/head>/i,injCss+'\n</head>'):injCss+'\n'+html;
  if(injJs)html=/<\/body>/i.test(html)?html.replace(/<\/body>/i,injJs+'\n</body>'):html+'\n'+injJs;
  return html;
}

// â”€â”€ Edit / Regenerate / Continue
function editMsg(id){
  var m=getMsg(id);if(!m)return;
  S.editMsgId=id;
  var inp=document.getElementById('inputBox');if(inp){inp.value=stripBlocks(m.content||'');inp.focus();autoResize(inp);}
  var eb=document.getElementById('editBanner');if(eb)eb.style.display='flex';
}
function cancelEdit(){
  S.editMsgId=null;
  var eb=document.getElementById('editBanner');if(eb)eb.style.display='none';
  var inp=document.getElementById('inputBox');if(inp){inp.value='';inp.style.height='auto';}
}

async function regenerateMsg(id){
  var m=getMsg(id);if(!m)return;
  var idx=(S.currentChat&&S.currentChat.messages||[]).findIndex(function(x){return x.id===id;});if(idx<0)return;
  if(S.isBusy){toast('Wait for current response','warning');return;}
  if(!confirm('Regenerate?'))return;
  var model=curModel();
  var asst=makeAsstMsg(model);
  S.currentChat.messages=S.currentChat.messages.slice(0,idx);
  S.currentChat.messages.push(asst);
  S.assistantId=asst.id;
  S.isBusy=true;S.stopReq=false;S.scrollLocked=true;
  saveChats();renderMsgs();updateSendBtn();scrollBottom(false);
  try{await callStream(asst,model,S.currentChat.messages);}
  catch(err){if(!S.stopReq){asst.loading=false;asst.status='Error';asst.content='Error: '+String(err&&err.message||err);updateMsgDom(asst);toast(String(err&&err.message||err),'error');saveChats();}}
  finally{S.isBusy=false;S.abortCtrl=null;S.assistantId=null;saveChats();renderMsgs();updateSendBtn();}
}

async function continueResponse(id){
  var msg=getMsg(id);if(!msg||msg.role!=='assistant')return;
  if(msg.finishReason!=='length'){toast('Not length-limited','warning');return;}
  if(S.isBusy){toast('Wait for current response','warning');return;}
  var prompt='Continue from where you left off. Resume without repeating.';
  var chat=S.currentChat;if(!chat)return;
  chat.messages.push(makeUserMsg(prompt));
  saveChats();renderMsgs();scrollBottom(false);
  await sendMsg(prompt,{appendUser:false});
}

// â”€â”€ Web Search
async function webSearch(query){
  var p=S.settings.plugins;
  if(!p.webSearch)return{error:'Disabled',results:[]};
  if(!p.webSearchApiKey||!p.webSearchApiKey.trim())return{error:'No API key',results:[]};
  try{
    var url='https://api.search.brave.com/res/v1/web/search?q='+encodeURIComponent(query)+'&count='+Math.min(Math.max(p.webSearchResults||6,1),10)+'&safesearch=moderate&text_decorations=0';
    var resp=await fetch(url,{headers:{'Accept':'application/json','X-Subscription-Token':p.webSearchApiKey.trim()}});
    if(!resp.ok){var t=await resp.text().catch(function(){return'';});throw new Error(resp.status+': '+t.slice(0,200));}
    var data=await resp.json();
    return{query:query,provider:'brave',results:(data.web&&data.web.results||[]).map(function(r){return{title:r.title||'No title',url:r.url||'',description:r.description||''};})};
  }catch(err){return{query:query,provider:'brave',error:String(err&&err.message||err),results:[]};}
}
function shouldSearch(input){
  var p=S.settings.plugins;
  if(!p.webSearch)return false;
  return p.webSearchMode==='always'||((p.webSearchMode||'auto')==='auto'&&/(?:search|look up|find|latest|current|news|weather|price|stock|recent)/i.test(input));
}

// â”€â”€ Voice
async function setupVoice(){
  try{var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return null;var r=new SR();r.continuous=false;r.interimResults=true;r.lang='en-US';return r;}catch(e){return null;}
}
function startVoice(){
  var btn=document.getElementById('voiceBtn');
  if(S.voiceRec){try{S.voiceRec.stop();}catch(e){}S.voiceRec=null;if(btn)btn.classList.remove('recording');return;}
  setupVoice().then(function(r){
    if(!r){toast('Voice unavailable','warning');return;}
    S.voiceRec=r;if(btn)btn.classList.add('recording');
    var final='';
    r.onresult=function(e){
      var interim='';
      for(var i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)final+=e.results[i][0].transcript;else interim+=e.results[i][0].transcript;}
      var inp=document.getElementById('inputBox');if(inp){inp.value=final+interim;autoResize(inp);updateSendBtn();}
    };
    r.onerror=function(e){toast('Voice: '+e.error,'warning');if(btn)btn.classList.remove('recording');S.voiceRec=null;};
    r.onend=function(){if(btn)btn.classList.remove('recording');S.voiceRec=null;};
    r.start();
  });
}

// â”€â”€ Status
function updateStatus(){
  var m=curModel();
  var av=document.getElementById('statusAvatar'),nm=document.getElementById('statusName'),st=document.getElementById('statusText');
  if(!av||!nm||!st)return;
  av.textContent=(S.settings.userName||'U').slice(0,1).toUpperCase();
  nm.textContent=S.settings.userName||'User';
  if(!S.settings.apiKey){st.textContent='No API key';return;}
  if(!m){st.textContent='No model selected';return;}
  st.textContent=m.name;
}

// â”€â”€ Theme
function applyTheme(){
  var theme=S.settings.theme||'dark';
  document.body.dataset.theme=theme;
  if(theme==='dark')return;
  var tokens={
    '--bg-base':'#ffffff','--bg-elevated':'#f8f9fa','--bg-surface':'#f1f3f5',
    '--bg-hover':'#e9ecef','--bg-active':'#dee2e6',
    '--text-primary':'#1a1a2e','--text-secondary':'#495057',
    '--text-tertiary':'#868e96','--text-disabled':'#adb5bd',
    '--border-subtle':'rgba(0,0,0,0.06)','--border-default':'rgba(0,0,0,0.1)',
    '--border-strong':'rgba(0,0,0,0.14)',
  };
  Object.keys(tokens).forEach(function(k){document.documentElement.style.setProperty(k,tokens[k]);});
}

// â”€â”€ Modals / Panels
function openModal(id){var el=document.getElementById(id);if(el)el.classList.add('open');}
function closeModal(id){var el=document.getElementById(id);if(el)el.classList.remove('open');}
function openPanel(title,html){
  var panel=document.getElementById('sidePanel'),overlay=document.getElementById('panelOverlay');
  if(!panel||!overlay)return;
  document.getElementById('panelTitle').textContent=title;
  document.getElementById('panelBody').innerHTML=html;
  overlay.classList.add('open');panel.classList.add('open');
}
function closePanel(){var o=document.getElementById('panelOverlay'),p=document.getElementById('sidePanel');if(o)o.classList.remove('open');if(p)p.classList.remove('open');}
function openModelBrowser(){renderModelBrowser();openModal('modelModal');}
function closeModelBrowser(){closeModal('modelModal');}

// â”€â”€ Toast
function toast(message,type){
  type=type||'success';
  var c=document.getElementById('toastContainer');if(!c)return;
  var t=document.createElement('div');t.className='toast '+type;
  var icon=type==='error'?'!':type==='warning'?'?':I.check;
  t.innerHTML='<span class="toast-icon">'+icon+'</span><span class="toast-text">'+esc(message)+'</span>';
  c.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transform='translateX(100%)';setTimeout(function(){t.remove();},300);},3500);
}

// â”€â”€ Render All
function renderAll(){
  renderModes();renderHistory();renderMsgs();
  renderAttach();updateModelLabel();updateTopBar();
  updateStatus();updateSendBtn();
}

// â”€â”€ Drafts
function captureDraft(){
  var inp=document.getElementById('inputBox');if(inp&&S.currentChat)S.currentChat.draft=inp.value||'';
}
function restoreDraft(){
  var inp=document.getElementById('inputBox');if(inp&&S.currentChat){inp.value=S.currentChat.draft||'';autoResize(inp);}
}

// â”€â”€ Settings
function renderSettings(){
  var body=document.getElementById('settingsBody');if(!body)return;
  var m=curModel();
  body.innerHTML='<div class="settings-body">'+
    '<div><div class="settings-section-title">Connection</div>'+
    '<div class="settings-row"><label class="settings-label">NVIDIA API Key</label><div class="settings-desc">Your nvapi- key. Stored only in this browser.</div><input type="password" class="settings-input" id="sApiKey" value="'+esc(S.settings.apiKey||'')+'" placeholder="nvapi-xxxxxxxx" autocomplete="off" autocapitalize="none" spellcheck="false"></div>'+
    '<div class="settings-row"><label class="settings-label">Worker URL</label><div class="settings-desc">Cloudflare proxy. Leave blank for direct.</div><input type="url" class="settings-input" id="sProxy" value="'+esc(S.settings.proxyUrl||DEFAULT_PROXY)+'" placeholder="https://..." autocomplete="off" autocapitalize="none" spellcheck="false"></div>'+
    '<div class="settings-row"><label class="settings-label">Your Name</label><input type="text" class="settings-input" id="sName" value="'+esc(S.settings.userName||'User')+'" placeholder="User"></div>'+
    '<div class="btn-row" style="margin-top:8px"><button class="btn btn-sec" data-action="test-connection">Test</button><button class="btn btn-sec" data-action="refresh-models">Refresh Models</button><button class="btn btn-sec" data-action="clear-key">Clear Key</button></div>'+
    '<div id="connStatus" class="connection-status" style="display:none;margin-top:8px"></div></div>'+

    '<div><div class="settings-section-title">Model & Response</div>'+
    '<div class="settings-row"><label class="settings-label">Temperature</label><div class="settings-desc">Lower = focused, higher = creative (0&ndash;2)</div><div class="slider-row"><input type="range" class="settings-slider" id="sTemp" min="0" max="2" step="0.1" value="'+(S.settings.temperature||0.7)+'"><span class="slider-value" id="sTempVal">'+(S.settings.temperature||0.7)+'</span></div></div>'+
    '<div class="settings-row"><label class="settings-label">Max Tokens</label><div class="settings-desc">Output limit. Auto-capped to model capabilities.</div><select class="settings-select" id="sTokens">'+tokenOptions(tokenLimit(m))+'</select></div>'+
    '<div class="settings-row"><label class="settings-label">Stream Responses</label><select class="settings-select" id="sStream"><option value="yes"'+(S.settings.stream?' selected':'')+'>Yes</option><option value="no"'+(S.settings.stream?'':' selected')+'>No</option></select></div></div>'+

    '<div><div class="settings-section-title">Activity & Debug</div>'+
    '<div class="settings-row"><label class="settings-label">Activity Panel</label><select class="settings-select" id="sThink"><option value="yes"'+(S.settings.showThinking?' selected':'')+'>Show</option><option value="no"'+(S.settings.showThinking?'':' selected')+'>Hide</option></select></div>'+
    '<div class="settings-row"><label class="settings-label">Request Reasoning</label><div class="settings-desc">Ask models to expose reasoning. Retries without if rejected.</div><select class="settings-select" id="sForce"><option value="yes"'+(S.settings.forceReasoning?' selected':'')+'>Yes</option><option value="no"'+(S.settings.forceReasoning?'':' selected')+'>No</option></select></div>'+
    '<div class="settings-row"><label class="settings-label">Debug Events</label><select class="settings-select" id="sDiag"><option value="yes"'+(S.settings.streamDiagnostics?' selected':'')+'>Show</option><option value="no"'+(S.settings.streamDiagnostics?'':' selected')+'>Hide</option></select></div></div>'+

    '<div><div class="settings-section-title">App</div>'+
    '<div class="settings-row"><label class="settings-label">Theme</label><select class="settings-select" id="sTheme"><option value="dark"'+((S.settings.theme||'dark')==='dark'?' selected':'')+'>Dark</option><option value="light"'+(S.settings.theme==='light'?' selected':'')+'>Light</option></select></div>'+
    '<div class="settings-row"><label class="settings-label">Custom Prompt</label><div class="settings-desc">Active when mode is set to Custom.</div><textarea class="settings-input" id="sPrompt" rows="3" placeholder="Your system prompt...">'+esc(S.settings.customPrompt||'')+'</textarea></div>'+
    '<div class="btn-row" style="margin-top:8px"><button class="btn btn-sec" data-action="export-settings">Export</button><button class="btn btn-sec" data-action="import-settings">Import</button></div>'+
    '<div class="settings-row" style="margin-top:12px"><button class="btn btn-danger" data-action="clear-cache">Clear All Data & Reload</button></div></div>'+
    '</div>';

  var ts=document.getElementById('sTemp'),tv=document.getElementById('sTempVal');
  if(ts&&tv)ts.addEventListener('input',function(){tv.textContent=ts.value;});
}

function saveSettingsValues(){
  var ak=document.getElementById('sApiKey')&&document.getElementById('sApiKey').value?document.getElementById('sApiKey').value.trim():S.settings.apiKey;
  var pr=document.getElementById('sProxy')&&document.getElementById('sProxy').value?document.getElementById('sProxy').value.trim():S.settings.proxyUrl;
  var nm=document.getElementById('sName')&&document.getElementById('sName').value?document.getElementById('sName').value.trim():S.settings.userName;
  var tp=parseFloat(document.getElementById('sTemp')&&document.getElementById('sTemp').value)||0.7;
  var tk=parseInt(document.getElementById('sTokens')&&document.getElementById('sTokens').value)||32768;
  var st=(document.getElementById('sStream')&&document.getElementById('sStream').value||'yes')==='yes';
  var th=(document.getElementById('sThink')&&document.getElementById('sThink').value||'yes')==='yes';
  var fr=(document.getElementById('sForce')&&document.getElementById('sForce').value||'yes')==='yes';
  var di=(document.getElementById('sDiag')&&document.getElementById('sDiag').value||'no')==='yes';
  var theme=document.getElementById('sTheme')&&document.getElementById('sTheme').value||'dark';
  var cp=document.getElementById('sPrompt')&&document.getElementById('sPrompt').value?document.getElementById('sPrompt').value.trim():S.settings.customPrompt;
  S.settings=Object.assign({},S.settings,{apiKey:ak,proxyUrl:slash(pr)||DEFAULT_PROXY,userName:nm||'User',temperature:tp,maxTokens:tk,stream:st,showThinking:th,forceReasoning:fr,streamDiagnostics:di,theme:theme,customPrompt:cp});
  saveSettings();applyTheme();updateStatus();updateSendBtn();updateModelLabel();
  closeModal('settingsModal');toast('Settings saved');
}

function openSettingsModal(){renderSettings();openModal('settingsModal');}

// â”€â”€ Plugins / Agents / Guide / Status Panels
function openPluginsPanel(){
  var p=S.settings.plugins;
  var content='<div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em">Plugins</div>'+
    '<div class="plugin-item'+(p.webSearch?'':' disabled')+'"><div class="plugin-icon">'+I.search+'</div><div class="plugin-info"><div class="plugin-name">Web Search</div><div class="plugin-desc">Search the web for live info (requires Brave API key).</div></div><button class="toggle-switch'+(p.webSearch?' on':'')+'" data-action="toggle-web-search"></button></div>'+
    '<div class="plugin-item'+(p.fileReader?'':' disabled')+'"><div class="plugin-icon">'+I.doc+'</div><div class="plugin-info"><div class="plugin-name">File Reader</div><div class="plugin-desc">Read text files in messages.</div></div><button class="toggle-switch'+(p.fileReader?' on':'')+'" data-action="toggle-file-reader"></button></div>'+
    '<div class="plugin-item'+(p.downloadButtons?'':' disabled')+'"><div class="plugin-icon">'+I.download+'</div><div class="plugin-info"><div class="plugin-name">Download Buttons</div><div class="plugin-desc">Copy/Download on code blocks.</div></div><button class="toggle-switch'+(p.downloadButtons?' on':'')+'" data-action="toggle-download"></button></div>'+
    '<div class="plugin-item'+(p.artifactPreview?'':' disabled')+'"><div class="plugin-icon">'+I.eye+'</div><div class="plugin-info"><div class="plugin-name">Artifact Preview</div><div class="plugin-desc">Open HTML previews in new tab.</div></div><button class="toggle-switch'+(p.artifactPreview?' on':'')+'" data-action="toggle-artifact"></button></div>'+
    '<div class="plugin-item'+(p.thinkingDisplay?'':' disabled')+'"><div class="plugin-icon">'+I.activity+'</div><div class="plugin-info"><div class="plugin-name">Activity Panel</div><div class="plugin-desc">Show reasoning and stream activity.</div></div><button class="toggle-switch'+(p.thinkingDisplay?' on':'')+'" data-action="toggle-thinking"></button></div>'+
    '<div style="font-size:12px;font-weight:700;color:var(--accent);margin:16px 0 10px;text-transform:uppercase;letter-spacing:.05em">Search Settings</div>'+
    '<div class="settings-row"><label class="settings-label">Brave API Key</label><input type="password" class="settings-input" id="plgKey" value="'+esc(p.webSearchApiKey||'')+'" placeholder="Brave Search API key..." autocomplete="off"></div>'+
    '<div class="settings-row"><label class="settings-label">Results</label><input type="number" class="settings-input" id="plgCount" value="'+(p.webSearchResults||6)+'" min="1" max="10"></div>'+
    '<div class="settings-row"><label class="settings-label">Mode</label><select class="settings-select" id="plgMode"><option value="auto"'+(p.webSearchMode==='auto'?' selected':'')+'>Auto</option><option value="always"'+(p.webSearchMode==='always'?' selected':'')+'>Always</option><option value="manual"'+(p.webSearchMode==='manual'?' selected':'')+'>Manual</option></select></div>'+
    '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px"><button class="btn btn-sec" data-action="close-panel">Close</button><button class="btn btn-pri" data-action="save-plugins">Save</button></div>';
  openPanel('Plugins',content);
}

function savePluginSettings(){
  var p=S.settings.plugins;
  var key=document.getElementById('plgKey')&&document.getElementById('plgKey').value?document.getElementById('plgKey').value.trim():'';
  var count=Math.max(1,Math.min(10,intV(document.getElementById('plgCount')&&document.getElementById('plgCount').value)||p.webSearchResults||6));
  var mode=document.getElementById('plgMode')&&document.getElementById('plgMode').value||'auto';
  S.settings.plugins=Object.assign({},p,{webSearchApiKey:key,webSearchResults:count,webSearchMode:mode});
  saveSettings();toast(key?'Brave key saved':'Settings saved');openPluginsPanel();
}

function openAgentsPanel(){
  var content='<div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em">Agents</div><p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px">Choose an agent to specialise AI behaviour.</p>'+
    AGENTS.map(function(a){return'<div class="agent-card'+(S.settings.currentAgent===a.key?' selected':'')+'" data-action="select-agent" data-agent="'+a.key+'"><div class="agent-header"><div class="agent-avatar">'+esc(a.name.slice(0,2).toUpperCase())+'</div><div><div class="agent-name">'+esc(a.name)+'</div><div class="agent-role">'+esc(a.role)+'</div></div></div><div class="agent-desc">'+(a.prompt||'No special instructions.')+'</div></div>';}).join('');
  openPanel('Agents',content);
}

function openGuidePanel(){
  var content='<div class="guide-card"><h3>NViMi AI Guide</h3><p>A premium chat interface for NVIDIA AI models. Connect your API key, load models, and start chatting.</p></div>'+
    '<div class="guide-row"><h4>Keyboard Shortcuts</h4><p><kbd>Ctrl</kbd>+<kbd>K</kbd> New chat &middot; <kbd>Ctrl</kbd>+<kbd>S</kbd> Settings &middot; <kbd>Ctrl</kbd>+<kbd>B</kbd> Sidebar &middot; <kbd>/</kbd> Focus input &middot; <kbd>Esc</kbd> Stop/Close &middot; <kbd>Shift</kbd>+<kbd>Enter</kbd> Newline</p></div>'+
    '<div class="guide-row"><h4>Modes</h4><p>Switch between Chat, Code, Research, Writing, Creative, Data, Web, Images, Voice, and Custom. Each changes the system prompt sent to the model.</p></div>'+
    '<div class="guide-row"><h4>File Uploads</h4><p>Click the paperclip or drag files. Supports images (PNG, JPEG, WebP, GIF, HEIC up to 8MB), text files (up to 2MB), ZIP archives (up to 50MB), and web manifests.</p></div>'+
    '<div class="guide-row"><h4>Model Browser</h4><p>Click the model indicator in the composer footer. Use filters (Favorites, Free, Reasoning, Coding, Vision, Fast, API), search by name, and star models.</p></div>'+
    '<div class="guide-row"><h4>Generated Files</h4><p>When the model produces code with filename headers, a file panel appears with copy, download, and ZIP options.</p></div>'+
    '<div class="guide-row"><h4>Token Limits</h4><p>Max tokens follow the model capability. If a response hits the limit, use Continue or increase the limit in Settings.</p></div>';
  openPanel('Guide',content);
}

function openStatusPanel(){
  var m=curModel();
  var content='<div class="status-card"><h3>Connection</h3><p><strong>Proxy:</strong> '+esc(S.settings.proxyUrl||'Direct')+'</p><p><strong>API Key:</strong> '+(S.settings.apiKey?'Set':'Not set')+'</p><p><strong>Models:</strong> '+S.liveModels.length+' loaded</p><p><strong>Current:</strong> '+(m?esc(m.name):'None')+'</p></div>'+
    '<div class="status-card"><h3>App</h3><p><strong>Version:</strong> '+APP_VERSION+'</p><p><strong>Build:</strong> '+BUILD_ID+'</p><p><strong>Chats:</strong> '+S.chats.length+'</p><p><strong>Favorites:</strong> '+S.favourites.size+'</p></div>'+
    '<div class="status-card"><h3>Settings</h3><p><strong>Stream:</strong> '+(S.settings.stream?'Yes':'No')+'</p><p><strong>Thinking:</strong> '+(S.settings.showThinking?'Yes':'No')+'</p><p><strong>Tokens:</strong> '+S.settings.maxTokens+'</p><p><strong>Theme:</strong> '+S.settings.theme+'</p></div>';
  openPanel('Status',content);
}

// â”€â”€ Share
function shareChat(){
  var chat=S.currentChat;if(!chat||!chat.messages.length){toast('Nothing to share','warning');return;}
  var text=chat.messages.map(function(m){return(m.role==='user'?(S.settings.userName||'You'):'NViMi')+': '+stripBlocks(m.content||'');}).join('\n\n');
  copyText(text);toast('Chat copied');
}

// â”€â”€ Connection
async function testConnection(){
  var st=document.getElementById('connStatus');if(st){st.style.display='block';st.textContent='Testing...';st.className='connection-status';}
  try{
    var models=await fetchModels();
    S.liveModels=models.map(normModel).filter(Boolean);saveModels();
    if(st){st.textContent='Connected! '+S.liveModels.length+' models.';st.className='connection-status success';}
    updateModelLabel();updateStatus();updateSendBtn();
  }catch(err){if(st){st.textContent='Failed: '+String(err&&err.message||err);st.className='connection-status error';}toast('Failed: '+String(err&&err.message||err),'error');}
}

async function refreshModels(){
  if(S.modelRefreshBusy)return;
  S.modelRefreshBusy=true;setRefreshBusy(true);toast('Loading models...');
  try{
    var models=await fetchModels();
    S.liveModels=models.map(normModel).filter(Boolean);saveModels();
    updateModelLabel();updateStatus();updateSendBtn();toast(S.liveModels.length+' models loaded');
  }catch(err){toast('Failed: '+String(err&&err.message||err),'error');}
  finally{S.modelRefreshBusy=false;setRefreshBusy(false);}
}

async function fetchModels(){
  var proxy=slash(S.settings.proxyUrl);
  var du=NVIDIA_API+'/models';
  var pu=proxy?proxy+'/v1/models':null;
  var cu=proxy?proxy+'/v1/build-models':null;
  var dp=ft(du,{method:'GET',headers:{Authorization:'Bearer '+(S.settings.apiKey||'')}},120000).then(async function(r){if(!r.ok)throw new Error('Direct '+r.status);return(await r.json()).data||[];});
  var pp=pu?ft(pu,{method:'GET',headers:{Authorization:'Bearer '+(S.settings.apiKey||''),'X-Nvidia-Api-Key':S.settings.apiKey||''}},120000).then(async function(r){if(!r.ok)throw new Error('Proxy '+r.status);return(await r.json()).data||[];}):Promise.resolve([]);
  var cp=cu?ft(cu,{method:'GET'},120000).then(async function(r){if(!r.ok)throw new Error('Catalog '+r.status);var j=await r.json();return Array.isArray(j.models)?j.models:(Array.isArray(j.data)?j.data:[]);}):Promise.resolve([]);
  var dr=[],pr=[],cr=[];
  try{dr=await dp;}catch(e){}try{pr=await pp;}catch(e){}try{cr=await cp;}catch(e){}
  if(!dr.length&&!pr.length&&!cr.length){
    if(cr.length>0)return cr;
    throw new Error('No models returned');
  }
  var seen=new Set();var merged=[];
  [].concat(dr,pr,cr).forEach(function(m){
    var id=m.id||m.name||m.model||m.modelId;if(!id||seen.has(id))return;seen.add(id);
    merged.push(m);
  });
  return merged;
}

function setRefreshBusy(busy){
  document.querySelectorAll('[data-action="refresh-models"]').forEach(function(btn){
    if(!btn)return;
    btn.disabled=!!busy;
    btn.classList.toggle('loading',!!busy);
    if(!btn.dataset.originLabel)btn.dataset.originLabel=btn.getAttribute('aria-label')||btn.textContent||'Refresh models';
    if(btn.querySelector('svg'))return;
    if('textContent' in btn)btn.textContent=busy?'Loading...':btn.dataset.originLabel;
  });
}

function isModelStale(){
  return !S.modelRefreshAt||(Date.now()-S.modelRefreshAt)>TIMEOUTS.modelCache;
}

async function maybeRefresh(force){
  if(!S.settings.apiKey||S.modelRefreshBusy)return false;
  if(!force&&!isModelStale())return false;
  try{await refreshModels();return true;}catch(e){return false;}
}

function clearKey(){
  if(!confirm('Clear API key?'))return;S.settings.apiKey='';saveSettings();
  var el=document.getElementById('sApiKey');if(el)el.value='';toast('Key cleared');
}

// â”€â”€ Import / Export
function exportSettings(){
  var data={settings:S.settings,favourites:Array.from(S.favourites)};
  var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='nvimi-v7-'+new Date().toISOString().slice(0,10)+'.json';a.click();URL.revokeObjectURL(a.href);toast('Exported');
}
function importSettings(){
  var inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';
  inp.onchange=async function(){
    var f=inp.files&&inp.files[0];if(!f)return;
    try{var t=await readTextF(f);var d=JSON.parse(t);
      if(d.settings){S.settings=Object.assign({},S.settings,d.settings);S.settings.plugins=Object.assign({},DEFAULT_PLUGINS,d.settings.plugins||{});}
      if(Array.isArray(d.favourites))S.favourites=new Set(d.favourites);
      saveSettings();saveFavs();applyTheme();renderAll();toast('Imported');
    }catch(err){toast('Import failed: '+String(err&&err.message||err),'error');}
  };inp.click();
}

// â”€â”€ Cache
function clearCacheAndReload(){
  if(!confirm('Clear ALL data and reload?'))return;
  try{localStorage.clear();toast('Cleared. Reloading...');setTimeout(function(){location.reload();},500);}
  catch(err){toast('Failed: '+String(err&&err.message||err),'error');}
}

// â”€â”€ Onboarding
function handleOnboard(saveAndLoad){
  var ak=document.getElementById('obApiKey')&&document.getElementById('obApiKey').value?document.getElementById('obApiKey').value.trim():'';
  var pr=document.getElementById('obProxy')&&document.getElementById('obProxy').value?document.getElementById('obProxy').value.trim():'';
  var nm=document.getElementById('obName')&&document.getElementById('obName').value?document.getElementById('obName').value.trim():'';
  if(ak)S.settings.apiKey=ak;
  if(pr)S.settings.proxyUrl=slash(pr)||DEFAULT_PROXY;
  if(nm)S.settings.userName=nm||'User';
  saveSettings();
  localStorage.setItem(KEYS.onboarded,'true');
  var el=document.getElementById('onboardOverlay');if(el)el.classList.remove('open');
  updateStatus();updateSendBtn();
  if(saveAndLoad&&S.settings.apiKey)refreshModels();
}
function maybeShowOnboard(){
  if(!S.settings.apiKey&&!localStorage.getItem(KEYS.onboarded)){
    var el=document.getElementById('onboardOverlay');if(el)el.classList.add('open');
  }
}

// â”€â”€ Events
function setupEvents(){
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-action]');if(!el)return;
    var action=el.dataset.action;
    switch(action){
      case'send':sendMsg();break;
      case'stop':stopResponse();break;
      case'attach':{var fi=document.getElementById('fileInput');if(fi)fi.click();break;}
      case'voice':startVoice();break;
      case'new-chat':newChat();break;
      case'select-chat':selectChat(el.dataset.chatId);break;
      case'pin-chat':pinChat(el.dataset.chatId);break;
      case'rename-chat':renameChat(el.dataset.chatId);break;
      case'delete-chat':deleteChat(el.dataset.chatId,e);break;
      case'chat-search':S.chatSearch=el.value;renderHistory();break;
      case'clear-all-chats':clearAll();break;
      case'set-mode':S.settings.currentMode=el.dataset.mode;saveSettings();renderModes();updateTopBar();toast('Mode: '+(MODES.find(function(m){return m.key===el.dataset.mode;})||{}).label||el.dataset.mode);break;
      case'open-settings':openSettingsModal();break;
      case'close-settings':closeModal('settingsModal');break;
      case'save-settings':saveSettingsValues();break;
      case'open-model-browser':openModelBrowser();break;
      case'close-model-browser':closeModelBrowser();break;
      case'model-filter':setModelFilter(el.dataset.filter,el);break;
      case'select-model':selectModel(el.dataset.modelId);break;
      case'toggle-fav':toggleFav(el.dataset.modelId,e);break;
      case'refresh-models':refreshModels();break;
      case'test-connection':testConnection();break;
      case'clear-key':clearKey();break;
      case'export-settings':exportSettings();break;
      case'import-settings':importSettings();break;
      case'clear-cache':clearCacheAndReload();break;
      case'copy-message':copyMsg(el.dataset.id);break;
      case'copy-code':copyFromPayload(readP(el));break;
      case'copy-all-files':copyFromPayload(readP(el));break;
      case'download-code':downloadFromPayload(readP(el));break;
      case'download-message':downloadMsg(el.dataset.id);break;
      case'download-zip':downloadFromPayload(readP(el));break;
      case'download-all-files':downloadFromPayload(readP(el));break;
      case'preview-artifacts':previewArtifacts(readP(el));break;
      case'regenerate':regenerateMsg(el.dataset.id);break;
      case'continue':continueResponse(el.dataset.id);break;
      case'edit-message':editMsg(el.dataset.id);break;
      case'cancel-edit':cancelEdit();break;
      case'share':shareChat();break;
      case'plugins':openPluginsPanel();break;
      case'agents':openAgentsPanel();break;
      case'guide':openGuidePanel();break;
      case'status':openStatusPanel();break;
      case'close-panel':closePanel();break;
      case'select-agent':S.settings.currentAgent=el.dataset.agent;saveSettings();toast('Agent: '+(AGENTS.find(function(a){return a.key===el.dataset.agent;})||{}).name||el.dataset.agent);closePanel();break;
      case'remove-attachment':removeAttach(el.dataset.attId);break;
      case'onboard-save':handleOnboard(true);break;
      case'onboard-skip':handleOnboard(false);break;
      case'toggle-sidebar':{var sb=document.getElementById('sidebar');if(sb)sb.classList.toggle('collapsed');document.body.classList.toggle('sidebar-open');break;}
      case'close-sidebar':{var sb2=document.getElementById('sidebar');if(sb2)sb2.classList.add('collapsed');document.body.classList.remove('sidebar-open');break;}
      case'toggle-web-search':S.settings.plugins.webSearch=!S.settings.plugins.webSearch;saveSettings();openPluginsPanel();break;
      case'toggle-file-reader':S.settings.plugins.fileReader=!S.settings.plugins.fileReader;saveSettings();openPluginsPanel();break;
      case'toggle-download':S.settings.plugins.downloadButtons=!S.settings.plugins.downloadButtons;saveSettings();openPluginsPanel();break;
      case'toggle-artifact':S.settings.plugins.artifactPreview=!S.settings.plugins.artifactPreview;saveSettings();openPluginsPanel();break;
      case'toggle-thinking':S.settings.plugins.thinkingDisplay=!S.settings.plugins.thinkingDisplay;S.settings.showThinking=S.settings.plugins.thinkingDisplay;saveSettings();openPluginsPanel();break;
      case'save-plugins':savePluginSettings();break;
    }
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(document.getElementById('settingsModal')&&document.getElementById('settingsModal').classList.contains('open')){closeModal('settingsModal');return;}
      if(document.getElementById('modelModal')&&document.getElementById('modelModal').classList.contains('open')){closeModelBrowser();return;}
      if(document.getElementById('sidePanel')&&document.getElementById('sidePanel').classList.contains('open')){closePanel();return;}
      if(S.isBusy){stopResponse();return;}
    }
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();newChat();}
    if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();openSettingsModal();}
    if((e.ctrlKey||e.metaKey)&&e.key==='b'){e.preventDefault();var sb=document.getElementById('sidebar');if(sb)sb.classList.toggle('collapsed');document.body.classList.toggle('sidebar-open');}
    if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey){var inp=document.getElementById('inputBox');if(inp&&document.activeElement!==inp){e.preventDefault();inp.focus();}}
  });

  var inputBox=document.getElementById('inputBox');
  if(inputBox){
    inputBox.addEventListener('keydown',handleKey);
    inputBox.addEventListener('input',function(){autoResize(inputBox);updateSendBtn();});
    inputBox.addEventListener('blur',captureDraft);
  }

  var fileInput=document.getElementById('fileInput');
  if(fileInput){fileInput.addEventListener('change',function(){if(fileInput.files&&fileInput.files.length){addAttachments(fileInput.files);fileInput.value='';}});}

  var composerBox=document.getElementById('composerBox');
  if(composerBox){
    composerBox.addEventListener('dragover',function(e){e.preventDefault();e.stopPropagation();composerBox.classList.add('drag-over');});
    composerBox.addEventListener('dragleave',function(e){e.preventDefault();e.stopPropagation();composerBox.classList.remove('drag-over');});
    composerBox.addEventListener('drop',function(e){e.preventDefault();e.stopPropagation();composerBox.classList.remove('drag-over');if(e.dataTransfer)addAttachments(e.dataTransfer.files);});
  }

  document.addEventListener('dragover',function(e){if(e.dataTransfer&&e.dataTransfer.types&&e.dataTransfer.types.includes('Files')){e.preventDefault();document.body.classList.add('dragging');}});
  document.addEventListener('dragleave',function(){document.body.classList.remove('dragging');});
  document.addEventListener('drop',function(){document.body.classList.remove('dragging');});

  var chatArea=document.getElementById('chatArea');
  if(chatArea)chatArea.addEventListener('scroll',onScroll,{passive:true});

  // Model search
  var ms=document.getElementById('modelSearch');
  if(ms)ms.addEventListener('input',function(){renderModelBrowser();});

  // Visual Viewport for iOS
  if(window.visualViewport){
    var syncVv=function(){
      var vv=window.visualViewport;
      document.documentElement.style.setProperty('--vvh',(vv.height*0.01)+'px');
      document.documentElement.style.setProperty('--vv-offset',vv.offsetTop+'px');
    };
    syncVv();
    window.visualViewport.addEventListener('resize',function(){
      syncVv();
      var inp=document.getElementById('inputBox');
      var composer=document.getElementById('composer');
      if(composer&&document.activeElement===inp){
        requestAnimationFrame(function(){
          composer.scrollIntoView({behavior:'smooth',block:'end'});
          if(S.scrollLocked)scrollBottom(false);
        });
      }
    });
    window.visualViewport.addEventListener('scroll',syncVv);
  }

  window.addEventListener('resize',function(){
    if(window.visualViewport)return;
    document.documentElement.style.setProperty('--vvh','1dvh');
  });

  document.addEventListener('visibilitychange',function(){
    if(document.hidden)return;
    maybeRefresh().catch(function(){});
  });
}

function focusInput(){
  var inp=document.getElementById('inputBox');
  if(inp)setTimeout(function(){inp.focus();},100);
}

// â”€â”€ Init
function init(){
  loadState();
  setupEvents();
  renderAll();
  maybeShowOnboard();
  var vl=document.getElementById('sidebarVersion');if(vl)vl.textContent='v'+APP_VERSION;
  console.log('NViMi AI v'+APP_VERSION+' initialized');
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js?v='+APP_VERSION).catch(function(){});
  }
  maybeRefresh().catch(function(){});
}

document.fonts.ready.then(function(){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
});
