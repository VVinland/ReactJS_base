const MySelect = ({ defaultValue, options, value, onChange }) => {
    return (
        <select
            value={value}
            onChange={event=>onChange(event.target.value)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map(el =>
                <option value={el.value} key={el.value}>{el.name}</option>
            )}
        </select>
    );
}

export default MySelect;