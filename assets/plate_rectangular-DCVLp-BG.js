import { v as t, g as $, a as z, x as F } from "./calcpad-template-BSrQGsqL.js";
import { d as k, a as E, __tla as __tla_0 } from "./deformCpp-BprT8Kg9.js";
import { g as P } from "./getParameters-BHuv0NKi.js";
import { g as O } from "./getDialog-Dm5sakGN.js";
import { g as R } from "./getReport-BV5jiW-2.js";
import { g as A, __tla as __tla_1 } from "./getMesh-DmUdekin.js";
import "./complex-i8qiIvCl.js";
import "./__vite-browser-external-D7Ct-6yo.js";
Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  const e = {
    width: {
      value: t.state(6),
      min: 2,
      max: 20,
      step: 0.5,
      label: "Width (m)"
    },
    height: {
      value: t.state(4),
      min: 2,
      max: 15,
      step: 0.5,
      label: "Height (m)"
    },
    thickness: {
      value: t.state(0.2),
      min: 0.05,
      max: 1,
      step: 0.05,
      label: "Thickness (m)"
    },
    meshSize: {
      value: t.state(0.5),
      min: 0.2,
      max: 2,
      step: 0.1,
      label: "Mesh Size (m)"
    },
    load: {
      value: t.state(-10),
      min: -50,
      max: 50,
      step: 1,
      label: "Load (kN/m\xB2)"
    },
    elasticity: {
      value: t.state(3e4),
      min: 1e3,
      max: 21e4,
      step: 1e3,
      label: "Elasticity (MPa)"
    },
    poisson: {
      value: t.state(0.2),
      min: 0.1,
      max: 0.45,
      step: 0.05,
      label: "Poisson's Ratio"
    }
  }, a = {
    nodes: t.state([]),
    elements: t.state([]),
    nodeInputs: t.state({}),
    elementInputs: t.state({}),
    deformOutputs: t.state({}),
    analyzeOutputs: t.state({})
  }, b = t.state(""), y = t.state(void 0);
  t.derive(() => {
    const c = e.width.value.val, d = e.height.value.val, n = e.thickness.value.val, u = e.meshSize.value.val, h = e.load.value.val * 1e3, r = e.elasticity.value.val * 1e6, p = e.poisson.value.val, { nodes: o, elements: l, boundaryIndices: v } = A({
      points: [
        [
          0,
          0,
          0
        ],
        [
          c,
          0,
          0
        ],
        [
          c,
          d,
          0
        ],
        [
          0,
          d,
          0
        ]
      ],
      polygon: [
        0,
        1,
        2,
        3
      ],
      maxMeshSize: u
    });
    a.nodeInputs.val = {
      supports: new Map(v.map((i) => [
        i,
        [
          true,
          true,
          true,
          true,
          true,
          true
        ]
      ])),
      loads: new Map(o.map((i, s) => [
        s,
        [
          0,
          0,
          h,
          0,
          0,
          0
        ]
      ]))
    }, a.nodes.val = o, a.elements.val = l;
    const g = r / (2 * (1 + p));
    a.elementInputs.val = {
      elasticities: new Map(l.map((i, s) => [
        s,
        r
      ])),
      elasticitiesOrthogonal: new Map(l.map((i, s) => [
        s,
        r
      ])),
      thicknesses: new Map(l.map((i, s) => [
        s,
        n
      ])),
      poissonsRatios: new Map(l.map((i, s) => [
        s,
        p
      ])),
      shearModuli: new Map(l.map((i, s) => [
        s,
        g
      ]))
    }, a.deformOutputs.val = k(o, l, a.nodeInputs.val, a.elementInputs.val), a.analyzeOutputs.val = E(o, l, a.elementInputs.val, a.deformOutputs.val);
  });
  function I(c) {
    const d = e.width.value.val, n = e.height.value.val, u = e.thickness.value.val, h = e.meshSize.value.val, r = e.load.value.val, p = e.elasticity.value.val, o = e.poisson.value.val, l = a.nodes.val, v = a.elements.val, g = a.deformOutputs.val, i = a.analyzeOutputs.val, s = g.displacements || /* @__PURE__ */ new Map(), x = Math.max(...Array.from(s.values()).map((m) => Math.abs(m[2] || 0))), f = i.bendingXX || /* @__PURE__ */ new Map(), M = i.bendingYY || /* @__PURE__ */ new Map(), S = Math.max(...Array.from(f.values()).flat().map((m) => Math.abs(m))), w = Math.max(...Array.from(M.values()).flat().map((m) => Math.abs(m)));
    return F`
    <style>
      .report-container { font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
      .report-header { text-align: center; border-bottom: 2px solid #2c5aa0; padding-bottom: 15px; margin-bottom: 20px; }
      .report-header h1 { color: #2c5aa0; margin: 0; }
      .section { margin-bottom: 25px; }
      .section h2 { color: #2c5aa0; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
      table { width: 100%; border-collapse: collapse; margin: 10px 0; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f5f5f5; font-weight: 600; }
      .value { font-weight: bold; color: #333; }
      .unit { color: #666; font-size: 0.9em; }
      .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 15px 0; }
      .summary-card { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 15px; border-radius: 8px; border-left: 4px solid #2c5aa0; }
      .summary-card h4 { margin: 0 0 5px 0; color: #495057; font-size: 0.9em; }
      .summary-card .value { font-size: 1.4em; color: #2c5aa0; }
      .result-highlight { background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
      .result-highlight h3 { color: #2c5aa0; margin-top: 0; }
    </style>

    <div class="report-container">
      <div class="report-header">
        <h1>Rectangular Plate Analysis</h1>
        <p>Finite Element Method - Shell Elements</p>
      </div>

      <div class="section">
        <h2>1. Geometry</h2>
        <div class="summary-grid">
          <div class="summary-card">
            <h4>Width (Lx)</h4>
            <span class="value">${d.toFixed(2)}</span> <span class="unit">m</span>
          </div>
          <div class="summary-card">
            <h4>Height (Ly)</h4>
            <span class="value">${n.toFixed(2)}</span> <span class="unit">m</span>
          </div>
          <div class="summary-card">
            <h4>Thickness (t)</h4>
            <span class="value">${(u * 100).toFixed(1)}</span> <span class="unit">cm</span>
          </div>
          <div class="summary-card">
            <h4>Area</h4>
            <span class="value">${(d * n).toFixed(2)}</span> <span class="unit">m²</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>2. Material Properties</h2>
        <table>
          <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
          <tr>
            <td>Modulus of Elasticity (E)</td>
            <td class="value">${p.toLocaleString()}</td>
            <td class="unit">MPa</td>
          </tr>
          <tr>
            <td>Poisson's Ratio (ν)</td>
            <td class="value">${o.toFixed(2)}</td>
            <td class="unit">-</td>
          </tr>
          <tr>
            <td>Shear Modulus (G)</td>
            <td class="value">${(p / (2 * (1 + o))).toLocaleString()}</td>
            <td class="unit">MPa</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h2>3. Loading</h2>
        <table>
          <tr>
            <th>Load Type</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
          <tr>
            <td>Uniform Distributed Load (q)</td>
            <td class="value">${r.toFixed(1)}</td>
            <td class="unit">kN/m²</td>
          </tr>
          <tr>
            <td>Total Load (Q = q × A)</td>
            <td class="value">${(r * d * n).toFixed(1)}</td>
            <td class="unit">kN</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h2>4. Mesh Information</h2>
        <table>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Maximum Element Size</td>
            <td class="value">${h.toFixed(2)} m</td>
          </tr>
          <tr>
            <td>Number of Nodes</td>
            <td class="value">${l.length}</td>
          </tr>
          <tr>
            <td>Number of Elements</td>
            <td class="value">${v.length}</td>
          </tr>
          <tr>
            <td>Element Type</td>
            <td class="value">DSG3 Shell (Triangular)</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <h2>5. Analysis Results</h2>
        <div class="result-highlight">
          <h3>Maximum Values</h3>
          <div class="summary-grid">
            <div class="summary-card">
              <h4>Max Displacement (w)</h4>
              <span class="value">${(x * 1e3).toFixed(3)}</span> <span class="unit">mm</span>
            </div>
            <div class="summary-card">
              <h4>Max Moment Mxx</h4>
              <span class="value">${(S / 1e3).toFixed(2)}</span> <span class="unit">kN·m/m</span>
            </div>
            <div class="summary-card">
              <h4>Max Moment Myy</h4>
              <span class="value">${(w / 1e3).toFixed(2)}</span> <span class="unit">kN·m/m</span>
            </div>
            <div class="summary-card">
              <h4>Span/Deflection Ratio</h4>
              <span class="value">${x > 0 ? (Math.min(d, n) / x).toFixed(0) : "\u221E"}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>6. Boundary Conditions</h2>
        <p>Simply supported on all edges (pinned): UX = UY = UZ = 0</p>
        <table>
          <tr>
            <th>Edge</th>
            <th>Condition</th>
          </tr>
          <tr><td>x = 0</td><td>Simply Supported</td></tr>
          <tr><td>x = ${d.toFixed(1)} m</td><td>Simply Supported</td></tr>
          <tr><td>y = 0</td><td>Simply Supported</td></tr>
          <tr><td>y = ${n.toFixed(1)} m</td><td>Simply Supported</td></tr>
        </table>
      </div>

      <div class="section" style="font-size: 0.85em; color: #666; border-top: 1px solid #ddd; padding-top: 15px;">
        <p><strong>Generated by:</strong> Awatif FEM - Rectangular Plate Analysis</p>
        <p><strong>Element Formulation:</strong> DSG3 (Discrete Shear Gap) triangular shell element</p>
      </div>
    </div>
  `;
  }
  t.derive(() => {
    b.val === "Report" && (y.val = R({
      template: I,
      data: {
        mesh: a
      }
    }));
  });
  document.body.append(P(e), $({
    mesh: a,
    settingsObj: {
      nodes: false,
      deformedShape: true,
      loads: false,
      shellResults: "displacementZ"
    }
  }), z({
    clickedButton: b,
    buttons: [
      "Report"
    ],
    sourceCode: "https://github.com/GiorgioBurbanelli89/awatif-web/blob/main/examples/src/plate_rectangular/main.ts",
    author: "https://github.com/GiorgioBurbanelli89"
  }), O({
    dialogBody: y
  }));
});
