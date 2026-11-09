'use strict';

const data = window.EQUIPMENT_CATALOG || { equipment: [] };
const items = data.equipment || [];
const byId = new Map(items.map(e => [e.id, e]));

const $ = id => document.getElementById(id);
const node = (tag, text, cls) => {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (cls) el.className = cls;
  return el;
};

const PREV_CLASS = { 常见: 'prev-common', 一般: 'prev-mid', 少见: 'prev-rare' };
const state = { filtered: [], search: '', category: '', area: '', prevalence: '' };
const viewer = { record: null, zoom: null };

// 直接从 images/webp/ 目录加载
function getWebpPath(e) {
  return `./images/webp/${e.id}.webp`;
}

// 渲染下拉选项
function populateSelects() {
  const categories = [...new Set(items.map(e => e.category).filter(Boolean))];
  const areas = [...new Set(items.flatMap(e => e.training_areas || []).filter(Boolean))];

  const catSel = $('category');
  catSel.innerHTML = '<option value="">全部类型</option>';
  for (const cat of categories) {
    catSel.append(node('option', cat));
  }

  const areaSel = $('area');
  areaSel.innerHTML = '<option value="">全部部位</option>';
  for (const a of areas) {
    areaSel.append(node('option', a));
  }
}

function updateCounts() {
  if ($('tab-cnt-all')) $('tab-cnt-all').textContent = items.length;
}

// 筛选逻辑
function applyFilters() {
  const q = ($('search').value || '').trim().toLowerCase();
  const cat = $('category').value;
  const area = $('area').value;
  const prev = $('prevalence').value;

  state.filtered = items.filter(e => {
    if (q) {
      const matchZh = (e.name_zh || '').toLowerCase().includes(q);
      const matchEn = (e.name_en || '').toLowerCase().includes(q);
      const matchId = (e.id || '').toLowerCase().includes(q);
      if (!matchZh && !matchEn && !matchId) return false;
    }
    if (cat && e.category !== cat) return false;
    if (area && !(e.training_areas || []).includes(area)) return false;
    if (prev && e.prevalence_cn !== prev) return false;
    return true;
  });

  renderGallery();
}

// 渲染画廊
function renderGallery() {
  const gallery = $('gallery');
  gallery.replaceChildren();

  const prevCounts = { 常见: 0, 一般: 0, 少见: 0 };
  for (const e of state.filtered) {
    if (prevCounts[e.prevalence_cn] !== undefined) prevCounts[e.prevalence_cn]++;
  }

  $('result-count').textContent =
    `显示 ${state.filtered.length} / ${items.length} 条 · 常见 ${prevCounts.常见} / 一般 ${prevCounts.一般} / 少见 ${prevCounts.少见}`;

  if (!state.filtered.length) {
    const empty = node('div', '没有匹配的器械记录，请重置筛选或更改搜索词。', 'empty-hint');
    gallery.append(empty);
    return;
  }

  for (const e of state.filtered) {
    const card = node('article', undefined, 'card');
    card.dataset.id = e.id;

    // 图片区域：直接从 images/webp/ 加载
    const pic = node('div', undefined, 'picture card-img');
    const imgEl = node('img');
    imgEl.loading = 'lazy';
    imgEl.alt = e.name_zh;
    imgEl.src = getWebpPath(e);
    imgEl.onclick = () => openViewer(e);
    pic.append(imgEl);
    card.append(pic);

    // 信息区域
    const body = node('div', undefined, 'card-body');
    const top = node('div', undefined, 'card-top');
    top.append(node('span', e.id.split('-')[0], 'num'));
    if (e.prevalence_cn) {
      top.append(node('span', e.prevalence_cn, 'prev ' + (PREV_CLASS[e.prevalence_cn] || 'prev-mid')));
    }

    const areas = [e.category, ...(e.training_areas || [])];
    const tagRow = node('div', undefined, 'tags');
    for (const t of areas.slice(0, 3)) tagRow.append(node('span', t));
    if (areas.length > 3) tagRow.append(node('span', `+${areas.length - 3}`, 'more'));

    body.append(top, node('h2', e.name_zh, 'card-name'), node('p', e.name_en, 'card-en'), tagRow);

    const foot = node('div', undefined, 'card-foot');
    const open = node('button', '详情', 'detail-btn');
    open.type = 'button';
    open.onclick = () => openViewer(e);
    foot.append(open);
    body.append(foot);

    card.append(body);
    gallery.append(card);
  }
}

// 弹窗查看大图
function openViewer(e) {
  viewer.record = e;
  $('viewer-id').textContent = e.id.split('-')[0];
  $('viewer-title').textContent = e.name_zh;
  $('viewer-caption').textContent = e.name_en;

  const imgEl = $('viewer-img');
  imgEl.src = getWebpPath(e);

  setZoom(null);
  renderDetails(e);
  $('viewer').showModal();
}

function renderDetails(e) {
  const dl = $('details');
  dl.replaceChildren();

  const row = (dtText, ddText, isCode = false) => {
    if (!ddText) return;
    const dt = node('dt', dtText);
    const dd = node('dd');
    if (isCode) dd.append(node('code', ddText));
    else dd.textContent = ddText;
    dl.append(dt, dd);
  };

  const webpRel = `./images/webp/${e.id}.webp`;
  const sizeKb = e.image?.bytes ? `${Math.round(e.image.bytes / 1024)} KB` : '约 145 KB';

  row('器械编号', e.id.split('-')[0]);
  row('中文名称', e.name_zh);
  row('英文名称', e.name_en);
  row('器械分类', e.category);
  if (e.series) row('阻力系列', e.series);
  if (e.primary_muscles && e.primary_muscles.length) {
    row('主要肌群', e.primary_muscles.join('、'));
  }
  if (e.training_areas && e.training_areas.length) {
    row('训练部位', e.training_areas.join('、'));
  }
  row('国内普及度', e.prevalence_cn || '未标注');
  row('图像规格', '1200 × 1200 像素 · 100% 透明背景 (RGBA)');
  row('存储格式', `WebP (${sizeKb}) · 高保真压缩`);
  row('相对路径', webpRel, true);
  if (e.description_zh) row('器械简介', e.description_zh);
}

function setZoom(mode) {
  const stage = $('stage');
  const imgEl = $('viewer-img');
  stage.classList.remove('zoom-native', 'zoom-double');
  imgEl.style.width = '';
  imgEl.style.height = '';

  for (const btnId of ['fit', 'native', 'double']) {
    $(btnId).classList.remove('active');
  }

  if (mode === 1) {
    stage.classList.add('zoom-native');
    $('native').classList.add('active');
  } else if (mode === 2) {
    stage.classList.add('zoom-double');
    $('double').classList.add('active');
  } else {
    $('fit').classList.add('active');
  }
}

// 事件绑定
$('viewer-close').onclick = () => $('viewer').close();
$('viewer').onclick = ev => { if (ev.target === $('viewer')) $('viewer').close(); };
$('fit').onclick = () => setZoom(null);
$('native').onclick = () => setZoom(1);
$('double').onclick = () => setZoom(2);

for (const id of ['search', 'category', 'area', 'prevalence']) {
  $(id).addEventListener(id === 'search' ? 'input' : 'change', applyFilters);
}

// 初始化
populateSelects();
updateCounts();
applyFilters();
