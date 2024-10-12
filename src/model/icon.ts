export interface Icon {
  icon: string;
  color: string;
}

function icon(icon: string, color: string): Icon {
  return { icon: icon, color: color };
}

export const COLOR_CREDIT = 'rgb(137, 208, 157)';
export const COLOR_DEBIT = 'rgb(231, 138, 135)';

const icons = new Array<Icon>();
icons.push(icon('home', 'red-4'));
icons.push(icon('shopping_cart', 'pink-5'));
icons.push(icon('face', 'purple-6'));
icons.push(icon('verified', 'deep-purple-7'));
icons.push(icon('fingerprint', 'indigo-8'));
icons.push(icon('paid', 'blue-4'));
icons.push(icon('account_balance', 'light-blue-5'));
icons.push(icon('autorenew', 'cyan-6'));
icons.push(icon('build', 'teal-7'));
icons.push(icon('work', 'green-8'));
icons.push(icon('print', 'light-green-4'));
icons.push(icon('savings', 'lime-5'));
icons.push(icon('room', 'yellow-6'));
icons.push(icon('code', 'amber-7'));
icons.push(icon('pets', 'orange-8'));
icons.push(icon('shopping_basket', 'deep-orange-4'));
icons.push(icon('payment', 'brown-5'));
icons.push(icon('card_giftcard', 'blue-grey-6'));
icons.push(icon('flight_takeoff', 'red-7'));
icons.push(icon('bug_report', 'pink-8'));
icons.push(icon('gavel', 'purple-4'));
icons.push(icon('rocket_launch', 'deep-purple-5'));
icons.push(icon('sticky_note_2', 'indigo-6'));
icons.push(icon('redeem', 'blue-7'));
icons.push(icon('euro_symbol', 'light-blue-8'));
icons.push(icon('currency_exchange', 'cyan-4'));
icons.push(icon('balance', 'teal-5'));
icons.push(icon('rocket', 'green-6'));
icons.push(icon('anchor', 'light-green-7'));
icons.push(icon('pregnant_woman', 'lime-8'));
icons.push(icon('rowing', 'yellow-4'));
icons.push(icon('satellite_alt', 'amber-5'));
icons.push(icon('settings_cell', 'orange-6'));
icons.push(icon('notification_important', 'deep-orange-7'));
icons.push(icon('phone', 'brown-8'));
icons.push(icon('weekend', 'blue-grey-4'));
icons.push(icon('thermostat', 'red-5'));
icons.push(icon('battery_full', 'pink-6'));
icons.push(icon('sports_score', 'purple-7'));
icons.push(icon('location_searching', 'deep-purple-8'));
icons.push(icon('wallpaper', 'indigo-4'));
icons.push(icon('phishing', 'blue-5'));
icons.push(icon('attach_money', 'light-blue-6'));
icons.push(icon('security', 'cyan-7'));
icons.push(icon('smart_toy', 'teal-8'));
icons.push(icon('headphones', 'green-4'));
icons.push(icon('toys', 'light-green-5'));
icons.push(icon('speaker', 'lime-6'));
icons.push(icon('wind_power', 'yellow-7'));
icons.push(icon('propane_tank', 'amber-8'));
icons.push(icon('photo_camera', 'orange-4'));
icons.push(icon('palette', 'deep-orange-5'));
icons.push(icon('euro', 'brown-6'));
icons.push(icon('brush', 'blue-grey-7'));
icons.push(icon('healing', 'red-8'));
icons.push(icon('nature_people', 'pink-4'));
icons.push(icon('currency_bitcoin', 'purple-5'));
icons.push(icon('currency_pound', 'deep-purple-6'));
icons.push(icon('local_shipping', 'indigo-7'));
icons.push(icon('restaurant', 'blue-8'));
icons.push(icon('directions_car', 'light-blue-4'));
icons.push(icon('flight', 'cyan-5'));
icons.push(icon('local_mall', 'teal-6'));
icons.push(icon('lunch_dining', 'green-7'));
icons.push(icon('park', 'light-green-8'));
icons.push(icon('local_library', 'lime-4'));
icons.push(icon('local_cafe', 'yellow-5'));
icons.push(icon('diamond', 'amber-6'));
icons.push(icon('local_parking', 'orange-7'));
icons.push(icon('two_wheeler', 'deep-orange-8'));
icons.push(icon('directions_boat', 'brown-4'));
icons.push(icon('local_bar', 'blue-grey-5'));
icons.push(icon('emergency', 'red-6'));
icons.push(icon('local_dining', 'pink-7'));
icons.push(icon('handyman', 'purple-8'));
icons.push(icon('local_taxi', 'deep-purple-4'));
icons.push(icon('ramen_dining', 'indigo-5'));
icons.push(icon('theater_comedy', 'blue-6'));
icons.push(icon('forest', 'light-blue-7'));
icons.push(icon('bakery_dining', 'cyan-8'));
icons.push(icon('wine_bar', 'teal-4'));
icons.push(icon('takeout_dining', 'green-5'));
icons.push(icon('store_mall_directory', 'light-green-6'));
icons.push(icon('icecream', 'lime-7'));
icons.push(icon('festival', 'yellow-8'));
icons.push(icon('plumbing', 'amber-4'));
icons.push(icon('dry_cleaning', 'orange-5'));
icons.push(icon('egg', 'deep-orange-6'));
icons.push(icon('pest_control_rodent', 'brown-7'));
icons.push(icon('snowmobile', 'blue-grey-8'));
icons.push(icon('fort', 'red-4'));
icons.push(icon('temple_buddhist', 'pink-5'));
icons.push(icon('mosque', 'purple-6'));
icons.push(icon('support_agent', 'deep-purple-7'));
icons.push(icon('wc', 'indigo-8'));
icons.push(icon('family_restroom', 'blue-4'));
icons.push(icon('ac_unit', 'light-blue-5'));
icons.push(icon('spa', 'cyan-6'));
icons.push(icon('child_care', 'teal-7'));
icons.push(icon('sports_bar', 'green-8'));
icons.push(icon('golf_course', 'light-green-4'));
icons.push(icon('fire_extinguisher', 'lime-5'));
icons.push(icon('umbrella', 'yellow-6'));
icons.push(icon('shower', 'amber-7'));
icons.push(icon('dining', 'orange-8'));
icons.push(icon('emoji_events', 'deep-orange-4'));
icons.push(icon('construction', 'brown-5'));
icons.push(icon('precision_manufacturing', 'blue-grey-6'));
icons.push(icon('science', 'red-7'));
icons.push(icon('military_tech', 'pink-8'));
icons.push(icon('cake', 'purple-4'));
icons.push(icon('coronavirus', 'deep-purple-5'));
icons.push(icon('sports_soccer', 'indigo-6'));
icons.push(icon('recycling', 'blue-7'));
icons.push(icon('hiking', 'light-blue-8'));
icons.push(icon('architecture', 'cyan-4'));
icons.push(icon('real_estate_agent', 'teal-5'));
icons.push(icon('catching_pokemon', 'green-6'));
icons.push(icon('sports_basketball', 'light-green-7'));
icons.push(icon('sick', 'lime-8'));
icons.push(icon('sports_tennis', 'yellow-4'));
icons.push(icon('wallet', 'amber-5'));
icons.push(icon('surfing', 'orange-6'));
icons.push(icon('hive', 'deep-orange-7'));
icons.push(icon('sports_football', 'brown-8'));
icons.push(icon('downhill_skiing', 'blue-grey-4'));
icons.push(icon('kayaking', 'red-5'));
icons.push(icon('thunderstorm', 'pink-6'));
icons.push(icon('kitesurfing', 'purple-7'));
icons.push(icon('sledding', 'deep-purple-8'));
icons.push(icon('tsunami', 'indigo-4'));
icons.push(icon('star', 'blue-5'));

