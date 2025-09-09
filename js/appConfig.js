/**
 * Copyright 2016-2021 Sourcepole AG
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {lazy} from 'react';

import AppMenu from 'qwc2/components/AppMenu';
import FullscreenSwitcher from 'qwc2/components/FullscreenSwitcher';
import SearchBox from 'qwc2/components/SearchBox';
import Toolbar from 'qwc2/components/Toolbar';
import APIPlugin from 'qwc2/plugins/API';
import AttributeTablePlugin from 'qwc2/plugins/AttributeTable';
import AuthenticationPlugin from 'qwc2/plugins/Authentication';
import BackgroundSwitcherPlugin from 'qwc2/plugins/BackgroundSwitcher';
import BookmarkPlugin from 'qwc2/plugins/Bookmark';
import BottomBarPlugin from 'qwc2/plugins/BottomBar';
import CookiePopupPlugin from 'qwc2/plugins/CookiePopup';
import CyclomediaPlugin from 'qwc2/plugins/Cyclomedia';
import EditingPlugin from 'qwc2/plugins/Editing';
import FeatureFormPlugin from 'qwc2/plugins/FeatureForm';
import FeatureSearchPlugin from 'qwc2/plugins/FeatureSearch';
import GeometryDigitizerPlugin from 'qwc2/plugins/GeometryDigitizer';
import HeightProfilePlugin from 'qwc2/plugins/HeightProfile';
import HelpPlugin from 'qwc2/plugins/Help';
import HomeButtonPlugin from 'qwc2/plugins/HomeButton';
import IdentifyPlugin from 'qwc2/plugins/Identify';
import LayerCatalogPlugin from 'qwc2/plugins/LayerCatalog';
import LayerTreePlugin from 'qwc2/plugins/LayerTree';
import LocateButtonPlugin from 'qwc2/plugins/LocateButton';
import MapPlugin from 'qwc2/plugins/Map';
import MapComparePlugin from 'qwc2/plugins/MapCompare';
import MapCopyrightPlugin from 'qwc2/plugins/MapCopyright';
import MapExportPlugin from 'qwc2/plugins/MapExport';
import MapFilterPlugin from 'qwc2/plugins/MapFilter';
import MapInfoTooltipPlugin from 'qwc2/plugins/MapInfoTooltip';
import MapLegendPlugin from 'qwc2/plugins/MapLegend';
import MapTipPlugin from 'qwc2/plugins/MapTip';
import MeasurePlugin from 'qwc2/plugins/Measure';
import NewsPopupPlugin from 'qwc2/plugins/NewsPopup';
import OverviewMapPlugin from 'qwc2/plugins/OverviewMap';
import PanoramaxPlugin from 'qwc2/plugins/Panoramax';
import PortalPlugin from 'qwc2/plugins/Portal';
import PrintPlugin from 'qwc2/plugins/Print';
import RedliningPlugin from 'qwc2/plugins/Redlining';
import ReportsPlugin from 'qwc2/plugins/Reports';
import RoutingPlugin from 'qwc2/plugins/Routing';
import ScratchDrawingPlugin from 'qwc2/plugins/ScratchDrawing';
import SettingsPlugin from 'qwc2/plugins/Settings';
import SharePlugin from 'qwc2/plugins/Share';
import StartupMarkerPlugin from 'qwc2/plugins/StartupMarker';
import TaskButtonPlugin from 'qwc2/plugins/TaskButton';
import ThemeSwitcherPlugin from 'qwc2/plugins/ThemeSwitcher';
import TimeManagerPlugin from 'qwc2/plugins/TimeManager';
import TopBarPlugin from 'qwc2/plugins/TopBar';
import TourGuidePlugin from 'qwc2/plugins/TourGuide';
import ValueToolPlugin from 'qwc2/plugins/ValueTool';
import View3DPlugin from 'qwc2/plugins/View3D';
import {ZoomInPlugin, ZoomOutPlugin} from 'qwc2/plugins/ZoomButtons';
import EditingSupport from 'qwc2/plugins/map/EditingSupport';
import LocateSupport from 'qwc2/plugins/map/LocateSupport';
import MeasurementSupport from 'qwc2/plugins/map/MeasurementSupport';
import RedliningSupport from 'qwc2/plugins/map/RedliningSupport';
import SnappingSupport from 'qwc2/plugins/map/SnappingSupport';
import BufferSupport from 'qwc2/plugins/redlining/RedliningBufferSupport';
import defaultLocaleData from 'qwc2/static/translations/en-US.json';

import './SearchProviders.js';

/* Giswater plugins */
import GwInfoPlugin from 'qwc2-giswater/plugins/basic/GwInfo';
import GwSelectorPlugin from 'qwc2-giswater/plugins/basic/GwSelector';

