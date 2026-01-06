import { Structure } from "awatif-fem";
import { html, TemplateResult } from "lit-html";

/**
 * Calcpad-style template for Awatif structural analysis reports
 * Professional engineering calculation format
 */
export function template({
  nodes,
  elements,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
}: Structure): TemplateResult {
  const nodeCount = nodes.val?.length || 0;
  const elementCount = elements.val?.length || 0;
  const supportCount = nodeInputs.val?.supports?.size || 0;
  const loadCount = nodeInputs.val?.loads?.size || 0;

  return html`
    <!-- Report Header -->
    <div class="report-header">
      <div>
        <h1>Structural Analysis Report</h1>
        <p>Finite Element Analysis - Bar/Beam Elements</p>
      </div>
      <div class="meta">
        <div class="date">${new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}</div>
        <div>Generated with Awatif + Calcpad Template</div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="summary-card">
        <div class="number">${nodeCount}</div>
        <div class="label">Nodes</div>
      </div>
      <div class="summary-card">
        <div class="number">${elementCount}</div>
        <div class="label">Elements</div>
      </div>
      <div class="summary-card">
        <div class="number">${supportCount}</div>
        <div class="label">Supports</div>
      </div>
      <div class="summary-card">
        <div class="number">${loadCount}</div>
        <div class="label">Loaded Nodes</div>
      </div>
    </div>

    <hr />

    <!-- Section 1: Input Data -->
    <h2>1. Input Data</h2>

    <h3>1.1 Node Coordinates</h3>
    <p>
      The structure consists of <strong>${nodeCount}</strong> nodes with the
      following coordinates:
    </p>

    <table>
      <tr>
        <th>Node</th>
        <th>X (m)</th>
        <th>Y (m)</th>
        <th>Z (m)</th>
      </tr>
      ${nodes.val?.map(
        (node, index) => html`
          <tr>
            <td><strong>${index}</strong></td>
            <td>${node[0].toFixed(3)}</td>
            <td>${node[1].toFixed(3)}</td>
            <td>${node[2].toFixed(3)}</td>
          </tr>
        `
      )}
    </table>

    <h3>1.2 Element Connectivity</h3>
    <p>
      The structure has <strong>${elementCount}</strong> bar/beam elements
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
      ${elements.val?.map(
        (element, index) => html`
          <tr>
            <td><strong>${index}</strong></td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>
              ${elementInputs.val?.elasticities?.get(index)?.toFixed(2) || "-"}
            </td>
            <td>${elementInputs.val?.areas?.get(index)?.toFixed(4) || "-"}</td>
          </tr>
        `
      )}
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
      ${nodeInputs.val?.supports
        ? [...nodeInputs.val.supports].map(
            ([index, support]) => html`
              <tr>
                <td><strong>${index}</strong></td>
                <td class="${support[0] ? "ok" : ""}">${support[0] ? "Fixed" : "Free"}</td>
                <td class="${support[1] ? "ok" : ""}">${support[1] ? "Fixed" : "Free"}</td>
                <td class="${support[2] ? "ok" : ""}">${support[2] ? "Fixed" : "Free"}</td>
                <td class="${support[3] ? "ok" : ""}">${support[3] ? "Fixed" : "Free"}</td>
                <td class="${support[4] ? "ok" : ""}">${support[4] ? "Fixed" : "Free"}</td>
                <td class="${support[5] ? "ok" : ""}">${support[5] ? "Fixed" : "Free"}</td>
              </tr>
            `
          )
        : html`<tr><td colspan="7">No supports defined</td></tr>`}
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
      ${nodeInputs.val?.loads
        ? [...nodeInputs.val.loads].map(
            ([index, load]) => html`
              <tr>
                <td><strong>${index}</strong></td>
                <td>${load[0].toFixed(2)}</td>
                <td>${load[1].toFixed(2)}</td>
                <td>${load[2].toFixed(2)}</td>
                <td>${load[3].toFixed(2)}</td>
                <td>${load[4].toFixed(2)}</td>
                <td>${load[5].toFixed(2)}</td>
              </tr>
            `
          )
        : html`<tr><td colspan="7">No loads defined</td></tr>`}
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
      ${deformOutputs.val?.deformations
        ? [...deformOutputs.val.deformations].map(
            ([index, def]) => html`
              <tr>
                <td><strong>${index}</strong></td>
                <td>${(def[0] * 1000).toFixed(4)}</td>
                <td>${(def[1] * 1000).toFixed(4)}</td>
                <td>${(def[2] * 1000).toFixed(4)}</td>
                <td>${def[3]?.toFixed(6) || "0.000000"}</td>
                <td>${def[4]?.toFixed(6) || "0.000000"}</td>
                <td>${def[5]?.toFixed(6) || "0.000000"}</td>
              </tr>
            `
          )
        : html`<tr><td colspan="7">No deformation data</td></tr>`}
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
      ${deformOutputs.val?.reactions
        ? [...deformOutputs.val.reactions].map(
            ([index, reaction]) => html`
              <tr>
                <td><strong>${index}</strong></td>
                <td>${reaction[0].toFixed(2)}</td>
                <td>${reaction[1].toFixed(2)}</td>
                <td>${reaction[2].toFixed(2)}</td>
              </tr>
            `
          )
        : html`<tr><td colspan="4">No reaction data</td></tr>`}
    </table>

    <h3>2.3 Element Forces</h3>
    <p>Internal forces in each element:</p>

    <table>
      <tr>
        <th>Element</th>
        <th>Normal Force (kN)</th>
        <th>Status</th>
      </tr>
      ${analyzeOutputs.val?.normals
        ? [...analyzeOutputs.val.normals].map(
            ([index, normal]) => html`
              <tr>
                <td><strong>${index}</strong></td>
                <td>${normal[0].toFixed(2)}</td>
                <td class="${normal[0] < 0 ? "err" : "ok"}">
                  ${normal[0] < 0 ? "Compression" : "Tension"}
                </td>
              </tr>
            `
          )
        : html`<tr><td colspan="3">No force data</td></tr>`}
    </table>

    <hr />

    <!-- Section 3: Conclusions -->
    <h2>3. Summary</h2>
    <div class="section">
      <p>
        <strong>Structure Type:</strong> Bar/Beam Frame<br />
        <strong>Total Nodes:</strong> ${nodeCount}<br />
        <strong>Total Elements:</strong> ${elementCount}<br />
        <strong>Support Conditions:</strong> ${supportCount} fixed nodes<br />
        <strong>Load Cases:</strong> ${loadCount} loaded nodes
      </p>
    </div>

    <hr />

    <p style="text-align: center; color: #666; font-size: 0.9em;">
      Report generated with
      <a href="https://awatif.co" target="_blank">Awatif</a> using Calcpad
      Template<br />
      ${new Date().toLocaleString()}
    </p>
  `;
}
