// SHHER-ART Center · Nerve Block Reference System

(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    selectedId: null,
    query: '',
    tab: 'dx',
  };

  // ---------- Utilities ----------
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    let out = escapeHtml(text);
    tokens.forEach(tok => {
      if (!tok) return;
      const re = new RegExp('(' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark class="hl">$1</mark>');
    });
    return out;
  }

  function matches(dx, query) {
    if (!query) return true;
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const hay = (
      dx.nameZh + ' ' + dx.nameEn + ' ' + (dx.keywords || []).join(' ')
    ).toLowerCase();
    return tokens.every(t => hay.includes(t));
  }

  function hostOf(url) {
    try { return new URL(url).host.replace(/^www\./, ''); }
    catch { return url; }
  }

  // ---------- Render: Left list ----------
  function renderList() {
    const list = $('#dxList');
    const filtered = DIAGNOSES.filter(d => matches(d, state.query));

    if (filtered.length === 0) {
      list.innerHTML =
        '<div class="dx-empty"><b>未找到符合的診斷</b><br/>試試：clavicle、髖部、ankle、肋骨...</div>';
      return;
    }

    const byRegion = {};
    REGIONS.forEach(r => (byRegion[r] = []));
    filtered.forEach(d => byRegion[d.region].push(d));

    list.innerHTML = REGIONS
      .filter(r => byRegion[r].length > 0)
      .map(r => {
        const items = byRegion[r]
          .map(d => {
            const active = d.id === state.selectedId ? ' active' : '';
            return `<div class="dx-item${active}" data-id="${d.id}">
              <div class="dx-zh">${highlight(d.nameZh, state.query)}</div>
              <div class="dx-en">${highlight(d.nameEn, state.query)}</div>
            </div>`;
          })
          .join('');
        return `<div class="dx-group">
          <div class="dx-group-title">${r}（${byRegion[r].length}）</div>
          ${items}
        </div>`;
      })
      .join('');

    $$('.dx-item', list).forEach(el => {
      el.addEventListener('click', () => selectDx(el.dataset.id));
    });
  }

  // ---------- Render: Right detail ----------
  function renderWelcome() {
    $('#detailPane').innerHTML = `
      <div class="welcome">
        <img src="assets/logo-shh.svg" alt="" class="welcome-logo" />
        <h1>SHHER-ART Center</h1>
        <div class="sub">雙和醫院 先進與革新急症技術中心 · 急診 Nerve Block 即時查詢系統</div>

        <div class="welcome-grid">
          <div class="welcome-card"><b>🔍 即時搜尋</b>輸入中文或英文關鍵字，左欄即時過濾。</div>
          <div class="welcome-card"><b>📋 診斷導向</b>從常見急診外傷快速取得對應神經阻斷建議。</div>
          <div class="welcome-card"><b>🔗 NYSORA 連結</b>每項建議皆附原始教學資源連結。</div>
          <div class="welcome-card"><b>⚠️ LAST 安全</b>內建 Lipid Emulsion 劑量計算與處置流程。</div>
          <div class="welcome-card"><b>💊 藥物資訊</b>本院藥物劑型、最大劑量、Epi 稀釋計算。</div>
          <div class="welcome-card"><b>📝 病歷範本</b>含可複製病歷與可列印 Checklist。</div>
          <a class="welcome-card welcome-card-link" href="resources/SHHER-ART%20Center%20Nerve%20Block%20Handbook.pdf" target="_blank" rel="noopener">
            <b>📥 下載原始手冊</b>SHHER-ART Center Nerve Block Handbook PDF
          </a>
        </div>

        <div class="disclaimer">
          <b>免責聲明：</b>本系統內容彙整自《SHHER-ART Center Nerve Block Handbook》，
          參考資料為 POCUS Academy 與 NYSORA。資料僅供臨床參考，實際使用須由具備執行能力的醫師
          依個別病患情況臨床判斷，並遵循院內標準作業流程。
        </div>
      </div>
    `;
  }

  function renderDetail(dx) {
    const blocksHtml = dx.blocks.length === 0
      ? ''
      : `<div class="block-list">
          <h3 style="margin-top:1.25rem">建議神經阻斷</h3>
          ${dx.blocks.map(b => `
            <div class="block-card">
              <div class="block-name">${escapeHtml(b.name)}</div>
              <div class="block-volume">劑量 ${escapeHtml(b.volume)}</div>
              ${b.note ? `<div class="block-note">${escapeHtml(b.note)}</div>` : ''}
              ${b.nysora ? `<a class="nysora-link" href="${escapeHtml(b.nysora)}" target="_blank" rel="noopener">在 ${hostOf(b.nysora)} 開啟教學</a>` : ''}
            </div>
          `).join('')}
        </div>`;

    $('#detailPane').innerHTML = `
      <div class="dx-detail">
        <div class="region-tag">${escapeHtml(dx.region)}</div>
        <h1>${escapeHtml(dx.nameZh)}</h1>
        <div class="dx-subtitle">${escapeHtml(dx.nameEn)}</div>
        ${dx.warning ? `<div class="warning-box">${escapeHtml(dx.warning)}</div>` : ''}
        ${dx.tip ? `<div class="tip-box"><b>策略提示：</b>${escapeHtml(dx.tip)}</div>` : ''}
        ${blocksHtml}
        <div class="dx-actions">
          <button data-tab="drug">💊 查看藥物與劑量</button>
          <button data-tab="last">⚠️ LAST 處置流程</button>
          <button data-tab="record">📝 病歷範本</button>
        </div>
      </div>
    `;

    $$('.dx-actions button').forEach(b =>
      b.addEventListener('click', () => switchTab(b.dataset.tab))
    );
  }

  function selectDx(id) {
    state.selectedId = id;
    const dx = DIAGNOSES.find(d => d.id === id);
    if (!dx) {
      renderWelcome();
      return;
    }
    renderList();
    renderDetail(dx);
    // update hash without scroll
    history.replaceState(null, '', `#/dx/${id}`);
    // On mobile (single-column), scroll the detail pane into view
    if (window.matchMedia('(max-width: 900px)').matches) {
      const pane = document.getElementById('detailPane');
      if (pane) pane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ---------- Tabs ----------
  function switchTab(tabName) {
    state.tab = tabName;
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    $$('.panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tabName));
    const hashPart = state.selectedId && tabName === 'dx' ? `/dx/${state.selectedId}` : `/${tabName}`;
    history.replaceState(null, '', '#' + hashPart);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- Drug tab ----------
  function renderDrugTable() {
    const cols = [
      ['特性', null],
      ['分類', 'class'],
      ['起效時間', 'onset'],
      ['作用時間', 'duration'],
      ['蛋白結合率', 'proteinBinding'],
      ['脂溶性', 'lipidSolubility'],
      ['本院劑型', 'formulation'],
      ['最大劑量（無 Epi）', 'maxDose'],
      ['最大劑量（含 Epi）', 'maxDoseEpi'],
      ['心臟/CNS 毒性', 'toxicity'],
      ['常用濃度', 'concentration'],
      ['臨床應用', 'use'],
    ];
    let html = '<thead><tr><th>特性</th>' +
      ANESTHETICS.map(a => `<th>${escapeHtml(a.name)}</th>`).join('') +
      '</tr></thead><tbody>';
    cols.slice(1).forEach(([label, key]) => {
      html += `<tr><td><b>${label}</b></td>` +
        ANESTHETICS.map(a => `<td>${escapeHtml(a[key])}</td>`).join('') +
        '</tr>';
    });
    html += '</tbody>';
    $('#drugTable').innerHTML = html;
  }

  function renderAdjuvants() {
    $('#adjuvantList').innerHTML = ADJUVANTS.map(a => `
      <div class="card">
        <h4>${escapeHtml(a.name)}</h4>
        <p><b>用途：</b>${escapeHtml(a.use)}</p>
        <p><b>劑量：</b>${escapeHtml(a.dose)}</p>
        ${a.tip ? `<p style="font-size:0.82rem;color:var(--gray-600);margin-top:0.5rem">💡 ${escapeHtml(a.tip)}</p>` : ''}
      </div>
    `).join('');
  }

  function renderBilling() {
    let html = '<thead><tr><th>計價碼</th><th>品項</th><th>計價</th></tr></thead><tbody>';
    BILLING_CODES.forEach(b => {
      html += `<tr><td><code>${escapeHtml(b.code)}</code></td><td>${escapeHtml(b.item)}</td><td>${escapeHtml(b.price)}</td></tr>`;
    });
    html += '</tbody>';
    $('#billingTable').innerHTML = html;
  }

  function setupEpiCalc() {
    function calc() {
      const target = parseInt($('#epiTarget').value, 10);
      const finalVol = parseInt($('#epiFinalVol').value, 10);
      // 1:N => 1g epi / N mL  =>  required epi (mg) = finalVol / N * 1000
      // 1:1000 stock => 1 mg/mL
      // mL of 1:1000 epi = finalVol / N * 1000 / 1 = finalVol / N * 1000 mg / (1 mg/mL) = finalVol/N * 1000 mL? No.
      // Correct: 1:200000 means 1 g in 200000 mL i.e. 1 mg in 200 mL i.e. 0.005 mg/mL
      // mg of epi needed = finalVol(mL) * (1000 / target) = finalVol * 1000 / target mg
      // mL of 1:1000 stock (1 mg/mL) = mg / 1 = finalVol * 1000 / target mL
      // Sanity: 20 mL final, target 200000 => 20*1000/200000 = 0.1 mL ✓
      const mlNeeded = (finalVol * 1000 / target);
      $('#epiResult').innerHTML = `
        加入 <b>1:1000 Epinephrine ${mlNeeded.toFixed(2)} mL</b> 至最終總量 <b>${finalVol} mL</b> 的溶液，
        即可得到 <b>1:${target.toLocaleString()}</b> 濃度。
        <br/><small style="color:var(--gray-600)">作法：先取出 Bupivacaine/Ropivacaine 原瓶 20 mL，加入此量 epinephrine，必要時加生理食鹽水補至最終量。</small>
      `;
    }
    $('#epiTarget').addEventListener('change', calc);
    $('#epiFinalVol').addEventListener('change', calc);
    calc();
  }

  // ---------- LAST tab ----------
  function setupLastCalc() {
    function calc() {
      const w = parseFloat($('#lastWeight').value) || 0;
      if (w <= 0) {
        $('#lastResult').innerHTML = '請輸入有效體重';
        return;
      }
      const bolus = Math.min(w * 1.5, 100);
      const infusion = (w * 0.25).toFixed(1);
      const infusionDouble = (w * 0.5).toFixed(1);
      const repeatBolus = (w * 1.5).toFixed(0);
      $('#lastResult').innerHTML = `
        <b>20% Intralipid 處方（體重 ${w} kg）：</b><br/>
        ① <b>Bolus：1.5 mL/kg = ${bolus.toFixed(0)} mL</b> IV push（上限 100 mL）<br/>
        ② <b>Infusion：0.25 mL/kg/min = ${infusion} mL/min</b> 持續輸注<br/>
        ③ 若無改善：可重複 bolus ${repeatBolus} mL，並將滴速加倍至 <b>${infusionDouble} mL/min</b><br/>
        ④ Cardiovascular stability 後再持續輸注 10 分鐘<br/>
        ⑤ 監測 12 小時
      `;
    }
    $('#lastWeight').addEventListener('input', calc);
    calc();
  }

  // ---------- Record template ----------
  const RECORD_TEXT = `Inform the indications, risks and complications of peripheral nerve block.
Patient/family agreed with nerve block for pain control.

Indication: [ex. Lt intertrochanteric fracture]
Target: [ex. Lt femoral nerve]
Findings: identified target nerve and adjacent vessels under ultrasound

Procedure:
1. Antiseptic preparation
2. Total amount of LA: Marcaine 0.5% 10 mL (with 1:200K epinephrine)
   / 0.25% 20 mL (with 1:200K epinephrine) around target
3. No complication noted during or after the procedure
4. Patient tolerated the procedure well
5. Suggestion: wound care, observation
6. NRS: pre-nerve block (   ) → post-nerve block (   )

Performed by: ___________   Supervisor: ___________`;

  function setupRecord() {
    $('#recordTemplate').value = RECORD_TEXT;
    $('#copyRecordBtn').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText($('#recordTemplate').value);
        const btn = $('#copyRecordBtn');
        btn.classList.add('copied');
        btn.textContent = '✓ 已複製';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '📋 複製到剪貼簿';
        }, 1500);
      } catch (e) {
        alert('複製失敗，請手動選取文字複製');
      }
    });
  }

  // 把整份 Checklist（含勾選狀態與已填欄位）轉成純文字
  function buildChecklistText() {
    const root = $('.checklist.printable');
    if (!root) return '';
    const lines = [];
    $$(':scope > *', root).forEach(node => {
      const tag = node.tagName;
      if (tag === 'H3') {
        if (lines.length) lines.push('');
        lines.push('【' + node.textContent.trim() + '】');
      } else if (tag === 'TABLE') {
        $$('tr', node).forEach(tr => {
          const cells = $$('td', tr);
          if (cells.length < 2) return;
          const label = cells[0].textContent.trim();
          const valCell = cells[1];
          let value;
          if (valCell.classList.contains('inline-checks')) {
            const picked = $$('label', valCell)
              .filter(l => l.querySelector('input').checked)
              .map(l => l.textContent.trim());
            value = picked.length ? picked.join('、') : '____';
          } else {
            // 依序串接文字節點與 input 值，保留如 NRS「術前 _/10 術後 _/10」的脈絡
            let buf = '';
            valCell.childNodes.forEach(n => {
              if (n.nodeType === Node.TEXT_NODE) buf += n.textContent;
              else if (n.tagName === 'INPUT') buf += (n.value.trim() || '__');
            });
            value = buf.replace(/\s+/g, ' ').trim() || '____';
          }
          lines.push(label + '：' + value);
        });
      } else if (tag === 'UL') {
        $$('li', node).forEach(li => {
          const box = li.querySelector('input[type="checkbox"]');
          const text = li.textContent.trim();
          lines.push((box && box.checked ? '☑ ' : '☐ ') + text);
        });
      } else if (tag === 'TEXTAREA') {
        lines.push('備註：');
        lines.push(node.value.trim());
      }
    });
    return lines.join('\n');
  }

  function setupChecklistCopy() {
    const btn = $('#copyChecklistBtn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(buildChecklistText());
        btn.classList.add('copied');
        btn.textContent = '✓ 已複製';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = '📋 複製到剪貼簿';
        }, 1500);
      } catch (e) {
        alert('複製失敗，請手動選取文字複製');
      }
    });
  }

  // 重設整個病歷分頁：還原範本預設值，並清空 Checklist 所有欄位
  // （頁面上有多顆「重設」按鈕，皆以 .reset-btn 綁定）
  function setupRecordReset() {
    $$('.reset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('確定要清除所有已填內容並還原預設範本嗎？')) return;
        $('#recordTemplate').value = RECORD_TEXT;
        const cl = $('.checklist.printable');
        if (cl) {
          $$('input', cl).forEach(i => {
            if (i.type === 'checkbox') i.checked = false;
            else i.value = '';
          });
          $$('textarea', cl).forEach(t => t.value = '');
        }
        btn.textContent = '✓ 已重設';
        setTimeout(() => { btn.textContent = '↺ 重設'; }, 1500);
      });
    });
  }

  // ---------- Hash routing ----------
  function readHash() {
    const h = location.hash.replace(/^#/, '');
    const parts = h.split('/').filter(Boolean);
    // formats: /dx/<id> or /<tab>
    if (parts.length === 0) return;
    if (parts[0] === 'dx' && parts[1]) {
      state.tab = 'dx';
      state.selectedId = parts[1];
    } else if (['dx','drug','last','derma','record'].includes(parts[0])) {
      state.tab = parts[0];
    }
  }

  // ---------- Init ----------
  function init() {
    readHash();

    // Tab nav
    $$('.tab').forEach(t => {
      t.addEventListener('click', () => switchTab(t.dataset.tab));
    });

    // Search
    const search = $('#searchInput');
    search.addEventListener('input', () => {
      state.query = search.value.trim();
      renderList();
    });

    $('#dxCount').textContent = DIAGNOSES.length;

    // Render
    renderList();
    if (state.selectedId) {
      const dx = DIAGNOSES.find(d => d.id === state.selectedId);
      if (dx) renderDetail(dx);
      else renderWelcome();
    } else {
      renderWelcome();
    }

    renderDrugTable();
    renderAdjuvants();
    renderBilling();
    setupEpiCalc();
    setupLastCalc();
    setupRecord();
    setupChecklistCopy();
    setupRecordReset();

    // Initial tab
    switchTab(state.tab);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
