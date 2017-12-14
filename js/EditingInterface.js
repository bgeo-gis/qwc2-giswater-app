/**
 * Copyright 2017, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function getFeature(layerId, mapPos, mapCrs, callback) {
    console.log("Pick " + layerId + " at (" + mapPos.x + ", " + mapPos.y + "): " + mapCrs);
    let feature = null;
    setTimeout(() => callback(feature), 500);
}

function addFeature(layerId, feature, mapCrs, callback) {
    console.log("Add to layer " + layerId + ":");
    console.log(feature);
    let success = false;
    setTimeout(() => callback(success), 500);
}

function editFeature(layerId, feature, mapCrs, callback) {
    console.log("Commit to layer " + layerId + ":");
    console.log(feature);
    let success = false;
    setTimeout(() => callback(success), 500);
}

function deleteFeature(layerId, featureId, callback) {
    console.log("Delete feature from layer " + layerId + ":" + featureId);
    let success = false;
    setTimeout(() => callback(success), 500);
}

module.exports = {
    getFeature,
    addFeature,
    editFeature,
    deleteFeature
}
