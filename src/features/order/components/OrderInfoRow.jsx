// components/OrderInfoRow.jsx
const OrderInfoRow = ({ label, value }) => (
    <div className='flex gap-5 items-center text-xs'>
        <span className='font-medium min-w-37.5'>{label}:</span>
        <span>{value || '—'}</span>
    </div>
);

export default OrderInfoRow;
