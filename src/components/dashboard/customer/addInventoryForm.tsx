import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { getallitems } from '@/request/items';

const filter = createFilterOptions();

export default function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<any>(null);
  const [items, setItems] = React.useState<any>(null);
React.useEffect(()=>{
  getallitems().then((res)=>{
    setItems(res?.result)
  })
},[])


  return (
    <>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            itemcode: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            itemcode: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.itemcode);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            itemcode: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      id="selectItems"
      options={items}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.itemcode;
      }}
      renderOption={(props, option) => <li {...props}>{option.itemcode}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search Design Code" />
      )}
    />
    <>{JSON.stringify(value)}</>
    </>
    
  );
}
export function AddInventory(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <FreeSoloCreateOption/>
    </Card>
  );
}