import GwDscenarioPlugin from 'qwc2-giswater/plugins/epa/GwDscenario';
import GwDscenarioManagerPlugin from 'qwc2-giswater/plugins/epa/GwDscenarioManager';
import GwEpaManagerPlugin from 'qwc2-giswater/plugins/epa/GwEpaManager';
import GwEpaSelectorPlugin from 'qwc2-giswater/plugins/epa/GwEpaSelector';
import GwNonVisualObjectPlugin from 'qwc2-giswater/plugins/epa/GwNonVisualObject';
import GwNonVisualObjectsManagerPlugin from 'qwc2-giswater/plugins/epa/GwNonVisualObjectsManager';

import GwDateSelectorPlugin from 'qwc2-giswater/plugins/om/GwDateSelector';
import GwFlowtracePlugin from 'qwc2-giswater/plugins/om/GwFlowtrace';
import GwMincutPlugin from 'qwc2-giswater/plugins/om/GwMincut';
import GwProfilePickerPlugin from 'qwc2-giswater/plugins/om/GwProfilePicker';
import GwMincutManagerPlugin from 'qwc2-giswater/plugins/om/GwMincutManager';
import GwVisitPlugin from 'qwc2-giswater/plugins/om/GwVisit';
import GwVisitManagerPlugin from 'qwc2-giswater/plugins/om/GwVisitManager';

import GwPsectorManagerPlugin from 'qwc2-giswater/plugins/plan/GwPsectorManager';
import GwPsectorPlugin from 'qwc2-giswater/plugins/plan/GwPsector';

import GwToolboxPlugin from 'qwc2-giswater/plugins/utilities/GwToolbox';
import GwWorkspaceManagerPlugin from 'qwc2-giswater/plugins/utilities/GwWorkspaceManager';
import GwWorkspaceObjectPlugin from 'qwc2-giswater/plugins/utilities/GwWorkspaceObject';

import GwInfoValve from 'qwc2-giswater/plugins/tooltip_plugins/GwInfoValve';
import StreetViewButton from 'qwc2-giswater/plugins/tooltip_plugins/StreetViewButton';

import GwClearTempLayersPlugin from 'qwc2-giswater/plugins/GwClearTempLayers';
// import GwZoomPlugin from 'qwc2-giswater/plugins/utilities/GwZoom';
import GwHelpPlugin from 'qwc2-giswater/plugins/GwHelp';
import GwLoadPluginPlugin from 'qwc2-giswater/plugins/GwLoadPlugin';
import GwParcelFilterPlugin from 'qwc2-giswater/plugins/GwParcelFilter';
import GwProfileGraphV2Plugin from 'qwc2-giswater/plugins/GwProfileGraphV2';
import GwSupersetPlugin from 'qwc2-giswater/plugins/GwSuperset';
import MapWatermarkPlugin from 'qwc2-giswater/plugins/MapWatermark';
import NetCDFExplorerPlugin from 'qwc2-giswater/plugins/NetCDFExplorer';
import DrAnimationPlugin from 'qwc2-giswater/plugins/utilities/DrAnimation';


