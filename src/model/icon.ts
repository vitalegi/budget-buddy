export interface Icon {
  icon: string;
  color: string;
}

function icon(icon: string, color: string): Icon {
  return { icon: icon, color: color };
}

const icons = new Array<Icon>();
icons.push(icon('home', 'green'));
icons.push(icon('shopping_cart', 'primary'));
icons.push(icon('face', 'primary'));
icons.push(icon('verified', 'primary'));
icons.push(icon('fingerprint', 'primary'));
icons.push(icon('paid', 'primary'));
icons.push(icon('account_balance', 'primary'));
icons.push(icon('autorenew', 'primary'));
icons.push(icon('build', 'primary'));
icons.push(icon('work', 'primary'));
icons.push(icon('print', 'primary'));
icons.push(icon('savings', 'primary'));
icons.push(icon('room', 'primary'));
icons.push(icon('code', 'primary'));
icons.push(icon('pets', 'primary'));
icons.push(icon('shopping_basket', 'primary'));
icons.push(icon('payment', 'primary'));
icons.push(icon('card_giftcard', 'primary'));
icons.push(icon('flight_takeoff', 'primary'));
icons.push(icon('bug_report', 'primary'));
icons.push(icon('gavel', 'primary'));
icons.push(icon('rocket_launch', 'primary'));
icons.push(icon('sticky_note_2', 'primary'));
icons.push(icon('redeem', 'primary'));
icons.push(icon('euro_symbol', 'primary'));
icons.push(icon('currency_exchange', 'primary'));
icons.push(icon('balance', 'primary'));
icons.push(icon('rocket', 'primary'));
icons.push(icon('anchor', 'primary'));
icons.push(icon('pregnant_woman', 'primary'));
icons.push(icon('rowing', 'primary'));
icons.push(icon('satellite_alt', 'primary'));
icons.push(icon('settings_cell', 'primary'));
icons.push(icon('notification_important', 'primary'));
icons.push(icon('phone', 'primary'));
icons.push(icon('weekend', 'primary'));
icons.push(icon('thermostat', 'primary'));
icons.push(icon('battery_full', 'primary'));
icons.push(icon('sports_score', 'primary'));
icons.push(icon('location_searching', 'primary'));
icons.push(icon('wallpaper', 'primary'));
icons.push(icon('phishing', 'primary'));
icons.push(icon('attach_money', 'primary'));
icons.push(icon('security', 'primary'));
icons.push(icon('smart_toy', 'primary'));
icons.push(icon('headphones', 'primary'));
icons.push(icon('toys', 'primary'));
icons.push(icon('speaker', 'primary'));
icons.push(icon('wind_power', 'primary'));
icons.push(icon('propane_tank', 'primary'));
icons.push(icon('photo_camera', 'primary'));
icons.push(icon('palette', 'primary'));
icons.push(icon('euro', 'primary'));
icons.push(icon('brush', 'primary'));
icons.push(icon('healing', 'primary'));
icons.push(icon('nature_people', 'primary'));
icons.push(icon('currency_bitcoin', 'primary'));
icons.push(icon('currency_pound', 'primary'));
icons.push(icon('local_shipping', 'primary'));
icons.push(icon('restaurant', 'primary'));
icons.push(icon('directions_car', 'primary'));
icons.push(icon('flight', 'primary'));
icons.push(icon('local_mall', 'primary'));
icons.push(icon('lunch_dining', 'primary'));
icons.push(icon('park', 'primary'));
icons.push(icon('local_library', 'primary'));
icons.push(icon('local_cafe', 'primary'));
icons.push(icon('diamond', 'primary'));
icons.push(icon('local_parking', 'primary'));
icons.push(icon('two_wheeler', 'primary'));
icons.push(icon('directions_boat', 'primary'));
icons.push(icon('local_bar', 'primary'));
icons.push(icon('emergency', 'primary'));
icons.push(icon('local_dining', 'primary'));
icons.push(icon('handyman', 'primary'));
icons.push(icon('local_taxi', 'primary'));
icons.push(icon('ramen_dining', 'primary'));
icons.push(icon('theater_comedy', 'primary'));
icons.push(icon('forest', 'primary'));
icons.push(icon('bakery_dining', 'primary'));
icons.push(icon('wine_bar', 'primary'));
icons.push(icon('takeout_dining', 'primary'));
icons.push(icon('store_mall_directory', 'primary'));
icons.push(icon('icecream', 'primary'));
icons.push(icon('festival', 'primary'));
icons.push(icon('plumbing', 'primary'));
icons.push(icon('dry_cleaning', 'primary'));
icons.push(icon('egg', 'primary'));
icons.push(icon('pest_control_rodent', 'primary'));
icons.push(icon('snowmobile', 'primary'));
icons.push(icon('fort', 'primary'));
icons.push(icon('temple_buddhist', 'primary'));
icons.push(icon('mosque', 'primary'));
icons.push(icon('support_agent', 'primary'));
icons.push(icon('wc', 'primary'));
icons.push(icon('family_restroom', 'primary'));
icons.push(icon('ac_unit', 'primary'));
icons.push(icon('spa', 'primary'));
icons.push(icon('child_care', 'primary'));
icons.push(icon('sports_bar', 'primary'));
icons.push(icon('golf_course', 'primary'));
icons.push(icon('fire_extinguisher', 'primary'));
icons.push(icon('umbrella', 'primary'));
icons.push(icon('shower', 'primary'));
icons.push(icon('dining', 'primary'));
icons.push(icon('emoji_events', 'primary'));
icons.push(icon('construction', 'primary'));
icons.push(icon('precision_manufacturing', 'primary'));
icons.push(icon('science', 'primary'));
icons.push(icon('military_tech', 'primary'));
icons.push(icon('cake', 'primary'));
icons.push(icon('coronavirus', 'primary'));
icons.push(icon('sports_soccer', 'primary'));
icons.push(icon('recycling', 'primary'));
icons.push(icon('hiking', 'primary'));
icons.push(icon('architecture', 'primary'));
icons.push(icon('real_estate_agent', 'primary'));
icons.push(icon('catching_pokemon', 'primary'));
icons.push(icon('sports_basketball', 'primary'));
icons.push(icon('sick', 'primary'));
icons.push(icon('sports_tennis', 'primary'));
icons.push(icon('wallet', 'primary'));
icons.push(icon('surfing', 'primary'));
icons.push(icon('hive', 'primary'));
icons.push(icon('sports_football', 'primary'));
icons.push(icon('downhill_skiing', 'primary'));
icons.push(icon('kayaking', 'primary'));
icons.push(icon('thunderstorm', 'primary'));
icons.push(icon('kitesurfing', 'primary'));
icons.push(icon('sledding', 'primary'));
icons.push(icon('tsunami', 'primary'));
icons.push(icon('star', 'primary'));

const BASE_COLORS = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
];

for (let i = 0; i < icons.length; i++) {
  icons[i].color = BASE_COLORS[i % BASE_COLORS.length] + '-' + (4 + (i % 5));
}

export function allIcons(): Icon[] {
  return icons;
}

export function randomIcon(): Icon {
  const index = Math.floor(Math.random() * icons.length);
  return { icon: icons[index].icon, color: icons[index].color };
}
