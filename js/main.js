const app = (() => {
    'use strict';
  
    let isSubscribed = false;
    let swRegistration = null;
  
    const notifyButton = document.querySelector('.js-notify-btn');
    const pushButton = document.querySelector('.js-push-btn');
  
      // check for notification support


    if (!('Notification' in window)) {
        console.log('This browser does not support notifications!');
        return;
    }

    //request permission to show notifications
    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
    });

    function displayNotification() {
  
      //display a Notification
      if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            // const startwarsVibration = [
            //     500, 110, 500, 110,
            //     450, 110, 200, 110,
            //     170, 40, 450, 110,
            //     200, 110, 170, 40,
            //     500 ];

            //Add 'options' object to configure the notification
            const options = {
                body: 'First notification!',
                icon: 'assets/android-chrome-192x192.png',
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                data: {
                  dateOfArrival: Date.now(),
                  primaryKey: 1
                },
              //add actions to the notification
                actions: [
                    {action: 'explore', title: 'Go to the site',
                      icon: 'images/checkmark.png'},
                    {action: 'close', title: 'Close the notification',
                      icon: 'images/xmark.png'},
                  ]
              
                // TODO 5.1 - add a tag to the notification
              
              };
      
          reg.showNotification('Thank You For Subscribing!', options);
        });
      }
  
    }
  
    function initializeUI() {
  
      // add a click event listener to the "Enable Push" button
      // and get the subscription object
      pushButton.addEventListener('click', () => {
        pushButton.disabled = true;
        if (isSubscribed) {
          unsubscribeUser();
        } else {
          subscribeUser();
        }
      });
      
      swRegistration.pushManager.getSubscription()
      .then(subscription => {
        isSubscribed = (subscription !== null);
        updateSubscriptionOnServer(subscription);
        if (isSubscribed) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
        updateBtn();
      });
  
    }
  
    // TODO 4.2a - add VAPID public key
  
    function subscribeUser() {
  
      // subscribe to the push service
      swRegistration.pushManager.subscribe({
        userVisibleOnly: true
      })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        updateSubscriptionOnServer(subscription);
        isSubscribed = true;
        updateBtn();
      })
      .catch(err => {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Failed to subscribe the user: ', err);
        }
        updateBtn();
      });
  
    }
  
    function unsubscribeUser() {
  
      // unsubscribe from the push service
      swRegistration.pushManager.getSubscription()
      .then(subscription => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch(err => {
        console.log('Error unsubscribing', err);
      })
      .then(() => {
        updateSubscriptionOnServer(null);
        console.log('User is unsubscribed');
        isSubscribed = false;
        updateBtn();
      });
  
    }
  
    function updateSubscriptionOnServer(subscription) {
      // Here's where you would send the subscription to the application server
  
      const subscriptionJson = document.querySelector('.js-subscription-json');
      const endpointURL = document.querySelector('.js-endpoint-url');
      const subAndEndpoint = document.querySelector('.js-sub-endpoint');
  
      if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        endpointURL.textContent = subscription.endpoint;
        subAndEndpoint.style.display = 'block';
      } else {
        subAndEndpoint.style.display = 'none';
      }
    }
  
    function updateBtn() {
      if (Notification.permission === 'denied') {
        pushButton.textContent = 'Push Messaging Blocked';
        pushButton.disabled = true;
        updateSubscriptionOnServer(null);
        return;
      }
  
      if (isSubscribed) {
        pushButton.textContent = 'Disable Push Messaging';
      } else {
        pushButton.textContent = 'Enable Push Messaging';
      }
  
      pushButton.disabled = false;
    }
  
    function urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
  
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  
    notifyButton.addEventListener('click', () => {
      displayNotification();
    });
  
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        console.log('Service Worker and Push is supported');
  
        navigator.serviceWorker.register('sw.js')
        .then(swReg => {
          console.log('Service worker registered! 😎', swReg);
  
          swRegistration = swReg;
  
          //call the initializeUI() function
          initializeUI();
        })
        .catch(err => {
          console.error('😥 Service worker registration failed: ', err);
        });
      });
    } else {
      console.warn('Push messaging is not supported');
      pushButton.textContent = 'Push Not Supported';
    }
  
  })();
  