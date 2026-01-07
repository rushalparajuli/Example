# React State and Props
  - Props => data passed by a parent component to child
  - state => data created or stored in a component
  - states are maintained by component using hook

## Hook
  - special functions in a react application that gives us the feature of react
  - hook function starts with `use` keyword
  - hooks can only be called inside the component

### State Vs Effecthook
  - State hook
    - to create a data inside the component we need to use state hook
    - if any state of a component gets updated/set/changed the component will remount/rerender

  ```jsx
  import {userState} from "react";
  function Todo(){
    const [data, setData] = useState<DataType>(defaultValue)
    return (<> jsx</>)
  }
  ```

  - Effect Hook
    - also known as sideEffect hook 
    - this hook is reloaded/called/mounted on any state update/change depending on usages
    