/* ============================================================================
   Venta Normandía 301 — app
   Vanilla JS. No build step, no dependencies.
   ========================================================================== */

(function () {
  'use strict';

  /* --- state ------------------------------------------------------------ */

  var KEY = 'normandia301.v1';
  var state = {
    lang: 'es',
    done: {},     // taskId / subtaskId -> true
    open: {},     // taskId -> true
    track: {},    // boardRowId -> { ref, status, date }
    notes: ''
  };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          state.lang  = saved.lang === 'en' ? 'en' : 'es';
          state.done  = saved.done  || {};
          state.open  = saved.open  || {};
          state.track = saved.track || {};
          state.notes = typeof saved.notes === 'string' ? saved.notes : '';
        }
      } else {
        var nav = (navigator.language || '').toLowerCase();
        state.lang = nav.indexOf('es') === 0 ? 'es' : (nav.indexOf('en') === 0 ? 'en' : 'es');
      }
    } catch (e) { /* private mode, blocked storage — run with defaults */ }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* --- helpers ---------------------------------------------------------- */

  function t(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'string') return v;
    return v[state.lang] !== undefined ? v[state.lang] : (v.es || v.en || '');
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  var ICONS = {
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowDown:  '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    chevronUp:  '<path d="m18 15-6-6-6 6"/>',
    chevronDown:'<path d="m6 9 6 6 6-6"/>',
    info:       '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    x:          '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check:      '<path d="M20 6 9 17l-5-5"/>',
    copy:       '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  function iconEl(name) {
    var span = document.createElement('span');
    span.style.display = 'contents';
    span.innerHTML = icon(name);
    return span.firstChild;
  }

  /* --- clipboard -------------------------------------------------------- */

  var toastEl, toastTimer;

  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }

  function copyText(text, onDone) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      onDone(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { onDone(true); }, fallback);
    } else {
      fallback();
    }
  }

  /* --- task index ------------------------------------------------------- */

  var ALL_TASKS = [];
  var TASK_BY_ID = {};
  TRACKS.forEach(function (tr) {
    tr.tasks.forEach(function (task) {
      task._track = tr;
      ALL_TASKS.push(task);
      TASK_BY_ID[task.id] = task;
    });
  });

  var BOARD_BY_ID = {};
  BOARD.rows.forEach(function (r) { BOARD_BY_ID[r.id] = r; });

  function subtasksOf(task) {
    var out = [];
    (task.blocks || []).forEach(function (b) {
      if (b.type === 'subtasks') b.items.forEach(function (i) { out.push(i); });
    });
    return out;
  }

  // A track's completion counts each top-level task once.
  function trackProgress(track) {
    var total = track.tasks.length;
    var done = 0;
    track.tasks.forEach(function (task) { if (state.done[task.id]) done++; });
    return { done: done, total: total };
  }

  function totalProgress() {
    var total = 0, done = 0;
    TRACKS.forEach(function (tr) {
      var p = trackProgress(tr);
      total += p.total; done += p.done;
    });
    return { done: done, total: total };
  }

  function getTrack(rowId) {
    if (!state.track[rowId]) {
      var row = BOARD_BY_ID[rowId];
      state.track[rowId] = { ref: '', status: (row && row.defaultStatus) || 'pendiente', date: '' };
    }
    return state.track[rowId];
  }

  /* --- reveal observer -------------------------------------------------- */

  var revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  }

  function reveal(node, delayMs) {
    node.classList.add('reveal');
    if (delayMs) node.style.setProperty('--d', delayMs + 'ms');
    if (revealObserver) revealObserver.observe(node);
    else node.classList.add('in');
    return node;
  }

  /* ======================================================================
     RENDER — navbar
     ====================================================================== */

  function renderNav() {
    var nav = document.getElementById('nav');
    nav.innerHTML = '';

    var left = el('div', 'nav-left');

    var brand = document.createElement('a');
    brand.className = 'nav-brand nav-anim';
    brand.href = '#top';
    brand.appendChild(el('span', 'nav-brand-name', t(UI.brand)));
    brand.appendChild(el('span', 'nav-brand-sub', t(UI.brandSub)));
    left.appendChild(brand);

    var links = el('nav', 'nav-links');
    links.setAttribute('aria-label', t(UI.menu));
    NAV.filter(function (item) { return NAV_MAIN.indexOf(item.id) !== -1; })
       .forEach(function (item, i) {
      var a = document.createElement('a');
      a.className = 'nav-link nav-anim';
      a.href = '#' + item.id;
      a.dataset.target = item.id;
      a.textContent = t(item.label);
      a.style.transitionDelay = (i * 80 + 100) + 'ms';
      links.appendChild(a);
    });
    left.appendChild(links);
    nav.appendChild(left);

    var right = el('div', 'nav-right nav-anim');
    right.style.transitionDelay = '500ms';

    // progress
    var prog = el('div', 'nav-progress');
    var pNum = el('span', 'nav-progress-num');
    pNum.id = 'navProgressNum';
    var pTrack = el('div', 'nav-progress-track');
    var pFill = el('div', 'nav-progress-fill');
    pFill.id = 'navProgressFill';
    pTrack.appendChild(pFill);
    prog.appendChild(pNum);
    prog.appendChild(pTrack);
    right.appendChild(prog);

    // language toggle
    var lang = el('div', 'lang');
    lang.setAttribute('role', 'group');
    lang.setAttribute('aria-label', t(UI.langLabel));
    [['es', 'ES'], ['en', 'EN']].forEach(function (pair) {
      var b = el('button', 'lang-btn' + (state.lang === pair[0] ? ' active' : ''), pair[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(state.lang === pair[0]));
      b.addEventListener('click', function () { setLang(pair[0]); });
      lang.appendChild(b);
    });
    right.appendChild(lang);

    // menu
    var menuBtn = el('button', 'nav-menu-label', t(UI.menu));
    menuBtn.type = 'button';
    menuBtn.addEventListener('click', openMenu);
    right.appendChild(menuBtn);

    var burger = el('button', 'burger');
    burger.type = 'button';
    burger.setAttribute('aria-label', t(UI.menu));
    burger.appendChild(el('span', 'bar bar-1'));
    burger.appendChild(el('span', 'bar bar-2'));
    burger.appendChild(el('span', 'bar bar-3'));
    burger.addEventListener('click', openMenu);
    right.appendChild(burger);

    nav.appendChild(right);

    setTimeout(function () { nav.classList.add('ready'); }, 200);
    updateProgressUI();
  }

  /* ======================================================================
     RENDER — overlay menu
     ====================================================================== */

  function renderOverlay() {
    var ov = document.getElementById('overlay');
    ov.innerHTML = '';

    var inner = el('div', 'overlay-inner');

    var top = el('div', 'overlay-top');
    var close = el('button', 'circle circle-40 overlay-close');
    close.type = 'button';
    close.setAttribute('aria-label', t(UI.close));
    close.appendChild(iconEl('x'));
    close.addEventListener('click', closeMenu);
    top.appendChild(close);
    inner.appendChild(top);

    var list = el('nav', 'overlay-links');
    list.setAttribute('aria-label', t(UI.menu));
    NAV.forEach(function (item, i) {
      var a = document.createElement('a');
      a.className = 'overlay-link';
      a.href = '#' + item.id;
      a.dataset.target = item.id;
      a.style.transitionDelay = (i * 60) + 'ms';
      a.appendChild(el('span', 'overlay-link-n', String(i + 1).padStart(2, '0')));
      a.appendChild(el('span', null, t(item.label)));
      a.addEventListener('click', closeMenu);
      list.appendChild(a);
    });
    inner.appendChild(list);

    var foot = el('div', 'overlay-foot');
    var pr = el('button', null, t(UI.print));
    pr.type = 'button';
    pr.addEventListener('click', function () { closeMenu(); setTimeout(function () { window.print(); }, 450); });
    var rs = el('button', null, t(UI.resetAll));
    rs.type = 'button';
    rs.addEventListener('click', resetAll);
    foot.appendChild(pr);
    foot.appendChild(rs);
    inner.appendChild(foot);

    ov.appendChild(inner);
  }

  function openMenu() {
    document.getElementById('overlay').classList.add('open');
    document.body.classList.add('is-locked');
  }
  function closeMenu() {
    document.getElementById('overlay').classList.remove('open');
    document.body.classList.remove('is-locked');
  }

  /* ======================================================================
     RENDER — hero
     ====================================================================== */

  function renderHero() {
    var host = document.getElementById('top');
    host.innerHTML = '';
    host.className = 'hero';

    var inner = el('div');
    inner.appendChild(reveal(el('p', 'hero-eyebrow', t(HERO.eyebrow)), 0));
    inner.appendChild(reveal(el('h1', null, t(HERO.title)), 100));
    inner.appendChild(reveal(el('p', 'hero-sub', t(HERO.subtitle)), 250));
    inner.appendChild(reveal(el('p', 'hero-intro', t(HERO.intro)), 400));

    var p = totalProgress();
    var stats = reveal(el('div', 'hero-stats'), 550);
    var stat = el('div');
    var num = el('div', 'hero-stat-num');
    num.id = 'heroNum';
    num.textContent = String(p.done);
    var small = el('small');
    small.id = 'heroTotal';
    small.textContent = '/ ' + p.total;
    num.appendChild(small);
    stat.appendChild(num);
    stat.appendChild(el('div', 'hero-stat-label', t(UI.tasksDone)));
    var bar = el('div', 'hero-bar');
    var fill = el('div', 'hero-bar-fill');
    fill.id = 'heroFill';
    bar.appendChild(fill);
    stat.appendChild(bar);
    stats.appendChild(stat);
    inner.appendChild(stats);

    host.appendChild(inner);

    var down = document.createElement('a');
    down.className = 'circle circle-48 hero-down';
    down.href = '#vias';
    down.setAttribute('aria-label', t(UI.scrollDown));
    down.appendChild(iconEl('arrowDown'));
    host.appendChild(reveal(down, 700));
  }

  /* ======================================================================
     RENDER — three ways
     ====================================================================== */

  function renderWays() {
    var host = document.getElementById('vias');
    host.innerHTML = '';

    var wrap = el('div', 'wrap');
    var head = el('div', 'section-head');
    head.appendChild(reveal(el('span', 'section-num', '01'), 0));
    head.appendChild(reveal(el('h2', 'section-title', t(THREE_WAYS.title)), 100));
    head.appendChild(reveal(el('p', 'section-lead', t(THREE_WAYS.lead)), 200));
    wrap.appendChild(head);

    var grid = el('div', 'ways');
    THREE_WAYS.items.forEach(function (item, i) {
      var a = document.createElement('a');
      a.className = 'way';
      a.href = '#' + item.target;
      a.appendChild(el('span', 'way-key', item.key));
      a.appendChild(el('h3', 'way-name', t(item.name)));
      a.appendChild(el('p', 'way-text', t(item.text)));
      var go = el('span', 'way-go');
      go.appendChild(el('span', null, t(NAV.filter(function (n) { return n.id === item.target; })[0].label)));
      go.appendChild(iconEl('arrowRight'));
      a.appendChild(go);
      grid.appendChild(reveal(a, 150 + i * 120));
    });
    wrap.appendChild(grid);

    wrap.appendChild(reveal(el('p', 'rule-line', t(THREE_WAYS.rule)), 500));
    host.appendChild(wrap);
  }

  /* ======================================================================
     RENDER — property data
     ====================================================================== */

  function renderProperty() {
    var host = document.getElementById('inmueble');
    host.innerHTML = '';

    var wrap = el('div', 'wrap');
    var head = el('div', 'section-head');
    head.appendChild(reveal(el('span', 'section-num', '02'), 0));
    head.appendChild(reveal(el('h2', 'section-title', t(PROPERTY.title)), 100));
    head.appendChild(reveal(el('p', 'section-lead', t(PROPERTY.lead)), 200));
    wrap.appendChild(head);

    var grid = el('div', 'datagrid');
    PROPERTY.rows.forEach(function (row) {
      var value = t(row.v);
      var sub = row.sub ? t(row.sub) : '';
      var cell;
      if (row.copy) {
        cell = el('button', 'datacell');
        cell.type = 'button';
        cell.title = t(UI.copyField);
        cell.appendChild(iconEl('copy')).classList.add('datacell-copy');
        cell.addEventListener('click', function () {
          copyText(sub ? value + ' — ' + sub : value, function (ok) {
            if (ok) {
              cell.classList.add('copied');
              toast(t(UI.copied));
              setTimeout(function () { cell.classList.remove('copied'); }, 1400);
            }
          });
        });
      } else {
        cell = el('div', 'datacell');
      }
      cell.appendChild(el('span', 'datacell-k', t(row.k)));
      cell.appendChild(el('span', 'datacell-v', value));
      if (sub) cell.appendChild(el('span', 'datacell-sub', sub));
      grid.appendChild(cell);
    });
    wrap.appendChild(reveal(grid, 300));

    wrap.appendChild(reveal(el('p', 'note-dark', t(PROPERTY.note)), 380));
    wrap.appendChild(reveal(el('p', 'callout-dark', t(PROPERTY.areaWarn)), 420));

    var chain = el('div', 'chain');
    chain.appendChild(reveal(el('h3', 'section-title', t(PROPERTY.chainTitle)), 0));
    chain.appendChild(reveal(el('p', 'section-lead', t(PROPERTY.chainLead)), 100));
    var list = el('div', 'chain-list');
    PROPERTY.chain.forEach(function (c) {
      var item = el('div', 'chain-item');
      item.appendChild(el('span', 'chain-n', c.n + ' · ' + c.date));
      item.appendChild(el('p', 'chain-t', t(c.t)));
      list.appendChild(item);
    });
    chain.appendChild(reveal(list, 200));
    wrap.appendChild(chain);

    host.appendChild(wrap);
  }

  /* ======================================================================
     RENDER — task blocks
     ====================================================================== */

  function renderSnippet(block) {
    var node = el('div', 'snippet');

    var head = el('div', 'snippet-head');
    var subj = el('p', 'snippet-subject');
    if (block.type === 'letter') {
      var lbl = el('span', null, t(UI.subject) + ': ');
      subj.appendChild(lbl);
      subj.appendChild(document.createTextNode(t(block.subject.es ? { es: block.subject.es, en: block.subject.es } : block.subject)));
    } else {
      subj.appendChild(document.createTextNode(t(block.label)));
    }
    head.appendChild(subj);

    var esBody = block.body.es;
    var btn = el('button', 'copy-btn');
    btn.type = 'button';
    btn.appendChild(iconEl('copy'));
    var btnText = el('span', null, t(UI.copy));
    btn.appendChild(btnText);
    btn.addEventListener('click', function () {
      var full = block.type === 'letter'
        ? 'Asunto: ' + block.subject.es + '\n\n' + esBody
        : esBody;
      copyText(full, function (ok) {
        if (!ok) return;
        btn.classList.add('ok');
        btnText.textContent = t(UI.copied);
        toast(t(UI.copied));
        setTimeout(function () {
          btn.classList.remove('ok');
          btnText.textContent = t(UI.copy);
        }, 1800);
      });
    });
    head.appendChild(btn);
    node.appendChild(head);

    node.appendChild(el('p', 'block-title snippet-label', t(UI.sendInSpanish)));

    var body = el('pre', 'snippet-body', esBody);
    node.appendChild(body);

    // English reference translation, only when the UI is in English
    if (state.lang === 'en' && block.body.en) {
      var tr = el('div', 'snippet-tr');
      tr.appendChild(el('p', 'block-title', t(UI.translation)));
      tr.appendChild(el('p', 'snippet-tr-note', t(UI.translationNote)));
      var trBody = el('pre', 'snippet-tr-body',
        (block.type === 'letter' ? 'Subject: ' + block.subject.en + '\n\n' : '') + block.body.en);
      tr.appendChild(trBody);
      node.appendChild(tr);
    }
    return node;
  }

  function renderBlock(block, task) {
    var node;

    if (block.type === 'letter' || block.type === 'script') {
      return renderSnippet(block);
    }

    if (block.type === 'why' || block.type === 'note' || block.type === 'warn') {
      node = el('div', 'callout callout-' + block.type);
      var defTitle = block.type === 'why' ? UI.whyItMatters : (block.type === 'warn' ? UI.heads : null);
      var title = block.title ? t(block.title) : (defTitle ? t(defTitle) : null);
      if (title) node.appendChild(el('p', 'block-title', title));
      node.appendChild(el('p', null, t(block.text)));
      return node;
    }

    if (block.type === 'list') {
      node = el('div');
      if (block.title) node.appendChild(el('p', 'block-title', t(block.title)));
      var ul = el('ul', 'bullets');
      block.items.forEach(function (i) { ul.appendChild(el('li', null, t(i))); });
      node.appendChild(ul);
      return node;
    }

    if (block.type === 'subtasks') {
      node = el('div');
      if (block.title) node.appendChild(el('p', 'block-title', t(block.title)));
      var box = el('div', 'subs');
      block.items.forEach(function (item) {
        var b = el('button', 'sub' + (state.done[item.id] ? ' on' : ''));
        b.type = 'button';
        b.setAttribute('aria-pressed', String(!!state.done[item.id]));
        var mark = el('span', 'sub-box');
        mark.appendChild(iconEl('check'));
        b.appendChild(mark);
        b.appendChild(el('span', 'sub-text', t(item.text)));
        b.addEventListener('click', function () {
          if (state.done[item.id]) delete state.done[item.id];
          else state.done[item.id] = true;
          b.classList.toggle('on', !!state.done[item.id]);
          b.setAttribute('aria-pressed', String(!!state.done[item.id]));
          save();
        });
        box.appendChild(b);
      });
      node.appendChild(box);
      return node;
    }

    if (block.type === 'kv') {
      node = el('div');
      if (block.title) node.appendChild(el('p', 'block-title', t(block.title)));
      var kv = el('div', 'kv');
      block.rows.forEach(function (r) {
        var row = el('div', 'kv-row');
        row.appendChild(el('span', 'kv-k', t(r.k)));
        row.appendChild(el('span', 'kv-v', t(r.v)));
        kv.appendChild(row);
      });
      node.appendChild(kv);
      return node;
    }

    if (block.type === 'qtable') {
      node = el('div', 'qtable');
      block.rows.forEach(function (r) {
        var row = el('div', 'qrow');
        row.appendChild(el('span', 'qrow-n', String(r.n).padStart(2, '0')));
        var body = el('div', 'qrow-body');
        body.appendChild(el('p', 'qrow-q', t(r.q)));
        body.appendChild(el('p', 'qrow-r', t(block.head.r) + ': ' + t(r.r)));
        row.appendChild(body);
        node.appendChild(row);
      });
      return node;
    }

    return el('div');
  }

  /* --- tracking fields inside a task ------------------------------------ */

  function statusOptions(select, value) {
    ['pendiente', 'tramite', 'listo', 'na'].forEach(function (k) {
      var o = el('option', null, t(UI.statuses[k]));
      o.value = k;
      select.appendChild(o);
    });
    select.value = value;
  }

  function renderTracking(rowId, task) {
    var row = BOARD_BY_ID[rowId];
    if (!row) return null;
    var data = getTrack(rowId);

    var box = el('div', 'tracking');
    var head = el('div', 'tracking-head');
    head.appendChild(el('span', 'tracking-n', String(row.id).padStart(2, '0')));
    head.appendChild(el('span', 'tracking-name', t(row.task) + ' · ' + t(row.entity)));
    if (row.note) head.appendChild(el('span', 'tracking-note', t(row.note)));
    box.appendChild(head);

    var fields = el('div', 'fields');

    var f1 = el('div', 'field');
    var l1 = el('label', null, t(UI.reference));
    l1.htmlFor = 'ref-' + rowId;
    var i1 = document.createElement('input');
    i1.type = 'text'; i1.id = 'ref-' + rowId; i1.value = data.ref;
    i1.placeholder = t(UI.refPlaceholder);
    i1.addEventListener('input', function () { data.ref = i1.value; save(); syncBoardRow(rowId, 'ref'); });
    f1.appendChild(l1); f1.appendChild(i1); fields.appendChild(f1);

    var f2 = el('div', 'field');
    var l2 = el('label', null, t(UI.status));
    l2.htmlFor = 'st-' + rowId;
    var s2 = document.createElement('select');
    s2.id = 'st-' + rowId;
    statusOptions(s2, data.status);
    s2.addEventListener('change', function () {
      data.status = s2.value; save();
      syncBoardRow(rowId, 'status');
      refreshTaskChips(task);
    });
    f2.appendChild(l2); f2.appendChild(s2); fields.appendChild(f2);

    var f3 = el('div', 'field');
    var l3 = el('label', null, t(UI.date));
    l3.htmlFor = 'dt-' + rowId;
    var i3 = document.createElement('input');
    i3.type = 'date'; i3.id = 'dt-' + rowId; i3.value = data.date;
    i3.addEventListener('input', function () { data.date = i3.value; save(); syncBoardRow(rowId, 'date'); });
    f3.appendChild(l3); f3.appendChild(i3); fields.appendChild(f3);

    box.appendChild(fields);
    box.dataset.trackBox = rowId;
    return box;
  }

  /* --- one task --------------------------------------------------------- */

  function renderTask(task, index) {
    var node = el('article', 'task');
    node.id = 'task-' + task.id;
    node.dataset.task = task.id;
    if (state.done[task.id]) node.classList.add('done');
    if (state.open[task.id]) node.classList.add('open');

    var row = el('div', 'task-row');

    var check = el('button', 'check');
    check.type = 'button';
    check.setAttribute('aria-label', t(task.title));
    check.setAttribute('aria-pressed', String(!!state.done[task.id]));
    check.appendChild(iconEl('check'));
    check.addEventListener('click', function () {
      if (state.done[task.id]) delete state.done[task.id];
      else state.done[task.id] = true;
      node.classList.toggle('done', !!state.done[task.id]);
      check.setAttribute('aria-pressed', String(!!state.done[task.id]));
      save();
      updateProgressUI();
    });
    row.appendChild(check);

    var main = el('div', 'task-main');
    main.appendChild(el('h3', 'task-title', t(task.title)));
    if (task.lead) main.appendChild(el('p', 'task-lead', t(task.lead)));

    var meta = el('div', 'task-meta');
    if (task.flag) meta.appendChild(el('span', 'chip chip-flag', t(task.flag)));
    if (task.entity) meta.appendChild(el('span', 'chip', t(task.entity)));
    (task.board || []).forEach(function (rowId) {
      var chip = el('span', 'chip chip-status');
      chip.dataset.statusChip = rowId;
      meta.appendChild(chip);
    });
    main.appendChild(meta);

    var toggle = el('button', 'task-toggle');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', String(!!state.open[task.id]));
    toggle.setAttribute('aria-controls', 'detail-' + task.id);
    var tLabel = el('span', null, state.open[task.id] ? t(UI.collapse) : t(UI.expand));
    toggle.appendChild(tLabel);
    toggle.appendChild(iconEl('chevronDown'));
    toggle.addEventListener('click', function () {
      var nowOpen = !node.classList.contains('open');
      node.classList.toggle('open', nowOpen);
      if (nowOpen) state.open[task.id] = true; else delete state.open[task.id];
      toggle.setAttribute('aria-expanded', String(nowOpen));
      tLabel.textContent = nowOpen ? t(UI.collapse) : t(UI.expand);
      save();
    });
    main.appendChild(toggle);

    row.appendChild(main);
    node.appendChild(row);

    var detail = el('div', 'task-detail');
    detail.id = 'detail-' + task.id;
    (task.blocks || []).forEach(function (b) { detail.appendChild(renderBlock(b, task)); });
    (task.board || []).forEach(function (rowId) {
      var tracking = renderTracking(rowId, task);
      if (tracking) {
        var wrapT = el('div');
        wrapT.appendChild(el('p', 'block-title', t(UI.trackingHere)));
        wrapT.appendChild(tracking);
        detail.appendChild(wrapT);
      }
    });
    node.appendChild(detail);

    refreshTaskChips(task, node);
    return reveal(node, Math.min(index, 6) * 70);
  }

  function refreshTaskChips(task, scope) {
    var root = scope || document.getElementById('task-' + task.id);
    if (!root) return;
    (task.board || []).forEach(function (rowId) {
      var chip = root.querySelector('[data-status-chip="' + rowId + '"]');
      if (!chip) return;
      var st = getTrack(rowId).status;
      chip.textContent = t(UI.statuses[st]);
      chip.dataset.s = st;
    });
  }

  /* --- a whole track ---------------------------------------------------- */

  function renderTracks() {
    TRACKS.forEach(function (track, ti) {
      var host = document.getElementById(track.id);
      host.innerHTML = '';
      var wrap = el('div', 'wrap');

      var head = el('div', 'section-head');
      head.appendChild(reveal(el('span', 'section-num', String(3 + ti).padStart(2, '0') + ' — ' + t(track.name)), 0));

      var hrow = el('div', 'track-head');
      hrow.appendChild(el('span', 'track-key', track.key));
      var htxt = el('div', 'track-head-text');
      htxt.appendChild(el('h2', 'section-title', t(track.title)));
      htxt.appendChild(el('p', 'section-lead', t(track.lead)));
      hrow.appendChild(htxt);
      head.appendChild(reveal(hrow, 100));

      var meter = el('div', 'track-meter');
      var mTrack = el('div', 'track-meter-track');
      var mFill = el('div', 'track-meter-fill');
      mFill.dataset.trackFill = track.id;
      mTrack.appendChild(mFill);
      var mNum = el('span', 'track-meter-num');
      mNum.dataset.trackNum = track.id;
      meter.appendChild(mTrack);
      meter.appendChild(mNum);
      head.appendChild(reveal(meter, 200));

      wrap.appendChild(head);

      var list = el('div', 'tasks');
      track.tasks.forEach(function (task, i) { list.appendChild(renderTask(task, i)); });
      wrap.appendChild(list);

      host.appendChild(wrap);
    });
  }

  /* ======================================================================
     RENDER — board
     ====================================================================== */

  function renderBoard() {
    var host = document.getElementById('tablero');
    host.innerHTML = '';
    var wrap = el('div', 'wrap');

    var head = el('div', 'section-head');
    head.appendChild(reveal(el('span', 'section-num', '08'), 0));
    head.appendChild(reveal(el('h2', 'section-title', t(BOARD.title)), 100));
    head.appendChild(reveal(el('p', 'section-lead', t(BOARD.lead)), 200));
    wrap.appendChild(head);

    var board = el('div', 'board');

    var bh = el('div', 'board-head');
    var h1 = el('span', 'bc-n', '#');
    var h2 = el('span', 'bc-task', t(UI.procedure));
    var h3 = el('span', 'bc-ent', t(UI.entity));
    var h4 = el('span', 'bc-ref', t(UI.reference));
    var h5 = el('span', 'bc-stat', t(UI.status));
    var h6 = el('span', 'bc-date', t(UI.date));
    [h1, h2, h3, h4, h5, h6].forEach(function (h) { bh.appendChild(h); });
    board.appendChild(bh);

    BOARD.rows.forEach(function (row) {
      var data = getTrack(row.id);
      var r = el('div', 'board-row');
      r.dataset.boardRow = row.id;
      if (data.status === 'listo') r.classList.add('is-done');

      var top = el('div', 'board-row-top');
      top.appendChild(el('span', 'bc-n', String(row.id).padStart(2, '0')));
      var taskCell = el('div', 'bc-task');
      var nameLine = el('span', 'bc-task-name');
      nameLine.appendChild(document.createTextNode(t(row.task)));
      if (row.note) nameLine.appendChild(el('span', 'tracking-note', ' · ' + t(row.note)));
      taskCell.appendChild(nameLine);
      if (row.link) {
        var jump = document.createElement('a');
        jump.className = 'board-jump';
        jump.href = '#task-' + row.link;
        jump.appendChild(el('span', null, t(UI.expand)));
        jump.appendChild(iconEl('arrowRight'));
        jump.addEventListener('click', function () {
          var task = TASK_BY_ID[row.link];
          if (!task) return;
          state.open[task.id] = true;
          save();
          var node = document.getElementById('task-' + task.id);
          if (node) {
            node.classList.add('open');
            var tg = node.querySelector('.task-toggle');
            if (tg) {
              tg.setAttribute('aria-expanded', 'true');
              tg.querySelector('span').textContent = t(UI.collapse);
            }
          }
        });
        taskCell.appendChild(jump);
      }
      top.appendChild(taskCell);
      r.appendChild(top);

      var ent = el('div', 'bc-ent', t(row.entity));
      r.appendChild(ent);

      var cRef = el('div', 'bc-ref');
      cRef.appendChild(el('span', 'mobile-label', t(UI.reference)));
      var iRef = document.createElement('input');
      iRef.type = 'text'; iRef.value = data.ref; iRef.placeholder = t(UI.refPlaceholder);
      iRef.setAttribute('aria-label', t(UI.reference) + ' — ' + t(row.task));
      iRef.dataset.field = 'ref';
      iRef.addEventListener('input', function () { data.ref = iRef.value; save(); syncTaskField(row.id, 'ref'); });
      cRef.appendChild(iRef);
      r.appendChild(cRef);

      var cSt = el('div', 'bc-stat');
      cSt.appendChild(el('span', 'mobile-label', t(UI.status)));
      var sSt = document.createElement('select');
      sSt.setAttribute('aria-label', t(UI.status) + ' — ' + t(row.task));
      sSt.dataset.field = 'status';
      statusOptions(sSt, data.status);
      sSt.addEventListener('change', function () {
        data.status = sSt.value; save();
        r.classList.toggle('is-done', sSt.value === 'listo');
        syncTaskField(row.id, 'status');
        if (row.link && TASK_BY_ID[row.link]) refreshTaskChips(TASK_BY_ID[row.link]);
      });
      cSt.appendChild(sSt);
      r.appendChild(cSt);

      var cDt = el('div', 'bc-date');
      cDt.appendChild(el('span', 'mobile-label', t(UI.date)));
      var iDt = document.createElement('input');
      iDt.type = 'date'; iDt.value = data.date;
      iDt.setAttribute('aria-label', t(UI.date) + ' — ' + t(row.task));
      iDt.dataset.field = 'date';
      iDt.addEventListener('input', function () { data.date = iDt.value; save(); syncTaskField(row.id, 'date'); });
      cDt.appendChild(iDt);
      r.appendChild(cDt);

      board.appendChild(reveal(r, 0));
    });

    wrap.appendChild(board);

    // family notes
    var notesWrap = el('div', 'notes-wrap');
    notesWrap.appendChild(el('p', 'block-title', t(UI.notes)));
    var ta = document.createElement('textarea');
    ta.className = 'notes-box';
    ta.value = state.notes;
    ta.placeholder = t(UI.notesPlaceholder);
    ta.setAttribute('aria-label', t(UI.notes));
    ta.addEventListener('input', function () { state.notes = ta.value; save(); });
    notesWrap.appendChild(ta);
    wrap.appendChild(reveal(notesWrap, 100));

    host.appendChild(wrap);
  }

  /* --- two-way sync between board rows and task detail fields ----------- */

  function syncBoardRow(rowId, field) {
    var row = document.querySelector('[data-board-row="' + rowId + '"]');
    if (!row) return;
    var data = getTrack(rowId);
    var input = row.querySelector('[data-field="' + field + '"]');
    if (input && input.value !== data[field]) input.value = data[field];
    if (field === 'status') row.classList.toggle('is-done', data.status === 'listo');
  }

  function syncTaskField(rowId, field) {
    var box = document.querySelector('[data-track-box="' + rowId + '"]');
    if (!box) return;
    var data = getTrack(rowId);
    var id = (field === 'ref' ? 'ref-' : field === 'status' ? 'st-' : 'dt-') + rowId;
    var input = document.getElementById(id);
    if (input && input.value !== data[field]) input.value = data[field];
  }

  /* ======================================================================
     RENDER — market
     ====================================================================== */

  function renderMarket() {
    var host = document.getElementById('mercado');
    host.innerHTML = '';
    var wrap = el('div', 'wrap');

    var head = el('div', 'section-head');
    head.appendChild(reveal(el('span', 'section-num', '09'), 0));
    head.appendChild(reveal(el('h2', 'section-title', t(MARKET.title)), 100));
    var pill = reveal(el('span', 'tag-pill', t(MARKET.tag)), 150);
    head.appendChild(pill);
    head.appendChild(reveal(el('p', 'section-lead', t(MARKET.lead)), 200));
    wrap.appendChild(head);

    var offers = el('div', 'offers');
    MARKET.offers.forEach(function (o) {
      var c = el('div', 'offer');
      c.appendChild(el('span', 'offer-k', t(o.k)));
      c.appendChild(el('div', 'offer-v', o.v));
      if (o.sub) c.appendChild(el('div', 'offer-sub', o.sub));
      offers.appendChild(c);
    });
    wrap.appendChild(reveal(offers, 250));

    wrap.appendChild(reveal(el('p', 'callout-dark', t(MARKET.adjust)), 320));

    var tblWrap = el('div', 'pricetable-wrap');
    tblWrap.appendChild(el('p', 'offer-k', t(MARKET.tableLead)));
    var tbl = el('div', 'pricetable');
    var hr = el('div', 'pricerow head');
    hr.appendChild(el('span', null, t(MARKET.tableHead.m2)));
    hr.appendChild(el('span', null, t(MARKET.tableHead.total)));
    tbl.appendChild(hr);
    MARKET.table.forEach(function (r) {
      var pr = el('div', 'pricerow');
      pr.appendChild(el('span', null, r.m2));
      pr.appendChild(el('span', null, r.total));
      tbl.appendChild(pr);
    });
    tblWrap.appendChild(tbl);
    wrap.appendChild(reveal(tblWrap, 380));

    wrap.appendChild(reveal(el('p', 'expectation', t(MARKET.expectation)), 450));

    MARKET.notes.forEach(function (n, i) {
      wrap.appendChild(reveal(el('p', 'note-dark', t(n)), 500 + i * 80));
    });

    host.appendChild(wrap);
  }

  /* ======================================================================
     RENDER — footer
     ====================================================================== */

  function renderFooter() {
    var host = document.getElementById('footer');
    host.innerHTML = '';
    var inner = el('div', 'footer-inner');

    inner.appendChild(el('p', 'footer-disclaimer', t(FOOTER.disclaimer)));

    var actions = el('div', 'footer-actions');
    var pr = el('button', 'ghost-btn', t(UI.print));
    pr.type = 'button';
    pr.addEventListener('click', function () { window.print(); });
    var rs = el('button', 'ghost-btn', t(UI.resetAll));
    rs.type = 'button';
    rs.addEventListener('click', resetAll);
    actions.appendChild(pr);
    actions.appendChild(rs);
    inner.appendChild(actions);

    inner.appendChild(el('p', 'footer-saved', t(UI.savedLocally)));
    inner.appendChild(el('p', 'footer-meta', t(FOOTER.meta)));

    host.appendChild(inner);
  }

  /* ======================================================================
     PROGRESS + SCROLLSPY + NAV COLOUR
     ====================================================================== */

  function updateProgressUI() {
    var p = totalProgress();
    var pct = p.total ? Math.round((p.done / p.total) * 100) : 0;

    var num = document.getElementById('navProgressNum');
    var fill = document.getElementById('navProgressFill');
    if (num) num.textContent = p.done + '/' + p.total;
    if (fill) fill.style.width = pct + '%';

    var hNum = document.getElementById('heroNum');
    var hTot = document.getElementById('heroTotal');
    var hFill = document.getElementById('heroFill');
    if (hNum && hTot) {
      hNum.textContent = String(p.done);
      hNum.appendChild(hTot);
      hTot.textContent = '/ ' + p.total;
    }
    if (hFill) hFill.style.width = pct + '%';

    TRACKS.forEach(function (tr) {
      var tp = trackProgress(tr);
      var f = document.querySelector('[data-track-fill="' + tr.id + '"]');
      var n = document.querySelector('[data-track-num="' + tr.id + '"]');
      if (f) f.style.width = (tp.total ? (tp.done / tp.total) * 100 : 0) + '%';
      if (n) n.textContent = tp.done + ' ' + t(UI.of) + ' ' + tp.total + ' ' + t(UI.done);
    });
  }

  function setupSpy() {
    var sections = NAV.map(function (n) { return document.getElementById(n.id); }).filter(Boolean);
    var navEl = document.getElementById('nav');
    var darkSections = Array.prototype.slice.call(document.querySelectorAll('.section-dark, .footer'));

    function onScroll() {
      var probe = window.scrollY + (window.innerHeight * 0.28);
      var active = null;
      sections.forEach(function (s) { if (s.offsetTop <= probe) active = s.id; });

      document.querySelectorAll('.nav-link, .overlay-link').forEach(function (a) {
        a.classList.toggle('active', a.dataset.target === active);
      });

      // nav colour flips over dark bands
      var navBottom = window.scrollY + (navEl.offsetHeight * 0.6);
      var onDark = darkSections.some(function (s) {
        return navBottom > s.offsetTop && navBottom < s.offsetTop + s.offsetHeight;
      });
      navEl.classList.toggle('on-dark', onDark);

      var toTop = document.getElementById('toTop');
      if (toTop) toTop.classList.toggle('show', window.scrollY > window.innerHeight * 0.9);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('orientationchange', onScroll);
    onScroll();
  }

  /* ======================================================================
     LANGUAGE + RESET
     ====================================================================== */

  function setLang(lang) {
    if (state.lang === lang) return;
    state.lang = lang;
    save();
    var y = window.scrollY;
    renderAll();
    window.scrollTo(0, y);
  }

  function resetAll() {
    if (!window.confirm(t(UI.resetConfirm))) return;
    state.done = {};
    state.open = {};
    state.track = {};
    state.notes = '';
    save();
    closeMenu();
    renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ======================================================================
     BOOT
     ====================================================================== */

  function renderAll() {
    document.documentElement.lang = state.lang;
    document.title = state.lang === 'es'
      ? 'Venta Apartamento — Normandía 301'
      : 'Apartment Sale — Normandía 301';

    renderNav();
    renderOverlay();
    renderHero();
    renderWays();
    renderProperty();
    renderTracks();
    renderBoard();
    renderMarket();
    renderFooter();
    updateProgressUI();
    setupSpy();
  }

  function boot() {
    load();
    toastEl = document.getElementById('toast');

    var toTop = document.getElementById('toTop');
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
