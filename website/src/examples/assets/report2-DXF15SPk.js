import { v as o, c as k, x as l, a as N, g as C } from "./calcpad-template-BSrQGsqL.js";
import { d as R, a as S, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as z } from "./getParameters-BHuv0NKi.js";
import { g as E } from "./getDialog-Dm5sakGN.js";
import "./complex-i8qiIvCl.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function T({ template: p, data: i, title: d = "Structural Analysis Report", showPrintButton: h = true, showHtmlButton: n = true }) {
    const a = document.createElement("div");
    a.className = "calcpad-report";
    const e = document.createElement("div");
    if (e.className = "no-print", e.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
  `, h) {
      const s = document.createElement("button");
      s.textContent = "Print Report", s.style.cssText = `
      padding: 8px 16px;
      background: #2e5368;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `, s.onclick = () => window.print(), e.appendChild(s);
    }
    if (n) {
      const s = document.createElement("button");
      s.textContent = "Export HTML", s.style.cssText = `
      padding: 8px 16px;
      background: #4a7c94;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `, s.onclick = () => A(a, d), e.appendChild(s);
    }
    a.appendChild(e);
    const c = document.createElement("div");
    return c.className = "report-content", a.appendChild(c), o.derive(() => {
      k(p(i), c);
    }), a;
  }
  function A(p, i) {
    var _a;
    const d = B(), h = ((_a = p.querySelector(".report-content")) == null ? void 0 : _a.innerHTML) || "", n = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${i} - Created with Awatif + Calcpad Template</title>
    <style>
${d}
    </style>
</head>
<body>
    <div class="calcpad-report">
${h}
    </div>
</body>
</html>`, a = new Blob([
      n
    ], {
      type: "text/html"
    }), e = URL.createObjectURL(a), c = document.createElement("a");
    c.href = e, c.download = `${i.replace(/\s+/g, "_")}_Report.html`, c.click(), URL.revokeObjectURL(e);
  }
  function B() {
    return `
/* Calcpad Template CSS - Standalone Version */
.calcpad-report {
    font-size: 11pt;
    font-family: 'Segoe UI', 'Arial Nova', Helvetica, sans-serif;
    margin: 0 auto;
    padding: 20px;
    max-width: 190mm;
    background: white;
    color: #333;
    line-height: 1.5;
}

.calcpad-report h1, .calcpad-report h2, .calcpad-report h3,
.calcpad-report h4, .calcpad-report h5, .calcpad-report h6 {
    font-family: 'Arial Nova', Helvetica, sans-serif;
    margin: 0.5em 0;
    color: #2e5368;
}

.calcpad-report h1 { font-size: 2.1em; border-bottom: 2px solid #2e5368; padding-bottom: 0.3em; }
.calcpad-report h2 { font-size: 1.7em; border-bottom: 1px solid #ddd; padding-bottom: 0.2em; }
.calcpad-report h3 { font-size: 1.4em; }
.calcpad-report h4 { font-size: 1.2em; }

.calcpad-report p, .calcpad-report li {
    margin: 0.3em 0;
    line-height: 150%;
}

.calcpad-report .eq {
    font-family: 'Georgia Pro', 'Times New Roman', serif;
    display: block;
    margin: 0.5em 0;
}

.calcpad-report .eq var {
    color: #06d;
    font-style: italic;
}

.calcpad-report table {
    border-collapse: collapse;
    margin: 1em 0;
    width: 100%;
}

.calcpad-report th, .calcpad-report td {
    border: 1px solid #999;
    padding: 8px 12px;
}

.calcpad-report th {
    background-color: #f0f0f0;
    font-weight: 600;
    color: #2e5368;
}

.calcpad-report tr:nth-child(even) td {
    background-color: #fafafa;
}

.calcpad-report .ok {
    color: #228B22;
    background-color: #F0FFF0;
    padding: 2px 6px;
    border-radius: 3px;
}

.calcpad-report .err {
    color: #DC143C;
    background-color: #FEE;
    padding: 2px 6px;
    border-radius: 3px;
}

.calcpad-report .report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: linear-gradient(135deg, #2e5368 0%, #4a7c94 100%);
    color: white;
    border-radius: 4px;
    margin-bottom: 1.5em;
}

.calcpad-report .report-header h1 {
    color: white;
    border: none;
    margin: 0;
}

.calcpad-report .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
    margin: 1em 0;
}

.calcpad-report .summary-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1em;
    text-align: center;
}

.calcpad-report .summary-card .number {
    font-size: 2em;
    font-weight: 700;
    color: #2e5368;
}

.calcpad-report .summary-card .label {
    font-size: 0.9em;
    color: #666;
}

.calcpad-report .section {
    margin: 1.5em 0;
    padding: 1em;
    background: #f9f9f9;
    border-left: 4px solid #2e5368;
    border-radius: 0 4px 4px 0;
}

.calcpad-report hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 1.5em 0;
}

