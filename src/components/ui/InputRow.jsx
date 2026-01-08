import TextField from '@components/ui/TextField';

const InputRow = ({ label, name, registerFn, error, isRequired }) => {
    return (
        <div className='flex items-center'>
            <div className='w-70'>
                <label htmlFor={name} className='text-foreground text-xs'>
                    {label}
                </label>
                {isRequired && <span className='text-brand-primary'>*</span>}
            </div>

            <div className='flex-1'>
                <TextField label={label} name={name} registerFn={registerFn} />
                {error && <p className='pl-1 text-xs text-brand-primary mt-1'>{error.message}</p>}
            </div>
        </div>
    );
};

export default InputRow;
