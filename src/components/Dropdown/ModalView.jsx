import React from 'react'
import { Modal, Image, Row, Col, Button } from "antd";
import classes from './Dropdown.module.scss'
import AvatarGroup from '../image-group/AvatarGroup';
import StarRating from '../start-rating/StarRating';
import Constants from '../../utils/constants';

const InfoItem = ({ label, content }) => {
    return (
        <div className={classes.infoContainer}>
            <p className={classes.label}>{label}</p>
            <p className={classes.content}>{content}</p>
        </div>
    );
};


const ModalView = (props) => {
    return (
        <Modal
            width={1000}
            style={{
                top: '10vh',
            }}
            title="Thông tin chi tiết"
            open={props.openView}
            onCancel={props.onCloseViewHandler}
            footer={[
                <Button key="back" onClick={props?.onCloseViewHandler}>
                    Hủy bỏ
                </Button>,
                <Button key="submit" type="outline" onClick={props.onClickUpdate}>
                    Cập nhật
                </Button>,
            ]}
        >
            <div className={classes['admin-modal-view']}>
                <Row>
                    <Col span={5}>
                        <Image style={{ borderRadius: 10 }} width={160} height={160} src={props.data.avatar} />
                    </Col>
                    <Col span={19}>
                        <Row>
                            <Col span={12}>
                                <InfoItem label="Email" content={props.data?.email} />
                                <InfoItem label="Khu vực" content={Constants.vietnamProvinces.find(item => item?.value === props?.data?.province)} />
                                {props?.type === 'PGT' ?
                                    <>
                                        <InfoItem label="Lĩnh vực" content={<>
                                            <span>
                                                <AvatarGroup list={props.data?.listgame} maxCount={6} />
                                            </span>
                                        </>} />

                                        <InfoItem label="Thời gian thuê" content={props.data?.timeOrder} />
                                        <InfoItem label="Tỷ lệ hoàn thành" content={props.data?.rateDone} />
                                    </>
                                    :
                                    <>
                                        <InfoItem label="Trạng thái" content={props.data?.status === 10 ? 'Đang hoạt động' : 'Đang khóa'} />
                                    </>
                                }
                            </Col>
                            <Col span={12}>
                                <InfoItem label="Họ và tên" content={`${props.data?.fullName ?? ''}`} />
                                <InfoItem label="Số điện thoại" content={props.data?.phone} />
                                <InfoItem label="Địa chỉ cụ thể" content={props.data?.address} />
                                {props?.type === 'PGT' ?
                                    <>
                                        <InfoItem label="Đánh giá" content={<StarRating starCount={props.data?.star} />} />
                                        <InfoItem label="Số người theo dõi" content={props.data?.follow} />
                                        <InfoItem label="Trạng thái" content={props.data?.flag === 1 ? 'Đang hoạt động' : 'Đang khóa'} />
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Modal >
    )
}

export default ModalView