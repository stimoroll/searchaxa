import { useEffect, useRef, useState, useReducer } from "react";
import styled from "styled-components";
import currencies from "./currency";
import useEventListener from "./useListener";

const notices = [
  "type ISIN, currency, price ... - activate search filter",
  "press arrow keys <-- or --> to activate filter start with and end with",
  "press &, |, ~ or type AND, OR, NOT to add next search filter",
  "press Enter to accept, press ESC to cancel and close selecting dropbox"
];

const operator = ["+", "-", "|", "AND", "OR", "NOT"];

const data = [
  "ISIN",
  "ISSN",
  "ISBN",
  "trade data",
  "currency",
  "price",
  "quantity",
  "national",
  "ammonunt"
];

const filters = {
  currency: ["EUR", "USD", "GBP", "PLN"]
};

const useDetect = () => {
  return true;
};

const Tips = ({ tip }) => <span></span>;

const Notice = styled.div``;

const DropDownWrapper = styled.div`
  position: absolute;
  top: 36px;
  border: 1px solid #ddd;
  left: 20px;
  width: 90vw;
  span {
    font-size: 0.6em;
    opacity: 0.5;
    display: block;
    text-align: left;
    padding: 1px 5px 0;
  }
  ul {
    width: 85vw;
    padding: 1vw;
    margin: 1vw;
  }
  li {
    list-style: none;
    text-align: left;
    &.selected {
      background: #ccc;
    }
    button {
      width: 50vw;
      margin: 1vw 0 1vw 20%;
      height: 36px;
    }
  }
`;

const DropDown = ({ values, selected }) => {
  // const classes =
  return (
    <DropDownWrapper className="dropDownWrapper">
      <span>Use arrow down and up to navigate</span>
      <span>Press Tab to slect</span>
      <ul>
        {values &&
          values.map((value, index) => (
            <li className={selected === value && "selected"} key={value}>
              {value}
            </li>
          ))}
        <li>
          <button className="uploadBtn">Upload File</button>
        </li>
      </ul>
    </DropDownWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  input {
    width: 90vw;
    height: 36px;
    margin: 0px 12px;
    border: 1px solid rgba(0, 0, 0, 0.26);
    box-sizing: border-box;
    padding-left: 10px;
    border-radius: 4px;
    color: rgb(122 122 122);
    &:focus-visible {
      outline: rgba(0, 0, 0, 0.26) auto 1px;
    }
  }
`;

function countReducer(state, action) {
  switch (action.type) {
    case "Tab":
      return state + 1;
    case "Enter":
      return state - 1;
    case "Escape":
      return state - 1;
    case "ArrowDown":
      return state - 1;
    case "ArrowUp":
      return state - 1;
  }
}

let no = 0;

export default () => {
  const searchRef = useRef();
  const [filteredValues, fillFilteredValues] = useState([]);
  // const [selectedNo, setSelectedNo] = useState(0);
  const [selected, setSelected] = useState(data[0]);
  const [count, dispatch] = useReducer(countReducer, 0);
  const [searchFilters, setSearchFilters] = useState([]);

  useEffect(() => {
    // searchRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const filtered = data.filter((value) =>
      newValue.length > 0 ? value.startsWith(newValue) : false
    );
    console.log(filtered);
    fillFilteredValues(filtered);
  };

  //THIS works only for set filter
  const handleKey = (e) => {
    // ctrlKey: false
    // shiftKey: true
    // altKey: false
    // metaKey: false
    // repeat: false
    // isComposing: false
    // charCode: 13
    // keyCode: 13
    console.log(e.code);
    // dispatch({ type: e.nativeEvent.code });
    switch (e.code) {
      case "+":
      case "&":
        return;
      case "|":
      case "*":
        return;
      case "-":
      case "*":
        return;

      case "Tab":
        no = 0;
        searchRef.current.value = `${filteredValues[no]}: `;
        setSelected(null);
        fillFilteredValues([]);
        return;
      case "Enter":
        // no = 0;
        // searchRef.current.value = `${filteredValues[no]}: `;
        // setSelected(null);
        // fillFilteredValues([]);
        //ACTION: apply filter
        return;
      // case "Escape":
      //   return state - 1;
      case "ArrowUp":
        no = no === 0 ? filteredValues.length - 1 : no - 1;
        setSelected(filteredValues[no]);
        return;
      case "ArrowDown":
        no = no === filteredValues.length ? 0 : no + 1;
        setSelected(filteredValues[no]);
        return;
    }
    console.log(no);
  };

  useEventListener("keydown", handleKey);

  useEffect(() => {
    console.log("selected", selected);
    console.log("no", no);
  }, [selected]);

  return (
    <SearchWrapper className="searchWarpper">
      <input type="text" ref={searchRef} onChange={handleChange} />
      {notices.length > 0 && <Notice />}
      {filteredValues.length > 0 && (
        <DropDown values={filteredValues} selected={selected} />
      )}
    </SearchWrapper>
  );
};
