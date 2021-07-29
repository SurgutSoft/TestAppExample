import React, {useState} from 'react';
import {FOLDER_CONTROLS} from '../../../consts/storyBook';
import {Select} from './Select';

export default {
  title: `${FOLDER_CONTROLS}/Select`
};

const options = [
  {
    value: "1",
    label: "Oak Grove Spring Read-a-thon ($2,030 / Active)",
  }, {
    value: "2",
    label: "Summer 2020 Read-a-thon ($3,530 / Closed)",
  }, {
    value: "3",
    label: "Test Oak Read-a-thon ($15 / Closed)",
  }
]

export const Select_ = () => {
  const [value, setValue] = useState(options[0].value);

  return (
    <div className="storybookContainer" style={{width: 300}}>
      <Select
        options={options}
        value={value}
        bgColor="darkBlue"
        border="round"
        fontColor="white"
        onChange={(e) => setValue(e.target.value)}
      />

      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="test"
      />
    </div>
  )
}
