import React from "react";

const Field = ({name, label, value, onChange, placeholder = "", type = "text", error = ""}) => {
    return (
        <div className="form-group">
            <label name={name} htmlFor={name}>{label}</label>
            <input name={name} id={name} type={type} className={"form-control" + (error && " is-invalid")}
                   value={value} onChange={onChange} placeholder={placeholder || label}/>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}

export default Field;