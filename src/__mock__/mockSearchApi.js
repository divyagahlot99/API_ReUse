import rawMock from "./mockSearchApi.json";

const mockSearchData = (rawMock || []).map((it) => ({
  nameOfApi: it.name ?? it.nameOfApi ?? "unknown",
  description: it.description ?? it.desc ?? "",
  tags: Array.isArray(it.tags) ? it.tags : it.tags ? [it.tags] : [],
  language: it.language ?? "Unknown",
}));

const languages = Array.from(new Set(mockSearchData.map((m) => m.language || "Unknown"))).sort();

export { mockSearchData, languages };
export default { mockSearchData, languages };