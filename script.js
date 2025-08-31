:root{
  --bg:#0f1418;
  --panel:#0b0f12;
  --muted:#9fb5d8;
  --accent:#5678ff;
  --card:#0f1720;
  --glass: rgba(255,255,255,0.03);
  --radius:14px;
  --pad:16px;
}

*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;color:#e6eefc;background:var(--bg);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{max-width:100%;height:auto;display:block}

.phone-frame{
  width: 420px;
  max-width: 94vw;
  height: 100%;
  margin: 18px auto;
  background: linear-gradient(180deg,#071018,#06121a);
  border-radius:22px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7);
  overflow: hidden;
  display:flex;
  flex-direction:column;
}

.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:12px 14px;
  background:linear-gradient(180deg,#08121a,#071018);
  border-bottom:1px solid rgba(255,255,255,0.03);
}
.brand{display:flex;align-items:center;gap:8px}
.brand-logo{width:38px;height:auto;border-radius:6px}
.smartzone-logo{width:22px;height:auto;border-radius:4px;opacity:0.95}
.brand-title{font-weight:700;color:#dfeafc;font-size:15px}
.primary-nav{display:flex;gap:8px}
.nav-btn{
  padding:8px 10px;border-radius:10px;font-weight:700;background:transparent;color:var(--muted);
  border:1px solid transparent;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.nav-btn.active, .nav-btn[aria-current="page"]{background:rgba(86,120,255,0.12);color:var(--accent);border-color:transparent}
.nav-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(86,120,255,0.3)}

.main{padding:12px;overflow:auto}

.slides{position:relative;display:block;border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.04));padding:12px;min-height:300px}
.slide{opacity:0;transform:translateX(40px);pointer-events:none;transition:opacity 0.6s ease,transform 0.6s ease;position:absolute;inset:0;display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;padding:6px}
.slide.active{opacity:1;transform:translateX(0);pointer-events:auto;position:relative}

.slide-content{text-align:center;color:#dfeafc}
.slide-content h2{margin:0 0 6px;font-size:20px;opacity:0;transform:translateY(20px);transition:all 0.6s ease}
.slide-content p{margin:0 0 6px;color:#c7d9f6;line-height:1.5;opacity:0;transform:translateY(20px);transition:all 0.6s ease}
.tagline{color:var(--accent);font-weight:700}
.slide.active .slide-content h2,.slide.active .slide-content p,.slide.active .slide-content .tagline{opacity:1;transform:translateY(0)}

.max-600{max-width:360px;margin:0 auto}

.slide-visual{width:100%;display:flex;flex-direction:column;align-items:center}
.slide-visual img{width:100%;height:auto;max-height:58vh;object-fit:contain;border-radius:12px;border:1px solid rgba(255,255,255,0.04);box-shadow:0 10px 30px rgba(0,0,0,0.5)}
.poster-hint{font-size:12px;color:#9fb5d8;margin-top:8px;animation:blink 1.8s infinite alternate}

@keyframes blink{from{opacity:0.4}to{opacity:1}}

.nav-circle{
  width:36px;
  height:36px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  color:var(--muted);
  border:none;
  font-size:18px;
  cursor:pointer;
  box-shadow:0 6px 16px rgba(0,0,0,0.35);
  transition: transform 0.3s ease;
}
.nav-circle:hover{transform:scale(1.1)}

.dots{display:flex;gap:8px;align-items:center;justify-content:center;flex:1}
.dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.06);cursor:pointer;border:1px solid rgba(0,0,0,0.12);transition:all 0.3s ease}
.dot.active{background:var(--accent);transform:scale(1.3)}

.card{background:var(--card);padding:12px;border-radius:12px;box-shadow:0 8px 28px rgba(2,6,23,0.45);transition:transform 0.4s ease,box-shadow 0.4s ease}
.card.small{padding:10px}
.card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(86,120,255,0.25)}

.row{display:flex;gap:8px}
.small-card{flex:1;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:10px;border-radius:10px;text-align:center;font-weight:700;color:var(--muted);transition:transform 0.3s ease,box-shadow 0.3s ease}
.small-card:hover{transform:translateY(-3px);box-shadow:0 6px 18px rgba(86,120,255,0.3)}

