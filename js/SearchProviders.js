/**
 * Copyright 2016-2021 Sourcepole AG
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import yaml from 'js-yaml';
import axios from 'axios';
import GwUtils from 'qwc2-giswater/utils/GwUtils';
import isEmpty from 'lodash.isempty';
import VectorLayerUtils from 'qwc2/utils/VectorLayerUtils';

function giswaterSearch(text, searchParams, callback, axios) {
    const requestUrl = GwUtils.getServiceUrl("search");
    console.log("searchParams", searchParams);
    if (!isEmpty(requestUrl) && !isEmpty(text)) {
        // TODO: isTiled: True/False
        const filterText = text;
        let filterSearch = '"searchText": { "filterSign":"", "value": "' + filterText + '" }';

        if (searchParams.filterPoly) {
            const polygon = `POLYGON((${searchParams.filterPoly.map(c => c.join(" ")).join(",")}))`;
            filterSearch += `, "searchPoly": "${polygon}"`;
        }

        const params = {
            theme: searchParams.theme.title,
            filterFields: filterSearch
        };
        axios.get(requestUrl + "getsearch", { params: params }).then(response => {
            const result = response.data;
            const output = [];
            result.data.forEach((group) => {
                const items = [];
                //Don't include tab address
                if (group.section === "basic_search_v2_tab_address"){
                    return;
                }
                group.values?.forEach((entry) => {
                    items.push({
                        id: entry.value,
                        // shorten display_name
                        text: entry.display_name,
                        provider: "giswater",
                        props: {
                            ...entry,
                            execFunc: group.execFunc,
                            section: group.section,
                            tableName: group.tableName,
                            crs: searchParams.mapcrs,
                            theme: searchParams.theme.title
                        }
                    });
                });
                if (items.length > 0) {
                    output.push({
                        id: `giswater-${group.section}`,
                        title: group.alias,
                        items: items
                    });
                }
            });
            console.log("output", output);
            callback({results: output});
        }).catch((e) => {
            console.error(e);
        });
    }
}

function giswaterGetGeometry(result, callback, customAxios) {
    const requestUrl = GwUtils.getServiceUrl("search");
    const axiosInstance = customAxios || axios;

    if (!axiosInstance) {
        console.error("Error: axios not defined in giswaterGetGeometry.");
        return;
    }
    if (!isEmpty(requestUrl)) {
        const props = result.props;
        const extras = `"value": "${props.display_name}", "section": "${props.section}", "filterKey": "${props.key}", "filterValue": "${props.value}", "execFunc": "${props.execFunc}", "tableName": "${props.tableName}", "searchAdd": "${props.searchAdd}"`;
        const params = {
            theme: props.theme,
            extras: extras
        };
        axiosInstance.get(requestUrl + "setsearch", { params: params }).then(response => {
            const result = response.data;

            if (!result.data.geometry || !result.data.geometry.st_astext) {
                console.error("Error: invalid geometry:", result.data.geometry);
                return;
            }

            const geoJsonFeature = VectorLayerUtils.wktToGeoJSON(
                result.data.geometry.st_astext,
                props.crs,
                props.crs
            );

            if (!geoJsonFeature) {
                console.error("Error converting geometry to GeoJSON.");
                return;
            }

            const center = VectorLayerUtils.getFeatureCenter(geoJsonFeature);
            const bbox = VectorLayerUtils.computeFeatureBBox(geoJsonFeature);



            callback({
                geometry: result.data.geometry.st_astext,
                crs: props.crs,
                center: center,
                bbox: bbox
            });

            console.log("Callback::: ", callback);
        }).catch((e) => {
            console.error("Error calling setsearch: ", e);
        });

    }
}

/** ************************************************************************ **/

function customSearch(text, searchParams, callback, axios) {
    console.log("CUSTOM SEARCH::::::::::::")
    const requestUrl = GwUtils.getServiceUrl("customSearch");

    const tables = searchParams.cfgParams.tables;
    const params = {
        theme: searchParams.theme.title,
        searchtables: tables.join(','),
        query: text
    };
    axios.get(requestUrl + "search", { params: params }).then(response => {
        let currentgroup = null;
        let groupcounter = 0;
        let counter = 0;
        const results = [];
        const providerId = "custom";
        (response.data.results || []).forEach(entry => {
            if (!entry.bbox) {
                // Is group
                currentgroup = {
                    id: providerId + "_group" + (groupcounter++),
                    title: entry.displaytext,
                    items: []
                };
                results.push(currentgroup);
            } else if (currentgroup) {
                currentgroup.items.push({
                    id: providerId + "_result" + (counter++),
                    text: entry.displaytext,
                    bbox: entry.bbox.slice(0),
                    x: 0.5 * (entry.bbox[0] + entry.bbox[2]),
                    y: 0.5 * (entry.bbox[1] + entry.bbox[3]),
                    props: {
                        crs: searchParams.mapcrs,
                        theme: searchParams.theme.title,
                        searchtable: entry.searchtable
                    },
                    provider: providerId
                });
            }
        });
        callback({results: results});
    });
}

function customSearchGeom(resultItem, callback, customAxios) {
    const axiosInstance = customAxios || axios;
    console.log("axios:", axiosInstance);

    if (!axiosInstance) {
        console.error("Error: axios not defined in customSearchGeom.");
        return;
    }
    const requestUrl = GwUtils.getServiceUrl("customSearch");

    const params = {
        theme: resultItem.props.theme,
        searchtable: resultItem.props.searchtable,
        displaytext: resultItem.text
    };
    axiosInstance.get(requestUrl + "searchGeom", { params: params }).then(response => {
        callback({ geometry: response.data, crs: resultItem.crs });
    });
}

/** ************************************************************************ **/

window.QWC2SearchProviders = {
    giswater: {
        label: "Giswater",
        handlesGeomFilter: true,
        onSearch: giswaterSearch,
        getResultGeometry: giswaterGetGeometry
    },
    custom: {
        label: "Custom",
        onSearch: customSearch,
        getResultGeometry: customSearchGeom
    }
};

console.log("SearchProviders loaded:", window.QWC2SearchProviders);
