import { useState } from 'react';
import '../assets/Switch.css'; 

const Switch = ({ onChange }: { onChange?: (isOn: boolean) => void }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn);
    }
  };

  return (
    <div className={`switch ${isOn ? 'switch-on' : 'switch-off'}`} onClick={toggleSwitch}>
      <div className={`switch-toggle ${isOn ? 'switch-toggle-on' : ''}`}></div>
    </div>
  );
};
export default Switch;
