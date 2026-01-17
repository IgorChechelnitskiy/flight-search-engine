import cs from './Header.module.scss';

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
      <div>Header</div>
      {/*<UserMenu />*/}
    </div>
  );
}
