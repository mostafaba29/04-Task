import { useState } from 'react';
import '../assets/Switch.css'; 

interface SwitchProps {
  onChange?: (isOn: boolean) => void;
  isRtl?: boolean;
}
const Switch = ({ onChange,isRtl }: SwitchProps) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onChange) {
      onChange(!isOn);
    }
  };

  return (
    <div className={`switch ${isOn ? 'switch-on' : 'switch-off'}`} onClick={toggleSwitch}>
      <div className={`switch-toggle ${isOn ? `${isRtl ? 'switch-toggle-on-arabic':'switch-toggle-on'}` : ''}`}></div>
    </div>
  );
};
export default Switch;
