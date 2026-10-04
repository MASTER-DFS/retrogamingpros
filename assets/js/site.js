(function(){
  // ---- pixel art (drawn to tiny canvases, scaled up crisp) ----
  var PAL={a:'#ffb238',r:'#ef4a3c',w:'#efeaf8',g:'#a9a3c9',d:'#3a3670',k:'#0b0a18',t:'#4fd1c5',p:'#7a6fd0',s:'#cfc8b8'};
  function draw(cv,rows){if(!cv||!rows)return;var c=cv.getContext('2d');cv.width=rows[0].length;cv.height=rows.length;rows.forEach(function(r,y){for(var x=0;x<r.length;x++){var ch=r[x];if(ch!=='.'&&PAL[ch]){c.fillStyle=PAL[ch];c.fillRect(x,y,1,1);}}});}
  var ART={
    logo:["............","..rrrrrrrr..",".rwwwwwwwwr.",".rwkkkkkkwr.",".rwkaaaakwr.",".rwkakkakwr.",".rwkaaaakwr.",".rwkkkkkkwr.",".rwwwwwwwwr.",".rrrwrrwrrr.","..rrrrrrrr..","............"],
    power:["....aaa....","..a.aaa.a..",".aa.aaa.aa.","aa..aaa..aa","aa.......aa","aa.......aa","aa.......aa",".aa.....aa.","..aaaaaaa..","...aaaaa...","..........."],
    disc:["...aaaaa...",".aawwwwwaa.",".awwwwwwwa.","awwwaaawwwa","awwakkkawwa","awwakkkawwa","awwwaaawwwa",".awwwwwwwa.",".aawwwwwaa.","...aaaaa...","..........."],
    pad:["...........",".ggggggggg.","gggggggggggg".slice(0,11),"gaggggggrgg","aaaggggrgrg","gaggggggrgg","ggggggggggg",".gggg.gggg.","..gg...gg..","...........","..........."],
    handheld:["..sssssss..","..skkkkks..","..sktttks..","..sktttks..","..skkkkks..","..sssssss..","..sasssrs..","..aaassss..","..sassrss..","..sssssss..","..........."],
    hdmi:["...........","aaaaaaaaaaa","awwwwwwwwwa",".awkwkwkwa.","..aaaaaaa..","....aaa....","....aaa....","....aaa....","....aaa....","....aaa....","..........."],
    cart:["..ggggggg..",".gggggggggg".slice(0,11),".grrrrrrrg.",".grwwwwwrg.",".grwaaawrg.",".grwwwwwrg.",".grrrrrrrg.",".ggggggggg.",".g.g.g.g.g.","..ggggggg..","..........."],
    nes:["..............","..............",".ggggggggggggg".slice(0,14),"gggggggggggggg","gkkkkkkkkkkkkg","gggggggggggggg","gddgggggggggg".padEnd(14,'g'),"grgrgggggggggg","gggggggggggggg","dddddddddddddd","..............",".............."],
    snes:["..............","..gggggggggg..",".gggppppppggg.","gggppppppppggg","ggggkkkkkkgggg","gggggggggggggg","gpggggggggggrg","gpggggggggggrg","gggggggggggggg",".gggggggggggg.","..............",".............."],
    n64:["..............","....kkkkkk....","...kkkkkkkk...","..kkkaaaakkk..",".kkkkkkkkkkkk.","kkkkkkkkkkkkkk","kkrkkkkkkkkkpk","kkkkkkkkkkkkkk",".kkkkkkkkkkkk.","..............","..............",".............."],
    genesis:["..............","..............",".kkkkkkkkkkkk.","kkkkkkkkkkkkkk","kkkkddddddkkkk","kkkkkkkkkkkkkk","krkkkkkkkkkkkk","kkkkkkkkkkkkkk",".kkkkkkkkkkkk.","..............","..............",".............."],
    ps1:["..............","..............",".gggggggggggg.","gggggggggggggg","gggggddddggggg","ggggdkkkkdgggg","ggggdkkkkdgggg","gggggddddggggg","gtgggggggggrgg","gggggggggggggg","..............",".............."],
    gb:["..ssssssssss..","..skkkkkkkks..","..sktttttkks..","..sktttttkks..","..sktttttkks..","..skkkkkkkks..","..ssssssssss..","..saasssrrss..","..aaassssrss..","..saassssss...","..ssssssssss..",".............."],
    gc:["..............","..pppppppppp..",".pppppppppppp.",".ppppkkkkpppp.",".pppkppppkppp.",".ppppkkkkpppp.",".pppppppppppp.",".pppppppppppp.","..pppppppppp..","..k........k..","..............",".............."]
  };
  var $=function(id){return document.getElementById(id);};
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- pixel icons everywhere ----
  draw($('logoMark'),ART.logo);
  document.querySelectorAll('.svc-icon,.post-icon').forEach(function(c){draw(c,ART[c.dataset.icon]||ART.cart);c.style.imageRendering='pixelated';});

  // ---- mobile menu ----
  var mb=$('menuBtn'), nav=$('siteNav');
  if(mb&&nav){
    mb.addEventListener('click',function(){var o=nav.dataset.open!=='true';nav.dataset.open=o;mb.setAttribute('aria-expanded',o);});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.dataset.open='false';mb.setAttribute('aria-expanded','false');}});
  }

  // ---- hero attract mode: drifting pixel hardware + twinkling stars ----
  function sprite(rows){var c=document.createElement('canvas');draw(c,rows);return c;}
  var fx=$('heroFx');
  if(fx&&fx.getContext){
    var ctx=fx.getContext('2d'), host=fx.parentElement;
    var kinds=['pad','cart','gb','disc','n64','snes','handheld','nes','gc','genesis','ps1'].map(function(k){return sprite(ART[k]);});
    var W=0,H=0,dpr=1,dim=1,items=[],stars=[],mx=0,my=0,tx=0,ty=0,last=0,running=false,visible=true;
    function rnd(a,b){return a+Math.random()*(b-a);}
    function size(){
      dpr=Math.min(window.devicePixelRatio||1,2);
      W=host.clientWidth;H=host.clientHeight;
      fx.width=Math.round(W*dpr);fx.height=Math.round(H*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false;
      var n=W<700?4:Math.min(18,Math.round(W/85));dim=W<700?0.55:1;
      items=[];for(var i=0;i<n;i++)items.push(make(true));
      stars=[];var sn=Math.round(W*H/9000);for(var j=0;j<sn;j++)stars.push({x:rnd(0,W),y:rnd(0,H),p:rnd(0,6.28),s:Math.random()<.15?3:2,c:Math.random()<.2?'#ef4a3c':(Math.random()<.5?'#ffb238':'#efeaf8')});
    }
    function make(anywhere){
      var depth=rnd(0.25,1), img=kinds[Math.floor(Math.random()*kinds.length)];
      var scale=Math.round(2+depth*3);
      return {img:img,scale:scale,depth:depth,x:rnd(-20,W),y:anywhere?rnd(-40,H):H+rnd(10,80),
        vy:rnd(6,14)*(0.5+depth),sway:rnd(4,14),ph:rnd(0,6.28),alpha:(0.08+depth*0.2)*dim};
    }
    function frame(t){
      if(!running)return;
      var dt=last?Math.min(0.05,(t-last)/1000):0;last=t;
      tx+=(mx-tx)*0.05;ty+=(my-ty)*0.05;
      ctx.clearRect(0,0,W,H);
      for(var j=0;j<stars.length;j++){var st=stars[j];st.p+=dt*1.6;var a=0.15+0.35*(0.5+0.5*Math.sin(st.p));
        ctx.globalAlpha=a;ctx.fillStyle=st.c;ctx.fillRect(Math.round(st.x-tx*4),Math.round(st.y-ty*4),st.s,st.s);}
      items.sort(function(a,b){return a.depth-b.depth;});
      for(var i=0;i<items.length;i++){var it=items[i];
        it.y-=it.vy*dt;it.ph+=dt*0.8;
        var w=it.img.width*it.scale,h=it.img.height*it.scale;
        if(it.y<-h-10){items[i]=make(false);continue;}
        var x=it.x+Math.sin(it.ph)*it.sway-tx*18*it.depth, y=it.y-ty*12*it.depth;
        ctx.globalAlpha=it.alpha;
        ctx.drawImage(it.img,Math.round(x/it.scale)*it.scale,Math.round(y/it.scale)*it.scale,w,h);
      }
      ctx.globalAlpha=1;
      requestAnimationFrame(frame);
    }
    function play(){if(running||reduce)return;running=true;last=0;requestAnimationFrame(frame);}
    function stop(){running=false;}
    size();
    if(reduce){running=true;frame(0);running=false;}
    else{
      play();
      if('IntersectionObserver' in window){new IntersectionObserver(function(es){visible=es[0].isIntersecting;visible&&!document.hidden?play():stop();}).observe(host);}
      document.addEventListener('visibilitychange',function(){document.hidden||!visible?stop():play();});
      window.addEventListener('pointermove',function(e){mx=(e.clientX/window.innerWidth-.5);my=(e.clientY/window.innerHeight-.5);},{passive:true});
    }
    var rz;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){size();if(reduce){running=true;frame(0);running=false;}},150);});
  }

  // ---- CRT power-on + boot screen ----
  var crt=$('crt'), boot=$('crtBoot');
  if(crt&&boot&&!reduce){
    var lines=[['RETRO GAMING PROS  BIOS v1.3',''],['MEMORY TEST ........ ','64K OK'],['CART SLOT .......... ','CLEAN'],['SOLDER IRON ........ ','350°C'],['CAPACITORS ......... ','FRESH'],['',''],['LOADING DIAGNOSTICS',''] ];
    boot.hidden=false;crt.classList.add('boot');
    var li=0,ci=0,txt='';
    function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
    function render(partial){boot.innerHTML=txt+esc(partial)+'<span class="blink">_</span>';}
    function step(){
      if(li>=lines.length){setTimeout(function(){boot.classList.add('out');setTimeout(function(){boot.hidden=true;},380);},350);return;}
      var L=lines[li], full=L[0];
      if(ci<full.length){ci+=2;render(full.slice(0,ci));setTimeout(step,14);}
      else{txt+=esc(full)+(L[1]?'<span class="ok">'+L[1]+'</span>':'')+'\n';li++;ci=0;render('');setTimeout(step,L[1]?120:60);}
    }
    setTimeout(step,700);
  }

  // ---- systems marquee ----
  var systems=['ATARI 2600','NES','SNES','NINTENDO 64','GAMECUBE','GAME BOY','GBA','SEGA GENESIS','GAME GEAR','DREAMCAST','PLAYSTATION','PS2','TURBOGRAFX-16','NEO GEO'];
  var tr=$('systemsTrack');
  if(tr)tr.innerHTML=systems.concat(systems).map(function(s){return '<span>'+s+'</span>';}).join('');

  // ---- quick diagnosis ----
  var DX={
    'NES':[['Blinking red light','72-pin connector replacement + pin clean','$35','2-3 days'],['No picture / grey screen','Video RF/AV circuit repair','from $40','3-5 days'],['Want a sharper picture','RGB or HDMI mod','from $90','5-7 days']],
    'SNES':[['No power','Fuse + regulator repair','from $30','2-3 days'],['Yellowed case','Retrobright shell restoration','$40','5-7 days'],['Blurry on modern TV','RGB mod + cable','from $50','3-5 days']],
    'Nintendo 64':[['Loose joystick','Joystick rebuild or replacement','$25','1-2 days'],['Black screen','Power board + RCP diagnosis','from $45','3-5 days'],['Blurry on modern TV','HDMI kit install','from $90','5-7 days']],
    'Sega Genesis':[['No sound','Audio circuit recap','from $45','3-5 days'],['No power','Power jack / regulator','$30','2-3 days'],['Blurry on modern TV','RGB / SCART setup','from $50','3-5 days']],
    'Game Boy':[['Dim or dead pixels','IPS backlit screen install','from $65','2-4 days'],['No sound','Speaker or amp repair','$25','1-2 days'],['Worn out shell','New shell + buttons','from $30','1-2 days']],
    'Game Gear':[['Dim screen or no sound','Full capacitor recap','$55','3-5 days'],['Want a modern screen','IPS / LCD screen upgrade','from $85','5-7 days']],
    'PlayStation':[['Discs won\'t read','Laser calibration or swap','from $45','2-4 days'],['Disc tray stuck','Drive mechanism service','$35','2-3 days']],
    'GameCube':[['Disc won\'t spin','Drive service + laser check','$40','2-4 days'],['No video','Digital AV / GCHD install','from $90','5-7 days']],
    'Dreamcast':[['GD-ROM not reading','GD-ROM service or laser','from $50','3-5 days'],['Loud fan','Quiet fan swap','$25','1-2 days']],
    'Game cartridge':[['Won\'t save my game','Save backup + new battery (CR2025)','$12','1 day'],['Won\'t boot','Pin clean + board check','$5','1 day']]
  };
  var sc=$('dxConsole'), ss=$('dxSymptom'), out=$('dxOut');
  if(sc&&ss&&out){
    Object.keys(DX).forEach(function(k){sc.add(new Option(k,k));});
    var fillSym=function(){ss.innerHTML='';DX[sc.value].forEach(function(s,i){ss.add(new Option(s[0],i));});show();};
    var show=function(){var s=DX[sc.value][ss.value];
      out.innerHTML='<div class="dim">&gt; FIX: '+s[1]+'</div><div class="price">&gt; EST: '+s[2]+'</div><div class="dim">&gt; TIME: '+s[3]+' on the bench</div>';};
    sc.addEventListener('change',fillSym); ss.addEventListener('change',show);
    sc.value='NES'; fillSym();
  }

  // ---- products ----
  var P=[
    {n:'NES Console',art:'nes',cat:'nintendo',g:'A',meta:'Recapped · new 72-pin · 2 controllers',p:149},
    {n:'Super Nintendo',art:'snes',cat:'nintendo',g:'A',meta:'Retrobrighted shell · RGB ready',p:189},
    {n:'Nintendo 64',art:'n64',cat:'nintendo',g:'B+',meta:'Expansion Pak · rebuilt stick',p:169},
    {n:'GameCube Indigo',art:'gc',cat:'nintendo',g:'A',meta:'Drive serviced · memory card',p:179},
    {n:'Sega Genesis Model 1',art:'genesis',cat:'sega',g:'A-',meta:'High Definition Graphics · recapped',p:139},
    {n:'PlayStation (SCPH-1001)',art:'ps1',cat:'sony',g:'B+',meta:'New laser · audio-out board',p:129},
    {n:'Game Boy DMG IPS',art:'gb',cat:'handheld nintendo',g:'A',meta:'Backlit IPS · new shell · USB-C',p:159},
    {n:'Game Boy DMG Original',art:'gb',cat:'handheld nintendo',g:'B',meta:'Original screen · tested speaker',p:89}
  ];
  var grid=$('products');
  if(grid){
    grid.innerHTML=P.map(function(x,i){return '<article class="product" data-cat="'+x.cat+'"><div class="product-art"><span class="grade">GRADE '+x.g+'</span><canvas data-art="'+x.art+'"></canvas></div><div class="product-body"><h3>'+x.n+'</h3><span class="meta">'+x.meta+'</span><div class="product-foot"><span class="price">$'+x.p+'</span><button type="button" id="buy'+i+'" data-name="'+x.n+'">Ask about it</button></div></div></article>';}).join('');
    grid.querySelectorAll('canvas').forEach(function(c){draw(c,ART[c.dataset.art]);});
    grid.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      $('fService').value='Repair';
      $('fIssue').value='Hi! Is the '+b.dataset.name+' still available?';
      $('contact').scrollIntoView({behavior:reduce?'auto':'smooth'});});
    document.querySelectorAll('.chip').forEach(function(ch){ch.addEventListener('click',function(){
      document.querySelectorAll('.chip').forEach(function(o){o.setAttribute('aria-pressed',o===ch?'true':'false');});
      var f=ch.dataset.filter;grid.querySelectorAll('.product').forEach(function(p){p.hidden=!(f==='all'||p.dataset.cat.split(' ').indexOf(f)>-1);});
    });});
  }

  // ---- repair ticket form ----
  var fc=$('fConsole'), form=$('ticketForm');
  if(fc&&form){
    ['Choose a system','NES','Super Nintendo','Nintendo 64','GameCube','Game Boy / GBC','Game Boy Advance','Sega Genesis','Game Gear','Dreamcast','PlayStation','PlayStation 2','Atari 2600','TurboGrafx-16','Neo Geo','Game cartridge','Other'].forEach(function(s,i){fc.add(new Option(s,i?s:''));});
    form.addEventListener('submit',function(e){e.preventDefault();
      var ok=true;['fName','fEmail','fConsole'].forEach(function(id){var el=$(id);if(!el.value.trim()||(el.type==='email'&&!/\S+@\S+\.\S+/.test(el.value))){el.style.borderColor='var(--red)';ok=false;}else el.style.borderColor='';});
      if(!ok)return;
      $('ticketNo').textContent='TICKET #RG-'+(1000+Math.floor(Math.random()*9000))+' CREATED';
      $('ticketDone').hidden=false;});
  }
})();
