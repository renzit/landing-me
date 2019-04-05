const webPush = require('web-push');

const pushSubscription = {"endpoint":"https://android.googleapis.com/gcm/send/eqZ_KcFtVEU:APA91bFPCFAwe9_MttlVBGWFtD4oW8hcGlENOSPNf2cZ81zmqy-IUkNlS2CgTwJWb8UkPsAlVzWJLpQXD5rKTPknMscMR8mRAJ3GsvFgg5nJu-A1zg11PaZM7G7U0uyD6rpixolrP0oa","expirationTime":null,"keys":{"p256dh":"BKrN1WBgAnYF3KV9OFAk6bJVO_tuoFJuC-f-jDUzqJ8yTHGasjPVb-C5FZkgbHTQLwAJPJxaUpGnq9mMRiL4JLE","auth":"ZqUIcQpf1GjgSzaUQLz1hw"}};

// TODO 4.3a - include VAPID keys

const payload = 'Here is a payload!';

const options = {
  gcmAPIKey: 'AAAAGs7Nzao:APA91bHS-oqSGeX8yAJZpzRYvWuXmoXxOgYVv1rsp16IU6sDdviTf0nrmAd31tsSao62kdD1RUhiKFvzcGAag39HMHZOPcDBW-0pSggQJSiizSxkcH32gd0wfFnsjXK5UVtMiLa9jDIf',
  TTL: 60,

  // TODO 4.3b - add VAPID details

};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);