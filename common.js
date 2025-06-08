let defaultMainHTML = '';
if (typeof window !== 'undefined') {
  const initContainer = document.querySelector('.content.main');
  if (initContainer) defaultMainHTML = initContainer.innerHTML;

  function showTab(event, tabName) {
    const container = document.querySelector('.content.main');
    if (container && !document.getElementById(tabName)) {
      container.innerHTML = defaultMainHTML;
    }
    document.querySelectorAll('.page-link').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'));
    if (event) event.target.classList.add('active');
    const target = document.getElementById(tabName);
    if (target) target.classList.add('active');
    if (tabName === 'quiz') resetQuiz();
  }

  function showExtra(card) {
    const extra = card.querySelector('.card-extra');
    if (!extra) return;
    extra.style.display = (extra.style.display === 'block') ? 'none' : 'block';
    card.classList.toggle('active');
  }

  function showOverlay() {
    const ov = document.getElementById("overlay");
    if (ov) ov.classList.add("active");
  }

  function hideOverlay() {
    const ov = document.getElementById("overlay");
    if (ov) ov.classList.remove("active");
  }

  function closeOverlay() {
    hideOverlay();
    if (typeof closeSEPanel === "function") closeSEPanel();
    if (typeof closeTestPanel === "function") closeTestPanel();
  }

  function loadPage(event, file) {
    const container = document.querySelector('.content.main');
    if (!container) return;
    container.innerHTML = `<iframe src="${file}" class="page-frame"></iframe>`;
    document.querySelectorAll('.page-link').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
  }

}
