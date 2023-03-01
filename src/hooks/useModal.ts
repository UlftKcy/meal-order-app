import { useCallback, useState } from "react";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const toggle = useCallback((): void => setIsShowing(isShowing => !isShowing), []);
  return {
    isShowing,
    toggle,
  }
}