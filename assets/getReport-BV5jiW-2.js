import { v as r, c as o } from "./calcpad-template-BSrQGsqL.js";
function c({ template: t, data: n }) {
  const e = document.createElement("div");
  return r.derive(() => {
    o(t(n), e);
  }), e;
}
export {
  c as g
};
