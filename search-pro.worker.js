const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const l of e.keys())if(l===F){const a=o[d-1];a<=s&&n.set(r,[e.get(l),a])}else{let a=u;for(let h=0;h<l.length;++h,++a){const m=l[h],p=i*a,f=p-i;let c=o[p];const g=Math.max(0,a-s-1),_=Math.min(i-1,a+s);for(let y=g;y<_;++y){const b=m!==t[y],z=o[f+y]+ +b,A=o[f+y+1]+1,w=o[p+y]+1,L=o[p+y+1]=Math.min(z,A,w);L<c&&(c=L)}if(c>s)continue t}W(e.get(l),t,s,n,o,a,i,r+l)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,M(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},M=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const l=new Map;l.set(u.slice(r),d),e.set(t.slice(n,n+r),l),e.delete(u),e=l}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)R(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},R=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",q="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},N=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[q]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:q,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const l of Object.keys(u)){const a=u[l],h=e._fieldIds[l],m=o.get(h);if(m==null)continue;let p=m.size;const f=e._avgFieldLength[h];for(const c of m.keys()){if(!e._documentIds.has(c)){gt(e,h,c,s),p-=1;continue}const g=i?i(e._documentIds.get(c),s,e._storedFields.get(c)):1;if(!g)continue;const _=m.get(c),y=e._fieldLength.get(c)[h],b=at(_,p,e._documentCount,y,f,r),z=n*a*g*b,A=d.get(c);if(A){A.score+=z,lt(A.terms,t);const w=N(A.match,s);w?w.push(l):A.match[s]=[l]}else d.set(c,{score:z,terms:[t],match:{[s]:[l]}})}}return d},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((c,g)=>({...c,[g]:N(n.boost,g)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:l,prefix:a}={...J.weights,...i},h=e._index.get(t.term),m=B(e,t.term,t.term,1,h,o,u,d);let p,f;if(t.prefix&&(p=e._index.atPrefix(t.term)),t.fuzzy){const c=t.fuzzy===!0?.2:t.fuzzy,g=c<1?Math.min(r,Math.round(t.term.length*c)):c;g&&(f=e._index.fuzzyGet(t.term,g))}if(p)for(const[c,g]of p){const _=c.length-t.term.length;if(!_)continue;f==null||f.delete(c);const y=a*c.length/(c.length+.3*_);B(e,t.term,c,y,g,o,u,d,m)}if(f)for(const c of f.keys()){const[g,_]=f.get(c);if(!_)continue;const y=l*c.length/(c.length+_);B(e,t.term,c,y,g,o,u,d,m)}return m},X=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(m=>X(e,m,a));return Y(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,l=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(ft(i)).map(a=>At(e,a,i));return Y(l,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const l=r.length,a={id:e._documentIds.get(u),score:i*l,terms:Object.keys(d),match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return o.sort(G),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of K(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(G),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:l},a)=>{if(l!==1&&l!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new Et(a);h._documentCount=t,h._nextId=s,h._documentIds=k(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=k(u),h._avgFieldLength=i,h._storedFields=k(r),h._dirtCount=d||0,h._index=new C;for(const[m,p]of h._documentIds)h._idToShortId.set(p,m);for(const[m,p]of e){const f=new Map;for(const c of Object.keys(p)){let g=p[c];l===1&&(g=g.ds),f.set(parseInt(c,10),k(g))}h._index.set(m,f)}return h},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(l,a=!1)=>{let h="";i===0?h=l.length>20?`… ${l.slice(-20)}`:l:a?h=l.length+i>100?`${l.slice(0,100-i)}… `:l:h=l.length>20?`${l.slice(0,20)} … ${l.slice(-20)}`:l,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const l=d+n.length;if(r(e.slice(u,d)),u=l,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),l=u.includes("#"),[a,h]=u.split(/[#@]/),m=i.sort((f,c)=>f.length-c.length).filter((f,c)=>i.slice(c+1).every(g=>!g.includes(f))),{contents:p}=n[a]??={title:"",contents:[]};if(d)p.push([{type:"customField",key:a,index:h,display:m.map(f=>o.c.map(c=>j(c,f))).flat().filter(f=>f!==null)},r]);else{const f=m.map(c=>j(o.h,c)).filter(c=>c!==null);if(f.length&&p.push([{type:l?"heading":"title",key:a,...l&&{anchor:h},display:f},r]),"t"in o)for(const c of o.t){const g=m.map(_=>j(c,_)).filter(_=>_!==null);g.length&&p.push([{type:"text",key:a,...l&&{anchor:h},display:g},r])}}}),Q(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":5,\"nextId\":5,\"documentIds\":{\"0\":\"v-28bad115\",\"1\":\"v-28bad115#heading-2\",\"2\":\"v-28bad115#heading-3\",\"3\":\"v-e1e3da16\",\"4\":\"v-564155e4\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[4],\"1\":[2,5],\"2\":[2,5],\"3\":[1],\"4\":[1]},\"averageFieldLength\":[2,3.3333333333333335],\"storedFields\":{\"0\":{\"h\":\"Movable Tree in CRDT\"},\"1\":{\"h\":\"Heading 2\",\"t\":[\"Here is the content.\"]},\"2\":{\"h\":\"Heading 3\",\"t\":[\"Here is the content.\"]},\"3\":{\"h\":\"Posts\"},\"4\":{\"h\":\"Posts\"}},\"dirtCount\":0,\"index\":[[\"posts\",{\"0\":{\"3\":1,\"4\":1}}],[\"3\",{\"0\":{\"2\":1}}],[\"content\",{\"1\":{\"1\":1,\"2\":1}}],[\"crdt\",{\"0\":{\"0\":1}}],[\"the\",{\"1\":{\"1\":1,\"2\":1}}],[\"tree\",{\"0\":{\"0\":1}}],[\"is\",{\"1\":{\"1\":1,\"2\":1}}],[\"in\",{\"0\":{\"0\":1}}],[\"here\",{\"1\":{\"1\":1,\"2\":1}}],[\"heading\",{\"0\":{\"1\":1,\"2\":1}}],[\"2\",{\"0\":{\"1\":1}}],[\"movable\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2},\"/zh/\":{\"documentCount\":10,\"nextId\":10,\"documentIds\":{\"0\":\"v-6e65ea06\",\"1\":\"v-6e65ea06#tree-data-structures-in-collaborative-applications\",\"2\":\"v-6e65ea06#怎么处理层级关系\",\"3\":\"v-6e65ea06#当前应用是如何处理异常状态的\",\"4\":\"v-6e65ea06#movable-tree-in-crdt\",\"5\":\"v-6e65ea06#lamport-timestamp\",\"6\":\"v-6e65ea06#insert-a-new-operation\",\"7\":\"v-6e65ea06#如何-undo-一个操作\",\"8\":\"v-6e65ea06#如何-apply-一个操作\",\"9\":\"v-6e65ea06#如何完成-undo-do-redo-的过程\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[5],\"1\":[7,148],\"2\":[4,146],\"3\":[8,156],\"4\":[5,151],\"5\":[3,2],\"6\":[5,56],\"7\":[5,43],\"8\":[5,94],\"9\":[9,90]},\"averageFieldLength\":[5.6,88.6],\"storedFields\":{\"0\":{\"h\":\"Movable Tree in CRDT\"},\"1\":{\"h\":\"Tree Data Structures in Collaborative Applications\",\"t\":[\"互联网使全世界的人们相互交流成为了可能，越来越多的公司通过支持远程的形式让世界各地的人才加入到自己的团队。实时协作或办公是异步协作办公变得更加普遍。远程协作办公变得如此热门除了网络基础设施越来越完善、网络传输速度越来越快之外，更加重要的一点是越来越多的基础软件支持了协作和跨端的功能，使得人们的工作流可以发生改变。\",\"例如 Figma，Dropbox 和 Google Doc 等等，这些软件背后的协作算法让远程一起工作的人们无需考虑各方的数据是怎么达到一致的，无需小心地时刻和对方沟通避免产生编辑冲突。但目前的一些特殊场景下，人们的协作体验也不是期待中的丝滑便捷，不知道你是否遇到过 Dropbox 有时会多出几个有冲突的拷贝（A conflicted copy），在和团队成员一起使用 figma 移动了一些元素到其他层级时好像这些元素突然消失了一会。这是因为这些操作都是基于树结构进行建模的，但是使基于树结构的应用达到令人满意的协同效果是非常难的一件事情。\"]},\"2\":{\"h\":\"怎么处理层级关系\",\"t\":[\"层级关系一般使用树或者森林的数据结构进行建模，对于树或者森林来讲，有三种常用操作\",\"创建一个节点作为根节点或者某个节点的子节点\",\"删除一个节点\",\"移动一个节点作为另一个节点的子节点\",\"这三种操作本质都可以被建模为相同的一种操作，move。\",\"![move modelpng](file:///Users/leon/Desktop/move%20model.png?msec=1698043703659)\",\"定义move(n, m)为移动 n 作为 m 的子节点。那么在森林中创建一个根节点就可以被表示为 move(n, none)，同时删除节点可以被表示为move(n, TRASH)。这里将TRASH定义为在森林之外的一个特殊的根节点，其后继都被表示为已删除。对于本地应用的移动操作，很容易发现可能会引起的问题，例如将a节点移动到它的子节点b的下面想成为b的子节点，操作发生时就会立刻被循环检测器检测到从而阻止此类操作并且通知给用户。但是在分布式系统下，会有很多不可预料的并行的操作发生，这可能导致树出现几种奇怪的状态。\",\"并行地移动了同一个节点，但是设置了不同的父节点，导致要么在不同父节点中出现多个此节点的备份，要么结构不再是树而是有向无环图。\",\"![sameparentpng](file:///Users/leon/Desktop/same_parent.png?msec=1698043703660)\",\"并行地移动了节点，造成了循环。\",\"![cyclepng](file:///Users/leon/Desktop/cycle.png?msec=1698043703660)\"]},\"3\":{\"h\":\"当前应用是如何处理异常状态的\",\"t\":[\"在 Dropbox 早期，他们将移动定义为先删除原始位置，再在新位置创建，这很容易导致\",\"Dropbox 是一个文件数据同步软件，当我们在多个终端移动文件时，如果产生了上述的异常状态时，Dropbox 会根据目录节点的关系保留全部的节点，所有重复的节点会创建多个副本提供给用户，让用户进一步操作 What's a conflicted copy\",\"Figma 是一个支持实时协作的一款原型设计软件，他们认为树结构是协作系统中最复杂的一部分。他们为所有元素添加一个 parent 属性来表示父节点，中心化服务器在收到多端的更新时能够检测到操作是否会构成循环，如果会构成循环那么这个操作就会被服务器拒绝。但由于网络延迟等原因的存在，在客户端收到拒绝操作的消息之前还是可能收到来自其他端可能造成循环的操作更新。Figma 认为这是一个很少见的情况，所以使用一个简单而直接的方法，在收到服务器拒绝操作的返回之前，临时地保存这种状态，并且隐藏掉产生循环的这些元素。\",\"![280f28f6e620d747f00ef024058310d07e151effgif](file:///Users/leon/Desktop/280f28f6e620d747f00ef024058310d07e151eff.gif?msec=1698043703663)\"]},\"4\":{\"h\":\"Movable Tree in CRDT\",\"t\":[\"除了以上中心化的方案之外，另一种面向树结构的协作方式就是使用 CRDT，在早期基于 CRDT 的算法实现起来复杂又有较大的额外储存开销，所以没有被在生产产品中使用。但不断地对算法进行优化和改进，有多种基于 CRDT 的树结构同步算法可以在一些生产场景下使用。我们选择了 Kleppmann et al 的 A highly-available move operation for replicated trees 算法集成到 Loro CRDT 框架中，因为他的算法足够简单也有着很高的性能。\",\"这个算法的核心思路就是，在本地应用一个移动操作时我们可以通过检测循环来判断这个操作是否是安全的，进而忽略掉不安全的操作来保证树的结构正确。在分布式的情况下，我们可以仍沿用这样的思路，虽然多端产生的操作是存在并行的，但是我们可以通过添加特殊的逻辑时间戳，使得所有的操作是可以被线性排序的。对线性排序的序列依次进行应用时，不安全操作的处理就完全等同在本地依次应用这些操作一样。\",\"基于上面的思路，那么树结构的同步一致性问题就变成以下两个问题：\",\"如何为各端每一个操作赋予一个逻辑时间戳，使得这些操作是全局有序的\",\"如何在已有序列中插入一个新操作\"]},\"5\":{\"h\":\"Lamport Timestamp\",\"t\":[\"介绍一下\"]},\"6\":{\"h\":\"Insert a new operation\",\"t\":[\"一个新操作是不是安全的，取决于应用这个操作时的树结构的状态，检测加入后是否会形成循环。所以在序列中插入一个新的操作就需要依次 undo 在末尾的操作直到可以应用新操作，之后再将 undo 过的全部 op 重新 redo 回来。\",\"这整个过程又可以被分解为\",\"如何 undo 一个操作\",\"如何应用一个操作 （如何判断一个操作是否是安全的）\"]},\"7\":{\"h\":\"如何 undo 一个操作\",\"t\":[\"我们已经将所有对树的操作都统一建模为 move 操作，undo 一个 move 操作也就是等同于将移动的节点移回旧父节点或者是删除掉这个节点。我们为了能够快速地进行 undo，所以应用每个 move 操作时都需要记录应用这个操作之前目标节点的旧父节点是哪个。\"]},\"8\":{\"h\":\"如何 apply 一个操作\",\"t\":[\"在只有 move 操作的建模情况下，只有一种情况是不安全的，就是检测到新操作会造成节点之间产生循环。判断操作是否安全的方法也非常简单，因为树的定义其中一个条件就是每一个节点只有一条连通到根节点的路径。判断时我们可以通过递归地查询要移动到的父节点的前驱，如果要移动的目标节点是要移动到的父节点本身或者其前驱，那么就会产生循环，这个操作就是不安全的。\",\"遇到不安全的操作，忽略这个操作造成的效果就不会产生循环。但是我们仍需要记录这个操作，因为一个操作是否是安全的是一个动态决定的，例如收到了排序在此操作之前的删除了造成循环的其他节点的更新，那么这个原本不安全的操作此时就是安全的了。同时我们需要标记这个操作是未生效的，因为我们在做 undo 操作时需要查询节点的旧父节点是哪个，也就是序列中目标节点是此节点的最后一个生效的操作的目标父节点。\"]},\"9\":{\"h\":\"如何完成 undo-do-redo 的过程\",\"t\":[\"循环只会发生在收到来自其他端侧的更新时发生，所以 undo-do-redo 这个过程也在这时候需要进行。在接到一个新的更新时\",\"如果新的操作是来自未来的片段那就需要缓存它，等到接受到缺失的部分时再进行应用。\",\"新的操作和已有的全部操作比较，逻辑时间戳如果均大于已有的全部操作，那么就直接应用。也就是检测是否是安全的操作，如果是安全的那么就改变当前状态否则就忽略操作的影响。\",\"如果新的操作的逻辑时间戳排序在已有序列的中间，那么就需要依次将操作从序列中 pop 出来，也就是需要移动回作为旧父节点的孩子撤销此操作造成的影响。直到新操作可以应用，新操作应用后再按序列顺序依次应用 undo 过的全部节点。\"]}},\"dirtCount\":0,\"index\":[[\"顺序\",{\"1\":{\"9\":1}}],[\"按\",{\"1\":{\"9\":1}}],[\"撤销\",{\"1\":{\"9\":1}}],[\"孩子\",{\"1\":{\"9\":1}}],[\"回\",{\"1\":{\"9\":1}}],[\"回来\",{\"1\":{\"6\":1}}],[\"出来\",{\"1\":{\"9\":1}}],[\"出现\",{\"1\":{\"2\":2}}],[\"从\",{\"1\":{\"9\":1}}],[\"从而\",{\"1\":{\"2\":1}}],[\"影响\",{\"1\":{\"9\":2}}],[\"否则\",{\"1\":{\"9\":1}}],[\"大于\",{\"1\":{\"9\":1}}],[\"均\",{\"1\":{\"9\":1}}],[\"比较\",{\"1\":{\"9\":1}}],[\"部分\",{\"1\":{\"9\":1}}],[\"缺失\",{\"1\":{\"9\":1}}],[\"接受\",{\"1\":{\"9\":1}}],[\"接到\",{\"1\":{\"9\":1}}],[\"缓存\",{\"1\":{\"9\":1}}],[\"那\",{\"1\":{\"9\":1}}],[\"那么\",{\"1\":{\"2\":1,\"3\":1,\"4\":1,\"8\":2,\"9\":3}}],[\"片段\",{\"1\":{\"9\":1}}],[\"只会\",{\"1\":{\"9\":1}}],[\"只有\",{\"1\":{\"8\":3}}],[\"做\",{\"1\":{\"8\":1}}],[\"生效\",{\"1\":{\"8\":2}}],[\"生产\",{\"1\":{\"4\":2}}],[\"未来\",{\"1\":{\"9\":1}}],[\"未\",{\"1\":{\"8\":1}}],[\"标记\",{\"1\":{\"8\":1}}],[\"决定\",{\"1\":{\"8\":1}}],[\"动态\",{\"1\":{\"8\":1}}],[\"前驱\",{\"1\":{\"8\":2}}],[\"要\",{\"1\":{\"8\":3}}],[\"要么\",{\"1\":{\"2\":2}}],[\"查询\",{\"1\":{\"8\":2}}],[\"递归\",{\"1\":{\"8\":1}}],[\"路径\",{\"1\":{\"8\":1}}],[\"连通\",{\"1\":{\"8\":1}}],[\"条件\",{\"1\":{\"8\":1}}],[\"哪个\",{\"1\":{\"7\":1,\"8\":1}}],[\"记录\",{\"1\":{\"7\":1,\"8\":1}}],[\"快速\",{\"1\":{\"7\":1}}],[\"旧父\",{\"1\":{\"7\":2,\"8\":1,\"9\":1}}],[\"移回\",{\"1\":{\"7\":1}}],[\"移动\",{\"1\":{\"1\":1,\"2\":6,\"3\":2,\"4\":1,\"7\":1,\"8\":3,\"9\":1}}],[\"统一\",{\"1\":{\"7\":1}}],[\"分解\",{\"1\":{\"6\":1}}],[\"分布式\",{\"1\":{\"4\":1}}],[\"分布式系统\",{\"1\":{\"2\":1}}],[\"整个\",{\"1\":{\"6\":1}}],[\"redo\",{\"0\":{\"9\":1},\"1\":{\"6\":1,\"9\":1}}],[\"replicated\",{\"1\":{\"4\":1}}],[\"op\",{\"1\":{\"6\":1}}],[\"operation\",{\"0\":{\"6\":1},\"1\":{\"4\":1}}],[\"直到\",{\"1\":{\"6\":1,\"9\":1}}],[\"直接\",{\"1\":{\"3\":1,\"9\":1}}],[\"末尾\",{\"1\":{\"6\":1}}],[\"undo\",{\"0\":{\"7\":1,\"9\":1},\"1\":{\"6\":3,\"7\":2,\"8\":1,\"9\":2}}],[\"users\",{\"1\":{\"2\":3,\"3\":1}}],[\"需要\",{\"1\":{\"6\":1,\"7\":1,\"8\":3,\"9\":4}}],[\"形成\",{\"1\":{\"6\":1}}],[\"形式\",{\"1\":{\"1\":1}}],[\"后\",{\"1\":{\"6\":1,\"9\":1}}],[\"后继\",{\"1\":{\"2\":1}}],[\"取决于\",{\"1\":{\"6\":1}}],[\"介绍\",{\"1\":{\"5\":1}}],[\"timestamp\",{\"0\":{\"5\":1}}],[\"trash\",{\"1\":{\"2\":2}}],[\"trees\",{\"1\":{\"4\":1}}],[\"tree\",{\"0\":{\"0\":1,\"1\":1,\"4\":1}}],[\"插入\",{\"1\":{\"4\":1,\"6\":1}}],[\"赋予\",{\"1\":{\"4\":1}}],[\"每个\",{\"1\":{\"7\":1}}],[\"每\",{\"1\":{\"4\":1,\"8\":1}}],[\"各端\",{\"1\":{\"4\":1}}],[\"各方\",{\"1\":{\"1\":1}}],[\"：\",{\"1\":{\"4\":1}}],[\"两个\",{\"1\":{\"4\":1}}],[\"以下\",{\"1\":{\"4\":1}}],[\"以上\",{\"1\":{\"4\":1}}],[\"变成\",{\"1\":{\"4\":1}}],[\"变得\",{\"1\":{\"1\":2}}],[\"上面\",{\"1\":{\"4\":1}}],[\"上述\",{\"1\":{\"3\":1}}],[\"完成\",{\"0\":{\"9\":1}}],[\"完全\",{\"1\":{\"4\":1}}],[\"完善\",{\"1\":{\"1\":1}}],[\"依次\",{\"1\":{\"4\":2,\"6\":1,\"9\":2}}],[\"序列\",{\"1\":{\"4\":2,\"6\":1,\"8\":1,\"9\":3}}],[\"排序\",{\"1\":{\"4\":2,\"8\":1,\"9\":1}}],[\"线性\",{\"1\":{\"4\":2}}],[\"戳\",{\"1\":{\"4\":2,\"9\":2}}],[\"逻辑\",{\"1\":{\"4\":2,\"9\":2}}],[\"虽然\",{\"1\":{\"4\":1}}],[\"沿用\",{\"1\":{\"4\":1}}],[\"仍\",{\"1\":{\"4\":1,\"8\":1}}],[\"正确\",{\"1\":{\"4\":1}}],[\"忽略\",{\"1\":{\"4\":1,\"8\":1,\"9\":1}}],[\"安全\",{\"1\":{\"4\":3,\"6\":2,\"8\":7,\"9\":2}}],[\"判断\",{\"1\":{\"4\":1,\"6\":1,\"8\":2}}],[\"思路\",{\"1\":{\"4\":3}}],[\"核心\",{\"1\":{\"4\":1}}],[\"性能\",{\"1\":{\"4\":1}}],[\"高\",{\"1\":{\"4\":1}}],[\"足够\",{\"1\":{\"4\":1}}],[\"他\",{\"1\":{\"4\":1}}],[\"他们\",{\"1\":{\"3\":3}}],[\"因为\",{\"1\":{\"4\":1,\"8\":3}}],[\"框架\",{\"1\":{\"4\":1}}],[\"lamport\",{\"0\":{\"5\":1}}],[\"loro\",{\"1\":{\"4\":1}}],[\"leon\",{\"1\":{\"2\":3,\"3\":1}}],[\"集成\",{\"1\":{\"4\":1}}],[\"-\",{\"0\":{\"9\":2},\"1\":{\"4\":1,\"9\":2}}],[\"highly\",{\"1\":{\"4\":1}}],[\"et\",{\"1\":{\"4\":1}}],[\"kleppmann\",{\"1\":{\"4\":1}}],[\"选择\",{\"1\":{\"4\":1}}],[\"改进\",{\"1\":{\"4\":1}}],[\"改变\",{\"1\":{\"1\":1,\"9\":1}}],[\"优化\",{\"1\":{\"4\":1}}],[\"产品\",{\"1\":{\"4\":1}}],[\"产生\",{\"1\":{\"1\":1,\"3\":2,\"4\":1,\"8\":3}}],[\"没有\",{\"1\":{\"4\":1}}],[\"开销\",{\"1\":{\"4\":1}}],[\"储存\",{\"1\":{\"4\":1}}],[\"额外\",{\"1\":{\"4\":1}}],[\"较大\",{\"1\":{\"4\":1}}],[\"又\",{\"1\":{\"4\":1,\"6\":1}}],[\"起来\",{\"1\":{\"4\":1}}],[\"实现\",{\"1\":{\"4\":1}}],[\"实时\",{\"1\":{\"1\":1,\"3\":1}}],[\"面向\",{\"1\":{\"4\":1}}],[\"方式\",{\"1\":{\"4\":1}}],[\"方案\",{\"1\":{\"4\":1}}],[\"方法\",{\"1\":{\"3\":1,\"8\":1}}],[\"gif\",{\"1\":{\"3\":1}}],[\"google\",{\"1\":{\"1\":1}}],[\"for\",{\"1\":{\"4\":1}}],[\"f28f6e620d747f00ef024058310d07e151eff\",{\"1\":{\"3\":1}}],[\"f28f6e620d747f00ef024058310d07e151effgif\",{\"1\":{\"3\":1}}],[\"file\",{\"1\":{\"2\":3,\"3\":1}}],[\"figma\",{\"1\":{\"1\":2,\"3\":2}}],[\"280\",{\"1\":{\"3\":2}}],[\"20\",{\"1\":{\"2\":1}}],[\"掉\",{\"1\":{\"3\":1,\"4\":1,\"7\":1}}],[\"隐藏\",{\"1\":{\"3\":1}}],[\"保证\",{\"1\":{\"4\":1}}],[\"保存\",{\"1\":{\"3\":1}}],[\"保留\",{\"1\":{\"3\":1}}],[\"临时\",{\"1\":{\"3\":1}}],[\"返回\",{\"1\":{\"3\":1}}],[\"而\",{\"1\":{\"3\":1}}],[\"而是\",{\"1\":{\"2\":1}}],[\"简单\",{\"1\":{\"3\":1,\"4\":1}}],[\"所以\",{\"1\":{\"3\":1,\"4\":1,\"6\":1,\"7\":1,\"9\":1}}],[\"所有\",{\"1\":{\"3\":2,\"4\":1,\"7\":1}}],[\"情况\",{\"1\":{\"3\":1,\"4\":1,\"8\":2}}],[\"见\",{\"1\":{\"3\":1}}],[\"端侧\",{\"1\":{\"9\":1}}],[\"端\",{\"1\":{\"3\":1}}],[\"端的\",{\"1\":{\"1\":1,\"3\":1}}],[\"还是\",{\"1\":{\"3\":1}}],[\"之间\",{\"1\":{\"8\":1}}],[\"之后\",{\"1\":{\"6\":1}}],[\"之前\",{\"1\":{\"3\":2,\"7\":1,\"8\":1}}],[\"之外\",{\"1\":{\"1\":1,\"2\":1,\"4\":1}}],[\"消息\",{\"1\":{\"3\":1}}],[\"消失\",{\"1\":{\"1\":1}}],[\"客户端\",{\"1\":{\"3\":1}}],[\"存在\",{\"1\":{\"3\":1,\"4\":1}}],[\"等到\",{\"1\":{\"9\":1}}],[\"等同于\",{\"1\":{\"7\":1}}],[\"等同\",{\"1\":{\"4\":1}}],[\"等\",{\"1\":{\"3\":1}}],[\"等等\",{\"1\":{\"1\":1}}],[\"延迟\",{\"1\":{\"3\":1}}],[\"由于\",{\"1\":{\"3\":1}}],[\"拒绝\",{\"1\":{\"3\":3}}],[\"构成\",{\"1\":{\"3\":2}}],[\"能够\",{\"1\":{\"3\":1,\"7\":1}}],[\"更新\",{\"1\":{\"3\":2,\"8\":1,\"9\":2}}],[\"更加\",{\"1\":{\"1\":2}}],[\"收到\",{\"1\":{\"3\":4,\"8\":1,\"9\":1}}],[\"服务器\",{\"1\":{\"3\":3}}],[\"来自\",{\"1\":{\"3\":1,\"9\":2}}],[\"来\",{\"1\":{\"3\":1,\"4\":2}}],[\"来讲\",{\"1\":{\"2\":1}}],[\"属性\",{\"1\":{\"3\":1}}],[\"添加\",{\"1\":{\"3\":1,\"4\":1}}],[\"复杂\",{\"1\":{\"3\":1,\"4\":1}}],[\"最后\",{\"1\":{\"8\":1}}],[\"最\",{\"1\":{\"3\":1}}],[\"系统\",{\"1\":{\"3\":1}}],[\"认为\",{\"1\":{\"3\":2}}],[\"设计\",{\"1\":{\"3\":1}}],[\"设置\",{\"1\":{\"2\":1}}],[\"原本\",{\"1\":{\"8\":1}}],[\"原因\",{\"1\":{\"3\":1}}],[\"原型\",{\"1\":{\"3\":1}}],[\"原始\",{\"1\":{\"3\":1}}],[\"'\",{\"1\":{\"3\":1}}],[\"what\",{\"1\":{\"3\":1}}],[\"进而\",{\"1\":{\"4\":1}}],[\"进一步\",{\"1\":{\"3\":1}}],[\"进行\",{\"1\":{\"1\":1,\"2\":1,\"4\":2,\"7\":1,\"9\":2}}],[\"提供\",{\"1\":{\"3\":1}}],[\"副本\",{\"1\":{\"3\":1}}],[\"重新\",{\"1\":{\"6\":1}}],[\"重复\",{\"1\":{\"3\":1}}],[\"重要\",{\"1\":{\"1\":1}}],[\"全局\",{\"1\":{\"4\":1}}],[\"全部\",{\"1\":{\"3\":1,\"6\":1,\"9\":3}}],[\"全世界\",{\"1\":{\"1\":1}}],[\"目标\",{\"1\":{\"7\":1,\"8\":3}}],[\"目录\",{\"1\":{\"3\":1}}],[\"目前\",{\"1\":{\"1\":1}}],[\"终端\",{\"1\":{\"3\":1}}],[\"我们\",{\"1\":{\"3\":1,\"4\":4,\"7\":2,\"8\":4}}],[\"当\",{\"1\":{\"3\":1}}],[\"当前\",{\"0\":{\"3\":1},\"1\":{\"9\":1}}],[\"文件\",{\"1\":{\"3\":2}}],[\"新\",{\"1\":{\"3\":1,\"4\":1,\"6\":3,\"8\":1,\"9\":6}}],[\"再\",{\"1\":{\"3\":1,\"6\":1,\"9\":2}}],[\"位置\",{\"1\":{\"3\":2}}],[\"早期\",{\"1\":{\"3\":1,\"4\":1}}],[\"异常\",{\"0\":{\"3\":1},\"1\":{\"3\":1}}],[\"异步\",{\"1\":{\"1\":1}}],[\"如果\",{\"1\":{\"3\":2,\"8\":1,\"9\":4}}],[\"如何\",{\"0\":{\"3\":1,\"7\":1,\"8\":1,\"9\":1},\"1\":{\"4\":2,\"6\":3}}],[\"如此\",{\"1\":{\"1\":1}}],[\"造成\",{\"1\":{\"2\":1,\"3\":1,\"8\":3,\"9\":1}}],[\"1698043703663\",{\"1\":{\"3\":1}}],[\"1698043703660\",{\"1\":{\"2\":2}}],[\"1698043703659\",{\"1\":{\"2\":1}}],[\"pop\",{\"1\":{\"9\":1}}],[\"parent\",{\"1\":{\"2\":1,\"3\":1}}],[\"png\",{\"1\":{\"2\":3}}],[\"_\",{\"1\":{\"2\":1}}],[\"s\",{\"1\":{\"3\":1}}],[\"same\",{\"1\":{\"2\":1}}],[\"sameparentpng\",{\"1\":{\"2\":1}}],[\"structures\",{\"0\":{\"1\":1}}],[\"环图\",{\"1\":{\"2\":1}}],[\"无\",{\"1\":{\"2\":1}}],[\"无需\",{\"1\":{\"1\":2}}],[\"向\",{\"1\":{\"2\":1}}],[\"结构\",{\"1\":{\"2\":1,\"4\":1}}],[\"备份\",{\"1\":{\"2\":1}}],[\"此时\",{\"1\":{\"8\":1}}],[\"此\",{\"1\":{\"2\":1,\"8\":2,\"9\":1}}],[\"此类\",{\"1\":{\"2\":1}}],[\"父\",{\"1\":{\"2\":2,\"3\":1,\"8\":3}}],[\"同步\",{\"1\":{\"3\":1,\"4\":2}}],[\"同一个\",{\"1\":{\"2\":1}}],[\"同时\",{\"1\":{\"2\":1,\"8\":1}}],[\"状态\",{\"0\":{\"3\":1},\"1\":{\"2\":1,\"3\":2,\"6\":1,\"9\":1}}],[\"奇怪\",{\"1\":{\"2\":1}}],[\"几种\",{\"1\":{\"2\":1}}],[\"几个\",{\"1\":{\"1\":1}}],[\"导致\",{\"1\":{\"2\":2,\"3\":1}}],[\"并行\",{\"1\":{\"2\":3,\"4\":1}}],[\"并且\",{\"1\":{\"2\":1,\"3\":1}}],[\"预料\",{\"1\":{\"2\":1}}],[\"用户\",{\"1\":{\"2\":1,\"3\":2}}],[\"给\",{\"1\":{\"2\":1,\"3\":1}}],[\"通知\",{\"1\":{\"2\":1}}],[\"通过\",{\"1\":{\"1\":1,\"4\":2,\"8\":1}}],[\"阻止\",{\"1\":{\"2\":1}}],[\"检测\",{\"1\":{\"2\":1,\"3\":1,\"4\":1,\"6\":1,\"8\":1,\"9\":1}}],[\"检测器\",{\"1\":{\"2\":1}}],[\"循环\",{\"1\":{\"2\":2,\"3\":4,\"4\":1,\"6\":1,\"8\":4,\"9\":1}}],[\"立刻\",{\"1\":{\"2\":1}}],[\"想\",{\"1\":{\"2\":1}}],[\"b\",{\"1\":{\"2\":2}}],[\"它\",{\"1\":{\"2\":1,\"9\":1}}],[\"问题\",{\"1\":{\"2\":1,\"4\":2}}],[\"引起\",{\"1\":{\"2\":1}}],[\"发现\",{\"1\":{\"2\":1}}],[\"发生\",{\"1\":{\"1\":1,\"2\":2,\"9\":2}}],[\"容易\",{\"1\":{\"2\":1,\"3\":1}}],[\"很少\",{\"1\":{\"3\":1}}],[\"很多\",{\"1\":{\"2\":1}}],[\"很\",{\"1\":{\"2\":1,\"3\":1,\"4\":1}}],[\"本身\",{\"1\":{\"8\":1}}],[\"本地\",{\"1\":{\"2\":1,\"4\":2}}],[\"本质\",{\"1\":{\"2\":1}}],[\"已经\",{\"1\":{\"7\":1}}],[\"已有\",{\"1\":{\"4\":1,\"9\":3}}],[\"已\",{\"1\":{\"2\":1}}],[\"其中\",{\"1\":{\"8\":1}}],[\"其\",{\"1\":{\"2\":1,\"8\":1}}],[\"其他\",{\"1\":{\"1\":1,\"3\":1,\"8\":1,\"9\":1}}],[\"将\",{\"1\":{\"2\":2,\"3\":1,\"6\":1,\"7\":2,\"9\":1}}],[\"表示\",{\"1\":{\"2\":3,\"3\":1}}],[\"就是\",{\"1\":{\"4\":2,\"7\":1,\"8\":5,\"9\":2}}],[\"就\",{\"1\":{\"2\":2,\"3\":1,\"4\":2,\"6\":1,\"8\":2,\"9\":5}}],[\"new\",{\"0\":{\"6\":1}}],[\"none\",{\"1\":{\"2\":1}}],[\"n\",{\"1\":{\"2\":4}}],[\"定义\",{\"1\":{\"2\":2,\"3\":1,\"8\":1}}],[\")\",{\"1\":{\"2\":6,\"3\":1}}],[\"=\",{\"1\":{\"2\":3,\"3\":1}}],[\"m\",{\"1\":{\"2\":2}}],[\"msec\",{\"1\":{\"2\":3,\"3\":1}}],[\"model\",{\"1\":{\"2\":1}}],[\"modelpng\",{\"1\":{\"2\":1}}],[\"move\",{\"1\":{\"2\":6,\"4\":1,\"7\":3,\"8\":1}}],[\"movable\",{\"0\":{\"0\":1,\"4\":1}}],[\"?\",{\"1\":{\"2\":3,\"3\":1}}],[\".\",{\"1\":{\"2\":3,\"3\":1}}],[\"%\",{\"1\":{\"2\":1}}],[\"/\",{\"1\":{\"2\":18,\"3\":6}}],[\":\",{\"1\":{\"2\":3,\"3\":1}}],[\"(\",{\"1\":{\"2\":6,\"3\":1}}],[\"]\",{\"1\":{\"2\":3,\"3\":1}}],[\"[\",{\"1\":{\"2\":3,\"3\":1}}],[\"!\",{\"1\":{\"2\":3,\"3\":1}}],[\"相同\",{\"1\":{\"2\":1}}],[\"相互\",{\"1\":{\"1\":1}}],[\"为了\",{\"1\":{\"7\":1}}],[\"为先\",{\"1\":{\"3\":1}}],[\"为\",{\"1\":{\"2\":6,\"3\":1,\"4\":1,\"6\":1,\"7\":1}}],[\"被\",{\"1\":{\"2\":5,\"3\":1,\"4\":2,\"6\":1}}],[\"另\",{\"1\":{\"2\":1,\"4\":1}}],[\"删除\",{\"1\":{\"2\":3,\"3\":1,\"7\":1,\"8\":1}}],[\"子\",{\"1\":{\"2\":5}}],[\"某个\",{\"1\":{\"2\":1}}],[\"根据\",{\"1\":{\"3\":1}}],[\"根\",{\"1\":{\"2\":3,\"8\":1}}],[\"作为\",{\"1\":{\"2\":3,\"9\":1}}],[\"节点\",{\"1\":{\"2\":20,\"3\":4,\"7\":5,\"8\":12,\"9\":2}}],[\"创建\",{\"1\":{\"2\":2,\"3\":2}}],[\"常用\",{\"1\":{\"2\":1}}],[\"三种\",{\"1\":{\"2\":2}}],[\"对树\",{\"1\":{\"7\":1}}],[\"对\",{\"1\":{\"4\":2}}],[\"对于\",{\"1\":{\"2\":2}}],[\"对方\",{\"1\":{\"1\":1}}],[\"森林\",{\"1\":{\"2\":4}}],[\"树\",{\"1\":{\"2\":4,\"4\":1,\"8\":1}}],[\"树结构\",{\"1\":{\"1\":2,\"3\":1,\"4\":3,\"6\":1}}],[\"关系\",{\"0\":{\"2\":1},\"1\":{\"2\":1,\"3\":1}}],[\"处理\",{\"0\":{\"2\":1,\"3\":1},\"1\":{\"4\":1}}],[\"事情\",{\"1\":{\"1\":1}}],[\"难\",{\"1\":{\"1\":1}}],[\"非常简单\",{\"1\":{\"8\":1}}],[\"非常\",{\"1\":{\"1\":1}}],[\"效果\",{\"1\":{\"1\":1,\"8\":1}}],[\"协同\",{\"1\":{\"1\":1}}],[\"协作\",{\"1\":{\"1\":6,\"3\":2,\"4\":1}}],[\"令人满意\",{\"1\":{\"1\":1}}],[\"应用\",{\"0\":{\"3\":1},\"1\":{\"1\":1,\"2\":1,\"4\":3,\"6\":3,\"7\":2,\"9\":5}}],[\"建模\",{\"1\":{\"1\":1,\"2\":2,\"7\":1,\"8\":1}}],[\"基于\",{\"1\":{\"1\":2,\"4\":3}}],[\"基础\",{\"1\":{\"1\":1}}],[\"基础设施\",{\"1\":{\"1\":1}}],[\"都\",{\"1\":{\"1\":1,\"2\":2,\"7\":2}}],[\"操作\",{\"0\":{\"7\":1,\"8\":1},\"1\":{\"1\":1,\"2\":7,\"3\":6,\"4\":10,\"6\":8,\"7\":5,\"8\":13,\"9\":11}}],[\"这时候\",{\"1\":{\"9\":1}}],[\"这样\",{\"1\":{\"4\":1}}],[\"这种\",{\"1\":{\"3\":1}}],[\"这是\",{\"1\":{\"3\":1}}],[\"这个\",{\"1\":{\"3\":1,\"4\":2,\"6\":1,\"7\":2,\"8\":5,\"9\":1}}],[\"这里\",{\"1\":{\"2\":1}}],[\"这\",{\"1\":{\"1\":1,\"2\":2,\"3\":1,\"6\":1}}],[\"这些\",{\"1\":{\"1\":3,\"3\":1,\"4\":2}}],[\"突然\",{\"1\":{\"1\":1}}],[\"好像\",{\"1\":{\"1\":1}}],[\"时间\",{\"1\":{\"4\":2,\"9\":2}}],[\"时\",{\"1\":{\"1\":1,\"2\":1,\"3\":3,\"4\":2,\"6\":1,\"7\":1,\"8\":2,\"9\":3}}],[\"时刻\",{\"1\":{\"1\":1}}],[\"层级\",{\"0\":{\"2\":1},\"1\":{\"1\":1,\"2\":1}}],[\"元素\",{\"1\":{\"1\":2,\"3\":2}}],[\"成员\",{\"1\":{\"1\":1}}],[\"成为\",{\"1\":{\"1\":1,\"2\":1}}],[\"在\",{\"1\":{\"1\":1,\"2\":4,\"3\":6,\"4\":7,\"6\":2,\"8\":3,\"9\":4}}],[\"）\",{\"1\":{\"1\":1,\"6\":1}}],[\"apply\",{\"0\":{\"8\":1}}],[\"applications\",{\"0\":{\"1\":1}}],[\"available\",{\"1\":{\"4\":1}}],[\"al\",{\"1\":{\"4\":1}}],[\"a\",{\"0\":{\"6\":1},\"1\":{\"1\":1,\"2\":1,\"3\":1,\"4\":1}}],[\"（\",{\"1\":{\"1\":1,\"6\":1}}],[\"拷贝\",{\"1\":{\"1\":1}}],[\"有序\",{\"1\":{\"4\":1}}],[\"有着\",{\"1\":{\"4\":1}}],[\"有\",{\"1\":{\"1\":1,\"2\":3,\"4\":2}}],[\"有时\",{\"1\":{\"1\":1}}],[\"会\",{\"1\":{\"1\":1,\"2\":3,\"3\":5,\"6\":1,\"8\":2}}],[\"过程\",{\"0\":{\"9\":1},\"1\":{\"6\":1,\"9\":1}}],[\"过\",{\"1\":{\"1\":1,\"6\":1,\"9\":1}}],[\"遇到\",{\"1\":{\"1\":1,\"8\":1}}],[\"你\",{\"1\":{\"1\":1}}],[\"知道\",{\"1\":{\"1\":1}}],[\"不会\",{\"1\":{\"8\":1}}],[\"不断\",{\"1\":{\"4\":1}}],[\"不再\",{\"1\":{\"2\":1}}],[\"不同\",{\"1\":{\"2\":2}}],[\"不可\",{\"1\":{\"2\":1}}],[\"不\",{\"1\":{\"1\":1,\"4\":2,\"8\":4}}],[\"不是\",{\"1\":{\"1\":1}}],[\"便捷\",{\"1\":{\"1\":1}}],[\"滑\",{\"1\":{\"1\":1}}],[\"丝\",{\"1\":{\"1\":1}}],[\"中间\",{\"1\":{\"9\":1}}],[\"中心化\",{\"1\":{\"3\":1,\"4\":1}}],[\"中\",{\"1\":{\"1\":1,\"2\":2,\"3\":1,\"4\":3,\"6\":1,\"8\":1,\"9\":1}}],[\"期待\",{\"1\":{\"1\":1}}],[\"也\",{\"1\":{\"1\":1,\"4\":1,\"7\":1,\"8\":2,\"9\":3}}],[\"体验\",{\"1\":{\"1\":1}}],[\"下面\",{\"1\":{\"2\":1}}],[\"下\",{\"1\":{\"1\":1,\"2\":1,\"4\":2,\"8\":1}}],[\"场景\",{\"1\":{\"1\":1,\"4\":1}}],[\"特殊\",{\"1\":{\"1\":1,\"2\":1,\"4\":1}}],[\"但是\",{\"1\":{\"1\":1,\"2\":2,\"4\":1,\"8\":1}}],[\"但\",{\"1\":{\"1\":1,\"3\":1,\"4\":1}}],[\"冲突\",{\"1\":{\"1\":2}}],[\"编辑\",{\"1\":{\"1\":1}}],[\"避免\",{\"1\":{\"1\":1}}],[\"沟通\",{\"1\":{\"1\":1}}],[\"地\",{\"1\":{\"1\":1,\"2\":2,\"3\":1,\"4\":1,\"7\":1,\"8\":1}}],[\"小心\",{\"1\":{\"1\":1}}],[\"达到\",{\"1\":{\"1\":2}}],[\"怎么\",{\"0\":{\"2\":1},\"1\":{\"1\":1}}],[\"数据结构\",{\"1\":{\"2\":1}}],[\"数据\",{\"1\":{\"1\":1,\"3\":1}}],[\"考虑\",{\"1\":{\"1\":1}}],[\"一条\",{\"1\":{\"8\":1}}],[\"一下\",{\"1\":{\"5\":1}}],[\"一样\",{\"1\":{\"4\":1}}],[\"一部分\",{\"1\":{\"3\":1}}],[\"一款\",{\"1\":{\"3\":1}}],[\"一种\",{\"1\":{\"2\":1,\"4\":1,\"8\":1}}],[\"一个\",{\"0\":{\"7\":1,\"8\":1},\"1\":{\"2\":6,\"3\":5,\"4\":4,\"6\":5,\"7\":1,\"8\":5,\"9\":1}}],[\"一般\",{\"1\":{\"2\":1}}],[\"一件\",{\"1\":{\"1\":1}}],[\"一会\",{\"1\":{\"1\":1}}],[\"一些\",{\"1\":{\"1\":2,\"4\":1}}],[\"一致性\",{\"1\":{\"4\":1}}],[\"一致\",{\"1\":{\"1\":1}}],[\"一起\",{\"1\":{\"1\":2}}],[\"一点\",{\"1\":{\"1\":1}}],[\"算法\",{\"1\":{\"1\":1,\"4\":6}}],[\"背后\",{\"1\":{\"1\":1}}],[\"do\",{\"0\":{\"9\":1},\"1\":{\"9\":1}}],[\"doc\",{\"1\":{\"1\":1}}],[\"desktop\",{\"1\":{\"2\":3,\"3\":1}}],[\"dropbox\",{\"1\":{\"1\":2,\"3\":3}}],[\"data\",{\"0\":{\"1\":1}}],[\"例如\",{\"1\":{\"1\":1,\"2\":1,\"8\":1}}],[\",\",{\"1\":{\"1\":1,\"2\":13,\"3\":3,\"4\":4,\"6\":3,\"8\":1,\"9\":3}}],[\"可以\",{\"1\":{\"1\":1,\"2\":3,\"4\":5,\"6\":2,\"8\":1,\"9\":1}}],[\"可能\",{\"1\":{\"1\":1,\"2\":2,\"3\":2}}],[\"流\",{\"1\":{\"1\":1}}],[\"工作\",{\"1\":{\"1\":2}}],[\"功能\",{\"1\":{\"1\":1}}],[\"跨\",{\"1\":{\"1\":1}}],[\"和\",{\"1\":{\"1\":4,\"4\":1,\"9\":1}}],[\"软件\",{\"1\":{\"1\":2,\"3\":2}}],[\"传输速度\",{\"1\":{\"1\":1}}],[\"、\",{\"1\":{\"1\":1}}],[\"网络\",{\"1\":{\"1\":2,\"3\":1}}],[\"除了\",{\"1\":{\"1\":1,\"4\":1}}],[\"热门\",{\"1\":{\"1\":1}}],[\"普遍\",{\"1\":{\"1\":1}}],[\"是不是\",{\"1\":{\"6\":1}}],[\"是因为\",{\"1\":{\"1\":1}}],[\"是否是\",{\"1\":{\"4\":1,\"6\":1,\"8\":1,\"9\":1}}],[\"是否\",{\"1\":{\"1\":1,\"3\":1,\"6\":1,\"8\":1}}],[\"是\",{\"0\":{\"3\":1},\"1\":{\"1\":5,\"2\":1,\"3\":3,\"4\":3,\"7\":2,\"8\":6,\"9\":2}}],[\"办公\",{\"1\":{\"1\":3}}],[\"或者\",{\"1\":{\"2\":3,\"7\":1,\"8\":1}}],[\"或\",{\"1\":{\"1\":1}}],[\"。\",{\"1\":{\"1\":6,\"2\":8,\"3\":4,\"4\":6,\"6\":2,\"7\":2,\"8\":6,\"9\":6}}],[\"团队\",{\"1\":{\"1\":2}}],[\"自己\",{\"1\":{\"1\":1}}],[\"到\",{\"1\":{\"1\":2,\"2\":2,\"3\":1,\"4\":1,\"8\":4,\"9\":1}}],[\"加入\",{\"1\":{\"1\":1,\"6\":1}}],[\"人才\",{\"1\":{\"1\":1}}],[\"人们\",{\"1\":{\"1\":4}}],[\"世界各地\",{\"1\":{\"1\":1}}],[\"让\",{\"1\":{\"1\":2,\"3\":1}}],[\"远程\",{\"1\":{\"1\":3}}],[\"支持\",{\"1\":{\"1\":2,\"3\":1}}],[\"公司\",{\"1\":{\"1\":1}}],[\"多端\",{\"1\":{\"4\":1}}],[\"多种\",{\"1\":{\"4\":1}}],[\"多个\",{\"1\":{\"2\":1,\"3\":2}}],[\"多出\",{\"1\":{\"1\":1}}],[\"多\",{\"1\":{\"1\":2,\"3\":1}}],[\"越来越快\",{\"1\":{\"1\":1}}],[\"越来越\",{\"1\":{\"1\":3}}],[\"，\",{\"1\":{\"1\":10,\"2\":14,\"3\":16,\"4\":14,\"6\":3,\"7\":2,\"8\":12,\"9\":8}}],[\"了\",{\"1\":{\"1\":4,\"2\":4,\"3\":1,\"4\":1,\"8\":3}}],[\"交流\",{\"1\":{\"1\":1}}],[\"的\",{\"0\":{\"3\":1,\"9\":1},\"1\":{\"1\":20,\"2\":17,\"3\":13,\"4\":24,\"6\":7,\"7\":3,\"8\":24,\"9\":17}}],[\"使用\",{\"1\":{\"1\":1,\"2\":1,\"3\":1,\"4\":3}}],[\"使得\",{\"1\":{\"1\":1,\"4\":2}}],[\"使\",{\"1\":{\"1\":2}}],[\"互联网\",{\"1\":{\"1\":1}}],[\"cycle\",{\"1\":{\"2\":1}}],[\"cyclepng\",{\"1\":{\"2\":1}}],[\"copy\",{\"1\":{\"1\":1,\"3\":1}}],[\"conflicted\",{\"1\":{\"1\":1,\"3\":1}}],[\"collaborative\",{\"0\":{\"1\":1}}],[\"crdt\",{\"0\":{\"0\":1,\"4\":1},\"1\":{\"4\":4}}],[\"insert\",{\"0\":{\"6\":1}}],[\"in\",{\"0\":{\"0\":1,\"1\":1,\"4\":1}}],[\" \",{\"0\":{\"0\":3,\"1\":5,\"4\":3,\"5\":1,\"6\":3,\"7\":2,\"8\":2,\"9\":2},\"1\":{\"1\":11,\"2\":9,\"3\":12,\"4\":20,\"6\":11,\"7\":8,\"8\":4,\"9\":6}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map
