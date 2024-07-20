import DescriptionBills from "../../../Description/DescriptionBill/DescriptionBill";

const Bill = () => {
    return (
        <>
            <span className='font-bold text-xl '>
                Danh sách phiếu khám bệnh
            </span>
            <div className="mt-6 flex flex-col gap-4 w-[900px]">
                {/* <IcEmpty /> */}
                <DescriptionBills />
            </div>
        </>
    );
};

export default Bill;