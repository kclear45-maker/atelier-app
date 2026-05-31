(() => {
  /**
   * 作品画面への切り替え準備（ルーティングや状態保持はここから拡張）
   * @param {string} workId data-work-id
   */
  function prepareWorkScreenTransition(workId) {
    // 画面切り替えは未接続。workId で作品を識別して遷移処理をここに追加する。
  }

  function onWorkCardClick(event) {
    const card = event.currentTarget;
    if (event.target.closest(".work-card__menu")) return;
    const workId = card.dataset.workId;
    if (!workId) return;
    prepareWorkScreenTransition(workId);
  }

  function initHomeWorkCards() {
    document.querySelectorAll(".work-list .work-card").forEach((el) => {
      el.addEventListener("click", onWorkCardClick);
    });
  }

  if (document.body.dataset.page === "home") {
    initHomeWorkCards();
  }
})();
