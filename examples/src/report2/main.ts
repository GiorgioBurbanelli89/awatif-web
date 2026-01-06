import {
  Node,
  Element,
  AnalyzeOutputs,
  DeformOutputs,
  ElementInputs,
  NodeInputs,
} from "awatif-fem";
import { deform, analyze } from "awatif-fem";
import van from "vanjs-core";
import { State } from "vanjs-core/debug";
import {
  getDialog,
  getReport2,
  getToolbar,
  Parameters,
  getParameters,
  getViewer,
} from "awatif-ui";
import { template } from "./template";

// Init
const parameters: Parameters = {
  span: {
    value: van.state(10),
    min: 5,
    max: 20,
    step: 1,
    label: "Span (m)",
  },
  height: {
    value: van.state(5),
    min: 2,
    max: 10,
    step: 0.5,
    label: "Height (m)",
  },
  load: {
    value: van.state(100),
    min: 10,
    max: 500,
    step: 10,
    label: "Load (kN)",
  },
  elasticity: {
    value: van.state(200),
    min: 100,
    max: 500,
    step: 10,
    label: "E (GPa)",
  },
  area: {
    value: van.state(50),
    min: 10,
    max: 200,
    step: 5,
    label: "Area (cm²)",
  },
};

const nodes: State<Node[]> = van.state([]);
const elements: State<Element[]> = van.state([]);
const nodeInputs: State<NodeInputs> = van.state({});
const elementInputs: State<ElementInputs> = van.state({});
const deformOutputs: State<DeformOutputs> = van.state({});
const analyzeOutputs: State<AnalyzeOutputs> = van.state({});

const structure = {
  nodes,
  elements,
  nodeInputs,
  elementInputs,
  deformOutputs,
  analyzeOutputs,
};

// Events: on parameter change
van.derive(() => {
  const span = parameters.span.value.val;
  const height = parameters.height.value.val;
  const load = parameters.load.value.val;
  const E = parameters.elasticity.value.val;
  const A = parameters.area.value.val * 1e-4; // cm² to m²

  // Portal frame geometry
  nodes.val = [
    [0, 0, 0], // Node 0: Left base
    [0, 0, height], // Node 1: Left top
    [span / 2, 0, height + 1], // Node 2: Ridge
    [span, 0, height], // Node 3: Right top
    [span, 0, 0], // Node 4: Right base
  ];

  elements.val = [
    [0, 1], // Left column
    [1, 2], // Left rafter
    [2, 3], // Right rafter
    [3, 4], // Right column
  ];

  nodeInputs.val = {
    supports: new Map([
      [0, [true, true, true, true, true, true]], // Fixed
      [4, [true, true, true, true, true, true]], // Fixed
    ]),
    loads: new Map([
      [1, [0, 0, -load / 2, 0, 0, 0]], // Left top load
      [2, [0, 0, -load, 0, 0, 0]], // Ridge load
      [3, [0, 0, -load / 2, 0, 0, 0]], // Right top load
    ]),
  };

  elementInputs.val = {
    elasticities: new Map(elements.val.map((_, i) => [i, E])),
    areas: new Map(elements.val.map((_, i) => [i, A])),
    shearModuli: new Map(elements.val.map((_, i) => [i, E * 0.4])),
    torsionalConstants: new Map(elements.val.map((_, i) => [i, A * 0.1])),
    momentsOfInertiaY: new Map(elements.val.map((_, i) => [i, A * 0.01])),
    momentsOfInertiaZ: new Map(elements.val.map((_, i) => [i, A * 0.01])),
  };

  deformOutputs.val = deform(
    nodes.val,
    elements.val,
    nodeInputs.val,
    elementInputs.val
  );

  analyzeOutputs.val = analyze(
    nodes.val,
    elements.val,
    elementInputs.val,
    deformOutputs.val
  );
});

// Report with Calcpad template
const clickedButton = van.state("");
const dialogBody = van.state(undefined);

van.derive(() => {
  if (clickedButton.val === "Report") {
    dialogBody.val = getReport2({
      template,
      data: structure,
      title: "Portal Frame Analysis",
      showPrintButton: true,
      showHtmlButton: true,
    });
  }
});

document.body.append(
  getToolbar({
    clickedButton,
    buttons: ["Report"],
    sourceCode:
      "https://github.com/GiorgioBurbanelli89/awatif-ejemplos/blob/main/examples/src/report2/main.ts",
    author: "https://github.com/GiorgioBurbanelli89",
  }),
  getDialog({ dialogBody }),
  getParameters(parameters),
  getViewer({
    mesh: structure,
    settingsObj: {
      gridSize: 1000,
      deformedShape: true,
    },
  })
);
