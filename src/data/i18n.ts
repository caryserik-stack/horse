export type Lang = "EN" | "RU" | "TM";
export type Currency = "USD" | "EUR" | "TMT";

const en = {
  shop: "Shop", story: "Our Story", verify: "Verify", cart: "Cart",
  h1: "THE SPIRIT OF THE AKHAL-TEKE", sub: "Authentic equestrian craftsmanship from Turkmenistan.", cta: "Explore collection",
  art: "The art of the saddle", artp: "Built by hand, numbered, and documented.",
  meet: "Meet the craftsmen", meetp: "Every piece carries its maker's name.",
  glob: "Global delivery", globp: "Insured shipping with tracking.",
  all: "All", add: "Add to cart", added: "added to cart",
  sub2: "Subtotal", ship: "Shipping (insured)", tot: "Total", go: "Proceed to checkout",
  empty: "Your cart is empty.", next: "Continue", place: "Place order",
  steps: ["Contact", "Shipping", "Payment", "Review", "Confirmation"],
  ok: "Thank you. Your order is confirmed.", made: "Handcrafted in Turkmenistan",
  orders: "Orders", wishTitle: "Wishlist", wishEmpty: "Your wishlist is empty.", ordersEmpty: "No orders yet.",
  search: "Search", sortDef: "Featured", sortLow: "Price: low to high", sortHigh: "Price: high to low", none: "Nothing found.",
};

export type Dict = typeof en;

const ru: Dict = {
  shop: "Магазин", story: "История", verify: "Проверка", cart: "Корзина",
  h1: "ДУХ АХАЛТЕКЕ", sub: "Подлинное конное ремесло из Туркменистана.", cta: "Смотреть коллекцию",
  art: "Искусство седла", artp: "Сделано вручную, пронумеровано, задокументировано.",
  meet: "Познакомьтесь с мастерами", meetp: "Каждая вещь несёт имя мастера.",
  glob: "Доставка по миру", globp: "Страхование и трекинг.",
  all: "Все", add: "В корзину", added: "добавлено в корзину",
  sub2: "Сумма", ship: "Доставка (со страховкой)", tot: "Итого", go: "Перейти к оформлению",
  empty: "Корзина пуста.", next: "Далее", place: "Оформить заказ",
  steps: ["Контакты", "Доставка", "Оплата", "Проверка", "Готово"],
  ok: "Спасибо. Заказ подтверждён.", made: "Сделано вручную в Туркменистане",
  orders: "Заказы", wishTitle: "Избранное", wishEmpty: "В избранном пока пусто.", ordersEmpty: "Заказов пока нет.",
  search: "Поиск", sortDef: "По умолчанию", sortLow: "Цена: по возрастанию", sortHigh: "Цена: по убыванию", none: "Ничего не найдено.",
};

// TM texts are a draft: needs review by a native speaker.
const tm: Dict = {
  shop: "Dükan", story: "Hekaýamyz", verify: "Barlag", cart: "Sebet",
  h1: "AHALTEKE RUHY", sub: "Türkmenistandan hakyky at ussatlygy.", cta: "Toplumy gör",
  art: "Eýeriň sungaty", artp: "El bilen ýasalan, belgilenen, resmileşdirilen.",
  meet: "Ussalar bilen tanyş", meetp: "Her önümde ussanyň ady bar.",
  glob: "Dünýä boýunça eltip bermek", globp: "Ätiýaçlandyrylan we yzarlanýan.",
  all: "Hemmesi", add: "Sebede goş", added: "sebede goşuldy",
  sub2: "Jemi", ship: "Eltip bermek (ätiýaçly)", tot: "Umumy", go: "Sargyda geç",
  empty: "Sebet boş.", next: "Dowam et", place: "Sargyt et",
  steps: ["Aragatnaşyk", "Eltip bermek", "Töleg", "Barlag", "Tassyklama"],
  ok: "Sagbolluň. Sargydyňyz kabul edildi.", made: "Türkmenistanda el bilen ýasalan",
  orders: "Sargytlar", wishTitle: "Halanlarym", wishEmpty: "Halanlarym entek boş.", ordersEmpty: "Entek sargyt ýok.",
  search: "Gözleg", sortDef: "Adaty", sortLow: "Baha: arzandan gymmada", sortHigh: "Baha: gymmatdan arzana", none: "Hiç zat tapylmady.",
};

export const dictionaries: Record<Lang, Dict> = { EN: en, RU: ru, TM: tm };

// Conceptual rates, not live market data.
export const rates: Record<Currency, number> = { USD: 1, EUR: 0.92, TMT: 3.5 };
export const symbols: Record<Currency, string> = { USD: "$", EUR: "€", TMT: "TMT " };
