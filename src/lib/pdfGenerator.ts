import html2pdf from 'html2pdf.js';

/**
 * Generate PDF from HTML element
 * @param element - HTML element to convert to PDF
 * @param filename - Name of the PDF file
 * @param options - html2pdf options
 */
export async function generatePDF(
  element: HTMLElement,
  filename: string = 'document.pdf',
  options?: any
): Promise<void> {
  const defaultOptions = {
    margin: [10, 20, 10, 20], // [top, right, bottom, left] in mm
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    await html2pdf().set(finalOptions).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

/**
 * Generate PDF and return as blob
 * @param element - HTML element to convert to PDF
 * @param options - html2pdf options
 */
export async function generatePDFBlob(
  element: HTMLElement,
  options?: any
): Promise<Blob> {
  const defaultOptions = {
    margin: [10, 20, 10, 20],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const pdf = await html2pdf().set(finalOptions).from(element).output('blob');
    return pdf;
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw new Error('Failed to generate PDF blob');
  }
}

/**
 * Print PDF directly
 * @param element - HTML element to convert to PDF
 * @param options - html2pdf options
 */
export async function printPDF(
  element: HTMLElement,
  options?: any
): Promise<void> {
  const defaultOptions = {
    margin: [10, 20, 10, 20],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const pdf = await html2pdf().set(finalOptions).from(element).toPdf().get('pdf');
    pdf.autoPrint();
    window.open(pdf.output('bloburl'), '_blank');
  } catch (error) {
    console.error('Error printing PDF:', error);
    throw new Error('Failed to print PDF');
  }
}
