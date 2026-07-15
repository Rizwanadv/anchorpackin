const lines = [
  {t:'$ gcloud compute instances create anchor-web-01 \\\\',cls:'prompt'},
  {t:'    --machine-type=n2-standard-4 --zone=us-central1-a',cls:''},
  {t:'Creating instance...',cls:''},
  {t:'✓ Shielded VM boot verified (vTPM / Secure Boot)',cls:'ok'},
  {t:'✓ VPC firewall rules applied',cls:'ok'},
  {t:'✓ OS Login + Enterprise SSO bound',cls:'ok'},
  {t:'✓ Snapshot schedule: every 4h, 30-day retention',cls:'ok'},
  {t:'Instance anchor-web-01 RUNNING — 4m52s',cls:'ok'},
  {t:'',cls:''},
  {t:'$ anchor status --fleet',cls:'prompt'},
  {t:'12 instances healthy · 0 pending patches · uptime 99.98%',cls:''},
];

function runTerminal(){
  const body = document.getElementById('termBody');
  if(!body) return;
  let li = 0;
  function typeLine(){
    if(li >= lines.length){
      const cur = document.createElement('span');
      cur.className = 'cursor';
      body.appendChild(cur);
      return;
    }
    const line = lines[li];
    const div = document.createElement('div');
    div.className = 'l ' + (line.cls||'');
    body.appendChild(div);
    let ci = 0;
    const speed = line.t.length === 0 ? 0 : 14;
    function typeChar(){
      if(ci <= line.t.length){
        div.textContent = line.t.slice(0, ci);
        ci++;
        setTimeout(typeChar, speed);
      } else {
        li++;
        setTimeout(typeLine, line.t.length===0 ? 80 : 220);
      }
    }
    typeChar();
  }
  typeLine();
}
runTerminal();
