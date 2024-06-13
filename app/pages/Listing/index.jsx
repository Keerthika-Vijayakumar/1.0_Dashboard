'use client'

// external dependency
import React from "react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { Button, Image, Input } from "@nextui-org/react";

//Internal dependency
import Utils from '../../utils/index';
import Table from '../../components/TableComponent';
import PageHeader from '../../components/PageHeader';
import ModalComponent from '../../components/ModalComponent';

// JSON and Headers
import Headers from './headers.json';
import DataSource from './dataSource.json';

class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            isModalOpen: false,
            data: DataSource,
            columns: [],
            isFilterModalOpen: false,
            filteredData: []
        }
        this.tabs = ['All', 'Newly Added', 'Leads'];
        this.csvRef = React.createRef();
        this.isFilter = false;
    }

    componentDidMount() {
        // settings tabs list
        this.tabs = this.setTabs();
        return this.getColumns();
    }

    componentDidUpdate(prevProps) {
        const { activeList } = this.props;
        if (prevProps && prevProps.activeList && prevProps.activeList.key && activeList && activeList.key && prevProps.activeList.key !== activeList.key) {
            this.tabs = this.setTabs()
            return this.getColumns();
        }
    }

    setTabs = () => {
        let { tabs } = this;
        const { activeList } = this.props;
        if (activeList && activeList.title && tabs && tabs.length) {
            if (activeList.key === 'waitlist') {
                tabs[0] = `All ${activeList.title}s`;
            } else {
                tabs[0] = `All ${activeList.title}`;
            }
        }
        return tabs;
    }

    onSave = (updatedColumns) => {
        if (!updatedColumns) {
            return;
        }
        let { columns } = this.state;
        columns.forEach((column) => {
            if (column.key && updatedColumns.hasOwnProperty(column.key)) {
                column.show = updatedColumns[column.key]
            }
        })
        this.setState({ columns, isModalOpen: false });
        return;
    }

    onFilterApply = (formData) => {
        console.log('formData', formData);
        const { data } = this.state;
        let filteredData = [];
        for (let key in formData) {
            filteredData = data.filter((row) => row[key] && (row[key] >= formData[key]['fromDate'] && row[key] <= formData[key]['toDate']));
        }
        if (filteredData && filteredData.length) {
            this.isFilter = true;
            this.setState({ filteredData })
        }
    }

    isChecked = (id) => {
        const { selectedRows } = this.state;
        if (!selectedRows || !selectedRows.length) {
            return false;
        }
        return selectedRows.includes(id);
    }

    onClickEdit = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
        return;
    }

    onClickFilter = () => {
        this.setState({ isFilterModalOpen: !this.state.isFilterModalOpen });
        return;
    }

    getColumns = () => {
        let columns = []
        if (Headers && Object.keys(Headers).length) {
            for (let columnKey in Headers) {
                const currentColumn = Headers[columnKey];
                // creating all the columns based on headers key 
                let columnObj = {
                    title: currentColumn.title || "",
                    dataType: currentColumn.type || "string",
                    key: columnKey,
                    show: currentColumn.show,
                    icon: currentColumn.icon || ""
                }
                // if dataType is date . calling Utils function to convert timeStamp to Appropriate date format.
                if (currentColumn.type === 'date') {
                    columnObj["render"] = (text, row, index) => {
                        return text ? Utils.getDateTime(text) : "-";
                    }
                }
                columns.push(columnObj);
            }
            this.setState({ columns: columns });
            return columns;
        }
    }

    convertArrayOfObjectsToCSV = (array) => {
        const keys = Object.keys(array[0]);
        const csvRows = [];
        csvRows.push(keys.join(','));
        array.forEach(obj => {
            const values = keys.map(key => {
                const escapedValue = ('' + obj[key]).replace(/"/g, '\\"');
                return `"${escapedValue}"`;
            });
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    };

    downloadCSV = (csvString, filename) => {
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    exportTableData = () => {
        const { data } = this.state;
        const csvString = this.convertArrayOfObjectsToCSV(data);
        this.downloadCSV(csvString, 'data.csv');
    };

    renderTabContent = () => {
        const { columns, data, filteredData } = this.state;
        return (
            <>
                <div className="flex justify-between items-center my-4">
                    <Button startContent={<Image src="./filter.svg" />} onClick={() => this.onClickFilter()} className="bg-slate-100 rounded-md text-textGray font-medium text-xs">Add Filter</Button>
                    <div className="inline-flex">
                        <Input
                            startContent={<SearchIcon color="black" />}
                            placeholder='Search client'
                            onChange={this.onSearch}
                            className="fill-transparent"
                        />
                        <Button onClick={() => { this.isFilter = false; this.setState({ filteredData: [] }) }} isIconOnly={true} startContent={<Image src="./refresh.svg" />} className="bg-[transparent] font-medium text-xs"></Button>
                        <Button isIconOnly={true} onClick={() => this.onClickEdit()} startContent={<Image src="./columns.svg" />} className="bg-[transparent] font-medium text-xs"></Button>
                        <Button onClick={() => { this.exportTableData() }} isIconOnly={true} startContent={<Image src="./download.svg" />} className="bg-[transparent] font-medium text-xs"></Button>
                    </div>
                </div>
                {columns && columns.length && <Table
                    columns={columns}
                    dataSource={this.isFilter ? filteredData : data}
                    pagination={true}
                    itemPerPage={15}
                />}
            </>
        )
    }

    render() {
        const { activeList } = this.props;
        const { isFilterModalOpen, isModalOpen, columns, data, filteredData } = this.state;

        return (
            <div className="bg-white w-full h-screen py-3 px-4">
                <PageHeader
                    title={activeList.title}
                    tabs={this.tabs}
                    data={this.isFilter ? filteredData : data}
                    renderTabContent={this.renderTabContent}
                />
                {
                    isFilterModalOpen && (
                        <ModalComponent
                            columns={columns}
                            isModalOpen={isFilterModalOpen}
                            onSave={this.onFilterApply}
                            isFilter={true}
                            modalSize={'3xl'}
                            noHeader={true}
                        />
                    )
                }
                {
                    isModalOpen && (
                        <ModalComponent
                            columns={columns}
                            isModalOpen={isModalOpen}
                            onSave={this.onSave}
                            title={'Edit Columns'}
                            subHeader={'Select the columns to rearrange'}
                            placement="bottom"
                        />
                    )
                }
            </div>)
    }
}

export default Listing;