let member="",appearance=[],personality=[],detail="",intro="",desc="",points=0;

const members=[
 ["Mother","She"],["Father","He"],["Brother","He"],["Sister","She"],["Grandmother","She"],["Grandfather","He"]
];
const appearances=[
 ["tall","Appearance"],["short","Appearance"],["has long hair","Appearance"],["has short hair","Appearance"],
 ["has glasses","Appearance"],["has curly hair","Appearance"],["has a friendly smile","Appearance"],["is young","Appearance"],["is old","Appearance"]
];
const personalities=["kind","caring","funny","friendly","helpful","hardworking","patient","cheerful","brave"];
const details=[
 ["is a teacher","Job"],["works at a hospital","Job"],["works in an office","Job"],["cooks for our family","Activity"],
 ["plays football with me","Activity"],["helps me with my homework","Activity"],["likes watching films with me","Activity"],["takes me to school","Activity"]
];

function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active")}
function start(){member="";appearance=[];personality=[];detail="";intro="";desc="";points=0;show("member");renderMembers()}
function renderMembers(){
 document.getElementById("memberChoices").innerHTML=members.map((m,i)=>`<button class="choice" onclick="pickMember(${i})">👤<br>${m[0]}<small>${m[1]}</small></button>`).join("");
}
function pickMember(i){member=members[i][0];show("appearance");renderAppearance()}
function renderAppearance(){
 document.getElementById("appearanceChoices").innerHTML=appearances.map((x,i)=>`<button class="choice ${appearance.includes(x[0])?"selected":""}" onclick="toggleAppearance(${i})">${x[0]}</button>`).join("");
 updateChosen("appearance");
}
function toggleAppearance(i){let v=appearances[i][0];if(appearance.includes(v))appearance=appearance.filter(x=>x!==v);else if(appearance.length<2)appearance.push(v);renderAppearance()}
function renderPersonality(){
 document.getElementById("personalityChoices").innerHTML=personalities.map((x,i)=>`<button class="choice ${personality.includes(x)?"selected":""}" onclick="togglePersonality(${i})">${x}</button>`).join("");
 updateChosen("personality");
}
function togglePersonality(i){let v=personalities[i];if(personality.includes(v))personality=personality.filter(x=>x!==v);else if(personality.length<2)personality.push(v);renderPersonality()}
function updateChosen(type){
 let arr=type==="appearance"?appearance:personality;
 let el=document.getElementById(type+"Chosen");
 el.textContent=arr.length?arr.join(" · "):`Choose ${2-arr.length} more`;
 document.getElementById(type+"Next").disabled=arr.length!==2;
}
function goPersonality(){show("personality");renderPersonality()}
function goDetails(){
 show("details");
 document.getElementById("detailChoices").innerHTML=details.map((x,i)=>`<button class="choice ${detail===x[0]?"selected":""}" onclick="pickDetail(${i})">${x[0]}<small>${x[1]}</small></button>`).join("");
}
function pickDetail(i){detail=details[i][0];document.querySelectorAll("#detailChoices .choice").forEach((b,n)=>b.classList.toggle("selected",n===i));document.getElementById("detailChosen").textContent=detail;document.getElementById("detailNext").disabled=false}
function goBuild(){
 show("build");
 const pronoun=members.find(x=>x[0]===member)[1];
 const a=appearance.join(" and "), p=personality.join(" and ");
 document.getElementById("introOptions").innerHTML=[
  `This is my ${member.toLowerCase()}.`,
  `My ${member.toLowerCase()} this is.`,
  `This my ${member.toLowerCase()}.`
 ].map((x,i)=>`<button class="sentence" onclick="chooseIntro(${i})">${x}</button>`).join("");
 document.getElementById("descOptions").innerHTML=[
  `${pronoun} is ${p}. ${pronoun} ${appearance[0]} and ${appearance[1]}.`,
  `${pronoun} ${p} ${appearance[0]}.`,
  `My ${member.toLowerCase()} is ${p} ${appearance[0]}.`
 ].map((x,i)=>`<button class="sentence" onclick="chooseDesc(${i})">${x}</button>`).join("");
}
function chooseIntro(i){
 intro=i===0?`This is my ${member.toLowerCase()}.`:"";
 document.querySelectorAll("#introOptions .sentence").forEach((b,n)=>b.classList.toggle("selected",n===i));
 if(i===0)points++;
 checkBuild();
}
function chooseDesc(i){
 const pronoun=members.find(x=>x[0]===member)[1],a=appearance.join(" and "),p=personality.join(" and ");
 desc=i===0?`${pronoun} is ${p}. ${pronoun} ${appearance[0]} and ${appearance[1]}.`:"";
 document.querySelectorAll("#descOptions .sentence").forEach((b,n)=>{b.classList.remove("selected","correct","wrong");b.classList.toggle("selected",n===i)});
 if(i===0)points++;
 checkBuild();
}
function checkBuild(){document.getElementById("buildNext").disabled=!(intro&&desc)}
function goFinal(){
 show("final");
 const pronoun=members.find(x=>x[0]===member)[1];
 const capDetail=detail.charAt(0).toLowerCase()+detail.slice(1);
 document.getElementById("paragraph").innerHTML=
 `${intro} ${desc} ${pronoun} ${capDetail}. ${pronoun} is a special part of my family, and I enjoy spending time with ${pronoun.toLowerCase()==="he"?"him":"her"}.`;
}
function finish(){
 show("result");
 let total=5;
 // Member selection, appearance, personality, detail, sentence building
 if(appearance.length===2)points++;
 if(personality.length===2)points++;
 if(detail)points++;
 const final=Math.min(5,points);
 document.getElementById("finalScore").textContent=`${final} / ${total}`;
 document.getElementById("resultText").textContent=final===5?
 "Excellent! You know how to introduce, describe and add details about a family member. You are ready to write your own paragraph!":
 final>=4?"Great work! You can now build a clear description of a family member. Keep practising your sentences.":
 "Good start! Remember the formula: WHO + LOOKS + PERSONALITY + WHAT THEY DO.";
}
