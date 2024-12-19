// Preprocess data (one-hot encoding, normalization, etc.)
function oneHotEncode(data, key) {
    const uniqueValues = [...new Set(data.map((item) => item[key]))];
    data.forEach((item) => {
        uniqueValues.forEach((value) => {
            item[`${key}_${value}`] = item[key] === value ? 1 : 0;
        });
    });
}

function standardize(features) {
    const means = {};
    const stdDevs = {};

    Object.keys(features[0]).forEach((key) => {
        const values = features.map((f) => f[key]);
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);

        means[key] = mean;
        stdDevs[key] = stdDev;
    });

    return features.map((feature) => {
        const standardized = {};
        Object.keys(feature).forEach((key) => {
            standardized[key] = (feature[key] - means[key]) / (stdDevs[key] || 1);
        });
        return standardized;
    });
}

module.exports = { oneHotEncode, standardize };
