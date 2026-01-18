import { TextField } from '@mui/material';
import { muiTextFieldSx } from '@styles/muiTextFieldSx';
import { Controller } from 'react-hook-form';

export const InputAuthField = ({
    name,
    label,
    placeholder,
    control,
    isLoggingIn,
    type = 'input',
    isRequired = false
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    fullWidth
                    label={label}
                    required={isRequired}
                    placeholder={placeholder}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={muiTextFieldSx}
                    disabled={isLoggingIn}
                    type={type}
                    slotProps={{
                        inputLabel: {
                            sx: {
                                '& .MuiFormLabel-asterisk': {
                                    color: 'red'
                                }
                            }
                        }
                    }}
                />
            )}
        />
    );
};
