'use client';
// External Dependencies
import React from "react";

// Internal Dependencies
import TabComponent from "../Tabs";

class PageHeader extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <div>
                <div className="font-semibold text-xl text-textGray my-4">
                    {title}
                </div>
                <div className="my-4">
                    <TabComponent
                        tabs={this.props.tabs}
                        data={this.props.data}
                        renderTabContent={this.props.renderTabContent}
                    />
                </div>
            </div >
        )
    }
}

export default PageHeader;