// Extract PDF pages as high-res PNGs
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Try using pdf-poppler or fall back to pdf2pic
async function main() {
  const pdfPath = path.resolve("C:/Users/jarvi/Downloads/FRISSON(version 2.0) (1).pdf");
  const outDir = path.resolve("public/brand");

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Use pdf-lib to extract pages, then sharp to render
  const { PDFDocument } = require("pdf-lib");

  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  console.log(`PDF has ${pdfDoc.getPageCount()} pages`);

  // We need pages:
  // Page 1: Full logo (FRISSON + ornament + WARSAW) - black on white
  // Page 2: Ornament only - black on white
  // Page 3/4: White versions (ornament on transparent/dark)
  // Page 5: Logotype only "FRISSON" - black on white
  // Page 6: White logotype
  // Page 7: Full logo FRISSON WARSAW - black on white
  // Page 8: White full logo

  // Extract individual pages as separate PDFs for conversion
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const newDoc = await PDFDocument.create();
    const [page] = await newDoc.copyPages(pdfDoc, [i]);
    newDoc.addPage(page);
    const bytes = await newDoc.save();
    const outPath = path.join(outDir, `page-${i + 1}.pdf`);
    fs.writeFileSync(outPath, bytes);
    console.log(`Saved page ${i + 1} as ${outPath}`);
  }

  console.log("\nPDF pages extracted. Now converting to PNG...");

  // Try using canvas to render or just use the PDFs directly
  // For now, let's use the SVG approach instead
}

main().catch(console.error);
