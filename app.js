const modal = document.querySelector('#creationModal');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const prompt = document.querySelector('#prompt');
const success = document.querySelector('#success');
const fileInput = document.querySelector('#fileInput');

const toolCopy = {
  text: ['Text to image', 'Describe the jewelry piece you want to visualize.', 'A sculptural gold ring with a champagne diamond, floating on black velvet...'],
  image: ['Image to 3D', 'Upload a jewelry reference and we’ll prepare a detailed 3D asset.', 'Describe any details we should preserve: stone cut, metal, engraving...'],
  motion: ['4D motion', 'Give your jewelry a cinematic product moment.', 'A slow macro orbit with soft studio light moving across every facet...']
};

function openModal(type = 'text') {
  const copy = toolCopy[type];
  modalTitle.textContent = copy[0];
  modalDescription.textContent = copy[1];
  prompt.placeholder = copy[2];
  success.classList.remove('show');
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
  success.classList.add('show');
  success.textContent = '✦ Your concept is ready. Download options will appear in your collection.';
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
  downloadFile(name, `Aurelia jewelry asset placeholder\nFile: ${name}\nGenerated: ${new Date().toISOString()}`, 'text/plain');
  button.textContent = '✓';
  setTimeout(() => button.textContent = '⇩', 1400);
}));

document.querySelector('#downloadAll').addEventListener('click', () => {
  const manifest = { workspace: 'Aurelia Studio', assets: ['celestial-pendant_hero.png', 'solitaire-ring_model.glb', 'arc-earrings_loop.mp4'], exportedAt: new Date().toISOString() };
  downloadFile('aurelia-asset-manifest.json', JSON.stringify(manifest, null, 2), 'application/json');
});

fileInput.addEventListener('change', () => {
  const dropzone = document.querySelector('.dropzone');
  if (fileInput.files.length) dropzone.textContent = `${fileInput.files.length} jewelry file${fileInput.files.length > 1 ? 's' : ''} selected`;
});
