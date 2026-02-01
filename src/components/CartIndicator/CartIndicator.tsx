import React, {useMemo} from 'react';
import {num_word} from "../../lib/numWord.ts";
import styles from "./ CartIndicator.module.scss";


interface CartIndicatorProps {
  totalItems: number;
}

const CartIndicator: React.FC<CartIndicatorProps> = ({totalItems}) => {
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setKey(prev => prev + 1);
  }, [totalItems]);
  const wordNums = useMemo(() => {
    return num_word(totalItems, ["товар", "товара", "товаров"])
  }, [totalItems]);
  if (totalItems === 0) return null;

  return (
    <div key={key} className={styles["cart-indicator"]} data-testid="cart-indicator">
      🛒 <span>
      {totalItems}
    </span> {wordNums}
    </div>
  );
};

export default CartIndicator;
