import {v4 as uuid} from 'uuid';

import {Menu} from 'models/Menu';
import {Currency} from 'models/MonetaryValue';

// keep ids consistent between getMockMenu calls
const menuId = uuid();
const itemIds = [uuid(), uuid(), uuid()];

export const getMockMenu = (): Menu => ({
  id: menuId,
  title: 'Super Cheezee Bucket',
  items: [
    {
      id: itemIds[0],
      title:
        "Slammin' Ham 'n' Cheeze That's so Good It'll Blow Your Mind You Won't Even Believe It! Just Try It!",
      imageUrl:
        'https://media.istockphoto.com/photos/ham-and-cheese-sandwich-picture-id114242201?k=20&m=114242201&s=612x612&w=0&h=NoQs9vMVXqP5W0Q0N0JKCukvU13-wnxF2PNiOthAMfs=',
      description:
        "A super cheezee ham 'n' cheeze. On white bread. A super cheezee ham 'n' cheeze. On white bread. Did we mention this was a super cheezee ham 'n' cheeze on white bread?",
      price: {
        value: 1299,
        currency: Currency.USD,
      },
    },
    {
      id: itemIds[1],
      title: 'Cheezer Dunkers',
      imageUrl:
        'https://tymbussanich.files.wordpress.com/2015/07/img_20150709_194959.jpg',
      description: 'Cheeze! For dunking!',
      price: {
        value: 749,
        currency: Currency.USD,
      },
    },
    {
      id: itemIds[2],
      title: 'Something Without an Image',
      imageUrl: 'badUrl',
      description: "There's cheeze in here somewhere... I promise!",
      price: {
        value: 999999,
        currency: Currency.USD,
      },
    },
  ],
});
