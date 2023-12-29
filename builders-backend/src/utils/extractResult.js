function extractResult(text) {
  const vehicleRegex = /Vehicles/i;
  const cardRegex = /Card/i;
  const signRegex = /Sign/i;
  const constructionSiteRegex = /ConstructionSite/i;

  if (vehicleRegex.test(text)) {
    return 'Vehicles';
  } else if (cardRegex.test(text)) {
    return 'Card';
  } else if (signRegex.test(text)) {
    return 'Sign';
  } else if (constructionSiteRegex.test(text)) {
    return 'Construction Site';
  } else {
    return 'Unknown';
  }
}

function extractTextFromOCRResult(ocrResultString) {
  const header = 'OCR Result:';
  const index = ocrResultString.indexOf(header);

  if (index !== -1) {
    // Extract text after "OCR Result:"
    const extractedText = ocrResultString
      .substring(index + header.length)
      .trim();
    return extractedText;
  } else {
    console.error("Header 'OCR Result:' not found in the provided string.");
    return null;
  }
}

module.exports = {
  extractResult,
  extractTextFromOCRResult,
};
