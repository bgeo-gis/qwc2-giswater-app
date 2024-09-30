/**
 * Copyright 2016-2021 Sourcepole AG
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
import DxfExportPlugin from 'qwc2/plugins/DxfExport';
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
import LoginUserPlugin from 'qwc2/plugins/LoginUser';
import Map3DPlugin from 'qwc2/plugins/Map3D';
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
import PortalPlugin from 'qwc2/plugins/Portal';
import PrintPlugin from 'qwc2/plugins/Print';
import ProcessNotificationsPlugin from 'qwc2/plugins/ProcessNotifications';
import RasterExportPlugin from 'qwc2/plugins/RasterExport';
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
import {ZoomInPlugin, ZoomOutPlugin} from 'qwc2/plugins/ZoomButtons';
import EditingSupport from 'qwc2/plugins/map/EditingSupport';
import LocateSupport from 'qwc2/plugins/map/LocateSupport';
import MeasurementSupport from 'qwc2/plugins/map/MeasurementSupport';
import OverviewSupport from 'qwc2/plugins/map/OverviewSupport';
import RedliningSupport from 'qwc2/plugins/map/RedliningSupport';
import ScaleBarSupport from 'qwc2/plugins/map/ScaleBarSupport';
import SnappingSupport from 'qwc2/plugins/map/SnappingSupport';
import BufferSupport from 'qwc2/plugins/redlining/RedliningBufferSupport';

import defaultLocaleData from '../static/translations/en-US.json';
import {renderHelp} from './Help';
import {customAttributeCalculator, attributeTransform, customExporters} from './IdentifyExtensions';
import {SearchProviders} from './SearchProviders';

// Giswater
import GwInfoPlugin from 'qwc2-giswater/plugins/GwInfo';
import GwDateSelectorPlugin from 'qwc2-giswater/plugins/GwDateSelector';
import GwSelectorPlugin from 'qwc2-giswater/plugins/GwSelector';
import GwProfilePickerPlugin from 'qwc2-giswater/plugins/GwProfilePicker';
import GwFlowtracePlugin from 'qwc2-giswater/plugins/GwFlowtrace';
import GwProfileGraphPlugin from 'qwc2-giswater/plugins/GwProfileGraph';
import GwMincutPlugin from 'qwc2-giswater/plugins/GwMincut';
import GwMincutManagerPlugin from 'qwc2-giswater/plugins/GwMincutManager';
import GwVisitPlugin from 'qwc2-giswater/plugins/GwVisit';
import GwVisitManagerPlugin from 'qwc2-giswater/plugins/GwVisitManager';
import GwToolboxPlugin from 'qwc2-giswater/plugins/GwToolbox';
// import GwSearchBox from 'qwc2-giswater/components/GwSearchBox';
import GwClearTempLayersPlugin from 'qwc2-giswater/plugins/GwClearTempLayers';
import MapWatermarkPlugin from 'qwc2-giswater/plugins/MapWatermark';
import NetCDFExplorerPlugin from 'qwc2-giswater/plugins/NetCDFExplorer';
import GwLoadPluginPlugin from 'qwc2-giswater/plugins/GwLoadPlugin';
import GwInfoValve from 'qwc2-giswater/plugins/tooltip_plugins/GwInfoValve';
import StreetViewButton from 'qwc2-giswater/plugins/tooltip_plugins/StreetViewButton';
import GwHelpPlugin from 'qwc2-giswater/plugins/GwHelp';
import GwParcelFilterPlugin from 'qwc2-giswater/plugins/GwParcelFilter';
import GwSupersetPlugin from 'qwc2-giswater/plugins/GwSuperset';



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
                OverviewSupport: OverviewSupport,
                RedliningSupport: RedliningSupport,
                ScaleBarSupport: ScaleBarSupport,
                SnappingSupport: SnappingSupport
            }),
            APIPlugin: APIPlugin,
            AttributeTablePlugin: AttributeTablePlugin(/* CustomEditingInterface */),
            AuthenticationPlugin: AuthenticationPlugin,
            BackgroundSwitcherPlugin: BackgroundSwitcherPlugin,
            BookmarkPlugin: BookmarkPlugin,
            BottomBarPlugin: BottomBarPlugin,
            CookiePopupPlugin: CookiePopupPlugin,
            CyclomediaPlugin: CyclomediaPlugin,
            DxfExportPlugin: DxfExportPlugin,
            EditingPlugin: EditingPlugin(/* CustomEditingInterface */),
            FeatureFormPlugin: FeatureFormPlugin(/* CustomEditingInterface */),
            GeometryDigitizerPlugin: GeometryDigitizerPlugin,
            HeightProfilePlugin: HeightProfilePlugin,
            HelpPlugin: HelpPlugin(renderHelp),
            HomeButtonPlugin: HomeButtonPlugin,
            IdentifyPlugin: IdentifyPlugin,
            LayerCatalogPlugin: LayerCatalogPlugin,
            LayerTreePlugin: LayerTreePlugin,
            LocateButtonPlugin: LocateButtonPlugin,
            LoginUserPlugin: LoginUserPlugin,
            Map3DPlugin: Map3DPlugin,
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
            PortalPlugin: PortalPlugin,
            PrintPlugin: PrintPlugin,
            ProcessNotificationsPlugin: ProcessNotificationsPlugin,
            RasterExportPlugin: RasterExportPlugin,
            RedliningPlugin: RedliningPlugin({
                BufferSupport: BufferSupport
            }),
            ReportsPlugin: ReportsPlugin,
            RoutingPlugin: RoutingPlugin(SearchProviders),
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
                Search: SearchBox(SearchProviders),
                Toolbar: Toolbar,
                FullscreenSwitcher: FullscreenSwitcher
            }),
            ZoomInPlugin: ZoomInPlugin,
            ZoomOutPlugin: ZoomOutPlugin,
            GwLoadPluginPlugin: GwLoadPluginPlugin,
            GwInfoPlugin: GwInfoPlugin,
            GwSelectorPlugin: GwSelectorPlugin,
            GwToolboxPlugin: GwToolboxPlugin,
            GwClearTempLayersPlugin: GwClearTempLayersPlugin,
            GwDateSelectorPlugin: GwDateSelectorPlugin,
            GwFlowtracePlugin: GwFlowtracePlugin,
            GwMincutPlugin: GwMincutPlugin,
            GwMincutManagerPlugin: GwMincutManagerPlugin,
            GwVisitPlugin: GwVisitPlugin,
            GwVisitManagerPlugin: GwVisitManagerPlugin,
            NetCDFExplorerPlugin: NetCDFExplorerPlugin,
            GwProfileGraphPlugin: GwProfileGraphPlugin,
            MapWatermarkPlugin: MapWatermarkPlugin,
            GwHelpPlugin: GwHelpPlugin,
            GwParcelFilterPlugin: GwParcelFilterPlugin,
            GwSupersetPlugin: GwSupersetPlugin
        },
        cfg: {
            IdentifyPlugin: {
                attributeCalculator: customAttributeCalculator,
                attributeTransform: attributeTransform,
                customExporters: customExporters
            }
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
