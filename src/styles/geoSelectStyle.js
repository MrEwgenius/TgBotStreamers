export const customStyles = {
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  control: (base) => ({
    ...base,
    background: "transparent",
    border: "none",
    borderRadius: "0px",
    boxShadow: "none",
    color: "#fff",
    borderBottom: "2px solid #ccc",
    paddingRight: "20px",
    ":hover": {},
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    margin: "0",
    padding: "0",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#ccc",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    background: "#333",
    borderRadius: "4px",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    background: isFocused ? "#ccc" : "transparent",
    color: isFocused ? "#fff" : "#ccc",
    ":active": {},
  }),
};
