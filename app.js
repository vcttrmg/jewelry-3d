const modal = document.querySelector('#creationModal');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const prompt = document.querySelector('#prompt');
const success = document.querySelector('#success');
const fileInput = document.querySelector('#fileInput');

const materialPolicy = {
  gold: ['24K natural gold', 'yellow gold, high polish', 'All designs use 24K / 999.9 fine gold. Choose a natural surface finish; alloyed white or rose gold is excluded.'],
  diamond: ['Natural diamonds only', 'white diamonds, brilliant cut', 'Natural, earth-mined diamonds only. Lab-grown, simulated, and synthetic stones are excluded.'],
  finish: ['Gold finish', 'high polish', 'Select a finish for the 24K gold surface.'],
  cut: ['Diamond profile', 'round brilliant', 'Select the natural diamond cut or profile.']
};

const goldFinishes = ['high polish', 'satin', 'brushed', 'hammered', 'matte', 'granulated', 'wirework', 'textured', 'leaf-like'];
const diamondProfiles = ['round brilliant', 'cushion', 'oval', 'emerald', 'pear', 'marquise', 'radiant', 'asscher', 'princess', 'rose cut'];
const naturalDiamondVarieties = ['colorless', 'champagne', 'cognac', 'fancy yellow', 'fancy pink', 'fancy blue', 'fancy green', 'black'];

const toolCopy = {
  text: ['Text to image', 'Describe a high-jewelry piece made only from natural 24K gold and natural diamonds.', 'A sculptural 24K gold ring with natural fancy yellow diamonds, high-polish finish, black velvet...'],
  image: ['Image to 3D', 'Upload a reference for a detailed 3D asset. Material controls remain locked to 24K gold and natural diamonds.', 'Preserve the 24K gold finish, natural diamond cut, setting, and proportions...'],
  motion: ['4D motion', 'Give a natural 24K gold and diamond creation a cinematic product moment.', 'A slow macro orbit across high-polish 24K gold and the fire of natural diamonds...']
};

function addMaterialControls() {
  const form = document.querySelector('#creationForm');
  if (!form || document.querySelector('.material-controls')) return;
  const controls = document.createElement('fieldset');
  controls.className = 'material-controls';
  controls.innerHTML = `<legend>Maison material specification</legend>
    <div class="material-grid">
      <label>Natural gold form<select id="goldForm"><option>24K / 999.9 yellow gold</option><option>24K hammered gold</option><option>24K granulated gold</option><option>24K gold leaf</option><option>24K wirework gold</option></select></label>
      <label>Surface finish<select id="goldFinish">${goldFinishes.map(item => `<option>${item}</option>`).join('')}</select></label>
      <label>Natural diamond variety<select id="diamondVariety">${naturalDiamondVarieties.map(item => `<option>${item}</option>`).join('')}</select></label>
      <label>Diamond cut<select id="diamondCut">${diamondProfiles.map(item => `<option>${item}</option>`).join('')}</select></label>
    </div>
    <p class="material-note">✦ Natural materials only · 24K / 999.9 gold · earth-mined diamonds · certification required for finished pieces.</p>`;
  form.insertBefore(controls, form.querySelector('.upload-label'));
}

function openModal(type = 'text') {
  const copy = toolCopy[type];
  modalTitle.textContent = copy[0];
  modalDescription.textContent = copy[1];
  prompt.placeholder = copy[2];
  success.classList.remove('show');
  addMaterialControls();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  prompt.focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-tool]').forEach(card => card.addEventListener('click', () => openModal(card.dataset.tool)));
document.querySelector('#startCreating').addEventListener('click', () => openModal('text'));
document.querySelector('#newProject').addEventListener('click', () => openModal('text'));
document.querySelector('#closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.querySelector('#creationForm').addEventListener('submit', event => {
  event.preventDefault();
  const forbidden = /lab[- ]?grown|synthetic|simulated|plated|14k|18k|22k|white gold|rose gold/i;
  if (forbidden.test(prompt.value)) {
    success.classList.add('show');
    success.textContent = 'Please remove non-approved materials. Aurelia accepts only natural 24K / 999.9 gold and natural diamonds.';
    return;
  }
  const specification = {
    gold: document.querySelector('#goldForm')?.value,
    finish: document.querySelector('#goldFinish')?.value,
    diamond: document.querySelector('#diamondVariety')?.value,
    cut: document.querySelector('#diamondCut')?.value
  };
  success.classList.add('show');
  success.textContent = `✦ Brief saved: ${specification.gold} with natural ${specification.diamond} diamonds.`;
  setTimeout(closeModal, 1800);
});

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}

document.querySelectorAll('[data-download]').forEach(button => button.addEventListener('click', () => {
  const name = button.dataset.download;
  downloadFile(name, `Aurelia jewelry asset placeholder\nMaterial policy: natural 24K / 999.9 gold and natural diamonds only\nFile: ${name}\nGenerated: ${new Date().toISOString()}`, 'text/plain');
  button.textContent = '✓';
  setTimeout(() => button.textContent = '⇩', 1400);
}));

document.querySelector('#downloadAll').addEventListener('click', () => {
  const manifest = { workspace: 'Aurelia Studio', materialPolicy: 'Natural 24K / 999.9 gold and natural diamonds only', assets: ['celestial-pendant_hero.png', 'solitaire-ring_model.glb', 'arc-earrings_loop.mp4'], exportedAt: new Date().toISOString() };
  downloadFile('aurelia-asset-manifest.json', JSON.stringify(manifest, null, 2), 'application/json');
});

fileInput.addEventListener('change', () => {
  const dropzone = document.querySelector('.dropzone');
  if (fileInput.files.length) dropzone.textContent = `${fileInput.files.length} jewelry file${fileInput.files.length > 1 ? 's' : ''} selected`;
});
