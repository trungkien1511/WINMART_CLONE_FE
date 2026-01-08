import { checkoutTextareaClass } from '@styles/checkoutInput';

const NoteForm = ({ register }) => {
    return (
        <section className=' p-4 bg-white mb-2'>
            <div className='flex w-full'>
                <div className='w-70 pt-2'>
                    <label className='text-foreground text-xs'>Ghi chú ( Nếu có )</label>
                </div>

                <div className='flex-1'>
                    <textarea rows={3} {...register('note')} className={checkoutTextareaClass} />
                </div>
            </div>
        </section>
    );
};

export default NoteForm;
