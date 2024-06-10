'use client';
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

class TabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: ''
        }
    }

    toggleTab(name) {
        this.setState({ activeTab: name });
        if (!this.props.onTabChange) {
            return;
        }
        this.props.onTabChange(name);
    }

    getTabs(activeTab) {
        const { tabs, data } = this.props;
        return (
            <Tabs
                pills
                sliding
                color="primary"
                classNames={{
                    tabList: "flex w-full justify-between relative rounded-none p-0 border-divider bg-[transparent]",
                    cursor: "w-full bg-[transparent]",
                    tab: "h-12 justify-start border border-borderGray data-[selected=true]:border-borderBlue",
                    tabContent: "text-textGray font-semibold text-xs group-data-[selected=true]:text-[black]"
                }}
                className=" w-full"
            >
                {tabs.map((element) => {
                    return (
                        <Tab
                            className="bg-transparent"
                            isActive={activeTab === element}
                            onClick={() => this.toggleTab(element)}
                            title={
                                <>
                                    {element}
                                    < span className="px-2 text-borderBlue text-[10px]">{(data && data.length)}</span>
                                </>
                            }
                        >
                            {this.renderTabContent()}
                        </Tab >
                    );
                })
                }
            </Tabs >
        );
    }

    getActiveTab = () => {
        let activeTab = this.state.activeTab || this.props.activeTab || (this.props.tabs && this.props.tabs[0]) || "";
        if (!activeTab && this.props.tabs && this.props.tabs.length > 0) {
            activeTab = this.props.tabs[0];
        }
        return activeTab ? activeTab : "";
    };
    getTabsView = () => {
        let activeTab = this.getActiveTab();
        return this.getTabs(activeTab);
    }
    renderTabContent = () => {
        const { renderTabContent } = this.props;
        if (!renderTabContent) {
            return <></>
        }
        return renderTabContent();
    }
    render() {
        if (!this.props.tabs || this.props.tabs.length === 0) {
            return <></>;
        }
        return (
            <div>
                {this.getTabsView()}
            </div>
        );
    }
}

export default TabComponent;