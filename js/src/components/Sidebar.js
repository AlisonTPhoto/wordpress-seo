import React from "react";
import PropTypes from "prop-types";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Fragment } from "@wordpress/element";
import { Fill } from "@wordpress/components";

import SidebarItem from "./SidebarItem";
import ReadabilityAnalysis from "./contentAnalysis/ReadabilityAnalysis";
import CollapsibleCornerstone from "../containers/CollapsibleCornerstone";
import SeoAnalysis from "./contentAnalysis/SeoAnalysis";
import SnippetPreviewModal from "./SnippetPreviewModal";
import { LocationProvider } from "../components/contexts/location";

/**
 * Creates the Sidebar component.
 *
 * @param {Object} settings The feature toggles.
 * @param {Object} store    The Redux store.
 * @param {Object} theme    The theme to use.
 *
 * @returns {ReactElement} The Sidebar component.
 *
 * @constructor
 */
export default function Sidebar( { settings, store, theme } ) {
	return (
		<Fragment>
			<Fill name="YoastSidebar">
				{ <SidebarItem renderPriority={ 5 }>
					<LocationProvider value="sidebar">
						<ThemeProvider theme={ theme }>
							<StoreProvider store={ store }>
								<SnippetPreviewModal />
							</StoreProvider>
						</ThemeProvider>
					</LocationProvider>
				</SidebarItem> }
				{ settings.isContentAnalysisActive && <SidebarItem renderPriority={ 10 }>
					<LocationProvider value="sidebar">
						<ThemeProvider theme={ theme }>
							<StoreProvider store={ store }>
								<ReadabilityAnalysis />
							</StoreProvider>
						</ThemeProvider>
					</LocationProvider>
				</SidebarItem> }
				{ settings.isKeywordAnalysisActive && <SidebarItem renderPriority={ 20 }>
					<LocationProvider value="sidebar">
						<ThemeProvider theme={ theme }>
							<StoreProvider store={ store }>
								<SeoAnalysis
									shouldUpsell={ settings.shouldUpsell }
								/>
							</StoreProvider>
						</ThemeProvider>
					</LocationProvider>
				</SidebarItem> }
				{ settings.isCornerstoneActive && <SidebarItem renderPriority={ 30 }>
					<LocationProvider value="sidebar">
						<ThemeProvider theme={ theme }>
							<StoreProvider store={ store }>
								<CollapsibleCornerstone />
							</StoreProvider>
						</ThemeProvider>
					</LocationProvider>
				</SidebarItem>
				}
			</Fill>
		</Fragment>
	);
}

Sidebar.propTypes = {
	settings: PropTypes.object,
	store: PropTypes.object,
	theme: PropTypes.object,
};
