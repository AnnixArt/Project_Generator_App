const form = document.getElementById('projectForm');
const previewBtn = document.getElementById('previewBtn');
const downloadBtn = document.getElementById('downloadBtn');
const refreshBtn = document.getElementById('refreshBtn');
const previewModal = document.getElementById('previewModal');
const closeModalBtn = document.getElementById('closeModal');
const previewText = document.getElementById('previewText');

function generateProjectFiles(lang, db) {
  const files = {};
  if (lang === 'html-css-js') {
    files['index.html'] = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /><title>Projet HTML/CSS/JS</title></head>
<body><h1>Projet HTML/CSS/JS</h1></body></html>`;
    files['style.css'] = `body { font-family: Arial; background: #f0f0f0; }`;
    files['script.js'] = `console.log('JS fonctionnel !');`;
  } else {
    files['README.txt'] = `Langage choisi : ${lang}\nBase de données : ${db || 'Aucune'}`;
  }
  return files;
}

previewBtn.addEventListener('click', () => {
  const lang = form.language.value;
  const db = form.database.value || null;
  const files = generateProjectFiles(lang, db);

  let previewContent = '';
  for (const [filename, content] of Object.entries(files)) {
    previewContent += `--- ${filename} ---\n${content}\n\n`;
  }
  previewText.textContent = previewContent;
  previewModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
  previewModal.classList.remove('active');
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    previewModal.classList.remove('active');
  }
});

downloadBtn.addEventListener('click', () => {
  const lang = form.language.value;
  const db = form.database.value || null;
  const files = generateProjectFiles(lang, db);

  if (typeof JSZip === 'undefined') {
    alert("JSZip manquant !");
    return;
  }
  const zip = new JSZip();
  for (const [filename, content] of Object.entries(files)) {
    zip.file(filename, content);
  }
  zip.generateAsync({ type: "blob" }).then(content => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = "projet.zip";
    a.click();
  });
});

refreshBtn.addEventListener('click', () => {
  if (confirm("Réinitialiser le formulaire ?")) {
    form.reset();
  }
});
