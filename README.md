# Pop Menu Take Home Test

## Level 1: Basics

Create a Menu as a series of Menu Item Cards having:

- Image (any image)
- Title
- Description
- Price

### Approach

Simple scrolling card interface. Display Menu name as title. Cards display image up top, title and description down below, and price on a tab-like UI component above name overlapping image. Top level state stored with useState().

```TypeScript
interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  image: string;
  title: string;
  description: string;
  price: MonetaryValue;
}

interface MonetaryValue {
  value: number;
  currency: Currency;
}

enum Currency {
  USD = 'usd'
}
```

## Level 2: Add and remove menu items

Create an interface that enables users to create new Menu Items with:

- URL to image
- Title
- Description
- Price

Present a control that enables to remove a Menu Item

- Present a confirmation dialog before removal to verify

Include unit tests

### Approach

#### New dependencies

- @react-navigation
- @react-native-fontawesome

Create stack navigator with MenuScreen and AddMenuItemScreen. Display Menu title as screen header title. Plus icon as header right, takes you to Add Menu Item screen. List of inputs: url, title, description, price. Url input attempts to load and display image as user types and is invalid until image loads successfully. Title and price required. Description optional.

Wrap app in ErrorBoundary and KeyboardAvoidingScreen.

Display Trash icon in top right of MenuItemCard component. When pressed, show alert "Are you sure you want to delete ${title}?" No / Yes

Move state into React Context wrapping navigation stack. Expose a useMenuContext() hook.

```TypeScript
interface MenuContext {
  state: Menu;
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
}
```

Unit test:

- Initial state
- Add a menu item
- Throw exception if data is invalid
- Remove a menu item

## Level 3: Inline editing

Present an interface that enables user to edit Menu Items inline with immediate updates:

- URL to image
- Title
- Description
- Price

Include unit tests

### Approach

Change delete icon on MenuItemCard component to gear icon when pressed displays an alert to Edit or Delete. Delete shows confirmation alert still. Edit checks if there's an existing item being edited. If there is show an alert stating such and ask if a user wants to see that item or continue with editing this item.

Items being edited will show a confirm and cancel icons on the item and the fields will be displayed with an underline. Confirm will be disabled if the data is invalid.

```TypeScript
interface MenuContext {
  state: {
    data: Menu;
    editingItem: MenuItem;
  },
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
  editMenuItem: (id: string) => void;
  updateMenuItem: (id: string, data: MenuItem) => void;
  saveMenuItem: () => void;
  cancelEdit: () => void;
}
```

Unit test:

- Updating an item
- Throw exception if data is invalid

## Level 4: Bonus - Multiple menu managment

Present an interface that enables users to have multiple menus
