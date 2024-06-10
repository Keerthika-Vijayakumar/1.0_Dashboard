'use client';
// External Dependencies
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Checkbox, Button } from "@nextui-org/react";

// Internal Dependencies
import FilterComponent from '../../components/FilterComponent';

class ModalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: this.props.isModalOpen
        }
        this.updatedColumns = {};
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    };

    onCheckClick = (isSelected, column) => {
        const { updatedColumns } = this;
        const currentCheckedColumn = {
            [column.key]: isSelected
        }
        this.updatedColumns = { ...updatedColumns, ...currentCheckedColumn }
        return this.updatedColumns;
    }

    getEditableColumns = () => {
        const { columns } = this.props;
        if (!columns || !columns.length) {
            return <></>;
        }

        let editableColumns = [];

        columns.map((column, index) => {
            editableColumns.push(
                <div className="inline-flex" key={index}>
                    <Checkbox
                        classNames={{
                            wrapper: 'after:bg-black'

                        }}
                        key={column.key}
                        defaultSelected={column.show}
                        checked={column.show}
                        onValueChange={(isSelected) => this.onCheckClick(isSelected, column)}
                    />
                    <Button className="text-black bg-transparent border w-full justify-start">{column.title}</Button>
                </div >
            )
        })
        return editableColumns;
    }

    getFilterLayout = () => {
        return <FilterComponent />
    }

    getFooterButton = () => {
        const { onSave, isFilter } = this.props;
        return (
            <>
                <Button className="bg-transparent">
                    Reset to Default
                </Button>
                <Button className="bg-black text-white" onClick={() => !isFilter ? onSave(this.updatedColumns) : ""}>
                    Apply
                </Button>
            </>
        )
    }

    render() {
        const { isModalOpen } = this.state;
        const { isFilter, title, subHeader, placement, modalSize, noHeader } = this.props;
        return (
            <Modal
                isOpen={isModalOpen}
                onClose={() => this.toggleModal()}
                placement={placement || "auto"}
                size={modalSize || 'md'}
            >
                <ModalContent>
                    {noHeader ? <></> : <ModalHeader className="flex flex-col gap-1 text-black font-medium">
                        {title || ""}
                        {subHeader && <span className="text-textGray font-normal text-sm	">{subHeader}</span>}
                    </ModalHeader>}
                    <ModalBody>
                        {isFilter ? this.getFilterLayout() : this.getEditableColumns()}

                    </ModalBody>
                    <ModalFooter>
                        {this.getFooterButton()}
                    </ModalFooter>

                </ModalContent>

            </Modal>
        )
    }
}

export default ModalComponent;