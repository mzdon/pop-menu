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

## Level 3: Inline editing

Present an interface that enables user to edit Menu Items inline with immediate updates:
- URL to image
- Title
- Description
- Price

Include unit tests

## Level 4: Bonus - Multiple menu managment

Present an interface that enables users to have multiple menus
