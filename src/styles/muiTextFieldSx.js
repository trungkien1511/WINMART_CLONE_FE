// src/styles/muiTextFieldSx.js

export const muiTextFieldSx = {
    /* INPUT */
    '& .MuiInputBase-input': {
        fontSize: '12px',
        fontWeight: 400,
        padding: '14px'
    },

    /* PLACEHOLDER */
    '& .MuiInputBase-input::placeholder': {
        fontSize: '12px',
        fontWeight: 400,
        color: '#9CA3AF',
        opacity: 1
    },

    // Thu hẹp khoảng notch (phần “trắng”)
    '& .MuiOutlinedInput-notchedOutline legend': {
        padding: 0,
        marginLeft: 0,
        width: 'auto'
    },
    '& .MuiOutlinedInput-notchedOutline legend > span': {
        paddingLeft: 0,
        paddingRight: 0
    },

    /* LABEL */
    '& .MuiInputLabel-root': {
        fontSize: '12px',
        fontWeight: 400,
        color: 'black'
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'black'
    },

    /* BORDER ON FOCUS */
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3B82F6',
        borderWidth: '1px'
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        boxShadow: '0 0 8px rgba(59, 130, 246, 0.35)'
    },

    '& .MuiFormHelperText-contained': {
        marginLeft: 0,
        marginRight: 0
    }
};

// Helper: dùng cho multiline/textarea (padding/height hợp lý)
export const muiTextAreaSx = {
    ...muiTextFieldSx,
    '& .MuiInputBase-input': {
        fontSize: '12px',
        fontWeight: 400,
        padding: '14px',
        lineHeight: 1.5
    }
};
