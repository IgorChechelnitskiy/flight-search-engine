import cs from './Header.module.scss';
import React from 'react';

export default function Header() {
  // const [_isMinimized, setIsMinimized] = useState<boolean>(null);
  //
  // const isMinimizedStorageKey = 'isMinimizedSheHeaderStorageKey';
  // const clickEventRef = useRef<any>(null);
  //
  // useEffect(() => {
  //   isAnimationActive(false);
  //
  //   const isMinimizedStorageValue: boolean = StorageService.getLocalStorage(
  //     isMinimizedStorageKey
  //   );
  //
  //   if (
  //     !_.isNil(isMinimizedStorageValue) &&
  //     isMinimizedStorageValue !== _isMinimized
  //   ) {
  //     setIsMinimized(isMinimizedStorageValue);
  //     setOpen(isMinimizedStorageValue);
  //   }
  //
  //   setTimeout(() => {
  //     isAnimationActive(true);
  //   }, 100);
  // }, []);
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!clickEventRef.current) return;
  //     clickEventRef.current = false;
  //
  //     if (_isMinimized !== open) {
  //       setIsMinimized(open);
  //       StorageService.setLocalStorage(isMinimizedStorageKey, open);
  //     }
  //   });
  // }, [open]);
  //
  // function isAnimationActive(value: boolean) {
  //   const element = document.querySelector('#ShelfieAppWrapper');
  //   if (element)
  //     value
  //       ? element.classList.remove('noAnimation')
  //       : element.classList.add('noAnimation');
  // }

  return (
    <div className={cs.header}>
      <div className="flex items-center gap-1 group cursor-default">
        <span className="text-2xl font-light tracking-tight text-slate-500 uppercase">
          Flights
        </span>
        <span className="text-2xl font-black tracking-tighter text-blue-600 uppercase">
          Booking
        </span>
      </div>
      {/*<UserMenu />*/}
    </div>
  );
}
