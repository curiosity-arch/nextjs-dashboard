const kmeans = require('ml-kmeans');

function clusterData(features, numClusters = 6) {
    const result = kmeans(features, numClusters);
    return result.clusters;
}

module.exports = clusterData;