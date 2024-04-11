import React, {useRef} from 'react';
import './dropdownmenu.css';
import { DropdownList } from '../DropdownList';

interface IDropdownMenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  dropDown?: string
}

const NOOP = () => {};

export function DropdownMenu({button, children, isOpen, onClose = NOOP, onOpen = NOOP, dropDown}: IDropdownMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  const menuRef     = useRef<any>();
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen == undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)
        || event.target.textContent === 'Закрыть') {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={menuRef} className="menu-container">
      <div onClick={handleOpen}>
        {button}
      </div>
      <div className="list-container" id={`drop-down-${dropDown}`}></div>
      {isDropdownOpen && (
        <DropdownList children={children} dropDown={dropDown} />
      )}
    </div>
  );
}
