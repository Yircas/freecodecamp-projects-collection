import Papa from 'papaparse';


/**
 * Function to read and parse CSV data
 * @param {filePath} filePath path to the .csv-file
 * @returns {Array} array with data-dictionaries
 */
async function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        fetch(filePath)
        // Error-handling
        .then((response) => {
            if (!response.ok) {
            throw new Error(`Failed to load file: ${response.statusText}`);
            }
            return response.text();
        })
        // Parses and converts the file
        .then((csvText) => {
            const results = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            });
            resolve(results.data);
        })
        .catch((error) => reject(error));
    });
}

export default readCSV