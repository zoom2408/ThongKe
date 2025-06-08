if (typeof window !== 'undefined') {
  function showTab(event, tabName) {
    document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'));
    if (event) event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
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
