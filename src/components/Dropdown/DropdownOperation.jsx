
import { SettingOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import styles from './Dropdown.module.scss'
import ModalView from './ModalView';
import ModalUpdate from './ModalUpdate';
import useOnClickOutside from '../../hook/use-onclick-outside';
import { Modal } from 'antd';

const DropdownOperation = ({ isUser, dataListBranch, record, type = 2, updateSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    const dropRef = useRef();
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const onOpenDetail = (data) => {
        setOpenViewModal(true);
        setIsOpen(false)
    };

    const onCloseViewHandler = () => {
        setOpenViewModal(false);
    };

    const openEdit = (data) => {
        setOpenUpdateModal(true);
        setIsOpen(false)
    };

    const onCloseUpdateModalHandler = () => {
        setOpenUpdateModal(false);
    };

    const onClickGotoUpdate = () => {
        setOpenViewModal(false);
        setOpenUpdateModal(true);
    };

    const handleClickOutside = (event) => {
        setIsOpen(false);
    };

    useOnClickOutside(dropRef, handleClickOutside);
    return (
        <div>
            <SettingOutlined style={{ fontSize: '25px' }} onClick={handleOpen} />
            {isOpen &&
                <div className={styles.selectOptions} ref={dropRef} >
                    <div className={styles.option} onClick={onOpenDetail}>Xem thông tin</div>
                    {!isUser &&
                        <div className={styles.option} onClick={openEdit} >Sửa thông tin</div>
                    }
                    {/* <Button className={styles.option} onClick={showDeleteConfirm} >Xóa tài khoản </Button> */}
                </div>
            }
            <ModalView
                openView={openViewModal}
                onCloseViewHandler={onCloseViewHandler}
                onClickUpdate={onClickGotoUpdate}
                data={record}
                type={type}
            />
            {!isUser &&
                <ModalUpdate
                    openUpdate={openUpdateModal}
                    onCloseUpdateModalHandler={onCloseUpdateModalHandler}
                    data={record}
                    dataListBranch={dataListBranch}
                    updateSuccess={updateSuccess}
                    type={type}
                />
            }
        </div>
    );
};

export default DropdownOperation;