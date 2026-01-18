import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export function InputGenderRadio({ control, name = 'gender', disabled }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} disabled={disabled}>
                    <RadioGroup row {...field}>
                        <FormControlLabel
                            value='Nam'
                            control={
                                <Radio
                                    sx={{
                                        '&.MuiRadio-root': {
                                            color: 'black'
                                        }
                                    }}
                                />
                            }
                            label='Nam'
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontSize: 12
                                },
                                '&.Mui-checked': {
                                    color: 'red' // màu khi đã chọn
                                }
                            }}
                        />
                        <FormControlLabel
                            value='Nữ'
                            control={
                                <Radio
                                    sx={{
                                        '&.MuiRadio-root': {
                                            color: 'black'
                                        }
                                    }}
                                />
                            }
                            label='Nữ'
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontSize: 12
                                }
                            }}
                        />
                    </RadioGroup>

                    {fieldState.error && (
                        <p className='text-xs text-red-700 mt-1'>{fieldState.error.message}</p>
                    )}
                </FormControl>
            )}
        />
    );
}
