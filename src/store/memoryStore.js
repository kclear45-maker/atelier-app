/**
 * インメモリ永続化のプレースホルダー。
 * DB導入時は repository / adapter に差し替えやすいようモジュールを分離。
 */

const state = {
  /** @type {Record<string, unknown>} */
  items: {},
};

export function getMemoryStore() {
  return state;
}

export function resetMemoryStoreForTests() {
  state.items = {};
}
