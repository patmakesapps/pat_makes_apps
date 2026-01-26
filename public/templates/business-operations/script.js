const ROUTES = {
  snapshot: '/api/business/snapshot',
  tableData: '/api/business/data-table',
  options: '/api/business/options',
  search: '/api/business/search',
  wizard: '/api/business/wizard',
};

const CONFIG_SOURCE = './dummydata.config';
const tablesContainer = document.getElementById('tablesContainer');
const tableTemplate = document.getElementById('data-table-template');
const metricStack = document.getElementById('metricStack');
const wizardBack = document.getElementById('wizardBack');
const wizardNext = document.getElementById('wizardNext');
const wizardFeedback = document.getElementById('wizardFeedback');
const filterWrapper = document.querySelector('.filter-chips');
const dropdown = document.querySelector('[data-dropdown]');
const searchInput = document.getElementById('globalSearch');

let searchTerm = '';
let activeFilter = 'all';
let rowRegistry = [];
let wizardStepsEls = [];
let currentWizardStep = 0;

function init() {
  renderYear();
  renderRoutes();
  setupWizardEvents();
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const value = event.target.value || '';
      searchTerm = value;
      applyTableFilters();
    });
  }
  fetch(CONFIG_SOURCE)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Config file could not be loaded.');
      }
      return response.json();
    })
    .then((config) => {
      buildMetrics(config.cards);
      renderSparkline(config.chart);
      populateFilters(config.filters);
      buildDropdown(config.dropdownOptions);
      buildTables(config.tables);
      buildWizard(config.wizardSteps);
    })
    .catch((error) => {
      console.error('Business template boot failed', error);
      if (tablesContainer) {
        tablesContainer.innerHTML =
          '<p class=\"muted small\">Unable to load demo data. Please make sure dummydata.config is reachable.</p>';
      }
    });
}

function renderYear() {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function renderRoutes() {
  const routeList = document.getElementById('routeList');
  if (!routeList) return;
  routeList.innerHTML = '';
  Object.entries(ROUTES).forEach(([name, url]) => {
    const row = document.createElement('li');
    row.innerHTML = `<span>${name}</span><code>${url}</code>`;
    routeList.appendChild(row);
  });
  const configRow = document.createElement('li');
  configRow.innerHTML = `<span>config</span><code>${CONFIG_SOURCE}</code>`;
  routeList.appendChild(configRow);
}

function buildMetrics(cards = []) {
  if (!metricStack) return;
  metricStack.innerHTML = '';
  cards.forEach((card) => {
    const article = document.createElement('article');
    article.className = 'metric-card';
    article.innerHTML = `
      <h3>${card.label}</h3>
      <p>${card.value}</p>
      <span>${card.trend}</span>
    `;
    metricStack.appendChild(article);
  });
}

function renderSparkline(chart = {}) {
  const svg = document.getElementById('sparkline');
  const changeNode = document.getElementById('sparklineChange');
  const list = document.getElementById('sparklineList');
  if (!svg || !changeNode || !list) return;

  const points = chart.points || [];
  const width = 520;
  const height = 160;
  const max = Math.max(Math.max(...points), 1);
  const step = points.length > 1 ? width / (points.length - 1) : width;
  const coords = points.map((value, index) => {
    const x = index * step;
    const y = height - (value / max) * height;
    return `${x},${y}`;
  });

  svg.innerHTML = '';
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns, 'defs');
  const gradient = document.createElementNS(ns, 'linearGradient');
  gradient.setAttribute('id', 'sparklineGradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('x2', '100%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('y2', '0%');
  gradient.innerHTML = `
    <stop offset="0%" stop-color="#38bdf8" />
    <stop offset="100%" stop-color="#7c5dfa" />
  `;

  defs.appendChild(gradient);
  svg.appendChild(defs);

  const polyline = document.createElementNS(ns, 'polyline');
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', 'url(#sparklineGradient)');
  polyline.setAttribute('stroke-width', '3');
  polyline.setAttribute('stroke-linecap', 'round');
  polyline.setAttribute('stroke-linejoin', 'round');
  polyline.setAttribute('points', coords.join(' '));
  svg.appendChild(polyline);

  changeNode.textContent = chart.change || '';
  list.innerHTML = '';
  (chart.stats || []).forEach((stat) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${stat.value}</strong><span>${stat.label}</span>`;
    list.appendChild(item);
  });
}

function populateFilters(filters = []) {
  if (!filterWrapper) return;
  filterWrapper.innerHTML = '';
  filters.forEach((filter) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = filter;
    const key = filter.toLowerCase();
    button.dataset.filterBtn = key;
    if (key === 'all') {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      activeFilter = key;
      filterWrapper.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      applyTableFilters();
    });
    filterWrapper.appendChild(button);
  });
}

function buildDropdown(options = []) {
  if (!dropdown) return;
  const dropdownMenu = dropdown.querySelector('[data-dropdown-menu]');
  const dropdownButton = dropdown.querySelector('[data-dropdown-button]');
  const dropdownLabel = dropdown.querySelector('[data-dropdown-label]');
  if (!dropdownMenu || !dropdownButton || !dropdownLabel) return;

  dropdownMenu.innerHTML = '';
  const defaultLabel = options[0] || 'Industry focus';
  dropdownLabel.textContent = defaultLabel;
  dropdown.dataset.selected = defaultLabel;

  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.dataset.option = option;
    button.addEventListener('click', () => {
      dropdownLabel.textContent = option;
      dropdown.dataset.selected = option;
      dropdown.classList.remove('open');
    });
    dropdownMenu.appendChild(button);
  });

  if (!dropdown.dataset.initialized) {
    dropdownButton.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
      }
    });
    dropdown.dataset.initialized = 'true';
  }
}

function buildTables(tables = []) {
  if (!tablesContainer || !tableTemplate) return;
  tablesContainer.innerHTML = '';
  rowRegistry = [];

  tables.forEach((table) => {
    const clone = tableTemplate.content.cloneNode(true);
    const article = clone.querySelector('.board');
    if (!article) return;
    article.querySelector('.board-title').textContent = table.title;
    article.querySelector('.board-subtitle').textContent = table.subtitle;
    article.querySelector('[data-board-tag]').textContent = table.tag;

    const tbody = article.querySelector('tbody');
    table.rows.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.client}</td>
        <td>${row.region}</td>
        <td>${row.category}</td>
        <td>${row.status}</td>
        <td>${row.value}</td>
      `;
      tbody.appendChild(tr);
      rowRegistry.push({
        element: tr,
        category: row.category.toLowerCase(),
        status: row.status.toLowerCase(),
        text: `${row.client} ${row.region} ${row.category} ${row.status}`.toLowerCase(),
      });
    });
    tablesContainer.appendChild(article);
  });
  applyTableFilters();
}

