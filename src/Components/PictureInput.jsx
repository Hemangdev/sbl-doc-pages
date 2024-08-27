const PictureInput = ({ form, field }) => (
    <input name={field.name}
        type="file"
        className="form-control"
        onChange={e => form.setFieldValue(field.name, e.target.files[0])}
    />
);

export default PictureInput