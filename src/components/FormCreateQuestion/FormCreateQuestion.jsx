import BoxCustom from '../Box/Box';
import DescriptionQuestion from './DescriptionQuestion';

const FormCreateQuestion = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[1000px] py-10 flex flex-col justify-center items-center">
                <BoxCustom
                    title={<span className="text-2xl">ĐẶT CÂU HỎI VỚI CHUYÊN GIA NGAY</span>}
                    alignTitle='center'
                    description={<DescriptionQuestion />}
                />
            </div>
        </div>
    );
};

export default FormCreateQuestion;