function applyTableFilters() {
  const term = searchTerm.trim().toLowerCase();
  rowRegistry.forEach((row) => {
    const matchSearch = !term || row.text.includes(term);
    const matchFilter =
      activeFilter === 'all' || row.category === activeFilter || row.status === activeFilter;
    row.element.style.display = matchSearch && matchFilter ? '' : 'none';
  });
}

function buildWizard(steps = []) {
  const container = document.getElementById('wizardSteps');
  if (!container) return;
  container.innerHTML = '';
  wizardStepsEls = [];

  steps.forEach((step, index) => {
    const clone = document.getElementById('wizard-step-template').content.cloneNode(true);
    const section = clone.querySelector('.wizard-step');
    if (!section) return;
    section.dataset.step = String(index);
    section.querySelector('.wizard-step-title').textContent = step.title;
    section.querySelector('.wizard-step-description').textContent = step.description;

    const fieldsWrapper = section.querySelector('.wizard-fields');
    (step.fields || []).forEach((field) => {
      fieldsWrapper.appendChild(createField(field, index));
    });

    container.appendChild(section);
    wizardStepsEls.push(section);
  });
  currentWizardStep = 0;
  updateWizardState();
}

function createField(field = {}, index) {
  const label = document.createElement('label');
  label.className = 'field';
  const sanitized = (field.name || field.label || 'field').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const id = `wizard-${index}-${sanitized}`;
  label.innerHTML = `<span>${field.label}</span>`;

  let input;
  if (field.type === 'select') {
    input = document.createElement('select');
    (field.options || []).forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = option;
      optionEl.textContent = option;
      input.appendChild(optionEl);
    });
  } else if (field.type === 'textarea') {
    input = document.createElement('textarea');
    input.rows = 2;
  } else {
    input = document.createElement('input');
    input.type = field.type || 'text';
  }

  input.id = id;
  input.name = field.name || id;
  if (field.placeholder) {
    input.placeholder = field.placeholder;
  }

  label.appendChild(input);
  return label;
}

function setupWizardEvents() {
  if (wizardBack) {
    wizardBack.addEventListener('click', () => {
      if (currentWizardStep > 0) {
        currentWizardStep -= 1;
        updateWizardState();
      }
    });
  }
  if (wizardNext) {
    wizardNext.addEventListener('click', () => {
      if (currentWizardStep < wizardStepsEls.length - 1) {
        currentWizardStep += 1;
        updateWizardState();
        return;
      }
      if (wizardFeedback) {
        wizardFeedback.textContent = `Demo submission would POST to ${ROUTES.wizard}.`;
      }
    });
  }
}

function updateWizardState() {
  if (!wizardStepsEls.length) return;
  wizardStepsEls.forEach((step, index) => {
    step.classList.toggle('active', index === currentWizardStep);
  });
  if (wizardBack) {
    wizardBack.disabled = currentWizardStep === 0;
  }
  if (wizardNext) {
    wizardNext.textContent =
      currentWizardStep === wizardStepsEls.length - 1 ? 'Submit' : 'Next step';
  }
  if (wizardFeedback) {
    wizardFeedback.textContent =
      currentWizardStep === wizardStepsEls.length - 1
        ? `Ready to submit to ${ROUTES.wizard}.`
        : 'Use the wizard to tailor the launch plan for any industry.';
  }
}

document.addEventListener('DOMContentLoaded', init);