.contact-panel{display:flex;flex-direction:column;gap:12px}
.contact-card{background:var(--card);padding:12px;border-radius:12px;box-shadow:0 8px 28px rgba(2,6,23,0.45);opacity:0;transform:translateY(20px);transition:all 0.7s ease}
.contact-card.show{opacity:1;transform:translateY(0)}

.muted-small{color:#9fb5d8;font-size:13px}
.coordinators{margin-top:8px;padding-left:14px}
.coordinators li{margin:6px 0;color:#d8eaff}
.coordinators a{color:var(--accent);font-weight:700}
.map-embed{width:100%;height:200px;border-radius:10px;background:#06070a;border:1px solid rgba(255,255,255,0.02);overflow:hidden}
.map-embed iframe{width:100%;height:100%;border:0}

.socials{display:flex;gap:10px;margin-top:8px}
.socials .btn{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;transition:transform 0.3s ease}
.socials .btn:hover{transform:scale(1.05)}
.socials svg{width:18px;height:18px}

.projects-main{padding:0}
.projects-controls{display:flex;gap:8px;align-items:center;margin:8px 0;flex-direction:column}
.search-input{width:100%;padding:8px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);color:#eaf4ff}
.projects-grid{display:flex;flex-direction:column;gap:12px;margin-top:6px}
.project-card{background:var(--card);border-radius:12px;padding:10px;display:flex;gap:10px;align-items:flex-start;box-shadow:0 8px 24px rgba(0,0,0,0.45);opacity:0;transform:translateY(20px);transition:all 0.7s ease}
.project-card.show{opacity:1;transform:translateY(0)}

.project-body{flex:1}
.project-title{margin:0 0 6px;font-size:15px}
.project-desc{margin:0 0 8px;color:#cfe4ff;font-size:13px}
.project-tags{display:flex;gap:8px;flex-wrap:wrap}
.project-tag{font-size:12px;padding:4px 8px;border-radius:8px;background:rgba(255,255,255,0.02);color:var(--muted);border:1px solid rgba(255,255,255,0.03)}

.tag-btn{padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.05);color:var(--muted);cursor:pointer;transition:all 0.3s ease, transform 0.2s ease;font-weight:600}
.tag-btn:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 4px 12px rgba(0,0,0,0.25)}
.tag-btn.active{color:#fff}
.tag-btn[data-tag="iot"]{background:rgba(86,120,255,0.15);color:#7aa3ff}
.tag-btn[data-tag="iot"].active{background:var(--accent);color:#fff;animation:pulse-iot 1s ease}
.tag-btn[data-tag="robotics"]{background:rgba(255,120,86,0.15);color:#ff9c7a}
.tag-btn[data-tag="robotics"].active{background:#ff7846;color:#fff;animation:pulse-robotics 1s ease}

@keyframes pulse-iot{0%{box-shadow:0 0 0 0 rgba(86,120,255,0.6)}70%{box-shadow:0 0 0 12px rgba(86,120,255,0)}100%{box-shadow:0 0 0 0 rgba(86,120,255,0)}}
@keyframes pulse-robotics{0%{box-shadow:0 0 0 0 rgba(255,120,86,0.6)}70%{box-shadow:0 0 0 12px rgba(255,120,86,0)}100%{box-shadow:0 0 0 0 rgba(255,120,86,0)}}

.modal{display:none;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(6,10,16,0.86);z-index:120;opacity:0;transform:scale(0.9);transition:opacity 0.4s ease,transform 0.4s ease}
.modal.active{display:flex;opacity:1;transform:scale(1)}
.modal img{max-width:92vw;max-height:90vh;border-radius:10px}
.modal-close{position:absolute;right:16px;top:12px;background:none;border:none;color:#eaf2ff;font-size:26px;cursor:pointer}

@media (max-width:768px){
  .phone-frame{width:100%;height:100%;border-radius:0;margin:0;box-shadow:none}
  body,html{margin:0;padding:0;width:100%;height:100%}
}
