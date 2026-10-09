/* Logika progresji: jawne heurystyki treningowe, nie model predykcyjny wzrostu mięśni. */
(function (root) {
  'use strict';
  const exerciseSettings = {
    bench:   {min:6,max:8,kind:'compound',equipment:'plates',step:2.5},
    ohp:     {min:6,max:8,kind:'compound',equipment:'plates',step:2.5},
    fly:     {min:8,max:12,kind:'isolation',equipment:'fixed',step:2},
    pushdown:{min:8,max:12,kind:'isolation',equipment:'sportsart',step:5},
    raise:   {min:10,max:15,kind:'isolation',equipment:'fixed',step:1},
    overhead:{min:8,max:12,kind:'isolation',equipment:'sportsart',step:5},
    lat:     {min:6,max:10,kind:'compound',equipment:'sportsart',step:5},
    wide:    {min:6,max:10,kind:'compound',equipment:'sportsart',step:5},
    single:  {min:8,max:12,kind:'compound',equipment:'sportsart',step:5},
    preacher:{min:8,max:12,kind:'isolation',equipment:'plates',step:2.5},
    curl:    {min:8,max:12,kind:'isolation',equipment:'fixed',step:2},
    reverse: {min:10,max:15,kind:'isolation',equipment:'fixed',step:1},
    smith:   {min:6,max:8,kind:'compound',equipment:'plates',step:2.5},
    narrow:  {min:6,max:10,kind:'compound',equipment:'sportsart',step:5}
  };
  const own = (o,k) => Object.prototype.hasOwnProperty.call(o,k);
  const cleanSettings = (overrides={}) => Object.fromEntries(Object.entries(exerciseSettings).map(([id,base])=>{
    const candidate = overrides && own(overrides,id) && overrides[id] && typeof overrides[id]==='object' ? overrides[id] : {};
    const min = Number(candidate.min),max=Number(candidate.max),step=Number(candidate.step);
    return [id,{
      min:Number.isInteger(min)&&min>=4&&min<=20?min:base.min,
      max:Number.isInteger(max)&&max>=5&&max<=30&&max>=(Number.isInteger(min)&&min>=4&&min<=20?min:base.min)?max:base.max,
      kind:base.kind,
      equipment:['sportsart','fixed','plates'].includes(candidate.equipment)?candidate.equipment:base.equipment,
      step:Number.isFinite(step)&&step>=0.25&&step<=25?Math.round(step*4)/4:base.step
    }];
  }));
  function setsFor(w,id){
    const ex=w?.exercises?.find(e=>e.id===id);
    return (ex?.sets||[]).filter(s=>s.done && Number.isFinite(+s.kg) && +s.kg>0 && Number.isInteger(+s.reps) && +s.reps>0).map(s=>({kg:+s.kg,reps:+s.reps,rir:s.rir===''||s.rir==null?null:Number(s.rir),technique:s.technique||'unknown',warmup:s.warmup===true}));
  }
  // Porównujemy serie robocze. Zaznaczone rozgrzewki lub wyraźnie lżejsza pierwsza seria są pomijane.
  function working(sets){
    if(!sets.length)return [];
    const peak=Math.max(...sets.map(s=>s.kg));
    return sets.filter((s,i)=>!s.warmup && !(i===0&&sets.length>=3&&s.kg<peak*0.8));
  }
  function byDate(a,b){return (a.date||'').localeCompare(b.date||'') || (a.started||'').localeCompare(b.started||'');}
  function allSessions(workouts,id,{plan=null,before=null}={}) {
    return (workouts||[]).filter(w=>w.status==='complete' && (!before || byDate(w,before)<0) && (plan===null||w.plan===plan))
      .sort(byDate).map(w=>({w,sets:working(setsFor(w,id))})).filter(x=>x.sets.length);
  }
  function approximately(a,b){return Math.abs(a-b)<=0.011;}
  function candidateWeights(current,settings){
    if(!(current>0))return [];
    if(settings.equipment==='sportsart'){
      // Stos + 0 / 1,5 / 3 kg. Nie sumujemy dwóch dodatków na raz.
      const opts=[];
      for(let n=Math.max(0,Math.floor(current/5)-1);n<=Math.ceil(current/5)+4;n++){
        for(const micro of [0,1.5,3]){
          const next=Math.round((5*n+micro)*100)/100;
          if(next>current+0.01)opts.push(next);
        }
      }
      return [...new Set(opts)].sort((a,b)=>a-b);
    }
    const step=settings.step;
    const start=Math.floor(current/step)+1;
    return Array.from({length:5},(_,i)=>Math.round((start+i)*step*100)/100).filter(v=>v>current+0.01);
  }
  function suggestion(workouts,id,plan,settings){
    const sessions=allSessions(workouts,id,{plan}),all=allSessions(workouts,id);
    const latest=sessions.at(-1)||all.at(-1),prior=sessions.at(-2);
    if(!latest)return {type:'initial',title:'Ustal punkt wyjścia',reason:'Brak wcześniejszych wyników. Wybierz ciężar pozwalający zachować poprawną technikę i kontrolowany ruch.',weight:null,confidence:'brak historii'};
    const sets=latest.sets;const latestWeight=sets[0].kg;
    const uniform=sets.length>=2&&sets.every(s=>approximately(s.kg,latestWeight));
    const base={type:'hold',title:'Ten sam ciężar',weight:latestWeight,reason:'Utrzymaj ciężar, obserwuj powtórzenia i technikę.',confidence:'ostrożna sugestia',target:`${settings.min}–${settings.max} powt.`};
    if(!sessions.length)return {...base,reason:'Ostatni wynik pochodzi z innego planu. Najpierw zbierz porównywalne dane w tym planie.'};
    if(sets.some(s=>s.technique==='no'))return {...base,reason:'Zaznaczono problem z techniką. Priorytetem jest kontrolowany ruch, nie większe obciążenie.'};
    if(!uniform)return {...base,reason:'W ostatnim treningu stosowano różne ciężary w seriach. Najpierw ustabilizuj serie robocze.'};
    if(!prior)return {...base,reason:'To pierwszy porównywalny trening tego ćwiczenia w tym planie. Potrzebny jest kolejny stabilny wynik.'};
    const previousSets=prior.sets;
    const comparable=previousSets.length===sets.length && previousSets.every(s=>approximately(s.kg,latestWeight));
    if(!comparable)return {...base,reason:'Poprzedni trening miał inną liczbę serii lub inny ciężar. Potwierdź wynik przed progresją.'};
    if(sets.some(s=>s.reps<settings.min))return {...base,reason:'Nie wszystkie serie są jeszcze w docelowym zakresie. Utrzymaj obciążenie i zadbaj o poprawne powtórzenia.'};
    if(sets.some((s,i)=>s.reps<previousSets[i].reps-1))return {...base,reason:'Wyniki części serii ostatnio spadły. Warto najpierw odzyskać stabilność.'};
    if(sets.some(s=>s.rir!==null&&(s.rir<0||s.rir>5)))return {...base,reason:'Sprawdź wpisaną ocenę powtórzeń w zapasie (RIR).'};
    if(sets.some(s=>s.reps<settings.max) || previousSets.some(s=>s.reps<settings.max)){
      const improved=sets.some((s,i)=>s.reps>previousSets[i].reps);
      return {...base,reason:improved?'Powtórzenia rosną. Zwiększenie ciężaru odłóż do czasu, gdy wszystkie serie dwukrotnie osiągną górę zakresu.':'Ustabilizuj wszystkie serie przy górnej granicy zakresu przez dwa porównywalne treningi.'};
    }
    if(sets.some(s=>s.rir===0))return {...base,reason:'Przy serii oznaczonej RIR 0 pozostaw ciężar i zweryfikuj technikę oraz regenerację.'};
    const candidates=candidateWeights(latestWeight,settings);
    const next=candidates[0];
    const maxIncrease = settings.kind==='isolation'?0.08:0.10;
    if(!next || (next-latestWeight)/latestWeight>maxIncrease+0.00001)
      return {...base,reason:'Brak wystarczająco małego skoku obciążenia na wybranym sprzęcie. Kontynuuj ten ciężar zamiast wymuszać duży skok.'};
    const delta=+(next-latestWeight).toFixed(2);
    return {type:'increase',title:'Można rozważyć mały skok',weight:next,previousWeight:latestWeight,delta,confidence:'2 zgodne treningi',target:`${settings.min}–${settings.max} powt.`,reason:`Dwa porównywalne treningi: wszystkie ${sets.length} serie osiągnęły ≥${settings.max} powt. Sprawdź technikę i zapas sił; nowy ciężar jest propozycją, nie obowiązkiem.`};
  }
  // Wskaźnik zdolności do wykonania serii; Epley służy tylko do zgrubnych PORÓWNAŃ, nie diagnozuje siły ani hipertrofii.
  function setIndex(s){return s.kg*(1+s.reps/30);}
  function sessionIndex(sets){
    const eligible=sets.filter(s=>s.reps>=4 && s.reps<=15 && s.technique!=='no');
    if(!eligible.length)return null;
    const values=eligible.map(setIndex).sort((a,b)=>b-a);
    return values.slice(0,Math.min(2,values.length)).reduce((a,b)=>a+b,0)/Math.min(2,values.length);
  }
  function compareExercise(a,b,id){
    const first=working(setsFor(a,id)),second=working(setsFor(b,id));
    if(first.length<2||second.length<2)return null;
    if(first.length!==second.length)return null;
    const x=sessionIndex(first),y=sessionIndex(second);
    if(!(x>0&&y>0))return null;
    // Duże skoki prawdopodobnie oznaczają inny sprzęt/błąd wpisu — nie interpretujemy ich automatycznie.
    if(Math.abs(y/x-1)>.35)return null;
    return {id,delta:(y/x-1)*100,previous:x,current:y,sets:second.length};
  }
  function performance(workouts,w){
    const previous=(workouts||[]).filter(other=>other.status==='complete'&&other.id!==w.id&&other.plan===w.plan&&byDate(other,w)<0).sort(byDate).at(-1);
    if(!previous)return {available:false,reason:'Pierwszy trening tego planu. Kolejny pozwoli porównać wyniki.'};
    const comparable=w.exercises.map(e=>compareExercise(previous,w,e.id)).filter(Boolean);
    if(!comparable.length)return {available:false,reason:'Brak porównywalnych ćwiczeń z taką samą liczbą serii roboczych. Nie wyliczamy pozornego progresu.',previous};
    const mean=comparable.reduce((v,e)=>v+Math.max(-12,Math.min(12,e.delta)),0)/comparable.length;
    // 50 = stabilnie; orientacyjne ±6% zdolności wykonania serii mapowane na 0/100.
    const score=Math.round(Math.max(0,Math.min(100,50+mean*(50/6))));
    const label=mean>2?'Wyniki w górę':mean>=-2?'Podobny poziom':'Wyniki niżej';
    return {available:true,previous,comparable,delta:mean,score,label,excluded:w.exercises.length-comparable.length};
  }
  function stateFor(workouts,id,settings,plan=null){
    const latest=allSessions(workouts,id,{plan}).at(-1);
    if(!latest)return 'none';
    // Nawet gdy ćwiczenie występuje w PUSH i PUSH-PULL, porównujemy je tylko w tym samym planie.
    const comparable=allSessions(workouts,id,{plan:latest.w.plan,before:latest.w}).at(-1);
    if(!comparable)return 'base';
    const result=compareExercise(comparable.w,latest.w,id);
    if(!result)return 'base';
    return result.delta>2?'up':result.delta< -2?'down':'even';
  }
  const api={exerciseSettings,cleanSettings,setsFor,working,allSessions,suggestion,performance,compareExercise,sessionIndex,stateFor,candidateWeights};
  root.GymProgress=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
