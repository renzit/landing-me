const webPush = require('web-push');

const pushSubscription = {"endpoint":"https://android.googleapis.com/gcm/send/eODf-1W93QQ:APA91bFbJqkFkcRDG3UUJaAlmorZx_W_10THqKp223G0-jhOwORETyUp_nt-6rAqrxTdJYUb7LnO5p5qgY48eDe81j2okxSAyKVyyQNZY84M7pQAIJAu8INGEmX82X5ekyzCRd8AJY-V","expirationTime":null,"keys":{"p256dh":"BONgssu9tc2MbLYNYGb7gitK9QxoRt4A7X9iUnky9cN2ydaJJjL2y5N95GNkfiwrN6fso2Zo16qGKne8iGGWGtM","auth":"nem1kmdV6X7wEZfQd24Byg"}};

// TODO 4.3a - include VAPID keys

const payload = 'Check it out!';

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