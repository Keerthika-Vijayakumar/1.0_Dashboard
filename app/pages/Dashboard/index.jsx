'use client'

// dependency
import React from "react";

// Internal dependency
import Listing from '../Listing';
import SideBar from '../../components/SideBar';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeList: {
                key: 'orders',
                title: 'Orders'
            }
        }
    }

    onSideBarClick = (item) => {
        // setting active sidebar name
        this.setState({ activeList: item });
    }

    render() {
        return <div className="bg-white	w-full h-screen">
            <div className="grid grid-cols-12 gap-4">
                <div className="text-black col-span-2">
                    <SideBar
                        onSideBarClick={this.onSideBarClick}
                        activeList={this.state.activeList}
                    />
                </div>
                <div className="text-black col-span-10">
                    <Listing
                        activeList={this.state.activeList}
                    />
                </div>
            </div>
        </div>
    }
}

export default Dashboard;