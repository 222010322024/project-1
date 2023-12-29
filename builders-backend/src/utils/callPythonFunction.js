const { spawn } = require('child_process');
const path = require('path');
const config = require('../config');

module.exports = {
  callPythonFunctionImageClassification: (imagePath) => {
    return new Promise((resolve, reject) => {
      const modelPath = path.join(__dirname, '../', 'programs', 'model02.h5');

      const childProcess = spawn('python', [
        path.join(__dirname, '../', 'programs', 'image_classification.py'),
        modelPath,
        imagePath,
      ]);

      let output = '';

      childProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        reject(data.toString());
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Command prompt process exited with code ${code}`);
        }
      });
    });
  },
  callPythonFunctionOCRClassification: (imagePath) => {
    return new Promise((resolve, reject) => {
      const childProcess = spawn('python', [
        path.join(__dirname, '../', 'programs', 'ocr_classification.py'),
        imagePath,
      ]);

      let output = '';

      childProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        reject(data.toString());
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Command prompt process exited with code ${code}`);
        }
      });
    });
  },
  callPythonFunctionLocationClassification: (imagePath) => {
    return new Promise((resolve, reject) => {
      const childProcess = spawn('python', [
        path.join(__dirname, '../', 'programs', 'location_classification.py'),
        imagePath,
      ]);

      let output = '';

      childProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        reject(data.toString());
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Command prompt process exited with code ${code}`);
        }
      });
    });
  },

  callPythonFunctionLocationService: (imagePath) => {
    return new Promise((resolve, reject) => {
      const childProcess = spawn('python', [
        path.join(__dirname, '../', 'programs', 'location_service.py'),
        imagePath,
        config.FOURSQUARE_API_KEY,
      ]);

      let output = '';

      childProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        reject(data.toString());
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Command prompt process exited with code ${code}`);
        }
      });
    });
  },
};