const COLORS = [
  {
    name: 'red-4',
    rgb: 'rgb(229, 115, 115)',
  },
  {
    name: 'pink-5',
    rgb: 'rgb(236, 64, 122)',
  },
  {
    name: 'purple-6',
    rgb: 'rgb(156, 39, 176)',
  },
  {
    name: 'deep-purple-7',
    rgb: 'rgb(94, 53, 177)',
  },
  {
    name: 'indigo-8',
    rgb: 'rgb(48, 63, 159)',
  },
  {
    name: 'blue-4',
    rgb: 'rgb(100, 181, 246)',
  },
  {
    name: 'light-blue-5',
    rgb: 'rgb(41, 182, 246)',
  },
  {
    name: 'cyan-6',
    rgb: 'rgb(0, 188, 212)',
  },
  {
    name: 'teal-7',
    rgb: 'rgb(0, 137, 123)',
  },
  {
    name: 'green-8',
    rgb: 'rgb(56, 142, 60)',
  },
  {
    name: 'light-green-4',
    rgb: 'rgb(174, 213, 129)',
  },
  {
    name: 'lime-5',
    rgb: 'rgb(212, 225, 87)',
  },
  {
    name: 'yellow-6',
    rgb: 'rgb(255, 235, 59)',
  },
  {
    name: 'amber-7',
    rgb: 'rgb(255, 179, 0)',
  },
  {
    name: 'orange-8',
    rgb: 'rgb(245, 124, 0)',
  },
  {
    name: 'deep-orange-4',
    rgb: 'rgb(255, 138, 101)',
  },
  {
    name: 'brown-5',
    rgb: 'rgb(141, 110, 99)',
  },
  {
    name: 'blue-grey-6',
    rgb: 'rgb(96, 125, 139)',
  },
  {
    name: 'red-7',
    rgb: 'rgb(229, 57, 53)',
  },
  {
    name: 'pink-8',
    rgb: 'rgb(194, 24, 91)',
  },
  {
    name: 'purple-4',
    rgb: 'rgb(186, 104, 200)',
  },
  {
    name: 'deep-purple-5',
    rgb: 'rgb(126, 87, 194)',
  },
  {
    name: 'indigo-6',
    rgb: 'rgb(63, 81, 181)',
  },
  {
    name: 'blue-7',
    rgb: 'rgb(30, 136, 229)',
  },
  {
    name: 'light-blue-8',
    rgb: 'rgb(2, 136, 209)',
  },
  {
    name: 'cyan-4',
    rgb: 'rgb(77, 208, 225)',
  },
  {
    name: 'teal-5',
    rgb: 'rgb(38, 166, 154)',
  },
  {
    name: 'green-6',
    rgb: 'rgb(76, 175, 80)',
  },
  {
    name: 'light-green-7',
    rgb: 'rgb(124, 179, 66)',
  },
  {
    name: 'lime-8',
    rgb: 'rgb(175, 180, 43)',
  },
  {
    name: 'yellow-4',
    rgb: 'rgb(255, 241, 118)',
  },
  {
    name: 'amber-5',
    rgb: 'rgb(255, 202, 40)',
  },
  {
    name: 'orange-6',
    rgb: 'rgb(255, 152, 0)',
  },
  {
    name: 'deep-orange-7',
    rgb: 'rgb(244, 81, 30)',
  },
  {
    name: 'brown-8',
    rgb: 'rgb(93, 64, 55)',
  },
  {
    name: 'blue-grey-4',
    rgb: 'rgb(144, 164, 174)',
  },
  {
    name: 'red-5',
    rgb: 'rgb(239, 83, 80)',
  },
  {
    name: 'pink-6',
    rgb: 'rgb(233, 30, 99)',
  },
  {
    name: 'purple-7',
    rgb: 'rgb(142, 36, 170)',
  },
  {
    name: 'deep-purple-8',
    rgb: 'rgb(81, 45, 168)',
  },
  {
    name: 'indigo-4',
    rgb: 'rgb(121, 134, 203)',
  },
  {
    name: 'blue-5',
    rgb: 'rgb(66, 165, 245)',
  },
  {
    name: 'light-blue-6',
    rgb: 'rgb(3, 169, 244)',
  },
  {
    name: 'cyan-7',
    rgb: 'rgb(0, 172, 193)',
  },
  {
    name: 'teal-8',
    rgb: 'rgb(0, 121, 107)',
  },
  {
    name: 'green-4',
    rgb: 'rgb(129, 199, 132)',
  },
  {
    name: 'light-green-5',
    rgb: 'rgb(156, 204, 101)',
  },
  {
    name: 'lime-6',
    rgb: 'rgb(205, 220, 57)',
  },
  {
    name: 'yellow-7',
    rgb: 'rgb(253, 216, 53)',
  },
  {
    name: 'amber-8',
    rgb: 'rgb(255, 160, 0)',
  },
  {
    name: 'orange-4',
    rgb: 'rgb(255, 255, 255)',
  },
  {
    name: 'deep-orange-5',
    rgb: 'rgb(255, 112, 67)',
  },
  {
    name: 'brown-6',
    rgb: 'rgb(121, 85, 72)',
  },
  {
    name: 'blue-grey-7',
    rgb: 'rgb(84, 110, 122)',
  },
  {
    name: 'red-8',
    rgb: 'rgb(211, 47, 47)',
  },
  {
    name: 'pink-4',
    rgb: 'rgb(240, 98, 146)',
  },
  {
    name: 'purple-5',
    rgb: 'rgb(171, 71, 188)',
  },
  {
    name: 'deep-purple-6',
    rgb: 'rgb(103, 58, 183)',
  },
  {
    name: 'indigo-7',
    rgb: 'rgb(57, 73, 171)',
  },
  {
    name: 'blue-8',
    rgb: 'rgb(25, 118, 210)',
  },
  {
    name: 'light-blue-4',
    rgb: 'rgb(79, 195, 247)',
  },
  {
    name: 'cyan-5',
    rgb: 'rgb(38, 198, 218)',
  },
  {
    name: 'teal-6',
    rgb: 'rgb(0, 150, 136)',
  },
  {
    name: 'green-7',
    rgb: 'rgb(67, 160, 71)',
  },
  {
    name: 'light-green-8',
    rgb: 'rgb(104, 159, 56)',
  },
  {
    name: 'lime-4',
    rgb: 'rgb(220, 231, 117)',
  },
  {
    name: 'yellow-5',
    rgb: 'rgb(255, 238, 88)',
  },
  {
    name: 'amber-6',
    rgb: 'rgb(255, 193, 7)',
  },
  {
    name: 'orange-7',
    rgb: 'rgb(251, 140, 0)',
  },
  {
    name: 'deep-orange-8',
    rgb: 'rgb(230, 74, 25)',
  },
  {
    name: 'brown-4',
    rgb: 'rgb(161, 136, 127)',
  },
  {
    name: 'blue-grey-5',
    rgb: 'rgb(120, 144, 156)',
  },
  {
    name: 'red-6',
    rgb: 'rgb(244, 67, 54)',
  },
  {
    name: 'pink-7',
    rgb: 'rgb(216, 27, 96)',
  },
  {
    name: 'purple-8',
    rgb: 'rgb(123, 31, 162)',
  },
  {
    name: 'deep-purple-4',
    rgb: 'rgb(149, 117, 205)',
  },
  {
    name: 'indigo-5',
    rgb: 'rgb(92, 107, 192)',
  },
  {
    name: 'blue-6',
    rgb: 'rgb(33, 150, 243)',
  },
  {
    name: 'light-blue-7',
    rgb: 'rgb(3, 155, 229)',
  },
  {
    name: 'cyan-8',
    rgb: 'rgb(0, 151, 167)',
  },
  {
    name: 'teal-4',
    rgb: 'rgb(77, 182, 172)',
  },
  {
    name: 'green-5',
    rgb: 'rgb(102, 187, 106)',
  },
  {
    name: 'light-green-6',
    rgb: 'rgb(139, 195, 74)',
  },
  {
    name: 'lime-7',
    rgb: 'rgb(192, 202, 51)',
  },
  {
    name: 'yellow-8',
    rgb: 'rgb(251, 192, 45)',
  },
  {
    name: 'amber-4',
    rgb: 'rgb(255, 213, 79)',
  },
  {
    name: 'orange-5',
    rgb: 'rgb(255, 167, 38)',
  },
  {
    name: 'deep-orange-6',
    rgb: 'rgb(255, 87, 34)',
  },
  {
    name: 'brown-7',
    rgb: 'rgb(109, 76, 65)',
  },
  {
    name: 'blue-grey-8',
    rgb: 'rgb(69, 90, 100)',
  },
  {
    name: 'red-4',
    rgb: 'rgb(229, 115, 115)',
  },
  {
    name: 'pink-5',
    rgb: 'rgb(236, 64, 122)',
  },
  {
    name: 'purple-6',
    rgb: 'rgb(156, 39, 176)',
  },
  {
    name: 'deep-purple-7',
    rgb: 'rgb(94, 53, 177)',
  },
  {
    name: 'indigo-8',
    rgb: 'rgb(48, 63, 159)',
  },
  {
    name: 'blue-4',
    rgb: 'rgb(100, 181, 246)',
  },
  {
    name: 'light-blue-5',
    rgb: 'rgb(41, 182, 246)',
  },
  {
    name: 'cyan-6',
    rgb: 'rgb(0, 188, 212)',
  },
  {
    name: 'teal-7',
    rgb: 'rgb(0, 137, 123)',
  },
  {
    name: 'green-8',
    rgb: 'rgb(56, 142, 60)',
  },
  {
    name: 'light-green-4',
    rgb: 'rgb(174, 213, 129)',
  },
  {
    name: 'lime-5',
    rgb: 'rgb(212, 225, 87)',
  },
  {
    name: 'yellow-6',
    rgb: 'rgb(255, 235, 59)',
  },
  {
    name: 'amber-7',
    rgb: 'rgb(255, 179, 0)',
  },
  {
    name: 'orange-8',
    rgb: 'rgb(245, 124, 0)',
  },
  {
    name: 'deep-orange-4',
    rgb: 'rgb(255, 138, 101)',
  },
  {
    name: 'brown-5',
    rgb: 'rgb(141, 110, 99)',
  },
  {
    name: 'blue-grey-6',
    rgb: 'rgb(96, 125, 139)',
  },
  {
    name: 'red-7',
    rgb: 'rgb(229, 57, 53)',
  },
  {
    name: 'pink-8',
    rgb: 'rgb(194, 24, 91)',
  },
  {
    name: 'purple-4',
    rgb: 'rgb(186, 104, 200)',
  },
  {
    name: 'deep-purple-5',
    rgb: 'rgb(126, 87, 194)',
  },
  {
    name: 'indigo-6',
    rgb: 'rgb(63, 81, 181)',
  },
  {
    name: 'blue-7',
    rgb: 'rgb(30, 136, 229)',
  },
  {
    name: 'light-blue-8',
    rgb: 'rgb(2, 136, 209)',
  },
  {
    name: 'cyan-4',
    rgb: 'rgb(77, 208, 225)',
  },
  {
    name: 'teal-5',
    rgb: 'rgb(38, 166, 154)',
  },
  {
    name: 'green-6',
    rgb: 'rgb(76, 175, 80)',
  },
  {
    name: 'light-green-7',
    rgb: 'rgb(124, 179, 66)',
  },
  {
    name: 'lime-8',
    rgb: 'rgb(175, 180, 43)',
  },
  {
    name: 'yellow-4',
    rgb: 'rgb(255, 241, 118)',
  },
  {
    name: 'amber-5',
    rgb: 'rgb(255, 202, 40)',
  },
  {
    name: 'orange-6',
    rgb: 'rgb(255, 152, 0)',
  },
  {
    name: 'deep-orange-7',
    rgb: 'rgb(244, 81, 30)',
  },
  {
    name: 'brown-8',
    rgb: 'rgb(93, 64, 55)',
  },
  {
    name: 'blue-grey-4',
    rgb: 'rgb(144, 164, 174)',
  },
  {
    name: 'red-5',
    rgb: 'rgb(239, 83, 80)',
  },
  {
    name: 'pink-6',
    rgb: 'rgb(233, 30, 99)',
  },
  {
    name: 'purple-7',
    rgb: 'rgb(142, 36, 170)',
  },
  {
    name: 'deep-purple-8',
    rgb: 'rgb(81, 45, 168)',
  },
  {
    name: 'indigo-4',
    rgb: 'rgb(121, 134, 203)',
  },
  {
    name: 'blue-5',
    rgb: 'rgb(66, 165, 245)',
  },
];

export function getRgbCode(color: string, safeMode: boolean = false): string {
  const value = COLORS.find((c) => c.name === color);
  if (value) {
    return value.rgb;
  }

  if (safeMode) {
    return getRgbCode(randomIcon().color, false);
  }
  throw new Error(`Color ${color} is unknown`);
}

export function allIcons(): Icon[] {
  return icons;
}

export function randomIcon(): Icon {
  const index = Math.floor(Math.random() * icons.length);
  return { icon: icons[index].icon, color: icons[index].color };
}
