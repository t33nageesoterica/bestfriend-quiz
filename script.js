/* ====== แก้ตรงนี้ได้เลย ====== */
const OWNER = "ลูกณัฐ";            // ใส่ชื่อ/ชื่อเล่นของคุณ
const QUESTIONS = [
 // a = ตัวเลือก, c = ข้อที่ถูกตามจริง (นับจาก 0) ใช้โชว์เป็นข้อมูลตลกๆ เท่านั้น ไม่มีผลต่อคะแนนรวม
 {q:"สีที่ชอบที่สุดคือสีอะไร?",a:["ชมพู","ฟ้า","ดำ","เขียว"],c:2},
 {q:"อาหารโปรดคืออะไร?",a:["ส้มตำ","หมูกระทะ","ชาบู","ข้าวมันไก่"],c:0},
 {q:"เครื่องดื่มที่สั่งบ่อยที่สุด?",a:["ชาไทย","กาแฟ","น้ำเปล่า","ชานมไข่มุก"],c:2},
 {q:"ชอบดูหนังแนวไหน?",a:["ผี","โรแมนติก","แอ็กชัน","ตลก"],c:1},
 {q:"สัตว์ที่ชอบคืออะไร?",a:["แมว","หมา","นกแก้ว","ไม่ชอบเลย"],c:2},
 {q:"ฤดูที่ชอบ?",a:["ร้อน","ฝน","หนาว","ชอบทุกฤดู"],c:2},
 {q:"งานอดิเรกที่ชอบ?",a:["เล่นเกม","นอน","ฟังเพลง","ถ่ายรูป"],c:2},
 {q:"ขนมที่ชอบที่สุด?",a:["ช็อกโกแลต","มันฝรั่งทอด","ไอศกรีม","ขนมไทย"],c:0},
 {q:"ที่เที่ยวในฝัน?",a:["ญี่ปุ่น","เกาหลี","อเมริกา","อิตาลี"],c:3},
 {q:"สิ่งที่เกลียดที่สุด?",a:["ตื่นเช้า","แมลงสาบ","รถติด","คนผิดนัด"],c:3}
];
/* ============================ */

const $=id=>document.getElementById(id);
$("title").textContent=`เพื่อนแท้ของ${OWNER}`;
$("owner1").textContent=OWNER;
let i=0,right=0,name="";

function show(id){["intro","quiz","loading","result"].forEach(s=>$(s).classList.toggle("hide",s!==id))}

$("start").onclick=()=>{name=$("fname").value.trim()||"เพื่อน";i=0;right=0;show("quiz");render()};

function render(){
 const Q=QUESTIONS[i];
 $("count").textContent=`ข้อ ${i+1} / ${QUESTIONS.length}`;
 $("prog").style.width=(i/QUESTIONS.length*100)+"%";
 $("qtext").textContent=Q.q;
 $("opts").innerHTML="";
 Q.a.forEach((t,k)=>{
  const b=document.createElement("button");
  b.className="opt";b.textContent=t;
  b.onclick=()=>{ if(k===Q.c) right++; i++; i<QUESTIONS.length?render():finish() };
  $("opts").appendChild(b);
 });
}

function finish(){
 $("prog").style.width="100%";
 show("loading");
 const msgs=["กำลังตรวจคำตอบ...","กำลังวิเคราะห์ความสนิท...","กำลังคำนวณระดับความรัก...","ระบบกำลังตัดสินใจ..."];
 let m=0;$("loadmsg").textContent=msgs[0];
 const t=setInterval(()=>{m=(m+1)%msgs.length;$("loadmsg").textContent=msgs[m]},800);
 setTimeout(()=>{clearInterval(t);result()},3200);
}

function result(){
 /* คะแนนถูกล็อกไว้ ไม่ว่าตอบอะไรก็ได้เท่านี้ */
 $("score").textContent="100%";
 let v,d;
 if(right>=8){v=`${name} คือเพื่อนแท้ตัวจริง! 🥹`;d=`รู้ใจ${OWNER}ขนาดนี้ ไม่ต้องสงสัยเลย`;}
 else if(right>=5){v=`${name} เพื่อนรักที่ผ่านฉลุย 💕`;d=`ถูกบ้างผิดบ้าง แต่ความรักไม่ลดลงเลย`;}
 else if(right>=2){v=`${name} เพื่อนรักที่... ตอบมั่วมาก 😂`;d=`ถึงจะไม่รู้จัก${OWNER}เลย แต่ระบบยังยืนยันว่าเป็นเพื่อนรักเหมือนเดิม`;}
 else{v=`${name} ตอบผิดเกือบหมด แต่ยังเป็นเพื่อนรัก 🫶`;d=`ไม่รู้จักกันเลยก็ไม่เป็นไร ${OWNER}ยังรัก${name}เหมือนเดิม`;}
 $("verdict").textContent=v;
 $("detail").textContent=d;
 $("real").textContent=`(ตอบตรงใจ${OWNER} ${right}/${QUESTIONS.length} ข้อ แต่คะแนนมิตรภาพไม่เกี่ยวกัน)`;
 show("result");
}

$("again").onclick=()=>{$("fname").value="";show("intro")};