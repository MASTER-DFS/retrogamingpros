(function(){
  // ---- pixel art (drawn to tiny canvases, scaled up crisp) ----
  var PAL={a:'#ffb238',r:'#ef4a3c',w:'#efeaf8',g:'#a9a3c9',d:'#3a3670',k:'#0b0a18',t:'#4fd1c5',p:'#7a6fd0',s:'#cfc8b8',b:'#8a5a2b',o:'#5e3a1a'};
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
    atari:["..............","..............","..kkkkkkkkkk..",".kkkkggkkkkkk.","kkkkkkkkkkkkkk","kgkgkkkkkkkgkg","kkkkkkkkkkkkkk","bbbbbbbbbbbbbb","bobobbobbobbob","bbbbbbbbbbbbbb","..............",".............."],
    gba:["..............","..............","..............",".pppppppppppp.","pppkkkkkkkkppp","papkttttttkprp","aaakttttttkrpp","papkttttttkprp","pppkkkkkkkkppp",".pppppppppppp.","..............",".............."],
    dc:["..............","..............",".wwwwwwwwwwww.","wwwwwwwwwwwwww","wwwwggggggwwww","wwwgwwwwwwgwww","wwwwggggggwwww","wwwwwwwwwwwwaw","wwwwwwwwwwwwww",".wwwwwwwwwwww.","..............",".............."],
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
    var kinds=['pad','cart','gb','disc','n64','snes','handheld','nes','gc','genesis','ps1','atari','gba','dc'].map(function(k){return sprite(ART[k]);});
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
    var lines=[['RETRO GAMING PROS  BIOS v1.3',''],['MEMORY TEST ........ ','64K OK'],['CART SLOT .......... ','CLEAN'],['CONTROLLER 1 ....... ','READY'],['SAVE BATTERY ....... ','OK'],['',''],['LOADING SYSTEM FILES',''] ];
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

  // ---- system files: CRT explorer + timeline ----
  var SYS=[
    {n:'Atari 2600',m:'atari',art:'atari',y:1977,cpu:'MOS 6507 @ 1.19 MHz',ram:'128 bytes',top:'Pac-Man',fact:'Games drew the picture one line at a time as the TV beam moved, a trick called racing the beam.'},
    {n:'NES',m:'nintendo',art:'nes',y:1985,cpu:'Ricoh 2A03 @ 1.79 MHz',ram:'2 KB',top:'Super Mario Bros.',fact:'Nintendo styled the US console like a VCR so stores would stock it after the 1983 video game crash.'},
    {n:'Sega Genesis',m:'sega',art:'genesis',y:1989,cpu:'Motorola 68000 @ 7.67 MHz',ram:'64 KB',top:'Sonic the Hedgehog',fact:'A second Z80 chip runs the sound, and with an adapter it plays Master System games.'},
    {n:'Game Boy',m:'nintendo handheld',art:'gb',y:1989,cpu:'Sharp LR35902 @ 4.19 MHz',ram:'8 KB',top:'Tetris',fact:'The screen shows four shades of green-gray at 160 by 144 pixels.'},
    {n:'Super Nintendo',m:'nintendo',art:'snes',y:1991,cpu:'Ricoh 5A22 @ 3.58 MHz',ram:'128 KB',top:'Super Mario World',fact:'Mode 7 scales and rotates a background layer, which is how F-Zero and Super Mario Kart fake 3D.'},
    {n:'PlayStation',m:'sony',art:'ps1',y:1995,cpu:'MIPS R3000A @ 33.87 MHz',ram:'2 MB',top:'Gran Turismo',fact:'It was the first home console to sell more than 100 million units.'},
    {n:'Nintendo 64',m:'nintendo',art:'n64',y:1996,cpu:'NEC VR4300 @ 93.75 MHz',ram:'4 MB',top:'Super Mario 64',fact:'The Expansion Pak doubles the RAM to 8 MB, and Majora’s Mask won’t run without it.'},
    {n:'Dreamcast',m:'sega',art:'dc',y:1999,cpu:'Hitachi SH-4 @ 200 MHz',ram:'16 MB',top:'Sonic Adventure',fact:'It shipped with a built-in modem, so you could play online out of the box.'},
    {n:'Game Boy Advance',m:'nintendo handheld',art:'gba',y:2001,cpu:'ARM7TDMI @ 16.78 MHz',ram:'288 KB',top:'Pokémon Ruby & Sapphire',fact:'It has Game Boy hardware inside, so it plays Game Boy and Game Boy Color carts too.'},
    {n:'GameCube',m:'nintendo',art:'gc',y:2001,cpu:'IBM Gekko @ 486 MHz',ram:'24 MB',top:'Super Smash Bros. Melee',fact:'Games come on 8 cm mini discs that hold about 1.5 GB.'}
  ];
  var pick=$('sysPick'), sysOut=$('sysOut'), auto=null;
  function showSys(i){var x=SYS[i];pick.value=String(i);
    sysOut.innerHTML='<div class="dim">&gt; US RELEASE: '+x.y+'</div><div class="dim">&gt; CPU: '+x.cpu+'</div><div class="dim">&gt; RAM: '+x.ram+'</div><div class="price">&gt; TOP SELLER: '+x.top.replace('&','&amp;')+'</div><div class="fact">'+x.fact+'</div>';}
  function stopAuto(){if(auto){clearInterval(auto);auto=null;}}
  if(pick&&sysOut){
    SYS.forEach(function(x,i){pick.add(new Option(x.n,String(i)));});
    showSys(1);
    pick.addEventListener('change',function(){stopAuto();showSys(+pick.value);});
    $('sysPrev').addEventListener('click',function(){stopAuto();showSys((+pick.value+SYS.length-1)%SYS.length);});
    $('sysNext').addEventListener('click',function(){stopAuto();showSys((+pick.value+1)%SYS.length);});
    // attract mode: cycle through systems until the visitor takes control
    if(!reduce){var touched=false;['change','click'].forEach(function(ev){pick.addEventListener(ev,function(){touched=true;});});
      setTimeout(function(){if(!touched)auto=setInterval(function(){if(!document.hidden)showSys((+pick.value+1)%SYS.length);},7000);},3200);}
  }
  var tl=$('timeline');
  if(tl){
    tl.innerHTML=SYS.map(function(x,i){return '<li class="tl-card" data-cat="'+x.m+'"><canvas data-art="'+x.art+'" aria-hidden="true"></canvas><span class="tl-year">'+x.y+'</span><h3>'+x.n+'</h3><span class="meta">'+x.cpu.split(' @ ')[0]+' · '+x.ram+' RAM</span><button type="button" data-i="'+i+'">Show on the TV</button></li>';}).join('');
    tl.querySelectorAll('canvas').forEach(function(c){draw(c,ART[c.dataset.art]);c.style.imageRendering='pixelated';});
    tl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!pick)return;stopAuto();showSys(+b.dataset.i);
      $('crt').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});});
    document.querySelectorAll('.chip').forEach(function(ch){ch.addEventListener('click',function(){
      document.querySelectorAll('.chip').forEach(function(o){o.setAttribute('aria-pressed',o===ch?'true':'false');});
      var f=ch.dataset.filter;tl.querySelectorAll('.tl-card').forEach(function(p){p.hidden=!(f==='all'||p.dataset.cat.split(' ').indexOf(f)>-1);});
    });});
  }

  // ---- repair buttons preset the contact form ----
  document.querySelectorAll('[data-topic]').forEach(function(b){b.addEventListener('click',function(){
    var t=$('fTopic'), m=$('fMsg');if(t)t.value=b.dataset.topic;
    if(m&&!m.value)m.value=b.dataset.topic==='Atari repair'?'Which Atari: \nWhat it does: ':'What it does: ';
    $('contact').scrollIntoView({behavior:reduce?'auto':'smooth'});
    setTimeout(function(){if(m)m.focus({preventScroll:true});},reduce?0:500);
  });});

  // ---- contact form: opens the visitor's email app with the message ready ----
  var form=$('contactForm');
  if(form){
    form.addEventListener('submit',function(e){e.preventDefault();
      var ok=true;['fName','fEmail','fMsg'].forEach(function(id){var el=$(id);if(!el.value.trim()||(el.type==='email'&&!/\S+@\S+\.\S+/.test(el.value))){el.style.borderColor='var(--red)';ok=false;}else el.style.borderColor='';});
      if(!ok)return;
      var to=form.dataset.to;
      var subject='[Retro Gaming Pros] '+$('fTopic').value+' from '+$('fName').value.trim();
      var body=$('fMsg').value.trim()+'\n\n'+$('fName').value.trim()+'\n'+$('fEmail').value.trim();
      $('contactDone').hidden=false;
      window.location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }

  // ---- systems marquee ----
  var marquee=SYS.map(function(x){return x.n.toUpperCase();}).concat(['GAME GEAR','TURBOGRAFX-16','NEO GEO','ATARI 7800','PS2']);
  var tr=$('systemsTrack');
  if(tr)tr.innerHTML=marquee.concat(marquee).map(function(s){return '<span>'+s+'</span>';}).join('');
})();
