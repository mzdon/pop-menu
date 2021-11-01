import {MenuItemData} from 'models/MenuItem';
import React from 'react';

type Updater = (fn: (prevState: MenuItemData) => MenuItemData) => void;

export const useEditMenuItem = (onUpdate: Updater) => {
  const updateField = React.useCallback(
    (field: keyof MenuItemData, value) => {
      onUpdate(item => {
        // price value is nested in MonetaryValue
        if (field === 'price') {
          return {
            ...item,
            price: {
              ...item.price,
              value,
            },
          };
        }
        return {...item, [field]: value};
      });
    },
    [onUpdate],
  );

  const onChangeImageUrl = React.useCallback(
    (value: string) => updateField('imageUrl', value),
    [updateField],
  );

  const onChangeTitle = React.useCallback(
    (value: string) => updateField('title', value),
    [updateField],
  );

  const onChangeDescription = React.useCallback(
    (value: string) => updateField('description', value),
    [updateField],
  );

  const onChangePrice = React.useCallback(
    (value: number) => updateField('price', value),
    [updateField],
  );

  return {
    onChangeDescription,
    onChangeImageUrl,
    onChangePrice,
    onChangeTitle,
  };
};
