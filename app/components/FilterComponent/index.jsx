'use client';

// External Dependencies
import React from "react";
import Image from "next/image";
import { SearchIcon } from '@nextui-org/shared-icons';
import { Select, SelectItem, DatePicker, Input, RadioGroup, Radio } from "@nextui-org/react";
import Utils from "@/app/utils";

const schedules = [
    { key: "all", label: "All Time" },
    { key: "custom", label: "Custom" },
    { key: "last30", label: "Last 30 Days" },
    { key: "thisMonth", label: "This Month" },
    { key: "lastMonth", label: "Last Month" },
    { key: "thisQuarter", label: "This Quarter" },
    { key: "2QuarterAgo", label: "2 Quarter Ago" },
    { key: "thisYear", label: "This Year" },
    { key: "lastYear", label: "Last Year" }
];

class FilterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeList: 'scheduledDate',
            searchDetails: {},
            selectedSearchtext: "",
        }
        this.formData = {}
    }

    onSideBarClick = (activeKey) => {
        this.setState({ activeList: activeKey });
        return;
    }

    onSearch = (event) => {
        let { searchDetails } = this.state;
        if (event && event.target && event.target.value) {
            const { value } = event.target;
            searchDetails['searchText'] = value;
            this.setState({
                searchDetails
            })
        }
    }
    getSearchedResultLayout = () => {
        return (
            <div>

            </div>
        )
    }

    getSideBarList = () => {
        const { activeList } = this.state;
        const lists = [
            {
                title: 'Scheduled Date',
                key: "scheduledDate",
                icon: '/calendar-days.svg'
            },
            {
                title: 'People',
                key: "people",
                icon: '/subscriptions.svg'
            },
            {
                title: 'Services / Products',
                key: "services",
                icon: '/orders.svg'
            }
        ];

        const sideBarList = lists.map((item, index) => {
            return <div
                key={index}
                className={`${activeList === item.key ? "bg-white border-b border-borderGray rounded-md" : ""} justify-start inline-flex items-center w-full py-3 px-4 text-xs font-medium`}
                role="button"
                onClick={() => { this.onSideBarClick(item.key) }}
            >
                <Image src={item.icon} width={16} height={16} rel="icon" className="mr-3" />
                <span className="text-textGray">{item.title}</span>
            </div>
        })
        return sideBarList;
    }

    handleInputChange = (event, title, key) => {
        let value = "";
        let { formData } = this;
        if (event && event.calendar) {
            value = Utils.getTimeStamp(event.year, event.month, event.day);
        }
        formData[title] = { ...formData[title], [key]: value }
        this.props.updateFormData(formData);
    }

    getScheduledContent = () => {
        return (
            <div className="flex flex-col w-full gap-4">
                <Select
                    labelPlacement="outside-left"
                    label="Show Orders for"
                    className="max-w-xs h-58 flex-col"
                >
                    {schedules.map((option) => (
                        <SelectItem key={option.key} className="text-black">
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
                <div className="flex flex-row gap-2">
                    <DatePicker
                        label={"From"}
                        className="max-w-[284px] flex-col items-start"
                        description={'Select From Date'}
                        labelPlacement={'outside-left'}
                        onChange={(event) => this.handleInputChange(event, 'scheduled', 'fromDate')}
                    />
                    <DatePicker
                        label={"To"}
                        className="max-w-[284px] flex-col items-start"
                        description={'Select To Date'}
                        labelPlacement={'outside-left'}
                        onChange={(event) => this.handleInputChange(event, 'scheduled', 'toDate')}
                    />
                </div>
            </div>
        )
    }

    getPeopleContent = () => {
        const { searchedResult } = this.state;
        return (
            <>
                <Input
                    startContent={<SearchIcon color="black" />}
                    placeholder='Search Payer or attendee name'
                    onChange={this.onSearch}
                />
                {searchedResult && searchedResult.length && (
                    this.getSearchedResultLayout()
                )

                }
            </>
        )
    }

    getServicesContent = () => {
        const { selectedSearchtext } = this.state;
        return (
            <div>
                <RadioGroup orientation="horizontal" className="py-4">
                    <Radio value="buenos-aires" onChange={(e) => this.setState({ selectedSearchtext: "service name" })}>Search by name</Radio>
                    <Radio value="sydney" onChange={(e) => this.setState({ selectedSearchtext: "service tag" })}>Search by tags</Radio>
                </RadioGroup>
                <Input
                    startContent={<SearchIcon color="black" />}
                    placeholder={`Search ${selectedSearchtext}`}
                    onChange={this.onSearch}
                />

            </div>
        )
    }

    getRightSideContent = () => {
        const { activeList } = this.state;

        switch (activeList) {
            case 'scheduledDate':
                return this.getScheduledContent();
            case 'people':
                return this.getPeopleContent();
            case 'services':
                return this.getServicesContent();
        }
    }

    render() {
        return (
            <div className="grid grid-cols-12 gap-4 border-b">
                <div className="bg-slate-50 col-span-4 border-r px-2 min-h-80	">
                    {this.getSideBarList()}
                </div>

                <div className="col-span-8">
                    {this.getRightSideContent()}
                </div>
            </div>
        )
    }
}

export default FilterComponent;