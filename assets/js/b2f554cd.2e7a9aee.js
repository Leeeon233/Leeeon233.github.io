"use strict";(self.webpackChunkleonzhao_blog=self.webpackChunkleonzhao_blog||[]).push([[477],{10:n=>{n.exports=JSON.parse('{"blogPosts":[{"id":"/2022/07/25/crdt-toy","metadata":{"permalink":"/blog/2022/07/25/crdt-toy","editUrl":"https://github.com/Leeeon233/Leeeon233.github.io/tree/main/blog/blog/2022-07-25-crdt-toy/index.mdx","source":"@site/blog/2022-07-25-crdt-toy/index.mdx","title":"\u5982\u4f55\u4f7f\u7528CRDT\u5b9e\u73b0\u4e00\u4e2a\u7b80\u5355\u7684\u591a\u4eba\u6587\u672c\u534f\u540c\u5e94\u7528","description":"CRDTs\u5b9e\u73b0\u591a\u4eba\u6587\u672c\u534f\u4f5c\u6559\u7a0b\uff0c\u5305\u62eccrdts\u57fa\u672c\u539f\u7406\uff0c\u591a\u4e2a\u4f8b\u5b50\u4e0d\u65ad\u6e10\u8fdb\u5f0f\u6539\u8fdbcrdt\u7f16\u8f91\u5668","date":"2022-07-25T00:00:00.000Z","formattedDate":"2022\u5e747\u670825\u65e5","tags":[{"label":"crdt","permalink":"/blog/tags/crdt"},{"label":"rust","permalink":"/blog/tags/rust"},{"label":"webassembly","permalink":"/blog/tags/webassembly"},{"label":"editor","permalink":"/blog/tags/editor"}],"readingTime":19.105,"hasTruncateMarker":true,"authors":[{"name":"Leon Zhao","title":"Maintainer","url":"https://github.com/Leeeon233","imageURL":"https://avatars.githubusercontent.com/u/30241095?s=96&v=4","key":"leonzhao"}],"frontMatter":{"title":"\u5982\u4f55\u4f7f\u7528CRDT\u5b9e\u73b0\u4e00\u4e2a\u7b80\u5355\u7684\u591a\u4eba\u6587\u672c\u534f\u540c\u5e94\u7528","description":"CRDTs\u5b9e\u73b0\u591a\u4eba\u6587\u672c\u534f\u4f5c\u6559\u7a0b\uff0c\u5305\u62eccrdts\u57fa\u672c\u539f\u7406\uff0c\u591a\u4e2a\u4f8b\u5b50\u4e0d\u65ad\u6e10\u8fdb\u5f0f\u6539\u8fdbcrdt\u7f16\u8f91\u5668","authors":["leonzhao"],"keywords":["CRDT","crdt editor","crdt\u7f16\u8f91\u5668","\u591a\u4eba\u534f\u4f5c","\u53bb\u4e2d\u5fc3\u5316","Rust","webassembly"],"tags":["crdt","rust","webassembly","editor"]}},"content":"\u8fd9\u7bc7\u535a\u5ba2\u5c06\u7b80\u8981\u4ecb\u7ecd[CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)\uff08Conflict-free Replicated Data Types\uff09\u7684\u57fa\u672c\u6982\u5ff5\u4ee5\u53ca\u4ece\u5f00\u53d1\u8005\u7684\u89d2\u5ea6\u7740\u91cd\u4ecb\u7ecd\u7b80\u5355\u7684 CRDTs \u7684\u5b9e\u73b0\u6d41\u7a0b\u4e0e\u7ec6\u8282\uff08\u57fa\u4e8e*RGA \u7b97\u6cd5*\uff09\uff0c\u5e76\u4e14\u57fa\u4e8e\u8fd9\u4e9b\u77e5\u8bc6\u70b9\u5b9e\u73b0\u4e00\u4e2a rust+wasm \u7684\u7b80\u5355 web \u6587\u672c\u534f\u4f5c demo\u3002\\n\\n- \u9879\u76ee\u5730\u5740: https://github.com/Leeeon233/crdt-toy\\n- demo \u5730\u5740: https://leonzhao.cn/crdt-toy\\n\\n\u5b9e\u73b0\u601d\u8def\u53c2\u8003\u4e86 crdt-edit[^1]\\n\\n\x3c!--truncate--\x3e\\n\\n## \u4ec0\u4e48\u662f CRDTs\\n\\n\u5bf9\u4e8e CRDTs \u53ef\u4ee5\u4f18\u5148\u901a\u8fc7\u770b[[CRDT \u7b80\u4ecb[^2]](https://www.zxch3n.com/crdt-intro/crdt-intro/)]\u3001[[CRDT \u539f\u7406[^3]](http://jtfmumm.com/blog/2015/11/17/crdt-primer-1-defanging-order-theory/)]\u8fd9\u4e9b\u6587\u7ae0\u4e86\u89e3\u3002\\n\\nCRDTs \u662f\u8fd1\u4e9b\u5e74\u5f00\u59cb\u5907\u53d7\u5173\u6ce8\u7684\u4e00\u79cd\u7528\u6765\u5904\u7406\u5206\u5e03\u5f0f\u7cfb\u7edf\u4e0a\u7684\u534f\u540c\u53ef\u7528\u6027\u7684\u6570\u636e\u7ed3\u6784\u3002\u5b83\u5728`\u53ef\u7528\u6027`\u4e0e`\u5206\u533a\u5bb9\u9519\u6027`\u7684\u57fa\u7840\u4e0a\uff0c\u4e0d\u63d0\u4f9b`\u5b8c\u7f8e\u7684\u4e00\u81f4\u6027`\u800c\u662f\u63d0\u4f9b**`\u5f3a\u6700\u7ec8\u4e00\u81f4\u6027`**\u3002\u4e0b\u9762\u7684\u4f8b\u5b50\u53ef\u4ee5\u5e2e\u52a9\u6211\u4eec\u7406\u89e3\u4ec0\u4e48\u662f**\u5f3a\u6700\u7ec8\u4e00\u81f4\u6027**\u3002\\n\\n\u6bd4\u5982\u5f53\u524d\u6709**Alice**\u548c**Bob**\u4e24\u4e2a\u540c\u5b66\u5728\u5404\u81ea\u7684\u7535\u8111\u4e0a\u5171\u540c\u7f16\u8f91\u540c\u4e00\u4efd\u6587\u6863\uff0cAlice \u5199\u5165\u4e86`Hello CRDT`\uff0cBob \u5199\u5165\u4e86`Hello crdt`\u3002\\n\\n```mermaid\\n    flowchart TB\\n    subgraph Bob\\n    id2[Hello crdt];\\n    end;\\n    subgraph Alice\\n    id1[Hello CRDT];\\n    end;\\n```\\n\\n\u4f46\u5728\u6b64\u65f6 Alice \u5176\u5b9e\u5e76\u6ca1\u6709\u529e\u6cd5\u77e5\u6653 Bob \u53ef\u80fd\u5728\u540c\u4e00\u65f6\u523b\u4e5f\u5199\u5165\u4e86`Hello crdt`\u7684\u6587\u672c\uff0c\u5e76\u4e0d\u50cf\u771f\u6b63\u672c\u5730\u90a3\u6837\uff0c\u5b8c\u5168\u610f\u4e49\u4e0a\u7684\u5728**\u7f16\u8f91\u540c\u4e00\u4efd\u6587\u4ef6**\uff08\u4e00\u81f4\u6027\uff09\u3002\\n\\n\u53ea\u6709\u5f53\u4ed6\u4eec\u8fdb\u884c\u4e86\u4e00\u6b21\u540c\u6b65\u901a\u4fe1\u540e\uff0cAlice \u6216\u8005 Bob \u624d\u4f1a\u77e5\u6653\u5bf9\u65b9\u7f16\u8f91\u4e86\u4ec0\u4e48\u3002crdt \u6240\u63d0\u4f9b\u7684**\u5f3a\u6700\u7ec8\u4e00\u81f4\u6027**\u610f\u4e49\u5e76\u4e0d\u662f\u8ba9\u591a\u4eba\u534f\u540c\u771f\u6b63\u5730\u50cf\u5927\u5bb6\u5c31\u5728\u540c\u4e00\u9875\u7eb8\u4e0a\u5199\u5b57\u4e00\u6837\uff0c\u800c\u662f\u5927\u5bb6\u53ef\u4ee5\u5404\u81ea\u5730\u7f16\u8f91\u81ea\u5df1\u7684\u5185\u5bb9\uff0c\u5c3d\u7ba1\u5728\u591a\u6b21\u540c\u6b65\u7684\u8fc7\u7a0b\u4e2d\u4f1a\u4ea7\u751f\u51b2\u7a81\uff0c\u4f46 crdt \u53ef\u4ee5\u4fdd\u8bc1\u6240\u6709\u7684\u6d88\u606f\u90fd\u88ab\u63a5\u6536\u540e\uff0c**\u6700\u7ec8\u7684\u5185\u5bb9**\u5c06\u4f1a\u662f\u591a\u65b9\u4e00\u81f4\u7684\uff0c\u54ea\u6015\u53ef\u80fd\u6700\u7ec8\u51b2\u7a81\u89e3\u51b3\u540e\u7684\u7248\u672c\u5e76\u4e0d\u662f\u771f\u6b63\u6240\u671f\u5f85\u7684\u7ed3\u679c\u3002\\n\\n```mermaid\\n  flowchart TB\\n    subgraph Editor\\n    id1--\x3eid3\\n    id2--\x3eid4\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n        subgraph Alice\\n            direction TB\\n            id1[Hello CRDT];\\n            id1---id4((\u591a\u6b21\u540c\u6b65));\\n        end\\n        subgraph Bob\\n            direction TB\\n            id2[Hello crdt];\\n            id2---id3((\u591a\u6b21\u540c\u6b65));\\n        end\\n\\n    end\\n\\n    subgraph Result\\n    direction TB %% \u5b50\u56fe2\u65b9\u5411\\n    idn[\u7ed3\u679c]\\n    idn--?---id5[Hello crdt];\\n    idn--?---id6[Hello CRDTHellocrdt];\\n    idn--?---id7[Hello CRDTcrdt];\\n    end\\n\\n  %% \u4e3b\u56fe\\n  id3--\x3eidn\\n  id4--\x3eidn\\n```\\n\\n\u5bf9\u4e8e Alice \u548c Bob \u7684\u4f8b\u5b50\uff0c\u5728\u8f93\u5165`Hello CRDT`\u548c`Hello crdt`\u65f6\u53ef\u80fd\u8fdb\u884c\u4e86\u591a\u6b21\u7684\u540c\u6b65\u64cd\u4f5c\uff0c\u6700\u7ec8\u5c55\u73b0\u5728 Alice \u548c Bob \u773c\u524d\u7684\u6587\u672c\u6839\u636e\u4e0d\u540c\u7684 crdt \u7b97\u6cd5\u548c\u51b2\u7a81\u89e3\u51b3\u7b56\u7565\u53ef\u80fd\u53d8\u5f97\u4e0d\u540c\u3002\u4e5f\u8bb8\u662f`Hello crdt`\u3001`Hello CRDTHellocrdt`\u6216`Hello CRDTcrdt`\u7b49\u7b49\u90fd\u6709\u53ef\u80fd\uff0c\u4f46\u662f\u6700\u7ec8\u5728 Alice \u548c Bob \u773c\u524d\u7684\u7ed3\u679c\u5c06\u4f1a\u662f\u5b8c\u5168\u4e00\u81f4\u7684\u5176\u4e2d\u4e00\u79cd\u7ed3\u679c\u3002\\n\\n## CRDTs \u7684\u7b80\u5355\u5b9e\u73b0\\n\\n\u6211\u4eec\u5c31\u4ee5\u591a\u4eba\u7684\u6587\u672c\u5185\u5bb9\u534f\u4f5c\u4f5c\u4e3a\u573a\u666f\u6765\u5c1d\u8bd5\u5b9e\u73b0\u4e00\u4e2a\u57fa\u4e8e op \u7684 crdt \u7684\u7f16\u8f91\u5668\u3002\u4e0b\u9762\u662f\u7f16\u8f91\u5668 demo \u7684\u6548\u679c\u5c55\u793a\u3002\u5206\u522b\u6709`Client1`\u548c`Client2`\u4e24\u4e2a\u5ba2\u6237\u7aef\u5728\u5171\u540c\u7f16\u8f91\u4e00\u4efd\u6587\u6863\u3002\\n**Final Text**\u7684\u6587\u672c\u533a\u57df\u5c55\u793a\u7684\u5f53\u524d\u540c\u6b65\u540e\u7684\u7ed3\u679c\u3002`Client1`\u548c`Client2`\u4e5f\u53ef\u4ee5\u70b9\u51fb\u6309\u94ae\u8868\u793a\u8fdb\u884c\u540c\u6b65\u3002\\n\\n<iframe src={\\"https://leonzhao.cn/crdt-toy\\"} width={860} height={840} />\\n\\n\u9996\u5148\u6211\u4eec\u9700\u8981\u786e\u5b9a\u8fd9\u6837\u4e00\u4e2a\u7b80\u5355\u7684\u7f16\u8f91\u5668\uff0c\u7528\u6237\u4f1a\u6709\u54ea\u4e9b\u64cd\u4f5c(op)\u3002\u601d\u8003\u4e00\u4e0b\uff0c\u975e\u5e38\u7b80\u5355\u5730\u5c31\u53ef\u4ee5\u5f97\u51fa\u4e00\u5171\u6709\u4e24\u79cd\u64cd\u4f5c\uff1a\\n\\n- \u63d2\u5165\\n- \u5220\u9664\\n- ~~\u4fee\u6539~~\uff08\u53ef\u4ee5\u7b80\u5355\u5730\u89c6\u4e3a\u5148\u5220\u9664\u518d\u63d2\u5165\u7684\u7ec4\u5408\uff09\\n\\n### \u5206\u5e03\u5f0f\u4e2d\u7684\u987a\u5e8f\\n\\n\u90a3\u4e48\u6211\u4eec\u8fd8\u662f\u56de\u5230 Alice \u548c Bob \u7684\u4f8b\u5b50\uff0c\u6211\u4eec\u63d0\u4f9b\u4e86\u7b2c\u4e00\u7248\u7684\u7f16\u8f91\u5668\u7ed9\u4ed6\u4eec\uff0c\u4f46\u662f\u7531\u4e8e\u6211\u4eec\u6280\u672f\u8fd8\u672a\u6210\u719f\uff0c\u8981\u6c42\u4ed6\u4eec\u53ea\u80fd\u63d2\u5165\u5185\u5bb9\u8fd8\u4e0d\u80fd\u5220\u9664\u3002Alice \u548c Bob \u540c\u610f\u53c2\u4e0e\u5230\u6211\u4eec\u7684\u8fed\u4ee3\u6d4b\u8bd5\u4e2d\u53bb\u3002\u4ed6\u4eec\u8fd8\u662f\u5206\u522b\u4e00\u6b21\u8f93\u5165\u4e86\\n`Hello CRDT`\u548c`Hello crdt`\u3002\u8fd9\u65f6\u4ed6\u4eec\u53d1\u8d77\u4e86\u540c\u6b65\u3002\\n\\n```mermaid\\n  flowchart TB\\n    subgraph Editor\\n    id1--\x3eid3\\n    id2--\x3eid4\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n        subgraph Alice\\n            direction TB\\n            id1[Hello CRDT];\\n            id1---id4((\u540c\u6b65));\\n            id4--\x3eAliceText[Hello CRDTHello crdt]\\n        end\\n        subgraph Bob\\n            direction TB\\n            id2[Hello crdt];\\n            id2---id3((\u540c\u6b65));\\n            id3--\x3eBobText[Hello crdtHello CRDT]\\n        end\\n\\n    end\\n```\\n\\nAlice \u7ed9 Bob \u6253\u4e86\u4e2a\u7535\u8bdd\uff0c\u53d1\u73b0\u81ea\u5df1\u7684\u5c4f\u5e55\u4e0a\u7ed3\u679c\u662f`Hello CRDTHello crdt`\u800c Bob \u7684\u5c4f\u5e55\u4e0a\u7ed3\u679c\u662f`Hello crdtHello CRDT`\u3002\u600e\u4e48\u4f1a\u8fd9\u6837\uff1f\u4ed6\u4eec\u628a\u6d4b\u8bd5\u7ed3\u679c\u53cd\u9988\u7ed9\u4e86\u6211\u4eec\u3002\\n\\n\u539f\u6765\u6211\u4eec\u7b2c\u4e00\u7248\u7cfb\u7edf\u90fd\u628a\u65b0\u63a5\u6536\u5230\u7684**\u63d2\u5165\u64cd\u4f5c**\u5f53\u4f5c\u4e86\u540e\u53d1\u751f\u7684\u4e8b\u60c5\uff0cAlice \u7684\u7f16\u8f91\u5668\u628a Bob \u7684\u5185\u5bb9\u52a0\u5728\u4e86\u540e\u9762\uff0cBob \u7684\u7f16\u8f91\u5668\u4e5f\u662f\u5982\u6b64\u3002\u8fd9\u548c\u6211\u4eec\u4e00\u5f00\u59cb\u6240\u5f3a\u8c03\u7684**\u5f3a\u6700\u7ec8\u4e00\u81f4\u6027**\u53ef\u4e0d\u7b26\u3002\u6211\u4eec\u5e0c\u671b\u65e0\u8bba\u4e8b\u4ef6\u88ab\u600e\u6837\u521b\u5efa\u548c\u63a5\u6536\uff0c\u53ea\u8981\u64cd\u4f5c\u96c6\u5408\u662f\u4e00\u81f4\u7684\uff0c\u90a3\u4e48\u6700\u7ec8\u7ed3\u679c\u5e94\u8be5\u4e00\u6837\u3002\\n\\n\u65e2\u7136\u5df2\u7ecf\u77e5\u9053\u4e86\u95ee\u9898\u6240\u5728\uff0c\u90a3\u4e48\u5c31\u6ca1\u4ec0\u4e48\u95ee\u9898\u4e86\u3002\u6211\u4eec\u53ea\u9700\u8981\u8ba9\u6bcf\u4e2a\u7528\u6237\u4e4b\u95f4\u6709\u4e00\u4e2a\u56fa\u5b9a\u7684\u987a\u5e8f\u5c31\u53ef\u4ee5\u4e86\uff0c\u53ef\u4ee5\u4e3a\u6bcf\u4e00\u4e2a\u7f16\u8f91\u5668\u5ba2\u6237\u7aef\u5206\u914d\u4e00\u4e2a`Client ID`\uff0c\u4ee5**ID**\u7684\u5927\u5c0f\u987a\u5e8f\u6765\u4f5c\u4e3a\u64cd\u4f5c\u7684\u987a\u5e8f\u3002\u6211\u4eec\u5f88\u5feb\u53d1\u5e03\u4e86 v2.0 \u7248\u672c\uff0c\u8ba9\u5ba2\u6237\u7aef ID \u8d8a\u5927\u8ba4\u4e3a\u64cd\u4f5c\u8d8a\u5148\u53d1\u751f\uff0c\u5e76\u4e14\u5206\u914d\\n\\n- Alice \u7684\u5ba2\u6237\u7aef\u7248\u672c\u4e3a`1`\\n- Bob \u7684\u5ba2\u6237\u7aef\u7248\u672c\u4e3a`2`\\n\\n\u63d0\u4f9b\u7ed9\u4e86 Alice \u548c Bob \u5e2e\u5fd9\u6d4b\u8bd5\u4f7f\u7528\u3002\\n\\n```mermaid\\n  flowchart TB\\n    subgraph Editor\\n    id1--\x3eid3\\n    id2--\x3eid4\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n        subgraph Alice\\n            direction TB\\n            id1[Hello CRDT];\\n            id1---id4((\u540c\u6b65));\\n            id4--\x3eAliceText[Hello crdtHello CRDT]\\n        end\\n        subgraph Bob\\n            direction TB\\n            id2[Hello crdt];\\n            id2---id3((\u540c\u6b65));\\n            id3--\x3eBobText[Hello crdtHello CRDT]\\n        end\\n\\n    end\\n```\\n\\n\u8fd9\u56de\u6ca1\u6709\u95ee\u9898\u4e86\uff0cAlice \u548c Bob \u7684\u7f16\u8f91\u5668\u4e0a\u663e\u793a\u7684\u90fd\u662f`Hello crdtHello CRDT`\u6587\u672c\u3002\\n\\n\u4f46\u968f\u7740\u8fdb\u4e00\u6b65\u4f7f\u7528\uff0cAlice \u548c Bob \u53c8\u53d1\u73b0\u95ee\u9898\u4e86\u3002\u8fd9\u6b21\\n\\n- Bob \u5148\u8f93\u5165\u4e86`one `\u7136\u540e\u53c8\u8f93\u5165\u4e86`two`\\n- Alice \u5148\u8f93\u5165\u4e86`three `\u53c8\u8f93\u5165\u4e86`four`\\n\\n\u7136\u540e\u4ed6\u4eec\u8fdb\u884c\u4e86\u540c\u6b65\uff0c\u8fd9\u6b21\u6bcf\u4e2a\u4eba\u90fd**\u53d1\u9001\u4e86\u4e24\u4e2a\u63d2\u5165\u64cd\u4f5c**\u3002\\n\\n```mermaid\\n  flowchart TB\\n    subgraph Editor\\n    one--\x3esy2\\n    two--\x3esy2\\n    three--\x3esy1\\n    four--\x3esy1\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n        subgraph Bob\\n            direction TB\\n            one[one ];\\n            one--\x3etwo;\\n            two---sy1((\u540c\u6b65))\\n            sy1--\x3eBobText[one two fourthree ]\\n        end\\n\\n        subgraph Alice\\n            direction TB\\n            three[three ];\\n            three--\x3efour;\\n            four---sy2((\u540c\u6b65));\\n            sy2--\x3eAliceText[one two three four]\\n        end\\n\\n    end\\n```\\n\\n\u73b0\u5728 Bob \u7684\u5c4f\u5e55\u4e0a\u663e\u793a\u7684\u662f`one two fourthree `\u800c Alice \u5c4f\u5e55\u4e0a\u663e\u793a\u7684\u5374\u662f`one two three four`\uff0c\u6b63\u5e38\u6765\u8bf4`one two three four`\u624d\u662f\u4ed6\u4eec\u60f3\u8981\u7684\u7ed3\u679c\u3002\\n\\n\u6211\u4eec\u53d1\u73b0 Alice \u5411 Bob \u540c\u6b65\u7684\u5185\u5bb9\u53d1\u751f\u4e86\u987a\u5e8f\u7684\u6539\u53d8\uff0c\u6709\u7740\u5206\u5e03\u5f0f\u7ecf\u9a8c\u7684\u6211\u4eec\u7acb\u523b\u60f3\u5230\uff0c\u53ef\u80fd\u662f\u7f51\u7edc\u5ef6\u8fdf\u7684\u539f\u56e0\uff0c\u5bfc\u81f4 Alice \u7684\u7b2c\u4e8c\u4e2a\u64cd\u4f5c\u65e9\u4e8e\u7b2c\u4e00\u4e2a\u64cd\u4f5c\u88ab Bob \u7684\u5ba2\u6237\u7aef\u63a5\u6536\u5230\u9020\u6210\u4e86\u987a\u5e8f\u7684\u4e0d\u4e00\u81f4\u3002\\n\\n\u65e2\u7136\u5df2\u7ecf\u77e5\u9053\u4e86\u95ee\u9898\u6240\u5728\uff0c\u90a3\u4e48\u5c31\u6ca1\u4ec0\u4e48\u95ee\u9898\u4e86\u3002\u6211\u4eec\u53ef\u4ee5\u65b0\u589e\u4e00\u4e2a\u903b\u8f91\u65f6\u95f4\u6233\uff0c\u4e5f\u5c31\u662f[Lamport Timestamp](https://en.wikipedia.org/wiki/Lamport_timestamp)\\n\\n> Lamport Timestamp \u7684\u7b97\u6cd5\u5f88\u7b80\u5355[^4]\\n>\\n> - \u6bcf\u4e2a\u8fdb\u7a0b\u7ef4\u62a4\u4e00\u4e2a`counter`\\n> - \u672c\u5730\u6bcf\u53d1\u751f\u4e00\u4e2a\u4e8b\u4ef6\u5c31\u5c06`counter + 1`\uff0c\u5e76\u5c06\u4e8b\u4ef6\u7684\u65f6\u95f4\u6233\u8bbe\u7f6e\u4e3a`counter`\u503c\\n> - \u6bcf\u5f53\u8fdb\u7a0b\u53d1\u9001\u4e00\u4e2a\u6d88\u606f\uff0c\u5c31\u5c06\u672c\u5730`counter + 1`\uff0c\u5e76\u5c06\u6700\u65b0\u7684`counter`\u503c\u9644\u5e26\u5728\u6d88\u606f\u4e0a\\n> - \u5f53\u8fdb\u7a0b\u6536\u5230\u6d88\u606f\u540e\uff0c\u8ba9\u81ea\u5df1\u7684`counter = max(counter, message.counter) + 1`\\n\\n\u6211\u4eec\u5728\u539f\u6709\u7684`ClientId`\u57fa\u7840\u4e0a\u8fdb\u884c\u4e86\u6269\u5c55\uff0c\u6784\u5efa\u4e86\u4e00\u4e2a`EventId`\uff0c\u5176\u4e2d\u5305\u62ec\u4e86`ClientId`\u548c`Lamport Timestamp`\u4e24\u90e8\u5206\uff0c\u8fd9\u6837\u4e8b\u4ef6\u7684\u53d1\u751f\u987a\u5e8f\u5c31\u53ef\u4ee5\u4e0e\u63a5\u6536\u5230\u7684\u987a\u5e8f\u65e0\u5173\u4e86\u3002\\n\\n\u6211\u4eec\u6293\u7d27\u66f4\u65b0\u4e86 v3.0 \u7248\u672c\u7684\u7f16\u8f91\u5668\u7ed9\u5230 Alice \u548c Bob\uff0c\u5fc3\u60f3\u80af\u5b9a\u6ca1\u95ee\u9898\u4e86\u3002\\n\\n### \u53ea\u786e\u5b9a\u903b\u8f91\u987a\u5e8f\u5c31\u591f\u4e86\u5417\\n\\nAlice \u548c Bob \u62ff\u5230 v3.0 \u7684\u7f16\u8f91\u5668\u90a3\u80af\u5b9a\u5148\u5c1d\u8bd5\u4e86\u4e00\u4e0b\u521a\u521a\u5931\u8d25\u7684\u4f8b\u5b50\\n\\n```mermaid\\n  flowchart TB\\n    subgraph Editor\\n    one--\x3esy2\\n    two--\x3esy2\\n    three--\x3esy1\\n    four--\x3esy1\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n        subgraph Bob\\n            direction TB\\n            one[one ];\\n            one--\x3etwo;\\n            two---sy1((\u540c\u6b65))\\n            sy1--\x3eBobText[one two three four]\\n        end\\n\\n        subgraph Alice\\n            direction TB\\n            three[three ];\\n            three--\x3efour;\\n            four---sy2((\u540c\u6b65));\\n            sy2--\x3eAliceText[one two three four]\\n        end\\n\\n    end\\n```\\n\\n\u679c\u7136\u66f4\u65b0\u540e\u5c31\u6ca1\u95ee\u9898\u4e86\u3002\u4f46 Bob \u8fd9\u56de\u60f3\u7740\u4e5f\u4e0d\u80fd\u4e00\u76f4\u53ea\u5728\u540e\u9762\u52a0\u5b57\u7b26\uff0c\u4e8e\u662f Bob \u5728\u7f16\u8f91\u5668\u7684\u6700\u524d\u9762\u63d2\u5165\u4e86`zero `\uff0c\u5e76\u4e14\u540c\u6b65\u7ed9\u4e86 Alice\u3002\u53d1\u73b0\u540c\u6b65\u4e4b\u540e\u7ed3\u679c\u600e\u4e48\u53c8\u4e0d\u4e00\u6837\u4e86\u3002Alice \u7684\u7ed3\u679c\u662f`one two three fourzero `\uff0cBob \u8f93\u5165\u7684`zero `\u600e\u4e48\u5728\u540e\u9762\u554a\uff1f\\n\\n```mermaid\\n  flowchart TB\\n    subgraph Editor\\n    one--\x3esy2\\n    two--\x3esy2\\n    three--\x3esy1\\n    four--\x3esy1\\n    zero--\x3esy3\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n        subgraph Bob\\n            direction TB\\n            one[one ];\\n            one--\x3etwo;\\n            two---sy1((\u540c\u6b65))\\n            sy1--\x3ezero[\\"zero (insert at 0 position)\\"]\\n            zero--\x3eBobText[zero one two three four]\\n        end\\n\\n        subgraph Alice\\n            direction TB\\n            three[three ];\\n            three--\x3efour;\\n            four---sy2((\u540c\u6b65));\\n            sy2---sy3((\u540c\u6b65))\\n            sy3--\x3eAliceText[\\"one two three fourzero \\"]\\n        end\\n\\n    end\\n```\\n\\nAlice \u548c Bob \u5f00\u59cb\u4e0d\u8010\u70e6\u4e86\u8d77\u6765\uff0c\u4f60\u4eec\u8fd9\u4e2a\u7f16\u8f91\u5668\u5230\u5e95\u884c\u4e0d\u884c\uff1f\u6211\u4eec\u542c\u5230\u8fd9\u4e2a\u6d88\u606f\uff0c\u8d76\u5feb\u8d76\u8fc7\u6765\u4e86\u89e3\u60c5\u51b5\u3002\\n\\n\u4e4b\u524d\u6211\u4eec\u7ed9\u6bcf\u4e2a\u63d2\u5165\u64cd\u4f5c\u5206\u914d\u4e86\u4e00\u4e2a`EventId`\uff0c\u80fd\u591f\u786e\u5b9a\u6240\u6709\u7684\u63d2\u5165\u64cd\u4f5c\u7684\u53d1\u751f\u987a\u5e8f\u3002\u4f46\u662f\u6211\u4eec\u6ca1\u6709\u60f3\u5230\u64cd\u4f5c\u7684\u987a\u5e8f\u5728\u6587\u672c\u8fd9\u4e2a\u573a\u666f\u4e0b\u4e0d\u80fd\u4ee3\u8868\u64cd\u4f5c\u7684\u4f4d\u7f6e\u3002\u6211\u4eec\u89c9\u5f97\u4e0d\u80fd\u518d\u8fd9\u6837\u9047\u5230\u4ec0\u4e48\u95ee\u9898\u89e3\u51b3\u4ec0\u4e48\u95ee\u9898\u4e86\uff0c\u9700\u8981\u597d\u597d\u60f3\u6e05\u695a\u7f16\u8f91\u5668\u8fd9\u4e2a\u95ee\u9898\uff0c\u5305\u62ec\u4e00\u76f4\u6ca1\u88ab\u8003\u8651\u7684**\u5220\u9664**\u64cd\u4f5c\u3002\\n\\n\u76ee\u524d\u6211\u4eec\u4e00\u5171\u9762\u4e34\u4e0b\u9762\u51e0\u4e2a\u95ee\u9898\uff1a\\n\\n- \u6587\u672c\u7684\u63d2\u5165\u548c\u5220\u9664\u64cd\u4f5c\u662f\u9700\u8981\u786e\u5b9a\u63d2\u5165\u548c\u5220\u9664\u4f4d\u7f6e\u7684\uff0c\u8be5\u5982\u4f55\u786e\u5b9a\\n- \u6587\u672c\u53ef\u80fd\u5728\u4efb\u610f\u7684\u4f4d\u7f6e\u8fdb\u884c\u63d2\u5165\u548c\u5220\u9664\uff0c\u6211\u4eec\u5e94\u8be5\u9700\u8981\u786e\u5b9a\u64cd\u4f5c\u7684\u6700\u5c0f\u5355\u4f4d\\n- \u7b80\u5355\u7684 Op \u5217\u8868\u53ef\u80fd\u4e0d\u592a\u5bb9\u6613\u6ee1\u8db3\u6211\u4eec\u7684\u8981\u6c42\u4e86\uff0c\u8be5\u4f7f\u7528\u600e\u6837\u7684\u6570\u636e\u7ed3\u6784\u5462\\n\\n\u9762\u4e34\u7684\u95ee\u9898\u8fd8\u6709\u4e9b\u62bd\u8c61\uff0c\u6211\u4eec\u5148\u901a\u8fc7\u4e00\u90e8\u5206\u7684\u4f8b\u5b50\u6765\u6a21\u62df\u4e00\u4e0b\u5427\u3002\\n\\n```mermaid\\nflowchart LR\\n\\nblank[\u7a7a\u767d]--\x3eia[\u5728\u7f16\u8f91\u5668\u4e2d\u63d2\u5165a]--\x3eib[\u5728a\u540e\u9762\u8f93\u5165b]--\x3eic[\u5728b\u540e\u9762\u8f93\u5165c]--\x3edb[\u5220\u9664\u5b57\u7b26b]--\x3eid[\u5728a\u7684\u540e\u9762\u63d2\u5165d]\\nblank[\u7a7a\u767d]--\x3ea--\x3eab--\x3eabc--\x3eac--\x3eadc\\n\\n```\\n\\n\u770b\u5230\u4e0a\u9762\u7684\u56fe\uff0c\u6211\u4eec\u7684\u601d\u8def\u5c31\u6e05\u6670\u4e86\u5f88\u591a\u3002\u6587\u672c\u7f16\u8f91\u91cc\u9762\u6700\u5c0f\u64cd\u4f5c\u7684\u5355\u4f4d\u80af\u5b9a\u662f**`\u5b57\u7b26`**\u8fd9\u70b9\u6bcb\u5eb8\u7f6e\u7591\u4e86\u3002\u81f3\u4e8e\u786e\u5b9a\u4f4d\u7f6e\u8fd9\u70b9\uff0c\u6211\u4eec\u89c2\u5bdf\u56fe\u4e2d\u7b2c\u4e00\u6392\u7684\u5168\u90e8\u64cd\u4f5c\u63cf\u8ff0\\n\\n- \u5728\u7f16\u8f91\u5668\u4e2d\u63d2\u5165 a\\n- \u5728 a \u540e\u9762\u8f93\u5165 b\\n- \u5728 b \u540e\u9762\u8f93\u5165 c\\n- \u5220\u9664\u5b57\u7b26 b\\n- \u5728 a \u540e\u9762\u63d2\u5165 d\\n\\n\u90a3\u4e48\u4f4d\u7f6e\u5c31\u5b8c\u5168\u53ef\u4ee5\u901a\u8fc7\u5f53\u524d\u6587\u672c\u5185\u5bb9\uff0c\u770b\u63a5\u4e0b\u6765\u8981\u63d2\u5165\u6216\u8005\u5220\u9664\u7684\u5b57\u7b26\u662f*\u57fa\u4e8e*\u76ee\u524d\u6587\u672c\u7684\u54ea\u4e2a\u5b57\u7b26\u505a\u7684\u64cd\u4f5c\u5c31\u53ef\u4ee5\u786e\u5b9a\u4e86\u3002\u8fd9\u6837\u4e0d\u540c\u7684\u5b57\u7b26\u4e4b\u95f4\u597d\u50cf\u5c31\u6709\u4e86\u4f9d\u8d56\u5173\u7cfb\uff0c\u90a3\u6570\u636e\u7ed3\u6784\u662f\u4e0d\u662f\u53ef\u4ee5\u4f7f\u7528\u6811\u5f62\u7ed3\u6784\u4e86\uff1f\\n\\n\u6211\u4eec\u7a81\u7136\u611f\u89c9\u7075\u611f\u6765\u4e86\u3002\\n\\n### \u6587\u672c\u7f16\u8f91\u597d\u50cf\u5c31\u662f\u68f5\u6811\\n\\n\u5982\u679c\u6211\u4eec\u628a\u521d\u59cb\u7a7a\u6587\u672c\u5f53\u4f5c\u6811\u7684\u6839\u8282\u70b9\uff08root\uff09\u7684\u8bdd\uff0c\u90a3\u4e48\u63d2\u5165\u5b57\u7b26`a`\u5c31\u662f`a`\u662f`root`\u7684\u5b50\u8282\u70b9\u3002\u5728`a`\u540e\u9762\u63d2\u5165`b`\uff0c\u90a3`b`\u5c31\u662f`a`\u7684\u5b50\u8282\u70b9\u3002\u6211\u4eec\u628a\u4e0a\u9762\u7684\u793a\u4f8b\u753b\u4e00\u4e0b\uff1a\\n\\n```mermaid\\nflowchart LR\\n1--\x3e2\\n2--\x3e3\\n3--\u5220\u9664?--\x3e4\\n4--\u987a\u5e8f?--\x3e5\\n    subgraph 1\\n    direction TB\\n    root--\x3ea--\x3eb\\n    end\\n\\n    subgraph 2\\n    direction TB\\n    root2[root]--\x3ea2[a]--\x3eb2[b]--\x3ec2[c]\\n    end\\n\\n    subgraph 3\\n    direction TB\\n    root3[root]--\x3ea3[a]--\x3eb3[\\"b(\u5220\u9664)\\"]--\x3ec3[c]\\n    end\\n\\n    subgraph 4\\n    direction TB\\n    root4[root]--\x3ea4[a]--\x3ec4[c]\\n    end\\n\\n    subgraph 5\\n    direction TB\\n    root5[root]--\x3ea5[a]--\x3ec5[c]\\n    a5--\x3ed5[d]\\n    end\\n\\n```\\n\\n\u628a\u8f93\u5165\u5b57\u7b26\u7684\u8fc7\u7a0b\u53ef\u89c6\u5316\u4e4b\u540e\uff0c\u6211\u4eec\u770b\u5230\u8fc7\u7a0b 1 \u548c 2 \u597d\u50cf\u90fd\u6ca1\u4ec0\u4e48\u95ee\u9898\uff0c\u5168\u90e8\u90fd\u662f\u5728\u6309\u987a\u5e8f\u63d2\u5165\u5b57\u7b26\uff0c\u524d\u4e00\u4e2a\u5b57\u7b26\u4f5c\u4e3a\u540e\u4e00\u4e2a\u5b57\u7b26\u7684\u7236\u8282\u70b9\uff0c\u4ece\u6839\u8282\u70b9\u904d\u5386\u4e0b\u6765\u5c31\u80fd\u8fd8\u539f\u539f\u59cb\u6587\u6863\u3002\u4f46\u662f\u63a5\u4e0b\u6765\u6211\u4eec\u597d\u50cf\u9047\u5230\u4e24\u4e2a\u4e0d\u662f\u592a\u660e\u6717\u7684\u64cd\u4f5c\u3002\\n\\n- \u591a\u4e2a\u5b50\u8282\u70b9\u65f6\u904d\u5386\u987a\u5e8f\u662f\u5426\u6709\u8981\u6c42\\n- \u5220\u9664\u5b57\u7b26\u65f6\u662f\u5426\u8981\u628a\u8282\u70b9\u5220\u9664\\n\\n\u8fd9\u56de\u5b9e\u5728\u4e0d\u597d\u610f\u601d\u518d\u8bf7 Alice \u548c Bob \u5e2e\u6211\u4eec\u627e\u95ee\u9898\u4e86\uff0c\u5c31\u6211\u548c\u4f60\u6765\u81ea\u5df1\u5148\u591a\u6d4b\u6d4b\u5427\u3002\u7b2c\u4e00\u4e2a\u95ee\u9898\u770b\u8d77\u6765\u8fd8\u7b97\u7b80\u5355\\n\\n```mermaid\\nflowchart LR\\nt1-.-g1\\nt2-.-g2\\nt3-.-g3\\nt4-.-g4\\n\\n\\nsubgraph tree[Tree]\\ndirection LR\\n    g1--\x3eg2\\n    g2--\x3eg3\\n    g3--\x3eg4\\n\\n    subgraph g1[\\"insert a at 0\\"]\\n    direction TB\\n    a1[a]\\n    end\\n\\n    subgraph g2[insert b after a]\\n    direction TB\\n    a2[a]--\x3eb2[b]\\n    end\\n\\n    subgraph g3[insert c after a]\\n    direction TB\\n    a3--\x3ec3[c]\\n    a3[a]--\x3eb3[b]\\n    end\\n\\n    subgraph g4[insert d after a]\\n    direction TB\\n    a4--\x3ed4[d]\\n    a4--\x3ec4[c]\\n    a4[a]--\x3eb4[b]\\n    end\\nend\\n\\nsubgraph text[Text]\\ndirection LR\\n\\nt1[a]--\x3et2[ab]--\x3et3[acb]--\x3et4[adcb]\\nend\\n\\n\\n```\\n\\n\u6211\u4eec\u4e0d\u65ad\u6a21\u62df\u5411`a`\u540e\u9762\u52a0\u5165\u6587\u672c\uff0c\u7ed3\u679c\u90fd\u662f\u8d8a\u540e\u9762\u52a0\u5165\u7684\u5b57\u7b26\uff0c\u8d8a\u663e\u793a\u5728\u524d\u9762\u3002\u5728\u524d\u9762\u6d4b\u8bd5\u5206\u5e03\u5f0f\u540c\u6b65\u7684\u65f6\u5019\u6211\u4eec\u5df2\u7ecf\u53ef\u4ee5\u901a\u8fc7`EventId`\u5168\u5c40\u5730\u786e\u5b9a\u987a\u5e8f\u4e86\uff0c\u90a3\u4e48\u5168\u90e8\u5b50\u8282\u70b9\u7684\u987a\u5e8f\u5c31\u53ef\u4ee5\u901a\u8fc7`EventId`\u8fdb\u884c\u6392\u5e8f\uff0c\u8d8a*\u65b0*\u7684`EventId`\u5c06\u5728\u5b50\u8282\u70b9\u4e2d\u8d8a\u65e9\u88ab\u904d\u5386\u3002\\n\\n### \u5220\u9664\u4e86\u5b57\u7b26\uff0c\u5b83\u5c31\u4e0d\u5b58\u5728\u4e86\u5417\uff1f\\n\\n\u63a5\u7740\u6211\u4eec\u6a21\u62df\u4e86\u51e0\u6b21\u534f\u4f5c\u65f6\u5220\u9664\u5b57\u7b26\u7684\u60c5\u51b5\uff0c\u6bd4\u5982\u8fd9\u6b21\u6211\u5148\u8f93\u5165\u4e86`ab`\u4f60\u8f93\u5165\u4e86`c`\uff0c\u4e4b\u540e\u6211\u4eec\u8fdb\u884c\u4e86\u4e00\u6b21\u540c\u6b65\uff0c\u6211\u4eec\u7684\u7ed3\u679c\u6700\u540e\u90fd\u662f`abc`\u3002\\n\\n<details>\\n<summary>\u4f60\u53ef\u80fd\u4f1a\u6709\u7591\u95ee\uff0c\u4e3a\u4ec0\u4e48\u662f<code>abc</code>\uff0c\u800c\u4e0d\u662f<code>cab</code>\uff1f</summary>\\n\\n\u8fd9\u91cc\u6211\u4eec\u4f7f\u7528\u5047\u8bbe\\n\\n- \u4f60\u7684`ClientId`\u662f`1`\\n- \u6211\u7684`ClientId`\u662f`2`\\n- `ClientId`\u8d8a\u5927 crdt \u8ba4\u4e3a\u8d8a\u5148\u53d1\u751f\\n\\n\u6211\u4eec\u8be6\u7ec6\u770b\u4e00\u4e0b`abc`\u7684\u5408\u5e76\u8fc7\u7a0b\uff0c\u73b0\u5728\u6211\u6536\u5230\u4e86\u5168\u90e8\u7684 crdts \u7684 op\uff1a\\n\\n1. \u6839\u8282\u70b9\u63d2\u5165 `a` EventId(counter: 0, client_id: 2)\\n2. `a` \u8282\u70b9\u63d2\u5165 `b` EventId(counter: 1, client_id: 2)\\n3. \u6839\u8282\u70b9\u63d2\u5165 `c` EventId(counter: 0, client_id: 1)\\n\\n\u6839\u636e\u521a\u521a\u7684\u7ed3\u8bba\uff0cop1 \u548c op3 \u90fd\u662f`counter`\u4e3a 0 \u7684 op\uff0c\u4f46\u662f op1 \u7684`ClientId`\u66f4\u5927\uff0c\u5728\u5047\u8bbe\u524d\u63d0\u4e0b\u4f1a\u88ab\u8ba4\u4e3a\u4f18\u5148\u53d1\u751f\u3002\u90a3\u4e48\u6574\u4e2a op \u987a\u5e8f\u5c31\u4f1a\u53d8\u6210 132\uff0c\u5373\u7ed3\u679c\u7684`abc`\u3002\\n\\n</details>\\n\\n\u7d27\u63a5\u7740\u6211\u5220\u9664\u4e86`b`\uff0c\u800c\u4f60\u5728`b`\u7684\u540e\u9762\u8f93\u5165\u4e86`d`\uff0c\u7136\u540e\u6211\u4eec\u90fd\u53d1\u8d77\u4e86\u540c\u6b65\u8bf7\u6c42\u3002\\n\\n```mermaid\\nflowchart TB\\n    subgraph Editor\\n    direction TB %% \u5b50\u56fe1\u65b9\u5411\\n    b---\x3esy1\\n    c--\x3esy2\\n    d--\x3esy4\\n    db2--\x3esy3\\n    sy3--\x3erf[\\"??????\\"]\\n    sy4--\x3erf\\n        subgraph \u6211\\n            direction TB\\n            a[\\"insert a at 0\\\\n\\\\n a\\"]--\x3eb[\\"insert b after a\\\\n\\\\n ab\\"]--\x3esy2((\u540c\u6b65))--\x3er2[\\"\u540c\u6b65\u540e\\\\n\\\\n abc\\"]--\x3edb2[\\"delete b\\\\n\\\\n ac\\"]--\x3esy4((\u540c\u6b65))\\n        end\\n\\n        subgraph \u4f60\\n            direction TB\\n            c[\\"insert c at 0\\\\n\\\\n c\\"]--\x3esy1((\u540c\u6b65))--\x3er1[\\"\u540c\u6b65\u540e\\\\n\\\\n abc\\"]--\x3ed[\\"insert d after b\\\\n\\\\n abdc\\"]--\x3esy3((\u540c\u6b65));\\n        end\\n\\n    end\\n\\n```\\n\\n\u73b0\u5728\u597d\u50cf\u9047\u5230\u4e86\u95ee\u9898\uff0c\u6211\u90fd\u5df2\u7ecf\u628a`b`\u5220\u6389\u4e86\uff0c\u90a3\u4e48\u8be5\u600e\u4e48\u540c\u6b65\u4f60\u8981\u628a`d`\u63d2\u5165\u5728`b`\u540e\u9762\u7684\u64cd\u4f5c\u5462\uff1f\\n\\n\u6211\u9759\u9759\u5730\u6574\u7406\u4e86\u4e00\u4e0b\u601d\u8def\uff0c\u6211\u5220\u9664\u4e86`b`\uff0c\u4f46\u4e8e\u6b64\u540c\u65f6\u7684\u4f60\u6216\u8005\u5176\u4ed6\u4eba\u4ecd\u53ef\u80fd\u5728`b`\u540e\u9762\u8f93\u5165\u4e00\u4e9b\u5b57\u7b26\uff0c\u8fd9\u4e5f\u5c31\u662f`b`\u4ecd\u53ef\u80fd\u662f\u5176\u4ed6\u5b50\u6811\u7684\u7236\u8282\u70b9\u3002\u5176\u4ed6\u8282\u70b9\u4ecd\u7136\u53ef\u80fd\u4f1a\u4f9d\u8d56\u4e8e\u5b83\u3002\u6240\u4ee5\u6211\u4eec\u5728\u5220\u9664\u64cd\u4f5c\u65f6\u4e0d\u53ef\u80fd\u5c06\u771f\u6b63\u7684\u6811\u8282\u70b9\u5220\u9664\u3002\\n\\n\u518d\u6765\u60f3\u60f3\u6587\u672c\u5c55\u793a\u65f6\uff0c\u5c31\u662f\u4e00\u4e2a\u6811\u7684\u904d\u5386\u8fc7\u7a0b\u3002\u53ea\u8981\u4e0d\u5728\u7f16\u8f91\u5668\u4e0a\u663e\u793a\u8fd9\u4e2a\u5b57\u7b26\u90a3\u4e48\u4f7f\u7528\u7f16\u8f91\u5668\u7684\u7528\u6237\u5c31\u5b8c\u5168\u53ef\u4ee5\u8ba4\u4e3a\u8fd9\u4e2a\u5b57\u7b26\u88ab\u5220\u9664\u4e86\u3002\u6240\u4ee5\u6211\u4eec\u53ea\u9700\u8981\u7ed9\u6bcf\u4e2a\u8282\u70b9\u589e\u52a0\u4e00\u4e2a`\u6807\u5fd7`\uff0c\u8868\u793a\u8fd9\u4e2a\u8282\u70b9\u662f\u4e0d\u662f\u88ab\u5220\u9664\u5c31\u53ef\u4ee5\u4e86\u3002\\n\\n:::tip\\n\\n\u4e0a\u9762\u63d0\u5230\u7684\u4e3a\u4e86\u4fdd\u7559\u6811\u7684\u5b8c\u6574\u7ed3\u6784\uff0c\u4e0d\u5220\u9664\u8282\u70b9\uff0c\u800c\u662f\u6dfb\u52a0\u6807\u5fd7\u7684\u65b9\u5f0f\u5c31\u662f\u4e00\u79cd[\u5893\u7891\u673a\u5236](https://baike.baidu.com/item/%E5%A2%93%E7%A2%91%E6%9C%BA%E5%88%B6/7558924)\\n\\n:::\\n\\n\u73b0\u5728\u6211\u4eec\u7f16\u8f91\u5668\u7684\u7ed3\u679c\u5c31\u90fd\u4f1a\u662f`adc`\uff0c\u6ee1\u8db3 crdts \u6240\u8981\u6c42\u7684`\u5f3a\u6700\u7ec8\u4e00\u81f4\u6027`\u3002\u6211\u4eec\u6765\u904d\u5386\u4e00\u904d\u521a\u521a\u6240\u5f62\u6210\u7684\u6587\u672c\u6811\uff1a\\n\\n```mermaid\\n\\nflowchart LR\\nt1-.-g1\\nt2-.-g2\\nt3-.-g3\\nt4-.-g4\\nt5-.-g5\\n\\n\\nsubgraph tree[Tree]\\ndirection LR\\n    g1--\x3eg2\\n    g2--\x3eg3\\n    g3--\x3eg4\\n    g4--\x3eg5\\n\\n    subgraph g1[\\"insert a at 0\\"]\\n    direction TB\\n    root1[root]--\x3ea1[a]\\n    end\\n\\n    subgraph g2[insert b after a]\\n    direction TB\\n    root2[root]--\x3ea2[a]--\x3eb2[b]\\n    end\\n\\n    subgraph g3[insert c at 0]\\n    direction TB\\n    root3[root]--\x3ea3[a]--\x3eb3[b]\\n    root3--\x3ec3[c]\\n    end\\n\\n    subgraph g4[delete b]\\n    direction TB\\n    root4[root]--\x3ea4[a]--\x3eb4[\\"b (deteled)\\"]\\n    root4--\x3ec4[c]\\n    end\\n\\n    subgraph g5[insert d after b]\\n    direction TB\\n    root5[root]--\x3ea5[a]--\x3eb5[\\"b (deteled)\\"]--\x3ed5[d]\\n    root5--\x3ec5[c]\\n    end\\nend\\n\\nsubgraph text[Text]\\ndirection LR\\n\\nt1[a]--\x3et2[ab]--\x3et3[abc]--\x3et4[ac]--\x3et5[adc]\\nend\\n\\n```\\n\\n## CRDTs \u80fd\u591f\u8fbe\u6210\u591a\u4eba\u7684\u64cd\u4f5c\u534f\u540c\uff0c\u90a3\u4e48\u4ee3\u4ef7\u5462\uff1f\\n\\n\u6211\u4eec\u628a\u6700\u7ec8\u7684 v0.4 \u7248\u672c\u7f16\u8f91\u5668\u7ed9\u5230\u4e86 Alice \u548c Bob\uff0cAlice \u548c Bob \u4f1a\u6709\u4ec0\u4e48\u53cd\u9988\u5462\uff1f\\n\\n\u6211\u4eec\u6765\u7b49\u5f85\u4e0b\u4e00\u7bc7\uff0c\u770b\u770b Alice \u548c Bob \u4f1a\u4e0d\u4f1a\u6709\u4ec0\u4e48\u62b1\u6028\u3002\\n\\n## \u53c2\u8003\u8d44\u6599\\n\\n[^1]: https://github.com/wangdashuaihenshuai/crdt-edit\\n[^2]: [CRDT \u7b80\u4ecb](https://www.zxch3n.com/crdt-intro/crdt-intro/)\\n[^3]: [A CRDT Primer Part I: Defanging Order Theory](http://jtfmumm.com/blog/2015/11/17/crdt-primer-1-defanging-order-theory/)\\n[^4]: [\u5982\u4f55\u8bbe\u8ba1 CRDT \u7b97\u6cd5-Zxch3n](https://www.zxch3n.com/crdt-intro/design-crdt)"}]}')}}]);