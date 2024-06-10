'use client'

// External Dependencies
import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button } from "@nextui-org/react";
import { ChevronDownIcon } from '@nextui-org/shared-icons';

const poppins = Poppins({ subsets: ['latin'], weight: "700" })

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBarToggled: false
        }
    }

    getSideBarList = () => {
        const { activeList, onSideBarClick } = this.props;
        const { isSideBarToggled } = this.state;
        const lists = [
            {
                title: 'Orders',
                key: "orders",
                icon: '/orders.svg'
            },
            {
                title: 'Subscriptions',
                key: "subscriptions",
                icon: '/subscriptions.svg'
            },
            {
                title: 'Calendar',
                key: "calendar",
                icon: '/calendar-days.svg'
            },
            {
                title: 'Waitlist',
                key: "waitlist",
                icon: '/waiting.svg'
            }];

        const sideBarList = lists.map((item, index) => {
            return (!isSideBarToggled ? <div
                key={index}
                className={`${activeList && (activeList.key === item.key) ? "bg-white border-b border-borderGray rounded-md" : ""} justify-start inline-flex items-center w-full py-3 px-4 text-xs font-medium`}
                role="button"
                onClick={() => { onSideBarClick(item) }}
            >
                <Image src={item.icon} width={16} height={16} rel="icon" className="mr-3" />
                <span className="text-textGray">{item.title}</span>
            </div> :
                <div
                    key={index}
                    className={`${activeList && (activeList.key === item.key) ? "bg-white border-b border-borderGray rounded-md" : ""} justify-start inline-flex items-center w-auto py-3 px-4 text-xs font-medium`}
                    role="button"
                    onClick={() => { onSideBarClick(item) }}
                >
                    <Image src={item.icon} width={16} height={16} rel="icon" className="mr-3" />
                </div>)
        });

        return sideBarList;
    }

    getCurrentYear = () => {
        const date = new Date();
        return date.getFullYear();
    }

    onSideBarToggle = () => {
        this.setState({ isSideBarToggled: !this.state.isSideBarToggled });
    }

    render() {
        const { isSideBarToggled } = this.state;
        return (
            <div className="flex flex-col bg-slate-50 h-screen w-full p-2">
                <div>
                    <div className="inline-flex justify-between items-center w-full py-5 px-4">
                        <div className="inline-flex">
                            <Image onClick={() => { this.onSideBarToggle() }} src='/logo.svg' alt="logo" width={22} height={22} className="mr-2" />
                            {!isSideBarToggled && <h1 className={`${poppins.className} text-lg`}>Front·Desk</h1>}
                        </div>
                        {!isSideBarToggled && <Image onClick={() => { this.onSideBarToggle() }} src='/sidebartoggle.svg' alt="toggle" width={16} height={16} />}
                    </div>

                    <div>
                        <div role="button" className="inline-flex items-center w-full py-5 px-4 text-xs justify-between bg-white border-b border-borderGray rounded-md font-medium">
                            {!isSideBarToggled && <span className="text-textGray">Location Name</span>}
                            <Image src="/arrow-left-right.svg" width={16} height={16} rel="icon" />
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col">
                        {this.getSideBarList()}
                    </div>

                </div>
                <div className="mt-auto">
                    <div role="button" className="inline-flex items-center w-full py-5 px-4 text-xs justify-between font-medium">
                        {!isSideBarToggled && <div className="inline-flex">
                            <Image src="/layout-dashboard.svg" width={16} height={16} rel="icon" className="mr-3" />
                            <span className="text-textGray">Dashboard</span>
                        </div>}
                        <Image src="/browse-more.svg" width={16} height={16} rel="icon" />
                    </div>
                    <div className="bg-white">
                        <div role="button" className="inline-flex items-center w-full py-2 px-4 text-xs justify-between font-medium">
                            <div className="inline-flex">
                                <Image src="/user.svg" width={16} height={16} rel="icon" className="mr-3" />
                                {!isSideBarToggled && <div className="flex flex-col">
                                    <span className="text-slate-900 font-medium	leading-5">Admin name</span>
                                    <span className="text-slate-500 leading-5">adminname@mail.com</span>
                                </div>}
                            </div>
                            {!isSideBarToggled && <Button isIconOnly={true} className="bg-transparent" startContent={<ChevronDownIcon />} />}
                        </div>
                    </div>
                    <div role="button" className="inline-flex items-center w-full py-2 px-4 text-xs justify-between font-medium">
                        <div className="inline-flex">
                            <Image src="/help-circle.svg" width={16} height={16} rel="icon" className="mr-3" />
                            {!isSideBarToggled && <div className="flex flex-col">
                                <span className="text-slate-900 font-medium	leading-5">Help center</span>
                                <span className="text-slate-500 leading-5">{`@${this.getCurrentYear()} Omnify.Inc.`}</span>
                            </div>}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default SideBar;