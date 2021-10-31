import React from 'react';

import {Currency, MonetaryValue} from 'models/MonetaryValue';

interface StateData {
  title: string;
  description: string;
  imageUrl: string;
  price: MonetaryValue;
}

type Errors = {[Property in keyof StateData]?: string};

interface State {
  errors: Errors;
  data: StateData;
}

const errorMessages = {
  imageUrl: 'This URL is not valid!',
  title: 'Title is required!',
  price: 'Price must be greater than 0!',
};

// TODO: make field validation more flexible and robust... too static and explicit right now
export const useAddMenuItemScreenHelper = () => {
  const [state, setState] = React.useState<State>({
    errors: {},
    data: {
      title: '',
      description: '',
      imageUrl: '',
      price: {
        value: 0,
        currency: Currency.USD,
      },
    },
  });

  const updateField = React.useCallback((field: keyof StateData, value) => {
    setState(lastState => {
      const newData = {...lastState.data};
      const newErrors = {...lastState.errors};
      // set value
      if (field === 'price') {
        newData.price.value = value;
      } else {
        newData[field] = value;
      }
      // clear and existing errors besides imageUrl if there's a value
      if (field !== 'imageUrl' && !!value && newErrors[field]) {
        delete newErrors[field];
      }
      return {
        data: newData,
        hasErrors: !!Object.keys(newErrors).length,
        errors: newErrors,
      };
    });
  }, []);

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

  // imageUrl is validated separately
  // title and price are required
  const validate = React.useCallback(() => {
    let valid = true;
    const lastData = {...state.data};
    const errors: Errors = {};
    if (state.errors.imageUrl) {
      errors.imageUrl = state.errors.imageUrl;
      valid = false;
    }
    Object.keys(lastData).forEach(key => {
      const value = lastData[key as keyof StateData];
      switch (key) {
        case 'title':
        case 'price':
          if (!value || (typeof value !== 'string' && !value.value)) {
            errors[key] = errorMessages[key];
            valid = false;
          }
          break;
        default:
        // do nothing
      }
    });
    setState({
      ...state,
      errors,
    });
    return valid;
  }, [state]);

  return {
    state,
    hasErrors: !!Object.keys(state.errors).length,
    onChangeImageUrl,
    onChangeTitle,
    onChangeDescription,
    onChangePrice,
    onImageLoad,
    onImageError,
    validate,
  };
};
