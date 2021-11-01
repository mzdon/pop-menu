import React from 'react';

import {MenuItemData} from 'models/MenuItem';
import {MonetaryValue} from 'models/MonetaryValue';

type Errors = {[Property in keyof MenuItemData]?: string};

interface State {
  validating: boolean;
  errors: Errors;
}

interface Result {
  errors: Errors;
  hasErrors: boolean;
  validate: (item: MenuItemData) => boolean;
  update: (item: MenuItemData) => void;
  onImageLoad: () => void;
  onImageError: () => void;
}

const errorMessages = {
  imageUrl: 'This URL is not valid!',
  title: 'Title is required!',
  price: 'Price must be greater than 0!',
};

const determineErrors = (item: MenuItemData) => {
  const errors: Errors = {};
  Object.keys(item).forEach(key => {
    const value = item[key as keyof MenuItemData];
    switch (key) {
      case 'title':
      case 'imageUrl':
        if (!value) {
          errors[key] = errorMessages[key];
        }
        break;
      case 'price':
        {
          const priceValue = (value as MonetaryValue).value;
          if (!priceValue) {
            errors[key] = errorMessages[key];
          }
        }
        break;
      default:
      // do nothing
    }
  });
  return errors;
};

export const useMenuItemValidation = (validating = false): Result => {
  const [state, setState] = React.useState<State>({
    validating,
    errors: {},
  });

  const validate = React.useCallback((item: MenuItemData) => {
    setState(lastState => {
      return {
        ...lastState,
        validating: true,
        errors: determineErrors(item),
      };
    });
    return Object.keys(determineErrors(item)).length === 0;
  }, []);

  const update = React.useCallback((item: MenuItemData) => {
    setState(lastState => {
      if (!lastState.validating) {
        return lastState;
      }
      return {
        ...lastState,
        errors: determineErrors(item),
      };
    });
  }, []);

  const onImageLoad = React.useCallback(() => {
    setState(lastState => {
      const lastErrors = {...lastState.errors};
      delete lastErrors.imageUrl;
      return {
        ...lastState,
        errors: lastErrors,
      };
    });
  }, []);

  const onImageError = React.useCallback(() => {
    setState(lastState => {
      return {
        ...lastState,
        errors: {
          ...lastState.errors,
          imageUrl: errorMessages.imageUrl,
        },
      };
    });
  }, []);

  return {
    errors: state.errors,
    hasErrors: Object.keys(state.errors).length > 0,
    validate,
    update,
    onImageLoad,
    onImageError,
  };
};
