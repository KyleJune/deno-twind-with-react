import{a as n,b as c,c as u,d,e as h,f,g as x,h as g,i as y,j as w,k as T,l as s,m as e,n as a,o as t}from"./chunk-6RTTFE23.js";var R="Deno"in globalThis,i=!R,S=o=>R?Deno.env.get(o):window.env?.[o],v=()=>S("APP_ENV")==="production";var z=g({presets:[w(),y()]},v());i&&console.log("tw",z);var p=new Map,k=n.dirname(import.meta.url);console.log(k);var b=o=>{let r=i?"":n.dirname(n.relative(k,o));return(B,D)=>d(i?D:async()=>{let m=n.join(r,B);if(!p.has(m))throw console.log("Loaded modules",[...p.keys()]),new Error(`module (${m}) not pre-loaded`);let E=p.get(m);return await Promise.resolve({default:E})})};var{Outlet:H,Link:F}=e,{cx:I}=x,C=I("transition-all duration-300 opacity-75 hover:(opacity-100 text-blue-500)"),M=()=>t("div",{className:"animate-pulse",children:[t(s,{children:t("title",{children:"Loading..."},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:14,columnNumber:7},this)},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:13,columnNumber:5},this),t("h1",{children:"Loading..."},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:16,columnNumber:5},this)]},void 0,!0,{fileName:"client/routes/index.tsx",lineNumber:12,columnNumber:3},this),L=()=>t(a,{children:t(u,{fallback:t(M,{},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:22,columnNumber:25},this),children:t(H,{},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:23,columnNumber:7},this)},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:22,columnNumber:5},this)},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:21,columnNumber:3},this);function A(){return t("main",{className:"py-16 px-4 max-w-screen-md mx-auto w-full",children:[t("h1",{className:"text-4xl font-light mb-6",children:"Welcome to Remix + Twind \u{1F4BF}\u{1F680}"},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:50,columnNumber:7},this),t("ul",{className:"list-disc grid gap-2",children:[[{href:"https://remix.run/tutorials/blog",text:"15m Quickstart Blog Tutorial"},{href:"https://remix.run/tutorials/jokes",text:"Deep Dive Jokes App Tutorial"},{href:"https://remix.run/docs",text:"Remix Docs"},{href:"https://twind.style/",text:"Twind Docs"}].map(r=>t("li",{children:t("a",{href:r.href,className:C,target:"_blank",rel:"noreferrer",children:r.text},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:56,columnNumber:13},this)},r.href,!1,{fileName:"client/routes/index.tsx",lineNumber:55,columnNumber:11},this)),t("li",{children:t(F,{to:"/anything",className:C,children:"Some other route"},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:67,columnNumber:11},this)},void 0,!1,{fileName:"client/routes/index.tsx",lineNumber:66,columnNumber:9},this)]},void 0,!0,{fileName:"client/routes/index.tsx",lineNumber:53,columnNumber:7},this)]},void 0,!0,{fileName:"client/routes/index.tsx",lineNumber:49,columnNumber:5},this)}var{Routes:W,Route:l}=e,q=b(import.meta.url),_=q("./routes/anything.tsx",()=>import("./anything-FNYBNCSU.js"));function N(){return t(a,{children:[t(s,{htmlAttributes:{lang:"en"},defaultTitle:"Example",titleTemplate:"Example | %s",children:[t("meta",{charSet:"utf-8"},void 0,!1,{fileName:"client/app.tsx",lineNumber:20,columnNumber:9},this),t("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"},void 0,!1,{fileName:"client/app.tsx",lineNumber:21,columnNumber:9},this)]},void 0,!0,{fileName:"client/app.tsx",lineNumber:15,columnNumber:7},this),t(W,{children:t(l,{path:"/",element:t(L,{},void 0,!1,{fileName:"client/app.tsx",lineNumber:24,columnNumber:34},this),children:[t(l,{index:!0,element:t(A,{},void 0,!1,{fileName:"client/app.tsx",lineNumber:25,columnNumber:33},this)},void 0,!1,{fileName:"client/app.tsx",lineNumber:25,columnNumber:11},this),t(l,{path:"anything",element:t(_,{},void 0,!1,{fileName:"client/app.tsx",lineNumber:26,columnNumber:43},this)},void 0,!1,{fileName:"client/app.tsx",lineNumber:26,columnNumber:11},this),t(l,{path:"*",element:t("h1",{children:"Not found!"},void 0,!1,{fileName:"client/app.tsx",lineNumber:27,columnNumber:36},this)},void 0,!1,{fileName:"client/app.tsx",lineNumber:27,columnNumber:11},this)]},void 0,!0,{fileName:"client/app.tsx",lineNumber:24,columnNumber:9},this)},void 0,!1,{fileName:"client/app.tsx",lineNumber:23,columnNumber:7},this)]},void 0,!0,{fileName:"client/app.tsx",lineNumber:14,columnNumber:5},this)}var{BrowserRouter:J}=e,O=()=>t(T,{children:t(J,{children:t(N,{},void 0,!1,{fileName:"client/main.tsx",lineNumber:12,columnNumber:7},this)},void 0,!1,{fileName:"client/main.tsx",lineNumber:11,columnNumber:5},this)},void 0,!1,{fileName:"client/main.tsx",lineNumber:10,columnNumber:3},this),P=()=>h(()=>{f(document.body,t(c,{children:t(O,{},void 0,!1,{fileName:"client/main.tsx",lineNumber:22,columnNumber:9},this)},void 0,!1,{fileName:"client/main.tsx",lineNumber:21,columnNumber:7},this))});requestIdleCallback?requestIdleCallback(P):setTimeout(P,1);
