import van from "vanjs-core";
import { deform, analyze, Mesh } from "awatif-fem";
import { getViewer, Parameters, getParameters, getToolbar, getDialog, getReport } from "awatif-ui";
import { getMesh } from "awatif-mesh";
import { html, TemplateResult } from "lit-html";

// Init - Parametric Rectangular Plate
const parameters: Parameters = {
  width: {
    value: van.state(6),
    min: 2,
    max: 20,
    step: 0.5,
    label: "Width (m)"
  },
  height: {
    value: van.state(4),
    min: 2,
    max: 15,
    step: 0.5,
    label: "Height (m)"
  },
  thickness: {
    value: van.state(0.2),
    min: 0.05,
    max: 1.0,
    step: 0.05,
    label: "Thickness (m)"
  },
  meshSize: {
    value: van.state(0.5),
    min: 0.2,
    max: 2.0,
    step: 0.1,
    label: "Mesh Size (m)"
  },
  load: {
    value: van.state(-10),
    min: -50,
    max: 50,
    step: 1,
    label: "Load (kN/m²)"
  },
  elasticity: {
    value: van.state(30000),
    min: 1000,
    max: 210000,
    step: 1000,
    label: "Elasticity (MPa)"
  },
  poisson: {
    value: van.state(0.2),
    min: 0.1,
    max: 0.45,
    step: 0.05,
    label: "Poisson's Ratio"
  },
};

const mesh: Mesh = {
  nodes: van.state([]),
  elements: van.state([]),
  nodeInputs: van.state({}),
  elementInputs: van.state({}),
  deformOutputs: van.state({}),
  analyzeOutputs: van.state({}),
};

const clickedButton = van.state("");
const dialogBody = van.state(undefined);

// Events: on parameter change mesh & analyze
van.derive(() => {
  const W = parameters.width.value.val;
  const H = parameters.height.value.val;
  const t = parameters.thickness.value.val;
  const mSize = parameters.meshSize.value.val;
  const P = parameters.load.value.val * 1e3; // kN/m² to N/m²
  const E = parameters.elasticity.value.val * 1e6; // MPa to Pa
  const nu = parameters.poisson.value.val;

  // Create rectangular plate mesh
  const { nodes, elements, boundaryIndices } = getMesh({
    points: [
      [0, 0, 0],
      [W, 0, 0],
      [W, H, 0],
      [0, H, 0],
    ],
    polygon: [0, 1, 2, 3],
    maxMeshSize: mSize,
  });

  // All boundary nodes are simply supported
  mesh.nodeInputs.val = {
    supports: new Map(
      boundaryIndices.map((i) => [i, [true, true, true, true, true, true]])
    ),
    loads: new Map(
      nodes.map((_, i) => [i, [0, 0, P, 0, 0, 0]])
    ),
  };

  mesh.nodes.val = nodes;
  mesh.elements.val = elements;

  // Element properties
  const G = E / (2 * (1 + nu)); // Shear modulus

  mesh.elementInputs.val = {
    elasticities: new Map(elements.map((_, i) => [i, E])),
    elasticitiesOrthogonal: new Map(elements.map((_, i) => [i, E])),
    thicknesses: new Map(elements.map((_, i) => [i, t])),
    poissonsRatios: new Map(elements.map((_, i) => [i, nu])),
    shearModuli: new Map(elements.map((_, i) => [i, G])),
  };

  // Analyze
  mesh.deformOutputs.val = deform(
    nodes,
    elements,
    mesh.nodeInputs.val,
    mesh.elementInputs.val
  );

  mesh.analyzeOutputs.val = analyze(
    nodes,
    elements,
    mesh.elementInputs.val,
    mesh.deformOutputs.val
  );
});

