define(['underi18n', 'translations_en', 'translations_ja'], function(o, en, ja) {

  if (localStorage.getItem('locale') && localStorage.getItem('locale') == 'en') {
    locale = en;
  } else {
    locale = ja;
  }
  var msgFactory = window.msgFactory = underi18n.MessageFactory(locale);
  return msgFactory;
});
