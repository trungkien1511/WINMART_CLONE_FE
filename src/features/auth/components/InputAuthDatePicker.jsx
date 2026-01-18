import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@styles/datepicker.css'; // ✅ file CSS custom ở bước 2

export function InputAuthDatePicker({ name, control, disabled }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className='w-full'>
                    <DatePicker
                        selected={field.value ?? null}
                        onChange={(date) => field.onChange(date)}
                        dateFormat='dd/MM/yyyy'
                        placeholderText='Chọn ngày'
                        disabled={disabled}
                        wrapperClassName='w-full'
                        popperPlacement='top-start'
                        showPopperArrow={true}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        maxDate={new Date()}
                        className={[
                            'w-full rounded-sm border p-3 text-xs outline-none',
                            fieldState.error ? 'border-red-500' : 'border-gray-300',
                            disabled ? 'bg-gray-100' : 'bg-white'
                        ].join(' ')}
                    />

                    {fieldState.error && (
                        <p className='mt-0.75 text-xxs text-red-600'>{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
}
