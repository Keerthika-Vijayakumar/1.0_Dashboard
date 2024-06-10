'use client';
// Internal style sheet
import './style.css';
// External Dev Dependency
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell, Pagination, Button, Input, Image } from "@nextui-org/react";
import { ChevronRightIcon, ChevronIcon, ChevronUpIcon, ChevronDownIcon } from '@nextui-org/shared-icons';

class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    getPaginationBasedData = () => {
        const { dataSource, itemPerPage } = this.props;
        const { currentPage } = this.state;

        const startIndex = (currentPage - 1) * itemPerPage;
        return dataSource.slice(startIndex, startIndex + itemPerPage);
    }

    getFilteredColumns = (columns) => {
        return columns.filter((column) => column.show);
    }

    onNextPage = () => {
        const { dataSource, itemPerPage } = this.props;
        const pages = Math.ceil(dataSource.length / itemPerPage);
        if (this.state.currentPage < pages) {
            this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
        }
    };

    onPreviousPage = () => {
        if (this.state.currentPage > 1) {
            this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
        }
    };

    onRowsPerPageChange = (e) => {
        this.setState({ rowsPerPage: Number(e.target.value), currentPage: 1 });
    };

    setPage = (currentPage) => {
        this.setState({ currentPage });
    };

    getBottomContent = () => {
        const { dataSource, pagination, itemPerPage } = this.props;
        const pages = Math.ceil(dataSource.length / itemPerPage);
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <div className="flex items-center justify-between">
                    <span className='mr-2 text-borderBlue'>Displaying </span>
                    <Input
                        type="number"
                        onChange={'handleInputChange'}
                        classNames={{
                            input: "bg-slate-100 ",
                            inputWrapper: "bg-slate-100 rounded w-24",
                            innerWrapper: "bg-slate-100",
                            mainWrapper: "bg-slate-100 rounded"

                        }}
                        endContent={
                            (
                                <div className="flex flex-col h-8">
                                    <Button isIconOnly={true} className="bg-transparent p-0" startContent={<ChevronUpIcon />} onClick={'handleIncrease'} style={{ cursor: 'pointer' }}></Button>
                                    <Button isIconOnly={true} className="bg-transparent p-0" startContent={<ChevronDownIcon />} onClick={'handleDecrease'} style={{ cursor: 'pointer' }}></Button>
                                </div>
                            )
                        }
                    />
                    <span className='mx-2 w-full text-borderBlue inline-flex text-nowrap'>Out of <span className='mx-2 text-zinc-900 font-medium	'>{dataSource.length}</span></span>

                </div>
                <div className="hidden sm:flex justify-end gap-2">
                    <Button className="bg-transparent" startContent={<ChevronIcon />} isDisabled={pages === 1} variant="flat" onPress={() => this.onPreviousPage()}>
                        Previous
                    </Button>
                    {pagination && <Pagination
                        isCompact
                        showShadow
                        total={pages}
                        initialPage={1}
                        page={this.state.currentPage}
                        onChange={this.handlePageChange}
                        loop
                        shadow
                        rounded
                        size="lg"
                        key={'table-pagination'}
                    />
                    }
                    <Button className="bg-transparent" endContent={<ChevronRightIcon />} isDisabled={pages === 1} variant="flat" onPress={() => this.onNextPage()}>
                        Next
                    </Button>
                </div>
            </div >
        );

    }
    render() {
        const { columns } = this.props;
        const paginationData = this.getPaginationBasedData();
        const columnsToShow = this.getFilteredColumns(columns);

        return (
            <>
                <Table
                    className="my-4 p-0"
                    aria-label="Example table with NextUI"
                    css={{
                        height: 'auto',
                        minWidth: '100%',
                        borderCollapse: "collapse"
                    }}
                    selectionMode="multiple"
                    selectedKeys={''}
                    onSelectionChange={(selectedRows) => console.log(selectedRows)}
                    key={'Table'}
                    bottomContent={this.getBottomContent()}
                >
                    <TableHeader key={'table-header'}>
                        {
                            columnsToShow && columnsToShow.length > 0 && columnsToShow.map((column) => {
                                return <TableColumn key={column.key} className="bg-slate-50	border-b-1 border-slate-200" >
                                    <span className='flex items-center'><Image className='mr-2' src={column.icon || '/hash-header.svg'} />{column.title}</span>
                                </TableColumn>
                            })
                        }
                    </TableHeader>
                    <TableBody items={paginationData} key={'table-body'}>
                        {(item) => (
                            <TableRow key={item.id} className="border-b-1 border-slate-200">
                                {columnsToShow.map((column) => {
                                    const { render } = column;
                                    return (
                                        <TableCell key={column.key}>
                                            {render ? render(item[column.key], item) : (item[column.key] || "-")}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </>
        )
    }
}

export default TableComponent;