export default {
    defaultLocaleData: defaultLocaleData,
    initialState: {
        defaultState: {},
        mobile: {}
    },
    pluginsDef: {
        plugins: {
            MapPlugin: MapPlugin({
                EditingSupport: EditingSupport,
                MeasurementSupport: MeasurementSupport,
                LocateSupport: LocateSupport,
                RedliningSupport: RedliningSupport,
                SnappingSupport: SnappingSupport,
                GwProfilePickerPlugin: GwProfilePickerPlugin
            }),
            APIPlugin: APIPlugin,
            AttributeTablePlugin: AttributeTablePlugin(/* CustomEditingInterface */),
            AuthenticationPlugin: AuthenticationPlugin,
            BackgroundSwitcherPlugin: BackgroundSwitcherPlugin,
            BookmarkPlugin: BookmarkPlugin,
            BottomBarPlugin: BottomBarPlugin,
            CookiePopupPlugin: CookiePopupPlugin,
            CyclomediaPlugin: CyclomediaPlugin,
            EditingPlugin: EditingPlugin(/* CustomEditingInterface */),
            FeatureFormPlugin: FeatureFormPlugin(/* CustomEditingInterface */),
            GeometryDigitizerPlugin: GeometryDigitizerPlugin,
            HeightProfilePlugin: HeightProfilePlugin,
            HelpPlugin: HelpPlugin(),
            HomeButtonPlugin: HomeButtonPlugin,
            IdentifyPlugin: IdentifyPlugin,
            LayerCatalogPlugin: LayerCatalogPlugin,
            LayerTreePlugin: LayerTreePlugin,
            LocateButtonPlugin: LocateButtonPlugin,
            MapComparePlugin: MapComparePlugin,
            MapCopyrightPlugin: MapCopyrightPlugin,
            MapExportPlugin: MapExportPlugin,
            MapFilterPlugin: MapFilterPlugin,
            MapInfoTooltipPlugin: MapInfoTooltipPlugin([
                GwInfoValve,
                StreetViewButton
            ]),
            MapLegendPlugin: MapLegendPlugin,
            MapTipPlugin: MapTipPlugin,
            MeasurePlugin: MeasurePlugin,
            NewsPopupPlugin: NewsPopupPlugin,
            OverviewMapPlugin: OverviewMapPlugin,
            PanoramaxPlugin: PanoramaxPlugin,
            PortalPlugin: PortalPlugin,
            PrintPlugin: PrintPlugin,
            RedliningPlugin: RedliningPlugin({
                BufferSupport: BufferSupport
            }),
            ReportsPlugin: ReportsPlugin,
            RoutingPlugin: RoutingPlugin,
            FeatureSearchPlugin: FeatureSearchPlugin,
            ScratchDrawingPlugin: ScratchDrawingPlugin,
            SettingsPlugin: SettingsPlugin,
            SharePlugin: SharePlugin,
            StartupMarkerPlugin: StartupMarkerPlugin,
            TaskButtonPlugin: TaskButtonPlugin,
            ThemeSwitcherPlugin: ThemeSwitcherPlugin,
            TimeManagerPlugin: TimeManagerPlugin,
            TopBarPlugin: TopBarPlugin({
                AppMenu: AppMenu,
                Search: SearchBox,
                Toolbar: Toolbar,
                FullscreenSwitcher: FullscreenSwitcher
            }),
            TourGuidePlugin: TourGuidePlugin,
            ValueToolPlugin: ValueToolPlugin,
            View3DPlugin: View3DPlugin({
                BackgroundSwitcher3D: lazy(() => import('qwc2/plugins/map3d/BackgroundSwitcher3D')),
                BottomBar3D: lazy(() => import('qwc2/plugins/map3d/BottomBar3D')),
                Compare3D: lazy(() => import('qwc2/plugins/map3d/Compare3D')),
                Draw3D: lazy(() => import('qwc2/plugins/map3d/Draw3D')),
                ExportObjects3D: lazy(() => import('qwc2/plugins/map3d/ExportObjects3D')),
                HideObjects3D: lazy(() => import('qwc2/plugins/map3d/HideObjects3D')),
                Identify3D: lazy(() => import('qwc2/plugins/map3d/Identify3D')),
                LayerTree3D: lazy(() => import('qwc2/plugins/map3d/LayerTree3D')),
                MapCopyright3D: lazy(() => import('qwc2/plugins/map3d/MapCopyright3D')),
                MapExport3D: lazy(() => import('qwc2/plugins/map3d/MapExport3D')),
                MapLight3D: lazy(() => import('qwc2/plugins/map3d/MapLight3D')),
                Measure3D: lazy(() => import('qwc2/plugins/map3d/Measure3D')),
                OverviewMap3D: lazy(() => import('qwc2/plugins/map3d/OverviewMap3D')),
                Settings3D: lazy(() => import('qwc2/plugins/map3d/Settings3D')),
                TopBar3D: lazy(() => import('qwc2/plugins/map3d/TopBar3D'))
            }),
            ZoomInPlugin: ZoomInPlugin,
            ZoomOutPlugin: ZoomOutPlugin,
            GwInfoPlugin: GwInfoPlugin,
            GwSelectorPlugin: GwSelectorPlugin,
            GwDscenarioPlugin: GwDscenarioPlugin,
            GwDscenarioManagerPlugin: GwDscenarioManagerPlugin,
            GwEpaManagerPlugin: GwEpaManagerPlugin,
            GwEpaSelectorPlugin: GwEpaSelectorPlugin,
            GwNonVisualObjectPlugin: GwNonVisualObjectPlugin,
            GwNonVisualObjectsManagerPlugin: GwNonVisualObjectsManagerPlugin,
            GwDateSelectorPlugin: GwDateSelectorPlugin,
            GwFlowtracePlugin: GwFlowtracePlugin,
            GwMincutPlugin: GwMincutPlugin,
            GwMincutManagerPlugin: GwMincutManagerPlugin,
            // GwProfilePickerPlugin: GwProfilePickerPlugin,
            GwVisitPlugin: GwVisitPlugin,
            GwVisitManagerPlugin: GwVisitManagerPlugin,
            GwPsectorManagerPlugin: GwPsectorManagerPlugin,
            GwPsectorPlugin: GwPsectorPlugin,
            GwToolboxPlugin: GwToolboxPlugin,
            GwWorkspaceManagerPlugin: GwWorkspaceManagerPlugin,
            GwWorkspaceObjectPlugin: GwWorkspaceObjectPlugin,
            GwClearTempLayersPlugin: GwClearTempLayersPlugin,
            // GwZoomPlugin: GwZoomPlugin,
            GwHelpPlugin: GwHelpPlugin,
            GwLoadPluginPlugin: GwLoadPluginPlugin,
            GwParcelFilterPlugin: GwParcelFilterPlugin,
            GwProfileGraphV2Plugin: GwProfileGraphV2Plugin,
            GwSupersetPlugin: GwSupersetPlugin,
            MapWatermarkPlugin: MapWatermarkPlugin,
            NetCDFExplorerPlugin: NetCDFExplorerPlugin,
            DrAnimationPlugin: DrAnimationPlugin
        },
        cfg: {
        }
    },
    actionLogger: (action) => {
        /* Do something with action, i.e. Piwik/Mamoto event tracking */
    }
    /*
    themeLayerRestorer: (missingLayers, theme, callback) => {
        // Invoked for layers specified in the l url parameter which are missing in the specified theme
        // Could be used to query a search provider for the missing theme layers

        // A list of theme layers to merge into the theme
        const newLayers = [];

        // A dictionary mapping the name of the searched layer name with the resulting layer name(s) as an array, i.e.
        // {searchlayername: ["resultlayername1", "resultlayername2"], ...}
        const newLayerNames = {};

        callback(newLayers, newLayerNames);
    }*/
    /* externalLayerRestorer: (externalLayers, themes, callback) => {
        // Optional function to handle restoring of external layers from the l URL parameter
        // If omitted, the default handler is used which downloads capabilities for each service to restore the layer
    }*/
};