import van from "vanjs-core";
import { render, TemplateResult } from "lit-html";
import "./calcpad-template.css";

export interface Report2Options {
  template: (data: any) => TemplateResult;
  data: any;
  title?: string;
  showPrintButton?: boolean;
  showHtmlButton?: boolean;
}

/**
 * getReport2 - Calcpad-style report generator for Awatif
 *
 * Creates professional engineering calculation reports with:
 * - Calcpad-style typography and formatting
 * - Print-ready layout (A4)
 * - Export to HTML functionality
 * - Professional header with date
 */
export function getReport2({
  template,
  data,
  title = "Structural Analysis Report",
  showPrintButton = true,
  showHtmlButton = true,
}: Report2Options): HTMLElement {
  // Init
  const container = document.createElement("div");
  container.className = "calcpad-report";

  // Create toolbar
  const toolbar = document.createElement("div");
  toolbar.className = "no-print";
  toolbar.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
  `;

  if (showPrintButton) {
    const printBtn = document.createElement("button");
    printBtn.textContent = "Print Report";
    printBtn.style.cssText = `
      padding: 8px 16px;
      background: #2e5368;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `;
    printBtn.onclick = () => window.print();
    toolbar.appendChild(printBtn);
  }

  if (showHtmlButton) {
    const htmlBtn = document.createElement("button");
    htmlBtn.textContent = "Export HTML";
    htmlBtn.style.cssText = `
      padding: 8px 16px;
      background: #4a7c94;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `;
    htmlBtn.onclick = () => exportToHtml(container, title);
    toolbar.appendChild(htmlBtn);
  }

  container.appendChild(toolbar);

  // Create content area
  const content = document.createElement("div");
  content.className = "report-content";
  container.appendChild(content);

  // Events: On data change render the template
  van.derive(() => {
    render(template(data), content);
  });

  return container;
}

/**
 * Export the report to a standalone HTML file
 */
function exportToHtml(container: HTMLElement, title: string): void {
  const css = getCalcpadCss();
  const content = container.querySelector(".report-content")?.innerHTML || "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Created with Awatif + Calcpad Template</title>
    <style>
${css}
    </style>
</head>
<body>
    <div class="calcpad-report">
${content}
    </div>
</body>
</html>`;

  // Create download link
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}_Report.html`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Get the Calcpad CSS as a string for embedding
 */
function getCalcpadCss(): string {
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

export default getReport2;
