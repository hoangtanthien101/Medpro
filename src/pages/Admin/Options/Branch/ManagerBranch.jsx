import { useEffect, useState } from "react";
import { Input, Image, Select, Table } from "antd";
import "./ManagerBranch.css";
import { ToastNoti, ToastNotiError } from "../../../../utils/Utils";
import Factories from "../../../../services/FactoryApi";
import { Button } from "@mui/material";
import { Modal } from "antd/es";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase";
import { v4 } from "uuid";
import { AppstoreAddOutlined, EditOutlined } from "@ant-design/icons";
import AvatarGroup from "../../../../components/image-group/AvatarGroup";

const ManagerBranch = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState();
  const [listData, setListData] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openUpdateBranch, setOpenUpdateBranch] = useState(false)
  const [openModalAddDepart, setOpenModalAddDepart] = useState(false)
  const [openEditDepartment, setOpenEditDepartment] = useState()
  const [fileUploadLink, setFileUploadLink] = useState();
  const [branchId, setBranchId] = useState();
  const [departName, setDepartAddName] = useState()
  const [doctorIds, setDoctorIds] = useState()
  const [address, setAddress] = useState()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDataDoctor = async (branchId) => {
    if (branchId) {
      try {
        const response = await Factories.getAccountList('', 2, branchId);
        const option = response?.map((field) => {
          return {
            value: field._id,
            key: field._id,
            label: field.fullName,
          };
        });
        setListDoctor(option);
      } catch (error) {
        ToastNotiError(error);
      }
    }
  };
  useEffect(() => {
    fetchDataDoctor(openModalAddDepart)
  }, [openModalAddDepart]);

  useEffect(() => {
    fetchDataDoctor(openEditDepartment?.branchId)
  }, [openEditDepartment]);

  const fetchData = async (keyword) => {
    setLoading(true)
    try {
      const response = await Factories.getBranchList(keyword);
      const newData = response?.map(item => ({
        key: item?._id,
        ...item
      }))
      setListData(newData);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      ToastNotiError(error);
    }
  };



  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      align: 'center',
      render: (id, record, index) => { ++index; return index; },
      showSorterTooltip: false,
    },
    {
      title: "Hình ảnh",
      align: 'left',
      dataIndex: "image",
      key: "image",
      width: 150,
      render: text =>
        <Image className='shadow-md h-28' src={text} />
    },
    {
      title: "Tên Bệnh viện",
      width: 400,
      dataIndex: "name",
      render: (text) => (
        <div className="">
          {text}
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      width: 600,
      dataIndex: "address",
      render: (text) => (
        <div className="">
          {text}
        </div>
      ),
    },
    {
      title: "Tác vụ",
      key: "action",
      width: 300,
      align: 'center',
      render: (_, record) =>
        <div className="flex justify-center flex-row gap-2" >
          {/* <Button
            variant="outline"
            onClick={() => handleDeleteBranch(record?._id)}
          >
            <DeleteOutlined className='text-red' />
          </Button> */}
          <Button
            variant="outline"
            onClick={() => {
              setDepartAddName(record?.name)
              setFileUploadLink(record?.image)
              setAddress(record?.address)
              setOpenUpdateBranch(record)
            }
            }
          >
            <EditOutlined />
          </Button>
        </div >
    }
  ];

  function resetFill() {
    setDepartAddName()
    setFileUploadLink()
    setAddress()
  }
  const onAddBranchtSubmit = async () => {
    const data = {
      name: departName,
      image: fileUploadLink,
      address: address,
    }
    try {
      const resp = await Factories.createBranch(data);
      if (resp) {
        ToastNoti();
        fetchData()
        onCloseModalAddField()
      } else {
        ToastNotiError(resp?.message);
      }
    } catch (error) {
      ToastNotiError();
    }
  }

  const onUpdateBranchtSubmit = async () => {
    const data = {
      _id: openUpdateBranch?._id,
      name: departName,
      image: fileUploadLink,
      address: address,
    }
    try {
      const resp = await Factories.updateBranch(data);
      if (resp) {
        ToastNoti();
        fetchData()
        resetFill()
        setOpenUpdateBranch()
      } else {
        ToastNotiError(resp?.message);
      }
    } catch (error) {
      ToastNotiError();
    }
  }
  const onAddDepartmentSubmit = async () => {
    const data = {
      name: departName,
      branchId: branchId,
      doctorIds: doctorIds,
    }
    try {
      const resp = await Factories.createDepart(data);
      if (resp) {
        ToastNoti();
        fetchData()
        onCloseModalAddDepart()
      } else {
        ToastNotiError(resp?.message);
      }
    } catch (error) {
      ToastNotiError();
    }
  }

  const onUpdateDepartmentSubmit = async () => {
    const data = {
      name: openEditDepartment.name,
      _id: openEditDepartment._id,
      doctorIds: openEditDepartment.doctorIds,
    }
    try {
      const resp = await Factories.updateDepart(data);
      if (resp) {
        ToastNoti();
        fetchData()
        setOpenEditDepartment()
      } else {
        ToastNotiError(resp?.message);
      }
    } catch (error) {
      ToastNotiError();
    }
  }

  const onChangeDataAddField = (event) => {
    setDepartAddName(event.target.value)
  }
  const onChangeDataAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleOnChangeInput = e => {
    setKeyword(e.target.value);
  };

  const handleDeleteBranch = async value => {
    try {
      const response = await Factories.deleteBranch(value);
      if (response.status === 200) {
        ToastNoti();
        fetchData();
      } else {
        ToastNotiError();
      }
    } catch (error) {
      ToastNotiError();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      fetchData(keyword);
    }
  };

  function handleReset() {
    setKeyword();
    fetchData()
  }
  function handleSearch() {
    fetchData(keyword)
  }

  const onOpenModalAddField = () => {
    setOpenModalAdd(true)
  }

  const onCloseModalAddField = () => {
    setOpenModalAdd(false)
    fetchData();
  }
  const onCloseModalAddDepart = () => {
    setOpenModalAddDepart()
    setDepartAddName()
    setDoctorIds()
  }
  const handleAddDepartment = (_id) => {
    setOpenModalAddDepart(_id)
    setBranchId(_id)
  }

  function handleChangeImage(file) {
    if (file === null || !file) {
      console.log('No file selected.');
      return;
    }
    const uniqueFileName = `${file.name}_${v4()}`;
    const imageRef = ref(storage, `avatar/${uniqueFileName}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setFileUploadLink(downloadURL)
      });
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  }
  return (
    <div className="booking-container " style={{ height: '100vh', overflow: 'scroll' }}>
      <div className="booking-title">
        <span className='uppercase text-3xl'>Chi nhánh bệnh viện
        </span>
      </div>
      <div className="booking-search flex flex-row justify-between">
        <Input
          placeholder="Tìm kiếm theo mã, tên người thuê, ..."
          size="middle "
          value={keyword}
          className='w-[50%]'
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleOnChangeInput(e)} />
        <div className="flex flex-row gap-1">
          <Button
            variant="outlined"
            onClick={handleReset}
          >
            Mặc định
          </Button>
          <Button
            variant="contained"
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
          <Button variant="contained" onClick={onOpenModalAddField}>Thêm bệnh viện</Button>
        </div>
      </div>
      <div className="booking-table">
        <Table
          columns={columns}
          dataSource={listData ?? []}
          loading={loading}
          expandable={{
            expandedRowRender: (record) => (
              <div className="flex flex-col  w-full px-24 ">
                <div className="flex  w-full justify-between">
                  <span className="font-bold">Danh sách khoa khám</span>
                  <Button
                    variant="contained"
                    className='py-1'
                    onClick={() => handleAddDepartment(record?._id)}
                  >
                    <AppstoreAddOutlined />
                  </Button>
                </div>
                <div className="flex justify-between my-4">
                  <span className="font-bold min-w-[200px]"> Tên chuyên khoa</span>
                  <span className="font-bold min-w-[200px] text-center"> Danh sách bác sĩ</span>

                  <span className="font-semibold"> Tác vụ</span>
                </div>
                {record?.departments?.map(department => (
                  <div key={department._id} className="flex justify-between my-1">
                    <span className="font-semibold min-w-[200px]">{department?.name}</span>
                    <span className="font-thin flex flex-row items-center min-w-[200px] justify-center">
                      <AvatarGroup list={department?.doctors} />
                    </span>
                    <Button>
                      <EditOutlined onClick={() => setOpenEditDepartment(department)} />
                    </Button>
                  </div>
                ))}

              </div>
            ),
            rowExpandable: (record) => record._id !== 'Not Expandable',
          }}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "30"]
          }}
        />

        {/* // them benh vien`` */}
        <Modal
          width={800}
          title="Thêm bệnh viện"
          open={openModalAdd}
          onCancel={onCloseModalAddField}
          afterClose={resetFill}
          footer={[]}
        >
          <div className='flex flex-row'>
            <div className='flex flex-col my-2'>
              <input
                id="uploadInput"
                type="file"
                className='uploadInput'
                style={{ display: 'none' }}
                onChange={(e) => handleChangeImage(e.target.files[0])}
              />
              <Image
                src={fileUploadLink ?? ''}
                alt="avatar"
                style={{ width: 150, height: 150 }}
                fallback="data:image/png;base64,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"
              />
              <label style={{ padding: '2px 50px', border: '1px solid #111', borderRadius: 5 }} htmlFor="uploadInput" className='uploadButton'>
                Upload
              </label>
            </div>
            <div className="flex w-full justify-between px-4 flex-col">
              <div className='flex flex-col'>
                <Input
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Nhập tên bệnh viện "
                  className='add-modal-input my-2'
                  value={departName}
                  onChange={onChangeDataAddField}
                  name="name"
                />
                <Input
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Nhập địa chỉ"
                  className='add-modal-input my-2'
                  value={address}
                  onChange={onChangeDataAddress}
                  name="address"
                />
              </div>
              <Button variant="contained" style={{ width: '100%', float: 'right' }} onClick={onAddBranchtSubmit}>Thêm</Button>
            </div>

          </div>
        </Modal >



        {/* sua thong tin benh vien */}
        <Modal
          width={800}
          title="Sủa thông tin bệnh viện"
          open={openUpdateBranch}
          onCancel={() => {
            resetFill()
            setOpenUpdateBranch()
          }}
          afterClose={resetFill}
          footer={[]}
        >
          <div className='flex flex-row'>
            <div className='flex flex-col my-2'>
              <input
                id="uploadInput"
                type="file"
                className='uploadInput'
                style={{ display: 'none' }}
                onChange={(e) => handleChangeImage(e.target.files[0])}
              />
              <Image
                src={openUpdateBranch?.image ?? ''}
                alt="avatar"
                style={{ width: 150, height: 150 }}
                fallback="data:image/png;base64,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"
              />
              <label style={{ padding: '2px 50px', border: '1px solid #111', borderRadius: 5 }} htmlFor="uploadInput" className='uploadButton'>
                Upload
              </label>
            </div>
            <div className="flex w-full justify-between px-4 flex-col">
              <div className='flex flex-col'>
                <Input
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Nhập tên bệnh viện "
                  className='add-modal-input my-2'
                  value={departName}
                  onChange={onChangeDataAddField}
                  name="name"
                />
                <Input
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Nhập địa chỉ"
                  className='add-modal-input my-2'
                  value={address}
                  onChange={onChangeDataAddress}
                  name="address"
                />
              </div>
              <Button variant="contained" style={{ width: '100%', float: 'right' }} onClick={onUpdateBranchtSubmit}>Lưu thông tin</Button>
            </div>

          </div>
        </Modal >


        <Modal
          width={800}
          title="Thêm chuyên khoa của bệnh viện"
          open={openModalAddDepart}
          onCancel={onCloseModalAddDepart}
          footer={[]}
        >
          <div className='flex flex-row'>
            <div className="flex w-full justify-between px-4 flex-col">
              <div className='flex flex-col  gap-6'>
                <Input
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Nhập tên chuyên khoa"
                  className='add-modal-input my-2'
                  onChange={onChangeDataAddField}
                  value={departName}
                  name="name"
                />
                <Select
                  mode="multiple"
                  placeholder='Chọn bác sĩ thuộc chuyên khoa'
                  options={listDoctor}
                  value={doctorIds}
                  onChange={(e) => setDoctorIds(e)}
                  style={{ minWidth: 180 }}
                />
                <Button variant="contained" style={{ width: '100%', float: 'right' }} onClick={onAddDepartmentSubmit}>Thêm</Button>
              </div>
            </div>

          </div>
        </Modal >


        <Modal
          width={800}
          title="Cập nhật thông tin"
          open={openEditDepartment}
          onCancel={() => setOpenEditDepartment()}
          footer={[]}
        >
          <div className='flex flex-row'>
            <div className="flex w-full justify-between px-4 flex-col">
              <div className='flex flex-col  gap-6'>
                <Input
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Nhập tên chuyên khoa"
                  className='add-modal-input my-2'
                  onChange={(e) => {
                    setOpenEditDepartment(prevState => ({
                      ...prevState,
                      name: e.target.value
                    }))
                  }}
                  value={openEditDepartment?.name}
                  name="name"
                />
                <Select
                  mode="multiple"
                  placeholder='Chọn bác sĩ thuộc chuyên khoa'
                  options={listDoctor}
                  value={openEditDepartment?.doctorIds}
                  onChange={(e) => {
                    setOpenEditDepartment(prevState => ({
                      ...prevState,
                      doctorIds: e
                    }))
                  }}
                  style={{ minWidth: 180 }}
                />
                <Button variant="contained" style={{ width: '100%', float: 'right' }} onClick={onUpdateDepartmentSubmit}>Lưu thông tin</Button>
              </div>
            </div>

          </div>
        </Modal >

      </div>
    </div>
  );
};

export default ManagerBranch;