// Report template
function getTemplate(data: any): TemplateResult {
  const W = parameters.width.value.val;
  const H = parameters.height.value.val;
  const t = parameters.thickness.value.val;
  const mSize = parameters.meshSize.value.val;
  const P = parameters.load.value.val;
  const E = parameters.elasticity.value.val;
  const nu = parameters.poisson.value.val;

  const nodes = mesh.nodes.val;
  const elements = mesh.elements.val;
  const deformOutputs = mesh.deformOutputs.val;
  const analyzeOutputs = mesh.analyzeOutputs.val;

  // Calculate max values
  const displacements = deformOutputs.displacements || new Map();
  const maxDisp = Math.max(...Array.from(displacements.values()).map((d: number[]) => Math.abs(d[2] || 0)));

  const bendingXX = analyzeOutputs.bendingXX || new Map();
  const bendingYY = analyzeOutputs.bendingYY || new Map();
  const maxMxx = Math.max(...Array.from(bendingXX.values()).flat().map((v: number) => Math.abs(v)));
  const maxMyy = Math.max(...Array.from(bendingYY.values()).flat().map((v: number) => Math.abs(v)));

  return html`
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
            <span class="value">${W.toFixed(2)}</span> <span class="unit">m</span>
          </div>
          <div class="summary-card">
            <h4>Height (Ly)</h4>
            <span class="value">${H.toFixed(2)}</span> <span class="unit">m</span>
          </div>
          <div class="summary-card">
            <h4>Thickness (t)</h4>
            <span class="value">${(t * 100).toFixed(1)}</span> <span class="unit">cm</span>
          </div>
          <div class="summary-card">
            <h4>Area</h4>
            <span class="value">${(W * H).toFixed(2)}</span> <span class="unit">m²</span>
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
            <td class="value">${E.toLocaleString()}</td>
            <td class="unit">MPa</td>
          </tr>
          <tr>
            <td>Poisson's Ratio (ν)</td>
            <td class="value">${nu.toFixed(2)}</td>
            <td class="unit">-</td>
          </tr>
          <tr>
            <td>Shear Modulus (G)</td>
            <td class="value">${(E / (2 * (1 + nu))).toLocaleString()}</td>
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
            <td class="value">${P.toFixed(1)}</td>
            <td class="unit">kN/m²</td>
          </tr>
          <tr>
            <td>Total Load (Q = q × A)</td>
            <td class="value">${(P * W * H).toFixed(1)}</td>
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
            <td class="value">${mSize.toFixed(2)} m</td>
          </tr>
          <tr>
            <td>Number of Nodes</td>
            <td class="value">${nodes.length}</td>
          </tr>
          <tr>
            <td>Number of Elements</td>
            <td class="value">${elements.length}</td>
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
              <span class="value">${(maxDisp * 1000).toFixed(3)}</span> <span class="unit">mm</span>
            </div>
            <div class="summary-card">
              <h4>Max Moment Mxx</h4>
              <span class="value">${(maxMxx / 1000).toFixed(2)}</span> <span class="unit">kN·m/m</span>
            </div>
            <div class="summary-card">
              <h4>Max Moment Myy</h4>
              <span class="value">${(maxMyy / 1000).toFixed(2)}</span> <span class="unit">kN·m/m</span>
            </div>
            <div class="summary-card">
              <h4>Span/Deflection Ratio</h4>
              <span class="value">${maxDisp > 0 ? (Math.min(W, H) / maxDisp).toFixed(0) : '∞'}</span>
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
          <tr><td>x = ${W.toFixed(1)} m</td><td>Simply Supported</td></tr>
          <tr><td>y = 0</td><td>Simply Supported</td></tr>
          <tr><td>y = ${H.toFixed(1)} m</td><td>Simply Supported</td></tr>
        </table>
      </div>

      <div class="section" style="font-size: 0.85em; color: #666; border-top: 1px solid #ddd; padding-top: 15px;">
        <p><strong>Generated by:</strong> Awatif FEM - Rectangular Plate Analysis</p>
        <p><strong>Element Formulation:</strong> DSG3 (Discrete Shear Gap) triangular shell element</p>
      </div>
    </div>
  `;
}

// Dialog handling
van.derive(() => {
  if (clickedButton.val === "Report") {
    dialogBody.val = getReport({
      template: getTemplate,
      data: { mesh },
    });
  }
});

document.body.append(
  getParameters(parameters),
  getViewer({
    mesh,
    settingsObj: {
      nodes: false,
      deformedShape: true,
      loads: false,
      shellResults: "displacementZ",
    },
  }),
  getToolbar({
    clickedButton,
    buttons: ["Report"],
    sourceCode:
      "https://github.com/GiorgioBurbanelli89/awatif-web/blob/main/examples/src/plate_rectangular/main.ts",
    author: "https://github.com/GiorgioBurbanelli89",
  }),
  getDialog({ dialogBody })
);