@media print {
    .calcpad-report { margin: 0; padding: 10mm; max-width: 100%; }
    .no-print { display: none; }
}

@page { size: A4 portrait; margin: 15mm; }
`;
  }
  function M({ nodes: p, elements: i, nodeInputs: d, elementInputs: h, deformOutputs: n, analyzeOutputs: a }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const e = ((_a = p.val) == null ? void 0 : _a.length) || 0, c = ((_b = i.val) == null ? void 0 : _b.length) || 0, s = ((_d = (_c = d.val) == null ? void 0 : _c.supports) == null ? void 0 : _d.size) || 0, f = ((_f = (_e = d.val) == null ? void 0 : _e.loads) == null ? void 0 : _f.size) || 0;
    return l`
    <!-- Report Header -->
    <div class="report-header">
      <div>
        <h1>Structural Analysis Report</h1>
        <p>Finite Element Analysis - Bar/Beam Elements</p>
      </div>
      <div class="meta">
        <div class="date">${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })}</div>
        <div>Generated with Awatif + Calcpad Template</div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="summary-card">
        <div class="number">${e}</div>
        <div class="label">Nodes</div>
      </div>
      <div class="summary-card">
        <div class="number">${c}</div>
        <div class="label">Elements</div>
      </div>
      <div class="summary-card">
        <div class="number">${s}</div>
        <div class="label">Supports</div>
      </div>
      <div class="summary-card">
        <div class="number">${f}</div>
        <div class="label">Loaded Nodes</div>
      </div>
    </div>

    <hr />

    <!-- Section 1: Input Data -->
    <h2>1. Input Data</h2>

    <h3>1.1 Node Coordinates</h3>
    <p>
      The structure consists of <strong>${e}</strong> nodes with the
      following coordinates:
    </p>

    <table>
      <tr>
        <th>Node</th>
        <th>X (m)</th>
        <th>Y (m)</th>
        <th>Z (m)</th>
      </tr>
      ${(_g = p.val) == null ? void 0 : _g.map((r, t) => l`
          <tr>
            <td><strong>${t}</strong></td>
            <td>${r[0].toFixed(3)}</td>
            <td>${r[1].toFixed(3)}</td>
            <td>${r[2].toFixed(3)}</td>
          </tr>
        `)}
    </table>

    <h3>1.2 Element Connectivity</h3>
    <p>
      The structure has <strong>${c}</strong> bar/beam elements
      connecting the nodes:
    </p>

    <table>
      <tr>
        <th>Element</th>
        <th>Node i</th>
        <th>Node j</th>
        <th>E (GPa)</th>
        <th>A (m²)</th>
      </tr>
      ${(_h = i.val) == null ? void 0 : _h.map((r, t) => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      return l`
          <tr>
            <td><strong>${t}</strong></td>
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            <td>
              ${((_c2 = (_b2 = (_a2 = h.val) == null ? void 0 : _a2.elasticities) == null ? void 0 : _b2.get(t)) == null ? void 0 : _c2.toFixed(2)) || "-"}
            </td>
            <td>${((_f2 = (_e2 = (_d2 = h.val) == null ? void 0 : _d2.areas) == null ? void 0 : _e2.get(t)) == null ? void 0 : _f2.toFixed(4)) || "-"}</td>
          </tr>
        `;
    })}
    </table>

    <h3>1.3 Boundary Conditions</h3>
    <h4>Supports</h4>
    <p>Fixed supports are applied at the following nodes:</p>

    <table>
      <tr>
        <th>Node</th>
        <th>Ux</th>
        <th>Uy</th>
        <th>Uz</th>
        <th>Rx</th>
        <th>Ry</th>
        <th>Rz</th>
      </tr>
      ${((_i = d.val) == null ? void 0 : _i.supports) ? [
      ...d.val.supports
    ].map(([r, t]) => l`
              <tr>
                <td><strong>${r}</strong></td>
                <td class="${t[0] ? "ok" : ""}">${t[0] ? "Fixed" : "Free"}</td>
                <td class="${t[1] ? "ok" : ""}">${t[1] ? "Fixed" : "Free"}</td>
                <td class="${t[2] ? "ok" : ""}">${t[2] ? "Fixed" : "Free"}</td>
                <td class="${t[3] ? "ok" : ""}">${t[3] ? "Fixed" : "Free"}</td>
                <td class="${t[4] ? "ok" : ""}">${t[4] ? "Fixed" : "Free"}</td>
                <td class="${t[5] ? "ok" : ""}">${t[5] ? "Fixed" : "Free"}</td>
              </tr>
            `) : l`<tr><td colspan="7">No supports defined</td></tr>`}
    </table>

    <h4>Applied Loads</h4>
    <p>External loads are applied at the following nodes:</p>

    <table>
      <tr>
        <th>Node</th>
        <th>Fx (kN)</th>
        <th>Fy (kN)</th>
        <th>Fz (kN)</th>
        <th>Mx (kN·m)</th>
        <th>My (kN·m)</th>
        <th>Mz (kN·m)</th>
      </tr>
      ${((_j = d.val) == null ? void 0 : _j.loads) ? [
      ...d.val.loads
    ].map(([r, t]) => l`
              <tr>
                <td><strong>${r}</strong></td>
                <td>${t[0].toFixed(2)}</td>
                <td>${t[1].toFixed(2)}</td>
                <td>${t[2].toFixed(2)}</td>
                <td>${t[3].toFixed(2)}</td>
                <td>${t[4].toFixed(2)}</td>
                <td>${t[5].toFixed(2)}</td>
              </tr>
            `) : l`<tr><td colspan="7">No loads defined</td></tr>`}
    </table>

    <hr />

    <!-- Section 2: Analysis Results -->
    <h2>2. Analysis Results</h2>

    <h3>2.1 Nodal Displacements</h3>
    <p>Computed displacements at each node:</p>

    <table>
      <tr>
        <th>Node</th>
        <th>Ux (mm)</th>
        <th>Uy (mm)</th>
        <th>Uz (mm)</th>
        <th>Rx (rad)</th>
        <th>Ry (rad)</th>
        <th>Rz (rad)</th>
      </tr>
      ${((_k = n.val) == null ? void 0 : _k.deformations) ? [
      ...n.val.deformations
    ].map(([r, t]) => {
      var _a2, _b2, _c2;
      return l`
              <tr>
                <td><strong>${r}</strong></td>
                <td>${(t[0] * 1e3).toFixed(4)}</td>
                <td>${(t[1] * 1e3).toFixed(4)}</td>
                <td>${(t[2] * 1e3).toFixed(4)}</td>
                <td>${((_a2 = t[3]) == null ? void 0 : _a2.toFixed(6)) || "0.000000"}</td>
                <td>${((_b2 = t[4]) == null ? void 0 : _b2.toFixed(6)) || "0.000000"}</td>
                <td>${((_c2 = t[5]) == null ? void 0 : _c2.toFixed(6)) || "0.000000"}</td>
              </tr>
            `;
    }) : l`<tr><td colspan="7">No deformation data</td></tr>`}
    </table>

    <h3>2.2 Support Reactions</h3>
    <p>Reaction forces at support nodes:</p>

    <table>
      <tr>
        <th>Node</th>
        <th>Rx (kN)</th>
        <th>Ry (kN)</th>
        <th>Rz (kN)</th>
      </tr>
      ${((_l = n.val) == null ? void 0 : _l.reactions) ? [
      ...n.val.reactions
    ].map(([r, t]) => l`
              <tr>
                <td><strong>${r}</strong></td>
                <td>${t[0].toFixed(2)}</td>
                <td>${t[1].toFixed(2)}</td>
                <td>${t[2].toFixed(2)}</td>
              </tr>
            `) : l`<tr><td colspan="4">No reaction data</td></tr>`}
    </table>

    <h3>2.3 Element Forces</h3>
    <p>Internal forces in each element:</p>

    <table>
      <tr>
        <th>Element</th>
        <th>Normal Force (kN)</th>
        <th>Status</th>
      </tr>
      ${((_m = a.val) == null ? void 0 : _m.normals) ? [
      ...a.val.normals
    ].map(([r, t]) => l`
              <tr>
                <td><strong>${r}</strong></td>
                <td>${t[0].toFixed(2)}</td>
                <td class="${t[0] < 0 ? "err" : "ok"}">
                  ${t[0] < 0 ? "Compression" : "Tension"}
                </td>
              </tr>
            `) : l`<tr><td colspan="3">No force data</td></tr>`}
    </table>

    <hr />

    <!-- Section 3: Conclusions -->
    <h2>3. Summary</h2>
    <div class="section">
      <p>
        <strong>Structure Type:</strong> Bar/Beam Frame<br />
        <strong>Total Nodes:</strong> ${e}<br />
        <strong>Total Elements:</strong> ${c}<br />
        <strong>Support Conditions:</strong> ${s} fixed nodes<br />
        <strong>Load Cases:</strong> ${f} loaded nodes
      </p>
    </div>

    <hr />

    <p style="text-align: center; color: #666; font-size: 0.9em;">
      Report generated with
      <a href="https://awatif.co" target="_blank">Awatif</a> using Calcpad
      Template<br />
      ${(/* @__PURE__ */ new Date()).toLocaleString()}
    </p>
  `;
  }
  const g = {
    span: {
      value: o.state(10),
      min: 5,
      max: 20,
      step: 1,
      label: "Span (m)"
    },
    height: {
      value: o.state(5),
      min: 2,
      max: 10,
      step: 0.5,
      label: "Height (m)"
    },
    load: {
      value: o.state(100),
      min: 10,
      max: 500,
      step: 10,
      label: "Load (kN)"
    },
    elasticity: {
      value: o.state(200),
      min: 100,
      max: 500,
      step: 10,
      label: "E (GPa)"
    },
    area: {
      value: o.state(50),
      min: 10,
      max: 200,
      step: 5,
      label: "Area (cm\xB2)"
    }
  }, u = o.state([]), m = o.state([]), b = o.state({}), v = o.state({}), x = o.state({}), $ = o.state({}), y = {
    nodes: u,
    elements: m,
    nodeInputs: b,
    elementInputs: v,
    deformOutputs: x,
    analyzeOutputs: $
  };
  o.derive(() => {
    const p = g.span.value.val, i = g.height.value.val, d = g.load.value.val, h = g.elasticity.value.val, n = g.area.value.val * 1e-4;
    u.val = [
      [
        0,
        0,
        0
      ],
      [
        0,
        0,
        i
      ],
      [
        p / 2,
        0,
        i + 1
      ],
      [
        p,
        0,
        i
      ],
      [
        p,
        0,
        0
      ]
    ], m.val = [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ]
    ], b.val = {
      supports: /* @__PURE__ */ new Map([
        [
          0,
          [
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ],
        [
          4,
          [
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ]
      ]),
      loads: /* @__PURE__ */ new Map([
        [
          1,
          [
            0,
            0,
            -d / 2,
            0,
            0,
            0
          ]
        ],
        [
          2,
          [
            0,
            0,
            -d,
            0,
            0,
            0
          ]
        ],
        [
          3,
          [
            0,
            0,
            -d / 2,
            0,
            0,
            0
          ]
        ]
      ])
    }, v.val = {
      elasticities: new Map(m.val.map((a, e) => [
        e,
        h
      ])),
      areas: new Map(m.val.map((a, e) => [
        e,
        n
      ])),
      shearModuli: new Map(m.val.map((a, e) => [
        e,
        h * 0.4
      ])),
      torsionalConstants: new Map(m.val.map((a, e) => [
        e,
        n * 0.1
      ])),
      momentsOfInertiaY: new Map(m.val.map((a, e) => [
        e,
        n * 0.01
      ])),
      momentsOfInertiaZ: new Map(m.val.map((a, e) => [
        e,
        n * 0.01
      ]))
    }, x.val = R(u.val, m.val, b.val, v.val), $.val = S(u.val, m.val, v.val, x.val);
  });
  const F = o.state(""), w = o.state(void 0);
  o.derive(() => {
    F.val === "Report" && (w.val = T({
      template: M,
      data: y,
      title: "Portal Frame Analysis",
      showPrintButton: true,
      showHtmlButton: true
    }));
  });
  document.body.append(N({
    clickedButton: F,
    buttons: [
      "Report"
    ],
    sourceCode: "https://github.com/GiorgioBurbanelli89/awatif-ejemplos/blob/main/examples/src/report2/main.ts",
    author: "https://github.com/GiorgioBurbanelli89"
  }), E({
    dialogBody: w
  }), z(g), C({
    mesh: y,
    settingsObj: {
      gridSize: 1e3,
      deformedShape: true
    }
  }));
});
